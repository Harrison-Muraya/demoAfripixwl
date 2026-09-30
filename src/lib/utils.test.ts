import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("merges conflicting Tailwind classes and drops falsy values", () => {
    const hidden = false;
    expect(cn("px-2 py-1", "px-4", hidden && "hidden")).toBe("py-1 px-4");
  });
});
