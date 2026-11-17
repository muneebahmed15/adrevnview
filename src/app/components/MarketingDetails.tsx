import { useState } from "react";

const reports = {
  "seo-services": [
    [
      "Search visibility",
      "Impressions, clicks, queries, and landing pages from Google Search Console. Compare equivalent date ranges and separate branded searches from discovery.",
    ],
    [
      "Qualified traffic",
      "Organic visits and engagement on your important service pages. Review which pages lead people toward an inquiry.",
    ],
    [
      "Business outcomes",
      "Track submitted inquiries, calls, and booked appointments where those systems are connected. Relate the work to the outcomes your team can verify.",
    ],
  ],
  "ppc-advertising": [
    [
      "Spend & efficiency",
      "Review spend, cost per click, and cost per qualified inquiry by campaign. Keep the attribution window and reporting period visible.",
    ],
    [
      "Creative & landing pages",
      "Compare offers, audiences, and creative variations. Use landing-page behavior to identify where people drop out.",
    ],
    [
      "Lead quality",
      "Review the inquiries with your team and connect qualified leads to appointments or sales when your CRM is ready.",
    ],
  ],
  "social-media-marketing": [
    [
      "Content people watch",
      "Track views, retention, and watch time. Identify the topics and opening moments that hold attention.",
    ],
    [
      "Audience response",
      "Review saves, shares, comments, and profile visits. Connect the response to the content format and topic.",
    ],
    [
      "Next steps",
      "Measure link visits and attributable inquiries. Use the findings to plan the next batch of content.",
    ],
  ],
};

export function MarketingDetails({ slug }: { slug: string }) {
  const [active, setActive] = useState(0);
  const report = reports[slug as keyof typeof reports];
  if (!report) return null;
  return (
    <section className="marketing-detail">
      {slug === "social-media-marketing" && (
        <div className="clip-detail">
          <p className="agency-eyebrow">Clipping & repurposing</p>
          <h2>One recording. More moments worth watching.</h2>
          <p>
            Bring your YouTube videos, podcasts, interviews, or streams. We
            identify useful moments, shape the opening hook, edit vertical
            versions, add readable captions, and prepare exports for the
            channels you use.
          </p>
          <div className="clip-flow">
            <span>Source recording</span>
            <span>Select the moment</span>
            <span>Edit & caption</span>
            <span>Review & publish</span>
          </div>
          <p>
            Each batch is scoped around source length, clip count, formats,
            revisions, and your publishing schedule.
          </p>
        </div>
      )}
      {slug === "ppc-advertising" && (
        <div className="clip-detail">
          <p className="agency-eyebrow">Built around your business</p>
          <h2>From the ad to the appointment.</h2>
          <p>
            We work with service businesses, med spas, wellness businesses, and
            peptide brands on campaign planning, creative, and landing pages.
            Product eligibility, channel requirements, and approved claims are
            reviewed before launch. Campaign scope depends on the offer and the
            markets you serve.
          </p>
        </div>
      )}
      <p className="agency-eyebrow">What your reporting will cover</p>
      <h2>
        See what changed.
        <br />
        Understand the next move.
      </h2>
      <p className="report-context">
        A reporting framework for your engagement. Your connected accounts
        supply the figures and reporting periods.
      </p>
      <div className="report-tabs" aria-label="Reporting topics">
        {report.map(([label], index) => (
          <button
            type="button"
            key={label}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="report-explainer" aria-live="polite">
        <h3>{report[active][0]}</h3>
        <p>{report[active][1]}</p>
      </div>
    </section>
  );
}
