import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteLayout } from "./components/SiteLayout";
import { SeoHead } from "@/components/seo/SeoHead";

export default function About() {
  return (
    <SiteLayout mainClassName="px-6 py-12">
      <SeoHead
        title="About Adrevnview LLC — Design, Development & SEO"
        description="Meet Adrevnview’s approach to building connected websites, brands, and search strategies. Explore our work and how we collaborate remotely."
        path="/about"
      />
      <div className="max-w-6xl mx-auto">
        <p className="agency-eyebrow">Adrevnview LLC</p>
        <h1>
          Good design opens doors.
          <br />
          Good execution keeps them open.
        </h1>
        <div className="about-story">
          <h2>A more connected way to build your business online.</h2>
          <p>
            We bring design, development, and search strategy into the same
            conversation. Your website should explain what makes your business
            valuable, help people find what they need, and give them a clear way
            to act.
          </p>
        </div>
        <div className="agency-process">
          <article>
            <h3>Start with your customers</h3>
            <p>
              We shape the structure and message around the people you want to
              reach and the decisions they need to make.
            </p>
          </article>
          <article>
            <h3>Make the work visible</h3>
            <p>
              Review the direction and designs as your project develops.
              Understand the choices behind the experience.
            </p>
          </article>
          <article>
            <h3>Build for what comes next</h3>
            <p>
              Plan for mobile use, search discovery, and the content your
              business will need as it grows.
            </p>
          </article>
        </div>
        <div className="about-story">
          <h2>From a business website to a digital product.</h2>
          <div>
            <p>
              Our portfolio spans service businesses, online stores, and
              software platforms. Explore the project briefs and live websites
              to see the scope of the work.
            </p>
            <Link className="agency-text-link mt-6" to="/work">
              Explore our projects <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <div className="agency-cta">
          <p className="agency-eyebrow">Working together, wherever you are</p>
          <h2>Tell us where you want to go.</h2>
          <p>
            We collaborate remotely on website, SEO, branding, and print
            projects.
          </p>
          <Link className="agency-button" to="/contact">
            Start a conversation <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
