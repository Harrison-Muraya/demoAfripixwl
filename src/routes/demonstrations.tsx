import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { industries, demos } from "@/data/demos";
import noBgPattern from "@/assets/no-bg-pattern.png";

export const Route = createFileRoute("/demonstrations")({
  head: () => ({
    meta: [
      { title: "Live Demonstrations — Afripixel Demo Centre" },
      {
        name: "description",
        content:
          "Browse every live Afripixel project and interact with the real websites we have built across eight industries.",
      },
      { property: "og:title", content: "Live Demonstrations — Afripixel Demo Centre" },
      {
        property: "og:description",
        content: "Interact with real Afripixel projects, filtered by industry.",
      },
    ],
  }),
  component: DemonstrationsPage,
});

function DemonstrationsPage() {
  const [filter, setFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const list = filter === "all" ? demos : demos.filter((d) => d.industrySlug === filter);
  const pageSize = 9;
  const totalPages = Math.max(1, Math.ceil(list.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleDemos = list.slice(startIndex, startIndex + pageSize);

  const handleFilterChange = (nextFilter: string) => {
    setFilter(nextFilter);
    setPage(1);
  };

  return (
    <div className="relative mx-auto max-full px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.13] sm:opacity-[0.15]"
          style={{
            backgroundImage: `url(${noBgPattern})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
          }}
        />
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold sm:text-4xl">Our Demonstrations</h1>
          <p className="mt-4 text-muted-foreground">
            Every demonstration below is a real, live Afripixel project. Open one and experience it
            exactly as your customers would.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {[{ slug: "all", name: "All Projects" }, ...industries].map((i) => (
            <button
              key={i.slug}
              type="button"
              onClick={() => handleFilterChange(i.slug)}
              className={
                filter === i.slug
                  ? "rounded-full border border-accent bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground transition-colors"
                  : "rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              }
            >
              {i.name}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleDemos.map((demo) => (
            <div key={demo.slug} className="card-surface flex flex-col p-7">
              <span className="text-xs font-semibold tracking-wide text-accent uppercase">
                {demo.industry}
              </span>
              <h2 className="mt-2 text-xl font-semibold">{demo.name}</h2>
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

        {totalPages > 1 ? (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(startIndex + pageSize, list.length)} of {list.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                disabled={currentPage === 1}
                className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-50 hover:border-accent hover:text-accent"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  className={
                    currentPage === pageNumber
                      ? "rounded-full border border-accent bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground"
                      : "rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                  }
                >
                  {pageNumber}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                disabled={currentPage === totalPages}
                className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-50 hover:border-accent hover:text-accent"
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
