import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import http from "node:http";
import net from "node:net";

import { chromium } from "playwright";

const PROJECT_ROOT = process.cwd();
const DIST_DIR = path.join(PROJECT_ROOT, "dist");
const REPORTS_DIR = path.join(PROJECT_ROOT, "reports");

const DEFAULT_BASE = "https://adrevnview.com";
const DEFAULT_ROUTES = ["/", "/googlenfc", "/about", "/privacy", "/accessibility"];

function parseArgs(argv) {
  const opts = {
    base: DEFAULT_BASE,
    dist: false,
    format: "markdown",
    out: "",
    routes: DEFAULT_ROUTES,
  };
  for (const arg of argv) {
    if (arg === "--dist") opts.dist = true;
    else if (arg.startsWith("--base=")) opts.base = arg.slice(7).replace(/\/$/, "");
    else if (arg.startsWith("--url=")) opts.base = arg.slice(6).replace(/\/$/, "");
    else if (arg.startsWith("--format=")) opts.format = arg.slice(9);
    else if (arg.startsWith("--out=")) opts.out = arg.slice(6);
    else if (arg.startsWith("--routes=")) opts.routes = arg.slice(9).split(",").map((r) => (r.startsWith("/") ? r : `/${r}`));
    else if (arg === "--help" || arg === "-h") {
      console.log(`Usage: node scripts/seo-report.mjs [options]

Options:
  --dist              Audit local dist/ via vite preview (default after build)
  --base=<url>        Live site base URL (default: ${DEFAULT_BASE})
  --url=<url>         Alias for --base
  --routes=/,/about   Comma-separated paths to audit
  --format=markdown   Output format: markdown | json
  --out=<file>        Write report to file (default: reports/seo-geo-report.<ext>)
  --help              Show this help
`);
      process.exit(0);
    }
  }
  if (opts.dist) opts.base = "http://127.0.0.1";
  return opts;
}

async function getFreePort() {
  return await new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : null;
      server.close(() => (port ? resolve(port) : reject(new Error("No port"))));
    });
  });
}

function spawnPreview(port) {
  const viteBin = path.join(PROJECT_ROOT, "node_modules", ".bin", "vite");
  const cmd = process.platform === "win32" ? `${viteBin}.cmd` : viteBin;
  const args = ["preview", "--host", "127.0.0.1", "--port", String(port), "--strictPort"];
  return process.platform === "win32"
    ? spawn("cmd.exe", ["/c", cmd, ...args], { cwd: PROJECT_ROOT, stdio: "pipe", shell: false })
    : spawn(cmd, args, { cwd: PROJECT_ROOT, stdio: "pipe", shell: false });
}

function isServerUp(port) {
  return new Promise((resolve) => {
    const req = http.request({ method: "GET", host: "127.0.0.1", port, path: "/", timeout: 2000 }, (res) => {
      res.resume();
      resolve(Boolean(res.statusCode && res.statusCode < 500));
    });
    req.on("error", () => resolve(false));
    req.on("timeout", () => {
      req.destroy();
      resolve(false);
    });
    req.end();
  });
}

