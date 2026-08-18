import { useEffect, useState, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Plus, Pencil, Trash2, Star } from "lucide-react";
import { AdminShell } from "@/components/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
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
import { listDemosAdmin, createDemo, updateDemo, deleteDemo } from "@/lib/admin-demos.functions";
import { listIndustriesAdmin } from "@/lib/admin-industries.functions";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/admin/demos")({
  head: () => ({
    meta: [{ title: "Manage Demos — Admin — Afripixel" }],
  }),
  component: AdminDemos,
});

type Demo = Tables<"demos">;
type Industry = Tables<"industries">;

function AdminDemos() {
  return (
    <AdminShell>
      <DemosManager />
    </AdminShell>
  );
}

function DemosManager() {
  const list = useServerFn(listDemosAdmin);
  const listIndustries = useServerFn(listIndustriesAdmin);
  const create = useServerFn(createDemo);
  const update = useServerFn(updateDemo);
  const remove = useServerFn(deleteDemo);

  const [rows, setRows] = useState<Demo[] | null>(null);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Demo | "new" | null>(null);
  const [deleting, setDeleting] = useState<Demo | null>(null);
  const [saving, setSaving] = useState(false);
  const [featuredDraft, setFeaturedDraft] = useState(false);
  const [industrySlugDraft, setIndustrySlugDraft] = useState("");

  const refetch = useCallback(async () => {
    try {
      const [demoRows, industryRows] = await Promise.all([list(), listIndustries()]);
      setRows(demoRows);
      setIndustries(industryRows);
      setLoadError(null);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Could not load demos.");
    }
  }, [list, listIndustries]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const industryName = (slug: string) => industries.find((i) => i.slug === slug)?.name ?? slug;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Demos</h2>
        <Button
          size="sm"
          variant="hero"
          onClick={() => {
            setFeaturedDraft(false);
            setIndustrySlugDraft("");
            setEditing("new");
          }}
        >
          <Plus className="h-4 w-4" /> Add demo
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
                <TableHead>Industry</TableHead>
                <TableHead className="hidden md:table-cell">URL</TableHead>
                <TableHead className="w-20">Featured</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {industryName(row.industry_slug)}
                  </TableCell>
                  <TableCell className="hidden max-w-xs truncate text-muted-foreground md:table-cell">
                    {row.demo_url}
                  </TableCell>
                  <TableCell>
                    {row.featured ? <Star className="h-4 w-4 fill-primary text-primary" /> : null}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setFeaturedDraft(row.featured);
                          setIndustrySlugDraft(row.industry_slug);
                          setEditing(row);
                        }}
                      >
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
                  <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                    No demos yet.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </div>
      ) : null}

      <Dialog open={editing !== null} onOpenChange={(v) => !v && setEditing(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing === "new" ? "Add demo" : "Edit demo"}</DialogTitle>
            <DialogDescription>
              {editing === "new" ? "Add a new demo project." : "Update this demo's details."}
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
                industry_slug: industrySlugDraft,
                description: String(fd.get("description") ?? "").trim(),
                demo_url: String(fd.get("demo_url") ?? "").trim(),
                featured: featuredDraft,
                sort_order: Number(fd.get("sort_order") ?? 0),
              };
              setSaving(true);
              try {
                if (editing === "new") {
                  await create({ data: payload });
                  toast.success("Demo created.");
                } else {
                  await update({ data: { id: editing.id, ...payload } });
                  toast.success("Demo updated.");
                }
                setEditing(null);
                await refetch();
              } catch (err) {
                toast.error(err instanceof Error ? err.message : "Could not save demo.");
              } finally {
                setSaving(false);
              }
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="d-name">Name</Label>
              <Input
                id="d-name"
                name="name"
                required
                defaultValue={editing !== "new" ? editing?.name : ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="d-slug">Slug</Label>
              <Input
                id="d-slug"
                name="slug"
                required
                placeholder="malel-heights"
                defaultValue={editing !== "new" ? editing?.slug : ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="d-industry">Industry</Label>
              <Select value={industrySlugDraft} onValueChange={setIndustrySlugDraft}>
                <SelectTrigger id="d-industry">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((i) => (
                    <SelectItem key={i.slug} value={i.slug}>
                      {i.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="d-url">Live demo URL</Label>
              <Input
                id="d-url"
                name="demo_url"
                type="url"
                required
                placeholder="https://example.afripixelprojects.com"
                defaultValue={editing !== "new" ? editing?.demo_url : ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="d-description">Description</Label>
              <Textarea
                id="d-description"
                name="description"
                rows={3}
                defaultValue={editing !== "new" ? editing?.description : ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="d-sort">Sort order</Label>
              <Input
                id="d-sort"
                name="sort_order"
                type="number"
                defaultValue={editing !== "new" ? editing?.sort_order : 0}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <Label htmlFor="d-featured" className="cursor-pointer">
                Show in Featured Projects
              </Label>
              <Switch id="d-featured" checked={featuredDraft} onCheckedChange={setFeaturedDraft} />
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
            <AlertDialogDescription>This can&apos;t be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (!deleting) return;
                try {
                  await remove({ data: { id: deleting.id } });
                  toast.success("Demo deleted.");
                  setDeleting(null);
                  await refetch();
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : "Could not delete demo.");
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
