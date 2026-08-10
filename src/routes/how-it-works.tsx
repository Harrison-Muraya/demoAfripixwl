import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/RequestDialog";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Afripixel Demo Centre" },
      {
        name: "description",
        content:
          "Choose your industry, experience a real Afripixel project, then request a solution built for your business.",
      },
      { property: "og:title", content: "How It Works — Afripixel Demo Centre" },
      {
        property: "og:description",
        content: "Three simple steps from industry to your own digital solution.",
      },
    ],
  }),
  component: HowItWorks,
});

const steps = [
  {
    no: "01",
    title: "Choose Your Industry",
    body: "Tell us what type of business you operate.",
  },
  {
    no: "02",
    title: "Experience a Real Project",
    body: "Explore an existing Afripixel project created for that industry.",
  },
  {
    no: "03",
    title: "Build Yours",
    body: "Request a similar solution customized for your business.",
  },
];

const journey = [
  "Choose Industry",
  "View Existing Project",
  "Experience It",
  "Request Your Solution",
];

function HowItWorks() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">How It Works</h1>
        <p className="mt-4 text-muted-foreground">
          The Demo Centre is the discovery layer around Afripixel&apos;s real, existing projects.
        </p>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {steps.map((s) => (
          <div key={s.no} className="card-surface p-8">
            <span className="brand-gradient-text text-4xl font-semibold">{s.no}</span>
            <h2 className="mt-4 text-xl font-semibold">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-border bg-card p-8 sm:p-12">
        <h2 className="text-xl font-semibold">The journey</h2>
        <ol className="mx-auto mt-8 max-w-md">
          {journey.map((j, i) => (
            <li key={j}>
              <div className="rounded-xl border border-border bg-background px-5 py-4 text-center text-sm font-medium">
                {j}
              </div>
              {i < journey.length - 1 ? (
                <ArrowDown className="mx-auto my-1 h-4 w-4 text-muted-foreground" />
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      <div className="hero-gradient mt-16 rounded-2xl border border-border p-10 text-center">
        <h2 className="text-2xl font-semibold">Ready to start?</h2>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button variant="hero" size="xl" asChild>
            <Link to="/industries">Explore Industries</Link>
          </Button>
          <RequestDialog>
            <Button variant="outline" size="xl">
              Request a Solution
            </Button>
          </RequestDialog>
        </div>
      </div>
    </div>
  );
}
