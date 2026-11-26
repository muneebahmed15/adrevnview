import { CLIENTS, getClientPath, isClientPath } from "@/lib/content/clients";
import { SERVICE_BY_SLUG } from "@/lib/content/services";
import { ORG, SITE_URL } from "./siteConfig";
import homeFaq from "@/app/next/faq.json";

type FaqItem = { question: string; answer: string };

const SERVICE_OFFERS = [
  { name: "Website Design", url: `${SITE_URL}/services/custom-web-design` },
  { name: "Website Redesign", url: `${SITE_URL}/services/website-redesign` },
  { name: "Online Store Design", url: `${SITE_URL}/services/shopify-development` },
  { name: "Google Search and Google Business Profile", url: `${SITE_URL}/services/seo-services` },
  { name: "AI Search Setup (GEO)", url: `${SITE_URL}/services/seo-services` },
  { name: "Google, Instagram and Facebook Ads", url: `${SITE_URL}/#ads` },
  { name: "Social Media Posts and Motion Video", url: `${SITE_URL}/#ads` },
  { name: "Logo and Brand Identity", url: `${SITE_URL}/services/brand-identity` },
  { name: "Printing and Signs", url: `${SITE_URL}/services/printing-services` },
  { name: "Restaurant Menu Printing", url: `${SITE_URL}/services/restaurant-menu-printing` },
  { name: "Business Card Printing", url: `${SITE_URL}/services/business-card-printing` },
  { name: "Brochure and Flyer Printing", url: `${SITE_URL}/services/brochure-and-flyer-printing` },
  { name: "Letterhead Printing", url: `${SITE_URL}/services/letterhead-printing` },
  { name: "Banner Printing", url: `${SITE_URL}/services/panaflex-and-banner-advertising` },
  { name: "TV Menu Boards", url: `${SITE_URL}/#print` },
  { name: "Software for Restaurants, Gyms, Barbers and Clinics", url: `${SITE_URL}/#software` },
];

const CLIENT_PROJECTS = CLIENTS.map((client) => ({
  name: client.name,
  url: client.url,
  description: client.shortDescription,
  caseStudyUrl: `${SITE_URL}${getClientPath(client.slug)}`,
}));

const HOME_FAQ: FaqItem[] = homeFaq.map((item) => ({ question: item.q, answer: item.a }));

export const CONTACT_FAQ: FaqItem[] = [
  {
    question: "How do I request a project quote?",
    answer:
      "Fill out the contact form below or email hello@adrevnview.com with your project scope, timeline, and budget range. Include print formats and quantities if you need menus, cards, or banners. We respond within one business day.",
  },
  {
    question: "Can I request a quote for printing and signage?",
    answer:
      "Yes. Tell us formats, quantities, and delivery location for restaurant menus, business cards, letterheads, brochures, or panaflex banners and we will quote design and production together.",
  },
  {
    question: "What industries does Adrevnview serve?",
    answer:
      "We work with B2B SaaS, eCommerce, healthcare, legal, real estate, manufacturing, financial services, restaurants, and enterprise organizations.",
  },
  {
    question: "Do you offer free SEO and GEO audits?",
    answer: "Yes. Use our free GEO Report tool at /geo-report to analyze any URL for SEO and AI visibility readiness.",
  },
];

const NFC_FAQ: FaqItem[] = [
  {
    question: "What is the Adrevnview Google NFC Review Card?",
    answer:
      "It is a physical NFC and QR-enabled card that sends customers directly to your Google Business review page with one tap — no app required.",
  },
  {
    question: "How much does the Google NFC review card cost?",
    answer: "The card is a one-time purchase of $99 with free shipping and a lifetime guarantee.",
  },
  {
    question: "What phones work with the NFC review card?",
    answer:
      "All modern iPhones (XS and later) and Android phones from 2018 onwards. Older devices can scan the QR code on the back.",
  },
];

export const VISIBLE_HOME_FAQ: FaqItem[] = HOME_FAQ;

