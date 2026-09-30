import { describe, expect, it } from "vitest";
import { contentHelpers, emptyContent, type Demo, type Industry } from "./site-content";

const industries: Industry[] = [
  {
    slug: "education-training",
    name: "Education & Training",
    description: "Schools and academies",
    blurb: "Explore education projects.",
  },
];

const demos: Demo[] = [
  {
    slug: "grammarspire",
    name: "GrammarSpire",
    industrySlug: "education-training",
    industry: "Education & Training",
    description: "A learning portal",
    demoUrl: "https://grammarspire.example.com",
    featured: true,
  },
  {
    slug: "other",
    name: "Other",
    industrySlug: "retail-ecommerce",
    industry: "Retail & E-commerce",
    description: "A shop",
    demoUrl: "https://other.example.com",
    featured: false,
  },
];

describe("contentHelpers", () => {
  const helpers = contentHelpers({ industries, demos });

  it("looks up industries and demos by slug", () => {
    expect(helpers.getIndustry("education-training")?.name).toBe("Education & Training");
    expect(helpers.getIndustry("missing")).toBeUndefined();
    expect(helpers.getDemo("grammarspire")?.name).toBe("GrammarSpire");
    expect(helpers.getDemo("missing")).toBeUndefined();
  });

  it("filters demos by industry and featured flag", () => {
    expect(helpers.demosFor("education-training").map((demo) => demo.slug)).toEqual([
      "grammarspire",
    ]);
    expect(helpers.featuredDemos().map((demo) => demo.slug)).toEqual(["grammarspire"]);
  });

  it("starts from an empty catalogue", () => {
    const empty = contentHelpers(emptyContent);
    expect(empty.industries).toEqual([]);
    expect(empty.demos).toEqual([]);
    expect(empty.featuredDemos()).toEqual([]);
  });
});
