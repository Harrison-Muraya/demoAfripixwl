import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/RequestDialog";
import { BrowserFrame } from "@/components/BrowserFrame";
import { IndustryCard } from "@/components/IndustryCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { industries, demos, demosFor, featuredDemos } from "@/data/demos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "See What Your Business Could Look Like Online — Afripixel" },
      {
        name: "description",
        content:
          "Explore professionally designed websites and digital platforms built for real business needs. Find a demo in your industry and see what Afripixel can build for you.",
      },
      {
        property: "og:title",
        content: "See What Your Business Could Look Like Online — Afripixel",
      },
      {
        property: "og:description",
        content:
          "A premium digital showroom of live Afripixel projects across education, healthcare, real estate, travel, construction and more.",
      },
    ],
  }),
  component: Index,
});

const capabilities = [
  {
    title: "Business Websites",
    body: "Build credibility and generate enquiries with a professional online presence.",
  },
  {
    title: "E-commerce Websites",
    body: "Turn your website into a 24/7 sales channel customers can buy from anytime.",
  },
  {
    title: "Booking & Reservation Systems",
    body: "Let customers book appointments, rooms or services without calling.",
  },
  {
    title: "Business Management Systems",
    body: "Digitise processes, manage records and reduce manual work.",
  },
  {
    title: "Real Estate Platforms",
    body: "Showcase properties and capture qualified leads with listing-ready pages.",
  },
  {
    title: "Custom Web Applications",
    body: "Build the exact digital solution your business needs, from the ground up.",
  },
];

const principles = [
  "Mobile-first design",
  "Conversion-focused layouts",
  "SEO-ready structure",
  "WhatsApp & lead integration",
  "Fast-loading experiences",
  "Analytics & tracking",
  "Payment integrations",
  "Easy content management",
];

const process = [
  {
    no: "01",
    title: "Tell Us What You Need",
    body: "Share your business, goals and requirements with our team.",
  },
  {
    no: "02",
    title: "We Design the Experience",
    body: "Our team develops a website built around your customers and objectives.",
  },
  {
    no: "03",
    title: "Review & Refine",
    body: "You provide feedback and we refine the website until it's right.",
  },
  {
    no: "04",
    title: "Launch & Grow",
    body: "Your website goes live and can be supported with ongoing digital marketing.",
  },
];

const assessmentBenefits = [
  "What your website should include",
  "How you can generate more enquiries",
  "Which digital tools could improve your operations",
  "Opportunities you're currently missing",
];

const faqs = [
  {
    q: "How much does a website cost?",
    a: "Cost depends on scope — a simple business website is priced differently from a booking system or custom application. Browse a demo close to what you need, then request a quote tailored to your project.",
  },
  {
    q: "How long does development take?",
    a: "Timelines depend on complexity. We agree a schedule upfront during your project brief so you know exactly when to expect launch.",
  },
  {
    q: "Can you integrate M-Pesa?",
    a: "Yes. Payment integrations, including M-Pesa, can be added depending on your business needs.",
  },
  {
    q: "Can my website connect to WhatsApp?",
    a: "Yes. WhatsApp and lead integrations are one of our standard capabilities across projects.",
  },
  {
    q: "Can you manage the website after launch?",
    a: "Yes. We can continue supporting your site after launch, alongside digital marketing services.",
  },
  {
    q: "Do you provide SEO?",
    a: "Yes. Every site we build is SEO-ready from the start, with further optimisation available.",
  },
  {
    q: "Can you build custom systems?",
    a: "Yes. Beyond websites, we build booking systems, business management tools and custom web applications.",
  },
  {
    q: "Can you redesign an existing website?",
    a: "Yes. We can redesign or migrate an existing site into a modern, conversion-focused experience.",
  },
];

