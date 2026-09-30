import { useEffect, useMemo, useState, useRef } from "react";
import { useTheme } from "../lib/ThemeContext.jsx";
import { buildTopicBrowse } from "../lib/criminalCodeTopics.js";
import { STATUTE_LIST } from "../lib/statutes.js";
import { useCriminalCodeSearch } from "../hooks/useCriminalCodeSearch.js";
import { useMediaQuery } from "../hooks/useMediaQuery.js";
import Select from "./Select.jsx";
import Button from "./ui/Button.jsx";
import { CONTENT_MAX_WIDTH, RADIUS } from "../lib/ui.js";

const SEVERITY_OPTIONS = [
  { value: "all", label: "All" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "Indictable", label: "Indictable" },
  { value: "Summary", label: "Summary" },
];

function TopicBrowse({
  sections,
  topics,
  topicGroups,
  topicFilter,
  setTopicFilter,
  expandedSection,
  setExpandedSection,
  t,
}) {
  const browse = useMemo(() => buildTopicBrowse(sections, topics), [sections, topics]);
  const [openTopic, setOpenTopic] = useState(null);
  // Picking a topic in the filter opens just that topic; clicking its header
  // then clears the filter so the full topic list comes back.
  const visible =
    topicFilter === "all" ? browse : browse.filter((b) => b.topic.id === topicFilter);
  const activeTopic = topicFilter === "all" ? openTopic : topicFilter;

  return (
    <div>
      {topicGroups.map((group) => {
        const topics = visible.filter((b) => b.topic.group === group.id && b.count > 0);
        if (topics.length === 0) return null;
        return (
          <div key={group.id}>
            <div
              style={{
                padding: "16px 24px 8px",
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: t.textTertiary,
              }}
            >
              {group.label}
            </div>
            {topics.map(({ topic, count, groups }) => {
              const isOpen = activeTopic === topic.id;
              return (
                <div key={topic.id} style={{ borderBottom: `1px solid ${t.borderLight}` }}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => {
                      if (topicFilter !== "all") {
                        setTopicFilter("all");
                        setOpenTopic(null);
                      } else {
                        setOpenTopic(isOpen ? null : topic.id);
                      }
                    }}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      width: "100%",
                      padding: "14px 24px",
                      background: isOpen ? t.bgAlt : "transparent",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      color: t.text,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        fontSize: 10,
                        marginTop: 5,
                        width: 20,
                        textAlign: "center",
                        color: t.textTertiary,
                        transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                        display: "inline-block",
                      }}
                    >
                      ▶
                    </span>
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span
                        style={{
                          display: "block",
                          fontFamily: "var(--font-body)",
                          fontSize: 15,
                          fontWeight: 600,
                        }}
                      >
                        {topic.label}
                      </span>
                      <span
                        style={{
                          display: "block",
                          marginTop: 2,
                          fontFamily: "var(--font-body)",
                          fontSize: 13,
                          lineHeight: 1.5,
                          color: t.textSecondary,
                        }}
                      >
                        {topic.blurb}
                      </span>
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        color: t.textTertiary,
                        whiteSpace: "nowrap",
                        marginTop: 2,
                      }}
                    >
                      {count} {count === 1 ? "section" : "sections"}
                    </span>
                  </button>
                  {isOpen &&
                    groups.map((g) => (
                      <div key={g.label}>
                        {g.label && (
                          <div
                            style={{
                              padding: "10px 24px 6px 56px",
                              fontFamily: "var(--font-body)",
                              fontSize: 12,
                              fontWeight: 600,
                              color: t.textTertiary,
                              background: t.bgAlt,
                              borderTop: `1px solid ${t.borderLight}`,
                            }}
                          >
                            {g.label}
                          </div>
                        )}
                        {g.sections.map((section) => (
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
                        ))}
                      </div>
                    ))}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function SectionRow({ section, isExpanded, onToggle, t }) {
  const [hovered, setHovered] = useState(false);
  // "Enriched" (the pill) means hand-curated: definition + defences +
  // relatedSections written and reviewed by a person. `summary` is a
  // separately-generated, independently-verified plain-language summary —
  // it gets its own "Summary" pill so the two are never conflated. CDSA/YCJA
  // summaries (summarySource "act-text") were written from the Act's text
  // without the independent verifier, and are labelled as such.
  const summaryLabel = section.summarySource ? "Summary (from the Act's text)" : "Summary";
  const isCurated = !!section.definition;
  const hasDetails = !!(
    section.definition ||
    section.summary ||
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
        cursor: hasDetails ? "pointer" : "default",
        background: isExpanded
          ? t.bgAlt
          : hovered && hasDetails
            ? t.bgHover
            : "transparent",
        transition: "background 0.2s ease",
      }}
      tabIndex={hasDetails ? 0 : undefined}
      aria-expanded={hasDetails ? isExpanded : undefined}
      onClick={hasDetails ? onToggle : undefined}
      onKeyDown={hasDetails ? handleKeyDown : undefined}
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
          {hasDetails && (
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
              {isCurated && !isExpanded && (
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
              {!isCurated && section.summary && !isExpanded && (
                <span
                  style={{
                    ...pillStyle,
                    color: t.textTertiary,
                    background: t.bg,
                    border: `1px solid ${t.borderLight}`,
                  }}
                >
                  {summaryLabel}
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

          {/* Definition/summary preview (collapsed) */}
          {!isExpanded && (section.definition || section.summary) && (
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
              {section.definition || section.summary}
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
      {isExpanded && hasDetails && (
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

          {!section.definition && section.summary && (
            <div style={{ marginBottom: 16 }}>
              <div style={labelStyle}>{summaryLabel}</div>
              <div style={bodyStyle}>{section.summary}</div>
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
  // Mobile: full-width bottom sheet; desktop: centered card (matches CaseSummaryModal)
  const isMobile = useMediaQuery("(max-width: 639px)");

  const {
    statute,
    setStatuteId,
    parts,
    query,
    setQuery,
    severityFilter,
    setSeverityFilter,
    partFilter,
    setPartFilter,
    topicFilter,
    setTopicFilter,
    allSections,
    results,
    totalMatches,
    totalSections,
    isLoading,
  } = useCriminalCodeSearch();

  const partOptions = useMemo(
    () => [
      { value: "all", label: "All Parts" },
      ...parts.map((p) => ({ value: p.label, label: p.label })),
    ],
    [parts],
  );
  const topicOptions = useMemo(
    () => [
      { value: "all", label: "All Topics" },
      ...statute.topics.map((tp) => ({ value: tp.id, label: tp.label })),
    ],
    [statute],
  );

  // Search and the Part/severity filters show a flat ranked list; with none
  // of them set, the grouped topic browse takes over.
  const isFiltered = !!query || severityFilter !== "all" || partFilter !== "all";

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
        alignItems: isMobile ? "flex-end" : "center",
        justifyContent: "center",
        padding: isMobile ? 0 : "24px 16px",
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
          borderBottom: isMobile ? "none" : `1px solid ${t.border}`,
          borderRadius: isMobile
            ? `${RADIUS.lg}px ${RADIUS.lg}px 0 0`
            : RADIUS.lg,
          width: "100%",
          maxWidth: CONTENT_MAX_WIDTH,
          maxHeight: isMobile ? "85vh" : "82vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: isMobile
            ? `0 -8px 32px ${t.shadowStrong}`
            : `0 24px 64px ${t.shadowStrong}`,
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
              {statute.title}
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
              placeholder={statute.placeholder}
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
            role="group"
            aria-label="Statute"
            style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}
          >
            {STATUTE_LIST.map((st) => (
              <Button
                key={st.id}
                variant="toggle"
                size="sm"
                pressed={st.id === statute.id}
                onClick={() => {
                  setStatuteId(st.id);
                  setExpandedSection(null);
                }}
              >
                {st.tab}
              </Button>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 12,
              flexWrap: "wrap",
            }}
          >
            {statute.hasSeverity && (
              <Select
                label="Severity"
                options={SEVERITY_OPTIONS}
                value={severityFilter}
                onChange={setSeverityFilter}
              />
            )}
            <Select
              label="Topic"
              options={topicOptions}
              value={topicFilter}
              onChange={setTopicFilter}
            />
            <Select
              label="Part"
              options={partOptions}
              value={partFilter}
              onChange={setPartFilter}
            />
          </div>
        </div>

        {/* Results count */}
        {isFiltered && (
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
          ) : !isFiltered ? (
            <TopicBrowse
              sections={allSections}
              topics={statute.topics}
              topicGroups={statute.topicGroups}
              topicFilter={topicFilter}
              setTopicFilter={setTopicFilter}
              expandedSection={expandedSection}
              setExpandedSection={setExpandedSection}
              t={t}
            />
          ) : results.length === 0 ? (
            <div style={messageStyle}>No sections match your current filters.</div>
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
