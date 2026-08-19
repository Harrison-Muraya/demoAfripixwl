import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { useSiteContent } from "@/lib/site-content";

export function Footer() {
  const { industries } = useSiteContent();

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="max-w-sm">
          <Logo className="h-9 w-auto" />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Afripixel Solutions Demo Centre — a digital showroom of real projects we have already
            built for businesses across Africa.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="transition-colors hover:text-accent">
                Home
              </Link>
            </li>
            <li>
              <Link to="/industries" className="transition-colors hover:text-accent">
                Industries
              </Link>
            </li>
            <li>
              <Link to="/demonstrations" className="transition-colors hover:text-accent">
                Demonstrations
              </Link>
            </li>
            <li>
              <Link to="/how-it-works" className="transition-colors hover:text-accent">
                How It Works
              </Link>
            </li>
            <li>
              <Link to="/assessment" className="transition-colors hover:text-accent">
                Business Assessment
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Industries</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {industries.slice(0, 6).map((i) => (
              <li key={i.slug}>
                <Link
                  to="/industries/$slug"
                  params={{ slug: i.slug }}
                  className="transition-colors hover:text-accent"
                >
                  {i.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Afripixel Solutions. Demo Centre proof of concept.
        </div>
      </div>
    </footer>
  );
}
