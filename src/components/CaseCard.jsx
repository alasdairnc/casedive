import { useTheme } from "../lib/ThemeContext.jsx";

// Verification badge shown beneath each case card
function VerificationBadge({ verification, t }) {
  if (!verification) return null;

  const { status, url, searchUrl } = verification;

  if (status === "verified") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          fontFamily: "'Helvetica Neue', sans-serif", fontSize: 11,
          color: t.accentGreen, textDecoration: "none", marginTop: 8,
          letterSpacing: 0.5,
        }}
      >
        ✓ Verified on CanLII {"\u2197"}
      </a>
    );
  }

  if (status === "not_found") {
    return (
      <a
        href={searchUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          fontFamily: "'Helvetica Neue', sans-serif", fontSize: 11,
          color: t.accentRed, textDecoration: "none", marginTop: 8,
          letterSpacing: 0.5,
        }}
      >
        ⚠ Not found — search CanLII {"\u2197"}
      </a>
    );
  }

  // unverified, unknown_court, error — show a neutral search link
  const href = url || searchUrl;
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        fontFamily: "'Helvetica Neue', sans-serif", fontSize: 11,
        color: t.textTertiary, textDecoration: "none", marginTop: 8,
        letterSpacing: 0.5,
      }}
    >
      → Search CanLII {"\u2197"}
    </a>
  );
}

export default function CaseCard({ caseItem, verification }) {
  const t = useTheme();
  return (
    <div style={{ borderBottom: `1px solid ${t.border}`, padding: "18px 0" }}>
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "baseline", flexWrap: "wrap", gap: 8,
      }}>
        <div style={{
          fontFamily: "'Times New Roman', serif",
          fontSize: "clamp(15px, 2.3vw, 17px)",
          color: t.text, fontStyle: "italic",
        }}>
          {caseItem.citation}
        </div>
        <div style={{
          fontFamily: "'Helvetica Neue', sans-serif", fontSize: 11,
          color: t.textTertiary, letterSpacing: 1, whiteSpace: "nowrap",
        }}>
          {caseItem.court}
        </div>
      </div>
      <div style={{
        fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13,
        color: t.textSecondary, lineHeight: 1.6, marginTop: 8,
      }}>
        {caseItem.relevance}
      </div>
      {caseItem.outcome && (
        <div style={{
          fontFamily: "'Helvetica Neue', sans-serif", fontSize: 12,
          color: t.accentGreen, marginTop: 8, fontWeight: 500,
        }}>
          Outcome: {caseItem.outcome}
        </div>
      )}
      <VerificationBadge verification={verification} t={t} />
    </div>
  );
}
