import { useEffect, useMemo, useState, type CSSProperties, type FormEvent } from "react";
import { ORG } from "@/lib/seo/siteConfig";
import { KITS, type Kit } from "./kits";
import { PACKAGES } from "./content";
import { AD_PLACES, AD_PROMISES, KIT_DEEP, MOTION_WORDS, PRINT_ALSO, PRINT_SHOP, PRINT_VALUE } from "./deep";

function track(event: string, params: Record<string, string>) {
  window.gtag?.("event", event, params);
}

/* ───────── What goes wrong, and what we do about it ───────── */
export function KitProblems({ kit }: { kit: Kit }) {
  const deep = KIT_DEEP[kit.id];
  if (!deep) return null;
  return (
    <section className="nx-section" id="fixes">
      <div className="nx-head">
        <h2>What goes wrong for a {kit.noun}, and what we do about it</h2>
        <p>{deep.intro}</p>
      </div>
      <div className="nx-problems" key={kit.id}>
        <div className="nx-problems-head" aria-hidden="true">
          <span>What goes wrong</span>
          <span>What we do</span>
        </div>
        {deep.problems.map((item) => (
          <article key={item.problem}>
            <p>
              <span className="nx-sr">What goes wrong: </span>
              {item.problem}
            </p>
            <p>
              <span className="nx-sr">What we do: </span>
              {item.fix}
            </p>
          </article>
        ))}
      </div>
      <p className="nx-problems-note">Running a different kind of business? Pick it at the top of the page and this list changes.</p>
    </section>
  );
}

