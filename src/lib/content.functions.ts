import { createServerFn } from "@tanstack/react-start";
import type { Demo, Industry, SiteContent } from "@/lib/site-content";

export const getSiteContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteContent> => {
    const { mapDemo, mapIndustry, mysqlErrorMessage, query } = await import("@/lib/db.server");

    try {
      const [industryRows, demoRows] = await Promise.all([
        query<{
          slug: string;
          name: string;
          description: string;
          blurb: string;
          id: string;
          sort_order: number;
          created_at: Date | string;
          updated_at: Date | string;
        }>(
          "SELECT id, slug, name, description, blurb, sort_order, created_at, updated_at FROM industries ORDER BY sort_order ASC, name ASC",
        ),
        query<{
          slug: string;
          name: string;
          industry_slug: string;
          description: string;
          demo_url: string;
          featured: number | boolean;
          id: string;
          sort_order: number;
          created_at: Date | string;
          updated_at: Date | string;
        }>(
          "SELECT id, slug, name, industry_slug, description, demo_url, featured, sort_order, created_at, updated_at FROM demos ORDER BY sort_order ASC, name ASC",
        ),
      ]);

      const industries: Industry[] = industryRows.map(mapIndustry).map((row) => ({
        slug: row.slug,
        name: row.name,
        description: row.description,
        blurb: row.blurb,
      }));
      const industryName = new Map(industries.map((i) => [i.slug, i.name]));

      const demos: Demo[] = demoRows.map(mapDemo).map((d) => ({
        slug: d.slug,
        name: d.name,
        industrySlug: d.industry_slug,
        industry: industryName.get(d.industry_slug) ?? d.industry_slug,
        description: d.description,
        demoUrl: d.demo_url,
        featured: d.featured,
      }));

      return { industries, demos };
    } catch (error) {
      throw new Error(mysqlErrorMessage(error));
    }
  },
);
