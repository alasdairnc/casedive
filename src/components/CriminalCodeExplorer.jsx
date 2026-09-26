import { useEffect, useState, useRef } from "react";
import { useTheme } from "../lib/ThemeContext.jsx";
import { CRIMINAL_CODE_PARTS } from "../lib/criminalCodeParts.js";
import { useCriminalCodeSearch } from "../hooks/useCriminalCodeSearch.js";
import Select from "./Select.jsx";
import Button from "./ui/Button.jsx";
import { CONTENT_MAX_WIDTH, RADIUS } from "../lib/ui.js";

const SEVERITY_OPTIONS = [
  { value: "all", label: "All" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "Indictable", label: "Indictable" },
  { value: "Summary", label: "Summary" },
];

const PART_OPTIONS = [
  { value: "all", label: "All Parts" },
  ...CRIMINAL_CODE_PARTS.map((p) => ({ value: p.label, label: p.label })),
];

function SectionRow({ section, isExpanded, onToggle, t }) {
  const [hovered, setHovered] = useState(false);
  const isEnriched = !!(
    section.definition ||
    section.maxPenalty ||
    section.relatedSections?.length
  );

  // Small section heading inside the expanded details
  const labelStyle = {
    fontFamily: "var(--font-body)",
    fontSize: 12,
    fontWeight: 600,
    color: t.textTertiary,
    marginBottom: 6,
  };

  const bodyStyle = {
    fontFamily: "var(--font-body)",
    fontSize: 14,
    color: t.textSecondary,
    lineHeight: 1.6,
  };

  const pillStyle = {
    fontFamily: "var(--font-body)",
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 1.5,
    padding: "1px 8px",
    borderRadius: RADIUS.pill,
    whiteSpace: "nowrap",
  };

  function handleKeyDown(e) {
    // Only the row itself; keys pressed on the Justice Laws link bubble up here too
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  }

  return (
    <div
      // Keep this padding first: tests/e2e/ui-states.spec.js finds the row by it
      style={{
        padding: "14px 24px",
        borderBottom: `1px solid ${t.borderLight}`,
        cursor: isEnriched ? "pointer" : "default",
        background: isExpanded
          ? t.bgAlt
          : hovered && isEnriched
            ? t.bgHover
            : "transparent",
        transition: "background 0.2s ease",
      }}
      tabIndex={isEnriched ? 0 : undefined}
      aria-expanded={isEnriched ? isExpanded : undefined}
      onClick={isEnriched ? onToggle : undefined}
      onKeyDown={isEnriched ? handleKeyDown : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top row: section number, title, severity tag */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 20,
            marginTop: 3,
          }}
        >
          {isEnriched && (
            <span
              aria-hidden="true"
              style={{
                fontSize: 10,
                color: t.textTertiary,
                transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
                display: "inline-block",
              }}
            >
              ▶
            </span>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 4,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                fontWeight: 700,
                color: t.accent,
                whiteSpace: "nowrap",
              }}
            >
              s. {section.num}
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(14px, 2vw, 16px)",
                fontWeight: 500,
                color: t.text,
                lineHeight: 1.4,
                flex: 1,
                minWidth: 0,
              }}
            >
              {section.title}
            </span>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {isEnriched && !isExpanded && (
                <span
                  style={{
                    ...pillStyle,
                    color: t.accent,
                    background: t.accentSoft,
                  }}
                >
                  Enriched
                </span>
              )}
              {section.severity && (
                <span
                  style={{
                    ...pillStyle,
                    color: t.tagText,
                    background: t.tagBg,
                    border: `1px solid ${t.border}`,
                  }}
                >
                  {section.severity}
                </span>
              )}
            </div>
          </div>

          {/* Definition preview (collapsed) */}
          {!isExpanded && section.definition && (
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: t.textSecondary,
                lineHeight: 1.5,
                marginTop: 4,
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {section.definition}
            </div>
          )}

          {/* Topic tags */}
          {section.topicsTagged?.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginTop: 8,
              }}
            >
              {section.topicsTagged.map((tag) => (
                <span
                  key={tag}
                  style={{
                    ...pillStyle,
                    fontWeight: 400,
                    color: t.textTertiary,
                    background: t.bg,
                    border: `1px solid ${t.borderLight}`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Expanded details */}
      {/* Clicks in here (including the Justice Laws link) must not collapse the row */}
      {isExpanded && isEnriched && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            marginTop: 16,
            paddingLeft: 32,
            paddingRight: 8,
            cursor: "default",
          }}
        >
          {section.definition && (
            <div style={{ marginBottom: 16 }}>
              <div style={labelStyle}>Definition</div>
              <div style={bodyStyle}>{section.definition}</div>
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {section.maxPenalty && (
              <div style={{ marginBottom: 12 }}>
                <div style={labelStyle}>Max penalty</div>
                <div style={bodyStyle}>{section.maxPenalty}</div>
              </div>
            )}

            {section.defences?.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <div style={labelStyle}>Common defences</div>
                <div style={bodyStyle}>{section.defences.join(" · ")}</div>
              </div>
            )}
          </div>

          {section.relatedSections?.length > 0 && (
            <div style={{ marginBottom: 16, marginTop: 8 }}>
              <div style={labelStyle}>Related sections</div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                }}
              >
                {section.relatedSections.map((s) => (
                  <span
                    key={s}
                    style={{
                      ...pillStyle,
                      fontFamily: "var(--font-mono)",
                      color: t.accent,
                      background: t.accentSoft,
                    }}
                  >
                    s. {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div
            style={{
              marginTop: 20,
              paddingTop: 12,
              borderTop: `1px solid ${t.borderLight}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {section.partOf && (
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: t.textTertiary,
                }}
              >
                {section.partOf}
              </span>
            )}
            {section.url && (
              <Button
                variant="link"
                size="sm"
                href={section.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Full text on Justice Laws ↗
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CriminalCodeExplorer({ onClose }) {
  const t = useTheme();
  const inputRef = useRef(null);
  const [expandedSection, setExpandedSection] = useState(null);

  const {
    query,
    setQuery,
    severityFilter,
    setSeverityFilter,
    partFilter,
    setPartFilter,
    results,
    totalMatches,
    totalSections,
    isLoading,
  } = useCriminalCodeSearch();

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Auto-focus search input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const messageStyle = {
    padding: "48px 24px",
    fontFamily: "var(--font-display)",
    fontSize: 14,
    color: t.textSecondary,
    fontStyle: "italic",
    textAlign: "center",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="code-explorer-title"
        style={{
          background: t.bg,
          border: `1px solid ${t.border}`,
          borderBottom: "none",
          borderRadius: `${RADIUS.lg}px ${RADIUS.lg}px 0 0`,
          width: "100%",
          maxWidth: CONTENT_MAX_WIDTH,
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: `0 -8px 32px ${t.shadowStrong}`,
        }}
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
              minWidth: 0,
            }}
          >
            <span
              id="code-explorer-title"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                fontWeight: 600,
                color: t.text,
              }}
            >
              Criminal Code of Canada
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: t.textTertiary,
                background: t.bgAlt,
                padding: "1px 8px",
                borderRadius: RADIUS.pill,
                border: `1px solid ${t.borderLight}`,
                whiteSpace: "nowrap",
              }}
            >
              {totalSections} sections
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close"
            onClick={onClose}
            style={{ fontSize: 22, flexShrink: 0 }}
          >
            ×
          </Button>
        </div>

        {/* Search + Filters */}
        <div
          style={{
            padding: "16px 24px",
            borderBottom: `1px solid ${t.borderLight}`,
          }}
        >
          <div style={{ position: "relative" }}>
            <input
              ref={inputRef}
              type="text"
              aria-label="Search sections"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search section number, title or keyword (e.g. theft, assault)"
              style={{
                width: "100%",
                height: 40,
                padding: "0 40px 0 12px",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                backgroundColor: t.bgAlt,
                color: t.text,
                border: `1px solid ${t.border}`,
                borderRadius: RADIUS.md,
                boxSizing: "border-box",
              }}
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                style={{
                  position: "absolute",
                  right: 4,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 32,
                  height: 32,
                }}
              >
                ×
              </Button>
            )}
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 12,
              flexWrap: "wrap",
            }}
          >
            <Select
              label="Severity"
              options={SEVERITY_OPTIONS}
              value={severityFilter}
              onChange={setSeverityFilter}
            />
            <Select
              label="Part"
              options={PART_OPTIONS}
              value={partFilter}
              onChange={setPartFilter}
            />
          </div>
        </div>

        {/* Results count */}
        {(query || severityFilter !== "all" || partFilter !== "all") && (
          <div
            style={{
              padding: "8px 24px",
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: t.textTertiary,
              borderBottom: `1px solid ${t.borderLight}`,
              background: t.bg,
            }}
          >
            {totalMatches === 0
              ? "No results found."
              : totalMatches <= 100
                ? `Showing ${totalMatches} result${totalMatches !== 1 ? "s" : ""}`
                : `Showing first 100 of ${totalMatches} matches. Refine your search for better results.`}
          </div>
        )}

        {/* Results list */}
        <div style={{ overflowY: "auto", flexGrow: 1, background: t.bg }}>
          {isLoading ? (
            <div style={messageStyle}>Loading sections…</div>
          ) : results.length === 0 ? (
            <div style={messageStyle}>
              {query || severityFilter !== "all" || partFilter !== "all"
                ? "No sections match your current filters."
                : "Type to browse or search the Criminal Code database."}
            </div>
          ) : (
            results.map((section) => (
              <SectionRow
                key={section.num}
                section={section}
                isExpanded={expandedSection === section.num}
                onToggle={() =>
                  setExpandedSection(
                    expandedSection === section.num ? null : section.num,
                  )
                }
                t={t}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