function Index() {
  return (
    <>
      {/* 1. Hero */}
      <section className="hero-gradient relative border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:py-28 lg:px-8">
          <div className="reveal">
            <span className="eyebrow">Afripixel Demo Centre</span>
            <h1 className="mt-5 text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-[3.4rem]">
              See what your <span className="text-primary">business</span> could look like online.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Explore professionally designed websites and digital platforms built for real business
              needs — interact with the live demonstrations before starting your own.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button variant="hero" size="xl" asChild>
                <Link to="/demonstrations">
                  Explore Our Demos <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <RequestDialog>
                <Button variant="outline" size="xl">
                  Start Your Website
                </Button>
              </RequestDialog>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {demos.length}+ live demonstrations • {industries.length}+ industries • Designed for
              conversion
            </p>

            <dl className="mt-12 grid max-w-md grid-cols-3 divide-x divide-border border-t border-border pt-6">
              <div className="pr-4">
                <dt className="text-2xl font-semibold font-display">{demos.length}+</dt>
                <dd className="mt-1 text-xs text-muted-foreground">Live demonstrations</dd>
              </div>
              <div className="px-4">
                <dt className="text-2xl font-semibold font-display">{industries.length}+</dt>
                <dd className="mt-1 text-xs text-muted-foreground">Industries served</dd>
              </div>
              <div className="pl-4">
                <dt className="text-2xl font-semibold font-display">100%</dt>
                <dd className="mt-1 text-xs text-muted-foreground">Real, interactive builds</dd>
              </div>
            </dl>
          </div>

          <BrowserFrame
            url="powel.afripixelprojects.com"
            src="https://powel.afripixelprojects.com"
            title="Powel-elss Enterprises website preview"
            height="26rem"
            footer={
              <p className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
                A live client project — scroll and click through it exactly as their customers do.
              </p>
            }
          />
        </div>
      </section>

      {/* 2. Industry selector — a directory, not a card grid */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <span className="eyebrow">Find a website for your industry</span>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold sm:text-4xl">
            See what works for businesses like yours — not just any website.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            They need to see what we can build for a business like theirs. Choose your industry to
            find out.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <IndustryCard
                key={industry.slug}
                industry={industry}
                index={i}
                count={demosFor(industry.slug).length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured projects — the signature browser-frame proof, repeated deliberately */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <span className="eyebrow">Featured projects</span>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold sm:text-4xl">
            A few of our strongest projects.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Each one solving a real business problem — not just a design exercise. These are live
            sites, not screenshots.
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {featuredDemos().map((demo) => (
              <div key={demo.slug}>
                <BrowserFrame
                  url={demo.demoUrl.replace(/^https?:\/\//, "")}
                  src={demo.demoUrl}
                  title={demo.name}
                  height="16rem"
                  deviceToggle
                />
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      {demo.industry}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold">{demo.name}</h3>
                    <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">
                      {demo.description}
                    </p>
                  </div>
                  <Link
                    to="/demo/$slug"
                    params={{ slug: demo.slug }}
                    className="mt-1 inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    View demo <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. What can we build for you — a spec sheet, not an icon grid */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <span className="eyebrow">More than just a website</span>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold sm:text-4xl">
            What can we build for you?
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            The demos are proof of what&apos;s possible — here&apos;s the full range of digital
            solutions behind them.
          </p>

          <div className="mt-12 grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.title} className="border-r border-b border-border p-7">
                <h3 className="text-base font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Button variant="hero" size="lg" asChild>
              <Link to="/industries">Find Your Solution</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 5. Why these websites are different */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <span className="eyebrow">Our philosophy</span>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold sm:text-4xl">
            We don&apos;t build websites just to look good.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            We build them to help businesses work as marketing assets — not just brochures. That's a
            different proposition from a freelancer whose pitch is simply "I build beautiful
            websites."
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-xl font-semibold sm:text-2xl">
            <span>Attract</span>
            <ArrowRight className="h-5 w-5 text-primary" />
            <span>Engage</span>
            <ArrowRight className="h-5 w-5 text-primary" />
            <span>Convert</span>
            <ArrowRight className="h-5 w-5 text-primary" />
            <span>Grow</span>
          </div>

          <ul className="mt-12 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm font-medium">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Social proof / credibility */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <span className="eyebrow">Trusted to build digital experiences</span>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Digital marketing and development under one roof — so your website isn&apos;t just
                built well, it&apos;s built to be found and to convert.
              </p>
            </div>
            <dl className="grid grid-cols-3 divide-x divide-border">
              <div className="px-4 first:pl-0">
                <dt className="text-3xl font-semibold font-display">{demos.length}+</dt>
                <dd className="mt-1 text-xs text-muted-foreground">Live projects</dd>
              </div>
              <div className="px-4">
                <dt className="text-3xl font-semibold font-display">{industries.length}+</dt>
                <dd className="mt-1 text-xs text-muted-foreground">Industries</dd>
              </div>
              <div className="px-4">
                <dt className="text-3xl font-semibold font-display">100%</dt>
                <dd className="mt-1 text-xs text-muted-foreground">Interactive demos</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* 7. How it works — from idea to launch (a real sequence) */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <span className="eyebrow">From idea to launch</span>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold sm:text-4xl">
            A simple, transparent process.
          </h2>

          <div className="mt-14 grid gap-x-8 gap-y-10 lg:grid-cols-4">
            {process.map((s, i) => (
              <div key={s.no} className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/30 font-display text-sm font-semibold text-primary">
                    {s.no}
                  </span>
                  {i < process.length - 1 ? (
                    <span className="hidden h-px flex-1 bg-border lg:block" />
                  ) : null}
                </div>
                <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <RequestDialog>
              <Button variant="hero" size="lg">
                Start Your Project
              </Button>
            </RequestDialog>
          </div>
        </div>
      </section>

      {/* 8. Full demo centre teaser */}
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold">Explore all our demos</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Browse all {demos.length}+ live projects across every industry we&apos;ve worked in,
              filterable by category.
            </p>
          </div>
          <Button variant="outline" size="xl" asChild>
            <Link to="/demonstrations">
              View the Full Demo Centre <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* 9. Business assessment / lead magnet */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <span className="eyebrow">Not sure what your business needs?</span>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Get a free digital assessment.
              </h2>
              <p className="mt-4 text-muted-foreground">Discover:</p>
              <ul className="mt-5 space-y-3">
                {assessmentBenefits.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-sm font-medium">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {b}
                  </li>
                ))}
              </ul>
              <Button variant="hero" size="xl" className="mt-8" asChild>
                <Link to="/assessment">Get My Free Business Assessment</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 divide-x divide-border border border-border">
              <div className="p-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase">Before</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                  <li>Outdated website</li>
                  <li>Manual processes</li>
                  <li>Poor online presence</li>
                  <li>Difficult customer communication</li>
                </ul>
              </div>
              <div className="p-6">
                <h3 className="text-sm font-semibold text-primary uppercase">After</h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {[
                    "Modern digital presence",
                    "Better customer experience",
                    "Professional branding",
                    "Scalable digital solution",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <span className="eyebrow">Questions</span>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 11. Final conversion section */}
      <section className="hero-gradient">
        <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Your business deserves more than a website.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Let&apos;s build a digital experience that helps your business attract customers,
            generate enquiries and grow.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <RequestDialog>
              <Button variant="hero" size="xl">
                Start Your Website
              </Button>
            </RequestDialog>
            <RequestDialog>
              <Button variant="outline" size="xl">
                Book a Consultation
              </Button>
            </RequestDialog>
          </div>
        </div>
      </section>
    </>
  );
}
