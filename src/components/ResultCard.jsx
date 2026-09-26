import { useTheme } from "../lib/ThemeContext.jsx";
import { isValidUrl } from "../lib/validateUrl.js";
import { useId, useState } from "react";
import {
  CASE_LAW_REPORT_REASONS,
  MAX_CASE_LAW_REPORT_NOTE_LENGTH,
} from "../lib/caseLawReportReasons.js";
import Button from "./ui/Button.jsx";
import { RADIUS } from "../lib/ui.js";

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

// One pill-shaped external link for every verification status. Glyphs are
// aria-hidden so the accessible name is just the label.
// The card around it opens the case summary on click/Enter, so the link keeps
// its activation to itself. Only Enter/Space stop at the link: Escape still has
// to reach the window listeners that close open panels.
function BadgeLink({ href, color, icon, label, t }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") e.stopPropagation();
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        boxSizing: "border-box",
        marginTop: 12,
        padding: "4px 10px",
        borderRadius: RADIUS.pill,
        border: `1px solid ${hovered ? color : t.border}`,
        background: t.tagBg,
        fontFamily: "var(--font-body)",
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 1.4,
        color,
        textDecoration: "none",
        transition: "border-color 0.15s",
      }}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {label}
      <span aria-hidden="true">{"\u2197"}</span>
    </a>
  );
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
      <BadgeLink
        href={safeUrl}
        color={t.accentGreen}
        icon={"\u2713"}
        label={label}
        t={t}
      />
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
      <BadgeLink
        href={safeSearchUrl}
        color={t.accentRed}
        icon={"\u26A0"}
        label={label}
        t={t}
      />
    );
  }

  if (status === "unverified") {
    const safeUrl =
      itemUrl ||
      (isValidUrl(searchUrl) && searchUrl) ||
      (isValidUrl(url) && url);
    if (!safeUrl) return null;
    return (
      <BadgeLink
        href={safeUrl}
        color={t.textTertiary}
        icon={"\u2192"}
        label="Pre-2000 — verify on CanLII"
        t={t}
      />
    );
  }

  const href =
    itemUrl || (isValidUrl(url) && url) || (isValidUrl(searchUrl) && searchUrl);
  if (!href) return null;
  return (
    <BadgeLink
      href={href}
      color={t.textTertiary}
      icon={"\u2192"}
      label="Search CanLII"
      t={t}
    />
  );
}

