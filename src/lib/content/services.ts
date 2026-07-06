export type ServicePage = {
  slug: string;
  title: string;
  category: "web-design" | "development" | "marketing" | "branding";
  headline: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  benefits: string[];
  process: string[];
  faq: { question: string; answer: string }[];
};

function slugify(label: string): string {
  return label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const SERVICE_DEFINITIONS: Omit<ServicePage, "slug">[] = [
  {
    title: "Custom Web Design",
    category: "web-design",
    headline: "Custom Web Design That Converts Visitors Into Clients",
    description: "Bespoke, conversion-focused website design tailored to your brand strategy, audience, and business goals.",
    seoTitle: "Custom Web Design Services | Adrevnview",
    seoDescription: "Adrevnview delivers custom web design for B2B, B2C, and enterprise brands — strategy-led layouts, premium visuals, and conversion optimization.",
    intro: "Your website is often the first sales conversation you have with a prospect. Adrevnview designs custom websites that communicate credibility in seconds, guide visitors toward clear actions, and reflect the quality of your brand at every breakpoint. We combine UX research, brand strategy, and performance-minded design systems so your site looks exceptional and drives measurable pipeline.",
    benefits: ["Brand-aligned visual systems", "Mobile-first responsive layouts", "Conversion-focused page architecture", "Accessibility-conscious design patterns", "Design systems that scale across pages"],
    process: ["Discovery workshop and audience mapping", "Information architecture and wireframes", "High-fidelity UI design and prototyping", "Stakeholder review and iteration", "Developer-ready handoff with specs"],
    faq: [
      { question: "How long does a custom web design project take?", answer: "Most custom website design projects run 4–8 weeks depending on scope, page count, and feedback cycles." },
      { question: "Do you design for B2B and enterprise brands?", answer: "Yes. We specialize in B2B SaaS, professional services, and enterprise sites that need trust, clarity, and lead generation." },
    ],
  },
  {
    title: "Landing Page Design",
    category: "web-design",
    headline: "High-Converting Landing Page Design",
    description: "Focused landing pages built to capture leads, promote campaigns, and maximize ad spend ROI.",
    seoTitle: "Landing Page Design Agency | Adrevnview",
    seoDescription: "Conversion-optimized landing page design for campaigns, product launches, and paid media — fast turnaround from Adrevnview.",
    intro: "Campaign traffic deserves a destination built to convert. We design landing pages with singular focus: one offer, one audience, one action. Every section is structured to reduce friction, reinforce value, and support your paid and organic acquisition channels.",
    benefits: ["Campaign-specific messaging hierarchy", "A/B-test-ready modular sections", "Fast load performance", "CRM and analytics integration hooks", "Consistent brand execution"],
    process: ["Offer and audience definition", "Wireframe and copy outline", "Visual design and mobile polish", "Launch support and iteration"],
    faq: [{ question: "Can you design landing pages for paid ads?", answer: "Yes. We align page structure with Google Ads, Meta, and LinkedIn campaign goals for higher quality scores and conversion rates." }],
  },
  {
    title: "UI/UX Design",
    category: "web-design",
    headline: "UI/UX Design for Digital Products and Marketing Sites",
    description: "User experience design that balances usability, aesthetics, and measurable business outcomes.",
    seoTitle: "UI/UX Design Services | Adrevnview",
    seoDescription: "Professional UI/UX design — user flows, wireframes, prototypes, and interface systems for web apps and marketing sites.",
    intro: "Great UX removes guesswork for your users and your sales team. Adrevnview maps user journeys, designs intuitive interfaces, and validates flows before development begins — saving rework and accelerating time to launch.",
    benefits: ["User journey mapping", "Interactive prototypes", "Design system components", "Usability-focused navigation", "Cross-device experience consistency"],
    process: ["User research and persona alignment", "Flow diagrams and wireframes", "UI design and component library", "Prototype review and refinement"],
    faq: [{ question: "Do you design SaaS product interfaces?", answer: "Yes. We design marketing sites and product UI for SaaS platforms, dashboards, and customer portals." }],
  },
  {
    title: "Website Redesign",
    category: "web-design",
    headline: "Website Redesign Without Losing SEO Equity",
    description: "Modernize your digital presence while preserving rankings, redirects, and brand recognition.",
    seoTitle: "Website Redesign Services | Adrevnview",
    seoDescription: "Strategic website redesigns that improve UX, performance, and conversions while protecting SEO rankings and redirect integrity.",
    intro: "An outdated website costs you trust and search visibility. We audit your current site, preserve what works, migrate content safely, and deliver a modern experience that improves engagement without tanking organic traffic.",
    benefits: ["SEO-safe migration planning", "Content and URL mapping", "Performance improvements", "Updated brand expression", "Improved conversion paths"],
    process: ["Site audit and goal setting", "Content inventory and redirect plan", "Redesign and development", "QA, launch, and post-launch monitoring"],
    faq: [{ question: "Will a redesign hurt my Google rankings?", answer: "Not when done correctly. We implement redirects, maintain URL structures where possible, and preserve on-page SEO fundamentals." }],
  },
  {
    title: "Responsive Design",
    category: "web-design",
    headline: "Responsive Web Design for Every Device",
    description: "Fluid layouts and touch-friendly interfaces optimized for mobile, tablet, and desktop users.",
    seoTitle: "Responsive Web Design | Adrevnview",
    seoDescription: "Mobile-first responsive web design ensuring your site performs beautifully on phones, tablets, and desktops.",
    intro: "More than half of web traffic is mobile. We design responsive experiences that adapt gracefully across screen sizes, maintain readability, and keep core CTAs within thumb reach on every device.",
    benefits: ["Mobile-first layout strategy", "Touch-optimized interactions", "Consistent branding across breakpoints", "Core Web Vitals awareness", "Cross-browser testing"],
    process: ["Breakpoint planning", "Mobile layout design", "Tablet and desktop expansion", "Device QA before launch"],
    faq: [{ question: "Is responsive design included in all projects?", answer: "Yes. Every Adrevnview website is built mobile-first and tested across major devices and browsers." }],
  },
  {
    title: "React Development",
    category: "development",
    headline: "React Web Development for Modern Brands",
    description: "Fast, scalable React applications and marketing sites with clean architecture and SEO-friendly rendering.",
    seoTitle: "React Development Agency | Adrevnview",
    seoDescription: "Expert React development for marketing sites, SaaS products, and interactive web applications — performance and SEO built in.",
    intro: "React powers fast, interactive experiences when implemented with discipline. We build React frontends with component-driven architecture, optimized bundles, and prerendering strategies so search engines and AI crawlers can read your content.",
    benefits: ["Component-based architecture", "Performance optimization", "Prerender and SEO support", "API and CMS integrations", "Maintainable TypeScript codebase"],
    process: ["Technical planning", "Component development", "Integration and testing", "Deployment and monitoring"],
    faq: [{ question: "Do you use Next.js or Vite?", answer: "We choose the best stack per project — Vite + React for marketing sites, Next.js when SSR/SSG requirements demand it." }],
  },
  {
    title: "WordPress Development",
    category: "development",
    headline: "WordPress Development for Content-Driven Brands",
    description: "Custom WordPress themes and plugins with security, speed, and editor-friendly workflows.",
    seoTitle: "WordPress Development Services | Adrevnview",
    seoDescription: "Custom WordPress development — bespoke themes, plugin integration, performance tuning, and SEO-ready content workflows.",
    intro: "WordPress remains a powerful CMS when customized correctly. We build secure, fast WordPress sites with intuitive editing experiences and clean theme code that won't break with updates.",
    benefits: ["Custom theme development", "Editor-friendly blocks", "Security hardening", "Caching and performance", "SEO plugin configuration"],
    process: ["Requirements and plugin audit", "Theme design and build", "Content migration", "Training and launch"],
    faq: [{ question: "Can you migrate my site to WordPress?", answer: "Yes. We handle content migration, redirect mapping, and design refresh during WordPress migrations." }],
  },
  {
    title: "Shopify Development",
    category: "development",
    headline: "Shopify Store Design and Development",
    description: "High-converting Shopify storefronts with custom themes, apps, and checkout optimization.",
    seoTitle: "Shopify Development Agency | Adrevnview",
    seoDescription: "Shopify store design and development — custom themes, product page optimization, and eCommerce conversion improvements.",
    intro: "Your Shopify store should sell as hard as your best salesperson. We design and develop Shopify experiences optimized for product discovery, trust signals, and frictionless checkout.",
    benefits: ["Custom Shopify themes", "Product page optimization", "App integration", "Mobile commerce UX", "Conversion rate improvements"],
    process: ["Store audit and strategy", "Theme design and development", "Product setup and QA", "Launch and optimization"],
    faq: [{ question: "Do you work with Shopify Plus?", answer: "Yes. We support Shopify and Shopify Plus stores for growing eCommerce brands." }],
  },
  {
    title: "Webflow Development",
    category: "development",
    headline: "Webflow Design and Development",
    description: "Pixel-perfect Webflow sites with clean CMS structure and fast publishing workflows.",
    seoTitle: "Webflow Development Services | Adrevnview",
    seoDescription: "Professional Webflow development — visual design, CMS collections, interactions, and SEO-ready publishing for marketing teams.",
    intro: "Webflow empowers marketing teams to publish quickly without sacrificing design quality. We build Webflow sites with structured CMS collections, reusable components, and SEO best practices baked in.",
    benefits: ["Visual development in Webflow", "CMS architecture", "Interactions and animations", "Client editor training", "Hosting and launch support"],
    process: ["Design system setup", "Page and CMS build", "Interactions and QA", "Editor handoff"],
    faq: [{ question: "Can our team edit the site after launch?", answer: "Yes. We structure Webflow CMS and style guides so your team can update content safely." }],
  },
  {
    title: "API Integrations",
    category: "development",
    headline: "API Integrations and Automation",
    description: "Connect your website to CRMs, payment systems, marketing tools, and internal platforms.",
    seoTitle: "API Integration Services | Adrevnview",
    seoDescription: "Custom API integrations — CRM, ERP, payment gateways, marketing automation, and third-party platform connections.",
    intro: "Disconnected tools create manual work and lost leads. We integrate your website with HubSpot, Salesforce, Stripe, Zapier, and custom APIs so data flows automatically between systems.",
    benefits: ["CRM and form integrations", "Payment gateway setup", "Webhook and automation flows", "Secure authentication", "Error monitoring"],
    process: ["Integration mapping", "API development", "Testing and validation", "Documentation and handoff"],
    faq: [{ question: "Which platforms do you integrate with?", answer: "HubSpot, Salesforce, Stripe, Mailchimp, Google Analytics, and most REST/GraphQL APIs." }],
  },
  {
    title: "SEO Services",
    category: "marketing",
    headline: "SEO Services That Compound Organic Traffic",
    description: "Technical SEO, on-page optimization, and content strategy for sustainable search growth.",
    seoTitle: "SEO Services Agency | Adrevnview",
    seoDescription: "Full-service SEO — technical audits, on-page optimization, content strategy, and Generative Engine Optimization from Adrevnview.",
    intro: "SEO is a long-term growth channel when executed with technical rigor and quality content. We fix crawl issues, optimize page structure, build topical authority, and align your site with how Google and AI assistants discover brands.",
    benefits: ["Technical SEO audits", "On-page optimization", "Schema markup implementation", "Content strategy", "GEO and AI visibility"],
    process: ["SEO audit and baseline", "Priority roadmap", "Implementation sprints", "Monthly reporting"],
    faq: [{ question: "Do you offer GEO optimization?", answer: "Yes. We structure content, schema, and llms.txt files so AI assistants can cite your brand accurately." }],
  },
  {
    title: "PPC Advertising",
    category: "marketing",
    headline: "PPC Advertising Management",
    description: "Paid search and social campaigns with landing pages designed to maximize ROAS.",
    seoTitle: "PPC Advertising Services | Adrevnview",
    seoDescription: "Google Ads and paid social campaign management with conversion-optimized landing pages from Adrevnview.",
    intro: "Paid media works best with aligned messaging and landing experiences. We manage PPC campaigns and build dedicated landing pages that improve quality scores and lower cost per acquisition.",
    benefits: ["Google Ads management", "Landing page alignment", "Conversion tracking setup", "A/B testing", "Monthly performance reviews"],
    process: ["Account audit", "Campaign structure", "Creative and landing pages", "Optimization cycles"],
    faq: [{ question: "Do you build landing pages for ads?", answer: "Yes. Landing page design and development are core to our PPC offering." }],
  },
  {
    title: "Social Media Marketing",
    category: "marketing",
    headline: "Social Media Marketing for Brand Growth",
    description: "Content strategy and creative assets that build audience and drive website traffic.",
    seoTitle: "Social Media Marketing | Adrevnview",
    seoDescription: "Social media marketing strategy, content calendars, and creative assets for B2B and B2C brands.",
    intro: "Social channels extend your brand voice and nurture prospects between website visits. We develop content strategies, creative templates, and posting calendars aligned with your business goals.",
    benefits: ["Platform strategy", "Content calendars", "Creative asset design", "Community guidelines", "Analytics reporting"],
    process: ["Brand voice alignment", "Content planning", "Asset production", "Publishing and review"],
    faq: [{ question: "Which platforms do you support?", answer: "LinkedIn, Instagram, Facebook, X, and YouTube — focused on where your audience is active." }],
  },
  {
    title: "Email Marketing",
    category: "marketing",
    headline: "Email Marketing and Automation",
    description: "Nurture sequences, newsletters, and lifecycle campaigns that convert subscribers.",
    seoTitle: "Email Marketing Services | Adrevnview",
    seoDescription: "Email marketing strategy, template design, automation flows, and list growth for B2B and eCommerce brands.",
    intro: "Email remains one of the highest-ROI marketing channels. We design templates, write nurture sequences, and set up automation that turns subscribers into customers.",
    benefits: ["Template design", "Automation workflows", "List segmentation", "A/B testing", "Deliverability best practices"],
    process: ["Strategy and segmentation", "Template design", "Automation build", "Launch and optimize"],
    faq: [{ question: "Which email platforms do you use?", answer: "Mailchimp, Klaviyo, HubSpot, and ActiveCampaign depending on your stack." }],
  },
  {
    title: "Content Strategy",
    category: "marketing",
    headline: "Content Strategy for SEO and Thought Leadership",
    description: "Editorial planning, topic clusters, and content that ranks and builds authority.",
    seoTitle: "Content Strategy Services | Adrevnview",
    seoDescription: "Content strategy, editorial calendars, and SEO-driven topic planning from Adrevnview.",
    intro: "Random blog posts don't build authority. We create content strategies mapped to search intent, buyer journeys, and AI citation opportunities — so every article supports pipeline and discoverability.",
    benefits: ["Topic cluster planning", "Editorial calendars", "SEO briefs", "GEO-optimized formats", "Performance tracking"],
    process: ["Audience and keyword research", "Content roadmap", "Production support", "Quarterly reviews"],
    faq: [{ question: "Do you write the content?", answer: "We provide strategy and briefs; copywriting can be included or paired with your internal team." }],
  },
  {
    title: "Logo Design",
    category: "branding",
    headline: "Logo Design That Defines Your Brand",
    description: "Memorable logo systems with versatile lockups for digital and print applications.",
    seoTitle: "Logo Design Services | Adrevnview",
    seoDescription: "Professional logo design — concept exploration, refinement, and delivery of scalable brand marks.",
    intro: "Your logo is the anchor of brand recognition. We explore concepts rooted in your positioning, refine with stakeholder feedback, and deliver production-ready files for every channel.",
    benefits: ["Multiple concept directions", "Scalable vector files", "Color and monochrome variants", "Social and favicon exports", "Usage guidelines"],
    process: ["Brand discovery", "Concept presentation", "Refinement rounds", "Final delivery"],
    faq: [{ question: "How many concepts do you provide?", answer: "Typically 3 initial directions with 2 refinement rounds included." }],
  },
  {
    title: "Brand Identity",
    category: "branding",
    headline: "Complete Brand Identity Systems",
    description: "Visual identity beyond the logo — typography, color, imagery, and brand applications.",
    seoTitle: "Brand Identity Design | Adrevnview",
    seoDescription: "Full brand identity design — logos, typography, color palettes, and visual systems for consistent brand expression.",
    intro: "A strong brand identity creates instant recognition and trust. We develop cohesive visual systems that work across your website, social channels, presentations, and product interfaces.",
    benefits: ["Logo and mark system", "Typography selection", "Color palette definition", "Imagery direction", "Brand application examples"],
    process: ["Discovery and positioning", "Visual exploration", "System development", "Guidelines delivery"],
    faq: [{ question: "Is brand identity separate from web design?", answer: "They can be standalone or combined. Many clients start with identity before a website redesign." }],
  },
  {
    title: "Brand Strategy",
    category: "branding",
    headline: "Brand Strategy and Positioning",
    description: "Clarify your value proposition, audience, and messaging before design begins.",
    seoTitle: "Brand Strategy Consulting | Adrevnview",
    seoDescription: "Brand strategy workshops — positioning, messaging, audience definition, and competitive differentiation.",
    intro: "Design without strategy is decoration. We facilitate workshops to define your positioning, articulate your value proposition, and align messaging across marketing and sales touchpoints.",
    benefits: ["Positioning statements", "Audience personas", "Messaging hierarchy", "Competitive analysis", "Brand narrative"],
    process: ["Stakeholder interviews", "Workshop facilitation", "Strategy documentation", "Messaging application"],
    faq: [{ question: "Who should attend a brand strategy workshop?", answer: "Founders, marketing leads, and sales stakeholders who shape how the brand is presented." }],
  },
  {
    title: "Visual Design Systems",
    category: "branding",
    headline: "Visual Design Systems for Scale",
    description: "Component libraries and design tokens that keep large teams visually consistent.",
    seoTitle: "Visual Design Systems | Adrevnview",
    seoDescription: "Design systems — components, tokens, documentation, and Figma libraries for consistent product and marketing design.",
    intro: "As teams grow, inconsistency creeps in. We build design systems with reusable components, documented patterns, and Figma libraries so every page and product surface feels cohesive.",
    benefits: ["Figma component libraries", "Design token documentation", "Pattern documentation", "Developer handoff specs", "Governance recommendations"],
    process: ["Audit existing assets", "Token and component definition", "Documentation", "Team rollout"],
    faq: [{ question: "Do you document for developers?", answer: "Yes. We provide specs and component maps for engineering implementation." }],
  },
  {
    title: "Brand Guidelines",
    category: "branding",
    headline: "Brand Guidelines and Style Guides",
    description: "Comprehensive brand books that govern logo usage, tone, and visual standards.",
    seoTitle: "Brand Guidelines Development | Adrevnview",
    seoDescription: "Brand style guides and guidelines documenting logo usage, colors, typography, and voice for internal and partner teams.",
    intro: "Brand guidelines protect your investment in identity. We produce clear, accessible documentation so employees, agencies, and partners represent your brand correctly every time.",
    benefits: ["Logo usage rules", "Color and typography specs", "Voice and tone guidance", "Do's and don'ts examples", "Digital and print standards"],
    process: ["Asset collection", "Guideline writing", "Visual examples", "Distribution format"],
    faq: [{ question: "What format are guidelines delivered in?", answer: "PDF and Figma-linked digital formats, optimized for sharing with vendors and partners." }],
  },
];

export const SERVICES: ServicePage[] = SERVICE_DEFINITIONS.map((s) => ({
  ...s,
  slug: slugify(s.title),
}));

export const SERVICE_BY_SLUG = Object.fromEntries(SERVICES.map((s) => [s.slug, s])) as Record<string, ServicePage>;

export function getServicePath(slug: string): string {
  return `/services/${slug}`;
}

export const FOOTER_LINKS: Record<string, { label: string; slug: string }[]> = {
  "Web Design": [
    "Custom Web Design",
    "Landing Page Design",
    "UI/UX Design",
    "Website Redesign",
    "Responsive Design",
  ].map((label) => ({ label, slug: slugify(label) })),
  Development: [
    "React Development",
    "WordPress Development",
    "Shopify Development",
    "Webflow Development",
    "API Integrations",
  ].map((label) => ({ label, slug: slugify(label) })),
  Marketing: [
    "SEO Services",
    "PPC Advertising",
    "Social Media Marketing",
    "Email Marketing",
    "Content Strategy",
  ].map((label) => ({ label, slug: slugify(label) })),
  Branding: [
    "Logo Design",
    "Brand Identity",
    "Brand Strategy",
    "Visual Design Systems",
    "Brand Guidelines",
  ].map((label) => ({ label, slug: slugify(label) })),
};

export const NAV_SERVICE_LINKS = [
  "Custom Web Design",
  "Web Development",
  "eCommerce Design",
  "Branding & Identity",
  "SEO & Marketing",
  "Website Redesign",
].map((label) => {
  const map: Record<string, string> = {
    "Custom Web Design": "custom-web-design",
    "Web Development": "react-development",
    "eCommerce Design": "shopify-development",
    "Branding & Identity": "brand-identity",
    "SEO & Marketing": "seo-services",
    "Website Redesign": "website-redesign",
  };
  return { label, slug: map[label] ?? slugify(label) };
});
