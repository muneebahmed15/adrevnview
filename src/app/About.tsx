import { Link } from "react-router";
import { SiteLayout } from "@/app/components/SiteLayout";
import { SeoHead } from "@/components/seo/SeoHead";
import { ORG } from "@/lib/seo/siteConfig";

const MAKES = [
  "Websites and online stores",
  "Google listing and search work",
  "Setup so AI tools read your business correctly",
  "Google, Facebook and Instagram ads",
  "Social posts, short videos and motion videos",
  "Menus, business cards, flyers, banners and letterheads",
  "TV menu boards",
  "Software for restaurants, gyms, barbershops and clinics",
];

const WAYS = [
  { title: "One shop", body: "The same people make your website, your menu and your ads. So the colors, the prices and the name match everywhere." },
  { title: "Plain words", body: "You get a written list of what we will make, what it costs and when it is ready. No jargon." },
  { title: "You own it", body: "Your domain name, your words and your photos stay yours. The ad account is in your name." },
  { title: "No promises we can't keep", body: "Nobody can promise first place on Google. We fix what holds you back and show you the numbers each month." },
];

export default function About() {
  return (
    <SiteLayout mainClassName="px-6">
      <SeoHead
        title="About Adrevnview | One Shop for Local Businesses"
        description="Adrevnview makes websites, print, ads, motion video and software for local businesses. Based in Garden City, Long Island, New York, working across the United States."
        path="/about"
      />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">One shop for everything your business shows the street.</h1>
        <p data-geo-chunk="summary" className="text-foreground/80 text-lg leading-relaxed mb-12 max-w-3xl">
          Adrevnview is in Garden City, on Long Island, New York. We work with restaurants, bagel shops, dessert shops, gyms, barbershops, clinics and stores. Most of our work is in New York, and we work with businesses across the United States.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-xl border border-border bg-card p-7">
            <h2 className="text-2xl font-bold mb-4">What we make</h2>
            <ul className="space-y-2 text-foreground/80 leading-relaxed list-disc pl-5">
              {MAKES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link to="/services" className="inline-block mt-5 text-sky-400 font-bold">
              See all services
            </Link>
          </div>
          <div className="rounded-xl border border-border bg-card p-7">
            <h2 className="text-2xl font-bold mb-4">Software we built</h2>
            <ul className="space-y-2 text-foreground/80 leading-relaxed">
              <li><a className="text-sky-400 font-bold" href="https://matzop.com">Matzop</a>: gyms and academies</li>
              <li><a className="text-sky-400 font-bold" href="https://cutzop.com">Cutzop</a>: barbershops and salons</li>
              <li><a className="text-sky-400 font-bold" href="https://doczop.com">Doczop</a>: clinics</li>
              <li><a className="text-sky-400 font-bold" href="https://taxzop.com">Taxzop</a>: small US businesses</li>
              <li><strong>Bagelzop</strong>: bagel shops</li>
            </ul>
            <Link to="/#software" className="inline-block mt-5 text-sky-400 font-bold">
              See the software
            </Link>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">How we work</h2>
        <div className="grid sm:grid-cols-2 gap-5 mb-12">
          {WAYS.map((way) => (
            <div key={way.title} className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-xl font-bold mb-2">{way.title}</h3>
              <p className="text-foreground/80 leading-relaxed">{way.body}</p>
            </div>
          ))}
        </div>

        <p className="text-foreground/80">
          Call <a className="text-sky-400 font-bold" href={`tel:${ORG.phoneTel}`}>{ORG.phoneDisplay}</a> or email{" "}
          <a className="text-sky-400 font-bold" href={`mailto:${ORG.email}`}>{ORG.email}</a>.
        </p>
      </div>
    </SiteLayout>
  );
}
