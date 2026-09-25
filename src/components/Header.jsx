import { useEffect, useRef, useState } from "react";
import { useTheme } from "../lib/ThemeContext.jsx";
import { useMediaQuery } from "../hooks/useMediaQuery.js";
import Button from "./ui/Button.jsx";
import {
  HEADER_MAX_WIDTH,
  MOBILE_NAV_QUERY,
  PAGE_GUTTER,
  RADIUS,
} from "../lib/ui.js";

const DONATE_URL = "https://buymeacoffee.com/alasdairnc";
const MOBILE_NAV_ID = "cd-mobile-nav";

function HeartIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  );
}

// Hamburger when closed, × when open. The button's name stays "Menu" either
// way; aria-expanded carries the state.
function MenuIcon({ open }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

export default function Header({
  bookmarkCount = 0,
  onOpenBookmarks,
  onOpenCodeExplorer,
  // auth integration props
  user = null,
  onAuthClick,
  onSignOut,
  // alias props (used by tests / new callers)
  onShowHistory,
  onShowBookmarks,
  onShowCriminalCode,
  activePanel,
}) {
  const t = useTheme();
  const isMobile = useMediaQuery(MOBILE_NAV_QUERY);
  // Between the phone breakpoint and ~960px there is no room for the email
  // beside the nav; Sign out carries it as a tooltip instead.
  const isCompact = useMediaQuery("(max-width: 959px)");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  // support both old and new prop names
  const handleBookmarks = onOpenBookmarks || onShowBookmarks;
  const handleCodeExplorer = onOpenCodeExplorer || onShowCriminalCode;

  // Growing past the phone breakpoint closes the menu.
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  // Escape closes the menu and puts focus back on its toggle.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Every nav action closes the mobile menu first.
  const run = (fn) => (e) => {
    setMenuOpen(false);
    fn?.(e);
  };

  const navItems = [
    handleCodeExplorer && {
      key: "code",
      label: "Criminal Code",
      ariaLabel: "Criminal Code Explorer",
      onClick: handleCodeExplorer,
    },
    handleBookmarks && {
      key: "saved",
      label: "Saved",
      ariaLabel:
        bookmarkCount > 0
          ? `Saved citations (${bookmarkCount})`
          : "Saved citations",
      onClick: handleBookmarks,
      count: bookmarkCount,
    },
    onShowHistory && {
      key: "history",
      label: "History",
      ariaLabel: "History",
      onClick: onShowHistory,
    },
  ].filter(Boolean);

  const countBadge = (count) =>
    count > 0 ? (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 20,
          height: 20,
          padding: "0 6px",
          borderRadius: RADIUS.pill,
          background: t.accentSoft,
          color: t.accent,
          fontSize: 12,
          fontWeight: 600,
          lineHeight: 1,
        }}
      >
        {count}
      </span>
    ) : null;

  const emailText = user ? (
    <span
      title={user.email}
      style={{
        fontFamily: "var(--font-body)",
        fontSize: 13,
        color: t.textSecondary,
        maxWidth: 200,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        display: "inline-block",
      }}
    >
      {user.email}
    </span>
  ) : null;

  const signInButton =
    !user && onAuthClick ? (
      <Button
        variant="primary"
        size="sm"
        aria-label="Sign in"
        onClick={run(onAuthClick)}
      >
        Sign in
      </Button>
    ) : null;

  const mobileItemStyle = {
    justifyContent: "flex-start",
    minHeight: 44,
    padding: "0 12px",
    fontSize: 15,
  };

  return (
    <header style={{ background: t.bg, borderBottom: `1px solid ${t.border}` }}>
      {/* Teal top rule */}
      <div style={{ height: 2, background: t.accent }} />

      <div
        style={{
          maxWidth: HEADER_MAX_WIDTH,
          margin: "0 auto",
          padding: `0 ${PAGE_GUTTER}px`,
          height: 64,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            flexShrink: 0,
          }}
        >
          <a
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              borderRadius: RADIUS.sm,
            }}
          >
            <img
              src="/logos/casedive-header-dark.svg"
              alt="CaseDive"
              style={{ height: "28px", width: "auto", display: "block" }}
            />
          </a>

          {!isMobile && navItems.length > 0 && (
            <nav
              aria-label="Main"
              style={{ display: "flex", alignItems: "center", gap: 4 }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.key}
                  variant="ghost"
                  size="sm"
                  aria-label={item.ariaLabel}
                  onClick={item.onClick}
                  style={{ fontSize: 14 }}
                >
                  {item.label}
                  {countBadge(item.count)}
                </Button>
              ))}
            </nav>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            minWidth: 0,
          }}
        >
          {!isMobile && (
            <>
              <Button
                variant="secondary"
                size="sm"
                href={DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <HeartIcon />
                Donate
              </Button>
              {user ? (
                <>
                  {!isCompact && emailText}
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label="Sign out"
                    title={isCompact ? user.email : undefined}
                    onClick={onSignOut}
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                signInButton
              )}
            </>
          )}

          {isMobile && (
            <>
              {signInButton}
              <Button
                ref={menuButtonRef}
                variant="ghost"
                size="icon"
                aria-label="Menu"
                aria-expanded={menuOpen}
                aria-controls={MOBILE_NAV_ID}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <MenuIcon open={menuOpen} />
              </Button>
            </>
          )}
        </div>
      </div>

      {isMobile && menuOpen && (
        <nav
          id={MOBILE_NAV_ID}
          aria-label="Main"
          style={{
            background: t.bgAlt,
            borderTop: `1px solid ${t.border}`,
            padding: `8px ${PAGE_GUTTER - 12}px 16px`,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {navItems.map((item) => (
            <Button
              key={item.key}
              variant="ghost"
              fullWidth
              aria-label={item.ariaLabel}
              onClick={run(item.onClick)}
              style={mobileItemStyle}
            >
              {item.label}
              {countBadge(item.count)}
            </Button>
          ))}
          <Button
            variant="ghost"
            fullWidth
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={mobileItemStyle}
          >
            <HeartIcon />
            Donate
          </Button>

          {user && (
            <div
              style={{
                borderTop: `1px solid ${t.border}`,
                marginTop: 8,
                paddingTop: 8,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <div style={{ padding: "8px 12px" }}>{emailText}</div>
              <Button
                variant="ghost"
                fullWidth
                aria-label="Sign out"
                onClick={run(onSignOut)}
                style={mobileItemStyle}
              >
                Sign out
              </Button>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
