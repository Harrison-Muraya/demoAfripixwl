import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Afripixel Demo Centre" },
      {
        name: "description",
        content:
          "Explore real Afripixel projects and experience how a professionally designed digital solution could work for your business.",
      },
      { name: "author", content: "Afripixel Solutions" },
      { property: "og:title", content: "Afripixel Demo Centre" },
      {
        property: "og:description",
        content: "A premium digital showroom of live Afripixel projects.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap",
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // Browsers auto-scroll the parent page to bring a newly-focused iframe
  // fully into view. Since every demo preview on this site is an embedded
  // iframe, clicking a link inside one (hero preview, featured demos,
  // individual demo pages) was hijacking the whole page's scroll position.
  // Because the site also uses `scroll-behavior: smooth`, that unwanted
  // scroll is animated over ~300ms, so a single correction isn't enough —
  // it gets overridden mid-animation. This freezes the "last known good"
  // scroll position while the pointer is over any iframe (so the glitch
  // itself never gets captured as the position to restore), then forces
  // the page back to that position on every frame for long enough to
  // outlast the browser's own animated scroll.
  useEffect(() => {
    let lastX = window.scrollX;
    let lastY = window.scrollY;
    let frozen = false;

    const trackScroll = () => {
      if (frozen) return;
      lastX = window.scrollX;
      lastY = window.scrollY;
    };

    const freeze = () => {
      frozen = true;
    };
    const unfreeze = () => {
      frozen = false;
    };

    const restoreScrollIfIframeFocused = () => {
      if (document.activeElement?.tagName !== "IFRAME") return;
      const root = document.documentElement;
      const prevBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      const start = performance.now();
      const duration = 400;
      const tick = (now: number) => {
        window.scrollTo(lastX, lastY);
        if (now - start < duration) {
          requestAnimationFrame(tick);
        } else {
          root.style.scrollBehavior = prevBehavior;
        }
      };
      requestAnimationFrame(tick);
    };

    const attachHoverGuards = () => {
      document.querySelectorAll("iframe").forEach((el) => {
        el.addEventListener("mouseenter", freeze);
        el.addEventListener("mouseleave", unfreeze);
      });
    };
    const detachHoverGuards = () => {
      document.querySelectorAll("iframe").forEach((el) => {
        el.removeEventListener("mouseenter", freeze);
        el.removeEventListener("mouseleave", unfreeze);
      });
    };

    attachHoverGuards();
    const observer = new MutationObserver(attachHoverGuards);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("scroll", trackScroll, { passive: true });
    window.addEventListener("blur", restoreScrollIfIframeFocused);

    return () => {
      window.removeEventListener("scroll", trackScroll);
      window.removeEventListener("blur", restoreScrollIfIframeFocused);
      observer.disconnect();
      detachHoverGuards();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col overflow-x-hidden pb-[4.5rem] lg:pb-0">
        <Navbar />
        <main className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <Footer />
        <MobileCtaBar />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}
