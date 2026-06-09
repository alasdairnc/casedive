// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";

// ── Supabase mock ─────────────────────────────────────────────────────────────

const mockSignIn = vi.fn();
const mockSignUp = vi.fn();
const mockSignOut = vi.fn();
const mockGetSession = vi.fn();
const mockOnAuthStateChange = vi.fn();
const mockResetPasswordForEmail = vi.fn();
const mockUpdateUser = vi.fn();

// useAuth imports the shared client from ../lib/supabase.js — mock that module
// directly so the hook receives a working client even though VITE_SUPABASE_*
// env vars are undefined in the test environment.
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
    },
  },
  isAuthEnabled: true,
}));

describe("useAuth hook", () => {
  beforeEach(() => {
    vi.resetModules();
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
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  async function getHook() {
    const { useAuth } = await import("../../src/hooks/useAuth.js");
    return useAuth;
  }

  // ── Initial state ───────────────────────────────────────────────────────────

  it("starts with no user and loading=true, then loading=false", async () => {
    const useAuth = await getHook();
    const { result } = renderHook(() => useAuth());
    expect(result.current.loading).toBe(true);
    await act(async () => {});
    expect(result.current.loading).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it("exposes signIn, signUp, signOut functions", async () => {
    const useAuth = await getHook();
    const { result } = renderHook(() => useAuth());
    await act(async () => {});
    expect(typeof result.current.signIn).toBe("function");
    expect(typeof result.current.signUp).toBe("function");
    expect(typeof result.current.signOut).toBe("function");
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
    const useAuth = await getHook();
    const { result } = renderHook(() => useAuth());
    await act(async () => {});
    expect(result.current.user).toMatchObject({
      id: "uid-42",
      email: "stored@b.com",
    });
  });

  // ── Sign in ─────────────────────────────────────────────────────────────────

  it("signIn updates user state on success", async () => {
    const useAuth = await getHook();
    const { result } = renderHook(() => useAuth());
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
    const useAuth = await getHook();
    const { result } = renderHook(() => useAuth());
    await act(async () => {});
    let error;
    await act(async () => {
      error = await result.current.signIn("a@b.com", "wrongpass");
    });
    expect(error).toMatch(/invalid/i);
    expect(result.current.user).toBeNull();
  });

  // ── Sign up ─────────────────────────────────────────────────────────────────

  it("signUp returns needsConfirmation when no session is created", async () => {
    const useAuth = await getHook();
    const { result } = renderHook(() => useAuth());
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
    const useAuth = await getHook();
    const { result } = renderHook(() => useAuth());
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
    const useAuth = await getHook();
    const { result } = renderHook(() => useAuth());
    await act(async () => {});
    let res;
    await act(async () => {
      res = await result.current.signUp("taken@b.com", "Pass123!");
    });
    expect(res.error).toMatch(/already/i);
  });

  // ── Password reset ──────────────────────────────────────────────────────────

  it("resetPassword sends a reset email and returns null on success", async () => {
    const useAuth = await getHook();
    const { result } = renderHook(() => useAuth());
    await act(async () => {});
    let error;
    await act(async () => {
      error = await result.current.resetPassword("a@b.com");
    });
    expect(error).toBeNull();
    expect(mockResetPasswordForEmail).toHaveBeenCalledWith(
      "a@b.com",
      expect.objectContaining({ redirectTo: expect.any(String) }),
    );
  });

  it("resetPassword returns error message on failure", async () => {
    mockResetPasswordForEmail.mockResolvedValueOnce({
      data: null,
      error: { message: "Rate limit exceeded" },
    });
    const useAuth = await getHook();
    const { result } = renderHook(() => useAuth());
    await act(async () => {});
    let error;
    await act(async () => {
      error = await result.current.resetPassword("a@b.com");
    });
    expect(error).toMatch(/rate limit/i);
  });

  it("updatePassword updates the password and returns null on success", async () => {
    const useAuth = await getHook();
    const { result } = renderHook(() => useAuth());
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
    const useAuth = await getHook();
    const { result } = renderHook(() => useAuth());
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
    const useAuth = await getHook();
    const { result } = renderHook(() => useAuth());
    await act(async () => {});
    expect(result.current.user).not.toBeNull();
    await act(async () => {
      await result.current.signOut();
    });
    expect(result.current.user).toBeNull();
  });

  // ── Auth state change listener ──────────────────────────────────────────────

  it("subscribes to auth state changes and unsubscribes on unmount", async () => {
    const unsubscribeFn = vi.fn();
    mockOnAuthStateChange.mockReturnValueOnce({
      data: { subscription: { unsubscribe: unsubscribeFn } },
    });
    const useAuth = await getHook();
    const { unmount } = renderHook(() => useAuth());
    await act(async () => {});
    expect(mockOnAuthStateChange).toHaveBeenCalled();
    unmount();
    expect(unsubscribeFn).toHaveBeenCalled();
  });

  // ── Token access ────────────────────────────────────────────────────────────

  it("exposes access token when signed in", async () => {
    mockGetSession.mockResolvedValueOnce({
      data: { session: { user: { id: "uid-1" }, access_token: "tok-abc" } },
      error: null,
    });
    const useAuth = await getHook();
    const { result } = renderHook(() => useAuth());
    await act(async () => {});
    expect(result.current.token).toBe("tok-abc");
  });

  it("token is null when signed out", async () => {
    const useAuth = await getHook();
    const { result } = renderHook(() => useAuth());
    await act(async () => {});
    expect(result.current.token).toBeNull();
  });
});
