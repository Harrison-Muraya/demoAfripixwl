import { useEffect, useRef, useState, type ReactNode } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { lockPageScroll } from "@/lib/iframe-scroll-lock";

type Props = {
  url: string;
  src: string;
  title: string;
  height?: string;
  className?: string;
  footer?: ReactNode;
  /** Show a Desktop/Mobile toggle. Loads as desktop by default. */
  deviceToggle?: boolean;
  /**
   * When provided, the iframe becomes inert (not focusable, not clickable)
   * and this renders as a full-cover overlay instead — typically a `<Link>`
   * or `<a>` that navigates elsewhere on click. This means focus never
   * moves into the iframe from a click here, which sidesteps the browser's
   * "scroll a newly-focused iframe into view" behavior entirely rather than
   * fighting it. Use this for small preview cards; leave unset for a fully
   * interactive, click-around preview (e.g. the dedicated demo page).
   */
  overlay?: ReactNode;
};

// A real desktop layout width to force the embedded page to render at,
// regardless of how narrow the card itself is. We then scale it down
// visually so it fits — the page never sees a "mobile" viewport.
const DESKTOP_WIDTH = 1440;
const MOBILE_WIDTH = 375;

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
  overlay,
}: Props) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const isMobile = deviceToggle && device === "mobile";
  const isInert = Boolean(overlay);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => {
      const width = el.clientWidth;
      if (width > 0) setScale(width / DESKTOP_WIDTH);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={cn("card-surface group overflow-hidden", className)}>
      <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-3.5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="ml-2 flex-1 truncate rounded-sm bg-background px-2.5 py-1 text-xs text-muted-foreground">
          {url}
        </span>
        {deviceToggle && (
          <div className="relative z-20 flex items-center gap-0.5 rounded-sm border border-border bg-background p-0.5">
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
        ref={wrapperRef}
        className={cn(
          "relative overflow-hidden overscroll-contain bg-background",
          isMobile && "flex justify-center overflow-auto py-4",
        )}
        style={{ height }}
      >
        {isMobile ? (
          <iframe
            src={src}
            title={title}
            loading="lazy"
            tabIndex={isInert ? -1 : undefined}
            onFocus={isInert ? undefined : () => lockPageScroll()}
            className="h-full shrink-0 rounded-md border border-border"
            style={{
              width: MOBILE_WIDTH,
              overscrollBehavior: "contain",
              pointerEvents: isInert ? "none" : undefined,
            }}
          />
        ) : (
          <iframe
            src={src}
            title={title}
            loading="lazy"
            tabIndex={isInert ? -1 : undefined}
            onFocus={isInert ? undefined : () => lockPageScroll()}
            className="absolute top-0 left-0 border-0"
            style={{
              width: DESKTOP_WIDTH,
              height: `calc(100% / ${scale || 1})`,
              transform: `scale(${scale || 1})`,
              transformOrigin: "top left",
              overscrollBehavior: "contain",
              pointerEvents: isInert ? "none" : undefined,
            }}
          />
        )}
        {overlay && (
          <div className="absolute inset-0 z-10">
            <div className="pointer-events-none absolute inset-0 bg-background/0 opacity-0 transition-opacity duration-200 group-hover:bg-background/40 group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <span className="rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background shadow-sm">
                Click to explore
              </span>
            </div>
            <div className="absolute inset-0 [&>a]:block [&>a]:h-full [&>a]:w-full">{overlay}</div>
          </div>
        )}
      </div>
      {footer}
    </div>
  );
}
