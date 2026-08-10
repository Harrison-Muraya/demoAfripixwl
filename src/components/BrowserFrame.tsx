import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  url: string;
  src: string;
  title: string;
  height?: string;
  className?: string;
  footer?: ReactNode;
};

/**
 * Renders a demo site inside a plain browser chrome — real address bar,
 * real live iframe. This is the site's one recurring signature: instead of
 * icon illustrations or mockup art, proof is an actual, interactive project.
 */
export function BrowserFrame({ url, src, title, height = "22rem", className, footer }: Props) {
  return (
    <div className={cn("card-surface overflow-hidden", className)}>
      <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-3.5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="ml-2 flex-1 truncate rounded-sm bg-background px-2.5 py-1 text-xs text-muted-foreground">
          {url}
        </span>
      </div>
      <div className="bg-background" style={{ height }}>
        <iframe src={src} title={title} className="h-full w-full border-0" loading="lazy" />
      </div>
      {footer}
    </div>
  );
}
