import type { PageSnapshot } from "./types";
import { parseHtmlSnapshot } from "./extract";

export type BrowserAuditSession = {
  fetchSnapshot: (url: string) => Promise<PageSnapshot | null>;
  close: () => Promise<void>;
};

async function launchBrowser() {
  if (process.env.VERCEL) {
    const chromium = (await import("@sparticuz/chromium")).default;
    const { chromium: playwrightChromium } = await import("playwright-core");
    chromium.setGraphicsMode = false;
    return playwrightChromium.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  }

  const { chromium } = await import("playwright");
  return chromium.launch({ headless: true });
}

export async function createBrowserAuditSession(): Promise<BrowserAuditSession | null> {
  if (typeof window !== "undefined") return null;

  try {
    const browser = await launchBrowser();
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
    console.error("[seo-audit] Playwright unavailable, falling back to fetch:", err);
    return null;
  }
}
