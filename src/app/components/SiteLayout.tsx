import type { ReactNode } from "react";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { FxBackground } from "@/components/fx/FxBackground";

type SiteLayoutProps = {
  children: ReactNode;
  showFooter?: boolean;
  mainClassName?: string;
  fx?: boolean;
};

export function SiteLayout({ children, showFooter = true, mainClassName = "", fx = true }: SiteLayoutProps) {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      {fx ? <FxBackground variant="subtle" /> : null}
      <div className="relative z-10">
        <SiteHeader />
        <main className={`pt-28 ${mainClassName}`.trim()}>{children}</main>
        {showFooter ? <SiteFooter /> : null}
      </div>
    </div>
  );
}
