import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { parseAuthParams } from "../../src/lib/supabase.js";

describe("parseAuthParams", () => {
  it("returns null for an ordinary page load", () => {
    expect(parseAuthParams("", "")).toBeNull();
    expect(parseAuthParams("#results", "?q=theft")).toBeNull();
  });

  it("reads a confirmation-link session from the hash", () => {
    const hash =
      "#access_token=abc&expires_at=1&expires_in=3600&refresh_token=r&token_type=bearer&type=signup";
    expect(parseAuthParams(hash, "")).toEqual({
      type: "signup",
      hasSession: true,
      error: null,
      errorCode: null,
      errorDescription: null,
    });
  });

  it("reads a password-recovery link", () => {
    const params = parseAuthParams(
      "#access_token=abc&refresh_token=r&expires_in=3600&token_type=bearer&type=recovery",
      "",
    );
    expect(params.type).toBe("recovery");
    expect(params.hasSession).toBe(true);
  });

  it("reads an expired-link error from the hash", () => {
    const hash =
      "#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired";
    expect(parseAuthParams(hash, "")).toEqual({
      type: null,
      hasSession: false,
      error: "access_denied",
      errorCode: "otp_expired",
      errorDescription: "Email link is invalid or has expired",
    });
  });

  it("reads an error from the query string", () => {
    const params = parseAuthParams(
      "",
      "?error=server_error&error_description=Unable+to+exchange+external+code",
    );
    expect(params.error).toBe("server_error");
    expect(params.hasSession).toBe(false);
  });

  it("ignores an access_token that only appears in the query string", () => {
    expect(parseAuthParams("", "?access_token=abc")).toBeNull();
  });
});

describe("auth build flags", () => {
  // supabase.js reads import.meta.env at module load, and Vitest fills that
  // from the developer's .env/.env.local. Clear the vars and load a fresh
  // copy so the result doesn't depend on whose machine runs the suite.
  beforeEach(() => {
    vi.stubEnv("VITE_SUPABASE_URL", undefined);
    vi.stubEnv("VITE_SUPABASE_ANON_KEY", undefined);
    vi.stubEnv("VITE_AUTH_MAGIC_LINK", undefined);
    vi.stubEnv("VITE_AUTH_GOOGLE", undefined);
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("is disabled without Supabase env vars and keeps safe defaults", async () => {
    const { isAuthEnabled, authMethods } = await import(
      "../../src/lib/supabase.js"
    );
    expect(isAuthEnabled).toBe(false);
    expect(authMethods.magicLink).toBe(true);
    expect(authMethods.google).toBe(false);
    expect(Object.isFrozen(authMethods)).toBe(true);
  });
});
