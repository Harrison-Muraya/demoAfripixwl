import { afterAll, describe, expect, it } from "vitest";
import { renderErrorPage } from "./error-page";

const originalConsoleError = console.error;
const { consumeLastCapturedError, describeError } = await import("./error-capture");

afterAll(() => {
  console.error = originalConsoleError;
});

describe("describeError", () => {
  it("keeps the message, status, and cause chain", () => {
    const root = new Error("database offline");
    const top = new Error("request failed", { cause: root }) as Error & { status: number };
    top.status = 503;

    const description = describeError(top);
    expect(description).toContain("request failed");
    expect(description).toContain("(status 503)");
    expect(description).toContain("caused by: ");
    expect(description).toContain("database offline");
  });

  it("caps very long descriptions", () => {
    expect(describeError("x".repeat(9_000)).length).toBe(8_000);
  });
});

describe("consumeLastCapturedError", () => {
  it("returns the last logged error once", () => {
    console.error(new Error("boom"));
    const captured = consumeLastCapturedError();
    expect(captured).toBeInstanceOf(Error);
    expect((captured as Error).message).toBe("boom");
    expect(consumeLastCapturedError()).toBeUndefined();
  });
});

describe("renderErrorPage", () => {
  it("offers a retry and a link home", () => {
    const html = renderErrorPage();
    expect(html).toContain("This page didn't load");
    expect(html).toContain('href="/"');
    expect(html).toContain("location.reload()");
  });
});