function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: ORG.name,
    legalName: ORG.legalName,
    url: ORG.url,
    logo: ORG.logo,
    image: ORG.logo,
    description:
      "One shop for a local business: websites, Google listing, print, TV menu boards, ads, motion video and software. Based in Garden City, Long Island, New York, working across the United States.",
    email: ORG.email,
    telephone: ORG.phone,
    foundingDate: ORG.foundingDate,
    address: {
      "@type": "PostalAddress",
      ...ORG.address,
    },
    areaServed: ["Long Island", "New York", "United States"],
    sameAs: ORG.sameAs,
    knowsAbout: ORG.knowsAbout,
    founder: {
      "@type": "Person",
      name: "Muneeb Ahmed",
      email: ORG.email,
      worksFor: { "@id": `${SITE_URL}/#organization` },
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: ORG.email,
      telephone: ORG.phone,
      availableLanguage: ["English"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Adrevnview services",
      itemListElement: SERVICE_OFFERS.map((offer, i) => ({
        "@type": "Offer",
        position: i + 1,
        url: offer.url,
        itemOffered: {
          "@type": "Service",
          name: offer.name,
          url: offer.url,
          provider: { "@id": `${SITE_URL}/#organization` },
        },
      })),
    },
  };
}

function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: ORG.name,
    url: SITE_URL,
    description: "Websites, Google listing, print, TV boards, ads, motion video and software for local businesses.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };
}

function webPageSchema(path: string, title: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name: title,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable='true']", "meta[name='description']"],
    },
  };
}

function faqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function portfolioSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Adrevnview Client Projects",
    description: "Selected websites and platforms designed and built by Adrevnview.",
    itemListElement: CLIENT_PROJECTS.map((project, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: project.name,
        url: project.caseStudyUrl,
        sameAs: project.url,
        description: project.description,
        creator: { "@id": `${SITE_URL}/#organization` },
      },
    })),
  };
}

function caseStudySchema(slug: string) {
  const client = CLIENTS.find((c) => c.slug === slug);
  if (!client) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}${getClientPath(slug)}#article`,
    headline: client.seoTitle,
    description: client.seoDescription,
    url: `${SITE_URL}${getClientPath(slug)}`,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    about: {
      "@type": "Organization",
      name: client.name,
      url: client.url,
    },
    mentions: {
      "@type": "WebSite",
      name: client.name,
      url: client.url,
    },
    inLanguage: "en-US",
  };
}

function productSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/googlenfc#product`,
    name: "Google NFC Review Card",
    description:
      "NFC and QR-enabled review card that sends customers directly to your Google Business review page. Pre-programmed, no app required.",
    brand: { "@type": "Organization", "@id": `${SITE_URL}/#organization` },
    offers: {
      "@type": "Offer",
      price: "99.00",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/googlenfc`,
      priceValidityDate: "2027-12-31",
    },
  };
}

function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${item.path}`,
    })),
  };
}

function serviceSchema(slug: string) {
  const service = SERVICE_BY_SLUG[slug];
  if (!service) return null;
  const url = `${SITE_URL}/services/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seoDescription,
    url,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: ["Long Island", "New York", "United States"],
    serviceType: service.category === "printing" ? "Printing" : service.category,
  };
}

export function getStructuredData(path: string, title: string, description: string) {
  const graphs = [
    organizationSchema(),
    websiteSchema(),
    webPageSchema(path, title, description),
    portfolioSchema(),
  ];

  if (path === "/") {
    graphs.push(faqSchema(HOME_FAQ));
  }

  if (path === "/googlenfc") {
    graphs.push(faqSchema(NFC_FAQ));
    graphs.push(productSchema());
  }

  if (path === "/contact") {
    graphs.push(faqSchema(CONTACT_FAQ));
  }

  const serviceMatch = path.match(/^\/services\/([^/]+)$/);
  if (serviceMatch) {
    const slug = serviceMatch[1];
    const service = SERVICE_BY_SLUG[slug];
    const schema = serviceSchema(slug);
    if (schema) graphs.push(schema);
    if (service?.faq.length) graphs.push(faqSchema(service.faq));
    if (service) {
      graphs.push(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path },
        ]),
      );
    }
  }

  if (isClientPath(path)) {
    const slug = path.replace(/^\//, "");
    const caseStudy = caseStudySchema(slug);
    if (caseStudy) graphs.push(caseStudy);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graphs,
  };
}
