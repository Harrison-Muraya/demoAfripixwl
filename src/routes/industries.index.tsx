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
        content: "Live demonstrations across eight industries, built by Afripixel Solutions.",
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
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => {
          const count = demosFor(industry.slug).length;
          return (
            <Link
              key={industry.slug}
              to="/industries/$slug"
              params={{ slug: industry.slug }}
              className="card-surface group flex flex-col p-7"
            >
              <span className="h-1.5 w-10 rounded-full bg-[image:var(--gradient-brand)]" />
              <h2 className="mt-5 text-xl font-semibold">{industry.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {industry.description}
              </p>
              <span className="mt-6 flex items-center justify-between text-sm font-medium text-accent">
                View Demonstration
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  {count} project{count > 1 ? "s" : ""}
                  <ArrowRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
