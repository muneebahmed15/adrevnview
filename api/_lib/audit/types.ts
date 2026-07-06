export type CheckStatus = "pass" | "warn" | "fail" | "info";

export type IssueSeverity = "critical" | "warning" | "notice";

export type CheckCategory =
  | "seo"
  | "geo"
  | "schema"
  | "content"
  | "technical"
  | "trust"
  | "performance";

export type AIPlatform = "google" | "chatgpt" | "perplexity" | "claude" | "gemini";

export type AuditCheck = {
  id: string;
  category: CheckCategory;
  status: CheckStatus;
  severity: IssueSeverity;
  title: string;
  detail: string;
  recommendation?: string;
  fixSnippet?: string;
  weight: number;
  pagePath?: string;
  platform?: AIPlatform[];
};

export type PageSnapshot = {
  url: string;
  path: string;
  title: string;
  metaDescription: string;
  canonical: string;
  robots: string;
  keywords: string;
  author: string;
  viewport: string;
  charset: string;
  themeColor: string;
  h1Texts: string[];
  h2Texts: string[];
  h3Count: number;
  questionHeadings: number;
  imagesTotal: number;
  imagesMissingAlt: number;
  imagesMissingDimensions: number;
  jsonLdBlocks: unknown[];
  schemaTypes: string[];
  faqSchemaPairs: number;
  orgHasSameAs: boolean;
  orgHasContact: boolean;
  orgHasKnowsAbout: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  twitterCard: string;
  bodyTextLength: number;
  wordCount: number;
  rootContentLength: number;
  hasSpeakable: boolean;
  hasFaqHeading: boolean;
  visibleFaqItems: number;
  hasGeoChunk: boolean;
  internalLinkCount: number;
  externalLinkCount: number;
  htmlLang: string;
  isHttps: boolean;
  scriptCount: number;
  stylesheetCount: number;
  htmlSizeBytes: number;
  hasLlmsLink: boolean;
  hasSitemapLink: boolean;
  hasBreadcrumbSchema: boolean;
  hasWebSiteSchema: boolean;
  hasSearchAction: boolean;
};

export type SiteFileSnapshot = {
  robotsTxt: string | null;
  sitemapXml: string | null;
  llmsTxt: string | null;
  llmsFullTxt: string | null;
};

export type PageAuditResult = {
  snapshot: PageSnapshot;
  checks: AuditCheck[];
  score: number;
};

export type ActionItem = {
  priority: number;
  severity: IssueSeverity;
  title: string;
  recommendation: string;
  fixSnippet?: string;
  category: CheckCategory;
  pagePath?: string;
  impact: "high" | "medium" | "low";
};

export type PlatformScore = {
  platform: AIPlatform;
  label: string;
  score: number;
  summary: string;
};

export type ReportMetrics = {
  pagesScanned: number;
  totalChecks: number;
  wordsAnalyzed: number;
  schemaTypeCount: number;
  scanDurationMs: number;
  htmlSizeKb: number;
};

export type SiteAuditReport = {
  generatedAt: string;
  targetUrl: string;
  baseUrl: string;
  domain: string;
  overallScore: number;
  seoScore: number;
  geoScore: number;
  summary: {
    pass: number;
    warn: number;
    fail: number;
    info: number;
  };
  categoryScores: Record<CheckCategory, number>;
  platformScores: PlatformScore[];
  metrics: ReportMetrics;
  siteChecks: AuditCheck[];
  pages: PageAuditResult[];
  issues: AuditCheck[];
  actionPlan: ActionItem[];
  sitemapUrls: string[];
};