async function waitForServer(child, port, timeoutMs = 60_000) {
  const start = Date.now();
  let exitCode = null;
  child.on("exit", (code) => {
    exitCode = code ?? null;
  });
  while (Date.now() - start < timeoutMs) {
    if (exitCode !== null) throw new Error(`vite preview exited (${exitCode})`);
    if (await isServerUp(port)) return;
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error("Timed out waiting for preview server");
}

function killPreview(child) {
  if (!child || child.killed) return;
  if (process.platform === "win32") spawn("taskkill", ["/pid", String(child.pid), "/f", "/t"], { stdio: "ignore" });
  else child.kill("SIGTERM");
}

async function fetchText(base, pathname) {
  const url = `${base.replace(/\/$/, "")}${pathname}`;
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

const EXTRACT_SNAPSHOT = (url) => {
  const path = new URL(url).pathname || "/";
  const meta = (name, attr = "name") =>
    document.querySelector(`meta[${attr}="${name}"]`)?.getAttribute("content")?.trim() ?? "";
  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href")?.trim() ?? "";
  const h1Texts = [...document.querySelectorAll("h1")].map((el) => el.textContent?.trim() ?? "").filter(Boolean);
  const images = [...document.querySelectorAll("img")];
  const jsonLdBlocks = [];
  for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      jsonLdBlocks.push(JSON.parse(script.textContent ?? ""));
    } catch {
      jsonLdBlocks.push({ __parseError: true });
    }
  }
  const root = document.querySelector("#root");
  const bodyText = document.body?.textContent?.replace(/\s+/g, " ").trim() ?? "";
  const host = new URL(url).host;
  let internalLinkCount = 0;
  let externalLinkCount = 0;
  for (const a of document.querySelectorAll("a[href]")) {
    const href = a.getAttribute("href") ?? "";
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    try {
      const linkHost = new URL(href, url).host;
      if (linkHost === host) internalLinkCount++;
      else externalLinkCount++;
    } catch {
      internalLinkCount++;
    }
  }
  return {
    url,
    path,
    title: document.title?.trim() ?? "",
    metaDescription: meta("description"),
    canonical,
    robots: meta("robots"),
    keywords: meta("keywords"),
    h1Texts,
    h2Count: document.querySelectorAll("h2").length,
    h3Count: document.querySelectorAll("h3").length,
    imagesTotal: images.length,
    imagesMissingAlt: images.filter((img) => !(img.getAttribute("alt") ?? "").trim()).length,
    jsonLdBlocks,
    ogTitle: meta("og:title", "property"),
    ogDescription: meta("og:description", "property"),
    ogImage: meta("og:image", "property"),
    ogUrl: meta("og:url", "property"),
    twitterCard: meta("twitter:card"),
    bodyTextLength: bodyText.length,
    rootContentLength: root?.innerHTML?.length ?? 0,
    hasSpeakable: Boolean(document.querySelector("[data-speakable], [itemprop='speakable']")),
    hasFaqHeading: /frequently asked|faq/i.test(bodyText),
    hasGeoChunk: Boolean(document.querySelector('[data-geo-chunk="summary"]')),
    internalLinkCount,
    externalLinkCount,
    htmlLang: document.documentElement.getAttribute("lang")?.trim() ?? "",
  };
};

// Audit logic mirrored from src/lib/seo/report/analyze.ts for Node CLI
function scoreChecks(checks) {
  let earned = 0;
  let possible = 0;
  for (const c of checks) {
    if (c.status === "info") continue;
    possible += c.weight;
    if (c.status === "pass") earned += c.weight;
    else if (c.status === "warn") earned += c.weight * 0.6;
  }
  return possible === 0 ? 100 : Math.round((earned / possible) * 100);
}

function check(id, category, status, title, detail, recommendation, weight = 1) {
  return { id, category, status, title, detail, recommendation, weight };
}

function schemaTypes(blocks) {
  const types = new Set();
  const visit = (node) => {
    if (!node || typeof node !== "object") return;
    const t = node["@type"];
    if (typeof t === "string") types.add(t);
    if (Array.isArray(t)) t.forEach((x) => typeof x === "string" && types.add(x));
    if (Array.isArray(node["@graph"])) node["@graph"].forEach(visit);
    Object.values(node).forEach((v) => {
      if (Array.isArray(v)) v.forEach(visit);
      else if (v && typeof v === "object") visit(v);
    });
  };
  blocks.forEach(visit);
  return [...types];
}

