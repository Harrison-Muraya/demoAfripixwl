import bcrypt from "bcryptjs";
import { afterEach, describe, expect, it } from "vitest";
import { hashPassword, signAdminToken, verifyAdminToken } from "./auth.server";

const SECRET = "ci-test-auth-secret-value";

describe("admin auth tokens", () => {
  afterEach(() => {
    delete process.env["AUTH_SECRET"];
  });

  it("signs a token that verifies back to the same admin", async () => {
    process.env["AUTH_SECRET"] = SECRET;
    const token = await signAdminToken("user-1", "admin@example.com");
    await expect(verifyAdminToken(token)).resolves.toEqual({
      userId: "user-1",
      email: "admin@example.com",
    });
  });

  it("rejects a token that was not signed with the configured secret", async () => {
    process.env["AUTH_SECRET"] = SECRET;
    await expect(verifyAdminToken("not-a-jwt")).rejects.toThrow("Unauthorized: Invalid token");
  });

  it("refuses to sign tokens when AUTH_SECRET is missing or too short", async () => {
    process.env["AUTH_SECRET"] = "short";
    await expect(signAdminToken("user-1", "admin@example.com")).rejects.toThrow(/AUTH_SECRET/);
  });
});

describe("hashPassword", () => {
  it("stores a bcrypt hash that matches only the original password", async () => {
    const hash = await hashPassword("correct horse");
    expect(hash).not.toBe("correct horse");
    expect(await bcrypt.compare("correct horse", hash)).toBe(true);
    expect(await bcrypt.compare("wrong", hash)).toBe(false);
  });
});
