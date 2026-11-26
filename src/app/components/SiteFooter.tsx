import { Link } from "react-router";
import { ORG } from "@/lib/seo/siteConfig";

export function SiteFooter() {
  return (
    <>
      <section className="nxi-band" aria-label="Get a quote">
        <div>
          <h2>Tell us what your business needs.</h2>
          <p>Pick what you need, get a price in writing. No long contract.</p>
        </div>
        <div className="nxi-band-actions">
          <Link to="/#quote">Build your order</Link>
          <a href={`tel:${ORG.phoneTel}`}>Call {ORG.phoneDisplay}</a>
        </div>
      </section>
      <footer className="nxi-footer">
        <div>
          <strong>{ORG.name}</strong>
          <address>
            {ORG.address.streetAddress}
            <br />
            {ORG.address.addressLocality}, {ORG.address.addressRegion} {ORG.address.postalCode}
          </address>
          <a href={`tel:${ORG.phoneTel}`}>{ORG.phoneDisplay}</a>
          <a href={`mailto:${ORG.email}`}>{ORG.email}</a>
        </div>
        <div>
          <h2>What we do</h2>
          <Link to="/services/custom-web-design">Websites</Link>
          <Link to="/services/seo-services">Google and AI search</Link>
          <Link to="/#ads">Ads and motion video</Link>
          <Link to="/services/printing-services">Print and signs</Link>
          <Link to="/#software">Software</Link>
        </div>
        <div>
          <h2>Print</h2>
          <Link to="/services/restaurant-menu-printing">Restaurant menus</Link>
          <Link to="/services/business-card-printing">Business cards</Link>
          <Link to="/services/brochure-and-flyer-printing">Flyers and brochures</Link>
          <Link to="/services/panaflex-and-banner-advertising">Banners</Link>
          <Link to="/services/letterhead-printing">Letterheads</Link>
        </div>
        <div>
          <h2>Company</h2>
          <Link to="/services">All services</Link>
          <Link to="/#packages">Packages</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/geo-report">Free website check</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <p className="nxi-footer-end">
          © {new Date().getFullYear()} {ORG.name}. <Link to="/privacy" style={{ display: "inline" }}>Privacy</Link> ·{" "}
          <Link to="/accessibility" style={{ display: "inline" }}>Accessibility</Link> ·{" "}
          <a href="/sitemap.xml" style={{ display: "inline" }}>Sitemap</a>
        </p>
      </footer>
    </>
  );
}
