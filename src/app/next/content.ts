import faqData from "./faq.json";
export type ServiceGroup = "Websites" | "Google and AI search" | "Ads and social" | "Print and screens" | "Software";

export const SERVICE_GROUPS: ServiceGroup[] = ["Websites", "Google and AI search", "Ads and social", "Print and screens", "Software"];

export const SERVICES: { name: string; line: string; points: string[]; to: string; group: ServiceGroup; wide?: boolean }[] = [
  {
    group: "Websites",
    name: "Business website",
    line: "A site designed around your business, built to load fast on a phone.",
    points: ["Your menu, services and prices up front", "Tap-to-call and directions on every page", "You can change words and photos yourself"],
    to: "/services/custom-web-design",
    wide: true,
  },
  {
    group: "Websites",
    name: "Website rebuild",
    line: "A new site that keeps the Google traffic the old one earned.",
    points: ["Old links keep working", "Same address, new look", "Faster on phones than before"],
    to: "/services/website-redesign",
  },
  {
    group: "Websites",
    name: "Landing page",
    line: "One page for one offer. Made to pair with an ad.",
    points: ["One clear button", "Matches the ad word for word", "Counts every call and form"],
    to: "/services/landing-page-design",
  },
  {
    group: "Websites",
    name: "Online store",
    line: "Sell and take payment online.",
    points: ["Product pages with real photos", "Pickup, delivery or shipping", "Stock and orders in one place"],
    to: "/services/shopify-development",
  },
  {
    group: "Google and AI search",
    name: "Search engine work",
    line: "Help Google show your pages to people nearby.",
    points: ["A page for each service and each town you serve", "Fixes for what slows the site down", "A monthly report you can read in two minutes"],
    to: "/services/seo-services",
    wide: true,
  },
  {
    group: "Google and AI search",
    name: "Google listing care",
    line: "The box that shows your hours, photos and reviews on Google and Maps.",
    points: ["Correct hours, phone and address", "New photos and posts each week", "Replies drafted for every review"],
    to: "/services/seo-services",
  },
  {
    group: "Google and AI search",
    name: "AI search setup",
    line: "Make sure ChatGPT, Gemini and others read your business correctly.",
    points: ["Clear facts AI tools can quote", "Answers to the questions people ask", "The same details everywhere online"],
    to: "/services/seo-services",
  },
  {
    group: "Google and AI search",
    name: "Free website check",
    line: "Type your address. See what Google and AI tools can read.",
    points: ["Takes about a minute", "No sign-up", "Shows what to fix first"],
    to: "/geo-report",
  },
  {
    group: "Ads and social",
    name: "Paid ads",
    line: "Google, Facebook and Instagram ads, each with its own page.",
    points: ["Shown only in the towns you serve", "You set the budget and can stop any time", "We report calls and forms, not clicks"],
    to: "/services/ppc-advertising",
    wide: true,
  },
  {
    group: "Ads and social",
    name: "Social media",
    line: "Posts and short videos made from your real work.",
    points: ["We plan the month with you", "Photos and clips from your own shop", "Posted for you on a schedule"],
    to: "/services/social-media-marketing",
  },
  {
    group: "Ads and social",
    name: "Short videos",
    line: "One long recording turned into many clips people watch.",
    points: ["Strong first three seconds", "Captions on every clip", "Sized for Instagram, TikTok and YouTube"],
    to: "/services/social-media-marketing",
  },
  {
    group: "Ads and social",
    name: "Motion videos",
    line: "Animated ads, moving menu boards and logo animations.",
    points: ["Made for phones first", "Six, fifteen and thirty second cuts", "Matches your brand colors and lettering"],
    to: "/services/social-media-marketing",
  },
  {
    group: "Ads and social",
    name: "Email",
    line: "Keep past customers coming back.",
    points: ["A welcome note for new customers", "Monthly offers", "Reminders that send themselves"],
    to: "/services/email-marketing",
  },
  {
    group: "Print and screens",
    name: "TV menu boards",
    line: "Your menu or prices on the screens behind the counter.",
    points: ["Readable from the door", "Change a price in minutes", "Matches your printed menu"],
    to: "/services/restaurant-menu-printing",
    wide: true,
  },
  {
    group: "Print and screens",
    name: "Restaurant menus",
    line: "Dine-in and takeout, designed and printed.",
    points: ["Laid out so best sellers stand out", "Wipe-clean or paper", "Reprints when prices change"],
    to: "/services/restaurant-menu-printing",
  },
  {
    group: "Print and screens",
    name: "Business cards",
    line: "Printed and delivered.",
    points: ["Thick stock", "Foil or matte finish", "A code that opens your website"],
    to: "/services/business-card-printing",
  },
  {
    group: "Print and screens",
    name: "Flyers and banners",
    line: "Designed, printed and ready to hang.",
    points: ["Flyers, brochures and door hangers", "Indoor and outdoor banners", "Window and wall signs"],
    to: "/services/printing-services",
  },
  {
    group: "Print and screens",
    name: "Stickers, labels and packaging",
    line: "The small printed things that carry your name out the door.",
    points: ["Bags, boxes and cup sleeves", "Product labels and price tags", "Stickers and window decals"],
    to: "/services/printing-services",
  },
  {
    group: "Print and screens",
    name: "Logo and brand",
    line: "A logo, colors and lettering that match on screen and on paper.",
    points: ["Logo in every file type you need", "A one-page guide for your staff", "Works on a sign and on a phone"],
    to: "/services/brand-identity",
  },
  {
    group: "Software",
    name: "Custom software",
    line: "When a website is not enough: ordering, booking, check-in, memberships.",
    points: ["Built on the systems we already run", "Shaped around how your shop works", "We host it and keep it running"],
    to: "#software",
  },
];

