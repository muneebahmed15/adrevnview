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
        title="Services: Websites, Print, Ads and Software | Adrevnview"
        description="Everything a local business shows the public: website, Google listing, ads, print, signs and software. Based on Long Island, New York, working across the United States."
        path="/services"
      />

      <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
          Everything we make
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-14 max-w-3xl" data-geo-chunk="summary">
          Adrevnview is one shop for a local business, based on Long Island, New York. We make the website, look after the Google listing, run the ads, and design and print the menus, cards, flyers and banners, so everything matches on screen and on paper.
        </p>

        {Object.entries(FOOTER_LINKS).map(([category, links]) => (
          <section key={category} className="mb-14">
            <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
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
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-sky-300 transition-colors" style={{ fontFamily: "Manrope, sans-serif" }}>
                      {label}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {service?.description ?? `Learn about ${label.toLowerCase()} from Adrevnview.`}
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
          <Link to="/#quote" className="text-sky-400 hover:text-sky-300">
            Get a quote
          </Link>
        </p>
      </div>
    </SiteLayout>
  );
}