function auditPage(snapshot) {
  const checks = [];
  const types = schemaTypes(snapshot.jsonLdBlocks);

  if (!snapshot.title) checks.push(check("title-missing", "seo", "fail", "Missing title tag", "No <title> found.", "Add a unique title (30–60 chars).", 2));
  else if (snapshot.title.length < 30) checks.push(check("title-short", "seo", "warn", "Title may be too short", `${snapshot.title.length} chars`, "Aim for 30–60 characters.", 1));
  else if (snapshot.title.length > 60) checks.push(check("title-long", "seo", "warn", "Title may truncate", `${snapshot.title.length} chars`, undefined, 1));
  else checks.push(check("title-ok", "seo", "pass", "Title tag length", `${snapshot.title.length} chars`, undefined, 1));

  if (!snapshot.metaDescription) checks.push(check("desc-missing", "seo", "fail", "Missing meta description", "None found.", "Add 120–160 char description.", 2));
  else if (snapshot.metaDescription.length < 120) checks.push(check("desc-short", "seo", "warn", "Meta description short", `${snapshot.metaDescription.length} chars`, undefined, 1));
  else if (snapshot.metaDescription.length > 160) checks.push(check("desc-long", "seo", "warn", "Meta description long", `${snapshot.metaDescription.length} chars`, undefined, 1));
  else checks.push(check("desc-ok", "seo", "pass", "Meta description length", `${snapshot.metaDescription.length} chars`, undefined, 1));

  if (!snapshot.canonical) checks.push(check("canonical-missing", "seo", "warn", "Missing canonical", "No rel=canonical.", "Add canonical URL.", 1.5));
  else checks.push(check("canonical-ok", "seo", "pass", "Canonical URL set", snapshot.canonical, undefined, 1));

  if (/noindex/i.test(snapshot.robots)) checks.push(check("noindex", "seo", "warn", "Page is noindex", snapshot.robots, undefined, 2));
  else checks.push(check("indexable", "seo", "pass", "Indexable", snapshot.robots || "default", undefined, 1));

  if (snapshot.h1Texts.length === 0) checks.push(check("h1-missing", "seo", "fail", "Missing H1", "No H1.", "Add one H1.", 2));
  else if (snapshot.h1Texts.length > 1) checks.push(check("h1-multiple", "seo", "warn", "Multiple H1s", `${snapshot.h1Texts.length} found`, undefined, 1));
  else checks.push(check("h1-ok", "seo", "pass", "Single H1", snapshot.h1Texts[0], undefined, 1));

  if (!snapshot.ogTitle || !snapshot.ogDescription) checks.push(check("og-incomplete", "seo", "warn", "Open Graph incomplete", "", "Add og tags.", 1));
  else checks.push(check("og-ok", "seo", "pass", "Open Graph present", snapshot.ogTitle, undefined, 1));

  if (!snapshot.ogImage) checks.push(check("og-image-missing", "seo", "warn", "Missing og:image", "", "Add 1200×630 image.", 1));
  else checks.push(check("og-image-ok", "seo", "pass", "og:image set", snapshot.ogImage, undefined, 1));

  if (snapshot.jsonLdBlocks.length === 0) checks.push(check("jsonld-missing", "geo", "fail", "No JSON-LD", "", "Add schema.org markup.", 2));
  else checks.push(check("jsonld-present", "geo", "pass", "JSON-LD present", types.join(", "), undefined, 1));

  if (snapshot.path === "/" && !types.includes("FAQPage")) checks.push(check("faq-schema", "geo", "warn", "FAQPage schema missing", "Homepage", undefined, 1.5));
  else if (types.includes("FAQPage")) checks.push(check("faq-schema-ok", "geo", "pass", "FAQPage schema", "", undefined, 1));

  if (!types.some((t) => ["Organization", "ProfessionalService"].includes(t))) checks.push(check("org-schema", "geo", "warn", "Organization schema missing", "", undefined, 1.5));
  else checks.push(check("org-schema-ok", "geo", "pass", "Organization schema", "", undefined, 1));

  if (snapshot.hasFaqHeading) checks.push(check("faq-visible", "geo", "pass", "Visible FAQ", "", undefined, 1));
  else if (snapshot.path === "/") checks.push(check("faq-visible-missing", "geo", "warn", "No visible FAQ", "", undefined, 1));

  if (snapshot.rootContentLength < 500) checks.push(check("csr-shell", "technical", "fail", "JS-only shell", `${snapshot.rootContentLength} chars in #root`, "Prerender or SSR.", 2));
  else checks.push(check("prerender-ok", "technical", "pass", "Prerendered content", `${snapshot.rootContentLength} chars`, undefined, 2));

  if (snapshot.bodyTextLength < 300) checks.push(check("thin-content", "content", "fail", "Thin content", `${snapshot.bodyTextLength} chars`, undefined, 1.5));
  else if (snapshot.bodyTextLength < 800) checks.push(check("content-moderate", "content", "warn", "Moderate content", `${snapshot.bodyTextLength} chars`, undefined, 1));
  else checks.push(check("content-ok", "content", "pass", "Content depth", `${snapshot.bodyTextLength} chars`, undefined, 1));

  return { snapshot, checks, score: scoreChecks(checks) };
}

