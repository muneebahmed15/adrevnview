import { Suspense } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#06091a]" />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
