import { useLoaderData } from "@tanstack/react-router";

export type Industry = {
  slug: string;
  name: string;
  description: string;
  blurb: string;
};

export type Demo = {
  slug: string;
  name: string;
  industrySlug: string;
  industry: string;
  description: string;
  demoUrl: string;
  featured: boolean;
};

export type SiteContent = {
  industries: Industry[];
  demos: Demo[];
};

export const emptyContent: SiteContent = { industries: [], demos: [] };

export function contentHelpers(content: SiteContent) {
  const { industries, demos } = content;
  return {
    industries,
    demos,
    getIndustry: (slug: string) => industries.find((i) => i.slug === slug),
    getDemo: (slug: string) => demos.find((d) => d.slug === slug),
    demosFor: (industrySlug: string) => demos.filter((d) => d.industrySlug === industrySlug),
    featuredDemos: () => demos.filter((d) => d.featured),
  };
}

// Site content is loaded once in the root route loader.
export function useSiteContent() {
  const data = useLoaderData({ from: "__root__" }) as SiteContent | undefined;
  return contentHelpers(data ?? emptyContent);
}
