/**
 * Generates static HTML files for every route after Vite build.
 * No Playwright required — reliable on Vercel serverless builds.
 */
import fs from "node:fs/promises";
import path from "node:path";

import { injectRoot } from "./inject-root.mjs";
import { writeSitemapFiles } from "./site-routes.mjs";
import {
  BLOG_PAGES,
  CLIENT_PAGES,
  HOME_BODY,
  INDUSTRY_PAGES,
  PRINT_SERVICE_SLUGS,
  SERVICE_PAGES,
  SERVICE_SLUGS,
  STATIC_PAGES,
} from "./static-page-content.mjs";

const DIST = path.join(process.cwd(), "dist");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const SITE = "https://www.adrevnview.com";
const SERVICES_TS = path.join(process.cwd(), "src/lib/content/services.ts");

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function slugify(label) {
  return label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function assertServiceSlugsMatchSource() {
  const src = await fs.readFile(SERVICES_TS, "utf8");
  const titles = [...src.matchAll(/^\s*title:\s*"([^"]+)"/gm)].map((m) => m[1]);
  const fromTs = titles.map(slugify);
  const missingFromStatic = fromTs.filter((slug) => !SERVICE_SLUGS.includes(slug));
  const extraStatic = SERVICE_SLUGS.filter((slug) => !fromTs.includes(slug));
  const missingPrint = PRINT_SERVICE_SLUGS.filter((slug) => !SERVICE_SLUGS.includes(slug));
  if (missingFromStatic.length || extraStatic.length || missingPrint.length) {
    throw new Error(
      `Service slug drift: missing static=${missingFromStatic.join(",") || "none"} extra=${extraStatic.join(",") || "none"} missingPrint=${missingPrint.join(",") || "none"}`,
    );
  }
}

function setMeta(html, { title, description, canonical }) {
  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
  out = out.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeHtml(description)}"`,
  );
  out = out.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonical}"`);
  out = out.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${escapeHtml(title)}"`);
  out = out.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${escapeHtml(description)}"`,
  );
  out = out.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonical}"`);
  out = out.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${escapeHtml(title)}"`);
  out = out.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${escapeHtml(description)}"`,
  );
  return out;
}

function replaceJsonLd(html, data) {
  return html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n        ${JSON.stringify(data)}\n      </script>`,
  );
}

function organizationNode() {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE}/#organization`,
    name: "Adrevnview",
    url: `${SITE}/`,
    logo: `${SITE}/logo.svg`,
    email: "hello@adrevnview.com",
    telephone: "+1-516-820-7863",
  };
}

function webpageNode(canonical, title, description) {
  return {
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    isPartOf: { "@id": `${SITE}/#website` },
    about: { "@id": `${SITE}/#organization` },
    inLanguage: "en-US",
  };
}

function faqNode(faqs) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

