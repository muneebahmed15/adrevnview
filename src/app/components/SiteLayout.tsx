import type { ReactNode } from "react";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import "@/styles/inner.css";

type SiteLayoutProps = {
  children: ReactNode;
  showFooter?: boolean;
  mainClassName?: string;
  /** Kept so older pages that pass it still work. The moving background is gone. */
  fx?: boolean;
};

export function SiteLayout({ children, showFooter = true, mainClassName = "" }: SiteLayoutProps) {
  return (
    <div className="nxi">
      <SiteHeader />
      <main className={`nxi-main ${mainClassName}`.trim()}>{children}</main>
      {showFooter ? <SiteFooter /> : null}
    </div>
  );
}
