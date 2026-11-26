/**
 * Deeper content for each kind of business: what goes wrong, what we do about it,
 * and the ad we would run. Keyed by kit id.
 *
 * The problems come from 2026 industry reporting (National Restaurant Association,
 * James Beard Foundation, Gymdesk benchmark, BrightLocal and others). No numbers are
 * quoted on the page, so nothing here needs a citation to stay true.
 */
export type KitDeep = {
  intro: string;
  problems: { problem: string; fix: string }[];
  ad: { where: string; line: string; offer: string; button: string; result: string };
};

export const KIT_DEEP: Record<string, KitDeep> = {
  restaurant: {
    intro:
      "A restaurant wins or loses in the two minutes a hungry person spends on their phone. They check the menu, the hours, the photos and how to order. Most of what follows is about making those two minutes easy.",
    problems: [
      {
        problem: "Delivery apps keep a large cut of every order, and the customer belongs to the app, not to you.",
        fix: "We put your own ordering link at the top of your site, your Google listing, your menus and your table cards. Use the apps to be discovered. Bring regulars back to order direct.",
      },
      {
        problem: "The menu online is a photo of a paper menu. Nobody can read it on a phone and Google cannot read it at all.",
        fix: "We build the menu into the website as real text, with prices and photos, so people can read it and search engines can show it.",
      },
      {
        problem: "Google shows the wrong hours, an old phone number or last year's photos.",
        fix: "We keep your Google listing current every week, including holiday hours, new photos and replies to reviews.",
      },
      {
        problem: "The TV board, the printed menu and the website each show a different price.",
        fix: "One menu, kept in one place. When a price changes, the screens, the paper and the site change together.",
      },
      {
        problem: "Some nights are slow, and a discount on the door only reaches people already walking past.",
        fix: "We run small local ads timed to your slow hours, each with one offer and one page that takes the order.",
      },
    ],
    ad: {
      where: "Instagram, within a few miles, Tuesday afternoon",
      line: "Two pies. One price.",
      offer: "Tuesdays only, pickup or dine in",
      button: "Order pickup",
      result: "Pickup order placed, 6:40 PM",
    },
  },
  bagel: {
    intro:
      "A bagel shop makes most of its money before ten in the morning. Anything that slows the line, loses a phone order or misses a catering request costs you the best hours of the day.",
    problems: [
      {
        problem: "The phone rings through the whole morning rush, and each call pulls someone off the counter.",
        fix: "Bagelzop takes orders online, with pickup times, so the counter keeps moving and nothing is written down wrong.",
      },
      {
        problem: "Catering requests come by text, by email and across the counter, and some get lost.",
        fix: "Catering orders come through the same system as everything else and show on the same screen.",
      },
      {
        problem: "The kitchen works from paper slips that get wet, lost or misread.",
        fix: "Each order shows on the kitchen screen the moment it is placed, and comes off when it is done.",
      },
      {
        problem: "Regulars would order ahead if it were easy, but the only way is a delivery app that takes a cut.",
        fix: "Your own ordering page, linked from your site, your Google listing and a code on the counter.",
      },
      {
        problem: "People nearby do not know you cater, or that you open at five.",
        fix: "Morning ads within a few miles, plus a clear catering page that office managers can find and order from.",
      },
    ],
    ad: {
      where: "Google Search, within three miles, 6 to 10 AM",
      line: "Skip the line.",
      offer: "Order ahead, ready in ten minutes",
      button: "Start an order",
      result: "Order ahead placed, 7:15 AM",
    },
  },
  dessert: {
    intro:
      "Dessert sells on sight. Someone sees a crepe in a short video and wants that exact one, tonight. If they cannot find it, find you or see that you are open, the craving goes somewhere else.",
    problems: [
      {
        problem: "People see an item on Instagram or TikTok and then cannot find that item on your site.",
        fix: "Every item gets its own page with a photo, the options and an order button, so a video can link straight to it.",
      },
      {
        problem: "You have more than one store, and customers order from the wrong one or cannot tell which is closest.",
        fix: "Each location gets its own page with its own hours, map and pickup ordering.",
      },
      {
        problem: "Deals live on a poster by the register and nowhere else.",
        fix: "The same deal goes on the site, the TV board, a flyer and a post on the same day.",
      },
      {
        problem: "Late-night hours are your busiest, and Google shows you as closed.",
        fix: "We keep hours right on your listing and on the site, including weekends and holidays.",
      },
      {
        problem: "A customer loves it once and you have no way to bring them back.",
        fix: "A simple list people join when they order, and a short message when there is something new.",
      },
    ],
    ad: {
      where: "TikTok and Instagram, short video, evenings",
      line: "Build it your way.",
      offer: "Two cups, one price, every Tuesday",
      button: "Build a cup",
      result: "Pickup order placed, 9:05 PM",
    },
  },
  gym: {
    intro:
      "A gym does not have a sign-up problem as much as a follow-up problem. Leads ask about a trial and hear nothing. New members come three times and stop. Fixing those two things is worth more than any new ad.",
    problems: [
      {
        problem: "Someone asks about a trial class and nobody replies until the next day. By then they have booked somewhere else.",
        fix: "A short trial form on the site, an instant reply with a time to come in, and a reminder the day before.",
      },
      {
        problem: "New members quit in the first few months, before training becomes a habit.",
        fix: "Matzop tracks attendance, so you see who has gone quiet. We set up welcome messages for the first weeks.",
      },
      {
        problem: "The class schedule on the website is out of date, and so is the one taped to the door.",
        fix: "One schedule that feeds the website and the front-desk screen. Change it once.",
      },
      {
        problem: "Kids classes, adult classes and competition training are all mixed on one page.",
        fix: "Each program gets its own page, so a parent and a fighter each find what they came for.",
      },
      {
        problem: "Ads send people to the home page, where the trial offer is buried.",
        fix: "Each ad gets its own page with one offer and one button, and we count every sign-up.",
      },
    ],
    ad: {
      where: "Instagram and Facebook, within five miles",
      line: "Your first class is free.",
      offer: "Seven-day trial, every class, no contract",
      button: "Book a trial",
      result: "Trial booked, Thursday 6:00 PM",
    },
  },
  barber: {
    intro:
      "A barbershop sells time in a chair. An empty chair on a Wednesday, a no-show on a Saturday and a walk-in who leaves because the wait looks long are all the same loss.",
    problems: [
      {
        problem: "Walk-ins look through the window, see a full bench and keep walking.",
        fix: "Cutzop lets a customer check in on a kiosk, pick a barber and see their place in line on a screen.",
      },
      {
        problem: "Booked customers do not show up, and the chair sits empty.",
        fix: "We set up reminder messages and, if you want them, deposits in your booking tool.",
      },
      {
        problem: "Prices are not online, so people call to ask or do not come.",
        fix: "Services and prices go on the website and on a board for the wall.",
      },
      {
        problem: "Your best work lives on your barbers' personal pages, not the shop's.",
        fix: "We turn photos and clips of your shop's cuts into posts every week, on the shop's own page.",
      },
      {
        problem: "Weekends are packed and midweek is quiet.",
        fix: "Small ads within a few miles for a midweek offer, with a page that books the chair.",
      },
    ],
    ad: {
      where: "Instagram, within three miles, Tuesday to Thursday",
      line: "Walk in. Sit down.",
      offer: "No wait before noon, Tuesday to Thursday",
      button: "Join the line",
      result: "Checked in, chair two, 11:20 AM",
    },
  },
  clinic: {
    intro:
      "A clinic or med spa is selling trust before it sells a treatment. The website has to say plainly what you treat and who treats it, and every ad has to follow strict health rules or it will not run.",
    problems: [
      {
        problem: "Ads get turned down because of a word in the headline or a photo on the page.",
        fix: "We write health ads to each platform's rules: no promised results, no misleading before-and-after pictures, adults only where required. We check the page the ad points to as well.",
      },
      {
        problem: "The website lists treatments by brand names patients do not know.",
        fix: "Each treatment gets a page in plain words: what it is, who it is for, what to expect and how to ask for a visit.",
      },
      {
        problem: "People want to know who will treat them, and the site shows no one.",
        fix: "A page for each doctor or provider, with training, licenses and a real photo.",
      },
      {
        problem: "Someone fills in a form at night and no one answers until the afternoon.",
        fix: "An instant reply with next steps, and a message to your front desk so they can call first thing.",
      },
      {
        problem: "The front desk juggles several doctors, rooms and treatments on paper.",
        fix: "Doczop puts every doctor, room and treatment on one board.",
      },
    ],
    ad: {
      where: "Google Search, within ten miles",
      line: "Care that fits your day.",
      offer: "Skin checks by appointment, evenings available",
      button: "Request a visit",
      result: "Visit requested, Monday 5:30 PM",
    },
  },
  store: {
    intro:
      "People decide where to shop before they leave the house. They search, they ask an AI tool, they check the hours. A small store wins when it is easy to find and clear about what it has.",
    problems: [
      {
        problem: "Google and AI tools cannot tell what you sell, so they send shoppers to a big chain.",
        fix: "Each product gets a page with a clear name, price and whether it is in stock, written so search engines and AI tools can read it.",
      },
      {
        problem: "The hours online are wrong, most often on holidays.",
        fix: "We keep your Google listing and your site in step, and update both before every holiday.",
      },
      {
        problem: "The shop window looks the same in March as it did in December.",
        fix: "A screen in the window that shows new arrivals and this week's sale, changed in minutes.",
      },
      {
        problem: "A sale is announced on a sign in the door, so only people already there hear about it.",
        fix: "The same sale goes to the site, a flyer, a post and a small local ad on the same day.",
      },
      {
        problem: "Customers buy once and you never speak to them again.",
        fix: "An email list people join at the register or at checkout, and a short note when new things come in.",
      },
    ],
    ad: {
      where: "Google Search and Maps, within ten miles",
      line: "New this week.",
      offer: "Twenty percent off, Saturday and Sunday",
      button: "Shop the sale",
      result: "Order placed, pickup in store",
    },
  },
};