/* ───────── Ads and motion video ───────── */
export function AdsSection({ kit, brandStyle, moving }: { kit: Kit; brandStyle: CSSProperties; moving: boolean }) {
  const deep = KIT_DEEP[kit.id];
  const [word, setWord] = useState(0);

  useEffect(() => {
    if (!moving) return;
    const timer = window.setInterval(() => setWord((i) => (i + 1) % MOTION_WORDS.length), 2200);
    return () => window.clearInterval(timer);
  }, [moving]);

  if (!deep) return null;
  const { brand } = kit;

  return (
    <section className="nx-band nx-band-ink" id="ads">
      <div className="nx-band-inner">
        <div className="nx-head">
          <h2>Ads that end in a phone call</h2>
          <p>
            An ad is only worth paying for if it brings a customer. So we build the whole path: the ad, the page it opens, and the
            call, booking or order at the end. Here is the one we would run for a {kit.noun}.
          </p>
        </div>

        <div className="nx-funnel" key={kit.id} style={brandStyle}>
          <figure>
            <div className="nx-ad" aria-hidden="true">
              <small>{brand.name}</small>
              <strong>{deep.ad.line}</strong>
              <span>{deep.ad.offer}</span>
              <em>{deep.ad.button}</em>
            </div>
            <figcaption>
              <b>The ad</b>
              {deep.ad.where}
            </figcaption>
          </figure>
          <figure>
            <div className="nx-landing" aria-hidden="true">
              <div className="nx-landing-bar">
                <i />
                <i />
                <i />
              </div>
              <div className="nx-landing-body">
                <small>{brand.name}</small>
                <strong>{deep.ad.line}</strong>
                <span>{deep.ad.offer}</span>
                <em>{deep.ad.button}</em>
                <div>
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
            <figcaption>
              <b>The page</b>
              Says the same thing as the ad, with one button
            </figcaption>
          </figure>
          <figure>
            <div className="nx-result" aria-hidden="true">
              <span>Just now</span>
              <strong>{deep.ad.result}</strong>
              <small>Counted in your monthly report</small>
            </div>
            <figcaption>
              <b>The customer</b>
              The only number that matters
            </figcaption>
          </figure>
        </div>
        <p className="nx-funnel-note">{brand.name} is a concept brand. The ad, page and result above are examples, not results from a client.</p>

        <div className="nx-ads-grid">
          <div className="nx-card-x is-glass">
            <h3>Where we run them</h3>
            <dl className="nx-places">
              {AD_PLACES.map((place) => (
                <div key={place.name}>
                  <dt>{place.name}</dt>
                  <dd>{place.when}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="nx-ads-side">
            <div className="nx-card-x is-sun">
              <h3>How we run them</h3>
              <ul className="nx-ticks is-dark">
                {AD_PROMISES.map((promise) => (
                  <li key={promise}>{promise}</li>
                ))}
              </ul>
            </div>
            <div className="nx-card-x is-glass nx-motion-card">
              <span className="nx-tag">Motion video</span>
              <p className="nx-motion-word" key={word} aria-live="off">
                {MOTION_WORDS[word]}
              </p>
              <p>
                We make the videos, too. Animated ads, moving menu boards, logo animations and short clips for Instagram, TikTok and
                YouTube. Made in our shop, so they match everything else.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── The print shop ───────── */
export function PrintShop() {
  const [tab, setTab] = useState(PRINT_SHOP[0].id);
  const item = PRINT_SHOP.find((p) => p.id === tab) ?? PRINT_SHOP[0];

  return (
    <section className="nx-section" id="print">
      <div className="nx-head">
        <h2>The print shop</h2>
        <p>
          We are printers as well as designers. That means the menu in a customer's hand, the sign over your door and the site on
          their phone all come from one place and all match.
        </p>
      </div>

      <div className="nx-chips" role="group" aria-label="Print products">
        {PRINT_SHOP.map((p) => (
          <button type="button" key={p.id} aria-pressed={p.id === tab} onClick={() => setTab(p.id)}>
            {p.name}
          </button>
        ))}
      </div>

      <div className="nx-print nx-card-x is-plain" key={item.id}>
        <div className={`nx-print-images${item.images.length === 1 ? " is-single" : ""}`}>
          {item.images.map((src) => (
            <img key={src} src={src} alt={`${item.name}, sample we designed`} loading="lazy" />
          ))}
        </div>
        <div className="nx-print-copy">
          <h3>{item.name}</h3>
          <p>{item.pitch}</p>
          <div className="nx-print-lists">
            <div>
              <h4>We make</h4>
              <ul className="nx-ticks">
                {item.made.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>You choose</h4>
              <ul className="nx-ticks">
                {item.choose.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
          <a className="nx-btn nx-btn-primary" href="#quote" onClick={() => track("quote_start", { from: `print-${item.id}` })}>
            Get a print quote
          </a>
          <small>The pictures are samples we designed to show the work.</small>
        </div>
      </div>

      <div className="nx-cards nx-cards-4 nx-print-value">
        {PRINT_VALUE.map((value) => (
          <article className="nx-card-x is-sky" key={value.title}>
            <h3>{value.title}</h3>
            <p>{value.body}</p>
          </article>
        ))}
      </div>

      <div className="nx-print-also">
        <h3>We also print</h3>
        <ul className="nx-towns">
          {PRINT_ALSO.map((thing) => (
            <li key={thing}>{thing}</li>
          ))}
        </ul>
        <p>If it can be printed, ask us.</p>
      </div>
    </section>
  );
}

/* ───────── The order form ───────── */
const NEEDS = [
  { name: "Website", sub: "New or rebuilt" },
  { name: "Show up on Google", sub: "Search and your listing" },
  { name: "Ads", sub: "Google, Instagram, TikTok" },
  { name: "Social media", sub: "Posts and short videos" },
  { name: "Motion videos", sub: "Animated ads and menu boards" },
  { name: "Print", sub: "Menus, cards, flyers, signs" },
  { name: "TV boards", sub: "Screens behind the counter" },
  { name: "Logo and brand", sub: "Name, colors, lettering" },
  { name: "Software", sub: "Ordering, check-in, memberships" },
];

const STEP_TITLES = ["Your business", "What you need", "Where and when", "How to reach you"];

function suggest(needs: string[]) {
  if (needs.length === 0) return null;
  if (needs.includes("Ads") || needs.includes("Motion videos")) return PACKAGES[2];
  if (needs.includes("Show up on Google") || needs.includes("Social media")) return PACKAGES[1];
  return PACKAGES[0];
}

export function OrderForm({ kit, onKit }: { kit: Kit; onKit: (id: string) => void }) {
  const [step, setStep] = useState(1);
  const [needs, setNeeds] = useState<string[]>([]);
  const [place, setPlace] = useState("");
  const [when, setWhen] = useState("");
  const [sent, setSent] = useState<"" | "direct" | "email">("");
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState("");
  const ticketNo = useMemo(() => String(Math.floor(1000 + Math.random() * 9000)), []);
  const pack = suggest(needs);

  function toggleNeed(need: string) {
    setNeeds((current) => (current.includes(need) ? current.filter((n) => n !== need) : [...current, need]));
  }

  function next() {
    setStep((s) => Math.min(4, s + 1));
    track("quote_step", { step: String(step + 1), kit: kit.id });
  }

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const answers = {
      ticket: ticketNo,
      businessType: kit.label,
      needs,
      place,
      when,
      pack: pack ? pack.name : "",
      name: String(data.get("name") ?? ""),
      business: String(data.get("business") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      note: String(data.get("note") ?? ""),
      website: String(data.get("website") ?? ""),
    };
    setBusy(true);
    setProblem("");
    track("quote_send", { kit: kit.id });

    // First choice: send straight to the shop's inbox.
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
        track("generate_lead", { kit: kit.id, method: "form" });
        return;
      }
      if (response.status === 400 && result?.error) {
        setBusy(false);
        setProblem(String(result.error));
        return;
      }
    } catch {
      // Fall through to the email app.
    }

    // Second choice: open the visitor's own email app with everything filled in.
    const body = [
      `Ticket: ${ticketNo}`,
      `Business type: ${kit.label}`,
      `Needs: ${needs.join(", ") || "Not sure yet"}`,
      `Where: ${place || "Not given"}`,
      `Start: ${when || "Not given"}`,
      `Suggested package: ${pack ? pack.name : "None yet"}`,
      "",
      `Name: ${answers.name}`,
      `Business: ${answers.business}`,
      `Phone: ${answers.phone}`,
      `Email: ${answers.email || "Not given"}`,
      "",
      answers.note,
    ].join("\n");
    setBusy(false);
    track("generate_lead", { kit: kit.id, method: "email_app" });
    setSent("email");
    window.location.href = `mailto:${ORG.email}?subject=${encodeURIComponent(`Quote request ${ticketNo}: ${kit.label}`)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="nx-order">
      <form className="nx-order-form" onSubmit={send}>
        <ol className="nx-progress" aria-label="Progress">
          {STEP_TITLES.map((title, index) => (
            <li key={title} className={index + 1 < step ? "is-done" : index + 1 === step ? "is-now" : undefined}>
              <button type="button" onClick={() => setStep(index + 1)} disabled={index + 1 > step} aria-current={index + 1 === step ? "step" : undefined}>
                {title}
              </button>
            </li>
          ))}
        </ol>

        {sent === "direct" ? (
          <div className="nx-order-step nx-order-done" role="status">
            <h3>Ticket {ticketNo} is in. Thank you.</h3>
            <p>
              We have your answers and will call the number you gave. If you would rather not wait, call{" "}
              <a href={`tel:${ORG.phoneTel}`}>{ORG.phoneDisplay}</a>.
            </p>
          </div>
        ) : null}
        {sent === "email" ? (
          <div className="nx-order-step nx-order-done" role="status">
            <h3>One more tap: press send in your email app</h3>
            <p>
              Your email app should have opened with ticket {ticketNo} filled in. Press send there and it is on its way. If nothing
              opened, call <a href={`tel:${ORG.phoneTel}`}>{ORG.phoneDisplay}</a> or write to{" "}
              <a href={`mailto:${ORG.email}`}>{ORG.email}</a>.
            </p>
            <button type="button" className="nx-btn nx-btn-quiet" onClick={() => setSent("")}>
              Go back to my answers
            </button>
          </div>
        ) : null}

        <div className="nx-order-step" hidden={sent !== "" || step !== 1}>
          <h3>What do you run?</h3>
          <div className="nx-tiles">
            {KITS.map((k) => (
              <button
                type="button"
                key={k.id}
                aria-pressed={k.id === kit.id}
                onClick={() => onKit(k.id)}
                style={{ "--dot": k.brand.accent } as CSSProperties}
              >
                <i aria-hidden="true" />
                <b>{k.label}</b>
              </button>
            ))}
          </div>
          <p className="nx-order-hint">Something else? Pick the closest one and tell us at the end.</p>
        </div>

        <div className="nx-order-step" hidden={sent !== "" || step !== 2}>
          <h3>What do you need? Pick as many as you like.</h3>
          <div className="nx-tiles is-needs">
            {NEEDS.map((need) => (
              <button type="button" key={need.name} aria-pressed={needs.includes(need.name)} onClick={() => toggleNeed(need.name)}>
                <b>{need.name}</b>
                <span>{need.sub}</span>
              </button>
            ))}
          </div>
          <p className="nx-order-hint">Not sure? Skip this. We will work it out together.</p>
        </div>

        <div className="nx-order-step" hidden={sent !== "" || step !== 3}>
          <h3>Where is your business?</h3>
          <input
            className="nx-order-input"
            value={place}
            onChange={(event) => setPlace(event.target.value)}
            placeholder="City and state"
            aria-label="City and state"
            autoComplete="address-level2"
          />
          <h3>When do you want to start?</h3>
          <div className="nx-tiles is-small">
            {["As soon as possible", "This month", "Next month", "Just looking"].map((option) => (
              <button type="button" key={option} aria-pressed={when === option} onClick={() => setWhen(option)}>
                <b>{option}</b>
              </button>
            ))}
          </div>
        </div>

        <div className="nx-order-step" hidden={sent !== "" || step !== 4}>
          <h3>Where do we send your quote?</h3>
          <div className="nx-fields">
            <label>
              Your name
              <input name="name" required autoComplete="name" />
            </label>
            <label>
              Business name
              <input name="business" required autoComplete="organization" />
            </label>
            <label>
              Phone number
              <input name="phone" type="tel" required autoComplete="tel" />
            </label>
            <label>
              Email (optional)
              <input name="email" type="email" autoComplete="email" />
            </label>
            <label className="nx-field-wide">
              Anything we should know? (optional)
              <textarea name="note" rows={3} />
            </label>
            <label className="nx-trap" aria-hidden="true">
              Leave this empty
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          {problem ? (
            <p className="nx-order-problem" role="alert">
              {problem}
            </p>
          ) : null}
        </div>

        {sent === "" ? (
          <div className="nx-order-actions">
            {step > 1 ? (
              <button type="button" className="nx-btn nx-btn-quiet" onClick={() => setStep((s) => s - 1)}>
                Back
              </button>
            ) : null}
            {step < 4 ? (
              <button type="button" className="nx-btn nx-btn-primary" onClick={next}>
                Continue
              </button>
            ) : (
              <button type="submit" className="nx-btn nx-btn-primary" disabled={busy}>
                {busy ? "Sending" : "Send my ticket"}
              </button>
            )}
            <span>
              Step {step} of 4
            </span>
          </div>
        ) : null}
      </form>

      <aside className="nx-ticket" aria-label="Your order ticket so far">
        <header>
          <strong>{ORG.name}</strong>
          <span>Order ticket {ticketNo}</span>
        </header>
        <dl>
          <div>
            <dt>For</dt>
            <dd>{kit.label}</dd>
          </div>
          <div>
            <dt>Wants</dt>
            <dd>
              {needs.length > 0 ? (
                <ul>
                  {needs.map((need) => (
                    <li key={need}>{need}</li>
                  ))}
                </ul>
              ) : (
                <i>Nothing picked yet</i>
              )}
            </dd>
          </div>
          <div>
            <dt>Where</dt>
            <dd>{place || <i>Not filled in</i>}</dd>
          </div>
          <div>
            <dt>Start</dt>
            <dd>{when || <i>Not picked</i>}</dd>
          </div>
        </dl>
        <div className="nx-ticket-pack">
          <span>Where we would start</span>
          {pack ? (
            <>
              <strong>{pack.name}</strong>
              <b>
                {pack.price} {pack.term}
              </b>
            </>
          ) : (
            <strong>Pick what you need and we will suggest one</strong>
          )}
        </div>
        <footer>Nothing is charged. This is a request for a quote, and you get the exact price in writing.</footer>
      </aside>
    </div>
  );
}
