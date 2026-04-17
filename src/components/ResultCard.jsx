import { useTheme } from "../lib/ThemeContext.jsx";
import { isValidUrl } from "../lib/validateUrl.js";
import { useState } from "react";
import {
  CASE_LAW_REPORT_REASONS,
  MAX_CASE_LAW_REPORT_NOTE_LENGTH,
} from "../lib/caseLawReportReasons.js";

export function sanitizeMatchedTextForDisplay(text) {
  const raw = String(text || "").trim();
  if (!raw) return "";

  // Strip debug-only telemetry fragments while preserving human-readable legal rationale.
  const scrubbed = raw
    .replace(/\|\s*Selection signals:[^|]*/gi, "")
    .replace(/\|\s*Issue signals:[^|]*/gi, "")
    .replace(/\|\s*Scenario terms:[^|]*/gi, "")
    .replace(/\|\s*token_overlap:\d+[^|]*/gi, "")
    .replace(/\|\s*semantic_match:[^|]*/gi, "")
    .replace(/\|\s*issue:[a-z_]+[^|]*/gi, "")
    .replace(
      /\|\s*(recent_case|modern_case|landmark|local_fallback|minimal_detail_scenario)[^|]*/gi,
      "",
    )
    .replace(/\|\s*(court_level:[^|,\s]+|jurisdiction:[^|,\s]+)[^|]*/gi, "")
    .replace(/\|\s*(overlap:\d+|issue_hits:\d+)[^|]*/gi, "");

  const debugTokenPattern =
    /(token_overlap:|semantic_match:|\bissue:|court_level:|jurisdiction:|overlap:\d+|issue_hits:\d+|local_fallback|minimal_detail_scenario)/i;

  return scrubbed
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean)
    .filter((part) => !debugTokenPattern.test(part))
    .join(" | ");
}

function VerificationBadge({ verification, item, t, type }) {
  if (!verification) return null;
  const { status, url, searchUrl } = verification;
  const itemUrl =
    type === "case_law" && isValidUrl(item?.url_canlii)
      ? item.url_canlii
      : null;

  if (status === "verified") {
    const safeUrl = isValidUrl(url) ? url : null;
    if (!safeUrl) return null;
    const label =
      type === "criminal_code"
        ? "Confirmed — Justice Laws"
        : "Verified on CanLII";
    return (
      <a
        href={safeUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: 10,
          letterSpacing: "0.08em",
          color: t.accentGreen,
          textDecoration: "none",
          marginTop: 10,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.textDecoration = "underline";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.textDecoration = "none";
        }}
      >
        {"\u2713"}&thinsp;{label}&thinsp;{"\u2197"}
      </a>
    );
  }

  if (status === "not_found") {
    const safeSearchUrl = itemUrl || (isValidUrl(searchUrl) ? searchUrl : null);
    if (!safeSearchUrl) return null;
    const label =
      type === "criminal_code"
        ? "Section not confirmed — check Justice Laws"
        : "Not found — search CanLII";
    return (
      <a
        href={safeSearchUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: 10,
          letterSpacing: "0.08em",
          color: t.accentRed,
          textDecoration: "none",
          marginTop: 10,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.textDecoration = "underline";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.textDecoration = "none";
        }}
      >
        {"\u26A0"}&thinsp;{label}&thinsp;{"\u2197"}
      </a>
    );
  }

  if (status === "unverified") {
    const safeUrl =
      itemUrl ||
      (isValidUrl(searchUrl) && searchUrl) ||
      (isValidUrl(url) && url);
    if (!safeUrl) return null;
    return (
      <a
        href={safeUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: 10,
          letterSpacing: "0.08em",
          color: t.textTertiary,
          textDecoration: "none",
          marginTop: 10,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.textDecoration = "underline";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.textDecoration = "none";
        }}
      >
        {"\u2192"}&thinsp;Pre-2000 — verify on CanLII&thinsp;{"\u2197"}
      </a>
    );
  }

  const href =
    itemUrl || (isValidUrl(url) && url) || (isValidUrl(searchUrl) && searchUrl);
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontFamily: "'Helvetica Neue', sans-serif",
        fontSize: 10,
        letterSpacing: "0.08em",
        color: t.textTertiary,
        textDecoration: "none",
        marginTop: 10,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.textDecoration = "underline";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.textDecoration = "none";
      }}
    >
      {"\u2192"}&thinsp;Search CanLII&thinsp;{"\u2197"}
    </a>
  );
}

function BookmarkIcon({ filled, color }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill={filled ? color : "none"}
      stroke={color}
      strokeWidth="1.5"
      style={{ display: "block" }}
    >
      <path d="M3 2h10v12l-5-3-5 3V2z" />
    </svg>
  );
}

