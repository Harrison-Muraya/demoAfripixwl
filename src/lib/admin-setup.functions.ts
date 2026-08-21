import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { industries as staticIndustries, demos as staticDemos, featuredSlugs } from "@/data/demos";

const setupSchema = z.object({
  setupSecret: z.string().trim().min(1),
  adminEmail: z.string().trim().email().max(200),
  adminPassword: z.string().min(8).max(200),
});

// One-time setup: creates MySQL tables if needed, seeds industries/demos from
// the static data this project used to run on, and creates the admin account.
// Safe to call more than once — it only inserts data/creates the user if they
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

    const { exec, getPool, mysqlErrorMessage, query, queryOne } = await import("@/lib/db.server");
    const { hashPassword } = await import("@/lib/auth.server");

    const results = {
      industriesInserted: 0,
      demosInserted: 0,
      adminUserCreated: false,
      adminUserAlreadyExisted: false,
    };

    try {
      await getPool();

      const industryCountRows = await query<{ count: number }>(
        "SELECT COUNT(*) AS count FROM industries",
      );
      const industryCount = Number(industryCountRows[0]?.count ?? 0);

      if (!industryCount) {
        for (const [index, industry] of staticIndustries.entries()) {
          await exec(
            "INSERT INTO industries (id, slug, name, description, blurb, sort_order) VALUES (?, ?, ?, ?, ?, ?)",
            [
              crypto.randomUUID(),
              industry.slug,
              industry.name,
              industry.description,
              industry.blurb,
              index,
            ],
          );
        }
        results.industriesInserted = staticIndustries.length;

        for (const [index, demo] of staticDemos.entries()) {
          await exec(
            "INSERT INTO demos (id, slug, name, industry_slug, description, demo_url, featured, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
              crypto.randomUUID(),
              demo.slug,
              demo.name,
              demo.industrySlug,
              demo.description,
              demo.demoUrl,
              featuredSlugs.includes(demo.slug) ? 1 : 0,
              index,
            ],
          );
        }
        results.demosInserted = staticDemos.length;
      }

      const email = data.adminEmail.trim().toLowerCase();
      const existing = await queryOne<{ id: string }>(
        "SELECT id FROM admin_users WHERE email = ? LIMIT 1",
        [email],
      );

      if (existing) {
        results.adminUserAlreadyExisted = true;
      } else {
        await exec("INSERT INTO admin_users (id, email, password_hash) VALUES (?, ?, ?)", [
          crypto.randomUUID(),
          email,
          await hashPassword(data.adminPassword),
        ]);
        results.adminUserCreated = true;
      }
    } catch (error) {
      throw new Error(mysqlErrorMessage(error));
    }

    return results;
  });
