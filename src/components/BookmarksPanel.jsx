import { useTheme } from "../lib/ThemeContext.jsx";

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

export default function BookmarksPanel({
  bookmarks,
  removeBookmark,
  clearBookmarks,
  onClose,
}) {
  const t = useTheme();

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
    width: "100%",
    maxWidth: 760,
    maxHeight: "70vh",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div
        data-testid="bookmarks-panel"
        style={sheetStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "12px 0 4px",
          }}
        >
          <div
            style={{
              width: 36,
              height: 4,
              background: t.border,
              borderRadius: 2,
            }}
          />
        </div>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 24px 12px",
            borderBottom: `1px solid ${t.borderLight}`,
          }}
        >
          <div
            style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: 10,
              letterSpacing: 3.5,
              textTransform: "uppercase",
              color: t.textTertiary,
            }}
          >
            Saved Citations
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {bookmarks.length > 0 && (
              <button
                onClick={clearBookmarks}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  fontFamily: "'Helvetica Neue', sans-serif",
                  fontSize: 11,
                  color: t.textTertiary,
                  letterSpacing: 1,
                }}
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: 18,
                color: t.textTertiary,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ overflowY: "auto", flexGrow: 1 }}>
          {bookmarks.length === 0 ? (
            <div
              style={{
                padding: "32px 24px",
                fontFamily: "'Times New Roman', serif",
                fontSize: 15,
                color: t.textTertiary,
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
                  padding: "14px 24px",
                  borderBottom: `1px solid ${t.borderLight}`,
                  gap: 12,
                }}
              >
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  {/* Citation */}
                  <div
                    style={{
                      fontFamily: "'Times New Roman', serif",
                      fontSize: "clamp(13px, 2vw, 15px)",
                      color: t.text,
                      fontWeight: "bold",
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
                      marginTop: 4,
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Helvetica Neue', sans-serif",
                        fontSize: 9,
                        letterSpacing: 1.5,
                        textTransform: "uppercase",
                        color: t.tagText,
                        background: t.tagBg,
                        padding: "1px 6px",
                        border: `1px solid ${t.border}`,
                      }}
                    >
                      {TYPE_LABELS[entry.type] || entry.type}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Helvetica Neue', sans-serif",
                        fontSize: 10,
                        color: t.textTertiary,
                        letterSpacing: 0.5,
                      }}
                    >
                      {formatDate(entry.bookmarkedAt)}
                    </span>
                  </div>

                  {/* Summary — 2-line clamp */}
                  {entry.summary && (
                    <div
                      style={{
                        fontFamily: "'Helvetica Neue', sans-serif",
                        fontSize: 12,
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
                    <a
                      href={`https://www.canlii.org/en/#search/text=${encodeURIComponent(entry.citation)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        fontFamily: "'Helvetica Neue', sans-serif",
                        fontSize: 11,
                        color: t.textTertiary,
                        textDecoration: "none",
                        marginTop: 6,
                        letterSpacing: 0.5,
                      }}
                    >
                      Search CanLII ↗
                    </a>
                  )}
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeBookmark(entry.id)}
                  aria-label="Remove bookmark"
                  style={{
                    flexShrink: 0,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px 8px",
                    fontFamily: "'Helvetica Neue', sans-serif",
                    fontSize: 18,
                    lineHeight: 1,
                    color: t.textTertiary,
                    minWidth: 36,
                    minHeight: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
