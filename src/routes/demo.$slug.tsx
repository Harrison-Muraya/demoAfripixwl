import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ExternalLink, Maximize2, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/RequestDialog";
import { getDemo } from "@/data/demos";

export const Route = createFileRoute("/demo/$slug")({
  loader: ({ params }) => {
    const demo = getDemo(params.slug);
    if (!demo) throw notFound();
    return { demo };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Demonstration not found — Afripixel Demo Centre" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.demo.name} — ${loaderData.demo.industry} Demonstration | Afripixel`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.demo.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.demo.description },
      ],
    };
  },
  component: DemoPage,
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center" role="alert">
      {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Demonstration not found</h1>
      <Button variant="outline" className="mt-6" asChild>
        <Link to="/demonstrations">Back to Demonstrations</Link>
      </Button>
    </div>
  ),
});

function DemoPage() {
  const { demo } = Route.useLoaderData();
  const [blocked, setBlocked] = useState(false);

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 lg:px-8">
      <Link
        to="/industries/$slug"
        params={{ slug: demo.industrySlug }}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" /> Back to {demo.industry}
      </Link>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="min-w-0">
          <span className="text-xs font-semibold tracking-wide text-accent uppercase">
            {demo.industry} Demonstration
          </span>
          <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">{demo.name}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Explore an example of how Afripixel can create a modern digital experience for
            businesses in {demo.industry.toLowerCase()}.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="accent" asChild>
            <a href={demo.demoUrl} target="_blank" rel="noreferrer">
              <Maximize2 className="h-4 w-4" /> Open Full Screen
            </a>
          </Button>
          <RequestDialog defaultIndustry={demo.industry} defaultProject={demo.name}>
            <Button variant="hero">Request Similar Solution</Button>
          </RequestDialog>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-lift">
        <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="ml-3 truncate text-xs text-muted-foreground">{demo.demoUrl}</span>
        </div>

        {blocked ? (
          <div className="flex flex-col items-center gap-4 px-6 py-24 text-center">
            <TriangleAlert className="h-8 w-8 text-primary" />
            <h2 className="text-lg font-semibold">This project can&apos;t be embedded here</h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Browser security settings prevent this live project from loading inside the preview.
              You can still experience the full demonstration in a new tab.
            </p>
            <Button variant="hero" size="lg" asChild>
              <a href={demo.demoUrl} target="_blank" rel="noreferrer">
                Open Live Demonstration <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        ) : (
          <iframe
            key={demo.slug}
            src={demo.demoUrl}
            title={`${demo.name} live demonstration`}
            className="h-[62vh] w-full border-0 bg-background sm:h-[75vh] lg:h-[82vh]"
            loading="lazy"
            onError={() => setBlocked(true)}
          />
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          This is a real, live Afripixel project — scroll, click and interact with it freely.
        </p>
        <button
          type="button"
          onClick={() => setBlocked((b) => !b)}
          className="text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-accent"
        >
          {blocked ? "Try loading the preview again" : "Preview not loading?"}
        </button>
      </div>

      <div className="hero-gradient mt-14 rounded-2xl border border-border p-10 text-center">
        <h2 className="text-2xl font-semibold">Like What You See?</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          This is only an example. We can create a solution tailored specifically to your business.
        </p>
        <RequestDialog defaultIndustry={demo.industry} defaultProject={demo.name}>
          <Button variant="hero" size="xl" className="mt-7">
            Request Something Similar
          </Button>
        </RequestDialog>
      </div>
    </div>
  );
}
