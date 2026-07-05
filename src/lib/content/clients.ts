export type ClientCategory = "Featured" | "B2B" | "B2C" | "eCommerce";

export type Client = {
  slug: string;
  name: string;
  url: string;
  tag: string;
  category: ClientCategory;
  shortDescription: string;
  metric: string;
  image: string;
  services: string[];
  seoTitle: string;
  seoDescription: string;
  content: {
    overview: string;
    challenge: string;
    solution: string;
    results: string[];
    testimonial?: {
      quote: string;
      attribution: string;
    };
  };
};

export const CLIENTS: Client[] = [
  {
    slug: "tagizo",
    name: "Tagizo",
    url: "https://tagizo.com",
    tag: "Video Intelligence",
    category: "Featured",
    shortDescription:
      "AI-powered video intelligence SaaS with interactive shoppable players, GEO optimization, and LLM-discoverable video experiences.",
    metric: "Full SaaS platform launch",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=520&fit=crop&auto=format",
    services: ["Custom Web Design", "SaaS Development", "GEO Optimization", "Brand Identity"],
    seoTitle: "Tagizo Case Study — AI Video Intelligence Platform | Adrevnview",
    seoDescription:
      "How Adrevnview designed and built Tagizo's AI video intelligence SaaS platform — interactive players, GEO optimization, and a conversion-focused product experience at tagizo.com.",
    content: {
      overview:
        "Tagizo is an AI-powered video intelligence platform that transforms how brands create, distribute, and monetize interactive video content. Adrevnview partnered with the Tagizo team to design and develop their full SaaS platform — from product marketing site to interactive video player experiences optimized for search engines and AI assistants.",
      challenge:
        "Tagizo needed a digital presence that communicated complex video AI capabilities to both technical buyers and marketing leaders. The platform had to support shoppable video players, GEO-optimized content structure, and a scalable SaaS billing model — all while establishing trust in a competitive martech landscape.",
      solution:
        "Adrevnview delivered a cohesive product ecosystem: a conversion-focused marketing site, interactive demo experiences, structured data for AI discoverability, and a design system that scales across product surfaces. Every page was architected for Generative Engine Optimization so assistants like ChatGPT and Perplexity can accurately cite Tagizo's capabilities.",
      results: [
        "Full SaaS platform launch with interactive video player",
        "GEO-optimized content structure for AI assistant citations",
        "Conversion-focused product marketing site at tagizo.com",
        "Scalable design system for ongoing product iterations",
      ],
      testimonial: {
        quote:
          "Adrevnview built our entire video intelligence platform — interactive player, GEO engine, and SaaS billing. It's become our primary growth driver.",
        attribution: "Platform Team, Tagizo",
      },
    },
  },
  {
    slug: "axstart",
    name: "Axstart",
    url: "https://axstart.com",
    tag: "Innovation Lab",
    category: "Featured",
    shortDescription:
      "Brand ecosystem and product hub for an innovation lab building SaaS tools, AI products, and digital platforms at scale.",
    metric: "150+ products delivered",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=520&fit=crop&auto=format",
    services: ["Brand Identity", "Web Design", "Product Pages", "SaaS Launch"],
    seoTitle: "Axstart Case Study — Innovation Lab Brand Ecosystem | Adrevnview",
    seoDescription:
      "Adrevnview designed the Axstart innovation lab ecosystem — product pages, brand system, and multiple SaaS launches under one cohesive identity at axstart.com.",
    content: {
      overview:
        "Axstart is an innovation lab and product ecosystem that builds SaaS tools, AI products, and digital platforms at scale. Adrevnview created the Ax Lab brand identity and digital hub — a unified web presence that showcases 150+ products under one cohesive design language.",
      challenge:
        "With dozens of products spanning AI, SaaS, and infrastructure, Axstart needed a brand system and website architecture that could scale without fragmenting. Each product launch required consistent quality while maintaining the lab's reputation for precision engineering.",
      solution:
        "Adrevnview built a modular brand system and product hub at axstart.com — reusable components, structured navigation, and page templates that accelerate new product launches. The design balances technical credibility with approachable storytelling for diverse buyer personas.",
      results: [
        "Unified brand ecosystem supporting 150+ product launches",
        "Modular page templates for rapid SaaS go-to-market",
        "Cohesive visual identity across the Ax Lab portfolio",
        "SEO-optimized product discovery and internal linking",
      ],
      testimonial: {
        quote:
          "They designed the Ax Lab ecosystem — product pages, brand system, and multiple SaaS launches under one cohesive identity. Precision at every layer.",
        attribution: "Axstart Team, Ax Lab",
      },
    },
  },
  {
    slug: "cizher",
    name: "Cizher",
    url: "https://cizher.com",
    tag: "AI / SaaS",
    category: "B2B",
    shortDescription:
      "Multi-agent AI workspace with voice bot builders, Pipecat export, and self-hosted LLM orchestration for engineering teams.",
    metric: "Live in under 15 minutes",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=520&fit=crop&auto=format",
    services: ["UX Design", "Web Development", "Technical Documentation", "SEO"],
    seoTitle: "Cizher Case Study — Multi-Agent AI Workspace | Adrevnview",
    seoDescription:
      "Adrevnview designed Cizher's multi-agent AI workspace — premium command-surface UX, technical docs, and a conversion-focused site for engineering teams at cizher.com.",
    content: {
      overview:
        "Cizher is a multi-agent AI workspace that gives engineering teams voice bot builders, Pipecat export, and self-hosted LLM orchestration. Adrevnview designed the product marketing site and documentation experience that converts technical buyers.",
      challenge:
        "Cizher's audience — senior engineers and AI practitioners — demands interfaces that feel premium and technical without sacrificing clarity. The site needed to communicate complex orchestration features while driving sign-ups from a skeptical, high-intent audience.",
      solution:
        "Adrevnview crafted a command-surface-inspired UX with clear feature hierarchies, interactive demos, and technical documentation structured for both human readers and AI crawlers. The result is a site that engineers trust on first visit.",
      results: [
        "Premium technical UX that resonates with engineering buyers",
        "Documentation site structured for SEO and AI discoverability",
        "Conversion path from landing to product activation in minutes",
        "Scalable content architecture for feature releases",
      ],
      testimonial: {
        quote:
          "Our multi-agent AI workspace needed to feel premium and technical. Adrevnview nailed the command-surface UX and docs site that converts engineers.",
        attribution: "Product Lead, Cizher",
      },
    },
  },
  {
    slug: "payrowl",
    name: "Payrowl",
    url: "https://payrowl.com",
    tag: "Operations",
    category: "B2B",
    shortDescription:
      "Malaysia payroll, MDEC visa, and managed-inhouse operations platform for international ventures scaling in APAC.",
    metric: "100% compliance backbone",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=520&fit=crop&auto=format",
    services: ["Web Design", "Trust & Compliance UX", "SEO", "Content Strategy"],
    seoTitle: "Payrowl Case Study — APAC Operations Platform | Adrevnview",
    seoDescription:
      "Adrevnview built Payrowl's Malaysia payroll and operations platform website — compliance-focused design that wins trust with international ventures at payrowl.com.",
    content: {
      overview:
        "Payrowl is a Malaysia-based payroll, MDEC visa, and managed-inhouse operations platform helping international ventures scale in APAC. Adrevnview designed and developed the platform's web presence to communicate compliance expertise and operational reliability.",
      challenge:
        "International companies expanding into Malaysia face complex payroll, visa, and regulatory requirements. Payrowl needed a website that instantly communicates trust, compliance depth, and operational competence to risk-averse enterprise buyers.",
      solution:
        "Adrevnview built a compliance-forward design system with clear service hierarchies, trust signals, and localized content structure. Every page reinforces Payrowl's role as the operational backbone for APAC expansion.",
      results: [
        "Compliance-focused design that wins enterprise trust",
        "Clear service architecture for payroll, visa, and operations",
        "SEO-optimized content for APAC expansion keywords",
        "Conversion-focused lead capture for international ventures",
      ],
      testimonial: {
        quote:
          "Scaling in Malaysia meant compliance complexity we couldn't handle alone. Payrowl's site now wins trust with every international lead we speak to.",
        attribution: "Operations Director, Payrowl",
      },
    },
  },
  {
    slug: "xeark",
    name: "Xeark",
    url: "https://www.xeark.com",
    tag: "Knowledge Tech",
    category: "B2C",
    shortDescription:
      "Intelligent knowledge exploration engine — a scalable digital ecosystem for modern research and discovery workflows.",
    metric: "Knowledge at scale",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=520&fit=crop&auto=format",
    services: ["Web Design", "Information Architecture", "SEO", "Brand Identity"],
    seoTitle: "Xeark Case Study — Knowledge Exploration Engine | Adrevnview",
    seoDescription:
      "Adrevnview designed Xeark's knowledge exploration platform — clean, scalable digital presence built for long-term growth at xeark.com.",
    content: {
      overview:
        "Xeark is an intelligent knowledge exploration engine designed for modern research and discovery workflows. Adrevnview created a digital presence that matches the platform's ambition — clean, scalable, and built for long-term organic growth.",
      challenge:
        "Knowledge platforms compete on both utility and discoverability. Xeark needed a website that communicates its exploration capabilities while ranking for research and discovery-related search queries.",
      solution:
        "Adrevnview delivered an information-architecture-first design with structured content, semantic markup, and a visual identity that positions Xeark as a serious knowledge technology platform.",
      results: [
        "Scalable information architecture for knowledge products",
        "SEO foundation for research and discovery keywords",
        "Clean, modern brand presence at xeark.com",
        "Structured data for enhanced search visibility",
      ],
      testimonial: {
        quote:
          "Xeark needed a digital presence that matched our knowledge exploration engine — clean, scalable, and built for long-term growth.",
        attribution: "Founder, Xeark",
      },
    },
  },
  {
    slug: "axnet",
    name: "AXNET",
    url: "https://axearth.com",
    tag: "Mesh Network",
    category: "B2C",
    shortDescription:
      "Unified command center for the Axstart mesh network — node monitoring, secure messaging, and decentralized infrastructure.",
    metric: "99.9% network uptime",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=520&fit=crop&auto=format",
    services: ["Enterprise UI Design", "Web Development", "Dashboard UX", "SEO"],
    seoTitle: "AXNET Case Study — Mesh Network Command Center | Adrevnview",
    seoDescription:
      "Adrevnview built AXNET's mesh network command center — unified node monitoring, secure messaging, and enterprise infrastructure UI at axearth.com.",
    content: {
      overview:
        "AXNET is the unified command center for the Axstart mesh network, providing node monitoring, secure messaging, and decentralized infrastructure management. Adrevnview designed the enterprise-grade web interface that network operators rely on daily.",
      challenge:
        "Mesh network infrastructure demands interfaces that surface complex telemetry without overwhelming operators. AXNET needed a command center that communicates reliability while handling real-time data from distributed nodes.",
      solution:
        "Adrevnview built an enterprise infrastructure UI with clear data hierarchies, status dashboards, and a design language that signals 99.9% uptime reliability. The site and product surfaces share a cohesive technical aesthetic.",
      results: [
        "Unified command center for distributed node monitoring",
        "Enterprise infrastructure UI with real-time data surfaces",
        "99.9% uptime positioning reinforced through design",
        "Technical SEO for decentralized infrastructure keywords",
      ],
      testimonial: {
        quote:
          "The mesh network command center Adrevnview built gives us a unified view of nodes, relays, and services — enterprise infrastructure UI done right.",
        attribution: "Network Team, AXNET",
      },
    },
  },
  {
    slug: "mishi",
    name: "Mishi",
    url: "https://mishi.es",
    tag: "Artisan Retail",
    category: "eCommerce",
    shortDescription:
      "Heritage-meets-artistry eCommerce for kaftans, Pakistani kurtis, resin art, and artisanal home decor with bespoke custom design.",
    metric: "Apparel & decor storefront",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=520&fit=crop&auto=format",
    services: ["eCommerce Design", "Shopify Development", "Brand Storytelling", "SEO"],
    seoTitle: "Mishi Case Study — Artisan eCommerce Storefront | Adrevnview",
    seoDescription:
      "Adrevnview designed Mishi's artisan eCommerce storefront — heritage craftsmanship meets modern online retail for apparel and decor at mishi.es.",
    content: {
      overview:
        "Mishi is an artisan eCommerce brand offering kaftans, Pakistani kurtis, resin art, and handcrafted home decor. Adrevnview designed and built the mishi.es storefront to capture the brand's heritage craftsmanship story while driving sales across Europe.",
      challenge:
        "Artisan brands must balance storytelling warmth with eCommerce conversion mechanics. Mishi needed a storefront that feels boutique and personal while supporting product discovery, custom orders, and international shipping.",
      solution:
        "Adrevnview created a visually rich eCommerce experience with editorial product photography layouts, warm brand storytelling, and SEO-optimized category pages for apparel and home decor keywords.",
      results: [
        "Boutique eCommerce storefront with editorial product presentation",
        "Brand story integration across apparel and decor collections",
        "SEO-optimized category pages for European market reach",
        "Custom order flows for bespoke artisan pieces",
      ],
      testimonial: {
        quote:
          "Heritage craftsmanship deserves a beautiful storefront. Mishi.es captures our brand story and drives apparel and decor sales across Europe.",
        attribution: "Studio Team, Mishi",
      },
    },
  },
  {
    slug: "crocherish",
    name: "Crocherish",
    url: "https://crocherish.com",
    tag: "Handmade Crafts",
    category: "eCommerce",
    shortDescription:
      "Boutique online shop for handmade crochet wearables, home decor, and plushies — artisanal collections with a warm brand story.",
    metric: "Hand-stitched collections",
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=800&h=520&fit=crop&auto=format",
    services: ["eCommerce Design", "Brand Identity", "Product Photography Layout", "SEO"],
    seoTitle: "Crocherish Case Study — Handmade Crochet eCommerce | Adrevnview",
    seoDescription:
      "Adrevnview built Crocherish's handmade crochet storefront — warm brand storytelling and artisanal collections that drive steady orders at crocherish.com.",
    content: {
      overview:
        "Crocherish is a boutique online shop for handmade crochet wearables, home decor, and plushies. Adrevnview designed the crocherish.com storefront to feel as warm and personal as the handcrafted pieces it sells.",
      challenge:
        "Handmade craft brands compete in a crowded Etsy-adjacent market. Crocherish needed an owned storefront that builds brand loyalty, tells an authentic maker story, and ranks for handmade crochet keywords.",
      solution:
        "Adrevnview built a cozy, editorial eCommerce experience with collection-based navigation, maker storytelling, and product pages optimized for both search engines and social sharing.",
      results: [
        "Owned storefront reducing marketplace dependency",
        "Warm brand identity matching handmade product quality",
        "Collection-based navigation for wearables, decor, and plushies",
        "SEO foundation for handmade crochet retail keywords",
      ],
      testimonial: {
        quote:
          "Crocherish needed an online home as warm as our handmade pieces. The storefront showcases our crochet collections and drives steady orders.",
        attribution: "Studio Founder, Crocherish",
      },
    },
  },
  {
    slug: "ecmmaandfitness",
    name: "East Coast MMA & Fitness",
    url: "https://ecmmaandfitness.com",
    tag: "Martial Arts & Fitness",
    category: "B2C",
    shortDescription:
      "Premier martial arts and fitness facility in Hicksville and Syosset, NY — MMA, kickboxing, kids self-defense, and competition training.",
    metric: "2 NY locations",
    image: "https://images.unsplash.com/photo-1599058945522-28d584b6f53f?w=800&h=520&fit=crop&auto=format",
    services: ["Web Design", "Local SEO", "Lead Generation", "Multi-Location Site"],
    seoTitle: "East Coast MMA & Fitness Case Study — Martial Arts Website | Adrevnview",
    seoDescription:
      "Adrevnview designed East Coast MMA & Fitness's website — local SEO, class pages, and lead capture for Hicksville and Syosset martial arts locations at ecmmaandfitness.com.",
    content: {
      overview:
        "East Coast MMA & Fitness is Hicksville and Syosset's premier martial arts facility, offering MMA, kickboxing, kids self-defense, and competition training. Adrevnview built their web presence to drive trial sign-ups and rank for local martial arts searches across Long Island.",
      challenge:
        "A multi-location martial arts gym needs a website that converts parents and adult students alike — while ranking for competitive local keywords like 'martial arts Hicksville' and 'MMA classes Syosset.' Each location required its own contact info, class schedules, and review visibility.",
      solution:
        "Adrevnview delivered a conversion-focused site with location-specific landing pages, class category architecture, testimonial integration, and local SEO foundations. Request-information forms and clear CTAs connect search traffic directly to enrollment inquiries.",
      results: [
        "Multi-location site architecture for Hicksville and Syosset",
        "Local SEO pages for martial arts class discovery",
        "Lead capture forms driving trial class sign-ups",
        "Mobile-optimized experience for on-the-go parents and students",
      ],
      testimonial: {
        quote:
          "Our website now brings in new students every week. Parents find us on Google, see our classes, and reach out — exactly what we needed to grow both locations.",
        attribution: "East Coast MMA & Fitness Team",
      },
    },
  },
  {
    slug: "kfc-ny",
    name: "Kennedy Fried Chicken",
    url: "https://kfc-ny.com",
    tag: "Halal Restaurant",
    category: "B2C",
    shortDescription:
      "Certified halal fried chicken restaurant on Staten Island — online ordering, family combos, free delivery, and DoorDash, Uber Eats, and Grubhub integration.",
    metric: "4.7★ Google rating",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&h=520&fit=crop&auto=format",
    services: ["Restaurant Web Design", "Online Ordering", "Local SEO", "Menu UX"],
    seoTitle: "Kennedy Fried Chicken Case Study — Restaurant Website | Adrevnview",
    seoDescription:
      "Adrevnview built Kennedy Fried Chicken's Staten Island restaurant website — halal menu, online ordering, delivery integration, and local SEO at kfc-ny.com.",
    content: {
      overview:
        "Kennedy Fried Chicken is a certified halal fried chicken restaurant at 253 Broadway, Staten Island, NY. Adrevnview designed and built kfc-ny.com to drive direct online orders, showcase the menu, and strengthen local search visibility for halal chicken in Staten Island.",
      challenge:
        "Local restaurants lose margin to third-party apps and need a owned web presence that still connects to DoorDash, Uber Eats, and Grubhub. Kennedy Fried Chicken needed a fast-ordering site with clear halal certification, combo pricing, hours, and free delivery messaging.",
      solution:
        "Adrevnview built a mobile-first restaurant site with full menu browsing, one-click ordering paths, integration links to delivery platforms, Google review highlights, and structured local business content. Phone ordering and pickup/delivery options are front and center.",
      results: [
        "Direct online ordering reducing third-party dependency",
        "Halal-certified branding with menu combos from $10–$52",
        "Integration with DoorDash, Uber Eats, and Grubhub",
        "4.7-star Google review social proof on homepage",
        "Local SEO for Staten Island halal fried chicken searches",
      ],
      testimonial: {
        quote:
          "Customers order directly from our site now — they see the full menu, know we're halal certified, and call or order without hunting us on apps first.",
        attribution: "Kennedy Fried Chicken, Staten Island",
      },
    },
  },
];

export const CLIENT_SLUGS = CLIENTS.map((c) => c.slug);

export function getClientPath(slug: string): string {
  return `/${slug}`;
}

export function isClientPath(path: string): boolean {
  const slug = path.replace(/^\//, "");
  return CLIENT_SLUGS.includes(slug);
}

export function getClientBySlug(slug: string): Client | undefined {
  return CLIENTS.find((c) => c.slug === slug);
}

export function getClientsByCategory(category: ClientCategory): Client[] {
  return CLIENTS.filter((c) => c.category === category);
}

export const PORTFOLIO_TABS: ClientCategory[] = ["Featured", "B2B", "B2C", "eCommerce"];

export function getPortfolioByCategory(): Record<ClientCategory, Client[]> {
  return {
    Featured: getClientsByCategory("Featured"),
    B2B: getClientsByCategory("B2B"),
    B2C: getClientsByCategory("B2C"),
    eCommerce: getClientsByCategory("eCommerce"),
  };
}
