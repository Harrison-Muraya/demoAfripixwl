import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/RequestDialog";

const links = [
  { to: "/", label: "Home" },
  { to: "/industries", label: "Industries" },
  { to: "/demonstrations", label: "Demonstrations" },
  { to: "/how-it-works", label: "How It Works" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center" onClick={() => setOpen(false)}>
          <Logo className="h-8 w-auto shrink-0 sm:h-9" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-accent font-semibold after:scale-x-100" }}
              className="relative py-1 text-sm font-medium text-muted-foreground transition-colors after:absolute after:-bottom-[3px] after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-[image:var(--gradient-brand)] after:transition-transform after:duration-300 hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 justify-self-end">
          <Button variant="outline" size="sm" className="hidden sm:inline-flex" asChild>
            <Link to="/demonstrations">Explore Demos</Link>
          </Button>
          <RequestDialog>
            <Button variant="hero" size="sm" className="hidden sm:inline-flex">
              Start Your Project
            </Button>
          </RequestDialog>
          <button
            type="button"
            aria-label="Toggle menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{
                  className: "bg-secondary text-accent font-semibold border-l-2 border-accent",
                }}
                className="rounded-md border-l-2 border-transparent px-2 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <RequestDialog>
              <Button variant="hero" className="mt-2 w-full">
                Start Your Project
              </Button>
            </RequestDialog>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
