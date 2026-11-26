import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router";
import { SeoHead } from "@/components/seo/SeoHead";
import { ORG } from "@/lib/seo/siteConfig";
import { KITS, TICKER, type Brand } from "./kits";
import { FAQ, MONTH, PACKAGES, PRODUCTS, SERVICES, SERVICE_GROUPS, WHY, WORDS, type ServiceGroup } from "./content";
import { PLACES } from "./deep";
import { AdsSection, KitProblems, OrderForm, PrintShop } from "./sections";
import "./next.css";

const BAGELZOP = [
  { id: "website", title: "Customer ordering page", detail: "Browse the menu, build an order, ask about catering." },
  { id: "kitchen", title: "Kitchen screen", detail: "Each order shows up as a ticket the moment it is placed." },
  { id: "dashboard", title: "Owner dashboard", detail: "Customers, catering, menus and reports in one place." },
];

const STEPS = [
  { title: "We talk", body: "A short call or a visit to your shop. You tell us what is not working." },
  { title: "You get a price", body: "A written list of what we will make, what it costs and when it is ready." },
  { title: "We build it", body: "You see the work as it takes shape and ask for changes." },
  { title: "It goes live", body: "We launch, check the phone number and forms work, and keep improving it." },
];

function track(event: string, params: Record<string, string>) {
  window.gtag?.("event", event, params);
}

function brandStyle(brand: Brand): CSSProperties {
  const fonts = {
    poster: '"Anton", "Arial Narrow", sans-serif',
    serif: '"Fraunces", Georgia, serif',
    grotesk: '"Bricolage Grotesque", sans-serif',
  };
  return {
    "--b-bg": brand.bg,
    "--b-fg": brand.fg,
    "--b-accent": brand.accent,
    "--b-font": fonts[brand.font],
  } as CSSProperties;
}

