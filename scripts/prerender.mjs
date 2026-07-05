import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import http from "node:http";
import net from "node:net";

import { chromium } from "playwright";

const PROJECT_ROOT = process.cwd();
const DIST_DIR = path.join(PROJECT_ROOT, "dist");

const ROUTES = [
  { path: "/", waitFor: "h1" },
  { path: "/googlenfc", waitFor: "h1" },
  { path: "/about", waitFor: "h1" },
  { path: "/work", waitFor: "h1" },
  { path: "/privacy", waitFor: "h1" },
  { path: "/accessibility", waitFor: "h1" },
  { path: "/geo-report", waitFor: "h1" },
  { path: "/tagizo", waitFor: "h1" },
  { path: "/axstart", waitFor: "h1" },
  { path: "/cizher", waitFor: "h1" },
  { path: "/payrowl", waitFor: "h1" },
  { path: "/xeark", waitFor: "h1" },
  { path: "/axnet", waitFor: "h1" },
  { path: "/mishi", waitFor: "h1" },
  { path: "/crocherish", waitFor: "h1" },
];

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

function spawnPreview(port) {
  const viteBin = path.join(PROJECT_ROOT, "node_modules", ".bin", "vite");
  const cmd = process.platform === "win32" ? `${viteBin}.cmd` : viteBin;
  const args = ["preview", "--host", "127.0.0.1", "--port", String(port), "--strictPort"];

  const child =
    process.platform === "win32"
      ? spawn("cmd.exe", ["/c", cmd, ...args], { cwd: PROJECT_ROOT, stdio: "pipe", shell: false })
      : spawn(cmd, args, { cwd: PROJECT_ROOT, stdio: "pipe", shell: false });

  return child;
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

async function waitForServer(child, port, timeoutMs = 60_000) {
  const start = Date.now();
  let exitCode = null;

  child.on("exit", (code) => {
    exitCode = code ?? null;
  });

  while (Date.now() - start < timeoutMs) {
    if (exitCode !== null) {
      throw new Error(`vite preview exited early (${exitCode})`);
    }
    if (await isServerUp(port)) return;
    await new Promise((r) => setTimeout(r, 200));
  }

  throw new Error(`Timed out waiting for vite preview (${timeoutMs}ms)`);
}

async function writeHtml(route, html) {
  const routePath = route === "/" ? "" : route.replace(/^\//, "");
  const outDir = path.join(DIST_DIR, routePath);
  const outFile = path.join(outDir, "index.html");

  await fs.mkdir(outDir, { recursive: true });
  const normalized = html.startsWith("<!DOCTYPE html>") ? html : `<!DOCTYPE html>\n${html}`;
  await fs.writeFile(outFile, normalized, "utf8");
}

function killPreview(child) {
  if (!child || child.killed) return;
  if (process.platform === "win32") {
    spawn("taskkill", ["/pid", String(child.pid), "/f", "/t"], { stdio: "ignore" });
  } else {
    child.kill("SIGTERM");
  }
}

async function main() {
  await fs.access(DIST_DIR);

  const port = await getFreePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const preview = spawnPreview(port);

  try {
    await waitForServer(preview, port);

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
    killPreview(preview);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
