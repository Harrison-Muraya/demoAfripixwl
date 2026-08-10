import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Sparkles,
  MonitorPlay,
  Globe,
  ShoppingCart,
  CalendarCheck,
  LayoutDashboard,
  Building2,
  Code2,
  Smartphone,
  Target,
  Search,
  MessageCircle,
  Zap,
  BarChart3,
  CreditCard,
  FileEdit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/RequestDialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { industries, demos, featuredDemos } from "@/data/demos";

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
    icon: Globe,
    title: "Business Websites",
    body: "Build credibility and generate enquiries with a professional online presence.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Websites",
    body: "Turn your website into a 24/7 sales channel customers can buy from anytime.",
  },
  {
    icon: CalendarCheck,
    title: "Booking & Reservation Systems",
    body: "Let customers book appointments, rooms or services without calling.",
  },
  {
    icon: LayoutDashboard,
    title: "Business Management Systems",
    body: "Digitise processes, manage records and reduce manual work.",
  },
  {
    icon: Building2,
    title: "Real Estate Platforms",
    body: "Showcase properties and capture qualified leads with listing-ready pages.",
  },
  {
    icon: Code2,
    title: "Custom Web Applications",
    body: "Build the exact digital solution your business needs, from the ground up.",
  },
];

const principles = [
  { icon: Smartphone, label: "Mobile-first design" },
  { icon: Target, label: "Conversion-focused layouts" },
  { icon: Search, label: "SEO-ready structure" },
  { icon: MessageCircle, label: "WhatsApp & lead integration" },
  { icon: Zap, label: "Fast-loading experiences" },
  { icon: BarChart3, label: "Analytics & tracking" },
  { icon: CreditCard, label: "Payment integrations" },
  { icon: FileEdit, label: "Easy content management" },
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
      {/* 1. Hero — sell the outcome, not the portfolio */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28 lg:px-8">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Don&apos;t just imagine it. Experience it.
            </span>
            <h1 className="mt-6 text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-6xl">
              See What Your <span className="brand-gradient-text">Business</span> Could Look Like
              Online
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Explore professionally designed websites and digital platforms built for real business
              needs — then interact with the live demonstrations before starting your own.
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
            <p className="mt-8 text-sm text-muted-foreground">
              {demos.length}+ live demonstrations · {industries.length}+ industries · Designed for
              conversion
            </p>
          </div>

          {/* Floating preview cards */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="card-surface float-slow relative z-10 p-5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="ml-3 truncate text-xs text-muted-foreground">
                  powel.afripixelprojects.com
                </span>
              </div>

              <div className="mt-4 overflow-hidden rounded-lg border border-border">
                <div className="h-[400px] bg-background">
                  <iframe
                    src="https://powel.afripixelprojects.com"
                    title="Powel-elss Enterprises website preview"
                    className="h-full w-full border-0"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <div
              className="card-surface absolute -bottom-8 -left-4 z-20 hidden w-52 p-4 sm:block"
              style={{ animationDelay: "1.5s" }}
            >
              <MonitorPlay className="h-5 w-5 text-accent" />
              <p className="mt-2 text-sm font-semibold">Live project preview</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Scroll, click and explore the real site.
              </p>
            </div>
            <div className="absolute -top-10 -right-10 -z-0 h-48 w-48 rounded-full bg-[image:var(--gradient-brand)] opacity-10 blur-3xl" />
          </div>
        </div>
      </section>

      {/* 2. Industry selector */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">Find a Website for Your Industry</h2>
            <p className="mt-4 text-muted-foreground">
              A real-estate company doesn&apos;t need to see a school website — they need to see
              what we can build for a business like theirs. Select your industry to find out.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                to="/industries/$slug"
                params={{ slug: industry.slug }}
                className="card-surface group flex flex-col p-6"
              >
                <span className="h-1.5 w-10 rounded-full bg-[image:var(--gradient-brand)]" />
                <h3 className="mt-5 text-lg font-semibold">{industry.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {industry.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent">
                  View Industry Demos
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured demos — strongest sales section */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">Featured Projects</h2>
            <p className="mt-4 text-muted-foreground">
              A few of our strongest projects — each one solving a real business problem, not just a
              design exercise.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredDemos().map((demo) => (
              <div key={demo.slug} className="card-surface flex flex-col p-6">
                <span className="text-xs font-semibold tracking-wide text-accent uppercase">
                  {demo.industry}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{demo.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {demo.description}
                </p>
                <Button variant="outline" className="mt-5 w-full" asChild>
                  <Link to="/demo/$slug" params={{ slug: demo.slug }}>
                    View Live Demo
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. What can we build for you? */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-wide text-accent uppercase">
              More Than Just a Website
            </span>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">What Can We Build For You?</h2>
            <p className="mt-4 text-muted-foreground">
              The demos are proof of what&apos;s possible — here&apos;s the full range of digital
              solutions behind them.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.title} className="card-surface p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[image:var(--gradient-brand)]">
                  <c.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
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
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              We Don&apos;t Build Websites Just to Look Good.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We build them to help businesses{" "}
              <span className="font-semibold text-foreground">
                Attract → Engage → Convert → Grow.
              </span>{" "}
              That&apos;s a different proposition from a freelancer who just builds beautiful
              websites — we build websites that work as marketing assets.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => (
              <div key={p.label} className="card-surface flex items-center gap-3 p-5">
                <p.icon className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm font-medium">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Social proof / credibility */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Trusted to Build Digital Experiences
            </h2>
            <p className="mt-4 text-muted-foreground">
              Digital marketing and development under one roof — so your website isn&apos;t just
              built well, it&apos;s built to be found and to convert.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            <div className="card-surface p-8 text-center">
              <p className="brand-gradient-text text-4xl font-semibold">{demos.length}+</p>
              <p className="mt-2 text-sm text-muted-foreground">Live projects in the Demo Centre</p>
            </div>
            <div className="card-surface p-8 text-center">
              <p className="brand-gradient-text text-4xl font-semibold">{industries.length}+</p>
              <p className="mt-2 text-sm text-muted-foreground">Industries served</p>
            </div>
            <div className="card-surface p-8 text-center">
              <p className="brand-gradient-text text-4xl font-semibold">100%</p>
              <p className="mt-2 text-sm text-muted-foreground">Real, interactive demonstrations</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. How it works — from idea to launch */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">From Idea to Launch</h2>
            <p className="mt-4 text-muted-foreground">
              A simple, transparent process — so there&apos;s no uncertainty around how a project
              with us works.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {process.map((s) => (
              <div key={s.no} className="card-surface p-7">
                <span className="brand-gradient-text text-3xl font-semibold">{s.no}</span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <RequestDialog>
              <Button variant="hero" size="lg">
                Start Your Project
              </Button>
            </RequestDialog>
          </div>
        </div>
      </section>

      {/* 8. Full demo centre teaser */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="card-surface flex flex-col items-start gap-6 p-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">Explore All Our Demos</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Browse all {demos.length}+ live projects across every industry we&apos;ve worked in,
                filterable by category.
              </p>
            </div>
            <Button variant="hero" size="xl" asChild>
              <Link to="/demonstrations">
                View the Full Demo Centre <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 9. Business assessment / lead magnet */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Not Sure What Your Business Needs?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Get a quick assessment of your current digital presence and discover:
              </p>
              <ul className="mt-6 space-y-3">
                {assessmentBenefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm font-medium">
                    <Check className="h-4 w-4 shrink-0 text-accent" />
                    {b}
                  </li>
                ))}
              </ul>
              <Button variant="accent" size="xl" className="mt-8" asChild>
                <Link to="/assessment">Get My Free Business Assessment</Link>
              </Button>
            </div>
            <div className="card-surface p-8">
              <h3 className="text-xl font-semibold">Before</h3>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li>Outdated website</li>
                <li>Manual processes</li>
                <li>Poor online presence</li>
                <li>Difficult customer communication</li>
              </ul>
              <div className="my-6 h-px bg-border" />
              <h3 className="text-xl font-semibold">After</h3>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Modern digital presence",
                  "Better customer experience",
                  "Professional branding",
                  "Scalable digital solution",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-muted-foreground">
              Answers to the questions that come up most before starting a project.
            </p>
          </div>
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
      <section className="hero-gradient border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Your Business Deserves More Than a Website.
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
