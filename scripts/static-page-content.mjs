import { readFileSync } from "node:fs";
/** Static HTML bodies for crawlers — mirrors React page content for SEO/GEO. */

export const HOME_FAQ = JSON.parse(
  readFileSync(new URL("../src/app/next/faq.json", import.meta.url), "utf8"),
).map((item) => ({ question: item.q, answer: item.a }));

export const HOME_TITLE = "Adrevnview | Websites, Print, Ads and Software for Local Businesses";
export const HOME_DESCRIPTION =
  "One shop for your website, Google listing, print, TV boards, ads, motion video and software. Based on Long Island, New York, working across the United States.";

function esc(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export const HOME_BODY = `
<main>
  <nav aria-label="Primary">
    <a href="/">Home</a> · <a href="/services">Services</a> ·
    <a href="/services/printing-services">Print</a> · <a href="/about">About</a> ·
    <a href="/blog">Blog</a> · <a href="/contact">Contact</a> ·
    <a href="/geo-report">Free website check</a>
  </nav>
  <article>
    <h1 data-speakable="true">Everything your business shows the street.</h1>
    <p data-geo-chunk="summary" data-speakable="true">Adrevnview is one shop for a local business. We make the website, the Google listing, the menus and print, the TV boards, the ads, the motion videos and the software. Our shop is in Garden City, on Long Island, New York. Most of our work is in New York, and we work with businesses across the United States.</p>
    <p>Call <a href="tel:5168207863">(516) 820-7863</a> or email <a href="mailto:hello@adrevnview.com">hello@adrevnview.com</a>. Address: 1225 Franklin Ave, Suite 300, Garden City, NY 11530.</p>
    <section>
      <h2>Who we work with</h2>
      <ul>
        <li>Restaurants</li>
        <li>Bagel shops and delis</li>
        <li>Dessert shops and cafés</li>
        <li>Gyms and academies</li>
        <li>Barbershops and salons</li>
        <li>Clinics and med spas</li>
        <li>Stores</li>
      </ul>
    </section>
    <section>
      <h2>What we do</h2>
      <h3>Websites</h3>
      <ul>
        <li><a href="/services/custom-web-design">Business website</a>: a site designed around your business, built to load fast on a phone.</li>
        <li><a href="/services/website-redesign">Website rebuild</a>: a new site that keeps the Google traffic the old one earned.</li>
        <li><a href="/services/landing-page-design">Landing page</a>: one page for one offer, made to pair with an ad.</li>
        <li><a href="/services/shopify-development">Online store</a>: sell and take payment online.</li>
      </ul>
      <h3>Google and AI search</h3>
      <ul>
        <li><a href="/services/seo-services">Search engine work</a>: help Google show your pages to people nearby.</li>
        <li>Google listing care: the box that shows your hours, photos and reviews on Google and Maps.</li>
        <li>AI search setup: make sure ChatGPT, Gemini and others read your business correctly.</li>
        <li><a href="/geo-report">Free website check</a>: type your address and see what Google and AI tools can read.</li>
      </ul>
      <h3>Ads and social</h3>
      <ul>
        <li><a href="/services/ppc-advertising">Paid ads</a>: Google, Facebook and Instagram ads, each with its own page.</li>
        <li><a href="/services/social-media-marketing">Social media</a>: posts and short videos made from your real work.</li>
        <li>Motion videos: animated ads, moving menu boards and logo animations.</li>
        <li><a href="/services/email-marketing">Email</a>: keep past customers coming back.</li>
      </ul>
      <h3>Print and screens</h3>
      <ul>
        <li>TV menu boards: your menu or prices on the screens behind the counter.</li>
        <li><a href="/services/restaurant-menu-printing">Restaurant menus</a>: dine-in and takeout, designed and printed.</li>
        <li><a href="/services/business-card-printing">Business cards</a>: printed and delivered.</li>
        <li><a href="/services/brochure-and-flyer-printing">Flyers</a> and <a href="/services/panaflex-and-banner-advertising">banners</a>: designed, printed and ready to hang.</li>
        <li><a href="/services/letterhead-printing">Letterheads</a>, stickers, labels and packaging.</li>
        <li><a href="/services/brand-identity">Logo and brand</a>: a logo, colors and lettering that match on screen and on paper.</li>
      </ul>
      <h3>Software we built</h3>
      <ul>
        <li><a href="https://matzop.com">Matzop</a> for gyms and academies: memberships, payments, class schedule and attendance.</li>
        <li><a href="https://cutzop.com">Cutzop</a> for barbershops and salons: walk-in check-in on a kiosk and a live chair queue.</li>
        <li><a href="https://doczop.com">Doczop</a> for clinics: one board for several doctors, front desk and rooms.</li>
        <li><a href="https://taxzop.com">Taxzop</a> for small US businesses: sales tax books by state, payroll and pay stubs.</li>
        <li>Bagelzop for bagel shops: a customer ordering page, a kitchen screen and an owner dashboard.</li>
      </ul>
    </section>
    <section>
      <h2>Packages</h2>
      <ul>
        <li>Open the doors: from $1,500, one time. For a new business, or one starting over.</li>
        <li>Get found: from $500 a month. For a business that is open and wants more people to find it.</li>
        <li>Fill the room: from $1,000 a month, plus your ad budget. For a business ready to pay for more customers.</li>
      </ul>
      <p>Your exact price comes in writing after a short talk, before any work starts. <a href="/#quote">Build your order</a>.</p>
    </section>
    <section>
      <h2>Questions people ask</h2>
      ${HOME_FAQ.map((item) => `<h3>${esc(item.question)}</h3>\n      <p>${esc(item.answer)}</p>`).join("\n      ")}
    </section>
  </article>
</main>`;

export const STATIC_PAGES = [
  {
    path: "/about",
    title: "About Adrevnview — Web Design, SEO & GEO Agency",
    description: "Learn about Adrevnview: a premium digital agency delivering custom web design, development, branding, SEO, and Generative Engine Optimization (GEO).",
    body: `<main><h1>About Adrevnview</h1><p data-geo-chunk="summary">Adrevnview is a Long Island full-service agency. We design high-performance websites and produce print and signage — menus, business cards, and panaflex banners — with SEO and Generative Engine Optimization (GEO) built in from day one.</p><h2>What we do</h2><ul><li>Custom web design and conversion-focused UX</li><li>Full-stack development and integrations</li><li>Brand identity systems</li><li>SEO strategy and implementation</li><li>GEO: schema, content structure, and AI discoverability</li><li>Print &amp; signage: <a href="/services/printing-services">printing services</a>, <a href="/services/business-card-printing">business cards</a>, <a href="/services/letterhead-printing">letterhead</a>, <a href="/services/restaurant-menu-printing">restaurant menus</a>, <a href="/services/brochure-and-flyer-printing">brochures &amp; flyers</a>, <a href="/services/panaflex-and-banner-advertising">panaflex banners</a></li></ul><h2>How we work</h2><p>We combine strategy, design, and engineering into one delivery flow. Every build ships with measurable foundations: clean information architecture, performance, analytics-ready structure, and schema markup that helps search engines and AI systems understand what you do.</p><p>Email <a href="mailto:hello@adrevnview.com">hello@adrevnview.com</a> or call <a href="tel:5168207863">(516) 820-7863</a>.</p></main>`,
  },
  {
    path: "/work",
    title: "Client Case Studies & Portfolio | Adrevnview",
    description: "Explore Adrevnview client projects — B2B SaaS platforms, eCommerce storefronts, and enterprise websites designed with SEO and GEO built in.",
    body: `<main><h1>Client Case Studies &amp; Portfolio</h1><p data-geo-chunk="summary">Explore Adrevnview client projects across B2B SaaS, eCommerce, and enterprise — including Tagizo, Axstart, Cizher, Payrowl, and more. Every engagement pairs premium design with SEO and GEO foundations.</p><h2>Featured clients</h2><ul><li><a href="/tagizo">Tagizo</a> — Video intelligence platform</li><li><a href="/axstart">Axstart</a> — SaaS product ecosystem</li><li><a href="/cizher">Cizher</a> — Brand and product design</li><li><a href="/payrowl">Payrowl</a> — Fintech marketing site</li><li><a href="/mishi">Mishi</a> — eCommerce experience</li></ul><p><a href="/contact">Start your project</a></p></main>`,
  },
  {
    path: "/contact",
    title: "Contact Adrevnview — Request a Quote",
    description: "Contact Adrevnview for custom web design, development, SEO, and branding. Email hello@adrevnview.com or request a free consultation.",
    body: `<main><h1>Contact Adrevnview</h1><p data-geo-chunk="summary">Tell us about your web design, development, SEO, branding, or print project. Our team responds within one business day with next steps and a tailored proposal.</p><p>Email: <a href="mailto:hello@adrevnview.com">hello@adrevnview.com</a><br>Phone: <a href="tel:5168207863">(516) 820-7863</a><br>Address: 1225 Franklin Ave, Suite 300, Garden City, NY 11530</p><h2>Request a quote</h2><p>Share your goals, timeline, and budget range — including print quantities and formats if you need menus, cards, or panaflex banners. We serve B2B SaaS, eCommerce, healthcare, legal, real estate, manufacturing, restaurants, and financial services organizations.</p><h2>Common questions</h2><h3>How do I request a project quote?</h3><p>Fill out the contact form or email hello@adrevnview.com with your project scope, timeline, and budget range. We respond within one business day.</p><h3>Can I request a quote for printing and signage?</h3><p>Yes. Include formats, quantities, and delivery location for menus, business cards, letterheads, brochures, or panaflex banners and we will quote production alongside design.</p><h3>What industries does Adrevnview serve?</h3><p>We work with B2B SaaS, eCommerce, healthcare, legal, real estate, manufacturing, financial services, restaurants, and enterprise organizations.</p><h3>Do you offer free SEO and GEO audits?</h3><p>Yes. Use our free GEO Report tool at /geo-report to analyze any URL for SEO and AI visibility readiness.</p><p>Try our free <a href="/geo-report">SEO &amp; GEO Report</a> to analyze any URL for search and AI visibility.</p></main>`,
  },
  {
    path: "/privacy",
    title: "Privacy Policy | Adrevnview",
    description: "Adrevnview privacy policy covering site analytics, cookies, contact forms, and how we handle personal information.",
    body: `<main><h1>Privacy Policy</h1><p data-geo-chunk="summary">This privacy policy explains how Adrevnview collects, uses, and protects information when you visit adrevnview.com or contact us.</p><h2>Information we collect</h2><p>We may collect information you submit through contact forms, including name, email, phone, and project details. We use Google Analytics to understand site usage.</p><h2>How we use information</h2><p>We use contact information to respond to inquiries and provide services. We do not sell personal information to third parties.</p><h2>Contact</h2><p>Questions: <a href="mailto:hello@adrevnview.com">hello@adrevnview.com</a></p></main>`,
  },
  {
    path: "/accessibility",
    title: "Accessibility Statement | Adrevnview",
    description: "Adrevnview accessibility statement and commitment to inclusive, usable experiences for all visitors.",
    body: `<main><h1>Accessibility Statement</h1><p data-geo-chunk="summary">Adrevnview is committed to providing accessible digital experiences for all visitors, including people who use assistive technologies.</p><h2>Our commitment</h2><p>We aim to meet WCAG 2.1 Level AA guidelines across our marketing site and client deliverables. We test keyboard navigation, color contrast, and semantic HTML structure.</p><h2>Feedback</h2><p>Report accessibility barriers to <a href="mailto:hello@adrevnview.com">hello@adrevnview.com</a>.</p></main>`,
  },
  {
    path: "/geo-report",
    title: "Free SEO & GEO Report Generator | Adrevnview",
    description: "Analyze any URL for SEO and Generative Engine Optimization. 45+ checks for Google, ChatGPT, Perplexity, Claude, and Gemini AI visibility.",
    body: `<main><h1>Free SEO &amp; GEO Report Generator</h1><p data-geo-chunk="summary">Analyze any URL for SEO and Generative Engine Optimization readiness. Adrevnview's scanner runs 45+ checks across Google Search, ChatGPT, Perplexity, Claude, and Gemini — covering schema markup, content depth, robots.txt, llms.txt, and AI bot access.</p><h2>What we check</h2><ul><li>On-page SEO: titles, meta descriptions, headings, canonical URLs</li><li>Structured data: Organization, WebSite, FAQPage JSON-LD</li><li>GEO signals: llms.txt, AI bot permissions, content extractability</li><li>Technical: HTTPS, sitemap, robots.txt, prerender readiness</li></ul><p>Enter any public URL to generate a full audit report with actionable recommendations.</p></main>`,
  },
  {
    path: "/seo-report",
    title: "Free SEO & GEO Report Generator | Adrevnview",
    description: "Analyze any URL for SEO and Generative Engine Optimization. 45+ checks for Google, ChatGPT, Perplexity, Claude, and Gemini AI visibility.",
    body: `<main><h1>Free SEO &amp; GEO Report Generator</h1><p data-geo-chunk="summary">Analyze any URL for SEO and Generative Engine Optimization readiness. Adrevnview's scanner runs 45+ checks across Google Search, ChatGPT, Perplexity, Claude, and Gemini.</p></main>`,
  },
  {
    path: "/googlenfc",
    title: "Google NFC Review Card — Get More 5-Star Reviews | Adrevnview",
    description: "Smart NFC + QR review card for local businesses. Customers tap to leave Google reviews instantly. $99 one-time, pre-programmed, lifetime guarantee.",
    body: `<main><h1>Google NFC Review Card</h1><p data-geo-chunk="summary">Get more 5-star Google reviews with a smart NFC and QR review card. Customers tap or scan to leave reviews instantly. $99 one-time, pre-programmed, lifetime guarantee from Adrevnview.</p><h2>How it works</h2><p>Hand customers a branded NFC card. They tap with their phone and land directly on your Google review page — no searching, no friction.</p><h2>Perfect for</h2><p>Restaurants, salons, gyms, dental offices, auto shops, and any local business that depends on Google reviews.</p></main>`,
  },
  {
    path: "/services",
    title: "Digital Agency Services | Adrevnview",
    description: "Full-service web design, development, SEO, GEO, branding, printing, and digital marketing for B2B, B2C, and enterprise brands.",
    body: `<main><h1>Our Services</h1><p data-geo-chunk="summary">Adrevnview is a full-service digital and print agency based on Long Island, New York. Custom web design, React development, Shopify eCommerce, SEO, GEO, brand identity, and print &amp; signage.</p><p><a href="/services/custom-web-design">Custom Web Design</a> · <a href="/services/react-development">Web Development</a> · <a href="/services/seo-services">SEO &amp; Marketing</a> · <a href="/services/printing-services">Print &amp; Signage</a> · <a href="/contact">Contact us</a></p><h2>Print &amp; Signage</h2><ul><li><a href="/services/printing-services">Printing Services</a></li><li><a href="/services/business-card-printing">Business Card Printing</a></li><li><a href="/services/letterhead-printing">Letterhead Printing</a></li><li><a href="/services/restaurant-menu-printing">Restaurant Menu Printing</a></li><li><a href="/services/brochure-and-flyer-printing">Brochure and Flyer Printing</a></li><li><a href="/services/panaflex-and-banner-advertising">Panaflex and Banner Advertising</a></li></ul></main>`,
  },
  {
    path: "/industries",
    title: "Industries We Serve | Adrevnview",
    description: "Web design, development, SEO, and GEO for healthcare, eCommerce, manufacturing, real estate, legal, financial services, and SaaS brands.",
    body: `<main><h1>Industries We Serve</h1><p data-geo-chunk="summary">We design and build for regulated and competitive verticals where trust, clarity, and performance matter.</p><ul><li><a href="/industries/healthcare">Healthcare</a></li><li><a href="/industries/ecommerce">eCommerce</a></li><li><a href="/industries/technology">Technology &amp; SaaS</a></li></ul></main>`,
  },
  {
    path: "/blog",
    title: "Blog — Web Design, SEO & GEO Insights | Adrevnview",
    description: "Articles on custom web design, SEO, Generative Engine Optimization (GEO), eCommerce, and digital marketing.",
    body: `<main><h1>Adrevnview Blog</h1><p data-geo-chunk="summary">Practical guidance on web design, SEO, GEO, and eCommerce for marketing leaders and founders.</p><ul><li><a href="/blog/geo-vs-seo-2026">GEO vs SEO for Long Island Brands</a></li><li><a href="/blog/local-seo-long-island">Local SEO for Long Island Businesses</a></li></ul></main>`,
  },
  {
    path: "/work/b2b",
    title: "B2B Case Studies & Web Design | Adrevnview",
    description: "B2B web design and development case studies — SaaS marketing sites, enterprise platforms, and conversion-focused experiences.",
    body: `<main><h1>B2B Client Projects</h1><p data-geo-chunk="summary">B2B case studies from Adrevnview — SaaS platforms, enterprise websites, and conversion-focused digital experiences.</p><p><a href="/work">View all case studies</a></p></main>`,
  },
  {
    path: "/work/b2c",
    title: "B2C Case Studies & Brand Websites | Adrevnview",
    description: "B2C brand websites and digital experiences built for consumer trust, storytelling, and measurable engagement.",
    body: `<main><h1>B2C Client Projects</h1><p data-geo-chunk="summary">B2C brand websites and digital experiences from Adrevnview.</p><p><a href="/work">View all case studies</a></p></main>`,
  },
  {
    path: "/work/ecommerce",
    title: "eCommerce Case Studies & Shopify Projects | Adrevnview",
    description: "eCommerce design and development portfolio — Shopify stores, retail brands, and conversion-optimized shopping experiences.",
    body: `<main><h1>eCommerce Client Projects</h1><p data-geo-chunk="summary">eCommerce and Shopify case studies from Adrevnview.</p><p><a href="/work">View all case studies</a></p></main>`,
  },
];

/** Keep in sync with `src/lib/content/services.ts` (slugify of title). */
function svc(slug, title, headline, description, intro, faq = []) {
  return { slug, title, headline, description, intro, faq };
}

export const PRINT_SERVICE_SLUGS = [
  "printing-services",
  "business-card-printing",
  "letterhead-printing",
  "restaurant-menu-printing",
  "brochure-and-flyer-printing",
  "panaflex-and-banner-advertising",
];

const PRINT_RELATED = [
  { href: "/services/printing-services", label: "Printing Services" },
  { href: "/services/business-card-printing", label: "Business Cards" },
  { href: "/services/letterhead-printing", label: "Letterhead" },
  { href: "/services/restaurant-menu-printing", label: "Restaurant Menus" },
  { href: "/services/brochure-and-flyer-printing", label: "Brochures & Flyers" },
  { href: "/services/panaflex-and-banner-advertising", label: "Panaflex & Banners" },
];

export const SERVICE_PAGES = [
  svc("custom-web-design", "Custom Web Design Services | Adrevnview", "Custom Web Design That Converts Visitors Into Clients", "Adrevnview delivers custom web design for B2B, B2C, and enterprise brands — strategy-led layouts, premium visuals, and conversion optimization.", "Your website is often the first sales conversation you have with a prospect. Adrevnview designs custom websites that communicate credibility in seconds, guide visitors toward clear actions, and reflect the quality of your brand at every breakpoint."),
  svc("landing-page-design", "Landing Page Design Agency | Adrevnview", "High-Converting Landing Page Design", "Conversion-optimized landing page design for campaigns, product launches, and paid media.", "Campaign traffic deserves a destination built to convert. We design landing pages with singular focus: one offer, one audience, one action."),
  svc("ui-ux-design", "UI/UX Design Services | Adrevnview", "UI/UX Design for Digital Products and Marketing Sites", "Professional UI/UX design — user flows, wireframes, prototypes, and interface systems.", "Great UX removes guesswork for your users and your sales team. Adrevnview maps user journeys and designs intuitive interfaces before development begins."),
  svc("website-redesign", "Website Redesign Services | Adrevnview", "Website Redesign Without Losing SEO Equity", "Strategic website redesigns that improve UX, performance, and conversions while protecting SEO rankings.", "An outdated website costs you trust and search visibility. We audit your current site, preserve what works, and deliver a modern experience."),
  svc("responsive-design", "Responsive Web Design | Adrevnview", "Responsive Web Design for Every Device", "Fluid layouts and touch-friendly interfaces optimized for mobile, tablet, and desktop users.", "More than half of web traffic is mobile. We design fluid layouts that adapt gracefully across screen sizes."),
  svc("react-development", "React Development Agency | Adrevnview", "React Web Development for Modern Brands", "Expert React development for marketing sites, SaaS products, and interactive web applications — performance and SEO built in.", "React powers fast, interactive experiences when implemented with discipline. We build React frontends with component-driven architecture, optimized bundles, and prerendering strategies so search engines and AI crawlers can read your content."),
  svc("wordpress-development", "WordPress Development Services | Adrevnview", "WordPress Development for Content-Driven Brands", "Custom WordPress development — bespoke themes, plugin integration, performance tuning, and SEO-ready content workflows.", "WordPress remains a powerful CMS when customized correctly. We build secure, fast WordPress sites with intuitive editing experiences and clean theme code that won't break with updates."),
  svc("shopify-development", "Shopify Development Agency | Adrevnview", "Shopify Store Design and Development", "Shopify store design and development — custom themes, product page optimization, and eCommerce conversion improvements.", "Your Shopify store should sell as hard as your best salesperson. We design and develop Shopify experiences optimized for product discovery, trust signals, and frictionless checkout."),
  svc("webflow-development", "Webflow Development Services | Adrevnview", "Webflow Design and Development", "Professional Webflow development — visual design, CMS collections, interactions, and SEO-ready publishing for marketing teams.", "Webflow empowers marketing teams to publish quickly without sacrificing design quality. We build Webflow sites with structured CMS collections, reusable components, and SEO best practices baked in."),
  svc("api-integrations", "API Integration Services | Adrevnview", "API Integrations and Automation", "Custom API integrations — CRM, ERP, payment gateways, marketing automation, and third-party platform connections.", "Disconnected tools create manual work and lost leads. We integrate your website with HubSpot, Salesforce, Stripe, Zapier, and custom APIs so data flows automatically between systems."),
  svc("seo-services", "SEO Services Agency | Adrevnview", "SEO Services That Compound Organic Traffic", "Full-service SEO — technical audits, on-page optimization, content strategy, and Generative Engine Optimization from Adrevnview.", "SEO is a long-term growth channel when executed with technical rigor and quality content. We fix crawl issues, optimize page structure, build topical authority, and align your site with how Google and AI assistants discover brands."),
  svc("ppc-advertising", "PPC Advertising Services | Adrevnview", "PPC Advertising Management", "Google Ads and paid social campaign management with conversion-optimized landing pages from Adrevnview.", "Paid media works best with aligned messaging and landing experiences. We manage PPC campaigns and build dedicated landing pages that improve quality scores and lower cost per acquisition."),
  svc("social-media-marketing", "Social Media Marketing | Adrevnview", "Social Media Marketing for Brand Growth", "Social media marketing strategy, content calendars, and creative assets for B2B and B2C brands.", "Social channels extend your brand voice and nurture prospects between website visits. We develop content strategies, creative templates, and posting calendars aligned with your business goals."),
  svc("email-marketing", "Email Marketing Services | Adrevnview", "Email Marketing and Automation", "Email marketing strategy, template design, automation flows, and list growth for B2B and eCommerce brands.", "Email remains one of the highest-ROI marketing channels. We design templates, write nurture sequences, and set up automation that turns subscribers into customers."),
  svc("content-strategy", "Content Strategy Services | Adrevnview", "Content Strategy for SEO and Thought Leadership", "Content strategy, editorial calendars, and SEO-driven topic planning from Adrevnview.", "Random blog posts don't build authority. We create content strategies mapped to search intent, buyer journeys, and AI citation opportunities — so every article supports pipeline and discoverability."),
  svc("logo-design", "Logo Design Services | Adrevnview", "Logo Design That Defines Your Brand", "Professional logo design — concept exploration, refinement, and delivery of scalable brand marks.", "Your logo is the anchor of brand recognition. We explore concepts rooted in your positioning, refine with stakeholder feedback, and deliver production-ready files for every channel."),
  svc("brand-identity", "Brand Identity Design | Adrevnview", "Complete Brand Identity Systems", "Full brand identity design — logos, typography, color palettes, and visual systems for consistent brand expression.", "A strong brand identity creates instant recognition and trust. We develop cohesive visual systems that work across your website, social channels, presentations, and product interfaces."),
  svc("brand-strategy", "Brand Strategy Consulting | Adrevnview", "Brand Strategy and Positioning", "Brand strategy workshops — positioning, messaging, audience definition, and competitive differentiation.", "Design without strategy is decoration. We facilitate workshops to define your positioning, articulate your value proposition, and align messaging across marketing and sales touchpoints."),
  svc("visual-design-systems", "Visual Design Systems | Adrevnview", "Visual Design Systems for Scale", "Design systems — components, tokens, documentation, and Figma libraries for consistent product and marketing design.", "As teams grow, inconsistency creeps in. We build design systems with reusable components, documented patterns, and Figma libraries so every page and product surface feels cohesive."),
  svc("brand-guidelines", "Brand Guidelines Development | Adrevnview", "Brand Guidelines and Style Guides", "Brand style guides and guidelines documenting logo usage, colors, typography, and voice for internal and partner teams.", "Brand guidelines protect your investment in identity. We produce clear, accessible documentation so employees, agencies, and partners represent your brand correctly every time."),
  svc(
    "printing-services",
    "Printing Services | Adrevnview",
    "Printing Services for Brand, Retail, and Outdoor Advertising",
    "Full-service printing from Adrevnview — restaurant menus, business cards, letterheads, brochures, flyers, and panaflex (penaflex) outdoor advertising.",
    "Digital brands still need print that holds up in the real world. Adrevnview designs and produces business cards, letterheads, restaurant menus, brochures, flyers, and panaflex (penaflex) outdoor banners so every physical touchpoint matches the quality of your website and identity system.",
    [
      { question: "What print products do you offer?", answer: "Business cards, letterheads and envelopes, restaurant menus, brochures and flyers, posters, and panaflex / flex banner outdoor advertising. Ask if you need vehicle wraps or indoor stands." },
      { question: "Do you only print, or do you design as well?", answer: "Both. We can design from your brand guidelines or print from approved artwork after a production check." },
      { question: "Do you print restaurant menus and banners for Long Island businesses?", answer: "Yes. Adrevnview produces menus, cards, stationery, and panaflex signage for Long Island restaurants, shops, and campaigns — with files that match your website and brand." },
      { question: "How does a print project start?", answer: "Share formats, quantities, and locations. We design or check artwork, send a proof, then print, finish, and deliver after approval. Quotes depend on specs — request one on the contact page." },
    ],
  ),
  svc(
    "business-card-printing",
    "Business Card Printing | Adrevnview",
    "Business Card Printing That Makes a First Impression",
    "Custom business card printing — design, paper stock, foil, spot UV, and bulk runs. Print-ready files and fast turnaround from Adrevnview.",
    "A business card is still the fastest way to leave a physical impression. We design and print cards that match your brand identity — from classic uncoated stock to foil, spot UV, and rounded-corner finishes — so every handshake reinforces the same quality as your website.",
    [
      { question: "Can you design the card and print it?", answer: "Yes. We handle design, print-ready files, and production — or we print from your existing artwork after a quality check." },
      { question: "Do you offer NFC review cards?", answer: "Yes. Pair printed business cards with our Google NFC Review Card so customers can tap to leave a review." },
      { question: "Can you print bulk cards for a sales team?", answer: "Yes. We produce bulk runs and keep reprint-friendly files so additional boxes match the first order." },
      { question: "Do you print business cards for Long Island companies?", answer: "Yes. Cards are designed to match your digital identity and produced for Long Island and New York teams as well as brands elsewhere." },
    ],
  ),
  svc(
    "letterhead-printing",
    "Letterhead Printing Services | Adrevnview",
    "Letterhead and Stationery Printing",
    "Professional letterhead, envelope, and stationery printing — matching your logo, colors, and brand guidelines from Adrevnview.",
    "Contracts, invoices, and client letters should look as considered as your website. We design and print letterheads, envelopes, and complementary stationery with accurate color matching so your paperwork feels like part of one brand system.",
    [
      { question: "Can you supply Word templates with the printed letterhead?", answer: "Yes. We deliver matching digital templates so staff can type letters that align with the printed stock." },
      { question: "Do you print envelopes and compliment slips too?", answer: "Yes. Letterheads, envelopes, and compliment slips are designed as one stationery set." },
      { question: "Can you match our existing brand colors?", answer: "Yes. We aim for Pantone and CMYK accuracy so paperwork matches your logo and website." },
      { question: "Is letterhead printing available on Long Island?", answer: "Yes. We design and print stationery for Long Island offices and for brands that need matching letterhead wherever they send mail." },
    ],
  ),
  svc(
    "restaurant-menu-printing",
    "Restaurant Menu Printing | Adrevnview",
    "Restaurant Menu Design and Printing",
    "Restaurant menu design and printing — dine-in menus, takeout menus, table tents, and laminated cards from Adrevnview.",
    "A menu is a sales tool, not just a list. We design restaurant menus that highlight signatures, pair photos with prices cleanly, and print on stocks that survive spills, lamination, and seasonal updates — from dine-in books to takeout flyers and table tents.",
    [
      { question: "Can you update menus when prices change?", answer: "Yes. We keep print-ready files so seasonal or price updates are fast reprints rather than full redesigns." },
      { question: "Do you print takeout menus and table tents?", answer: "Yes. Dine-in books, takeout flyers, table tents, and window cards can share one menu system." },
      { question: "Can restaurant menus be laminated?", answer: "Yes. We print on stocks that survive spills, with lamination and coatings when the floor needs it." },
      { question: "Do you design menus for Long Island restaurants?", answer: "Yes. We design and print menus for Long Island and New York restaurants so the printed menu sells as clearly as the website." },
    ],
  ),
  svc(
    "brochure-and-flyer-printing",
    "Brochure and Flyer Printing | Adrevnview",
    "Brochure and Flyer Printing for Campaigns",
    "Brochure, flyer, and catalog printing — tri-folds, leave-behinds, and campaign collateral designed and printed by Adrevnview.",
    "Print still converts at events, storefronts, and sales meetings. We design and print brochures, flyers, catalogs, and posters with the same visual system as your digital brand — so a tri-fold on a counter feels like an extension of your website, not a leftover.",
    [
      { question: "Do you print posters and catalogs as well?", answer: "Yes. Brochures and flyers are the core offering; posters, catalogs, and leave-behinds use the same design and production workflow." },
      { question: "What brochure formats do you offer?", answer: "Tri-fold, bi-fold, and booklet formats, plus flyer and poster runs for promotions." },
      { question: "Can flyers match our website branding?", answer: "Yes. Campaign collateral uses the same visual system as your digital brand so a tri-fold feels like the site, not a leftover." },
      { question: "Do you deliver brochures on Long Island?", answer: "Yes. We design, print, and deliver campaign print for Long Island and NYC-metro businesses, with reprint files for the next run." },
    ],
  ),
  svc(
    "panaflex-and-banner-advertising",
    "Panaflex & Flex Banner Printing | Adrevnview",
    "Panaflex, Flex, and Outdoor Banner Advertising",
    "Panaflex (penaflex) and flex banner printing for shops, hoardings, and outdoor ads — large-format design and production from Adrevnview.",
    "Outdoor advertising has to read from the street in a second. We design and produce panaflex (also called penaflex or flex) banners, shop fascias, hoardings, and pole banners with high-contrast layouts, durable vinyl, and sizes matched to your storefront or campaign site.",
    [
      { question: "What is panaflex or penaflex printing?", answer: "Panaflex (often spelled penaflex) is large-format flex vinyl used for shop signs, street banners, and outdoor ads. We design the artwork and print it at the size your location needs." },
      { question: "Can you print vehicle wraps and indoor signage too?", answer: "Yes. Ask about vehicle wraps, roll-up stands, and indoor boards — they follow the same large-format workflow as outdoor flex." },
      { question: "Do you measure the storefront before printing?", answer: "Yes. Site measure and viewing distance come first so type and logos read from the street." },
      { question: "Do you produce panaflex for Long Island shop fronts?", answer: "Yes. We design and print shop-front panaflex, hoardings, and banners for Long Island locations and campaign sites." },
    ],
  ),
].map((page) => ({
  ...page,
  links: PRINT_SERVICE_SLUGS.includes(page.slug) ? PRINT_RELATED : [],
}));

export const SERVICE_SLUGS = SERVICE_PAGES.map((page) => page.slug);

export const INDUSTRY_PAGES = [
  ["healthcare", "Healthcare Web Design", "HIPAA-aware websites and patient-focused digital experiences for healthcare providers and med-tech brands.", "Healthcare organizations need websites that build trust, communicate compliance, and make it easy for patients to take action."],
  ["ecommerce", "eCommerce & Retail Web Design", "High-converting online stores and retail brand websites built for scale.", "Retail brands compete on experience as much as price. We design eCommerce sites optimized for product discovery and mobile checkout."],
  ["manufacturing", "Manufacturing & Industrial Web Design", "B2B websites that communicate capability, certifications, and technical credibility.", "Manufacturing buyers research suppliers online before making contact. We build industrial websites that showcase capabilities and case studies."],
  ["real-estate", "Real Estate Web Design", "Property marketing sites, broker platforms, and lead-generation experiences for real estate.", "Real estate is visual and local. We design property marketing sites and lead capture funnels optimized for local SEO."],
  ["legal", "Legal Services Web Design", "Authoritative law firm websites that establish expertise and convert consultations.", "Law firms need websites that communicate authority and make it effortless to book consultations."],
  ["financial", "Financial Services Web Design", "Compliant, trustworthy websites for fintech, advisors, and financial institutions.", "Financial services websites must balance compliance, clarity, and conversion at every step."],
  ["technology", "Technology & SaaS Web Design", "Product-led websites for SaaS companies, dev tools, and technology brands.", "SaaS buyers evaluate your product through your website before they sign up. We design product-led marketing sites with clear value props and GEO-ready structure."],
];

export const BLOG_PAGES = [
  ["geo-vs-seo-2026", "GEO vs SEO for Long Island Brands | Adrevnview Blog", "GEO vs SEO: What Long Island Brands Need in 2026", "Learn how GEO works alongside SEO for Long Island and New York brands."],
  ["conversion-focused-web-design", "Conversion-Focused Web Design Patterns | Adrevnview Blog", "5 Conversion Patterns We Use on Every Homepage", "Five homepage conversion patterns for B2B and enterprise websites."],
  ["shopify-speed-checklist", "Shopify Performance Checklist | Adrevnview Blog", "Shopify Speed Checklist for eCommerce Brands", "Technical checklist for faster Shopify storefronts."],
  ["local-seo-long-island", "Local SEO for Long Island Businesses | Adrevnview Blog", "Local SEO Playbook for Long Island Businesses", "Local SEO strategies for Long Island businesses and the NYC metro."],
];

export const CLIENT_PAGES = [
  ["tagizo", "Tagizo", "Video intelligence platform built by Adrevnview — interactive player, GEO engine, and SaaS billing."],
  ["axstart", "Axstart", "Ax Lab ecosystem — product pages, brand system, and multiple SaaS launches under one cohesive identity."],
  ["cizher", "Cizher", "Brand and product design for Cizher — premium digital presence and conversion-focused UX."],
  ["payrowl", "Payrowl", "Fintech marketing site with product-led design and trust-building content architecture."],
  ["xeark", "Xeark", "Technology brand website with SEO-optimized product marketing pages."],
  ["axnet", "Axnet", "Enterprise networking brand site with technical credibility and lead generation flows."],
  ["mishi", "Mishi", "eCommerce experience design with mobile-first product discovery and checkout optimization."],
  ["crocherish", "Crocherish", "Retail brand website with visual storytelling and eCommerce integration."],
  ["ecmmaandfitness", "ECMMA & Fitness", "Fitness brand digital presence with class scheduling and member engagement features."],
  ["kfc-ny", "KFC NY", "Regional franchise marketing site with local SEO and promotional campaign landing pages."],
];

export const INDUSTRY_SLUGS = INDUSTRY_PAGES.map((page) => page[0]);
export const BLOG_SLUGS = BLOG_PAGES.map((page) => page[0]);
export const CLIENT_SLUGS = CLIENT_PAGES.map((page) => page[0]);
export const STATIC_PATHS = STATIC_PAGES.map((page) => page.path);

export function allPublicPaths() {
  const paths = new Set(["/", ...STATIC_PATHS]);
  for (const slug of SERVICE_SLUGS) paths.add(`/services/${slug}`);
  for (const slug of INDUSTRY_SLUGS) paths.add(`/industries/${slug}`);
  for (const slug of BLOG_SLUGS) paths.add(`/blog/${slug}`);
  for (const slug of CLIENT_SLUGS) paths.add(`/${slug}`);
  return [...paths];
}
