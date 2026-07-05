import { createBrowserRouter } from "react-router";
import { lazy } from "react";

const MainSite = lazy(() => import("./MainSite"));
const GoogleNFC = lazy(() => import("./GoogleNFC"));
const About = lazy(() => import("./About"));
const Privacy = lazy(() => import("./Privacy"));
const Accessibility = lazy(() => import("./Accessibility"));
const SeoReport = lazy(() => import("./SeoReport"));
const Work = lazy(() => import("./Work"));
const ClientDetail = lazy(() => import("./ClientDetail"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainSite,
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
    path: "/:slug",
    Component: ClientDetail,
  },
]);
