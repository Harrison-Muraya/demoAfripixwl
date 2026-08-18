import { useEffect, useState, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { AdminShell } from "@/components/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  listIndustriesAdmin,
  createIndustry,
  updateIndustry,
  deleteIndustry,
} from "@/lib/admin-industries.functions";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/admin/industries")({
  head: () => ({
    meta: [{ title: "Manage Industries — Admin — Afripixel" }],
  }),
  component: AdminIndustries,
});

type Industry = Tables<"industries">;

function AdminIndustries() {
  return (
    <AdminShell>
      <IndustriesManager />
    </AdminShell>
  );
}

function IndustriesManager() {
  const list = useServerFn(listIndustriesAdmin);
  const create = useServerFn(createIndustry);
  const update = useServerFn(updateIndustry);
  const remove = useServerFn(deleteIndustry);

  const [rows, setRows] = useState<Industry[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Industry | "new" | null>(null);
  const [deleting, setDeleting] = useState<Industry | null>(null);
  const [saving, setSaving] = useState(false);

  const refetch = useCallback(async () => {
    try {
      const data = await list();
      setRows(data);
      setLoadError(null);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Could not load industries.");
    }
  }, [list]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Industries</h2>
        <Button size="sm" variant="hero" onClick={() => setEditing("new")}>
          <Plus className="h-4 w-4" /> Add industry
        </Button>
      </div>

      {loadError ? <p className="mt-4 text-sm text-destructive">{loadError}</p> : null}

      {!rows && !loadError ? (
        <div className="mt-8 flex justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : null}

      {rows ? (
        <div className="mt-6 overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell className="text-muted-foreground">{row.slug}</TableCell>
                  <TableCell className="hidden max-w-sm truncate text-muted-foreground md:table-cell">
                    {row.description}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => setEditing(row)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleting(row)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                    No industries yet.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </div>
      ) : null}

      <Dialog open={editing !== null} onOpenChange={(v) => !v && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing === "new" ? "Add industry" : "Edit industry"}</DialogTitle>
            <DialogDescription>
              {editing === "new"
                ? "Create a new industry category."
                : "Update this industry's details."}
            </DialogDescription>
          </DialogHeader>
          <form
            className="grid gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!editing) return;
              const fd = new FormData(e.currentTarget);
              const payload = {
                slug: String(fd.get("slug") ?? "").trim(),
                name: String(fd.get("name") ?? "").trim(),
                description: String(fd.get("description") ?? "").trim(),
                blurb: String(fd.get("blurb") ?? "").trim(),
                sort_order: Number(fd.get("sort_order") ?? 0),
              };
              setSaving(true);
              try {
                if (editing === "new") {
                  await create({ data: payload });
                  toast.success("Industry created.");
                } else {
                  await update({ data: { id: editing.id, ...payload } });
                  toast.success("Industry updated.");
                }
                setEditing(null);
                await refetch();
              } catch (err) {
                toast.error(err instanceof Error ? err.message : "Could not save industry.");
              } finally {
                setSaving(false);
              }
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="i-name">Name</Label>
              <Input
                id="i-name"
                name="name"
                required
                defaultValue={editing !== "new" ? editing?.name : ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="i-slug">Slug</Label>
              <Input
                id="i-slug"
                name="slug"
                required
                placeholder="real-estate-property"
                defaultValue={editing !== "new" ? editing?.slug : ""}
              />
              <p className="text-xs text-muted-foreground">
                Lowercase letters, numbers and hyphens only. Used in the URL.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="i-description">Description</Label>
              <Textarea
                id="i-description"
                name="description"
                rows={3}
                defaultValue={editing !== "new" ? editing?.description : ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="i-blurb">Short blurb</Label>
              <Input
                id="i-blurb"
                name="blurb"
                defaultValue={editing !== "new" ? editing?.blurb : ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="i-sort">Sort order</Label>
              <Input
                id="i-sort"
                name="sort_order"
                type="number"
                defaultValue={editing !== "new" ? editing?.sort_order : 0}
              />
            </div>
            <Button type="submit" variant="hero" disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleting !== null} onOpenChange={(v) => !v && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete &ldquo;{deleting?.name}&rdquo;?</AlertDialogTitle>
            <AlertDialogDescription>
              This can&apos;t be undone. Demos referencing this industry will need to be reassigned
              first, or deletion will fail.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (!deleting) return;
                try {
                  await remove({ data: { id: deleting.id } });
                  toast.success("Industry deleted.");
                  setDeleting(null);
                  await refetch();
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : "Could not delete industry.");
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
