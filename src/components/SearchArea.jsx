import { useTheme } from "../lib/ThemeContext.jsx";

const MAX_CHARS = 5000;

export default function SearchArea({ query, setQuery, onSubmit, loading }) {
  const t = useTheme();
  const remaining = MAX_CHARS - query.length;
  const nearLimit = remaining <= 500;
  const atLimit = remaining <= 0;

  return (
    <section style={{ maxWidth: 760, margin: "0 auto", padding: "20px 24px 0" }}>
      <div style={{ position: "relative" }}>
        <textarea
          data-testid="scenario-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && !loading) onSubmit();
          }}
          maxLength={MAX_CHARS}
          placeholder="Describe your legal scenario in plain language…"
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            borderTop: `1px solid ${atLimit ? t.accentRed : t.border}`,
            borderBottom: `1px solid ${atLimit ? t.accentRed : t.border}`,
            color: t.text,
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(16px, 2.5vw, 19px)",
            padding: "20px 0",
            resize: "none",
            minHeight: 140,
            outline: "none",
            lineHeight: 1.7,
            boxSizing: "border-box",
            transition: "border-color 0.2s, box-shadow 0.2s",
            display: "block",
          }}
          onFocus={(e) => {
            e.target.style.borderTopColor = atLimit ? t.accentRed : t.border;
            e.target.style.borderBottomColor = atLimit ? t.accentRed : t.border;
            e.target.style.boxShadow = `inset 3px 0 0 ${atLimit ? t.accentRed : t.accent}`;
            e.target.style.paddingLeft = "12px";
          }}
          onBlur={(e) => {
            e.target.style.borderTopColor = atLimit ? t.accentRed : t.border;
            e.target.style.borderBottomColor = atLimit ? t.accentRed : t.border;
            e.target.style.boxShadow = "none";
            e.target.style.paddingLeft = "0";
          }}
        />
        {nearLimit && (
          <div style={{
            position: "absolute",
            bottom: 8,
            right: 0,
            fontFamily: "'Helvetica Neue', sans-serif",
            fontSize: 10,
            color: atLimit ? t.accentRed : t.textFaint,
            pointerEvents: "none",
            letterSpacing: "0.04em",
          }}>
            {remaining.toLocaleString()}
          </div>
        )}
      </div>

      <div style={{
        display: "flex",
        gap: 20,
        marginTop: 14,
        alignItems: "center",
        flexWrap: "wrap",
      }}>
        <button
          data-testid="research-submit"
          onClick={onSubmit}
          disabled={loading || !query.trim() || atLimit}
          style={{
            background: "none",
            border: `1px solid ${loading || !query.trim() || atLimit ? t.border : t.accent}`,
            color: loading || !query.trim() || atLimit ? t.textTertiary : t.accent,
            padding: "9px 28px",
            fontFamily: "'Helvetica Neue', sans-serif",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            cursor: loading ? "wait" : "pointer",
            opacity: !query.trim() || atLimit ? 0.4 : 1,
            transition: "border-color 0.2s, color 0.2s, opacity 0.2s",
          }}
        >
          {loading ? "Analyzing\u2026" : "Research"}
        </button>
        <span style={{
          fontSize: 11,
          color: t.textFaint,
          fontFamily: "'Helvetica Neue', sans-serif",
          letterSpacing: "0.02em",
        }}>
          {"\u2318"}/Ctrl + Enter
        </span>
      </div>
    </section>
  );
}
