import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  supabase,
  isAuthEnabled,
  authMethods,
  authRedirectUrl,
  initialAuthParams,
} from "./supabase.js";
import { friendlyAuthError } from "./authErrors.js";

export const AuthContext = createContext(null);

const SESSION_RESTORE_TIMEOUT_MS = 3000;

const WELCOME_COPY = {
  signup: "Email confirmed — you're signed in.",
  magiclink: "You're signed in.",
  email_change: "Email updated — you're signed in.",
};

/**
 * Single source of truth for auth. One getSession() call and one
 * onAuthStateChange subscription for the whole app; components read it via
 * useAuth().
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(Boolean(supabase));
  // A reset-password link carries type=recovery. Supabase also fires
  // PASSWORD_RECOVERY once the session lands; seeding from the URL means the
  // prompt still opens if that event beats the subscription.
  const [recovery, setRecovery] = useState(
    Boolean(supabase) &&
      Boolean(initialAuthParams?.hasSession) &&
      initialAuthParams?.type === "recovery",
  );
  // One-off message for the app shell: { kind: "welcome" | "linkError", message }
  const [authNotice, setAuthNotice] = useState(null);
  const arrivedViaLink = useRef(
    Boolean(initialAuthParams?.hasSession) &&
      initialAuthParams?.type !== "recovery",
  );

  useEffect(() => {
    // Email link came back with an error (expired / already used link).
    // Supabase leaves these params in the URL, so tidy them away too.
    if (!supabase || !initialAuthParams?.error) return;
    const friendly = friendlyAuthError(
      initialAuthParams.errorCode ||
        initialAuthParams.errorDescription ||
        initialAuthParams.error,
    );
    setAuthNotice({ kind: "linkError", message: friendly.message });
    try {
      window.history.replaceState(
        window.history.state,
        "",
        window.location.pathname,
      );
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!supabase) return undefined;
    let active = true;

    const applySession = (session) => {
      if (!active) return;
      if (session) {
        setUser(session.user);
        setToken(session.access_token);
        if (arrivedViaLink.current) {
          arrivedViaLink.current = false;
          const type = initialAuthParams?.type;
          setAuthNotice({
            kind: "welcome",
            message:
              WELCOME_COPY[type] ||
              `Signed in${session.user?.email ? ` as ${session.user.email}` : ""}.`,
          });
        }
      } else {
        setUser(null);
        setToken(null);
      }
    };

    // The header hides Sign In while loading. If getSession() ever stalls
    // (it waits on a cross-tab storage lock), stop waiting and show it anyway;
    // a late session still arrives through onAuthStateChange.
    const loadingFallback = setTimeout(() => {
      if (active) setLoading(false);
    }, SESSION_RESTORE_TIMEOUT_MS);

    supabase.auth
      .getSession()
      .then(({ data }) => applySession(data?.session ?? null))
      .catch(() => {
        /* stay signed out; the header still offers Sign In */
      })
      .finally(() => {
        clearTimeout(loadingFallback);
        if (active) setLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      applySession(session);
      // Fired when the user lands on the site from a password-reset email
      // link — the app should prompt for a new password.
      if (event === "PASSWORD_RECOVERY" && active) {
        setRecovery(true);
      }
    });

    return () => {
      active = false;
      clearTimeout(loadingFallback);
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email, password) => {
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
  }, []);

  const signUp = useCallback(async (email, password) => {
    if (!supabase) {
      return { error: "Auth not configured", needsConfirmation: false };
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: authRedirectUrl() },
    });
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
  }, []);

  // Passwordless: email a one-click sign-in link. Creates the account on
  // first use, so it doubles as sign-up.
  const signInWithMagicLink = useCallback(async (email) => {
    if (!supabase) return "Auth not configured";
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: authRedirectUrl(), shouldCreateUser: true },
    });
    return error ? error.message : null;
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (!supabase) return "Auth not configured";
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: authRedirectUrl() },
    });
    // On success the browser navigates away to Google.
    return error ? error.message : null;
  }, []);

  const resendConfirmation = useCallback(async (email) => {
    if (!supabase) return "Auth not configured";
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: authRedirectUrl() },
    });
    return error ? error.message : null;
  }, []);

  const resetPassword = useCallback(async (email) => {
    if (!supabase) return "Auth not configured";
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: authRedirectUrl(),
    });
    return error ? error.message : null;
  }, []);

  const updatePassword = useCallback(async (password) => {
    if (!supabase) return "Auth not configured";
    const { error } = await supabase.auth.updateUser({ password });
    return error ? error.message : null;
  }, []);

  const clearRecovery = useCallback(() => setRecovery(false), []);
  const clearAuthNotice = useCallback(() => setAuthNotice(null), []);

  const signOut = useCallback(async () => {
    try {
      // Supabase drops the stored session even when the revoke call fails.
      if (supabase) await supabase.auth.signOut();
    } catch {
      // It can still throw before reaching that cleanup (e.g. timing out on
      // the cross-tab storage lock). Drop the stored session ourselves so a
      // reload doesn't sign the user straight back in.
      try {
        const key = supabase?.auth?.storageKey;
        if (key) window.localStorage.removeItem(key);
      } catch {
        /* storage blocked: nothing more we can do */
      }
    }
    setUser(null);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      recovery,
      authNotice,
      isAuthEnabled,
      authMethods,
      signIn,
      signUp,
      signInWithMagicLink,
      signInWithGoogle,
      resendConfirmation,
      signOut,
      resetPassword,
      updatePassword,
      clearRecovery,
      clearAuthNotice,
    }),
    [
      user,
      token,
      loading,
      recovery,
      authNotice,
      signIn,
      signUp,
      signInWithMagicLink,
      signInWithGoogle,
      resendConfirmation,
      signOut,
      resetPassword,
      updatePassword,
      clearRecovery,
      clearAuthNotice,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
