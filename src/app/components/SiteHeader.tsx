import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { ORG } from "@/lib/seo/siteConfig";

const LINKS = [
  { label: "Services", to: "/services" },
  { label: "Print", to: "/services/printing-services" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`nxi-header${open ? " is-open" : ""}`}>
      <Link to="/" className="nxi-logo">
        <img src="/logo-icon.svg" alt="" width={28} height={32} />
        {ORG.name}
      </Link>
      <button type="button" className="nxi-menu-button" aria-expanded={open} aria-controls="nxi-nav" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Menu"}
      </button>
      <nav id="nxi-nav" aria-label="Main">
        {LINKS.map((link) => (
          <Link key={link.to} to={link.to} aria-current={pathname === link.to ? "page" : undefined}>
            {link.label}
          </Link>
        ))}
      </nav>
      <a className="nxi-header-phone" href={`tel:${ORG.phoneTel}`}>
        {ORG.phoneDisplay}
      </a>
      <Link className="nxi-cta" to="/#quote">
        Get a quote
      </Link>
    </header>
  );
}
