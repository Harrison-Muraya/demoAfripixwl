import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { Demo, Industry, SiteContent } from "@/lib/site-content";

// Public, read-only content for the marketing site. Uses the publishable key
// (anon) so it works during SSR/prerender with no session — the industries and
// demos tables have public read policies.
export const getSiteContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteContent> => {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const supabasePublic = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
            h.delete("Authorization");
          }
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const [industriesRes, demosRes] = await Promise.all([
      supabasePublic
        .from("industries")
        .select("slug, name, description, blurb")
        .order("sort_order", { ascending: true }),
      supabasePublic
        .from("demos")
        .select("slug, name, industry_slug, description, demo_url, featured")
        .order("sort_order", { ascending: true }),
    ]);

    if (industriesRes.error) throw new Error(industriesRes.error.message);
    if (demosRes.error) throw new Error(demosRes.error.message);

    const industries: Industry[] = industriesRes.data ?? [];
    const industryName = new Map(industries.map((i) => [i.slug, i.name]));

    const demos: Demo[] = (demosRes.data ?? []).map((d) => ({
      slug: d.slug,
      name: d.name,
      industrySlug: d.industry_slug,
      industry: industryName.get(d.industry_slug) ?? d.industry_slug,
      description: d.description,
      demoUrl: d.demo_url,
      featured: d.featured,
    }));

    return { industries, demos };
  },
);
