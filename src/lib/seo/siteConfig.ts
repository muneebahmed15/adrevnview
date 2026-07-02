export const SITE_URL = "https://adrevnview.com";

export const ORG = {
  name: "Adrevnview",
  legalName: "Adrevnview",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  email: "hello@adrevnview.com",
  phone: "+1-512-555-0147",
  foundingDate: "2013",
  address: {
    streetAddress: "1200 Innovation Blvd, Suite 400",
    addressLocality: "Austin",
    addressRegion: "TX",
    postalCode: "78701",
    addressCountry: "US",
  },
  sameAs: [
    "https://github.com/muneebahmed15/adrevnview",
    "https://tagizo.com",
    "https://axstart.com",
    "https://cizher.com",
    "https://mymatflow.com",
  ],
  knowsAbout: [
    "Custom web design",
    "Web development",
    "eCommerce design",
    "Brand identity",
    "SEO",
    "Generative Engine Optimization",
    "Digital marketing",
    "SaaS product design",
    "Google NFC review cards",
  ],
};

export const DEFAULT_SEO = {
  title: "Adrevnview — Premium Web Design Agency | SEO & GEO",
  description:
    "Adrevnview is a premium web design agency for B2B, B2C, and enterprise brands. Custom websites, branding, SEO, and Generative Engine Optimization (GEO) that drive measurable growth.",
  keywords:
    "web design agency, custom web design, SEO agency, GEO optimization, digital marketing, eCommerce design, Austin web agency, B2B web design",
};

export const PAGES = {
  home: {
    path: "/",
    title: "Adrevnview — Premium Web Design Agency | SEO & GEO",
    description:
      "Full-service digital agency for B2B, B2C, and enterprise brands. Custom web design, development, SEO, GEO, and conversion-focused marketing.",
  },
  googleNfc: {
    path: "/googlenfc",
    title: "Google NFC Review Card — Get More 5-Star Reviews | Adrevnview",
    description:
      "Smart NFC + QR review card for local businesses. Customers tap to leave Google reviews instantly. $99 one-time, pre-programmed, lifetime guarantee.",
  },
  about: {
    path: "/about",
    title: "About Adrevnview — Web Design, SEO & GEO Agency",
    description:
      "Learn about Adrevnview: a premium digital agency delivering custom web design, development, branding, SEO, and Generative Engine Optimization (GEO).",
  },
  privacy: {
    path: "/privacy",
    title: "Privacy Policy | Adrevnview",
    description:
      "Adrevnview privacy policy covering site analytics, cookies, contact forms, and how we handle personal information.",
  },
  accessibility: {
    path: "/accessibility",
    title: "Accessibility Statement | Adrevnview",
    description:
      "Adrevnview accessibility statement and commitment to inclusive, usable experiences for all visitors.",
  },
  geoReport: {
    path: "/geo-report",
    title: "Free SEO & GEO Report Generator | Adrevnview",
    description:
      "Analyze any URL for SEO and Generative Engine Optimization. 45+ checks for Google, ChatGPT, Perplexity, Claude, and Gemini AI visibility.",
  },
} as const;
