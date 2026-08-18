import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const listDemosAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("demos")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return data;
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
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => demoWriteSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("demos")
      .insert(data)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

const demoUpdateSchema = demoWriteSchema.extend({
  id: z.string().uuid(),
});

export const updateDemo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => demoUpdateSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { id, ...fields } = data;
    const { data: row, error } = await context.supabase
      .from("demos")
      .update(fields)
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

const deleteSchema = z.object({ id: z.string().uuid() });

export const deleteDemo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => deleteSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("demos").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
