import "@/app/agency.css";
import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { FxBackground } from "@/components/fx/FxBackground";

type SiteLayoutProps = {
  children: ReactNode;
  showFooter?: boolean;
  mainClassName?: string;
  fx?: boolean;
};

export function SiteLayout({
  children,
  showFooter = true,
  mainClassName = "",
  fx = false,
}: SiteLayoutProps) {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return (
    <div
      className="relative min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {fx ? <FxBackground variant="subtle" /> : null}
      <div className="relative z-10">
        <SiteHeader />
        <main
          id="main-content"
          tabIndex={-1}
          className={`site-main pt-28 ${mainClassName}`.trim()}
        >
          {children}
        </main>
        {showFooter ? <SiteFooter /> : null}
      </div>
    </div>
  );
}
