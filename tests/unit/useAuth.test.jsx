// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, renderHook } from "@testing-library/react";

// ── Supabase mock ─────────────────────────────────────────────────────────────

const mockSignIn = vi.fn();
const mockSignUp = vi.fn();
const mockSignOut = vi.fn();
const mockGetSession = vi.fn();
const mockOnAuthStateChange = vi.fn();
const mockResetPasswordForEmail = vi.fn();
const mockUpdateUser = vi.fn();
const mockSignInWithOtp = vi.fn();
const mockSignInWithOAuth = vi.fn();
const mockResend = vi.fn();
// What the page URL carried on load (email link result). Exposed through a
// getter because the mocked module object is cached across resetModules().
const mockUrlState = { initialAuthParams: null };

// AuthProvider imports the shared client from ../lib/supabase.js — mock that
// module directly so the provider receives a working client even though
// VITE_SUPABASE_* env vars are undefined in the test environment.
vi.mock("../../src/lib/supabase.js", () => ({
  supabase: {
    auth: {
      signInWithPassword: mockSignIn,
      signUp: mockSignUp,
      signOut: mockSignOut,
      getSession: mockGetSession,
      onAuthStateChange: mockOnAuthStateChange,
      resetPasswordForEmail: mockResetPasswordForEmail,
      updateUser: mockUpdateUser,
      signInWithOtp: mockSignInWithOtp,
      signInWithOAuth: mockSignInWithOAuth,
      resend: mockResend,
    },
  },
  isAuthEnabled: true,
  authMethods: { magicLink: true, google: false },
  authRedirectUrl: () => "https://www.casedive.ca",
  get initialAuthParams() {
    return mockUrlState.initialAuthParams;
  },
}));

