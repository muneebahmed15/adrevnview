import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import http from "node:http";
import net from "node:net";

import { chromium } from "playwright";

const PROJECT_ROOT = process.cwd();
const DIST_DIR = path.join(PROJECT_ROOT, "dist");

const STATIC_ROUTES = [
  "/",
  "/googlenfc",
  "/about",
  "/work",
  "/contact",
  "/privacy",
  "/accessibility",
  "/geo-report",
  "/tagizo",
  "/axstart",
  "/cizher",
  "/payrowl",
  "/xeark",
  "/axnet",
  "/mishi",
  "/crocherish",
  "/ecmmaandfitness",
  "/kfc-ny",
];

const SERVICE_SLUGS = [
  "custom-web-design",
  "landing-page-design",
  "ui-ux-design",
  "website-redesign",
  "responsive-design",
  "react-development",
  "wordpress-development",
  "shopify-development",
  "webflow-development",
  "api-integrations",
  "seo-services",
  "ppc-advertising",
  "social-media-marketing",
  "email-marketing",
  "content-strategy",
  "logo-design",
  "brand-identity",
  "brand-strategy",
  "visual-design-systems",
  "brand-guidelines",
];

const INDUSTRY_SLUGS = ["healthcare", "ecommerce", "manufacturing", "real-estate", "legal", "financial", "technology"];

export const ROUTES = [
  ...STATIC_ROUTES.map((path) => ({ path, waitFor: "h1" })),
  ...SERVICE_SLUGS.map((slug) => ({ path: `/services/${slug}`, waitFor: "h1" })),
  ...INDUSTRY_SLUGS.map((slug) => ({ path: `/industries/${slug}`, waitFor: "h1" })),
];