function auditSiteFiles(baseUrl, files, sitemapUrls) {
  const checks = [];
  const origin = baseUrl.replace(/\/$/, "");

  if (!files.robotsTxt) checks.push(check("robots-missing", "technical", "fail", "robots.txt missing", "", "Publish robots.txt.", 2));
  else {
    checks.push(check("robots-present", "technical", "pass", "robots.txt present", "", undefined, 1));
    if (/Sitemap:\s*\S+/i.test(files.robotsTxt)) checks.push(check("robots-sitemap", "seo", "pass", "Sitemap in robots.txt", "", undefined, 1));
    else checks.push(check("robots-sitemap-missing", "seo", "warn", "No sitemap in robots.txt", "", undefined, 1));
    if (/User-agent:\s*GPTBot[\s\S]*?Disallow:\s*\//im.test(files.robotsTxt)) checks.push(check("gptbot-blocked", "geo", "pass", "GPTBot blocked", "", undefined, 0.5));
    if (/User-agent:\s*(ChatGPT-User|PerplexityBot|Google-Extended)/im.test(files.robotsTxt)) checks.push(check("ai-citation-allowed", "geo", "pass", "AI citation bots allowed", "", undefined, 1));
    else checks.push(check("ai-citation-missing", "geo", "warn", "No AI citation bot rules", "", undefined, 1));
  }

  if (!files.sitemapXml) checks.push(check("sitemap-missing", "seo", "fail", "sitemap.xml missing", "", undefined, 2));
  else {
    const locs = [...files.sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((m) => m[1]);
    checks.push(check("sitemap-present", "seo", "pass", "sitemap.xml present", `${locs.length} URLs`, undefined, 1));
  }

  if (!files.llmsTxt) checks.push(check("llms-missing", "geo", "fail", "llms.txt missing", "", undefined, 2));
  else checks.push(check("llms-present", "geo", "pass", "llms.txt present", `${files.llmsTxt.length} bytes`, undefined, 1.5));

  if (!files.llmsFullTxt) checks.push(check("llms-full-missing", "geo", "warn", "llms-full.txt missing", "", undefined, 1));
  else {
    const qaCount = (files.llmsFullTxt.match(/^###\s*Q\d+:/gm) ?? []).length;
    checks.push(check("llms-full-present", "geo", "pass", "llms-full.txt present", `${qaCount} Q&As`, undefined, 1));
  }

  return checks;
}

function buildReport(baseUrl, pageResults, siteFiles, sitemapUrls) {
  const siteChecks = auditSiteFiles(baseUrl, siteFiles, sitemapUrls);
  const pageAvg = pageResults.length ? Math.round(pageResults.reduce((s, p) => s + p.score, 0) / pageResults.length) : 0;
  const siteScore = scoreChecks(siteChecks);
  const allChecks = [...siteChecks, ...pageResults.flatMap((p) => p.checks)];
  const summary = {
    pass: allChecks.filter((c) => c.status === "pass").length,
    warn: allChecks.filter((c) => c.status === "warn").length,
    fail: allChecks.filter((c) => c.status === "fail").length,
    info: allChecks.filter((c) => c.status === "info").length,
  };
  return {
    generatedAt: new Date().toISOString(),
    baseUrl,
    overallScore: Math.round(pageAvg * 0.75 + siteScore * 0.25),
    summary,
    siteChecks,
    pages: pageResults,
    sitemapUrls,
  };
}

function formatMarkdown(report) {
  const lines = [
    `# SEO / GEO Audit Report`,
    ``,
    `**Site:** ${report.baseUrl}`,
    `**Generated:** ${new Date(report.generatedAt).toLocaleString()}`,
    `**Overall Score:** ${report.overallScore}/100`,
    ``,
    `| Pass | Warn | Fail | Info |`,
    `|------|------|------|------|`,
    `| ${report.summary.pass} | ${report.summary.warn} | ${report.summary.fail} | ${report.summary.info} |`,
    ``,
    `## Site-Wide`,
  ];
  for (const c of report.siteChecks) {
    const icon = { pass: "✅", warn: "⚠️", fail: "❌", info: "ℹ️" }[c.status];
    lines.push(`${icon} **${c.title}** — ${c.detail || c.recommendation || ""}`);
  }
  for (const page of report.pages) {
    lines.push("", `## ${page.snapshot.path} (${page.score}/100)`, `**${page.snapshot.title}**`);
    for (const c of page.checks) {
      const icon = { pass: "✅", warn: "⚠️", fail: "❌", info: "ℹ️" }[c.status];
      lines.push(`${icon} ${c.title}: ${c.detail}`);
    }
  }
  lines.push("", "---", "*Adrevnview SEO/GEO Report Generator*");
  return lines.join("\n");
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  let baseUrl = opts.base;
  let preview = null;
  let port = null;

  if (opts.dist) {
    await fs.access(DIST_DIR);
    port = await getFreePort();
    preview = spawnPreview(port);
    await waitForServer(preview, port);
    baseUrl = `http://127.0.0.1:${port}`;
    console.log(`[seo-report] Auditing local dist at ${baseUrl}`);
  } else {
    console.log(`[seo-report] Auditing ${baseUrl}`);
  }

  try {
    const sitemapXml = await fetchText(baseUrl, "/sitemap.xml");
    let routes = opts.routes;
    if (sitemapXml) {
      const fromSitemap = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((m) => {
        try {
          return new URL(m[1]).pathname || "/";
        } catch {
          return m[1];
        }
      });
      if (fromSitemap.length) routes = [...new Set(fromSitemap)];
    }

    const sitemapUrls = routes.map((r) => `${baseUrl.replace(/\/$/, "")}${r.startsWith("/") ? r : `/${r}`}`);

    const siteFiles = {
      robotsTxt: await fetchText(baseUrl, "/robots.txt"),
      sitemapXml,
      llmsTxt: await fetchText(baseUrl, "/llms.txt"),
      llmsFullTxt: await fetchText(baseUrl, "/llms-full.txt"),
    };

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const pageResults = [];

    for (const route of routes) {
      const url = `${baseUrl.replace(/\/$/, "")}${route.startsWith("/") ? route : `/${route}`}`;
      console.log(`[seo-report] Scanning ${url}`);
      const page = await context.newPage();
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
      await page.waitForSelector("h1", { timeout: 30_000 }).catch(() => {});
      await page.waitForTimeout(200);
      const snapshot = await page.evaluate(EXTRACT_SNAPSHOT, url);
      pageResults.push(auditPage(snapshot));
      await page.close();
    }

    await context.close();
    await browser.close();

    const report = buildReport(baseUrl, pageResults, siteFiles, sitemapUrls);
    const output = opts.format === "json" ? JSON.stringify(report, null, 2) : formatMarkdown(report);
    const ext = opts.format === "json" ? "json" : "md";
    const outPath = opts.out || path.join(REPORTS_DIR, `seo-geo-report.${ext}`);

    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, output, "utf8");

    console.log(`\n[seo-report] Overall score: ${report.overallScore}/100`);
    console.log(`[seo-report] Pass: ${report.summary.pass} | Warn: ${report.summary.warn} | Fail: ${report.summary.fail}`);
    console.log(`[seo-report] Report written to ${outPath}`);
  } finally {
    if (preview) killPreview(preview);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
