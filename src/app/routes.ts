import { createBrowserRouter } from "react-router";
import { lazy } from "react";

const MainSite = lazy(() => import("./MainSite"));
const GoogleNFC = lazy(() => import("./GoogleNFC"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainSite,
  },
  {
    path: "/googlenfc",
    Component: GoogleNFC,
  },
]);
