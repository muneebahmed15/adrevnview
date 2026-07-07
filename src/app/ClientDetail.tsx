import { Link, useParams } from "react-router";
import { ArrowRight, ExternalLink, Check } from "lucide-react";
import { SiteLayout } from "@/app/components/SiteLayout";
import { SeoHead } from "@/components/seo/SeoHead";
import { SpringCardLink } from "@/components/SpringCard";
import { CLIENTS, getClientBySlug, getClientPath } from "@/lib/content/clients";

export default function ClientDetail() {
  const { slug } = useParams<{ slug: string }>();
  const client = slug ? getClientBySlug(slug) : undefined;

  if (!client) {
    return (
      <SiteLayout mainClassName="px-6 py-20 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
            Client not found
          </h1>
          <Link to="/work" className="text-sky-400 hover:text-sky-300 transition-colors">
            View all case studies
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const path = getClientPath(client.slug);
  const relatedClients = CLIENTS.filter((c) => c.slug !== client.slug && c.category === client.category).slice(0, 2);

  return (
    <SiteLayout mainClassName="px-6 py-12">
      <SeoHead title={client.seoTitle} description={client.seoDescription} path={path} />

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold border border-border">
            {client.tag}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4" style={{ fontFamily: "Manrope, sans-serif" }} data-speakable="true">
          {client.name}
        </h1>

        <p className="text-foreground/80 text-lg leading-relaxed mb-8" data-speakable="true">
          {client.shortDescription}
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          <a
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-semibold hover:from-sky-500 hover:to-cyan-500 transition-all"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Visit {client.name} <ExternalLink className="w-4 h-4" />
          </a>
          <Link
            to="/#contact"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-sky-500/30 text-foreground/80 font-semibold hover:bg-sky-900/20 transition-all"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Start a Similar Project
          </Link>
        </div>

        <div className="rounded-2xl overflow-hidden border border-sky-900/20 mb-12">
          <img src={client.image} alt={`${client.name} project by Adrevnview`} className="w-full h-72 object-cover" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="rounded-xl border border-sky-900/20 bg-card p-4">
            <p className="text-sky-400 text-xs font-semibold uppercase tracking-wider mb-1">Client</p>
            <p className="text-foreground font-bold" style={{ fontFamily: "Manrope, sans-serif" }}>
              {client.name}
            </p>
          </div>
          <div className="rounded-xl border border-sky-900/20 bg-card p-4">
            <p className="text-sky-400 text-xs font-semibold uppercase tracking-wider mb-1">Category</p>
            <p className="text-foreground font-bold" style={{ fontFamily: "Manrope, sans-serif" }}>
              {client.category}
            </p>
          </div>
          <div className="rounded-xl border border-sky-900/20 bg-card p-4">
            <p className="text-sky-400 text-xs font-semibold uppercase tracking-wider mb-1">Highlight</p>
            <p className="text-foreground font-bold text-sm" style={{ fontFamily: "Manrope, sans-serif" }}>
              {client.metric}
            </p>
          </div>
          <div className="rounded-xl border border-sky-900/20 bg-card p-4">
            <p className="text-sky-400 text-xs font-semibold uppercase tracking-wider mb-1">Website</p>
            <a
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-300 hover:text-sky-200 font-bold text-sm break-all"
            >
              {client.url.replace(/^https?:\/\/(www\.)?/, "")}
            </a>
          </div>
        </div>

        <article className="prose-custom space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
              Overview
            </h2>
            <p className="text-foreground/80 leading-relaxed">{client.content.overview}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
              The Challenge
            </h2>
            <p className="text-foreground/80 leading-relaxed">{client.content.challenge}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
              Our Solution
            </h2>
            <p className="text-foreground/80 leading-relaxed">{client.content.solution}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
              Results
            </h2>
            <ul className="space-y-3">
              {client.content.results.map((result) => (
                <li key={result} className="flex items-start gap-3 text-foreground/80">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
              Services Delivered
            </h2>
            <div className="flex flex-wrap gap-2">
              {client.services.map((service) => (
                <span key={service} className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm border border-border">
                  {service}
                </span>
              ))}
            </div>
          </section>
        </article>

        {client.content.testimonial && (
          <blockquote className="mt-12 rounded-2xl border border-sky-900/20 bg-card p-8">
            <p className="text-foreground/90 text-lg leading-relaxed italic mb-4">
              &ldquo;{client.content.testimonial.quote}&rdquo;
            </p>
            <footer className="text-sky-400 text-sm font-semibold">{client.content.testimonial.attribution}</footer>
          </blockquote>
        )}

        <div className="mt-12 rounded-2xl border border-sky-600/30 bg-gradient-to-r from-sky-900/20 to-cyan-900/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
            Visit {client.name}
          </h2>
          <p className="text-foreground/80 mb-6">
            See the live project Adrevnview designed and built at{" "}
            <a href={client.url} target="_blank" rel="noopener noreferrer" className="text-sky-300 hover:text-sky-200">
              {client.url.replace(/^https?:\/\//, "")}
            </a>
          </p>
          <a
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-semibold hover:from-sky-500 hover:to-cyan-500 transition-all"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Launch {client.name} Website <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {relatedClients.length > 0 && (
          <section className="mt-16 pt-12 border-t border-sky-900/20">
            <h2 className="text-xl font-bold text-foreground mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
              Related Case Studies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedClients.map((related) => (
                <SpringCardLink
                  key={related.slug}
                  to={getClientPath(related.slug)}
                  className="group rounded-xl border border-sky-900/20 bg-card p-5 hover:border-sky-600/40 transition-all block"
                >
                  <span className="text-sky-400 text-xs font-semibold">{related.tag}</span>
                  <h3 className="text-lg font-bold text-foreground mt-1 mb-2 group-hover:text-sky-200 transition-colors" style={{ fontFamily: "Manrope, sans-serif" }}>
                    {related.name}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{related.shortDescription}</p>
                  <span className="inline-flex items-center gap-1 text-sky-400 text-sm font-semibold mt-3 group-hover:gap-2 transition-all">
                    Read case study <ArrowRight className="w-4 h-4" />
                  </span>
                </SpringCardLink>
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteLayout>
  );
}