describe("useAuth hook (via AuthProvider)", () => {
  beforeEach(() => {
    vi.resetModules();
    mockUrlState.initialAuthParams = null;
    mockGetSession.mockResolvedValue({ data: { session: null }, error: null });
    mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });
    mockSignIn.mockResolvedValue({
      data: {
        user: { id: "uid-1", email: "a@b.com" },
        session: { access_token: "tok-1" },
      },
      error: null,
    });
    mockSignUp.mockResolvedValue({
      data: { user: { id: "uid-2", email: "new@b.com" }, session: null },
      error: null,
    });
    mockSignOut.mockResolvedValue({ error: null });
    mockResetPasswordForEmail.mockResolvedValue({ data: {}, error: null });
    mockUpdateUser.mockResolvedValue({ data: {}, error: null });
    mockSignInWithOtp.mockResolvedValue({ data: {}, error: null });
    mockSignInWithOAuth.mockResolvedValue({ data: {}, error: null });
    mockResend.mockResolvedValue({ data: {}, error: null });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  async function renderAuth() {
    const { useAuth } = await import("../../src/hooks/useAuth.js");
    const { AuthProvider } = await import("../../src/lib/AuthContext.jsx");
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    return renderHook(() => useAuth(), { wrapper });
  }

  // ── Provider wiring ─────────────────────────────────────────────────────────

  it("throws a clear error when used outside AuthProvider", async () => {
    const { useAuth } = await import("../../src/hooks/useAuth.js");
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useAuth())).toThrow(/AuthProvider/);
    spy.mockRestore();
  });

  it("shares one Supabase subscription across every consumer", async () => {
    const { useAuth } = await import("../../src/hooks/useAuth.js");
    const { AuthProvider } = await import("../../src/lib/AuthContext.jsx");
    function Consumer() {
      useAuth();
      return null;
    }
    render(
      <AuthProvider>
        <Consumer />
        <Consumer />
        <Consumer />
      </AuthProvider>,
    );
    await act(async () => {});
    expect(mockOnAuthStateChange).toHaveBeenCalledTimes(1);
    expect(mockGetSession).toHaveBeenCalledTimes(1);
  });

  // ── Initial state ───────────────────────────────────────────────────────────

  it("starts with no user and loading=true, then loading=false", async () => {
    const { result } = await renderAuth();
    expect(result.current.loading).toBe(true);
    await act(async () => {});
    expect(result.current.loading).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it("finishes loading even if getSession rejects", async () => {
    mockGetSession.mockRejectedValueOnce(new Error("storage blocked"));
    const { result } = await renderAuth();
    await act(async () => {});
    expect(result.current.loading).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it("stops loading after a timeout if getSession never settles", async () => {
    vi.useFakeTimers();
    try {
      mockGetSession.mockReturnValueOnce(new Promise(() => {}));
      const { result } = await renderAuth();
      expect(result.current.loading).toBe(true);
      await act(async () => {
        vi.advanceTimersByTime(3000);
      });
      expect(result.current.loading).toBe(false);
    } finally {
      vi.useRealTimers();
    }
  });

  it("exposes the sign-in methods and flags", async () => {
    const { result } = await renderAuth();
    await act(async () => {});
    for (const fn of [
      "signIn",
      "signUp",
      "signOut",
      "signInWithMagicLink",
      "signInWithGoogle",
      "resendConfirmation",
      "resetPassword",
      "updatePassword",
    ]) {
      expect(typeof result.current[fn]).toBe("function");
    }
    expect(result.current.isAuthEnabled).toBe(true);
    expect(result.current.authMethods).toEqual({
      magicLink: true,
      google: false,
    });
  });

  // ── Restore session ─────────────────────────────────────────────────────────

  it("restores user from existing session on mount", async () => {
    mockGetSession.mockResolvedValueOnce({
      data: {
        session: {
          user: { id: "uid-42", email: "stored@b.com" },
          access_token: "tok-stored",
        },
      },
      error: null,
    });
    const { result } = await renderAuth();
    await act(async () => {});
    expect(result.current.user).toMatchObject({
      id: "uid-42",
      email: "stored@b.com",
    });
    expect(result.current.authNotice).toBeNull();
  });

  // ── Sign in ─────────────────────────────────────────────────────────────────

  it("signIn updates user state on success", async () => {
    const { result } = await renderAuth();
    await act(async () => {});
    await act(async () => {
      await result.current.signIn("a@b.com", "Pass123!");
    });
    expect(result.current.user).toMatchObject({ id: "uid-1" });
  });

  it("signIn returns error message on failure", async () => {
    mockSignIn.mockResolvedValueOnce({
      data: {},
      error: { message: "Invalid login credentials" },
    });
    const { result } = await renderAuth();
    await act(async () => {});
    let error;
    await act(async () => {
      error = await result.current.signIn("a@b.com", "wrongpass");
    });
    expect(error).toMatch(/invalid/i);
    expect(result.current.user).toBeNull();
  });

  // ── Sign up ─────────────────────────────────────────────────────────────────

  it("signUp returns needsConfirmation and sends the user back to this site", async () => {
    const { result } = await renderAuth();
    await act(async () => {});
    let res;
    await act(async () => {
      res = await result.current.signUp("new@b.com", "NewPass123!");
    });
    expect(res.error).toBeNull();
    expect(res.needsConfirmation).toBe(true);
    expect(mockSignUp).toHaveBeenCalledWith({
      email: "new@b.com",
      password: "NewPass123!",
      options: { emailRedirectTo: "https://www.casedive.ca" },
    });
  });

  it("signUp signs the user in when a session is returned", async () => {
    mockSignUp.mockResolvedValueOnce({
      data: {
        user: { id: "uid-2", email: "new@b.com" },
        session: { access_token: "tok-2" },
      },
      error: null,
    });
    const { result } = await renderAuth();
    await act(async () => {});
    let res;
    await act(async () => {
      res = await result.current.signUp("new@b.com", "NewPass123!");
    });
    expect(res.error).toBeNull();
    expect(res.needsConfirmation).toBe(false);
    expect(result.current.user).toMatchObject({ id: "uid-2" });
    expect(result.current.token).toBe("tok-2");
  });

  it("signUp returns error message when email already taken", async () => {
    mockSignUp.mockResolvedValueOnce({
      data: {},
      error: { message: "User already registered" },
    });
    const { result } = await renderAuth();
    await act(async () => {});
    let res;
    await act(async () => {
      res = await result.current.signUp("taken@b.com", "Pass123!");
    });
    expect(res.error).toMatch(/already/i);
  });

  // ── Email links ─────────────────────────────────────────────────────────────

  it("signInWithMagicLink emails a link that can create the account", async () => {
    const { result } = await renderAuth();
    await act(async () => {});
    let error;
    await act(async () => {
      error = await result.current.signInWithMagicLink("a@b.com");
    });
    expect(error).toBeNull();
    expect(mockSignInWithOtp).toHaveBeenCalledWith({
      email: "a@b.com",
      options: {
        emailRedirectTo: "https://www.casedive.ca",
        shouldCreateUser: true,
      },
    });
  });

  it("signInWithMagicLink returns the Supabase error message", async () => {
    mockSignInWithOtp.mockResolvedValueOnce({
      data: null,
      error: { message: "Error sending magic link email" },
    });
    const { result } = await renderAuth();
    await act(async () => {});
    let error;
    await act(async () => {
      error = await result.current.signInWithMagicLink("a@b.com");
    });
    expect(error).toMatch(/error sending/i);
  });

  it("resendConfirmation resends the signup email", async () => {
    const { result } = await renderAuth();
    await act(async () => {});
    let error;
    await act(async () => {
      error = await result.current.resendConfirmation("a@b.com");
    });
    expect(error).toBeNull();
    expect(mockResend).toHaveBeenCalledWith({
      type: "signup",
      email: "a@b.com",
      options: { emailRedirectTo: "https://www.casedive.ca" },
    });
  });

  it("signInWithGoogle starts the OAuth redirect", async () => {
    const { result } = await renderAuth();
    await act(async () => {});
    await act(async () => {
      await result.current.signInWithGoogle();
    });
    expect(mockSignInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
      options: { redirectTo: "https://www.casedive.ca" },
    });
  });

  // ── Password reset ──────────────────────────────────────────────────────────

  it("resetPassword sends a reset email and returns null on success", async () => {
    const { result } = await renderAuth();
    await act(async () => {});
    let error;
    await act(async () => {
      error = await result.current.resetPassword("a@b.com");
    });
    expect(error).toBeNull();
    expect(mockResetPasswordForEmail).toHaveBeenCalledWith("a@b.com", {
      redirectTo: "https://www.casedive.ca",
    });
  });

  it("resetPassword returns error message on failure", async () => {
    mockResetPasswordForEmail.mockResolvedValueOnce({
      data: null,
      error: { message: "Rate limit exceeded" },
    });
    const { result } = await renderAuth();
    await act(async () => {});
    let error;
    await act(async () => {
      error = await result.current.resetPassword("a@b.com");
    });
    expect(error).toMatch(/rate limit/i);
  });

  it("updatePassword updates the password and returns null on success", async () => {
    const { result } = await renderAuth();
    await act(async () => {});
    let error;
    await act(async () => {
      error = await result.current.updatePassword("NewPass456!");
    });
    expect(error).toBeNull();
    expect(mockUpdateUser).toHaveBeenCalledWith({ password: "NewPass456!" });
  });

  // ── Password recovery event ─────────────────────────────────────────────────

  it("sets recovery=true on PASSWORD_RECOVERY and clears via clearRecovery", async () => {
    let authChangeCallback;
    mockOnAuthStateChange.mockImplementationOnce((cb) => {
      authChangeCallback = cb;
      return { data: { subscription: { unsubscribe: vi.fn() } } };
    });
    const { result } = await renderAuth();
    await act(async () => {});
    expect(result.current.recovery).toBe(false);
    await act(async () => {
      authChangeCallback("PASSWORD_RECOVERY", {
        user: { id: "uid-1" },
        access_token: "tok-rec",
      });
    });
    expect(result.current.recovery).toBe(true);
    await act(async () => {
      result.current.clearRecovery();
    });
    expect(result.current.recovery).toBe(false);
  });

  it("opens recovery straight away when the page loads from a reset link", async () => {
    mockUrlState.initialAuthParams = {
      type: "recovery",
      hasSession: true,
      error: null,
    };
    const { result } = await renderAuth();
    expect(result.current.recovery).toBe(true);
    await act(async () => {});
    // A recovery arrival is not a "welcome" moment; the reset prompt covers it.
    expect(result.current.authNotice).toBeNull();
  });

  // ── Arriving from an email link ─────────────────────────────────────────────

  it("shows a welcome notice after a confirmation link signs the user in", async () => {
    mockUrlState.initialAuthParams = {
      type: "signup",
      hasSession: true,
      error: null,
    };
    mockGetSession.mockResolvedValueOnce({
      data: {
        session: { user: { id: "u", email: "a@b.com" }, access_token: "t" },
      },
      error: null,
    });
    const { result } = await renderAuth();
    await act(async () => {});
    expect(result.current.authNotice).toEqual({
      kind: "welcome",
      message: "Email confirmed — you're signed in.",
    });
    await act(async () => {
      result.current.clearAuthNotice();
    });
    expect(result.current.authNotice).toBeNull();
  });

  it("turns an expired email link into a friendly notice and cleans the URL", async () => {
    mockUrlState.initialAuthParams = {
      type: null,
      hasSession: false,
      error: "access_denied",
      errorCode: "otp_expired",
      errorDescription: "Email link is invalid or has expired",
    };
    const replaceSpy = vi.spyOn(window.history, "replaceState");
    const { result } = await renderAuth();
    await act(async () => {});
    expect(result.current.authNotice).toEqual({
      kind: "linkError",
      message: "That email link has expired or was already used.",
    });
    expect(replaceSpy).toHaveBeenCalled();
    replaceSpy.mockRestore();
  });

  // ── Sign out ────────────────────────────────────────────────────────────────

  it("signOut clears user state", async () => {
    mockGetSession.mockResolvedValueOnce({
      data: {
        session: {
          user: { id: "uid-1", email: "a@b.com" },
          access_token: "tok-1",
        },
      },
      error: null,
    });
    const { result } = await renderAuth();
    await act(async () => {});
    expect(result.current.user).not.toBeNull();
    await act(async () => {
      await result.current.signOut();
    });
    expect(result.current.user).toBeNull();
  });

  it("signOut still clears local state if the network call throws", async () => {
    mockGetSession.mockResolvedValueOnce({
      data: {
        session: { user: { id: "uid-1" }, access_token: "tok-1" },
      },
      error: null,
    });
    mockSignOut.mockRejectedValueOnce(new Error("Failed to fetch"));
    const { result } = await renderAuth();
    await act(async () => {});
    await act(async () => {
      await result.current.signOut();
    });
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
  });

  // ── Auth state change listener ──────────────────────────────────────────────

  it("subscribes to auth state changes and unsubscribes on unmount", async () => {
    const unsubscribeFn = vi.fn();
    mockOnAuthStateChange.mockReturnValueOnce({
      data: { subscription: { unsubscribe: unsubscribeFn } },
    });
    const { unmount } = await renderAuth();
    await act(async () => {});
    expect(mockOnAuthStateChange).toHaveBeenCalled();
    unmount();
    expect(unsubscribeFn).toHaveBeenCalled();
  });

  it("follows sign-ins that happen in another tab", async () => {
    let authChangeCallback;
    mockOnAuthStateChange.mockImplementationOnce((cb) => {
      authChangeCallback = cb;
      return { data: { subscription: { unsubscribe: vi.fn() } } };
    });
    const { result } = await renderAuth();
    await act(async () => {});
    await act(async () => {
      authChangeCallback("SIGNED_IN", {
        user: { id: "uid-9", email: "x@b.com" },
        access_token: "tok-9",
      });
    });
    expect(result.current.user).toMatchObject({ id: "uid-9" });
    expect(result.current.token).toBe("tok-9");
  });

  // ── Token access ────────────────────────────────────────────────────────────

  it("exposes access token when signed in", async () => {
    mockGetSession.mockResolvedValueOnce({
      data: { session: { user: { id: "uid-1" }, access_token: "tok-abc" } },
      error: null,
    });
    const { result } = await renderAuth();
    await act(async () => {});
    expect(result.current.token).toBe("tok-abc");
  });

  it("token is null when signed out", async () => {
    const { result } = await renderAuth();
    await act(async () => {});
    expect(result.current.token).toBeNull();
  });
});
