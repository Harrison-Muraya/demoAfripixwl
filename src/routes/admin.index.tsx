import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AdminShell } from "@/components/AdminShell";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Admin — Afripixel" }],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <AdminShell>
      <div className="grid gap-5 sm:grid-cols-2">
        <Link to="/admin/industries" className="card-surface group flex flex-col p-6">
          <h2 className="text-lg font-semibold">Industries</h2>
          <p className="mt-2 flex-1 text-sm text-muted-foreground">
            Add, edit, reorder or remove the industries shown on the site.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            Manage industries
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
        <Link to="/admin/demos" className="card-surface group flex flex-col p-6">
          <h2 className="text-lg font-semibold">Demos</h2>
          <p className="mt-2 flex-1 text-sm text-muted-foreground">
            Add, edit, feature or remove individual demo projects.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            Manage demos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </AdminShell>
  );
}
