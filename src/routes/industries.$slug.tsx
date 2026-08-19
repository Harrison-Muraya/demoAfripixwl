import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/RequestDialog";
import { getSiteContent } from "@/lib/content.functions";
import { contentHelpers, type Demo } from "@/lib/site-content";

export const Route = createFileRoute("/industries/$slug")({
  loader: async ({ params }) => {
    const { getIndustry, demosFor } = contentHelpers(await getSiteContent());
    const industry = getIndustry(params.slug);
    if (!industry) throw notFound();
    return { industry, demos: demosFor(params.slug) };
  },

  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Industry not found — Afripixel Demo Centre" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.industry.name} Demonstrations — Afripixel Demo Centre`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.industry.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.industry.description },
      ],
    };
  },
  component: IndustryPage,
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center" role="alert">
      {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Industry not found</h1>
      <Button variant="outline" className="mt-6" asChild>
        <Link to="/industries">Back to Industries</Link>
      </Button>
    </div>
  ),
});

function IndustryPage() {
  const { industry, demos } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        to="/industries"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Industries
      </Link>

      <div className="mt-8 max-w-2xl">
        <span className="text-xs font-semibold tracking-wide text-accent uppercase">Industry</span>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{industry.name}</h1>
        <p className="mt-4 text-muted-foreground">{industry.blurb}</p>
        <p className="mt-2 text-sm text-muted-foreground">{industry.description}</p>
      </div>

      <div className="hero-gradient relative mt-12 overflow-hidden rounded-2xl border border-border/60 p-6 sm:p-8">
        <div className="relative z-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {demos.map((demo: Demo) => (
            <div key={demo.slug} className="card-surface relative z-10 flex flex-col p-7">
              <h2 className="text-xl font-semibold">{demo.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {demo.description}
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <Button variant="hero" asChild>
                  <Link to="/demo/$slug" params={{ slug: demo.slug }}>
                    View Demonstration <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <a
                  href={demo.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-xs text-muted-foreground transition-colors hover:text-accent"
                >
                  Open in new tab <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-gradient relative mt-16 rounded-2xl border border-border p-10 text-center overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-semibold">Like What You See?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            These are only examples. We can create a solution tailored specifically to your business.
          </p>
          <RequestDialog defaultIndustry={industry.name}>
            <Button variant="hero" size="xl" className="mt-7">
              Request Something Similar
            </Button>
          </RequestDialog>
        </div>
      </div>
    </div>
  );
}