function BookmarkIcon({ filled }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
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
  const [hovered, setHovered] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportNote, setReportNote] = useState("");
  const [reportState, setReportState] = useState("idle");
  const [reportError, setReportError] = useState("");
  const reportPanelId = useId();
  const reportHeadingId = useId();
  const reasonId = useId();
  const noteId = useId();
  const noteHintId = useId();

  function handleCardKeyDown(e) {
    // Only the card itself; keys pressed in nested controls bubble up here too
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onCardClick(item);
    }
  }

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

  const eyebrowStyle = {
    fontFamily: "var(--font-body)",
    fontSize: 12,
    fontWeight: 600,
    color: t.textTertiary,
  };

  const fieldLabelStyle = {
    display: "block",
    fontFamily: "var(--font-body)",
    fontSize: 13,
    fontWeight: 500,
    color: t.textSecondary,
    marginBottom: 6,
  };

  const fieldStyle = {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    border: `1px solid ${t.border}`,
    borderRadius: RADIUS.md,
    background: t.bgAlt,
    color: t.text,
    fontFamily: "var(--font-body)",
    fontSize: 14,
    padding: "9px 12px",
  };

  return (
    <div
      onClick={clickable ? () => onCardClick(item) : undefined}
      onKeyDown={clickable ? handleCardKeyDown : undefined}
      tabIndex={clickable ? 0 : undefined}
      onMouseEnter={clickable ? () => setHovered(true) : undefined}
      onMouseLeave={clickable ? () => setHovered(false) : undefined}
      style={{
        background: t.cardBg,
        border: `1px solid ${clickable && hovered ? t.textTertiary : t.border}`,
        borderRadius: RADIUS.lg,
        padding: "18px 20px",
        marginBottom: 12,
        cursor: clickable ? "pointer" : "default",
        transition: "border-color 0.15s",
      }}
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
          <h3
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: 16,
              color: t.text,
              fontWeight: 600,
              lineHeight: 1.35,
            }}
          >
            {item.title || item.citation}
          </h3>

          {/* Neutral citation below title when both present */}
          {item.title && item.title !== item.citation && (
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: t.textSecondary,
                marginTop: 4,
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
              gap: 8,
              marginTop: 6,
              flexWrap: "wrap",
            }}
          >
            {type === "case_law" && item.court && (
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: t.textTertiary,
                }}
              >
                {item.court}
                {item.year ? ` \u00B7 ${item.year}` : ""}
              </div>
            )}
            {type === "civil_law" && verification?.jurisdiction && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "2px 10px",
                  borderRadius: RADIUS.pill,
                  border: `1px solid ${t.border}`,
                  background: t.tagBg,
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  fontWeight: 500,
                  lineHeight: 1.5,
                  color: t.tagText,
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
            gap: 4,
            flexShrink: 0,
            margin: "-6px -8px 0 0",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {reportable &&
            (reportState === "success" ? (
              <div
                data-testid="report-case-law-success"
                role="status"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "3px 10px",
                  borderRadius: RADIUS.pill,
                  border: `1px solid ${t.border}`,
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  fontWeight: 500,
                  color: t.textSecondary,
                }}
              >
                Reported
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                data-testid="report-case-law-open"
                onClick={handleReportToggle}
                aria-label="Report this case law result"
                aria-expanded={reportOpen}
                aria-controls={reportOpen ? reportPanelId : undefined}
              >
                Report
              </Button>
            ))}

          {addBookmark && removeBookmark && isBookmarked && citationId && (
            <Button
              variant="ghost"
              size="icon"
              data-testid={bookmarked ? "bookmark-remove" : "bookmark-add"}
              onClick={handleBookmarkClick}
              aria-label={
                bookmarked ? "Remove bookmark" : "Bookmark this citation"
              }
              style={bookmarked ? { color: t.accent } : undefined}
            >
              <BookmarkIcon filled={bookmarked} />
            </Button>
          )}
        </div>
      </div>

      {/* Summary */}
      {item.summary && (
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            color: t.textSecondary,
            lineHeight: 1.6,
            marginTop: 10,
          }}
        >
          {item.summary}
        </div>
      )}

      {reportable && reportOpen && reportState !== "success" && (
        <div
          id={reportPanelId}
          data-testid="report-case-law-panel"
          role="group"
          aria-labelledby={reportHeadingId}
          onClick={(e) => e.stopPropagation()}
          style={{
            marginTop: 14,
            padding: 16,
            border: `1px solid ${t.border}`,
            borderRadius: RADIUS.lg,
            background: t.bgAlt,
            cursor: "default",
          }}
        >
          <div
            id={reportHeadingId}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 600,
              color: t.text,
              marginBottom: 12,
            }}
          >
            Report this result
          </div>

          <label htmlFor={reasonId} style={fieldLabelStyle}>
            Reason
          </label>
          <select
            id={reasonId}
            data-testid="report-case-law-reason"
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            style={{ ...fieldStyle, minHeight: 40 }}
          >
            <option value="">Select a reason</option>
            {CASE_LAW_REPORT_REASONS.map((reason) => (
              <option key={reason.value} value={reason.value}>
                {reason.label}
              </option>
            ))}
          </select>

          <label
            htmlFor={noteId}
            style={{ ...fieldLabelStyle, marginTop: 14 }}
          >
            Note (optional)
          </label>
          <textarea
            id={noteId}
            data-testid="report-case-law-note"
            aria-describedby={noteHintId}
            value={reportNote}
            onChange={(e) =>
              setReportNote(
                e.target.value.slice(0, MAX_CASE_LAW_REPORT_NOTE_LENGTH),
              )
            }
            rows={3}
            maxLength={MAX_CASE_LAW_REPORT_NOTE_LENGTH}
            placeholder="Add any context that would help improve this match."
            style={{ ...fieldStyle, resize: "vertical", lineHeight: 1.5 }}
          />

          <div
            id={noteHintId}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: t.textTertiary,
              marginTop: 6,
            }}
          >
            {MAX_CASE_LAW_REPORT_NOTE_LENGTH - reportNote.length} characters
            remaining
          </div>

          {reportError && (
            <div
              data-testid="report-case-law-error"
              role="alert"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
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
              gap: 8,
              marginTop: 14,
            }}
          >
            <Button
              variant="primary"
              size="sm"
              data-testid="report-case-law-submit"
              onClick={handleReportSubmit}
              disabled={reportState === "submitting"}
            >
              {reportState === "submitting" ? "Sending..." : "Submit report"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReportCancel}
              disabled={reportState === "submitting"}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Why It Matched */}
      {matchedText && (
        <div style={{ marginTop: 14 }}>
          <div style={{ ...eyebrowStyle, marginBottom: 6 }}>Why it matched</div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: t.textSecondary,
              lineHeight: 1.6,
              borderLeft: `2px solid ${t.border}`,
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
              fontFamily: "var(--font-mono)",
              fontSize: 12,
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
