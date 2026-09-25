import { useEffect, useRef } from "react";
import { useTheme } from "../lib/ThemeContext.jsx";
import Button from "./ui/Button.jsx";
import { CONTENT_MAX_WIDTH, RADIUS } from "../lib/ui.js";

function formatTime(ts) {
  const d = new Date(ts);
  const h = d.getHours().toString().padStart(2, "0");
  const m = d.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
}

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

export default function SearchHistory({
  history,
  onSelect,
  onClose,
  clearHistory,
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
        data-testid="search-history-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-history-title"
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
            id="search-history-title"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              fontWeight: 600,
              color: t.text,
              margin: 0,
            }}
          >
            Search History
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {history.length > 0 && (
              <Button variant="danger" size="sm" onClick={clearHistory}>
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
          {history.length === 0 ? (
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
              No search history yet.
            </div>
          ) : (
            history.slice(0, 10).map((entry) => (
              <div
                key={entry.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 16px 14px 24px",
                  borderBottom: `1px solid ${t.borderLight}`,
                  gap: 12,
                }}
              >
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      color: t.text,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      lineHeight: 1.5,
                    }}
                  >
                    {entry.query.length > 70
                      ? entry.query.slice(0, 70) + "…"
                      : entry.query}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      color: t.textTertiary,
                      marginTop: 2,
                    }}
                  >
                    {formatDate(entry.timestamp)} ·{" "}
                    {formatTime(entry.timestamp)}
                    {(() => {
                      const rc = entry.resultCounts || {};
                      const count =
                        (rc.criminal_code || 0) +
                        (rc.case_law || 0) +
                        (rc.civil_law || 0) +
                        (rc.charter || 0);
                      return count
                        ? ` · ${count} result${count !== 1 ? "s" : ""}`
                        : "";
                    })()}
                  </div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    onSelect(entry.id);
                    onClose();
                  }}
                  style={{ flexShrink: 0 }}
                >
                  Re-run
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
