import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAuth } from "@/lib/auth-middleware";
import type { DemoRow } from "@/lib/db-types";

export const listDemosAdmin = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async (): Promise<DemoRow[]> => {
    const { mapDemo, mysqlErrorMessage, query } = await import("@/lib/db.server");
    try {
      const rows = await query<Parameters<typeof mapDemo>[0]>(
        "SELECT id, slug, name, industry_slug, description, demo_url, featured, sort_order, created_at, updated_at FROM demos ORDER BY sort_order ASC, name ASC",
      );
      return rows.map(mapDemo);
    } catch (error) {
      throw new Error(mysqlErrorMessage(error));
    }
  });

const demoWriteSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(160)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only"),
  name: z.string().trim().min(1).max(160),
  industry_slug: z.string().trim().min(1).max(120),
  description: z.string().trim().max(500).optional().default(""),
  demo_url: z.string().trim().url().max(300),
  featured: z.boolean().optional().default(false),
  sort_order: z.number().int().optional().default(0),
});

export const createDemo = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((data: unknown) => demoWriteSchema.parse(data))
  .handler(async ({ data }): Promise<DemoRow> => {
    const { mapDemo, mysqlErrorMessage, exec, queryOne } = await import("@/lib/db.server");
    const id = crypto.randomUUID();
    try {
      await exec(
        "INSERT INTO demos (id, slug, name, industry_slug, description, demo_url, featured, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          id,
          data.slug,
          data.name,
          data.industry_slug,
          data.description,
          data.demo_url,
          data.featured ? 1 : 0,
          data.sort_order,
        ],
      );
      const row = await queryOne<Parameters<typeof mapDemo>[0]>(
        "SELECT id, slug, name, industry_slug, description, demo_url, featured, sort_order, created_at, updated_at FROM demos WHERE id = ?",
        [id],
      );
      if (!row) throw new Error("Demo was created but could not be loaded.");
      return mapDemo(row);
    } catch (error) {
      throw new Error(mysqlErrorMessage(error));
    }
  });

const demoUpdateSchema = demoWriteSchema.extend({
  id: z.string().uuid(),
});

export const updateDemo = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((data: unknown) => demoUpdateSchema.parse(data))
  .handler(async ({ data }): Promise<DemoRow> => {
    const { mapDemo, mysqlErrorMessage, exec, queryOne } = await import("@/lib/db.server");
    const { id, ...fields } = data;
    try {
      await exec(
        "UPDATE demos SET slug = ?, name = ?, industry_slug = ?, description = ?, demo_url = ?, featured = ?, sort_order = ? WHERE id = ?",
        [
          fields.slug,
          fields.name,
          fields.industry_slug,
          fields.description,
          fields.demo_url,
          fields.featured ? 1 : 0,
          fields.sort_order,
          id,
        ],
      );
      const row = await queryOne<Parameters<typeof mapDemo>[0]>(
        "SELECT id, slug, name, industry_slug, description, demo_url, featured, sort_order, created_at, updated_at FROM demos WHERE id = ?",
        [id],
      );
      if (!row) throw new Error("Demo not found.");
      return mapDemo(row);
    } catch (error) {
      throw new Error(mysqlErrorMessage(error));
    }
  });

const deleteSchema = z.object({ id: z.string().uuid() });

export const deleteDemo = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((data: unknown) => deleteSchema.parse(data))
  .handler(async ({ data }) => {
    const { exec, mysqlErrorMessage } = await import("@/lib/db.server");
    try {
      await exec("DELETE FROM demos WHERE id = ?", [data.id]);
      return { ok: true as const };
    } catch (error) {
      throw new Error(mysqlErrorMessage(error));
    }
  });
