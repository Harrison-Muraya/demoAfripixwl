import { describe, expect, it } from "vitest";
import { mapDemo, mapIndustry, mysqlErrorMessage } from "./db.server";

describe("mysqlErrorMessage", () => {
  it("translates known MySQL error codes", () => {
    expect(mysqlErrorMessage({ code: "ECONNREFUSED" })).toMatch(/Could not connect to MySQL/);
    expect(mysqlErrorMessage({ code: "ER_ACCESS_DENIED_ERROR" })).toMatch(
      /rejected the credentials/,
    );
    expect(mysqlErrorMessage({ code: "ER_DUP_ENTRY" })).toMatch(/already in use/);
    expect(mysqlErrorMessage({ code: "ER_NO_REFERENCED_ROW_2" })).toMatch(/does not exist/);
    expect(mysqlErrorMessage({ code: "ER_ROW_IS_REFERENCED" })).toMatch(
      /Cannot delete this industry/,
    );
  });

  it("falls back to the error message, then a generic database error", () => {
    expect(mysqlErrorMessage(new Error("query failed"))).toBe("query failed");
    expect(mysqlErrorMessage("unknown")).toBe("Database error.");
  });
});

describe("row mappers", () => {
  const created = new Date("2026-01-02T03:04:05.000Z");

  it("normalizes industry timestamps to ISO strings", () => {
    const row = mapIndustry({
      id: "industry-1",
      slug: "education-training",
      name: "Education & Training",
      description: "Schools",
      blurb: "Explore education projects.",
      sort_order: 2,
      created_at: created,
      updated_at: "2026-01-03T00:00:00.000Z",
    });

    expect(row.created_at).toBe("2026-01-02T03:04:05.000Z");
    expect(row.updated_at).toBe("2026-01-03T00:00:00.000Z");
  });

  it("coerces the featured flag from MySQL tinyint values", () => {
    const base = {
      id: "demo-1",
      slug: "grammarspire",
      name: "GrammarSpire",
      industry_slug: "education-training",
      description: "A learning portal",
      demo_url: "https://grammarspire.example.com",
      sort_order: 0,
      created_at: created,
      updated_at: created,
    };

    expect(mapDemo({ ...base, featured: 1 }).featured).toBe(true);
    expect(mapDemo({ ...base, featured: 0 }).featured).toBe(false);
  });
});