export default function ResultCard({
  item,
  type,
  verification,
  onCardClick,
  addBookmark,
  removeBookmark,
  isBookmarked,
  resultIndex = 0,
  onReportCaseLaw,
}) {
  const t = useTheme();
  const matchedText = sanitizeMatchedTextForDisplay(
    item.matched_section || item.matched_content,
  );
  const showCanLII = type === "case_law" || type === "criminal_code";
  const clickable = type === "case_law" && typeof onCardClick === "function";
  const citationId = item.citation || item.section || "";
  const bookmarked = isBookmarked ? isBookmarked(citationId) : false;
  const reportable =
    type === "case_law" &&
    typeof onReportCaseLaw === "function" &&
    Boolean(citationId);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportNote, setReportNote] = useState("");
  const [reportState, setReportState] = useState("idle");
  const [reportError, setReportError] = useState("");

  function handleBookmarkClick(e) {
    e.stopPropagation();
    if (!citationId) return;
    if (bookmarked) {
      removeBookmark(citationId);
    } else {
      addBookmark(item, type, verification);
    }
  }

  function handleReportToggle(e) {
    e.stopPropagation();
    if (reportState === "success") return;
    setReportError("");
    setReportOpen((open) => !open);
  }

  function handleReportCancel(e) {
    e.stopPropagation();
    setReportError("");
    setReportOpen(false);
  }

  async function handleReportSubmit(e) {
    e.stopPropagation();
    if (reportState === "submitting") return;
    if (!reportReason) {
      setReportError("Choose a reason before sending the report.");
      return;
    }

    setReportState("submitting");
    setReportError("");

    try {
      await onReportCaseLaw({
        item,
        resultIndex,
        reason: reportReason,
        note: reportNote.slice(0, MAX_CASE_LAW_REPORT_NOTE_LENGTH),
      });
      setReportState("success");
      setReportOpen(false);
    } catch (err) {
      setReportState("error");
      setReportError(
        err?.message || "Could not send the report. Please try again.",
      );
    }
  }

  return (
    <div
      onClick={clickable ? () => onCardClick(item) : undefined}
      style={{
        borderBottom: `1px solid ${t.borderLight}`,
        padding: "20px 0",
        cursor: clickable ? "pointer" : "default",
      }}
      onMouseEnter={
        clickable
          ? (e) => {
              e.currentTarget.style.opacity = "0.72";
            }
          : undefined
      }
      onMouseLeave={
        clickable
          ? (e) => {
              e.currentTarget.style.opacity = "1";
            }
          : undefined
      }
    >
      {/* Citation row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Title / Citation heading */}
          <div
            style={{
              fontFamily: "'Times New Roman', serif",
              fontSize: "clamp(15px, 2.2vw, 17px)",
              color: t.text,
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            {item.title || item.citation}
          </div>

          {/* Neutral citation below title when both present */}
          {item.title && item.title !== item.citation && (
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 11,
                color: t.textTertiary,
                marginTop: 2,
              }}
            >
              {item.citation}
            </div>
          )}

          {/* Court / year / jurisdiction tag — same line below citation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 4,
              flexWrap: "wrap",
            }}
          >
            {type === "case_law" && item.court && (
              <div
                style={{
                  fontFamily: "'Helvetica Neue', sans-serif",
                  fontSize: 11,
                  color: t.textTertiary,
                  letterSpacing: "0.04em",
                }}
              >
                {item.court}
                {item.year ? ` \u00B7 ${item.year}` : ""}
              </div>
            )}
            {type === "civil_law" && verification?.jurisdiction && (
              <div
                style={{
                  fontFamily: "'Helvetica Neue', sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color:
                    verification.jurisdiction === "Federal"
                      ? t.accentGreen
                      : t.accent,
                }}
              >
                {verification.jurisdiction}
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {reportable &&
            (reportState === "success" ? (
              <div
                data-testid="report-case-law-success"
                style={{
                  fontFamily: "'Helvetica Neue', sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: t.textTertiary,
                }}
              >
                Reported
              </div>
            ) : (
              <button
                type="button"
                data-testid="report-case-law-open"
                onClick={handleReportToggle}
                aria-label="Report this case law result"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  fontFamily: "'Helvetica Neue', sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: t.textTertiary,
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = t.textSecondary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = t.textTertiary;
                }}
              >
                Report
              </button>
            ))}

          {addBookmark && removeBookmark && isBookmarked && citationId && (
            <button
              type="button"
              data-testid={bookmarked ? "bookmark-remove" : "bookmark-add"}
              onClick={handleBookmarkClick}
              aria-label={
                bookmarked ? "Remove bookmark" : "Bookmark this citation"
              }
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                color: bookmarked ? t.accentOlive : t.textTertiary,
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = t.accentOlive;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = bookmarked
                  ? t.accentOlive
                  : t.textTertiary;
              }}
            >
              <BookmarkIcon
                filled={bookmarked}
                color={bookmarked ? t.accentOlive : "currentColor"}
              />
            </button>
          )}
        </div>
      </div>

      {/* Summary */}
      {item.summary && (
        <div
          style={{
            fontFamily: "'Helvetica Neue', sans-serif",
            fontSize: 13,
            color: t.textSecondary,
            lineHeight: 1.65,
            marginTop: 10,
          }}
        >
          {item.summary}
        </div>
      )}

      {reportable && reportOpen && reportState !== "success" && (
        <div
          data-testid="report-case-law-panel"
          onClick={(e) => e.stopPropagation()}
          style={{
            marginTop: 12,
            padding: 14,
            border: `1px solid ${t.border}`,
            background: t.bgAlt,
          }}
        >
          <div
            style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: t.textTertiary,
              marginBottom: 8,
            }}
          >
            Report this result
          </div>

          <label
            style={{
              display: "block",
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: 11,
              color: t.textSecondary,
              marginBottom: 8,
            }}
          >
            Reason
          </label>
          <select
            data-testid="report-case-law-reason"
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            style={{
              width: "100%",
              border: `1px solid ${t.border}`,
              background: t.bg,
              color: t.text,
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: 12,
              padding: "10px 12px",
            }}
          >
            <option value="">Select a reason</option>
            {CASE_LAW_REPORT_REASONS.map((reason) => (
              <option key={reason.value} value={reason.value}>
                {reason.label}
              </option>
            ))}
          </select>

          <label
            style={{
              display: "block",
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: 11,
              color: t.textSecondary,
              marginTop: 12,
              marginBottom: 8,
            }}
          >
            Note (optional)
          </label>
          <textarea
            data-testid="report-case-law-note"
            value={reportNote}
            onChange={(e) =>
              setReportNote(
                e.target.value.slice(0, MAX_CASE_LAW_REPORT_NOTE_LENGTH),
              )
            }
            rows={3}
            maxLength={MAX_CASE_LAW_REPORT_NOTE_LENGTH}
            placeholder="Add any context that would help improve this match."
            style={{
              width: "100%",
              resize: "vertical",
              border: `1px solid ${t.border}`,
              background: t.bg,
              color: t.text,
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: 12,
              lineHeight: 1.6,
              padding: "10px 12px",
              boxSizing: "border-box",
            }}
          />

          <div
            style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: 10,
              color: t.textTertiary,
              marginTop: 8,
            }}
          >
            {MAX_CASE_LAW_REPORT_NOTE_LENGTH - reportNote.length} characters
            remaining
          </div>

          {reportError && (
            <div
              data-testid="report-case-law-error"
              style={{
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: 11,
                color: t.accentRed,
                marginTop: 10,
              }}
            >
              {reportError}
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 12,
            }}
          >
            <button
              type="button"
              data-testid="report-case-law-submit"
              onClick={handleReportSubmit}
              disabled={reportState === "submitting"}
              style={{
                border: `1px solid ${t.border}`,
                background: t.bg,
                color: t.text,
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "9px 12px",
                cursor: reportState === "submitting" ? "default" : "pointer",
                opacity: reportState === "submitting" ? 0.65 : 1,
              }}
            >
              {reportState === "submitting" ? "Sending..." : "Submit report"}
            </button>
            <button
              type="button"
              onClick={handleReportCancel}
              disabled={reportState === "submitting"}
              style={{
                border: "none",
                background: "none",
                color: t.textTertiary,
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: 0,
                cursor: reportState === "submitting" ? "default" : "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Why It Matched */}
      {matchedText && (
        <div style={{ marginTop: 12 }}>
          <div
            style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: 9,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: t.textTertiary,
              marginBottom: 5,
            }}
          >
            Why it matched
          </div>
          <div
            style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: 12,
              color: t.textSecondary,
              lineHeight: 1.65,
              borderLeft: `1px solid ${t.border}`,
              paddingLeft: 12,
            }}
          >
            {matchedText}
          </div>
        </div>
      )}

      {/* Verified Criminal Code enrichment */}
      {type === "criminal_code" &&
        verification?.status === "verified" &&
        verification.title && (
          <div
            style={{
              marginTop: 10,
              fontFamily: "'Courier New', monospace",
              fontSize: 11,
              color: t.textTertiary,
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: t.text }}>{verification.title}</span>
            {verification.severity && verification.severity !== "N/A" && (
              <span style={{ color: t.textTertiary }}>
                {" "}
                &middot; {verification.severity}
              </span>
            )}
            {verification.maxPenalty && verification.maxPenalty !== "N/A" && (
              <span style={{ color: t.textTertiary }}>
                {" "}
                &middot; Max: {verification.maxPenalty}
              </span>
            )}
          </div>
        )}

      {/* Verification badge */}
      {showCanLII && (
        <VerificationBadge
          verification={verification}
          item={item}
          t={t}
          type={type}
        />
      )}
    </div>
  );
}
