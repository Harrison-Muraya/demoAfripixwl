import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2 } from "lucide-react";
import { industries } from "@/data/demos";
import { useServerFn } from "@tanstack/react-start";
import { submitSolutionRequest } from "@/lib/solution-request.functions";
import { toast } from "sonner";

type Props = {
  children: ReactNode;
  defaultProject?: string;
  defaultIndustry?: string;
};

export function RequestDialog({ children, defaultProject = "", defaultIndustry = "" }: Props) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const send = useServerFn(submitSolutionRequest);


  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setTimeout(() => setSent(false), 250);
      }}
    >
      <span onClick={() => setOpen(true)} className="contents">
        {children}
      </span>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        {sent ? (
          <div className="flex flex-col items-center gap-4 py-10 text-center">
            <CheckCircle2 className="h-12 w-12 text-accent" />
            <h3 className="text-xl font-semibold">Thank you! Your request has been received.</h3>
            <p className="text-sm text-muted-foreground">
              An Afripixel consultant will get back to you shortly.
            </p>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Request Something Similar</DialogTitle>
              <DialogDescription>
                Tell us about your business and we will tailor a solution for you.
              </DialogDescription>
            </DialogHeader>
            <form
              className="grid gap-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const get = (k: string) => String(fd.get(k) ?? "").trim();
                setSubmitting(true);
                try {
                  await send({
                    data: {
                      name: get("name"),
                      business: get("business"),
                      email: get("email"),
                      phone: get("phone"),
                      industry: get("industry"),
                      project: get("project"),
                      brief: get("brief"),
                    },
                  });
                  setSent(true);
                } catch {
                  toast.error("We could not send your request. Please try again.");
                } finally {
                  setSubmitting(false);
                }
              }}
            >

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required placeholder="Your full name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="business">Business Name</Label>
                  <Input id="business" name="business" placeholder="Your business" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required placeholder="you@business.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" placeholder="+254 700 000 000" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="industry">Industry</Label>
                <select
                  id="industry"
                  name="industry"
                  defaultValue={defaultIndustry}
                  className="h-9 rounded-md border border-input bg-card px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">Select your industry</option>
                  {industries.map((i) => (
                    <option key={i.slug} value={i.name}>
                      {i.name}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project">Project you&apos;re interested in</Label>
                <Input id="project" name="project" defaultValue={defaultProject} placeholder="e.g. GrammarSpire" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="brief">What would you like us to build?</Label>
                <Textarea id="brief" name="brief" rows={4} placeholder="Describe your idea or challenge" />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  "Request Solution"
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
