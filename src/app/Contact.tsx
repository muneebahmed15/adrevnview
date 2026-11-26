import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { SiteLayout } from "@/app/components/SiteLayout";
import { SeoHead } from "@/components/seo/SeoHead";
import { ORG } from "@/lib/seo/siteConfig";
import { CONTACT_FAQ } from "@/lib/seo/structuredData";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type Sent = "" | "direct" | "email";

export default function Contact() {
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState("");
  const [sent, setSent] = useState<Sent>("");

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const answers = {
      ticket: String(1000 + Math.floor(Math.random() * 9000)),
      businessType: "Contact page",
      name: String(form.get("name") ?? "").trim(),
      business: String(form.get("business") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      note: String(form.get("note") ?? "").trim(),
      website: String(form.get("website") ?? ""),
    };

    setProblem("");
    if (!answers.name || !answers.business || !answers.phone) {
      setProblem("Please give your name, business name and phone number.");
      return;
    }

    setBusy(true);
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      const isJson = (response.headers.get("content-type") ?? "").includes("application/json");
      const result = isJson ? await response.json() : null;
      if (result?.ok === true) {
        setBusy(false);
        setSent("direct");
        window.gtag?.("event", "generate_lead", { method: "contact_form" });
        return;
      }
      if (response.status === 400 && result?.error) {
        setBusy(false);
        setProblem(String(result.error));
        return;
      }
    } catch {
      // Fall through to the email app below.
    }

    // Sending from the site is not available right now: open the visitor's own email app instead.
    const lines = [
      `Name: ${answers.name}`,
      `Business: ${answers.business}`,
      `Phone: ${answers.phone}`,
      `Email: ${answers.email || "not given"}`,
      "",
      answers.note || "(no note)",
    ].join("\n");
    window.location.href = `mailto:${ORG.email}?subject=${encodeURIComponent(`Message from ${answers.business}`)}&body=${encodeURIComponent(lines)}`;
    window.gtag?.("event", "generate_lead", { method: "contact_email_app" });
    setBusy(false);
    setSent("email");
  }

  return (
    <SiteLayout mainClassName="px-6">
      <SeoHead
        title="Contact Adrevnview | Call, Email or Send a Message"
        description="Call (516) 820-7863, email hello@adrevnview.com or send a message. Adrevnview is in Garden City, Long Island, New York, and works with businesses across the United States."
        path="/contact"
      />

      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Talk to us.</h1>
        <p data-geo-chunk="summary" className="text-muted-foreground text-lg mb-10 max-w-2xl leading-relaxed">
          Tell us what your business needs: a website, a menu, a sign, ads, or all of it. We answer within one business day. Want a price?{" "}
          <Link to="/#quote" className="text-sky-400">
            Build your order
          </Link>{" "}
          and get it in writing.
        </p>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div className="space-y-6">
            <div>
              <p className="font-semibold">Call</p>
              <a href={`tel:${ORG.phoneTel}`} className="text-sky-400 text-2xl font-bold">
                {ORG.phoneDisplay}
              </a>
            </div>
            <div>
              <p className="font-semibold">Email</p>
              <a href={`mailto:${ORG.email}`} className="text-sky-400 text-xl font-bold">
                {ORG.email}
              </a>
            </div>
            <div>
              <p className="font-semibold">Our shop</p>
              <p className="text-muted-foreground">
                {ORG.address.streetAddress}
                <br />
                {ORG.address.addressLocality}, {ORG.address.addressRegion} {ORG.address.postalCode}
              </p>
            </div>
            <div>
              <p className="font-semibold">Where we work</p>
              <p className="text-muted-foreground">Mostly New York. We also work with businesses in every other state by phone and video call.</p>
            </div>
          </div>

          {sent ? (
            <div className="nxi-form-done" role="status">
              <h2 className="text-2xl font-bold">{sent === "direct" ? "Got it. Thank you." : "Your email app should be open."}</h2>
              <p>
                {sent === "direct"
                  ? "Your message is in our inbox. We will call or email you within one business day."
                  : `Press send there to finish. If nothing opened, email ${ORG.email} or call ${ORG.phoneDisplay}.`}
              </p>
            </div>
          ) : (
            <form className="nxi-form" id="contact-form" onSubmit={send} noValidate>
              <div className="nxi-form-two">
                <label>
                  Your name
                  <input name="name" autoComplete="name" required />
                </label>
                <label>
                  Business name
                  <input name="business" autoComplete="organization" required />
                </label>
              </div>
              <div className="nxi-form-two">
                <label>
                  Phone
                  <input name="phone" type="tel" autoComplete="tel" inputMode="tel" required />
                </label>
                <label>
                  Email (if you want)
                  <input name="email" type="email" autoComplete="email" />
                </label>
              </div>
              <label>
                What do you need?
                <textarea name="note" rows={4} />
              </label>
              <label className="nxi-hide" aria-hidden="true">
                Leave this empty
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
              {problem ? (
                <p className="nxi-form-problem" role="alert">
                  {problem}
                </p>
              ) : null}
              <button type="submit" disabled={busy}>
                {busy ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-6">Common questions</h2>
          <div className="space-y-4">
            {CONTACT_FAQ.map((item) => (
              <div key={item.question} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-semibold mb-2">{item.question}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
