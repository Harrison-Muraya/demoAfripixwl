import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{ title: "Admin Login — Afripixel" }],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-16">
      <p className="eyebrow">Afripixel Demo Centre</p>
      <h1 className="mt-3 text-2xl font-semibold">Admin login</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Manage industries and demos shown on the site.
      </p>

      <form
        className="mt-8 grid gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          const fd = new FormData(e.currentTarget);
          const email = String(fd.get("email") ?? "").trim();
          const password = String(fd.get("password") ?? "");
          setSubmitting(true);
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          setSubmitting(false);
          if (signInError) {
            setError(signInError.message);
            return;
          }
          navigate({ to: "/admin" });
        }}
      >
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required autoComplete="username" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
          />
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <Button type="submit" variant="hero" size="lg" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        First time setting this up?{" "}
        <Link to="/admin/setup" className="font-medium text-primary hover:underline">
          Run setup
        </Link>
      </p>
    </div>
  );
}
