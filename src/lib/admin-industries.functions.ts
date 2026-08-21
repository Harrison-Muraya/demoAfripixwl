import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAuth } from "@/lib/auth-middleware";
import type { IndustryRow } from "@/lib/db-types";

export const listIndustriesAdmin = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async (): Promise<IndustryRow[]> => {
    const { mapIndustry, mysqlErrorMessage, query } = await import("@/lib/db.server");
    try {
      const rows = await query<Parameters<typeof mapIndustry>[0]>(
        "SELECT id, slug, name, description, blurb, sort_order, created_at, updated_at FROM industries ORDER BY sort_order ASC, name ASC",
      );
      return rows.map(mapIndustry);
    } catch (error) {
      throw new Error(mysqlErrorMessage(error));
    }
  });

const industryWriteSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only"),
  name: z.string().trim().min(1).max(120),
  description: z.string().trim().max(500).optional().default(""),
  blurb: z.string().trim().max(200).optional().default(""),
  sort_order: z.number().int().optional().default(0),
});

export const createIndustry = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((data: unknown) => industryWriteSchema.parse(data))
  .handler(async ({ data }): Promise<IndustryRow> => {
    const { mapIndustry, mysqlErrorMessage, exec, queryOne } = await import("@/lib/db.server");
    const id = crypto.randomUUID();
    try {
      await exec(
        "INSERT INTO industries (id, slug, name, description, blurb, sort_order) VALUES (?, ?, ?, ?, ?, ?)",
        [id, data.slug, data.name, data.description, data.blurb, data.sort_order],
      );
      const row = await queryOne<Parameters<typeof mapIndustry>[0]>(
        "SELECT id, slug, name, description, blurb, sort_order, created_at, updated_at FROM industries WHERE id = ?",
        [id],
      );
      if (!row) throw new Error("Industry was created but could not be loaded.");
      return mapIndustry(row);
    } catch (error) {
      throw new Error(mysqlErrorMessage(error));
    }
  });

const industryUpdateSchema = industryWriteSchema.extend({
  id: z.string().uuid(),
});

export const updateIndustry = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((data: unknown) => industryUpdateSchema.parse(data))
  .handler(async ({ data }): Promise<IndustryRow> => {
    const { mapIndustry, mysqlErrorMessage, exec, queryOne } = await import("@/lib/db.server");
    const { id, ...fields } = data;
    try {
      await exec(
        "UPDATE industries SET slug = ?, name = ?, description = ?, blurb = ?, sort_order = ? WHERE id = ?",
        [fields.slug, fields.name, fields.description, fields.blurb, fields.sort_order, id],
      );
      const row = await queryOne<Parameters<typeof mapIndustry>[0]>(
        "SELECT id, slug, name, description, blurb, sort_order, created_at, updated_at FROM industries WHERE id = ?",
        [id],
      );
      if (!row) throw new Error("Industry not found.");
      return mapIndustry(row);
    } catch (error) {
      throw new Error(mysqlErrorMessage(error));
    }
  });

const deleteSchema = z.object({ id: z.string().uuid() });

export const deleteIndustry = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((data: unknown) => deleteSchema.parse(data))
  .handler(async ({ data }) => {
    const { exec, mysqlErrorMessage } = await import("@/lib/db.server");
    try {
      await exec("DELETE FROM industries WHERE id = ?", [data.id]);
      return { ok: true as const };
    } catch (error) {
      throw new Error(mysqlErrorMessage(error));
    }
  });
