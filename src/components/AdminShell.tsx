import { useEffect, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminSession } from "@/lib/use-admin-session";
import { setAdminSession } from "@/lib/auth-client";

// Wrap any /admin/* page (except login/setup) with this. Redirects to
// /admin/login if there's no active admin session.
export function AdminShell({ children }: { children: ReactNode }) {
  const { loading, isAuthenticated } = useAdminSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate({ to: "/admin/login" });
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading || !isAuthenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="mt-2 text-2xl font-semibold">Demo Centre content</h1>
        </div>
        <nav className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin/industries">Industries</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin/demos">Demos</Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
              setAdminSession(null);
              navigate({ to: "/admin/login" });
            }}
          >
            <LogOut className="h-4 w-4" /> Log out
          </Button>
        </nav>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}
