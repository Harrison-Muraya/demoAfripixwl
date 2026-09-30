import { describe, expect, it } from "vitest";
import {
  demos,
  demosFor,
  featuredDemos,
  featuredSlugs,
  getDemo,
  getIndustry,
  industries,
} from "./demos";
import { industryIcons } from "@/lib/industry-icons";

describe("demo catalogue", () => {
  it("keeps industry and demo slugs unique", () => {
    const industrySlugs = industries.map((industry) => industry.slug);
    const demoSlugs = demos.map((demo) => demo.slug);
    expect(new Set(industrySlugs).size).toBe(industrySlugs.length);
    expect(new Set(demoSlugs).size).toBe(demoSlugs.length);
  });

  it("links every demo to a known industry name", () => {
    for (const demo of demos) {
      const industry = getIndustry(demo.industrySlug);
      expect(industry, demo.slug).toBeDefined();
      expect(demo.industry).toBe(industry?.name);
      expect(demo.demoUrl.startsWith("https://")).toBe(true);
    }
  });

  it("gives every industry at least one demo and an icon", () => {
    for (const industry of industries) {
      expect(demosFor(industry.slug).length, industry.slug).toBeGreaterThan(0);
      expect(industryIcons[industry.slug], industry.slug).toBeTypeOf("object");
    }
  });

  it("resolves the featured demos in catalogue order", () => {
    expect(new Set(featuredSlugs).size).toBe(featuredSlugs.length);
    const featured = featuredDemos();
    expect(featured.map((demo) => demo.slug)).toEqual(featuredSlugs);
    expect(getDemo("missing-demo")).toBeUndefined();
  });
});
