// @vitest-environment happy-dom
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MOBILE_NAV_QUERY } from "../../src/lib/ui.js";

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
    const text = screen.getByText("a@casedive.ca");
    expect(text).toBeDefined();
  });

  it("keeps nav items visible when user is signed in", async () => {
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
    expect(screen.getByRole("button", { name: /history/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /saved/i })).toBeDefined();
    expect(
      screen.getByRole("button", { name: /criminal code/i }),
    ).toBeDefined();
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
    expect(screen.getByRole("button", { name: /saved/i })).toBeDefined();
  });
});

// ── Nav labels ──────────────────────────────────────────────────────────────

function navProps(overrides = {}) {
  return {
    user: null,
    onAuthClick: vi.fn(),
    onSignOut: vi.fn(),
    onShowHistory: vi.fn(),
    onShowBookmarks: vi.fn(),
    onShowCriminalCode: vi.fn(),
    activePanel: null,
    ...overrides,
  };
}

describe("Header nav labels", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("links Donate to Buy Me a Coffee in a new tab", async () => {
    const Header = await getHeader();
    render(<Header {...navProps()} />);
    const donate = screen.getByRole("link", { name: "Donate" });
    expect(donate.textContent).toBe("Donate");
    expect(donate.getAttribute("href")).toBe(
      "https://buymeacoffee.com/alasdairnc",
    );
    expect(donate.getAttribute("target")).toBe("_blank");
    expect(donate.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("shows 'Criminal Code' while keeping the Explorer accessible name", async () => {
    const Header = await getHeader();
    render(<Header {...navProps()} />);
    const code = screen.getByRole("button", { name: "Criminal Code Explorer" });
    expect(code.textContent).toBe("Criminal Code");
  });

  it("no longer labels anything 'Coffee'", async () => {
    const Header = await getHeader();
    render(<Header {...navProps()} />);
    expect(screen.queryByText(/coffee/i)).toBeNull();
  });

  it("shows the saved count as a badge inside the Saved button", async () => {
    const Header = await getHeader();
    render(<Header {...navProps({ bookmarkCount: 3 })} />);
    const saved = screen.getByRole("button", { name: /saved/i });
    expect(saved.textContent).toBe("Saved3");
    expect(saved.getAttribute("aria-label")).toBe("Saved citations (3)");
  });

  it("wraps the logo in a home link", async () => {
    const Header = await getHeader();
    render(<Header {...navProps()} />);
    const logo = screen.getByAltText("CaseDive");
    expect(logo.closest("a")?.getAttribute("href")).toBe("/");
  });
});

// ── Mobile menu ─────────────────────────────────────────────────────────────

describe("Header mobile menu", () => {
  let originalMatchMedia;

  beforeEach(() => {
    vi.resetModules();
    originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn((query) => ({
      matches: query === MOBILE_NAV_QUERY,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it("collapses nav items behind Menu but keeps Sign in in the bar", async () => {
    const Header = await getHeader();
    render(<Header {...navProps()} />);

    const menu = screen.getByRole("button", { name: "Menu" });
    expect(menu.getAttribute("aria-expanded")).toBe("false");
    expect(menu.getAttribute("aria-controls")).toBe("cd-mobile-nav");
    expect(screen.queryByRole("button", { name: /saved/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /history/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /criminal code/i })).toBeNull();
    expect(screen.queryByRole("link", { name: "Donate" })).toBeNull();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeDefined();
  });

  it("opens the menu, runs an item's action and closes again", async () => {
    const Header = await getHeader();
    const props = navProps();
    const { container } = render(<Header {...props} />);

    const menu = screen.getByRole("button", { name: "Menu" });
    fireEvent.click(menu);

    expect(menu.getAttribute("aria-expanded")).toBe("true");
    // Name stays "Menu" when open (no "Close menu")
    expect(screen.getByRole("button", { name: "Menu" })).toBe(menu);
    expect(container.querySelector("#cd-mobile-nav")).not.toBeNull();
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByRole("button", { name: /history/i })).toBeDefined();
    expect(
      screen.getByRole("button", { name: /criminal code explorer/i }),
    ).toBeDefined();
    expect(screen.getByRole("link", { name: "Donate" })).toBeDefined();
    // Still exactly one Sign in button
    expect(screen.getAllByRole("button", { name: /sign in/i })).toHaveLength(1);

    fireEvent.click(screen.getByRole("button", { name: /saved/i }));

    expect(props.onShowBookmarks).toHaveBeenCalledTimes(1);
    expect(menu.getAttribute("aria-expanded")).toBe("false");
    expect(container.querySelector("#cd-mobile-nav")).toBeNull();
    expect(screen.queryByRole("button", { name: /saved/i })).toBeNull();
  });

  it("closes the menu on Escape", async () => {
    const Header = await getHeader();
    const { container } = render(<Header {...navProps()} />);

    fireEvent.click(screen.getByRole("button", { name: "Menu" }));
    expect(container.querySelector("#cd-mobile-nav")).not.toBeNull();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(container.querySelector("#cd-mobile-nav")).toBeNull();
  });

  it("puts the signed-in email and Sign out inside the menu", async () => {
    const Header = await getHeader();
    const props = navProps({ user: { id: "uid-1", email: "a@casedive.ca" } });
    render(<Header {...props} />);

    expect(screen.queryByRole("button", { name: /sign in/i })).toBeNull();
    expect(screen.queryByText("a@casedive.ca")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Menu" }));
    expect(screen.getByText("a@casedive.ca")).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: /sign out/i }));
    expect(props.onSignOut).toHaveBeenCalledTimes(1);
  });
});
