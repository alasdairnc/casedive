import { useTheme } from "../lib/ThemeContext.jsx";

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

  // support both old and new prop names
  const handleBookmarks = onOpenBookmarks || onShowBookmarks;
  const handleCodeExplorer = onOpenCodeExplorer || onShowCriminalCode;

  const navItem = {
    background: "none",
    border: "none",
    color: t.textTertiary,
    cursor: "pointer",
    padding: 0,
    fontFamily: "var(--font-body)",
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    textDecoration: "none",
    transition: "color 0.15s",
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
  };

  const hover = (e) => {
    e.currentTarget.style.color = t.text;
  };
  const leave = (e) => {
    e.currentTarget.style.color = t.textTertiary;
  };

  return (
    <header>
      {/* Gold top rule */}
      <div style={{ height: 2, background: t.accent }} />

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "16px 24px 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          {/* Wordmark */}
          <img
            src="/logos/casedive-header-dark.svg"
            alt="CaseDive"
            style={{ height: "28px", width: "auto", display: "block" }}
          />

          {/* Nav */}
          <nav
            style={{
              display: "flex",
              gap: 22,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {onShowHistory && (
              <button
                onClick={onShowHistory}
                aria-label="History"
                style={navItem}
                onMouseEnter={hover}
                onMouseLeave={leave}
              >
                History
              </button>
            )}
            {handleBookmarks && (
              <button
                onClick={handleBookmarks}
                aria-label="Saved citations"
                style={{ ...navItem, position: "relative" }}
                onMouseEnter={hover}
                onMouseLeave={leave}
              >
                Saved
                {bookmarkCount > 0 && (
                  <span style={{ color: t.accentOlive }}>
                    &thinsp;({bookmarkCount})
                  </span>
                )}
              </button>
            )}
            {handleCodeExplorer && (
              <button
                onClick={handleCodeExplorer}
                aria-label="Criminal Code Explorer"
                style={navItem}
                onMouseEnter={hover}
                onMouseLeave={leave}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                  }}
                >
                  §
                </span>
                &thinsp;Code
              </button>
            )}
            <a
              href="https://buymeacoffee.com/alasdairnc"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...navItem, textDecoration: "none" }}
              onMouseEnter={hover}
              onMouseLeave={leave}
            >
              Coffee
            </a>
            {user ? (
              <>
                <span
                  style={{
                    ...navItem,
                    cursor: "default",
                    color: t.textSecondary,
                    textTransform: "none",
                    letterSpacing: "0.04em",
                    maxWidth: 180,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    display: "inline-block",
                  }}
                  title={user.email}
                >
                  {user.email}
                </span>
                <button
                  onClick={onSignOut}
                  aria-label="Sign out"
                  style={navItem}
                  onMouseEnter={hover}
                  onMouseLeave={leave}
                >
                  Sign Out
                </button>
              </>
            ) : onAuthClick ? (
              <button
                onClick={onAuthClick}
                aria-label="Sign in"
                style={{ ...navItem, color: t.accentOlive }}
                onMouseEnter={hover}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = t.accentOlive;
                }}
              >
                Sign In
              </button>
            ) : null}
          </nav>
        </div>

        {/* Hairline rule */}
        <div style={{ borderBottom: `1px solid ${t.border}`, marginTop: 14 }} />
      </div>
    </header>
  );
}
