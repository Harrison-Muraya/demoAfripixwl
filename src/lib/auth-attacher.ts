import { createMiddleware } from "@tanstack/react-start";
import { getAdminSession } from "@/lib/auth-client";

export const attachAuth = createMiddleware({ type: "function" }).client(async ({ next }) => {
  const session = getAdminSession();
  return next({
    headers: session?.token ? { Authorization: `Bearer ${session.token}` } : {},
  });
});
