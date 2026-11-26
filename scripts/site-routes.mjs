import { writeFile } from "node:fs/promises";
import path from "node:path";

import {
  allPublicPaths,
  BLOG_SLUGS,
  CLIENT_SLUGS,
  INDUSTRY_SLUGS,
  PRINT_SERVICE_SLUGS,
  SERVICE_SLUGS,
  STATIC_PATHS,
} from "./static-page-content.mjs";

export {
  allPublicPaths,
  BLOG_SLUGS,
  CLIENT_SLUGS,
  INDUSTRY_SLUGS,
  PRINT_SERVICE_SLUGS,
  SERVICE_SLUGS,
  STATIC_PATHS,
};

const SITE = "https://www.adrevnview.com";
const LASTMOD_CHANGED = "2026-08-21";
const LASTMOD_STABLE = "2026-07-06";

const CHANGED_EXACT = new Set([
  "/",
  "/about",
  "/contact",
  "/services",
  "/industries",
  "/blog",
  "/work",
  "/work/b2b",
  "/work/b2c",
  "/work/ecommerce",
]);

const LASTMOD_HOME = "2026-11-26";

function lastmodFor(routePath) {
  if (routePath === "/") return LASTMOD_HOME;
  if (CHANGED_EXACT.has(routePath)) return LASTMOD_CHANGED;
  if (routePath.startsWith("/services/")) return LASTMOD_CHANGED;
  if (routePath.startsWith("/blog/")) return LASTMOD_CHANGED;
  return LASTMOD_STABLE;
}

function loc(routePath) {
  return routePath === "/" ? `${SITE}/` : `${SITE}${routePath}`;
}

export function renderSitemapXml(paths = allPublicPaths()) {
  const unique = [...new Set(paths)];
  unique.sort((a, b) => {
    if (a === "/") return -1;
    if (b === "/") return 1;
    return a.localeCompare(b);
  });

  const urls = unique
    .map(
      (routePath) =>
        `  <url><loc>${loc(routePath)}</loc><lastmod>${lastmodFor(routePath)}</lastmod></url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export async function writeSitemapFiles(...directories) {
  const xml = renderSitemapXml();
  await Promise.all(directories.map((dir) => writeFile(path.join(dir, "sitemap.xml"), xml, "utf8")));
  return xml;
}

export const ROUTES = allPublicPaths().map((routePath) => ({ path: routePath, waitFor: "h1" }));
