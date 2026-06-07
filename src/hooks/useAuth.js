import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

let supabase = null;
try {
  supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
  );
} catch {
  // env vars not set (e.g. test environment without Supabase credentials)
}

export function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

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
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        setToken(session.access_token);
      } else {
        setUser(null);
        setToken(null);
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
    if (!supabase) return "Auth not configured";
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return error.message;
    return null;
  }

  async function signOut() {
    if (supabase) await supabase.auth.signOut();
    setUser(null);
    setToken(null);
  }

  return { user, token, loading, signIn, signUp, signOut };
}
