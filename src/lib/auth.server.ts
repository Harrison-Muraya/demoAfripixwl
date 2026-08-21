import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { mysqlErrorMessage, queryOne } from "@/lib/db.server";
import type { AdminUserRow } from "@/lib/db-types";

const TOKEN_TTL = "7d";

function getAuthSecret() {
  const secret = process.env["AUTH_SECRET"];
  if (!secret || secret.length < 16) {
    throw new Error(
      "AUTH_SECRET is not configured (or is too short). Add a long random value to .env.",
    );
  }
  return new TextEncoder().encode(secret);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function signAdminToken(userId: string, email: string): Promise<string> {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(TOKEN_TTL)
    .sign(getAuthSecret());
}

export async function verifyAdminToken(token: string): Promise<{ userId: string; email: string }> {
  try {
    const { payload } = await jwtVerify(token, getAuthSecret());
    const userId = payload.sub;
    const email = payload["email"];
    if (!userId || typeof email !== "string") {
      throw new Error("Unauthorized: Invalid token");
    }
    return { userId, email };
  } catch {
    throw new Error("Unauthorized: Invalid token");
  }
}

export async function loginWithPassword(email: string, password: string) {
  const normalized = email.trim().toLowerCase();
  let user: AdminUserRow | null;
  try {
    user = await queryOne<AdminUserRow>(
      "SELECT id, email, password_hash, created_at FROM admin_users WHERE email = ? LIMIT 1",
      [normalized],
    );
  } catch (error) {
    throw new Error(mysqlErrorMessage(error));
  }

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    throw new Error("Invalid email or password.");
  }

  const token = await signAdminToken(user.id, user.email);
  return { token, email: user.email };
}