export const PRODUCTS = [
  {
    name: "Matzop",
    who: "Gyms and academies",
    points: ["Memberships and payments", "Class schedule and attendance", "A member page for training logs"],
    href: "https://matzop.com",
  },
  {
    name: "Cutzop",
    who: "Barbershops and salons",
    points: ["Walk-in check-in on a kiosk", "Customers pick their barber", "Live chair queue on a screen"],
    href: "https://cutzop.com",
  },
  {
    name: "Doczop",
    who: "Clinics",
    points: ["One board for several doctors", "Treatments and day-to-day work", "Front desk and rooms in one view"],
    href: "https://doczop.com",
  },
  {
    name: "Taxzop",
    who: "Small US businesses",
    points: ["Sales tax books by state", "Payroll and pay stubs", "Books kept in US dollars"],
    href: "https://taxzop.com",
  },
];

/** The first three things we fix for each kind of business. Keyed by kit id. */
export const KIT_FIXES: Record<string, { title: string; body: string }[]> = {
  restaurant: [
    { title: "The menu nobody can read on a phone", body: "A photo of a paper menu does not work on a small screen. We build the menu into the site so it is easy to read and easy to find on Google." },
    { title: "Ordering that sends people away", body: "We put your ordering links one tap from the top, on every page, so a hungry visitor never has to hunt." },
    { title: "Screens and paper that do not match", body: "Your TV board, your printed menu and your website get the same prices, the same photos and the same look." },
  ],
  bagel: [
    { title: "Phone orders during the rush", body: "Bagelzop takes orders online so your counter staff can keep the line moving." },
    { title: "Lost catering requests", body: "Catering orders come in through the same system and show on the same screen as everything else." },
    { title: "A kitchen working from paper slips", body: "Each order shows up on the kitchen screen the moment it is placed." },
  ],
  dessert: [
    { title: "People see it on Instagram and cannot find it", body: "Each dessert gets its own page, so the item someone saw in a video is the item they land on." },
    { title: "One site for several stores", body: "Every location gets a page with its own hours, address and pickup ordering." },
    { title: "Offers that live only on a poster", body: "A weekly deal goes on the site, the TV board, a flyer and a post at the same time." },
  ],
  gym: [
    { title: "A schedule that is always out of date", body: "Your class times live in one place and show on the website and the front-desk screen." },
    { title: "Trial sign-ups by text message", body: "A short trial form on the site sends each new lead straight to you." },
    { title: "Memberships kept in a notebook", body: "Matzop tracks members, payments and attendance, so you know who is active." },
  ],
  barber: [
    { title: "No prices online", body: "Your services and prices go on the site and on a board for the wall, so nobody has to ask." },
    { title: "Walk-ins who leave when it looks busy", body: "Cutzop lets a customer check in on a kiosk and see where they are in line." },
    { title: "Great cuts nobody sees", body: "We turn photos of your own work into posts, every week." },
  ],
  clinic: [
    { title: "Ads that get turned down", body: "Health ads have strict rules. We check every ad against them before it runs." },
    { title: "A site that does not say what you treat", body: "Each service gets a clear page in plain words, with an easy way to ask for a visit." },
    { title: "A front desk juggling several doctors", body: "Doczop puts every doctor, room and treatment on one board." },
  ],
  store: [
    { title: "Products Google cannot see", body: "Each product gets a page that search engines and AI tools can read, with price and stock." },
    { title: "A shop window that never changes", body: "A screen in the window shows new arrivals and this week's sale." },
    { title: "Sales that only locals hear about", body: "The same sale goes to your site, a flyer, a post and a small local ad." },
  ],
};

