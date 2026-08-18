import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { industries as staticIndustries, demos as staticDemos, featuredSlugs } from "@/data/demos";

const setupSchema = z.object({
  setupSecret: z.string().trim().min(1),
  adminEmail: z.string().trim().email().max(200),
  adminPassword: z.string().min(8).max(200),
});

// One-time setup: seeds the industries/demos tables from the static data
// this project used to run on, and creates the single admin account. Safe
// to call more than once — it only inserts data/creates the user if they
// don't already exist. Gated by ADMIN_SETUP_SECRET so it isn't a public
// "create any account" endpoint; there is no self-serve admin sign-up.
export const runAdminSetup = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => setupSchema.parse(data))
  .handler(async ({ data }) => {
    const expectedSecret = process.env["ADMIN_SETUP_SECRET"];
    if (!expectedSecret) {
      throw new Error(
        "ADMIN_SETUP_SECRET is not configured on the server. Add it as an environment variable before running setup.",
      );
    }
    if (data.setupSecret !== expectedSecret) {
      throw new Error("Incorrect setup secret.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const results = {
      industriesInserted: 0,
      demosInserted: 0,
      adminUserCreated: false,
      adminUserAlreadyExisted: false,
    };

    const { count: industryCount, error: countError } = await supabaseAdmin
      .from("industries")
      .select("*", { count: "exact", head: true });
    if (countError) throw new Error(`Could not read industries table: ${countError.message}`);

    if (!industryCount) {
      const { error: industriesError } = await supabaseAdmin.from("industries").insert(
        staticIndustries.map((industry, index) => ({
          slug: industry.slug,
          name: industry.name,
          description: industry.description,
          blurb: industry.blurb,
          sort_order: index,
        })),
      );
      if (industriesError) throw new Error(`Could not seed industries: ${industriesError.message}`);
      results.industriesInserted = staticIndustries.length;

      const { error: demosError } = await supabaseAdmin.from("demos").insert(
        staticDemos.map((demo, index) => ({
          slug: demo.slug,
          name: demo.name,
          industry_slug: demo.industrySlug,
          description: demo.description,
          demo_url: demo.demoUrl,
          featured: featuredSlugs.includes(demo.slug),
          sort_order: index,
        })),
      );
      if (demosError) throw new Error(`Could not seed demos: ${demosError.message}`);
      results.demosInserted = staticDemos.length;
    }

    const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    if (listError) throw new Error(`Could not check existing admin users: ${listError.message}`);

    const alreadyExists = existingUsers.users.some(
      (u) => u.email?.toLowerCase() === data.adminEmail.toLowerCase(),
    );

    if (alreadyExists) {
      results.adminUserAlreadyExisted = true;
    } else {
      const { error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: data.adminEmail,
        password: data.adminPassword,
        email_confirm: true,
      });
      if (createError) throw new Error(`Could not create admin user: ${createError.message}`);
      results.adminUserCreated = true;
    }

    return results;
  });
