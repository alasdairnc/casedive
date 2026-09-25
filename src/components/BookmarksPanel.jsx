import { useEffect, useRef } from "react";
import { useTheme } from "../lib/ThemeContext.jsx";
import Button from "./ui/Button.jsx";
import { CONTENT_MAX_WIDTH, RADIUS } from "../lib/ui.js";

const TYPE_LABELS = {
  criminal_code: "Criminal Code",
  case_law: "Case Law",
  civil_law: "Civil Law",
  charter: "Charter",
};

function formatDate(ts) {
  const d = new Date(ts);
  const today = new Date();
  if (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  ) {
    return "Today";
  }
  return d.toLocaleDateString("en-CA", { month: "short", day: "numeric" });
}

// Outline trash can, so "remove" doesn't look like the panel's close ×.
function TrashIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

export default function BookmarksPanel({
  bookmarks,
  removeBookmark,
  clearBookmarks,
  onClose,
}) {
  const t = useTheme();
  const closeRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Move focus into the sheet when it opens
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 200,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  };

  const sheetStyle = {
    background: t.bg,
    border: `1px solid ${t.border}`,
    borderBottom: "none",
    borderRadius: `${RADIUS.lg}px ${RADIUS.lg}px 0 0`,
    boxShadow: `0 -8px 32px ${t.shadowStrong}`,
    width: "100%",
    maxWidth: CONTENT_MAX_WIDTH,
    maxHeight: "70vh",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div
        data-testid="bookmarks-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bookmarks-panel-title"
        style={sheetStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "12px 16px 12px 24px",
            borderBottom: `1px solid ${t.borderLight}`,
          }}
        >
          <h2
            id="bookmarks-panel-title"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              fontWeight: 600,
              color: t.text,
              margin: 0,
            }}
          >
            Saved Citations
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {bookmarks.length > 0 && (
              <Button variant="danger" size="sm" onClick={clearBookmarks}>
                Clear all
              </Button>
            )}
            <Button
              ref={closeRef}
              variant="ghost"
              size="icon"
              aria-label="Close"
              onClick={onClose}
              style={{ fontSize: 22 }}
            >
              ×
            </Button>
          </div>
        </div>

        {/* Content */}
        <div style={{ overflowY: "auto", flexGrow: 1 }}>
          {bookmarks.length === 0 ? (
            <div
              style={{
                padding: "32px 24px",
                fontFamily: "var(--font-display)",
                fontSize: 14,
                color: t.textSecondary,
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              No saved citations yet.
            </div>
          ) : (
            bookmarks.map((entry) => (
              <div
                key={entry.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  padding: "14px 16px 14px 24px",
                  borderBottom: `1px solid ${t.borderLight}`,
                  gap: 12,
                }}
              >
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  {/* Citation */}
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 15,
                      color: t.text,
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}
                  >
                    {entry.citation}
                  </div>

                  {/* Type badge + date */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 6,
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 12,
                        fontWeight: 500,
                        color: t.tagText,
                        background: t.tagBg,
                        padding: "2px 8px",
                        border: `1px solid ${t.border}`,
                        borderRadius: RADIUS.pill,
                      }}
                    >
                      {TYPE_LABELS[entry.type] || entry.type}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 12,
                        color: t.textTertiary,
                      }}
                    >
                      {formatDate(entry.bookmarkedAt)}
                    </span>
                  </div>

                  {/* Summary — 2-line clamp */}
                  {entry.summary && (
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 14,
                        color: t.textSecondary,
                        lineHeight: 1.5,
                        marginTop: 6,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {entry.summary}
                    </div>
                  )}

                  {/* CanLII link for case law */}
                  {entry.type === "case_law" && (
                    <div style={{ marginTop: 8 }}>
                      <Button
                        variant="link"
                        size="sm"
                        href={`https://www.canlii.org/en/#search/text=${encodeURIComponent(entry.citation)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Search CanLII ↗
                      </Button>
                    </div>
                  )}
                </div>

                {/* Remove button */}
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Remove bookmark"
                  onClick={() => removeBookmark(entry.id)}
                  style={{ flexShrink: 0 }}
                >
                  <TrashIcon />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
