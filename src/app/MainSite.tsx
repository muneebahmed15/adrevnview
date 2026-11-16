import { Link } from "react-router";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import { SiteLayout } from "./components/SiteLayout";
import { SeoHead } from "@/components/seo/SeoHead";
import { CLIENTS, getClientPath } from "@/lib/content/clients";
import "./agency.css";

const services = [
  {
    title: "A website that earns the next conversation.",
    label: "Web design & development",
    href: "/services/custom-web-design",
    text: "Clear messaging, considered design, and a fast, responsive experience. From your first landing page to a custom business platform.",
    details: [
      "Strategy and page structure",
      "Custom design and development",
      "Mobile and launch testing",
    ],
  },
  {
    title: "Help the right people find your business.",
    label: "SEO & search visibility",
    href: "/services/seo-services",
    text: "Connect the questions your customers ask with pages that answer them. Build a practical plan for technical SEO, useful content, and local discovery.",
    details: [
      "Technical and content audit",
      "Service and location content",
      "Measurement and ongoing improvements",
    ],
  },
  {
    title: "Make every touchpoint feel like you.",
    label: "Branding & print",
    href: "/services/printing-services",
    text: "Carry your identity from your website into business cards, menus, and signage. Give customers a consistent experience wherever they meet you.",
    details: [
      "Brand identity and guidelines",
      "Digital and print design",
      "Production and delivery planning",
    ],
  },
];

export default function MainSite() {
  const projects = CLIENTS.filter((client) =>
    ["tagizo", "axstart", "crocherish"].includes(client.slug),
  );
  return (
    <SiteLayout fx={false} mainClassName="agency">
      <SeoHead
        title="Adrevnview — Websites, SEO & Brand Design | Long Island"
        description="Explore Adrevnview’s website and product work. Custom web design, development, SEO, and branding from Long Island, New York."
        path="/"
      />
      <section className="agency-hero agency-wrap">
        <p className="agency-eyebrow">
          Independent thinking. Connected digital experiences.
        </p>
        <h1>
          Your next chapter.
          <br />
          <span>Built for the web.</span>
        </h1>
        <div className="agency-hero-bottom">
          <p>
            We bring websites, search strategy, and brand design together to
            help ambitious businesses get discovered and turn interest into
            conversations.
          </p>
          <div className="agency-actions">
            <Link className="agency-button" to="/contact">
              Let’s talk about your project <ArrowUpRight size={18} />
            </Link>
            <a className="agency-text-link" href="#selected-work">
              Explore our work <ArrowRight size={17} />
            </a>
          </div>
        </div>
        <div className="agency-location">
          Adrevnview · Long Island, New York{" "}
          <span>Websites · SEO · Branding</span>
        </div>
      </section>
      <nav
        className="agency-jump agency-wrap"
        aria-label="Explore our capabilities"
      >
        <a href="#selected-work">See what we build</a>
        <a href="#capabilities">Find your service</a>
        <a href="#approach">Understand our approach</a>
      </nav>
      <section id="selected-work" className="agency-section agency-wrap">
        <div className="agency-heading">
          <div>
            <p className="agency-eyebrow">Selected work</p>
            <h2>Ideas made tangible.</h2>
          </div>
          <Link className="agency-text-link" to="/work">
            All projects <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="agency-projects">
          {projects.map((project, i) => (
            <Link
              to={getClientPath(project.slug)}
              className={`agency-project project-${i}`}
              key={project.slug}
            >
              <div className="agency-project-art">
                <img
                  src={`/project-previews/${project.slug}.png`}
                  alt={`${project.name} website preview`}
                  width="1440"
                  height="1000"
                  loading="lazy"
                />
                <span>{project.tag}</span>
                <strong>{project.name}</strong>
                <div className="agency-project-services">
                  {project.services.slice(0, 3).map((service) => (
                    <span key={service}>{service}</span>
                  ))}
                </div>
              </div>
              <div className="agency-project-caption">
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.shortDescription}</p>
                </div>
                <ArrowUpRight size={22} />
              </div>
            </Link>
          ))}
        </div>
        <p className="agency-note">
          Explore each project for its brief, delivery scope, and a link to the
          live website.
        </p>
      </section>
      <section id="capabilities" className="agency-section agency-wrap">
        <div className="agency-heading">
          <div>
            <p className="agency-eyebrow">How we can help</p>
            <h2>
              Build it well.
              <br />
              Help it get found.
            </h2>
          </div>
          <p>
            One connected approach to how your business looks, works, and
            reaches people.
          </p>
        </div>
        <div>
          {services.map((service) => (
            <article className="agency-service" key={service.label}>
              <p className="agency-eyebrow">{service.label}</p>
              <div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <Link className="agency-text-link" to={service.href}>
                  Explore the service <ArrowUpRight size={17} />
                </Link>
              </div>
              <ul>
                {service.details.map((detail) => (
                  <li key={detail}>
                    <Check size={16} />
                    {detail}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="agency-search">
        <div className="agency-wrap agency-search-inner">
          <div>
            <p className="agency-eyebrow">Start with a clearer picture</p>
            <h2>
              What is holding
              <br />
              your website back?
            </h2>
            <p>
              Use our website audit to explore technical SEO and content
              signals. Then talk through the findings with us and decide which
              improvements matter for your business.
            </p>
            <Link className="agency-button" to="/seo-report">
              Explore the website audit <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="agency-audit-list">
            {[
              "Can search engines access your pages?",
              "Does your content answer customer questions?",
              "Is your business information clear?",
              "What should you improve first?",
            ].map((item) => (
              <p key={item}>
                <Check size={20} />
                {item}
              </p>
            ))}
            <small>
              Audit findings guide a review. Search performance is measured over
              time.
            </small>
          </div>
        </div>
      </section>
      <section id="approach" className="agency-section agency-wrap">
        <div className="agency-heading">
          <div>
            <p className="agency-eyebrow">Working together</p>
            <h2>Clarity at every step.</h2>
          </div>
          <p>
            You should understand what we are building, why it matters, and what
            comes next.
          </p>
        </div>
        <div className="agency-process">
          {[
            [
              "Discover",
              "We learn about your customers, goals, and current website. Together, we agree on the scope and priorities.",
            ],
            [
              "Design & build",
              "Review the direction, copy, and page designs as the site takes shape. We develop the experience around your business.",
            ],
            [
              "Launch & improve",
              "Test the site, check the contact flow, and prepare search essentials. Use agreed measurements to guide the next improvements.",
            ],
          ].map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="agency-wrap agency-cta">
        <p className="agency-eyebrow">Let’s build your next chapter</p>
        <h2>
          Bring the ambition.
          <br />
          We’ll bring the craft.
        </h2>
        <p>Tell us what your business needs to do next.</p>
        <Link className="agency-button" to="/contact">
          Discuss your project <ArrowUpRight size={18} />
        </Link>
        <Link className="agency-text-link" to="/about">
          Meet Adrevnview <ArrowRight size={17} />
        </Link>
      </section>
    </SiteLayout>
  );
}
