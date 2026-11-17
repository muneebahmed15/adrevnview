import { ProductShowcase } from "./components/ProductShowcase";
import { Link } from "react-router";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import { SiteLayout } from "./components/SiteLayout";
import { SeoHead } from "@/components/seo/SeoHead";
import { CLIENTS, getClientPath } from "@/lib/content/clients";
import "./agency.css";

const services = [
  {
    title: "Creative, campaigns, and the page after the click.",
    label: "Paid advertising",
    href: "/services/ppc-advertising",
    text: "Connect your offer, ad creative, landing page, and measurement. We plan campaigns, review performance, and refine the experience around qualified inquiries.",
    details: [
      "Campaign planning and optimization",
      "Creative and landing pages",
      "Lead and conversion measurement",
    ],
  },
  {
    title: "Give people a reason to follow, watch, and act.",
    label: "Social media & video clipping",
    href: "/services/social-media-marketing",
    text: "Turn your expertise and long-form videos into a consistent presence. Content planning, branded posts, short-form editing, captions, and channel-ready clips.",
    details: [
      "Social content and publishing plans",
      "YouTube, podcast, and stream clips",
      "Hooks, captions, and vertical edits",
    ],
  },
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
  const projects = ["chocolate-connects", "addys-pizzeria", "ecmmaandfitness", "tagizo"]
    .map((slug) => CLIENTS.find((client) => client.slug === slug))
    .filter((client) => client !== undefined);
  const featured = projects[0];

  return (
    <SiteLayout fx={false} mainClassName="agency">
      <SeoHead
        title="Adrevnview — Web Design, SEO & Paid Ads | Long Island"
        description="Adrevnview builds custom websites and runs SEO, paid ads, and social campaigns. See live client work and our in-house Bagelzop ordering platform."
        path="/"
      />
      <section className="agency-masthead">
        <div className="agency-wrap agency-masthead-grid">
          <div>
            <p className="agency-eyebrow">Long Island digital agency</p>
            <h1>Websites built<br /> for <span>business.</span></h1>
            <p className="agency-masthead-copy">
              We design and build websites, then help people find them with
              SEO, paid ads, and social content.
            </p>
            <div className="agency-masthead-actions">
              <Link className="agency-button" to="/contact">
                Start a project <ArrowUpRight size={18} />
              </Link>
              <a className="agency-text-link" href="#selected-work">
                See our work <ArrowRight size={18} />
              </a>
            </div>
          </div>
          {featured && (
            <Link to={getClientPath(featured.slug)} className="agency-feature">
              <div className="agency-feature-bar">
                <span>Featured project</span>
                <ArrowUpRight size={19} />
              </div>
              <img src={featured.image} alt="Chocolate Connects online storefront" width="1440" height="950" fetchPriority="high" />
              <div className="agency-feature-caption">
                <strong>{featured.name}</strong>
                <span>Website & online ordering</span>
              </div>
            </Link>
          )}
        </div>
      </section>
      <section id="selected-work" className="agency-section agency-wrap">
        <div className="agency-heading">
          <h2>Selected projects</h2>
          <Link className="agency-text-link" to="/work">
            View all work <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="agency-projects">
          {projects.map((project) => (
            <article className="agency-project" key={project.slug}>
              <Link to={getClientPath(project.slug)} className="agency-project-preview" aria-label={`Read the ${project.name} case study`}>
                <img src={project.image} alt={`${project.name} website screenshot`} width="1440" height="950" loading="lazy" />
              </Link>
              <div className="agency-project-caption">
                <div>
                  <p className="agency-eyebrow">{project.tag}</p>
                  <h3><Link to={getClientPath(project.slug)}>{project.name}</Link></h3>
                  <p>{project.shortDescription}</p>
                  <div className="agency-project-links">
                    <Link className="agency-text-link" to={getClientPath(project.slug)}>Case study <ArrowRight size={15} /></Link>
                    <a className="agency-text-link" href={project.url} target="_blank" rel="noopener noreferrer">Live site <ArrowUpRight size={15} /></a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <ProductShowcase />
      <section id="capabilities" className="agency-section agency-wrap">
        <div className="agency-heading">
          <div>
            <p className="agency-eyebrow">How we can help</p>
            <h2>Design, search & advertising</h2>
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
