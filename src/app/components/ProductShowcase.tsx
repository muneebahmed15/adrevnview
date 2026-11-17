import { useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const steps = [
  {
    title: "Customer storefront",
    image: "website",
    detail: "Browse the menu, customize an order, and explore catering.",
  },
  {
    title: "Kitchen & orders",
    image: "kitchen",
    detail: "See incoming orders and manage tickets from the kitchen board.",
  },
  {
    title: "Store operations",
    image: "dashboard",
    detail: "Manage customers, catering, menus, and reports in one workspace.",
  },
];

export function ProductShowcase() {
  const [step, setStep] = useState(0);
  const current = steps[step];
  const screenshot = `/projects/bagelzop/${current.image}.jpg`;

  return (
    <section
      id="in-house"
      className="product-showcase agency-wrap agency-section"
    >
      <div className="agency-heading">
        <div>
          <p className="agency-eyebrow">Built in-house</p>
          <h2>From storefront to kitchen</h2>
        </div>
      </div>
      <div className="product-stage">
        <div className="product-story">
          <h3 className="product-brand">
            <img src="/projects/bagelzop/logo.svg" alt="" width="48" height="48" />
            Bagelzop
          </h3>
          <p>Our ordering platform for bagel shops and breakfast delis brings the menu, kitchen, catering, and store dashboard together.</p>
          <div className="product-steps">
            {steps.map((item, index) => (
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
            to="/contact?project=Bagelzop"
          >
            Discuss a system for your business <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="bagelzop-media">
          <figure>
            <a
              href={screenshot}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open full-size Bagelzop ${current.title} screenshot`}
            >
              <img
                src={screenshot}
                alt={`Bagelzop ${current.title} showing the Island Bagel Bar demo workspace`}
                width="1200"
                height="750"
                loading="lazy"
              />
            </a>
            <figcaption aria-live="polite">
              <strong>{current.title}</strong>
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
      </div>
    </section>
  );
}
