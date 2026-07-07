import fs from "node:fs/promises";
import path from "node:path";
import http from "node:http";
import net from "node:net";

import { chromium } from "playwright";

import { ROUTES } from "./prerender-routes.mjs";

const PROJECT_ROOT = process.cwd();
const DIST_DIR = path.join(PROJECT_ROOT, "dist");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

async function getFreePort() {
  return await new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : null;
      server.close(() => {
        if (!port) reject(new Error("Could not allocate free port"));
        else resolve(port);
      });
    });
  });
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function createStaticServer(port) {
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url ?? "/", "http://127.0.0.1");
      let pathname = decodeURIComponent(url.pathname);
      if (pathname.endsWith("/")) pathname += "index.html";

      let filePath = path.join(DIST_DIR, pathname);
      if (!(await fileExists(filePath))) {
        const withHtml = `${filePath}.html`;
        if (await fileExists(withHtml)) {
          filePath = withHtml;
        } else {
          filePath = path.join(DIST_DIR, "index.html");
        }
      }

      const stat = await fs.stat(filePath);
      if (stat.isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }

      const content = await fs.readFile(filePath);
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { "Content-Type": MIME[ext] ?? "application/octet-stream" });
      res.end(content);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
    }
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => resolve(server));
  });
}

function isServerUp(port) {
  return new Promise((resolve) => {
    const req = http.request(
      { method: "GET", host: "127.0.0.1", port, path: "/", timeout: 2000 },
      (res) => {
        res.resume();
        resolve(Boolean(res.statusCode && res.statusCode >= 200 && res.statusCode < 500));
      },
    );
    req.on("error", () => resolve(false));
    req.on("timeout", () => {
      req.destroy();
      resolve(false);
    });
    req.end();
  });
}

async function waitForServer(port, timeoutMs = 15_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await isServerUp(port)) return;
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error(`Timed out waiting for static server (${timeoutMs}ms)`);
}

async function writeHtml(route, html) {
  const routePath = route === "/" ? "" : route.replace(/^\//, "");
  const outDir = path.join(DIST_DIR, routePath);
  const outFile = path.join(outDir, "index.html");

  await fs.mkdir(outDir, { recursive: true });
  const normalized = html.startsWith("<!DOCTYPE html>") ? html : `<!DOCTYPE html>\n${html}`;
  await fs.writeFile(outFile, normalized, "utf8");
}

async function main() {
  await fs.access(DIST_DIR);

  const port = await getFreePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const server = await createStaticServer(port);

  try {
    await waitForServer(port);

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();

    for (const { path: route, waitFor } of ROUTES) {
      console.log(`[prerender] ${route}`);
      const page = await context.newPage();
      await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded", timeout: 60_000 });
      await page.waitForSelector(waitFor, { timeout: 30_000 });
      await page.waitForTimeout(300);

      const html = await page.content();
      await writeHtml(route, html);
      await page.close();
      console.log(`[prerender] ✓ ${route} (${html.length.toLocaleString()} bytes)`);
    }

    await context.close();
    await browser.close();
    console.log("[prerender] Done — all routes pre-rendered.");
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((err) => {
  console.error("[prerender] Failed:", err);
  console.warn("[prerender] Deploying without full prerender — ensure static SEO fallback in index.html");
  process.exit(0);
});
