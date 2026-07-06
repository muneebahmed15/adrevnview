import { useEffect } from "react";
import { SITE_URL } from "@/lib/seo/siteConfig";
import { getStructuredData } from "@/lib/seo/structuredData";

type SeoHeadProps = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  noindex?: boolean;
};

const STRUCTURED_DATA_ID = "adrevnview-structured-data";

function upsertMeta(name: string, content: string, attribute: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function SeoHead({ title, description, path, keywords, noindex = false }: SeoHeadProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const robots = noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

    document.title = title;
    upsertMeta("description", description);
    upsertMeta("robots", robots);
    if (keywords) upsertMeta("keywords", keywords);

    upsertLink("canonical", url);

    upsertMeta("og:title", title, "property");
    upsertMeta("og:description", description, "property");
    upsertMeta("og:url", url, "property");
    upsertMeta("og:type", "website", "property");
    upsertMeta("og:site_name", "Adrevnview", "property");
    upsertMeta("og:locale", "en_US", "property");
    upsertMeta("og:image", `${SITE_URL}/og-cover.svg`, "property");
    upsertMeta("og:image:width", "1200", "property");
    upsertMeta("og:image:height", "630", "property");

    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:image", `${SITE_URL}/og-cover.svg`);
    upsertMeta("twitter:title", title);
    upsertMeta("twitter:description", description);

    const existing = document.getElementById(STRUCTURED_DATA_ID);
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.id = STRUCTURED_DATA_ID;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(getStructuredData(path, title, description));
    document.head.appendChild(script);

    return () => {
      document.getElementById(STRUCTURED_DATA_ID)?.remove();
    };
  }, [title, description, path, keywords, noindex]);

  return null;
}
