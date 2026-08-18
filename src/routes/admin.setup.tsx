import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useServerFn } from "@tanstack/react-start";
import { runAdminSetup } from "@/lib/admin-setup.functions";

export const Route = createFileRoute("/admin/setup")({
  head: () => ({
    meta: [{ title: "Admin Setup — Afripixel" }],
  }),
  component: AdminSetup,
});

function AdminSetup() {
  const run = useServerFn(runAdminSetup);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Awaited<ReturnType<typeof runAdminSetup>> | null>(null);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <p className="eyebrow">One-time setup</p>
      <h1 className="mt-3 text-2xl font-semibold">Set up admin access</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Seeds the industries and demos tables from the site's existing data (only if they're empty)
        and creates the admin account. Safe to run more than once.
      </p>

      {result ? (
        <div className="mt-8 flex flex-col items-start gap-3 rounded-lg border border-border bg-card p-6">
          <CheckCircle2 className="h-8 w-8 text-primary" />
          <p className="text-sm font-medium">Setup complete.</p>
          <ul className="text-sm text-muted-foreground">
            <li>Industries seeded: {result.industriesInserted || "already had data, skipped"}</li>
            <li>Demos seeded: {result.demosInserted || "already had data, skipped"}</li>
            <li>
              Admin account: {result.adminUserCreated ? "created" : "already existed, unchanged"}
            </li>
          </ul>
          <Button variant="hero" size="lg" asChild className="mt-2 w-full">
            <Link to="/admin/login">Go to login</Link>
          </Button>
        </div>
      ) : (
        <form
          className="mt-8 grid gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            const fd = new FormData(e.currentTarget);
            setSubmitting(true);
            try {
              const res = await run({
                data: {
                  setupSecret: String(fd.get("setupSecret") ?? ""),
                  adminEmail: String(fd.get("adminEmail") ?? "").trim(),
                  adminPassword: String(fd.get("adminPassword") ?? ""),
                },
              });
              setResult(res);
            } catch (err) {
              setError(err instanceof Error ? err.message : "Setup failed. Please try again.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="setupSecret">Setup secret</Label>
            <Input id="setupSecret" name="setupSecret" type="password" required />
            <p className="text-xs text-muted-foreground">
              The <code>ADMIN_SETUP_SECRET</code> value configured on the server.
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="adminEmail">Admin email</Label>
            <Input id="adminEmail" name="adminEmail" type="email" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="adminPassword">Admin password</Label>
            <Input id="adminPassword" name="adminPassword" type="password" required minLength={8} />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" variant="hero" size="lg" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Running setup...
              </>
            ) : (
              "Run setup"
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
