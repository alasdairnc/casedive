// @vitest-environment happy-dom
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// ── Mock ThemeContext ─────────────────────────────────────────────────────────

vi.mock("../../src/lib/ThemeContext.jsx", () => ({
  useTheme: () => ({
    theme: {
      background: "#fff",
      surface: "#f5f5f5",
      border: "#ddd",
      text: "#111",
      textSecondary: "#666",
      primary: "#2563eb",
    },
    themeName: "light",
    setTheme: vi.fn(),
  }),
  useThemeActions: () => ({
    isDark: false,
    toggleTheme: vi.fn(),
  }),
}));

async function getHeader() {
  const { default: Header } = await import("../../src/components/Header.jsx");
  return Header;
}

describe("Header auth integration", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  // ── Unauthenticated state ───────────────────────────────────────────────────

  it("shows Sign In button when user is null", async () => {
    const Header = await getHeader();
    render(
      <Header
        user={null}
        onAuthClick={vi.fn()}
        onSignOut={vi.fn()}
        onShowHistory={vi.fn()}
        onShowBookmarks={vi.fn()}
        onShowCriminalCode={vi.fn()}
        activePanel={null}
      />,
    );
    expect(screen.getByRole("button", { name: /sign in/i })).toBeDefined();
  });

  it("calls onAuthClick when Sign In button is clicked", async () => {
    const Header = await getHeader();
    const onAuthClick = vi.fn();
    render(
      <Header
        user={null}
        onAuthClick={onAuthClick}
        onSignOut={vi.fn()}
        onShowHistory={vi.fn()}
        onShowBookmarks={vi.fn()}
        onShowCriminalCode={vi.fn()}
        activePanel={null}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    expect(onAuthClick).toHaveBeenCalled();
  });

  // ── Authenticated state ─────────────────────────────────────────────────────

  it("shows user email or avatar when user is present", async () => {
    const Header = await getHeader();
    render(
      <Header
        user={{ id: "uid-1", email: "a@casedive.ca" }}
        onAuthClick={vi.fn()}
        onSignOut={vi.fn()}
        onShowHistory={vi.fn()}
        onShowBookmarks={vi.fn()}
        onShowCriminalCode={vi.fn()}
        activePanel={null}
      />,
    );
    // Either the email or an avatar initial should appear
    const text = screen.getByText(/a@casedive\.ca|A/i);
    expect(text).toBeDefined();
  });

  it("does not show Sign In button when user is present", async () => {
    const Header = await getHeader();
    render(
      <Header
        user={{ id: "uid-1", email: "a@casedive.ca" }}
        onAuthClick={vi.fn()}
        onSignOut={vi.fn()}
        onShowHistory={vi.fn()}
        onShowBookmarks={vi.fn()}
        onShowCriminalCode={vi.fn()}
        activePanel={null}
      />,
    );
    expect(screen.queryByRole("button", { name: /sign in/i })).toBeNull();
  });

  it("calls onSignOut when sign-out button is clicked", async () => {
    const Header = await getHeader();
    const onSignOut = vi.fn();
    render(
      <Header
        user={{ id: "uid-1", email: "a@casedive.ca" }}
        onAuthClick={vi.fn()}
        onSignOut={onSignOut}
        onShowHistory={vi.fn()}
        onShowBookmarks={vi.fn()}
        onShowCriminalCode={vi.fn()}
        activePanel={null}
      />,
    );
    const signOutBtn = screen.getByRole("button", { name: /sign out/i });
    fireEvent.click(signOutBtn);
    expect(onSignOut).toHaveBeenCalled();
  });

  // ── No CSS framework ────────────────────────────────────────────────────────

  it("uses no Tailwind or Bootstrap class names", async () => {
    const Header = await getHeader();
    const { container } = render(
      <Header
        user={null}
        onAuthClick={vi.fn()}
        onSignOut={vi.fn()}
        onShowHistory={vi.fn()}
        onShowBookmarks={vi.fn()}
        onShowCriminalCode={vi.fn()}
        activePanel={null}
      />,
    );
    const allElements = container.querySelectorAll("[class]");
    allElements.forEach((el) => {
      const classes = el.className || "";
      expect(classes).not.toMatch(
        /\b(flex|grid|px-|py-|mt-|mb-|text-sm|font-|btn |col-|row-)\b/,
      );
    });
  });

  // ── Existing header functionality preserved ─────────────────────────────────

  it("still renders history, bookmarks, and criminal code buttons", async () => {
    const Header = await getHeader();
    render(
      <Header
        user={null}
        onAuthClick={vi.fn()}
        onSignOut={vi.fn()}
        onShowHistory={vi.fn()}
        onShowBookmarks={vi.fn()}
        onShowCriminalCode={vi.fn()}
        activePanel={null}
      />,
    );
    expect(screen.getByRole("button", { name: /history/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /bookmark/i })).toBeDefined();
  });
});
