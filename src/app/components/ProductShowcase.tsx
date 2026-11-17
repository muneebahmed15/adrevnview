import { useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight, Check, ArrowRight } from "lucide-react";

const products = [
  {
    name: "Matzop",
    label: "Gym & academy management",
    intro:
      "From the first inquiry to the next belt. A connected workspace for the people and operations behind an academy.",
    steps: [
      {
        title: "Welcome a new member",
        screen: "Members",
        detail:
          "Member profiles, family connections, waivers, and membership details in one place.",
        rows: [
          "Member profile",
          "Family account",
          "Waiver status",
          "Membership plan",
        ],
      },
      {
        title: "Run the front desk",
        screen: "Today at the academy",
        detail:
          "Connect the class schedule with check-ins and attendance so staff can see who is on the mat.",
        rows: [
          "Class schedule",
          "Member check-in",
          "Attendance history",
          "Front-desk kiosk",
        ],
      },
      {
        title: "Support the next milestone",
        screen: "Training & progression",
        detail:
          "Keep curriculum, class notes, and belt progression connected to the member experience.",
        rows: [
          "Belt progression",
          "Class notes",
          "Training curriculum",
          "Member history",
        ],
      },
    ],
  },
  {
    name: "Bagelzop",
    label: "Ordering, kitchen & catering",
    intro:
      "Our in-house platform for bagel stores and breakfast delis. A branded storefront, customizable ordering, kitchen workflow, catering, and an owner dashboard in one product.",
    steps: [
      {
        title: "Start with the order",
        screen: "Customer storefront",
        detail:
          "Give customers clear paths through the menu, cart, and catering options.",
        rows: [
          "Browse the menu",
          "Build a dozen",
          "Review the cart",
          "Catering request",
        ],
      },
      {
        title: "Move into the kitchen",
        screen: "Kitchen & orders",
        detail:
          "Bring order information into the operational workspace for the team preparing it.",
        rows: [
          "Incoming orders",
          "Kitchen board",
          "Order details",
          "Ticket management",
        ],
      },
      {
        title: "Manage the business",
        screen: "Store operations",
        detail:
          "Organize customers, catering, menus, and reports from the same product.",
        rows: [
          "Customer directory",
          "Catering orders",
          "Menu management",
          "Store reports",
        ],
      },
    ],
  },
];

export function ProductShowcase() {
  const [selected, setSelected] = useState(0);
  const [step, setStep] = useState(0);
  const product = products[selected];
  const current = product.steps[step];
  return (
    <section
      id="in-house"
      className="product-showcase agency-wrap agency-section"
    >
      <div className="agency-heading">
        <div>
          <p className="agency-eyebrow">Built in-house at Adrevnview</p>
          <h2>
            We build the website.
            <br />
            And what comes after.
          </h2>
        </div>
        <p>
          Explore two products that demonstrate our approach to customer
          experiences and business operations.
        </p>
      </div>
      <div className="product-selector" aria-label="Choose a product">
        {products.map((item, index) => (
          <button
            type="button"
            aria-pressed={selected === index}
            key={item.name}
            onClick={() => {
              setSelected(index);
              setStep(0);
            }}
          >
            {item.name === "Bagelzop" && (
              <img
                className="bagelzop-selector-logo"
                src="/projects/bagelzop/logo.svg"
                alt=""
                width="40"
                height="40"
              />
            )}
            {item.name}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      <div className="product-stage">
        <div className="product-story">
          <p className="agency-eyebrow">Interactive product overview</p>
          <h3 className="product-brand">
            {selected === 1 && (
              <img
                src="/projects/bagelzop/logo.svg"
                alt="Bagelzop logo"
                width="48"
                height="48"
              />
            )}
            {product.name}
          </h3>
          <p>{product.intro}</p>
          <div className="product-steps">
            {product.steps.map((item, index) => (
              <button
                key={item.title}
                type="button"
                aria-pressed={step === index}
                onClick={() => setStep(index)}
              >
                {item.title}
                <ArrowRight size={18} />
              </button>
            ))}
          </div>
          <Link
            className="agency-text-link"
            to={`/contact?project=${encodeURIComponent(product.name)}`}
          >
            Discuss a system for your business <ArrowUpRight size={18} />
          </Link>
        </div>
        {selected === 1 ? (
          <div className="bagelzop-media">
            <figure>
              <a
                href={`/projects/bagelzop/${["website", "kitchen", "dashboard"][step]}.jpg`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open full-size Bagelzop ${current.screen} screenshot`}
              >
                <img
                  src={`/projects/bagelzop/${["website", "kitchen", "dashboard"][step]}.jpg`}
                  alt={`Bagelzop ${current.screen} showing the Island Bagel Bar demo workspace`}
                  width="1200"
                  height="750"
                  loading="lazy"
                />
              </a>
              <figcaption>
                <strong>{current.screen}</strong>
                <p>{current.detail}</p>
                <span>
                  Actual product screen · Demo workspace and sample figures
                </span>
              </figcaption>
            </figure>
            <details
              className="bagelzop-video"
              onToggle={(event) => {
                if (!event.currentTarget.open)
                  event.currentTarget.querySelector("video")?.pause();
              }}
            >
              <summary>
                Watch the product walkthrough <span>20 seconds</span>
              </summary>
              <video
                controls
                playsInline
                preload="none"
                poster="/projects/bagelzop/website.jpg"
                aria-label="Bagelzop product walkthrough using demo data"
              >
                <source src="/projects/bagelzop/demo.mp4" type="video/mp4" />
                <a href="/projects/bagelzop/demo.mp4">
                  Open the Bagelzop demo video
                </a>
              </video>
              <p>
                A silent screen recording of the demo storefront, order
                customization, and operations workspace. Sample business data is
                shown.
              </p>
            </details>
          </div>
        ) : (
          <div className="product-screen" aria-live="polite">
            <div className="product-screen-bar">
              <strong>{product.name}</strong>
              <span>Workflow preview</span>
            </div>
            <div className="product-screen-body">
              <p className="agency-eyebrow">{product.label}</p>
              <h3>{current.screen}</h3>
              <p>{current.detail}</p>
              <div className="product-rows">
                {current.rows.map((row) => (
                  <div key={row}>
                    <span className="product-icon">
                      <Check size={17} />
                    </span>
                    {row}
                    <ArrowUpRight size={16} />
                  </div>
                ))}
              </div>
            </div>
            <p className="product-caption">
              Illustrated walkthrough of the product’s scope. Sample interface
              for this presentation.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
