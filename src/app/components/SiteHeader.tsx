import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { label: "Our products", to: "/#in-house" },
  { label: "Our work", to: "/work" },
  { label: "Services", to: "/services" },
  { label: "SEO", to: "/services/seo-services" },
  { label: "About", to: "/about" },
  { label: "Insights", to: "/blog" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <header className="site-header">
      <a className="site-skip" href="#main-content">
        Skip to content
      </a>
      <div className="site-header-inner">
        <Logo />
        <nav className="site-desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/services"}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="site-header-actions">
          <ThemeToggle />
          <NavLink className="site-header-cta" to="/contact">
            Let’s talk <ArrowUpRight size={17} />
          </NavLink>
          <button
            type="button"
            className="site-menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="site-mobile-nav"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)}>
              {link.label}
              <ArrowUpRight size={20} />
            </NavLink>
          ))}
          <NavLink to="/contact" onClick={() => setOpen(false)}>
            Discuss your project <ArrowUpRight size={20} />
          </NavLink>
        </nav>
      )}
    </header>
  );
}
