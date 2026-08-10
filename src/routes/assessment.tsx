import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/RequestDialog";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Business Digital Assessment — Afripixel Demo Centre" },
      {
        name: "description",
        content:
          "Answer six quick questions and discover where your business could benefit most from digital solutions.",
      },
      { property: "og:title", content: "Business Digital Assessment — Afripixel" },
      {
        property: "og:description",
        content: "A quick assessment of your digital growth opportunity.",
      },
    ],
  }),
  component: AssessmentPage,
});

const questions = [
  {
    q: "Does your business have a modern website?",
    area: "Website",
  },
  {
    q: "Can customers enquire or book with you online?",
    area: "Online Presence",
  },
  {
    q: "Do you track enquiries and customers in one place?",
    area: "Customer Management",
  },
  {
    q: "Are your day-to-day processes mostly digital rather than manual?",
    area: "Automation",
  },
  {
    q: "Do you have clear visibility of how your business is performing?",
    area: "Business Dashboard",
  },
  {
    q: "Is your brand presented consistently across digital channels?",
    area: "Professional Branding",
  },
];

function AssessmentPage() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [done, setDone] = useState(false);

  const noCount = questions.filter((_, i) => answers[i] === false).length;
  const opportunity = noCount >= 4 ? "High" : noCount >= 2 ? "Moderate" : "Low";
  const recommended = questions.filter((_, i) => answers[i] === false).map((q) => q.area);
  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold sm:text-4xl">Business Assessment</h1>
      <p className="mt-4 text-muted-foreground">
        Six quick questions to discover where your business could benefit from digital solutions.
      </p>

      {done ? (
        <div className="card-surface mt-10 p-8 sm:p-10">
          <span className="text-xs font-semibold tracking-wide text-accent uppercase">
            Your result
          </span>
          <h2 className="mt-2 text-2xl font-semibold">
            Digital Growth Opportunity:{" "}
            <span className="brand-gradient-text">{opportunity}</span>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            {recommended.length > 0
              ? "Based on your answers, these are the areas where Afripixel could help most:"
              : "Your business is in strong digital shape. We can help you scale even further."}
          </p>
          <ul className="mt-5 space-y-2 text-sm">
            {(recommended.length > 0
              ? recommended
              : ["Website refinement", "Automation", "Scalable digital systems"]
            ).map((r) => (
              <li key={r} className="flex items-center gap-3">
                <Check className="h-4 w-4 shrink-0 text-accent" /> {r}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="hero" size="lg" asChild>
              <Link to="/industries">Explore Recommended Solutions</Link>
            </Button>
            <RequestDialog>
              <Button variant="outline" size="lg">
                Request a Solution
              </Button>
            </RequestDialog>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => {
                setAnswers({});
                setDone(false);
              }}
            >
              <RotateCcw className="h-4 w-4" /> Restart
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-10 space-y-4">
            {questions.map((q, i) => (
              <div
                key={q.q}
                className="grid gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
              >
                <p className="min-w-0 text-sm font-medium">{q.q}</p>
                <div className="flex gap-2">
                  <Button
                    variant={answers[i] === true ? "accent" : "outline"}
                    size="sm"
                    onClick={() => setAnswers((a) => ({ ...a, [i]: true }))}
                  >
                    Yes
                  </Button>
                  <Button
                    variant={answers[i] === false ? "accent" : "outline"}
                    size="sm"
                    onClick={() => setAnswers((a) => ({ ...a, [i]: false }))}
                  >
                    No
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="hero"
            size="xl"
            className="mt-8 w-full sm:w-auto"
            disabled={!allAnswered}
            onClick={() => setDone(true)}
          >
            {allAnswered ? "See My Result" : "Answer all questions to continue"}
          </Button>
        </>
      )}
    </div>
  );
}
