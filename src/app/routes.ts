import { createBrowserRouter, redirect } from "react-router";
import { lazy } from "react";

const GoogleNFC = lazy(() => import("./GoogleNFC"));
const About = lazy(() => import("./About"));
const Privacy = lazy(() => import("./Privacy"));
const Accessibility = lazy(() => import("./Accessibility"));
const SeoReport = lazy(() => import("./SeoReport"));
const Work = lazy(() => import("./Work"));
const ServicePage = lazy(() => import("./ServicePage"));
const Services = lazy(() => import("./Services"));
const Industries = lazy(() => import("./Industries"));
const Blog = lazy(() => import("./Blog"));
const BlogPost = lazy(() => import("./BlogPost"));
const Contact = lazy(() => import("./Contact"));
const IndustryPage = lazy(() => import("./IndustryPage"));
const ClientDetail = lazy(() => import("./ClientDetail"));
const NextHome = lazy(() => import("./next/NextHome"));

const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const AdminIndexRedirect = lazy(() =>
  import("./admin/AdminLayout").then((m) => ({ default: m.AdminIndexRedirect })),
);
const AdminLogin = lazy(() => import("./admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
const AdminClients = lazy(() => import("./admin/AdminClients"));
const AdminInvoices = lazy(() => import("./admin/AdminInvoices"));
const AdminInvoiceEditor = lazy(() => import("./admin/AdminInvoiceEditor"));
const AdminInvoiceView = lazy(() => import("./admin/AdminInvoiceView"));
const AdminSettings = lazy(() => import("./admin/AdminSettings"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: NextHome,
  },
  {
    // Old preview address. Send anyone who saved it to the real homepage.
    path: "/next",
    loader: ({ request }) => redirect(`/${new URL(request.url).search}`),
  },
  {
    path: "/googlenfc",
    Component: GoogleNFC,
  },
  {
    path: "/about",
    Component: About,
  },
  {
    path: "/work",
    Component: Work,
  },
  {
    path: "/work/:category",
    Component: Work,
  },
  {
    path: "/blog",
    Component: Blog,
  },
  {
    path: "/blog/:slug",
    Component: BlogPost,
  },
  {
    path: "/services",
    Component: Services,
  },
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminIndexRedirect },
      { path: "dashboard", Component: AdminDashboard },
      { path: "clients", Component: AdminClients },
      { path: "invoices", Component: AdminInvoices },
      { path: "invoices/new", Component: AdminInvoiceEditor },
      { path: "invoices/:id", Component: AdminInvoiceView },
      { path: "invoices/:id/edit", Component: AdminInvoiceEditor },
      { path: "settings", Component: AdminSettings },
    ],
  },
  {
    path: "/privacy",
    Component: Privacy,
  },
  {
    path: "/accessibility",
    Component: Accessibility,
  },
  {
    path: "/seo-report",
    Component: SeoReport,
  },
  {
    path: "/geo-report",
    Component: SeoReport,
  },
  {
    path: "/contact",
    Component: Contact,
  },
  {
    path: "/services/:slug",
    Component: ServicePage,
  },
  {
    path: "/industries",
    Component: Industries,
  },
  {
    path: "/industries/:slug",
    Component: IndustryPage,
  },
  {
    path: "/:slug",
    Component: ClientDetail,
  },
]);
