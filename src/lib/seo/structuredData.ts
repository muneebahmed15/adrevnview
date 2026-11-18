import { CLIENTS, getClientPath, isClientPath } from "@/lib/content/clients";
import { SERVICE_BY_SLUG } from "@/lib/content/services";
import { ORG, SITE_URL } from "./siteConfig";

type FaqItem = { question: string; answer: string };

const SERVICE_OFFERS = [
  { name: "Custom Web Design", url: `${SITE_URL}/services/custom-web-design` },
  { name: "Web Development & Integrations", url: `${SITE_URL}/services/react-development` },
  { name: "eCommerce Design & Development", url: `${SITE_URL}/services/shopify-development` },
  { name: "Branding & Brand Identity", url: `${SITE_URL}/services/brand-identity` },
  { name: "SEO & Digital Marketing", url: `${SITE_URL}/services/seo-services` },
  { name: "Generative Engine Optimization (GEO)", url: `${SITE_URL}/services/seo-services` },
  { name: "Website Redesign", url: `${SITE_URL}/services/website-redesign` },
  { name: "Printing & Signage", url: `${SITE_URL}/services/printing-services` },
  { name: "Business Card Printing", url: `${SITE_URL}/services/business-card-printing` },
  { name: "Letterhead Printing", url: `${SITE_URL}/services/letterhead-printing` },
  { name: "Restaurant Menu Printing", url: `${SITE_URL}/services/restaurant-menu-printing` },
  { name: "Brochure and Flyer Printing", url: `${SITE_URL}/services/brochure-and-flyer-printing` },
  { name: "Panaflex & Flex Banner Advertising", url: `${SITE_URL}/services/panaflex-and-banner-advertising` },
];

const CLIENT_PROJECTS = CLIENTS.map((client) => ({
  name: client.name,
  url: client.url,
  description: client.shortDescription,
  caseStudyUrl: `${SITE_URL}${getClientPath(client.slug)}`,
}));

const HOME_FAQ: FaqItem[] = [
  {
    question: "What is Adrevnview?",
    answer:
      "Adrevnview is a premium full-service agency specializing in custom web design, web development, branding, SEO, Generative Engine Optimization (GEO), and printing for B2B, B2C, and enterprise brands.",
  },
  {
    question: "What is Generative Engine Optimization (GEO)?",
    answer:
      "GEO is the practice of structuring website content, metadata, and schema markup so AI assistants (ChatGPT, Perplexity, Gemini) can accurately understand, cite, and recommend your brand and services.",
  },
  {
    question: "What services does Adrevnview offer?",
    answer:
      "Adrevnview offers custom web design, full-stack development, eCommerce design, brand identity systems, SEO, digital marketing, website redesigns, GEO, and printing — including restaurant menus, business cards, letterheads, brochures, and panaflex outdoor banners.",
  },
  {
    question: "Does Adrevnview design websites and print menus on Long Island?",
    answer:
      "Yes. Adrevnview is based on Long Island, New York. We design custom websites and produce restaurant menus, business cards, letterheads, brochures, and panaflex banners for local shops and national brands.",
  },
  {
    question: "How long does a custom website take, and what do projects cost?",
    answer:
      "Most custom website design projects run 4–8 weeks depending on scope, page count, and feedback cycles. Website, branding, and print work is quoted from a brief. The Google NFC Review Card is a $99 one-time product. Request a quote at https://www.adrevnview.com/contact.",
  },
  {
    question: "Do you build Shopify stores and React websites?",
    answer:
      "Yes. We design and develop Shopify and Shopify Plus storefronts, and we build React marketing sites and applications (Vite or Next.js when the project needs it) with SEO-friendly rendering.",
  },
  {
    question: "How do I contact Adrevnview?",
    answer:
      "Contact Adrevnview at hello@adrevnview.com or (516) 820-7863. Request a free consultation at https://www.adrevnview.com/contact.",
  },
];

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
      "Premium web design and print agency delivering custom websites, branding, SEO, Generative Engine Optimization, and printing for B2B, B2C, and enterprise brands.",
    email: ORG.email,
    telephone: ORG.phone,
    foundingDate: ORG.foundingDate,
    address: {
      "@type": "PostalAddress",
      ...ORG.address,
    },
    areaServed: ["United States", "Europe", "Global"],
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
      name: "Digital Agency Services",
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
    description: "Premium web design and print agency — custom websites, SEO, GEO, and printing.",
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
