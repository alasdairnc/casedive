import { useEffect, useState } from "react";
import { supabase, isAuthEnabled } from "../lib/supabase.js";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recovery, setRecovery] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        setToken(session.access_token);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        setToken(session.access_token);
      } else {
        setUser(null);
        setToken(null);
      }
      // Fired when the user lands on the site from a password-reset email
      // link — the app should prompt for a new password.
      if (event === "PASSWORD_RECOVERY") {
        setRecovery(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function signIn(email, password) {
    if (!supabase) return "Auth not configured";
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return error.message;
    if (data?.session) {
      setUser(data.user);
      setToken(data.session.access_token);
    }
    return null;
  }

  async function signUp(email, password) {
    if (!supabase) {
      return { error: "Auth not configured", needsConfirmation: false };
    }
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { error: error.message, needsConfirmation: false };
    if (data?.session) {
      // Email confirmation disabled in Supabase — user is signed in right away.
      setUser(data.user);
      setToken(data.session.access_token);
      return { error: null, needsConfirmation: false };
    }
    // No session: Supabase sent a confirmation email. This is also what an
    // already-registered email returns (enumeration-safe), so the caller
    // should show a neutral "check your email" notice either way.
    return { error: null, needsConfirmation: true };
  }

  async function resetPassword(email) {
    if (!supabase) return "Auth not configured";
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });
    return error ? error.message : null;
  }

  async function updatePassword(password) {
    if (!supabase) return "Auth not configured";
    const { error } = await supabase.auth.updateUser({ password });
    return error ? error.message : null;
  }

  function clearRecovery() {
    setRecovery(false);
  }

  async function signOut() {
    if (supabase) await supabase.auth.signOut();
    setUser(null);
    setToken(null);
  }

  return {
    user,
    token,
    loading,
    recovery,
    isAuthEnabled,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    clearRecovery,
  };
}
