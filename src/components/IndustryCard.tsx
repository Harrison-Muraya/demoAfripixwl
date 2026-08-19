import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { industryIcons, industryIconFallback } from "@/lib/industry-icons";
import type { Industry } from "@/lib/site-content";

type Props = {
  industry: Industry;
  index: number;
  count?: number;
};

export function IndustryCard({ industry, index, count }: Props) {
  const Icon = industryIcons[industry.slug] ?? industryIconFallback;
  const accent = index % 2 === 0 ? "bg-primary" : "bg-accent";

  return (
    <Link
      to="/industries/$slug"
      params={{ slug: industry.slug }}
      className="card-surface group relative flex flex-col overflow-hidden p-6"
    >
      <span className={`absolute inset-x-0 top-0 h-[3px] ${accent}`} />
      <div className="flex items-center justify-between">
        <Icon className="h-7 w-7 text-foreground" strokeWidth={1.6} />
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
      <h3 className="mt-5 text-lg leading-snug font-semibold">{industry.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {industry.description}
      </p>
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs">
        {typeof count === "number" ? (
          <span className="text-muted-foreground">
            {count} project{count === 1 ? "" : "s"}
          </span>
        ) : (
          <span />
        )}
        <span className="font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          View demos
        </span>
      </div>
    </Link>
  );
}
