import type { PageSnapshot } from "./types";
import { parseHtmlSnapshot } from "./extract";

export type BrowserAuditSession = {
  fetchSnapshot: (url: string) => Promise<PageSnapshot | null>;
  close: () => Promise<void>;
};

function browserAuditEnabled(): boolean {
  if (typeof window !== "undefined") return false;
  // Playwright/Chromium is opt-in — it needs extra Vercel env config and Pro plan time.
  return process.env.ENABLE_BROWSER_AUDIT === "true";
}

async function launchBrowser() {
  const chromium = (await import("@sparticuz/chromium")).default;
  const { chromium: playwrightChromium } = await import("playwright-core");
  const path = await import("node:path");

  chromium.setGraphicsMode = false;
  const executablePath = await chromium.executablePath();
  process.env.LD_LIBRARY_PATH = path.dirname(executablePath);

  return playwrightChromium.launch({
    args: chromium.args,
    executablePath,
    headless: chromium.headless,
  });
}

export async function createBrowserAuditSession(): Promise<BrowserAuditSession | null> {
  if (!browserAuditEnabled()) return null;

  try {
    const browser = process.env.VERCEL
      ? await launchBrowser()
      : await import("playwright").then((m) => m.chromium.launch({ headless: true }));

    const context = await browser.newContext({
      userAgent: "Adrevnview-SEO-GEO-Audit/1.0",
    });

    return {
      async fetchSnapshot(url: string) {
        const page = await context.newPage();
        try {
          await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
          await page.waitForSelector("h1", { timeout: 12_000 }).catch(() => {});
          await new Promise((resolve) => setTimeout(resolve, 250));
          const html = await page.content();
          return parseHtmlSnapshot(html, url);
        } catch {
          return null;
        } finally {
          await page.close();
        }
      },
      async close() {
        await context.close();
        await browser.close();
      },
    };
  } catch (err) {
    console.error("[seo-audit] Playwright unavailable, using fetch fallback:", err);
    return null;
  }
}
