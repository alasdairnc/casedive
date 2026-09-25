import { useContext } from "react";
import { AuthContext } from "../lib/AuthContext.jsx";

/**
 * Read auth state and actions from the nearest <AuthProvider>. The provider
 * owns the one Supabase session subscription, so every caller (App, the
 * modal, anything else) sees the same user at the same time.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
