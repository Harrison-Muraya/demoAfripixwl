const STORAGE_KEY = "afripixel_admin_session";

export type AdminSession = {
  token: string;
  email: string;
};

export function getAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<AdminSession>;
    if (typeof parsed.token !== "string" || typeof parsed.email !== "string") return null;
    return { token: parsed.token, email: parsed.email };
  } catch {
    return null;
  }
}

export function setAdminSession(session: AdminSession | null) {
  if (typeof window === "undefined") return;
  if (session) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
  window.dispatchEvent(new Event("admin-session-change"));
}
