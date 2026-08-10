import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { industries, demosFor } from "@/data/demos";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Explore Solutions by Industry — Afripixel Demo Centre" },
      {
        name: "description",
        content:
          "Select your industry and explore a real Afripixel project designed around businesses like yours.",
      },
      { property: "og:title", content: "Explore Solutions by Industry — Afripixel Demo Centre" },
      {
        property: "og:description",
        content: `Live demonstrations across ${industries.length}+ industries, built by Afripixel Solutions.`,
      },
    ],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">Explore Solutions by Industry</h1>
        <p className="mt-4 text-muted-foreground">
          Select your industry and see a real Afripixel project designed around businesses like
          yours.
        </p>
      </div>
      <div className="mt-12 grid gap-x-10 border-t border-border sm:grid-cols-2">
        {industries.map((industry, i) => {
          const count = demosFor(industry.slug).length;
          return (
            <Link
              key={industry.slug}
              to="/industries/$slug"
              params={{ slug: industry.slug }}
              className={`group flex items-start justify-between gap-6 border-b border-border py-6 ${i % 2 === 0 ? "sm:border-r sm:pr-10" : "sm:pl-10"}`}
            >
              <div>
                <h2 className="text-lg font-semibold transition-colors group-hover:text-primary">
                  {industry.name}
                </h2>
                <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {industry.description}
                </p>
              </div>
              <div className="mt-1 flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                <span>
                  {count} project{count > 1 ? "s" : ""}
                </span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
