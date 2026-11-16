import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/app/components/SiteLayout";
import { SeoHead } from "@/components/seo/SeoHead";
import { SpringCardLink } from "@/components/SpringCard";
import { PrintSamplesGallery } from "@/app/components/PrintSamplesGallery";
import { FOOTER_LINKS, getServicePath, SERVICES } from "@/lib/content/services";

export default function Services() {
  return (
    <SiteLayout mainClassName="px-6 py-12">
      <SeoHead
        title="Digital Agency Services | Adrevnview"
        description="Full-service web design, development, SEO, GEO, branding, printing, and digital marketing for B2B, B2C, and enterprise brands on Long Island and nationwide."
        path="/services"
      />

      <div className="max-w-7xl mx-auto">
        <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-4">
          What We Do
        </p>
        <h1
          className="text-4xl md:text-5xl font-extrabold text-foreground mb-6"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Our Services
        </h1>
        <p
          className="text-muted-foreground text-lg leading-relaxed mb-14 max-w-3xl"
          data-geo-chunk="summary"
        >
          Start with the business outcome you need. We connect strategy, website
          design, development, and search visibility in a scope built around
          your priorities.
        </p>

        <div className="service-overview">
          <Link to="/services/custom-web-design">
            <h2>Build a better website</h2>
            <p>
              A clear message, thoughtful design, and an experience that works
              across screens. Start fresh or rethink an existing site.
            </p>
            <span className="agency-text-link">
              Web design <ArrowRight size={17} />
            </span>
          </Link>
          <Link to="/services/seo-services">
            <h2>Improve search visibility</h2>
            <p>
              Find technical issues, strengthen useful content, and make your
              business easier to discover through search.
            </p>
            <span className="agency-text-link">
              SEO services <ArrowRight size={17} />
            </span>
          </Link>
          <Link to="/services/brand-identity">
            <h2>Bring your brand together</h2>
            <p>
              Connect your identity across your website, business materials, and
              the places customers encounter your brand.
            </p>
            <span className="agency-text-link">
              Brand identity <ArrowRight size={17} />
            </span>
          </Link>
        </div>
        <h2 className="text-3xl font-bold mb-10">Explore our capabilities</h2>
        {Object.entries(FOOTER_LINKS).map(([category, links]) => (
          <section key={category} className="mb-14">
            <h2
              className="text-2xl font-bold text-foreground mb-6"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {category}
            </h2>
            {category === "Printing" ? (
              <div className="mb-8">
                <PrintSamplesGallery slug="printing-services" showFilters />
              </div>
            ) : null}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {links.map(({ label, slug }) => {
                const service = SERVICES.find((s) => s.slug === slug);
                return (
                  <SpringCardLink
                    key={slug}
                    to={getServicePath(slug)}
                    className="group block rounded-xl border border-border bg-card p-6 hover:border-sky-500/40 transition-all"
                  >
                    <h3
                      className="text-lg font-bold text-foreground mb-2 group-hover:text-sky-300 transition-colors"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      {label}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {service?.description ??
                        `Learn about ${label.toLowerCase()} from Adrevnview.`}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sky-400 text-sm font-semibold">
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </SpringCardLink>
                );
              })}
            </div>
          </section>
        ))}

        <p className="text-muted-foreground text-sm">
          Not sure where to start?{" "}
          <Link to="/contact" className="text-sky-400 hover:text-sky-300">
            Request a free consultation
          </Link>
        </p>
      </div>
    </SiteLayout>
  );
}