function serviceJsonLd(page, canonical) {
  const graph = [
    organizationNode(),
    webpageNode(canonical, page.title, page.description),
    {
      "@type": "Service",
      name: page.headline,
      description: page.description,
      url: canonical,
      provider: { "@id": `${SITE}/#organization` },
      areaServed: ["Long Island", "New York", "United States"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE}/services` },
        { "@type": "ListItem", position: 3, name: page.headline, item: canonical },
      ],
    },
  ];
  if (page.faq?.length) graph.push(faqNode(page.faq));
  return { "@context": "https://schema.org", "@graph": graph };
}

function innerPageJsonLd(canonical, title, description, extra = []) {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode(), webpageNode(canonical, title, description), ...extra],
  };
}

function serviceBody(page) {
  const faqHtml = page.faq?.length
    ? `<section><h2>Frequently asked questions</h2>${page.faq
        .map((item) => `<h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p>`)
        .join("")}</section>`
    : "";
  const linkHtml = page.links?.length
    ? `<p>Related: ${page.links
        .map((link) => `<a href="${link.href}">${escapeHtml(link.label)}</a>`)
        .join(" · ")}</p>`
    : "";
  return `<main><h1 data-speakable="true">${escapeHtml(page.headline)}</h1><p data-geo-chunk="summary" data-speakable="true">${escapeHtml(page.intro)}</p><p>${escapeHtml(page.description)}</p>${faqHtml}${linkHtml}<p><a href="/contact">Request a consultation</a> for ${escapeHtml(page.headline.toLowerCase())}.</p></main>`;
}

async function writeRoute(baseHtml, routePath, meta, body, jsonLd) {
  const canonical = routePath === "/" ? `${SITE}/` : `${SITE}${routePath}`;
  let html = setMeta(baseHtml, { ...meta, canonical });
  if (jsonLd) html = replaceJsonLd(html, jsonLd);
  html = injectRoot(html, body);
  const outDir = routePath === "/" ? DIST : path.join(DIST, routePath.replace(/^\//, ""));
  const outFile = routePath === "/" ? path.join(DIST, "index.html") : path.join(outDir, "index.html");
  if (routePath !== "/") await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(outFile, html, "utf8");
  const size = Buffer.byteLength(html, "utf8");
  console.log(`[static-pages] ✓ ${routePath || "/"} (${size.toLocaleString()} bytes)`);
}

async function main() {
  await assertServiceSlugsMatchSource();
  const baseHtml = await fs.readFile(path.join(DIST, "index.html"), "utf8");

  await writeRoute(
    baseHtml,
    "/",
    {
      title: "Adrevnview — Premium Web Design Agency | SEO & GEO",
      description:
        "Full-service digital and print agency for B2B, B2C, and enterprise brands. Custom web design, development, SEO, GEO, branding, and printing on Long Island.",
    },
    HOME_BODY,
  );

  for (const page of STATIC_PAGES) {
    const extra = [];
    if (page.path === "/contact") {
      extra.push(
        faqNode([
          {
            question: "How do I request a project quote?",
            answer:
              "Fill out the contact form or email hello@adrevnview.com with your project scope, timeline, and budget range. We respond within one business day.",
          },
          {
            question: "Can I request a quote for printing and signage?",
            answer:
              "Yes. Include formats, quantities, and delivery location for menus, business cards, letterheads, brochures, or panaflex banners and we will quote production alongside design.",
          },
          {
            question: "What industries does Adrevnview serve?",
            answer:
              "We work with B2B SaaS, eCommerce, healthcare, legal, real estate, manufacturing, financial services, restaurants, and enterprise organizations.",
          },
          {
            question: "Do you offer free SEO and GEO audits?",
            answer: "Yes. Use our free GEO Report tool at /geo-report to analyze any URL for SEO and AI visibility readiness.",
          },
        ]),
      );
    }
    const canonical = `${SITE}${page.path}`;
    await writeRoute(
      baseHtml,
      page.path,
      { title: page.title, description: page.description },
      page.body,
      innerPageJsonLd(canonical, page.title, page.description, extra),
    );
  }

  for (const page of SERVICE_PAGES) {
    const route = `/services/${page.slug}`;
    const canonical = `${SITE}${route}`;
    await writeRoute(
      baseHtml,
      route,
      { title: page.title, description: page.description },
      serviceBody(page),
      serviceJsonLd(page, canonical),
    );
  }

  for (const [slug, title, description, intro] of INDUSTRY_PAGES) {
    const route = `/industries/${slug}`;
    const canonical = `${SITE}${route}`;
    const body = `<main><h1>${title}</h1><p data-geo-chunk="summary">${intro}</p><p>${description}</p><p><a href="/contact">Request a consultation</a></p></main>`;
    await writeRoute(
      baseHtml,
      route,
      { title: `${title} | Adrevnview`, description },
      body,
      innerPageJsonLd(canonical, `${title} | Adrevnview`, description),
    );
  }

  for (const [slug, title, headline, description] of BLOG_PAGES) {
    const route = `/blog/${slug}`;
    const canonical = `${SITE}${route}`;
    const body = `<main><h1>${headline}</h1><p data-geo-chunk="summary">${description}</p><p><a href="/blog">Back to blog</a> · <a href="/contact">Contact Adrevnview</a></p></main>`;
    await writeRoute(
      baseHtml,
      route,
      { title, description },
      body,
      innerPageJsonLd(canonical, title, description),
    );
  }

  for (const [slug, name, description] of CLIENT_PAGES) {
    const route = `/${slug}`;
    const canonical = `${SITE}${route}`;
    const body = `<main><h1>${name}</h1><p data-geo-chunk="summary">${description}</p><p>Case study by <a href="/">Adrevnview</a> — custom web design, development, SEO, and GEO.</p><p><a href="/work">View all work</a></p></main>`;
    await writeRoute(
      baseHtml,
      route,
      { title: `${name} Case Study | Adrevnview`, description },
      body,
      innerPageJsonLd(canonical, `${name} Case Study | Adrevnview`, description),
    );
  }

  await writeSitemapFiles(PUBLIC_DIR, DIST);
  console.log("[static-pages] Done — unique HTML, print FAQs, and sitemap written.");
}

main().catch((err) => {
  console.error("[static-pages] Failed:", err);
  process.exit(1);
});
