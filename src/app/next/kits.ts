/**
 * Every brand below is a concept made by Adrevnview to show the work.
 * None of them is a real business or a client. The page says so on screen.
 */
export type Brand = {
  name: string;
  bg: string;
  fg: string;
  accent: string;
  font: "poster" | "serif" | "grotesk";
  siteHeadline: string;
  siteButton: string;
  boardTitle: string;
  rows: [string, string][];
  paperKind: "menu" | "card" | "flyer";
  paperTitle: string;
  paperLines: string[];
};

export type Kit = {
  id: string;
  noun: string;
  label: string;
  brand: Brand;
  gets: string[];
};

export const KITS: Kit[] = [
  {
    id: "restaurant",
    noun: "restaurant",
    label: "Restaurant",
    brand: {
      name: "Marlow’s Slice House",
      bg: "#1c0d08",
      fg: "#fff1de",
      accent: "#ff5a36",
      font: "poster",
      siteHeadline: "Hot pies till midnight",
      siteButton: "Order pickup",
      boardTitle: "By the slice",
      rows: [
        ["Cheese", "3.75"],
        ["Pepperoni", "4.50"],
        ["Grandma square", "4.75"],
        ["Vodka slice", "5.00"],
        ["White slice", "4.75"],
      ],
      paperKind: "menu",
      paperTitle: "Whole pies",
      paperLines: ["Classic cheese", "Sausage and peppers", "Buffalo chicken", "Margherita"],
    },
    gets: [
      "A website with your menu and ordering links",
      "TV menu boards for behind the counter",
      "Printed dine-in and takeout menus",
      "Your Google listing set up and kept current",
      "Local ads for your busiest hours",
      "Posts made from your own food photos",
    ],
  },
  {
    id: "bagel",
    noun: "bagel shop",
    label: "Bagel shop or deli",
    brand: {
      name: "Sunrise Bagel Co.",
      bg: "#fff3d1",
      fg: "#2b1c0b",
      accent: "#e39a00",
      font: "serif",
      siteHeadline: "Fresh at five a.m.",
      siteButton: "Start an order",
      boardTitle: "Today’s bagels",
      rows: [
        ["Plain", "1.75"],
        ["Everything", "1.75"],
        ["Bacon, egg and cheese", "6.50"],
        ["Lox and schmear", "11.00"],
        ["Baker’s dozen", "18.00"],
      ],
      paperKind: "menu",
      paperTitle: "Catering trays",
      paperLines: ["Bagel and schmear tray", "Breakfast sandwich tray", "Fruit and pastry tray", "Coffee for twelve"],
    },
    gets: [
      "Online ordering on Bagelzop, our own software",
      "A kitchen screen that shows each order as it comes in",
      "Catering orders in the same place",
      "TV menu boards and printed takeout menus",
      "Your Google listing set up and kept current",
      "Local ads for the morning rush",
    ],
  },
  {
    id: "dessert",
    noun: "dessert shop",
    label: "Dessert shop or café",
    brand: {
      name: "Velvet Spoon",
      bg: "#2a1030",
      fg: "#ffe8f2",
      accent: "#ff77b6",
      font: "serif",
      siteHeadline: "Dessert, built your way",
      siteButton: "Build a cup",
      boardTitle: "Crepes and cups",
      rows: [
        ["Strawberry crepe", "9.50"],
        ["Pistachio cup", "8.75"],
        ["Brownie stack", "8.00"],
        ["Mango shake", "7.25"],
        ["Kids cup", "5.00"],
      ],
      paperKind: "flyer",
      paperTitle: "Two for Tuesday",
      paperLines: ["Any two cups", "One price", "All day, every Tuesday"],
    },
    gets: [
      "A website where each item has its own page",
      "Pickup ordering by location",
      "A page for every store you open",
      "TV menu boards, flyers and counter cards",
      "Your Google listing set up and kept current",
      "Short videos made from your own desserts",
    ],
  },
  {
    id: "gym",
    noun: "gym",
    label: "Gym or academy",
    brand: {
      name: "Ironbay Training",
      bg: "#0b1411",
      fg: "#e9fff3",
      accent: "#35e07a",
      font: "poster",
      siteHeadline: "First class is free",
      siteButton: "Book a trial",
      boardTitle: "Today’s classes",
      rows: [
        ["Strength", "6:00 AM"],
        ["Boxing basics", "9:30 AM"],
        ["Open mat", "12:00 PM"],
        ["Kids jiu-jitsu", "5:30 PM"],
        ["Muay Thai", "7:00 PM"],
      ],
      paperKind: "flyer",
      paperTitle: "Seven-day trial",
      paperLines: ["Every class", "Every coach", "No contract"],
    },
    gets: [
      "A website with your class schedule and trial sign-up",
      "Matzop, our software for memberships and attendance",
      "A schedule board for the front desk",
      "Banners, flyers and brochures",
      "Local ads for your trial offer",
      "Your Google listing set up and kept current",
    ],
  },
  {
    id: "barber",
    noun: "barbershop",
    label: "Barbershop or salon",
    brand: {
      name: "North Fade Barbers",
      bg: "#0f1317",
      fg: "#f3efe4",
      accent: "#d8b168",
      font: "serif",
      siteHeadline: "Walk in. Sit down.",
      siteButton: "Join the line",
      boardTitle: "Services",
      rows: [
        ["Haircut", "35"],
        ["Skin fade", "40"],
        ["Beard trim", "20"],
        ["Cut and beard", "50"],
        ["Kids cut", "25"],
      ],
      paperKind: "card",
      paperTitle: "North Fade Barbers",
      paperLines: ["Walk-ins welcome", "Open seven days", "(516) 555-0142"],
    },
    gets: [
      "A website with services, prices and a booking link",
      "Cutzop, our software for check-in and the chair queue",
      "A price board for the wall",
      "Business cards and window signs",
      "Posts made from your own cuts and styles",
      "Your Google listing set up and kept current",
    ],
  },
  {
    id: "clinic",
    noun: "clinic",
    label: "Clinic or med spa",
    brand: {
      name: "Harbor Skin Clinic",
      bg: "#eef5f3",
      fg: "#0f2f2a",
      accent: "#1b8a79",
      font: "grotesk",
      siteHeadline: "Care that fits your day",
      siteButton: "Request a visit",
      boardTitle: "Today",
      rows: [
        ["Dr. Lane, room 2", "On time"],
        ["Dr. Osei, room 4", "On time"],
        ["Skin check", "10 min wait"],
        ["Laser suite", "Next at 2:15"],
        ["Front desk", "Open"],
      ],
      paperKind: "card",
      paperTitle: "Harbor Skin Clinic",
      paperLines: ["Skin checks and treatments", "By appointment", "(516) 555-0178"],
    },
    gets: [
      "A website with your services and appointment requests",
      "Doczop, our software for practices with several doctors",
      "A waiting-room screen",
      "Letterheads, cards and brochures",
      "Ads checked against each platform’s health rules before they run",
      "Your Google listing set up and kept current",
    ],
  },
  {
    id: "store",
    noun: "store",
    label: "Store",
    brand: {
      name: "Field & Thread",
      bg: "#f3ecdf",
      fg: "#1e281a",
      accent: "#c2542a",
      font: "serif",
      siteHeadline: "New this week",
      siteButton: "Shop the drop",
      boardTitle: "In the window",
      rows: [
        ["Linen apron", "48"],
        ["Stoneware mug", "26"],
        ["Wool throw", "120"],
        ["Beeswax candle", "18"],
        ["Gift box", "65"],
      ],
      paperKind: "flyer",
      paperTitle: "Weekend sale",
      paperLines: ["Saturday and Sunday", "Twenty percent off", "In store and online"],
    },
    gets: [
      "An online store your customers can order from",
      "Product pages that Google and AI search can read",
      "A screen for the shop window",
      "Banners, flyers and business cards",
      "Local ads for your best sellers",
      "Your Google listing set up and kept current",
    ],
  },
];

export const TICKER = [
  "Websites",
  "TV menu boards",
  "Menus",
  "Google listings",
  "Ads",
  "Motion videos",
  "Business cards",
  "Banners",
  "Online ordering",
  "Logos",
];

export const PRINTS = [
  { src: "/print-samples/menu-mira-and-sol.webp", title: "Dine-in menu", tall: true },
  { src: "/print-samples/visiting-card-nori-lane.webp", title: "Foil business cards" },
  { src: "/print-samples/menu-brass-spoon.webp", title: "Takeout menu" },
  { src: "/print-samples/banner-lumen-market.webp", title: "Storefront banner" },
  { src: "/print-samples/flyer-oak-and-ember.webp", title: "Market flyer" },
  { src: "/print-samples/brochure-field-and-form.webp", title: "Folded brochure" },
  { src: "/print-samples/letterhead-cedarline.webp", title: "Letterhead set" },
  { src: "/print-samples/visiting-card-arden-vale.webp", title: "Business cards" },
];
