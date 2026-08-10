import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowDown, Check, X, Sparkles, MonitorPlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/RequestDialog";
import { industries, featuredDemos } from "@/data/demos";
import { url } from "node:inspector";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Afripixel Demo Centre — Experience Real Digital Projects" },
      {
        name: "description",
        content:
          "Don't just imagine it. Experience it. Explore real Afripixel projects by industry and interact with live demonstrations before starting your own.",
      },
      { property: "og:title", content: "Afripixel Demo Centre — Experience Real Projects" },
      {
        property: "og:description",
        content:
          "A premium digital showroom of live Afripixel projects across education, healthcare, real estate, travel, construction and more.",
      },
    ],
  }),
  component: Index,
});

const transformations = [
  { from: "Manual processes", to: "Digital system" },
  { from: "No online presence", to: "Professional website" },
  { from: "Lost enquiries", to: "Lead management" },
  { from: "Poor visibility", to: "Business dashboard" },
];

const flow = [
  "Your Business Challenge",
  "Afripixel Solution",
  "Interactive Demonstration",
  "Your Digital Product",
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28 lg:px-8">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Don&apos;t just imagine it. Experience it.
            </span>
            <h1 className="mt-6 text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-6xl">
              Experience What <span className="brand-gradient-text">Afripixel</span> Can Build For
              Your Business
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Explore real projects we&apos;ve created for different industries and interact with
              live demonstrations before starting your own project.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button variant="hero" size="xl" asChild>
                <Link to="/industries">
                  Explore Industries <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/demonstrations">View Demonstrations</Link>
              </Button>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              {featuredDemos().length > 0 ? "15 live projects" : null} · 8 industries · Real,
              interactive websites
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
                {/* Live website preview */}
                <div className="h-[400px] bg-background">
                  <iframe
                    src="https://powel.afripixelprojects.com"
                    title="Powel-elss Enterprises website preview"
                    className="h-full w-full border-0"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* <div className="mt-4 space-y-3">
                <div className="h-24 rounded-lg bg-[image:var(--gradient-hero)] ring-1 ring-border" />
                <div className="h-3 w-3/4 rounded bg-secondary" />
                <div className="h-3 w-1/2 rounded bg-secondary" />
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="h-12 rounded bg-secondary" />
                  <div className="h-12 rounded bg-secondary" />
                  <div className="h-12 rounded bg-secondary" />
                </div>
              </div> */}
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

      {/* Business freedom */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="max-w-2xl text-3xl font-semibold sm:text-4xl">
            From Business Challenge to Digital Solution
          </h2>
          <div className="mt-12 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <ol className="space-y-3">
              {flow.map((step, i) => (
                <li key={step}>
                  <div className="rounded-xl border border-border bg-background px-5 py-4 text-sm font-medium">
                    <span className="mr-3 text-xs text-accent">0{i + 1}</span>
                    {step}
                  </div>
                  {i < flow.length - 1 ? (
                    <ArrowDown className="mx-auto my-1 h-4 w-4 text-muted-foreground" />
                  ) : null}
                </li>
              ))}
            </ol>
            <div className="grid gap-4 sm:grid-cols-2">
              {transformations.map((t) => (
                <div key={t.from} className="card-surface p-5">
                  <p className="text-sm text-muted-foreground line-through">{t.from}</p>
                  <p className="mt-2 text-base font-semibold">{t.to}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">Explore Solutions by Industry</h2>
            <p className="mt-4 text-muted-foreground">
              Select your industry and see a real Afripixel project designed around businesses like
              yours.
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
                  View Demonstration
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold sm:text-4xl">Featured Projects</h2>
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
                    View Demonstration
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-secondary/50 p-8">
              <h3 className="text-xl font-semibold text-muted-foreground">Before</h3>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Outdated website",
                  "Manual processes",
                  "Poor online presence",
                  "Difficult customer communication",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <X className="h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-surface p-8">
              <h3 className="text-xl font-semibold">After</h3>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Modern digital presence",
                  "Better customer experience",
                  "Professional branding",
                  "Easier communication",
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
          <div className="mt-10">
            <Button variant="hero" size="lg" asChild>
              <Link to="/industries">See What We Can Build</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Assessment */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_auto] lg:items-center lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Not sure what your business needs?
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Take a quick assessment and discover where your business could benefit from digital
              solutions.
            </p>
          </div>
          <Button variant="accent" size="xl" asChild>
            <Link to="/assessment">Take the Assessment</Link>
          </Button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="hero-gradient border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <h2 className="text-3xl font-semibold sm:text-4xl">Your Business Could Look Like This</h2>
          <p className="mt-4 text-muted-foreground">
            Explore our existing projects and discover what Afripixel could build for your business.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button variant="hero" size="xl" asChild>
              <Link to="/industries">Explore Industries</Link>
            </Button>
            <RequestDialog>
              <Button variant="outline" size="xl">
                Request a Solution
              </Button>
            </RequestDialog>
          </div>
        </div>
      </section>
    </>
  );
}
