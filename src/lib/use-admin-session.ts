import { useEffect, useState } from "react";
import { getAdminSession, type AdminSession } from "@/lib/auth-client";

export function useAdminSession() {
  const [session, setSession] = useState<AdminSession | null | undefined>(undefined);

  useEffect(() => {
    const sync = () => setSession(getAdminSession());
    sync();
    window.addEventListener("admin-session-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("admin-session-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return {
    session,
    loading: session === undefined,
    isAuthenticated: Boolean(session),
  };
}
