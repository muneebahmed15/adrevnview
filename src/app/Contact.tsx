import { useSearchParams } from "react-router";
import { SpringPressable } from "@/components/SpringButton";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiteLayout } from "@/app/components/SiteLayout";
import { SeoHead } from "@/components/seo/SeoHead";
import { ORG, PAGES } from "@/lib/seo/siteConfig";
import { CONTACT_FAQ } from "@/lib/seo/structuredData";

export default function Contact() {
  const [params] = useSearchParams();
  const project = params.get("project");
  const service = params.get("service");
  return (
    <SiteLayout mainClassName="px-6 py-12">
      <SeoHead
        title="Let’s build something that matters. — Request a Quote"
        description={PAGES.contact.description}
        path="/contact"
      />

      <div className="max-w-5xl mx-auto">
        <h1
          className="text-4xl md:text-5xl font-extrabold mb-4"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Let’s build something that matters.
        </h1>
        <p
          data-geo-chunk="summary"
          className="text-muted-foreground text-lg mb-10 max-w-2xl leading-relaxed"
        >
          Tell us about your web design, development, SEO, branding, or print
          project. Our team will respond within one business day with next steps
          and a tailored proposal.
        </p>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-sky-400 mt-1" />
              <div>
                <p className="font-semibold">Email</p>
                <a
                  href={`mailto:${ORG.email}`}
                  className="text-sky-400 hover:text-sky-300"
                >
                  {ORG.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-sky-400 mt-1" />
              <div>
                <p className="font-semibold">Phone</p>
                <a
                  href={`tel:${ORG.phoneTel}`}
                  className="text-sky-400 hover:text-sky-300"
                >
                  {ORG.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-sky-400 mt-1" />
              <div>
                <p className="font-semibold">Working together online</p>
                <p className="text-muted-foreground text-sm">
                  Adrevnview LLC · Website, SEO, and brand projects delivered
                  remotely.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`;
              window.location.href = `mailto:${ORG.email}?subject=${encodeURIComponent("Project inquiry — Adrevnview")}&body=${encodeURIComponent(body)}`;
            }}
            className="rounded-2xl border border-sky-900/25 bg-card p-6 space-y-4"
            id="contact-form"
          >
            <div>
              <label
                className="text-sm text-muted-foreground block mb-1"
                htmlFor="contact-name"
              >
                Name
              </label>
              <input
                name="name"
                id="contact-name"
                required
                autoComplete="name"
                className="w-full px-4 py-3 rounded-xl bg-background border border-sky-900/30 text-foreground text-sm"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                className="text-sm text-muted-foreground block mb-1"
                htmlFor="contact-email"
              >
                Email
              </label>
              <input
                name="email"
                id="contact-email"
                required
                autoComplete="email"
                type="email"
                className="w-full px-4 py-3 rounded-xl bg-background border border-sky-900/30 text-foreground text-sm"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label
                className="text-sm text-muted-foreground block mb-1"
                htmlFor="contact-message"
              >
                Project details
              </label>
              <textarea
                defaultValue={
                  project
                    ? `I’m interested in a project like ${project}.`
                    : service
                      ? `I’m interested in ${service}.`
                      : ""
                }
                name="message"
                id="contact-message"
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-background border border-sky-900/30 text-foreground text-sm resize-none"
                placeholder="Goals, timeline, budget…"
              />
            </div>
            <SpringPressable
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-semibold"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Prepare project email
            </SpringPressable>
            <p className="text-sm text-muted-foreground">
              Opens your email app with your project details. Review the message
              and send it to hello@adrevnview.com.
            </p>
          </form>
        </div>

        <section>
          <h2
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Common questions
          </h2>
          <div className="space-y-4">
            {CONTACT_FAQ.map((item) => (
              <div
                key={item.question}
                className="rounded-xl border border-sky-900/20 bg-card p-5"
              >
                <h3 className="font-semibold mb-2">{item.question}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
