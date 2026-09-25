import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Read what an email link or OAuth redirect put in the URL. Supabase's
 * implicit flow returns `#access_token=…&type=signup|magiclink|recovery…` on
 * success and `#error=…&error_code=otp_expired&error_description=…` (hash or
 * query) on failure. The client clears the hash once it has the session, so
 * this has to run at module load, before anything else touches the URL.
 */
export function parseAuthParams(hash = "", search = "") {
  const fromHash = new URLSearchParams(String(hash).replace(/^#/, ""));
  const fromQuery = new URLSearchParams(String(search).replace(/^\?/, ""));
  const get = (key) => fromHash.get(key) ?? fromQuery.get(key);

  const error = get("error");
  const errorCode = get("error_code");
  const errorDescription = get("error_description");
  const hasSession = Boolean(fromHash.get("access_token"));

  if (!hasSession && !error && !errorCode && !errorDescription) return null;

  return {
    type: get("type"),
    hasSession,
    error: error || errorCode || errorDescription || null,
    errorCode,
    errorDescription,
  };
}

export const initialAuthParams =
  typeof window === "undefined"
    ? null
    : parseAuthParams(window.location.hash, window.location.search);

// Both vars must be present for auth to work.
// In local dev without .env they'll be undefined — auth will be silently disabled.
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      })
    : null;

export const isAuthEnabled = Boolean(supabase);

/**
 * Which sign-in options the modal offers. Build-time flags (see
 * docs/auth-setup.md): the email link is on unless explicitly disabled,
 * Google stays off until its OAuth client is configured in Supabase.
 */
export const authMethods = Object.freeze({
  magicLink: import.meta.env.VITE_AUTH_MAGIC_LINK !== "false",
  google: import.meta.env.VITE_AUTH_GOOGLE === "true",
});

// Where email links and OAuth send the user back to. Every origin used here
// must be on the Supabase redirect allow-list, or Supabase falls back to the
// Site URL.
export function authRedirectUrl() {
  return typeof window === "undefined" ? undefined : window.location.origin;
}
