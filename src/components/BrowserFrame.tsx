import { useState, type ReactNode } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  url: string;
  src: string;
  title: string;
  height?: string;
  className?: string;
  footer?: ReactNode;
  /** Show a Desktop/Mobile toggle. Loads as desktop by default. */
  deviceToggle?: boolean;
};

/**
 * Renders a demo site inside a plain browser chrome — real address bar,
 * real live iframe. This is the site's one recurring signature: instead of
 * icon illustrations or mockup art, proof is an actual, interactive project.
 */
export function BrowserFrame({
  url,
  src,
  title,
  height = "22rem",
  className,
  footer,
  deviceToggle = false,
}: Props) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const isMobile = deviceToggle && device === "mobile";

  return (
    <div className={cn("card-surface overflow-hidden", className)}>
      <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-3.5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="ml-2 flex-1 truncate rounded-sm bg-background px-2.5 py-1 text-xs text-muted-foreground">
          {url}
        </span>
        {deviceToggle && (
          <div className="flex items-center gap-0.5 rounded-sm border border-border bg-background p-0.5">
            <button
              type="button"
              onClick={() => setDevice("desktop")}
              aria-label="View as desktop"
              aria-pressed={device === "desktop"}
              className={cn(
                "rounded-[2px] p-1 transition-colors",
                device === "desktop"
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Monitor className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setDevice("mobile")}
              aria-label="View as mobile"
              aria-pressed={device === "mobile"}
              className={cn(
                "rounded-[2px] p-1 transition-colors",
                device === "mobile"
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Smartphone className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
      <div
        className={cn("bg-background", isMobile && "flex justify-center overflow-auto py-4")}
        style={{ height }}
      >
        <iframe
          src={src}
          title={title}
          loading="lazy"
          className={cn(
            "border-0 transition-[width] duration-300",
            isMobile
              ? "h-full w-[375px] shrink-0 rounded-md border border-border"
              : "h-full w-full",
          )}
        />
      </div>
      {footer}
    </div>
  );
}