export const AD_PLACES = [
  { name: "Google Search", when: "For people already looking for what you sell. The fastest way to a phone call." },
  { name: "Google Maps", when: "For people nearby choosing where to go right now." },
  { name: "Instagram and Facebook", when: "For showing your food, your work or your space to people who live close." },
  { name: "TikTok", when: "For short videos that travel further than your town." },
  { name: "YouTube", when: "For longer stories and for reaching people while they watch at home." },
];

export const AD_PROMISES = [
  "The ad account is in your name, so you see every dollar.",
  "Every ad has its own page with one button.",
  "We count calls, forms and orders, not clicks.",
  "You can raise, lower or stop the budget any time.",
];

export const MOTION_WORDS = ["Menu boards that move.", "Ads people stop for.", "Logos that come alive.", "Offers in six seconds."];

export const PRINT_SHOP = [
  {
    id: "menus",
    name: "Menus",
    images: ["/print-samples/menu-mira-and-sol.webp", "/print-samples/menu-brass-spoon.webp"],
    pitch: "A menu is the one piece of print every customer reads. We lay it out so your best sellers are the first thing they see.",
    made: ["Dine-in menus", "Takeout and delivery menus", "Table tents and counter cards", "Catering menus"],
    choose: ["Paper, card or wipe-clean", "Folded or flat", "Any size"],
  },
  {
    id: "cards",
    name: "Business cards",
    images: ["/print-samples/visiting-card-nori-lane.webp", "/print-samples/visiting-card-arden-vale.webp"],
    pitch: "A card is still how people remember who they met. Thick stock and a clean design say you take the work seriously.",
    made: ["Business cards", "Appointment cards", "Loyalty cards", "Gift cards"],
    choose: ["Matte, gloss or foil", "Standard or square", "A code that opens your website"],
  },
  {
    id: "flyers",
    name: "Flyers and brochures",
    images: ["/print-samples/flyer-oak-and-ember.webp", "/print-samples/brochure-field-and-form.webp"],
    pitch: "For the offer you want the whole neighborhood to hear about, and for the details a customer wants to take home.",
    made: ["Flyers", "Folded brochures", "Door hangers", "Postcards"],
    choose: ["One side or two", "Folded two or three ways", "Any quantity"],
  },
  {
    id: "banners",
    name: "Banners and signs",
    images: ["/print-samples/banner-lumen-market.webp"],
    pitch: "The sign is the first thing anyone learns about your business. It should be readable from across the street.",
    made: ["Storefront banners", "Window and wall signs", "Yard and sidewalk signs", "Event backdrops"],
    choose: ["Indoor or outdoor", "Any size", "Ready to hang"],
  },
  {
    id: "letterheads",
    name: "Letterheads and paperwork",
    images: ["/print-samples/letterhead-cedarline.webp"],
    pitch: "Quotes, invoices and letters that look like they came from the same business as your website.",
    made: ["Letterheads", "Envelopes", "Invoice and quote sheets", "Folders"],
    choose: ["Printed, or a file you print yourself", "Matching envelopes", "Any quantity"],
  },
];

export const PRINT_ALSO = ["Stickers", "Labels", "Packaging", "Posters", "Window decals", "Uniform and shirt prints", "Stamps", "Price tags"];

export const PRINT_VALUE = [
  { title: "Design is part of the job", body: "You do not need to bring a file. We design it, you approve it, we print it." },
  { title: "It matches your screens", body: "Same colors, same lettering and same prices as your website and TV boards." },
  { title: "Reorders take one message", body: "We keep your files. When you run low or a price changes, tell us and it is done." },
  { title: "Shipped to your door", body: "Pick it up on Long Island or have it shipped anywhere in the United States." },
];

export const PLACES = ["Long Island", "New York City", "Westchester and the Hudson Valley", "New Jersey", "Connecticut", "Every other state, by video call"];