/** A TV board whose highlighted row moves, like a real screen behind a counter. */
function Board({ brand, moving }: { brand: Brand; moving: boolean }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!moving) return;
    const timer = window.setInterval(() => setActive((i) => (i + 1) % brand.rows.length), 1700);
    return () => window.clearInterval(timer);
  }, [moving, brand.rows.length]);

  return (
    <div className="nx-board" aria-hidden="true">
      <div className="nx-board-screen">
        <div className="nx-board-top">
          <b>{brand.name}</b>
          <span>{brand.boardTitle}</span>
        </div>
        <ul>
          {brand.rows.map(([name, value], index) => (
            <li key={name} className={index === active ? "is-on" : undefined}>
              <span>{name}</span>
              <i />
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="nx-board-foot" />
    </div>
  );
}

function Phone({ brand }: { brand: Brand }) {
  return (
    <div className="nx-phone-piece" aria-hidden="true">
      <div className="nx-phone-screen">
        <div className="nx-phone-bar">
          <b>{brand.name}</b>
          <span />
        </div>
        <div className="nx-phone-hero">
          <strong>{brand.siteHeadline}</strong>
          <em>{brand.siteButton}</em>
        </div>
        <div className="nx-phone-rows">
          {brand.rows.slice(0, 3).map(([name, value]) => (
            <div key={name}>
              <span>{name}</span>
              <b>{value}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Paper({ brand }: { brand: Brand }) {
  return (
    <div className={`nx-paper is-${brand.paperKind}`} aria-hidden="true">
      {brand.paperKind !== "card" ? <small>{brand.name}</small> : null}
      <strong>{brand.paperTitle}</strong>
      <ul>
        {brand.paperLines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  );
}

function ServiceCard({ to, wide, children }: { to: string; wide: boolean; children: ReactNode }) {
  const className = `nx-card-x is-plain nx-service${wide ? " is-wide" : ""}`;
  return to.startsWith("#") ? (
    <a className={className} href={to}>
      {children}
    </a>
  ) : (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
}

export default function NextHome() {
  const [params, setParams] = useSearchParams();
  const requested = params.get("for");
  const [kitId, setKitId] = useState(() => (KITS.some((k) => k.id === requested) ? requested! : KITS[0].id));
  const kit = useMemo(() => KITS.find((k) => k.id === kitId) ?? KITS[0], [kitId]);
  const [group, setGroup] = useState<ServiceGroup | "All">("All");
  const [screen, setScreen] = useState(0);
  const [moving, setMoving] = useState(true);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("nx-root");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setMoving(false);
    return () => document.documentElement.classList.remove("nx-root");
  }, []);

  // Arriving from another page with a link like /#quote: go to that part of the page.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const timer = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "instant" as ScrollBehavior }), 120);
    return () => window.clearTimeout(timer);
  }, []);

  // Count taps on the phone number and the email address, so ads can be judged by calls.
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as HTMLElement | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const place = link.closest("header") ? "header" : link.closest("footer") ? "footer" : link.closest(".nx-dock") ? "dock" : "page";
      if (href.startsWith("tel:")) track("call_click", { place });
      else if (href.startsWith("mailto:")) track("email_click", { place });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (moving) void el.play().catch(() => undefined);
    else el.pause();
  }, [moving]);

  function pickKit(id: string) {
    setKitId(id);
    setParams({ for: id }, { replace: true, preventScrollReset: true });
    track("kit_select", { kit: id });
  }

  const rows = group === "All" ? SERVICES : SERVICES.filter((item) => item.group === group);

  return (
    <div className={`nx${moving ? "" : " is-still"}`}>
      <SeoHead
        title="Adrevnview | Websites, Print, Ads and Software for Local Businesses"
        description="One shop for your website, Google listing, print, TV boards, ads, motion video and software. Based on Long Island, New York, working across the United States."
        path="/"
        keywords="local business marketing, website design Long Island, Google Business Profile, menu printing, TV menu boards, Google ads, Instagram ads, motion video, restaurant software, New York"
      />

      <header className="nx-header">
        <Link to="/" className="nx-logo">
          <img src="/logo-icon.svg" alt="" width={28} height={32} />
          {ORG.name}
        </Link>
        <nav aria-label="Main">
          <a href="#ads">Ads</a>
          <a href="#print">Print</a>
          <a href="#software">Software</a>
          <a href="#catalog">Services</a>
          <a href="#packages">Packages</a>
        </nav>
        <a className="nx-header-phone" href={`tel:${ORG.phoneTel}`}>
          {ORG.phoneDisplay}
        </a>
        <a className="nx-btn nx-btn-sign nx-btn-small" href="#quote">
          Get a quote
        </a>
      </header>

      <main>
        <section className="nx-hero">
          <video ref={video} className="nx-hero-video" src="/videos/nyc-dusk.mp4" muted loop playsInline autoPlay preload="metadata" aria-hidden="true" />
          <div className="nx-hero-shade" aria-hidden="true" />

          <div className="nx-hero-inner">
            <div className="nx-hero-copy">
              <h1>
                Everything your{" "}
                <label className="nx-pick">
                  <span className="nx-sr">Kind of business</span>
                  <span className="nx-pick-word" aria-hidden="true">
                    {kit.noun}
                  </span>
                  <select value={kit.id} onChange={(event) => pickKit(event.target.value)}>
                    {KITS.map((k) => (
                      <option key={k.id} value={k.id}>
                        {k.noun}
                      </option>
                    ))}
                  </select>
                </label>{" "}
                shows the street.
              </h1>
              <p className="nx-lede">
                The website, the TV menu board, the printed menu, the ads, the motion videos, the software at the counter. One shop
                makes all of it, so it all matches. Based on Long Island, working with businesses across the United States.
              </p>
              <div className="nx-chips nx-hero-chips" role="group" aria-label="Pick your kind of business">
                {KITS.map((k) => (
                  <button type="button" key={k.id} aria-pressed={k.id === kit.id} onClick={() => pickKit(k.id)}>
                    {k.label}
                  </button>
                ))}
              </div>
              <div className="nx-hero-actions">
                <a className="nx-btn nx-btn-sign" href="#quote" onClick={() => track("quote_start", { kit: kit.id, from: "hero" })}>
                  Get a quote for my {kit.noun}
                </a>
                <a className="nx-hero-call" href={`tel:${ORG.phoneTel}`}>
                  or call {ORG.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="nx-collage" key={kit.id} style={brandStyle(kit.brand)}>
              <Board brand={kit.brand} moving={moving} />
              <Paper brand={kit.brand} />
              <Phone brand={kit.brand} />
              <p className="nx-collage-note">
                {kit.brand.name} is a concept brand we designed to show a full {kit.noun} kit. It is not a real business.
              </p>
            </div>
          </div>

          <div className="nx-kit">
            <h2>What goes in a {kit.noun} kit</h2>
            <ul>
              {kit.gets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <button type="button" className="nx-motion" onClick={() => setMoving((m) => !m)} aria-pressed={!moving}>
            {moving ? "Pause motion" : "Play motion"}
          </button>
        </section>

        <div className="nx-ticker" aria-hidden="true">
          <div>
            {[...TICKER, ...TICKER].map((word, index) => (
              <span key={index}>{word}</span>
            ))}
          </div>
        </div>

        <KitProblems kit={kit} />

        <AdsSection kit={kit} brandStyle={brandStyle(kit.brand)} moving={moving} />

        <section className="nx-section" id="software">
          <div className="nx-head">
            <h2>Built by us. Running today.</h2>
            <p>We do not only design the front. We write the software that runs the counter, the kitchen and the front desk.</p>
          </div>
          <div className="nx-software nx-card-x is-plain">
            <div>
              <h3>Bagelzop</h3>
              <p>
                Our ordering system for bagel shops and delis. A customer orders on the website, the kitchen sees the ticket, and
                the owner sees the day.
              </p>
              <div className="nx-screens" role="group" aria-label="Bagelzop screens">
                {BAGELZOP.map((item, index) => (
                  <button type="button" key={item.id} aria-pressed={screen === index} onClick={() => setScreen(index)}>
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </button>
                ))}
              </div>
            </div>
            <figure>
              <img
                src={`/projects/bagelzop/${BAGELZOP[screen].id}.jpg`}
                alt={`Bagelzop ${BAGELZOP[screen].title.toLowerCase()}`}
                width={1200}
                height={750}
                loading="lazy"
              />
              <figcaption>A real Bagelzop screen, shown with demo data.</figcaption>
            </figure>
          </div>
          <div className="nx-cards nx-cards-4">
            {PRODUCTS.map((product) => (
              <a className="nx-card-x is-ink nx-product" key={product.name} href={product.href} target="_blank" rel="noopener noreferrer">
                <span className="nx-tag">{product.who}</span>
                <h3>{product.name}</h3>
                <ul className="nx-ticks">
                  {product.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <em>Open {product.href.replace("https://", "")}</em>
              </a>
            ))}
          </div>
        </section>

        <PrintShop />

        <section className="nx-section" id="catalog">
          <div className="nx-head">
            <h2>Everything we make</h2>
            <p>{SERVICES.length} services, in plain words. Take one or take the lot.</p>
          </div>
          <div className="nx-chips" role="group" aria-label="Filter by type">
            {(["All", ...SERVICE_GROUPS] as const).map((name) => (
              <button type="button" key={name} aria-pressed={group === name} onClick={() => setGroup(name)}>
                {name}
              </button>
            ))}
          </div>
          <div className="nx-cards nx-services">
            {rows.map((item) => (
              <ServiceCard key={item.name} to={item.to} wide={Boolean(item.wide) && group === "All"}>
                <span className="nx-tag">{item.group}</span>
                <h3>{item.name}</h3>
                <p>{item.line}</p>
                <ul className="nx-ticks">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <em>See details</em>
              </ServiceCard>
            ))}
          </div>
        </section>

        <section className="nx-band nx-band-ink" id="why">
          <div className="nx-band-inner">
            <div className="nx-head">
              <h2>Why owners pick one shop</h2>
            </div>
            <div className="nx-cards nx-cards-2">
              {WHY.map((item) => (
                <article className="nx-card-x is-glass" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="nx-band nx-band-sign" id="packages">
          <div className="nx-band-inner">
            <div className="nx-head">
              <h2>Three ways to start</h2>
              <p>
                Pick the one that fits where your business is today. Your price depends on the size of the job, and you get it in
                writing before work starts.
              </p>
            </div>
            <div className="nx-cards nx-cards-3 nx-packages">
              {PACKAGES.map((pack) => (
                <article key={pack.name} className={`nx-card-x ${pack.featured ? "is-ink is-featured" : "is-plain"}`}>
                  {pack.featured ? <span className="nx-tag is-sun">Most picked</span> : null}
                  <h3>{pack.name}</h3>
                  <p className="nx-pack-who">{pack.who}</p>
                  <p className="nx-pack-price">
                    <strong>{pack.price}</strong>
                    <span>{pack.term}</span>
                  </p>
                  <ul className="nx-ticks">
                    {pack.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a className="nx-btn nx-btn-ink" href="#quote" onClick={() => track("quote_start", { kit: kit.id, from: pack.name })}>
                    Ask about {pack.name}
                  </a>
                </article>
              ))}
            </div>
            <p className="nx-pack-note">
              Software such as Bagelzop, Matzop, Cutzop and Doczop is priced per shop. Ad budget is paid to Google or Instagram, not
              to us.
            </p>
          </div>
        </section>

        <section className="nx-section">
          <div className="nx-head">
            <h2>How a job goes</h2>
          </div>
          <ol className="nx-steps">
            {STEPS.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="nx-cards nx-cards-2 nx-fit">
            <div className="nx-card-x is-plain">
              <h3>We are a good fit if</h3>
              <ul className="nx-ticks">
                <li>You run a business that serves real customers, in one town or many.</li>
                <li>You want one team for the website, Google, print and ads.</li>
                <li>You want to see the price in writing before work starts.</li>
              </ul>
            </div>
            <div className="nx-card-x is-outline">
              <h3>We are not a fit if</h3>
              <ul className="nx-crosses">
                <li>You want a promise of first place on Google. No honest shop can give one.</li>
                <li>You want a site copied from another business.</li>
                <li>You need it live tomorrow.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="nx-section" id="month">
          <div className="nx-head">
            <h2>A month with us</h2>
            <p>What monthly work looks like once you are up and running.</p>
          </div>
          <div className="nx-cards nx-cards-4">
            {MONTH.map((week) => (
              <article className="nx-card-x is-sky" key={week.when}>
                <span className="nx-tag">{week.when}</span>
                <h3>{week.title}</h3>
                <p>{week.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="nx-section" id="words">
          <div className="nx-head">
            <h2>The jargon, in plain words</h2>
            <p>You will hear these from every agency. Here is what they mean.</p>
          </div>
          <dl className="nx-words">
            {WORDS.map((word) => (
              <div key={word.term}>
                <dt>{word.term}</dt>
                <dd>{word.meaning}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="nx-section" id="where">
          <div className="nx-head">
            <h2>Based on Long Island. Working across the United States.</h2>
            <p>
              Our shop is in {ORG.address.addressLocality}, New York, and most of our work is in New York. We also work with
              businesses in every other state. Print ships to your door, and everything else happens by phone and video call.
            </p>
          </div>
          <ul className="nx-towns">
            {PLACES.map((place) => (
              <li key={place}>{place}</li>
            ))}
          </ul>
        </section>

        <section className="nx-section" id="faq">
          <div className="nx-head">
            <h2>Questions owners ask us</h2>
          </div>
          <div className="nx-faq">
            {FAQ.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="nx-band nx-band-ink nx-quote" id="quote">
          <div className="nx-band-inner">
            <div className="nx-head">
              <h2>Build your order</h2>
              <p>
                Four quick taps and your ticket is ready. No payment, no commitment. Or call{" "}
                <a href={`tel:${ORG.phoneTel}`}>{ORG.phoneDisplay}</a>.
              </p>
            </div>
            <OrderForm kit={kit} onKit={pickKit} />
          </div>
        </section>
      </main>

      <footer className="nx-footer">
        <div>
          <strong>{ORG.name}</strong>
          <address>
            {ORG.address.streetAddress}
            <br />
            {ORG.address.addressLocality}, {ORG.address.addressRegion} {ORG.address.postalCode}
          </address>
        </div>
        <div>
          <a href={`tel:${ORG.phoneTel}`}>{ORG.phoneDisplay}</a>
          <a href={`mailto:${ORG.email}`}>{ORG.email}</a>
        </div>
        <div>
          <Link to="/services">All services</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/privacy">Privacy</Link>
        </div>
      </footer>

      <div className="nx-dock">
        <a href={`tel:${ORG.phoneTel}`}>Call</a>
        <a href="#quote">Get a quote</a>
      </div>
    </div>
  );
}
