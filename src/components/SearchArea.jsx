import { useState } from "react";
import { useTheme } from "../lib/ThemeContext.jsx";
import { useMediaQuery } from "../hooks/useMediaQuery.js";
import Button from "./ui/Button.jsx";
import {
  RADIUS,
  CONTENT_MAX_WIDTH,
  PAGE_GUTTER,
  MOBILE_NAV_QUERY,
} from "../lib/ui.js";

const MAX_CHARS = 5000;

export default function SearchArea({ query, setQuery, onSubmit, loading }) {
  const t = useTheme();
  const [focused, setFocused] = useState(false);
  // Touch-first widths: no keyboard hint, full-width submit
  const isMobile = useMediaQuery(MOBILE_NAV_QUERY);
  const remaining = MAX_CHARS - query.length;
  const nearLimit = remaining <= 500;
  const atLimit = remaining <= 0;

  const kbdStyle = {
    display: "inline-block",
    padding: "1px 6px",
    fontFamily: "var(--font-body)",
    fontSize: 12,
    color: t.textSecondary,
    background: t.bg,
    border: `1px solid ${t.border}`,
    borderRadius: RADIUS.sm,
  };

  return (
    <section
      style={{
        maxWidth: CONTENT_MAX_WIDTH,
        margin: "0 auto",
        padding: `20px ${PAGE_GUTTER}px 0`,
      }}
    >
      <div style={{ position: "relative" }}>
        <textarea
          data-testid="scenario-input"
          aria-label="Legal scenario"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && !loading)
              onSubmit();
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          maxLength={MAX_CHARS}
          placeholder="Describe your legal scenario in plain language…"
          style={{
            width: "100%",
            display: "block",
            boxSizing: "border-box",
            minHeight: 140,
            padding: "16px 18px 32px",
            background: t.bgAlt,
            color: t.text,
            border: `1px solid ${
              atLimit ? t.accentRed : focused ? t.accent : t.border
            }`,
            borderRadius: RADIUS.lg,
            fontFamily: "var(--font-display)",
            fontSize: "clamp(16px, 2.5vw, 19px)",
            lineHeight: 1.6,
            resize: "vertical",
            transition: "border-color 0.15s",
          }}
        />
        {nearLimit && (
          <div
            style={{
              position: "absolute",
              bottom: 10,
              right: 26,
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: atLimit ? t.accentRed : t.textTertiary,
              pointerEvents: "none",
            }}
          >
            {remaining.toLocaleString()}
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          marginTop: 12,
        }}
      >
        {!isMobile && (
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: t.textTertiary,
            }}
          >
            <kbd style={kbdStyle}>{"⌘"}/Ctrl</kbd> +{" "}
            <kbd style={kbdStyle}>Enter</kbd>
          </span>
        )}
        <Button
          variant="primary"
          size="lg"
          data-testid="research-submit"
          onClick={onSubmit}
          disabled={loading || !query.trim() || atLimit}
          fullWidth={isMobile}
          style={{
            minWidth: 140,
            marginLeft: "auto",
            ...(loading ? { cursor: "wait", opacity: 0.8 } : null),
          }}
        >
          {loading ? "Analyzing…" : "Research"}
        </Button>
      </div>
    </section>
  );
}
