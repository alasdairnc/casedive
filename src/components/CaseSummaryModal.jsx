import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../lib/ThemeContext.jsx";
import { isValidUrl } from "../lib/validateUrl.js";
import { useMediaQuery } from "../hooks/useMediaQuery.js";
import { RADIUS } from "../lib/ui.js";
import Button from "./ui/Button.jsx";

function Skeleton({ width = "100%", height = 14, style = {} }) {
  const t = useTheme();
  return (
    <div
      style={{
        width,
        height,
        background: t.borderLight,
        borderRadius: 3,
        opacity: 0.6,
        animation: "cfBlink 1.2s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

function SummarySection({ label, children, t, isQuote = false }) {
  if (!children) return null;
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          fontWeight: 600,
          color: t.textTertiary,
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      {isQuote ? (
        <blockquote
          style={{
            margin: 0,
            paddingLeft: 14,
            borderLeft: `3px solid ${t.accent}`,
            fontFamily: "var(--font-display)",
            fontSize: 15,
            color: t.textSecondary,
            lineHeight: 1.7,
            fontStyle: "italic",
          }}
        >
          {children}
        </blockquote>
      ) : (
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            color: t.textSecondary,
            lineHeight: 1.65,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function LoadingSkeleton({ t }) {
  return (
    <div>
      {[80, 100, 60, 90, 70].map((w, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <Skeleton width={50} height={10} style={{ marginBottom: 8 }} />
          <Skeleton width={`${w}%`} height={13} style={{ marginBottom: 5 }} />
          <Skeleton width={`${Math.min(w + 10, 100)}%`} height={13} />
        </div>
      ))}
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

// Module-level cache: citation string → normalized summary object
const summaryCache = new Map();

export default function CaseSummaryModal({ item, canliiUrl, onClose }) {
  const t = useTheme();
  const titleId = useId();
  const closeRef = useRef(null);
  const [summary, setSummary] = useState(
    () => summaryCache.get(item.citation) || null,
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!summaryCache.has(item.citation));

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Move focus into the dialog on open; hand it back to the opener on close
  useEffect(() => {
    const opener = document.activeElement;
    closeRef.current?.focus();
    return () => opener?.focus?.();
  }, []);

  // Fetch summary (skip if already in module-level cache)
  useEffect(() => {
    if (summaryCache.has(item.citation)) return;

    let cancelled = false;
    setLoading(true);
    setError(null);
    setSummary(null);

    fetch("/api/case-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        citation: item.citation,
        title: item.title,
        court: item.court,
        year: item.year,
        summary: item.summary,
        matchedContent: item.matched_section || item.matched_content,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.error) {
          setError(data.error);
        } else {
          summaryCache.set(item.citation, data);
          setSummary(data);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load summary. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [item.citation]);

  const viewUrl = isValidUrl(canliiUrl) ? canliiUrl : null;

  // Mobile: full-width bottom sheet; desktop: centered card
  const isMobile = useMediaQuery("(max-width: 639px)");

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: t.shadow,
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: isMobile ? "flex-end" : "center",
        justifyContent: "center",
        padding: isMobile ? 0 : "24px 16px",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: t.bgAlt,
          border: `1px solid ${t.border}`,
          boxShadow: `0 24px 64px ${t.shadowStrong}`,
          width: "100%",
          maxWidth: isMobile ? "100%" : 640,
          maxHeight: isMobile ? "88vh" : "82vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: isMobile ? "12px 12px 0 0" : RADIUS.lg,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px 16px 14px 20px",
            borderBottom: `1px solid ${t.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 12,
            flexShrink: 0,
          }}
        >
          <div style={{ minWidth: 0, paddingTop: 4 }}>
            <h2
              id={titleId}
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontSize: 17,
                color: t.text,
                fontWeight: 600,
                lineHeight: 1.4,
              }}
            >
              {item.citation}
            </h2>
            {(item.court || item.year) && (
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: t.textTertiary,
                  marginTop: 4,
                }}
              >
                {[item.court, item.year].filter(Boolean).join(" · ")}
              </div>
            )}
          </div>
          <Button
            ref={closeRef}
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close"
            style={{ flexShrink: 0 }}
          >
            <CloseIcon />
          </Button>
        </div>

        {/* Body */}
        <div
          aria-busy={loading}
          style={{
            padding: "20px 20px 4px",
            overflowY: "auto",
            flex: 1,
          }}
        >
          {loading && <LoadingSkeleton t={t} />}
          {error && (
            <div
              role="alert"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: t.accentRed,
                padding: "12px 0",
              }}
            >
              {error}
            </div>
          )}
          {summary && !loading && (
            <>
              <SummarySection label="Facts" t={t}>
                {summary.facts}
              </SummarySection>
              <SummarySection label="Held" t={t}>
                {summary.held}
              </SummarySection>
              <SummarySection label="Ratio decidendi" t={t}>
                {summary.ratio}
              </SummarySection>
              {summary.keyQuote && (
                <SummarySection label="Key quote" t={t} isQuote>
                  {summary.keyQuote}
                </SummarySection>
              )}
              <SummarySection label="Significance" t={t}>
                {summary.significance}
              </SummarySection>
            </>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "12px 20px",
            borderTop: `1px solid ${t.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexShrink: 0,
          }}
        >
          {viewUrl ? (
            <Button
              variant="link"
              size="sm"
              href={viewUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on CanLII ↗
            </Button>
          ) : (
            <span />
          )}
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
