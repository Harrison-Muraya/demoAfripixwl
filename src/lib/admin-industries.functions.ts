import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const listIndustriesAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("industries")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return data;
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
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => industryWriteSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("industries")
      .insert(data)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

const industryUpdateSchema = industryWriteSchema.extend({
  id: z.string().uuid(),
});

export const updateIndustry = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => industryUpdateSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { id, ...fields } = data;
    const { data: row, error } = await context.supabase
      .from("industries")
      .update(fields)
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

const deleteSchema = z.object({ id: z.string().uuid() });

export const deleteIndustry = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => deleteSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("industries").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