/**
 * PRICES ARE STARTING POINTS chosen by Adrevnview for the demo, kept loose on purpose.
 * The owner should confirm them before this page goes live.
 */
export const PACKAGES = [
  {
    name: "Open the doors",
    who: "For a new business, or one starting over.",
    price: "From $1,500",
    term: "one time",
    items: [
      "Logo, colors and lettering",
      "A website built for phones",
      "Google listing set up",
      "Business cards designed and printed",
      "One menu, flyer or sign",
      "A walk-through so you can edit it yourself",
    ],
  },
  {
    name: "Get found",
    who: "For a business that is open and wants more people to find it.",
    price: "From $500",
    term: "a month",
    featured: true,
    items: [
      "Search engine work on your website",
      "Google listing kept fresh every week",
      "AI search setup",
      "Posts made from your own photos",
      "New pages for services and towns",
      "A report each month in plain words",
    ],
  },
  {
    name: "Fill the room",
    who: "For a business ready to pay for more customers.",
    price: "From $1,000",
    term: "a month, plus your ad budget",
    items: [
      "Everything in Get found",
      "Google and Instagram ads",
      "A page built for each offer",
      "Short videos for your ads",
      "Calls and forms counted",
      "A monthly call to plan what is next",
    ],
  },
];

export const WHY = [
  {
    title: "One shop, one look",
    body: "Your website, your menu, your TV board and your ads come from the same people. Same colors, same prices, same voice. Nothing looks like it came from four different vendors.",
  },
  {
    title: "We write software, too",
    body: "Most agencies stop at the website. We built Bagelzop, Matzop, Cutzop, Doczop and Taxzop, so when your business needs more than a page, we can build it.",
  },
  {
    title: "Plain words and a written price",
    body: "You get a list of what we will make, what it costs and when it is ready, before any work starts. No surprise bills.",
  },
  {
    title: "Close when you need us",
    body: "Our shop is in Garden City, Long Island. In New York we can come to you. Everywhere else in the United States we work by phone and video, and print ships to your door.",
  },
];

export const MONTH = [
  { when: "Week one", title: "Look and listen", body: "We visit or call, check your site and Google listing, and agree on the one or two things that matter most this month." },
  { when: "Week two", title: "Make", body: "We write, design and build. You see drafts and say what to change." },
  { when: "Week three", title: "Launch", body: "New pages, posts, ads or print go out. We check that the phone number, forms and links all work." },
  { when: "Week four", title: "Count and plan", body: "You get a short report: what we did, what happened, and what we suggest next." },
];

export const WORDS = [
  { term: "SEO", meaning: "Search engine work. Making your site easy for Google to read, so it shows you to people searching nearby." },
  { term: "AEO", meaning: "Answer engine work. Writing clear answers to real questions, so Google and voice assistants can read them out." },
  { term: "GEO", meaning: "AI search work. Making sure tools like ChatGPT and Gemini have the right facts about your business." },
  { term: "Google listing", meaning: "The box on Google and Maps with your hours, photos, phone and reviews. Its full name is Google Business Profile." },
  { term: "Landing page", meaning: "One page made for one offer. An ad sends people there, and the page has one button." },
  { term: "Ad budget", meaning: "The money you pay Google or Instagram to show your ad. It goes to them, not to us." },
];

/** Kept in faq.json so the page, the hidden data for Google and the pre-built pages all use the same words. */
export const FAQ: { q: string; a: string }[] = faqData;
