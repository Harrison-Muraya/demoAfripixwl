import { describe, expect, it } from "vitest";
import { demoWriteSchema } from "./admin-demos.functions";
import { industryWriteSchema } from "./admin-industries.functions";
import { solutionRequestSchema } from "./solution-request.functions";
import { template } from "./email-templates/solution-request";

describe("solution request validation", () => {
  it("accepts a trimmed request and fills optional fields", () => {
    const parsed = solutionRequestSchema.parse({
      name: "  Amina Yusuf  ",
      email: "amina@brightfuture.co.ke",
    });
    expect(parsed).toMatchObject({
      name: "Amina Yusuf",
      email: "amina@brightfuture.co.ke",
      business: "",
      phone: "",
      brief: "",
    });
  });

  it("rejects a missing name or invalid email", () => {
    expect(() =>
      solutionRequestSchema.parse({ name: "  ", email: "amina@brightfuture.co.ke" }),
    ).toThrow();
    expect(() => solutionRequestSchema.parse({ name: "Amina", email: "not-an-email" })).toThrow();
  });
});

describe("admin write validation", () => {
  it("accepts a demo slug and defaults optional fields", () => {
    const parsed = demoWriteSchema.parse({
      slug: "grammar-spire",
      name: "GrammarSpire",
      industry_slug: "education-training",
      demo_url: "https://grammarspire.example.com",
    });
    expect(parsed.featured).toBe(false);
    expect(parsed.sort_order).toBe(0);
    expect(parsed.description).toBe("");
  });

  it("rejects demo slugs that are not lowercase kebab-case", () => {
    expect(() =>
      demoWriteSchema.parse({
        slug: "Grammar Spire",
        name: "GrammarSpire",
        industry_slug: "education-training",
        demo_url: "https://grammarspire.example.com",
      }),
    ).toThrow(/lowercase/);
  });

  it("accepts an industry and defaults empty copy", () => {
    const parsed = industryWriteSchema.parse({
      slug: "education-training",
      name: "Education & Training",
    });
    expect(parsed.description).toBe("");
    expect(parsed.blurb).toBe("");
    expect(parsed.sort_order).toBe(0);
  });
});

describe("solution request email subject", () => {
  it("includes the sender and project when they are present", () => {
    expect(template.subject({ name: "Amina", project: "GrammarSpire" })).toBe(
      "New solution request from Amina — GrammarSpire",
    );
    expect(template.subject({})).toBe("New solution request");
  });
});
