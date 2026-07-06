import { parseHTML } from "linkedom";
import {
  collectSchemaTypes,
  countFaqPairs,
  hasSchemaType,
  hasSearchActionSchema,
  orgEntitySignals,
} from "./schemaUtils";
import type { PageSnapshot } from "./types";

function htmlByteSize(html: string): number {
  if (typeof Buffer !== "undefined") return Buffer.byteLength(html, "utf8");
  return new Blob([html]).size;
}

export function extractPageSnapshot(doc: Document, url: string, htmlSizeBytes = 0): PageSnapshot {
  const path = new URL(url).pathname || "/";
  const meta = (name: string, attr: "name" | "property" = "name") =>
    doc.querySelector(`meta[${attr}="${name}"]`)?.getAttribute("content")?.trim() ?? "";
  const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute("href")?.trim() ?? "";
  const h1Texts = [...doc.querySelectorAll("h1")].map((el) => el.textContent?.trim() ?? "").filter(Boolean);
  const h2Texts = [...doc.querySelectorAll("h2")].map((el) => el.textContent?.trim() ?? "").filter(Boolean);
  const questionHeadings = [...doc.querySelectorAll("h2, h3")].filter((el) => /\?/.test(el.textContent ?? "")).length;
  const images = [...doc.querySelectorAll("img")];
  const jsonLdBlocks: unknown[] = [];
  for (const script of doc.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      jsonLdBlocks.push(JSON.parse(script.textContent ?? ""));
    } catch {
      jsonLdBlocks.push({ __parseError: true });
    }
  }
  const root = doc.querySelector("#root");
  const bodyText = doc.body?.textContent?.replace(/\s+/g, " ").trim() ?? "";
  const wordCount = bodyText ? bodyText.split(/\s+/).filter(Boolean).length : 0;
  const host = new URL(url).host;
  let internalLinkCount = 0;
  let externalLinkCount = 0;
  for (const a of doc.querySelectorAll("a[href]")) {
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
  const schemaTypes = collectSchemaTypes(jsonLdBlocks);
  const orgSignals = orgEntitySignals(jsonLdBlocks);
  const faqItems = doc.querySelectorAll("[itemtype*='FAQPage'] details, .faq-item, [data-faq]").length;
  const visibleFaqItems = faqItems || (doc.body?.innerHTML.match(/<h[23][^>]*>[^<]*\?/gi) ?? []).length;

  return {
    url,
    path,
    title: doc.title?.trim() ?? "",
    metaDescription: meta("description"),
    canonical,
    robots: meta("robots"),
    keywords: meta("keywords"),
    author: meta("author"),
    viewport: meta("viewport"),
    charset: doc.querySelector("meta[charset]")?.getAttribute("charset")?.trim() ?? "",
    themeColor: meta("theme-color"),
    h1Texts,
    h2Texts,
    h3Count: doc.querySelectorAll("h3").length,
    questionHeadings,
    imagesTotal: images.length,
    imagesMissingAlt: images.filter((img) => !(img.getAttribute("alt") ?? "").trim()).length,
    imagesMissingDimensions: images.filter((img) => !img.getAttribute("width") && !img.getAttribute("height")).length,
    jsonLdBlocks,
    schemaTypes,
    faqSchemaPairs: countFaqPairs(jsonLdBlocks),
    orgHasSameAs: orgSignals.hasSameAs,
    orgHasContact: orgSignals.hasContact,
    orgHasKnowsAbout: orgSignals.hasKnowsAbout,
    ogTitle: meta("og:title", "property"),
    ogDescription: meta("og:description", "property"),
    ogImage: meta("og:image", "property"),
    ogUrl: meta("og:url", "property"),
    twitterCard: meta("twitter:card"),
    bodyTextLength: bodyText.length,
    wordCount,
    rootContentLength: root?.innerHTML?.length ?? doc.body?.innerHTML?.length ?? 0,
    hasSpeakable: Boolean(doc.querySelector("[data-speakable], [itemprop='speakable']")),
    hasFaqHeading: /frequently asked|faq/i.test(bodyText),
    visibleFaqItems,
    hasGeoChunk: Boolean(doc.querySelector('[data-geo-chunk="summary"]')),
    internalLinkCount,
    externalLinkCount,
    htmlLang: doc.documentElement.getAttribute("lang")?.trim() ?? "",
    isHttps: url.startsWith("https://"),
    scriptCount: doc.querySelectorAll("script").length,
    stylesheetCount: doc.querySelectorAll('link[rel="stylesheet"]').length,
    htmlSizeBytes,
    hasLlmsLink: Boolean(doc.querySelector('link[href*="llms.txt"]')),
    hasSitemapLink: Boolean(doc.querySelector('link[rel="sitemap"]')),
    hasBreadcrumbSchema: hasSchemaType(jsonLdBlocks, "BreadcrumbList"),
    hasWebSiteSchema: hasSchemaType(jsonLdBlocks, "WebSite"),
    hasSearchAction: hasSearchActionSchema(jsonLdBlocks),
  };
}

export function parseHtmlSnapshot(html: string, url: string): PageSnapshot {
  const { document } = parseHTML(html);
  return extractPageSnapshot(document as unknown as Document, url, htmlByteSize(html));
}
