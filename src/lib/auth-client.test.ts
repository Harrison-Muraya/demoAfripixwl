import { afterEach, describe, expect, it, vi } from "vitest";
import { getAdminSession, setAdminSession } from "./auth-client";

function installWindow() {
  const store = new Map<string, string>();
  const dispatchEvent = vi.fn();
  const localStorage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
  };
  vi.stubGlobal("window", { dispatchEvent });
  vi.stubGlobal("localStorage", localStorage);
  return { store, dispatchEvent };
}

describe("admin session storage", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns null when there is no browser storage", () => {
    expect(getAdminSession()).toBeNull();
  });

  it("round-trips a valid session and clears it", () => {
    const { dispatchEvent } = installWindow();
    expect(getAdminSession()).toBeNull();

    setAdminSession({ token: "token-1", email: "admin@example.com" });
    expect(getAdminSession()).toEqual({ token: "token-1", email: "admin@example.com" });
    expect(dispatchEvent).toHaveBeenCalledWith(expect.any(Event));

    setAdminSession(null);
    expect(getAdminSession()).toBeNull();
  });

  it("ignores malformed stored values", () => {
    const { store } = installWindow();
    store.set("afripixel_admin_session", "{not json");
    expect(getAdminSession()).toBeNull();

    store.set("afripixel_admin_session", JSON.stringify({ token: 1, email: "admin@example.com" }));
    expect(getAdminSession()).toBeNull();
  });
});
