import { createFileRoute } from "@tanstack/react-router";
import { IndustryCard } from "@/components/IndustryCard";
import { useSiteContent } from "@/lib/site-content";

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
        content: "Live demonstrations across many industries, built by Afripixel Solutions.",
      },
    ],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  const { industries, demosFor } = useSiteContent();

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
  );
}
