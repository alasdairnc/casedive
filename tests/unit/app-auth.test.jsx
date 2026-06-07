// @vitest-environment happy-dom
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// ── Mock all heavy dependencies so App can render in jsdom ────────────────────

const mockSignIn = vi.fn();
const mockSignUp = vi.fn();
const mockSignOut = vi.fn();

vi.mock("../../src/hooks/useAuth.js", () => ({
  useAuth: () => ({
    user: null,
    token: null,
    loading: false,
    signIn: mockSignIn,
    signUp: mockSignUp,
    signOut: mockSignOut,
  }),
}));

const mockAuthUser = { id: "uid-1", email: "a@casedive.ca" };

vi.mock("../../src/lib/ThemeContext.jsx", () => ({
  ThemeProvider: ({ children }) => <div>{children}</div>,
  useTheme: () => ({
    theme: {
      background: "#fff",
      surface: "#f5f5f5",
      border: "#ddd",
      text: "#111",
      textSecondary: "#666",
      primary: "#2563eb",
      error: "#dc2626",
    },
    themeName: "light",
    setTheme: vi.fn(),
  }),
  useThemeActions: () => ({
    isDark: false,
    toggleTheme: vi.fn(),
  }),
}));

vi.mock("../../src/hooks/useSearchHistory.js", () => ({
  useSearchHistory: () => ({
    history: [],
    addToHistory: vi.fn(),
    clearHistory: vi.fn(),
    rerunQuery: vi.fn(),
    getHistory: vi.fn(() => []),
  }),
}));

vi.mock("../../src/hooks/useBookmarks.js", () => ({
  useBookmarks: () => ({
    bookmarks: [],
    addBookmark: vi.fn(),
    removeBookmark: vi.fn(),
    isBookmarked: vi.fn(() => false),
    clearBookmarks: vi.fn(),
  }),
}));

// Lazy-loaded panels — stub them out
vi.mock("../../src/components/SearchHistory.jsx", () => ({
  default: () => <div data-testid="search-history-panel" />,
}));
vi.mock("../../src/components/BookmarksPanel.jsx", () => ({
  default: () => <div data-testid="bookmarks-panel" />,
}));
vi.mock("../../src/components/CriminalCodeExplorer.jsx", () => ({
  default: () => <div data-testid="criminal-code-panel" />,
}));
vi.mock("../../src/components/AuthModal.jsx", () => ({
  default: ({ isOpen, onClose, mode }) =>
    isOpen ? (
      <div role="dialog" data-testid="auth-modal" data-mode={mode}>
        <button onClick={onClose}>close</button>
      </div>
    ) : null,
}));

async function getApp() {
  const { default: App } = await import("../../src/App.jsx");
  return App;
}

describe("App auth integration", () => {
  beforeEach(() => {
    vi.resetModules();
    mockSignIn.mockResolvedValue(null);
    mockSignUp.mockResolvedValue(null);
    mockSignOut.mockResolvedValue(undefined);
  });

  // ── AuthModal wired up ──────────────────────────────────────────────────────

  it("AuthModal is not visible on initial load", async () => {
    const App = await getApp();
    render(<App />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("clicking Sign In in Header opens AuthModal in signin mode", async () => {
    // Re-mock useAuth to return null user so Sign In button renders
    vi.doMock("../../src/hooks/useAuth.js", () => ({
      useAuth: () => ({
        user: null,
        token: null,
        loading: false,
        signIn: mockSignIn,
        signUp: mockSignUp,
        signOut: mockSignOut,
      }),
    }));
    const App = await getApp();
    render(<App />);
    const signInBtn = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(signInBtn);
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeDefined();
      expect(screen.getByTestId("auth-modal").dataset.mode).toBe("signin");
    });
  });

  it("AuthModal closes when onClose is triggered", async () => {
    vi.doMock("../../src/hooks/useAuth.js", () => ({
      useAuth: () => ({
        user: null,
        token: null,
        loading: false,
        signIn: mockSignIn,
        signUp: mockSignUp,
        signOut: mockSignOut,
      }),
    }));
    const App = await getApp();
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() => screen.getByRole("dialog"));
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull();
    });
  });

  // ── Anonymous path unaffected ───────────────────────────────────────────────

  it("main search area renders regardless of auth state", async () => {
    const App = await getApp();
    render(<App />);
    // Search textarea or input should be present
    expect(screen.getByRole("textbox")).toBeDefined();
  });

  // ── Logged-in state ─────────────────────────────────────────────────────────

  it("Sign In button absent when user is logged in", async () => {
    vi.doMock("../../src/hooks/useAuth.js", () => ({
      useAuth: () => ({
        user: mockAuthUser,
        token: "tok-abc",
        loading: false,
        signIn: mockSignIn,
        signUp: mockSignUp,
        signOut: mockSignOut,
      }),
    }));
    const App = await getApp();
    render(<App />);
    expect(screen.queryByRole("button", { name: /sign in/i })).toBeNull();
  });

  it("Sign Out button present when user is logged in", async () => {
    vi.doMock("../../src/hooks/useAuth.js", () => ({
      useAuth: () => ({
        user: mockAuthUser,
        token: "tok-abc",
        loading: false,
        signIn: mockSignIn,
        signUp: mockSignUp,
        signOut: mockSignOut,
      }),
    }));
    const App = await getApp();
    render(<App />);
    expect(screen.getByRole("button", { name: /sign out/i })).toBeDefined();
  });

  it("clicking Sign Out calls signOut from useAuth", async () => {
    vi.doMock("../../src/hooks/useAuth.js", () => ({
      useAuth: () => ({
        user: mockAuthUser,
        token: "tok-abc",
        loading: false,
        signIn: mockSignIn,
        signUp: mockSignUp,
        signOut: mockSignOut,
      }),
    }));
    const App = await getApp();
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /sign out/i }));
    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
    });
  });

  // ── useAuth is consumed at App root ────────────────────────────────────────

  it("useAuth hook is imported and consumed by App", async () => {
    const { useAuth: mockUseAuthFn } =
      await import("../../src/hooks/useAuth.js");
    // If this import resolves without error, the mock is wired correctly.
    // The actual test is that App renders without throwing when useAuth is present.
    const App = await getApp();
    expect(() => render(<App />)).not.toThrow();
  });
});
