import { useTheme } from "../lib/ThemeContext.jsx";
import { useTypewriter } from "../hooks/useTypewriter.js";
import ResultCard from "./ResultCard.jsx";
import CaseSummaryModal from "./CaseSummaryModal.jsx";
import SuggestionLink from "./SuggestionLink.jsx";
import Button from "./ui/Button.jsx";
import { useMediaQuery } from "../hooks/useMediaQuery.js";
import { RADIUS, RESULTS_SIDEBAR_WIDTH, WIDE_LAYOUT_QUERY } from "../lib/ui.js";
import { scrollBehavior } from "../lib/scroll.js";
import { useEffect, useState, useRef, useCallback, useId } from "react";

// Muted count badge beside a section heading or jump link. Jump links pass
// `outlined`: their hover fill is the same colour as the pill.
function CountPill({ count, t, outlined = false }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        minWidth: 24,
        padding: "1px 8px",
        borderRadius: RADIUS.pill,
        border: outlined ? `1px solid ${t.border}` : undefined,
        background: t.tagBg,
        color: t.textSecondary,
        fontFamily: "var(--font-body)",
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 1.5,
      }}
    >
      {count}
    </span>
  );
}

// Section heading: a real <h2> over a hairline rule, with an optional muted
// count pill beside it and an optional action (e.g. Export PDF) on the right.
// The label keeps its own element so exact text matches stay stable. The h2
// takes focus (tabIndex -1) when a sidebar jump link lands on its section.
function SectionHeading({ label, count, action, t, style, headingId }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 10,
        marginTop: 48,
        marginBottom: 16,
        paddingTop: 20,
        borderTop: `1px solid ${t.borderLight}`,
        ...style,
      }}
    >
      <h2
        id={headingId}
        tabIndex={-1}
        style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontSize: 17,
          fontWeight: 600,
          lineHeight: 1.3,
          color: t.text,
        }}
      >
        {label}
      </h2>
      {count != null && <CountPill count={count} t={t} />}
      {action && <div style={{ marginLeft: "auto" }}>{action}</div>}
    </div>
  );
}

// Bordered callout with a left accent in the semantic colour
// (teal = info, green = success, amber = warning).
function Callout({ tone, t, style, children }) {
  return (
    <div
      style={{
        borderTop: `1px solid ${t.border}`,
        borderRight: `1px solid ${t.border}`,
        borderBottom: `1px solid ${t.border}`,
        borderLeft: `3px solid ${tone}`,
        borderRadius: RADIUS.lg,
        background: t.cardBg,
        padding: "14px 16px",
        fontFamily: "var(--font-body)",
        fontSize: 14,
        lineHeight: 1.6,
        color: t.textSecondary,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Result sections carry these ids so the sidebar can jump to them.
const sectionAnchorId = (key) => `cd-section-${key}`;
const SECTION_ANCHOR_STYLE = { scrollMarginTop: 24 };

// Sidebar link to a result section. Scrolls in place instead of following the
// hash, so the URL stays clean, then moves focus to the section heading for
// keyboard and screen-reader users. The label is a bare text node (not its
// own element) so it never duplicates the section heading's exact text.
function JumpLink({ sectionKey, label, count, t }) {
  const targetId = sectionAnchorId(sectionKey);

  return (
    <Button
      variant="ghost"
      size="sm"
      href={`#${targetId}`}
      fullWidth
      onClick={(e) => {
        e.preventDefault();
        const target = document.getElementById(targetId);
        target?.scrollIntoView?.({
          behavior: scrollBehavior(),
          block: "start",
        });
        target?.querySelector("h2")?.focus?.({ preventScroll: true });
      }}
      style={{
        justifyContent: "space-between",
        gap: 12,
        padding: "4px 10px",
        fontSize: 14,
        fontWeight: 400,
      }}
    >
      {label}
      <CountPill count={count} t={t} outlined />
    </Button>
  );
}

// Desktop sidebar: sticks below the top of the viewport and scrolls on its own
// when the analysis is taller than the screen. The -4px margin and 4px padding
// keep focus rings inside the scroll box without shifting the content.
function ResultsSidebar({ t, jumpLinks, exportButton, children }) {
  const navLabelId = useId();

  return (
    <aside
      aria-label="Results overview"
      style={{
        position: "sticky",
        top: 24,
        maxHeight: "calc(100vh - 48px)",
        overflowY: "auto",
        overscrollBehavior: "contain",
        margin: "32px 0 0 -4px",
        padding: "0 4px 16px",
        scrollbarWidth: "thin",
        scrollbarColor: `${t.border} transparent`,
      }}
    >
      <div
        style={{
          borderTop: `1px solid ${t.borderLight}`,
          paddingTop: 20,
        }}
      >
        {jumpLinks.length > 0 && (
          <nav aria-labelledby={navLabelId} style={{ marginBottom: 16 }}>
            <h2
              id={navLabelId}
              style={{
                margin: "0 0 8px",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 600,
                color: t.textSecondary,
              }}
            >
              On this page
            </h2>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {jumpLinks.map(({ key, label, count }) => (
                <li key={key}>
                  <JumpLink
                    sectionKey={key}
                    label={label}
                    count={count}
                    t={t}
                  />
                </li>
              ))}
            </ul>
          </nav>
        )}
        {exportButton}
      </div>
      {children}
    </aside>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      <path d="M8 2v8M4.5 6.5 8 10l3.5-3.5M3 13.5h10" />
    </svg>
  );
}

const PDF_ERROR_RESET_MS = 4000;

const CASE_LAW_EMPTY_SOURCES = new Set([
  "retrieval",
  "hybrid",
  "hybrid_reranked",
  "retrieval_ranked",
  "retrieval_error",
  "ai_fallback",
]);

const SECTIONS = [
  { key: "criminal_code", label: "Criminal Code" },
  { key: "case_law", label: "Case Law" },
  { key: "civil_law", label: "Civil Law" },
  { key: "charter", label: "Charter Rights" },
];

export default function Results({
  data,
  scenario,
  scenarioSnippet,
  filters,
  addBookmark,
  removeBookmark,
  isBookmarked,
}) {
  const t = useTheme();
  const isWide = useMediaQuery(WIDE_LAYOUT_QUERY);
  const analysisText = useTypewriter(data.analysis || "", 10);
  const [verifications, setVerifications] = useState({});
  const [selectedCase, setSelectedCase] = useState(null);
  const [pdfState, setPdfState] = useState("idle");
  const pdfErrorTimer = useRef(null);
  const caseLawMeta = data?.meta?.case_law;
  const retrievalMeta = caseLawMeta?.retrieval;
  const issuePrimary = retrievalMeta?.issuePrimary || null;
  const showCaseLawEmptyState =
    CASE_LAW_EMPTY_SOURCES.has(caseLawMeta?.source) &&
    caseLawMeta?.reason !== "filter_disabled" &&
    (!Array.isArray(data.case_law) || data.case_law.length === 0);

  const caseLawEmptyMessage = caseLawMeta?.reason?.startsWith("retrieval_error")
    ? "Case law retrieval is temporarily unavailable. Please try again in a moment."
    : caseLawMeta?.reason === "missing_api_key"
      ? "Case law retrieval is unavailable (CanLII not configured)."
      : caseLawMeta?.reason === "no_terms_or_databases"
        ? "No search terms could be formed from this scenario."
        : issuePrimary === "minor_traffic_stop"
          ? "This looks like a routine traffic-stop fact pattern. Broader landmark cases were filtered out because they were not close enough to the facts."
          : "No directly on-point verified case law was found. Broader landmark cases were filtered out because they were not close enough to the facts.";

  const caseLawEmptyGuidance =
    caseLawMeta?.reason === "no_terms_or_databases"
      ? [
          "Add the specific legal issue you want researched.",
          "Include the trigger facts, like search, detention, counsel, or delay.",
          "If you want a broader doctrine answer, name the Charter section or offence provision.",
        ]
      : caseLawMeta?.reason === "missing_api_key"
        ? []
        : issuePrimary === "minor_traffic_stop"
          ? [
              "Add a real legal issue, like detention, search, counsel, or delay.",
              "If the only fact is a tiny speed overage, no case-law result is the better answer.",
              "Add the specific Charter section or offence provision only if there is an actual issue to analyze.",
            ]
          : [
              "Add the specific legal issue you want researched.",
              "Use the exact fact pattern that matters, not just a nearby topic.",
              "For routine traffic stops or low-detail facts, no case-law result can be the correct answer.",
            ];

  const canliiSearchUrl = scenario
    ? `https://www.canlii.org/en/#search/text=${encodeURIComponent(scenario.slice(0, 200))}`
    : null;

  const retrievalStats = caseLawMeta?.retrieval;
  const showRetrievalStats =
    retrievalStats &&
    (retrievalStats.searchCalls > 0 || retrievalStats.candidateCount > 0);
  const analysisRequestId = data?.meta?.requestId || null;

  // Check this result's citations. A newer result cancels the check for the
  // older one, so a late answer can't land on the new cards.
  useEffect(() => {
    if (!data) return undefined;
    const citationSet = new Set();
    const sections = ["criminal_code", "case_law", "civil_law", "charter"];
    for (const section of sections) {
      const items = data[section];
      if (!Array.isArray(items)) continue;
      for (const item of items) {
        if (item.citation && !citationSet.has(item.citation)) {
          citationSet.add(item.citation);
          if (citationSet.size >= 20) break;
        }
      }
      if (citationSet.size >= 20) break;
    }
    if (citationSet.size === 0) return undefined;
    let cancelled = false;
    fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ citations: Array.from(citationSet).slice(0, 10) }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (
          !cancelled &&
          json &&
          typeof json === "object" &&
          !Array.isArray(json)
        ) {
          setVerifications(json);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [data]);

  const isOldFormat = data.charges && !data.criminal_code;
  useEffect(() => () => clearTimeout(pdfErrorTimer.current), []);

  const handleExportPdf = useCallback(async () => {
    if (pdfState === "loading") return;
    clearTimeout(pdfErrorTimer.current);
    setPdfState("loading");
    try {
      const res = await fetch("/api/export-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario,
          summary: data.summary,
          criminal_code: data.criminal_code,
          case_law: data.case_law,
          civil_law: data.civil_law,
          charter: data.charter,
          analysis: data.analysis,
          verifications,
        }),
      });
      if (!res.ok) throw new Error(`Export failed (${res.status})`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "casedive-analysis.pdf";
      a.click();
      URL.revokeObjectURL(url);
      setPdfState("idle");
    } catch {
      setPdfState("error");
      pdfErrorTimer.current = setTimeout(
        () => setPdfState("idle"),
        PDF_ERROR_RESET_MS,
      );
    }
  }, [pdfState, scenario, data, verifications]);

  const handleReportCaseLaw = useCallback(
    async ({ item, resultIndex, reason, note }) => {
      const trimmedNote = String(note || "").trim();
      const res = await fetch("/api/report-case-law", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          analysisRequestId,
          scenarioSnippet,
          filters,
          item: {
            citation: item?.citation || "",
            title: item?.title || "",
            court: item?.court || "",
            year: item?.year || "",
            url_canlii: item?.url_canlii || "",
            summary: item?.summary || item?.description || "",
          },
          resultIndex,
          reason,
          note: trimmedNote || undefined,
          caseLawMeta: {
            source: caseLawMeta?.source || null,
            reason: caseLawMeta?.reason || null,
            issuePrimary: retrievalMeta?.issuePrimary || null,
            retrievalPass: retrievalMeta?.retrievalPass || null,
            fallbackReason: retrievalMeta?.fallbackReason || null,
            verifiedCount:
              typeof caseLawMeta?.verifiedCount === "number"
                ? caseLawMeta.verifiedCount
                : null,
          },
        }),
      });

      const payload = await res.json().catch(() => ({}));
      if (!res.ok || payload?.ok !== true) {
        throw new Error(payload?.error || `Report failed (${res.status})`);
      }
      return payload;
    },
    [analysisRequestId, caseLawMeta, filters, retrievalMeta, scenarioSnippet],
  );
  // Each section's visible cards, built once so the cards and the desktop
  // sidebar's jump links agree on what is shown.
  const buildSection = (key, label) => {
    const rawItems = data[key];
    if (!rawItems?.length) return null;

    let items = rawItems;
    let verificationBanner = null;

    if (key === "case_law" && Object.keys(verifications).length > 0) {
      items = rawItems.filter((item) => {
        if (item.verificationStatus === "verified") return true;
        const v = verifications[item.citation];
        if (!v) return true;
        if (
          v.status === "not_found" ||
          v.status === "unparseable" ||
          v.status === "unknown_court" ||
          v.status === "error"
        )
          return false;
        return v.status === "verified" || v.status === "unverified";
      });
      const verified = rawItems.filter(
        (item) =>
          item.verificationStatus === "verified" ||
          verifications[item.citation]?.status === "verified",
      ).length;
      const removed = rawItems.length - items.length;
      if (removed > 0) {
        verificationBanner = (
          <Callout
            tone={t.accentOlive}
            t={t}
            style={{ fontSize: 13, marginBottom: 12 }}
          >
            {verified} of {rawItems.length} verified — {removed} unconfirmed
            removed
          </Callout>
        );
      } else if (verified === rawItems.length && verified > 0) {
        verificationBanner = (
          <Callout
            tone={t.accentGreen}
            t={t}
            style={{ fontSize: 13, marginBottom: 12 }}
          >
            {verified} of {verified} citation{verified !== 1 ? "s" : ""}{" "}
            verified on CanLII
          </Callout>
        );
      }
    }

    if (!items.length) {
      if (key === "case_law" && rawItems.length > 0) {
        return {
          key,
          label,
          count: 0,
          node: (
            <>
              <SectionHeading label={label} t={t} />
              <Callout tone={t.accentOlive} t={t}>
                None of the suggested case law citations were verified on
                CanLII.
              </Callout>
            </>
          ),
        };
      }
      return null;
    }

    if (key === "civil_law") {
      const groups = {};
      items.forEach((item) => {
        const v = verifications[item.citation];
        const groupName = v?.jurisdiction
          ? v.jurisdiction === "Federal"
            ? "Federal Statutes"
            : `${v.jurisdiction} Statutes`
          : "Civil Law";
        if (!groups[groupName]) groups[groupName] = [];
        groups[groupName].push(item);
      });

      return {
        key,
        label,
        count: items.length,
        node: Object.entries(groups).map(([groupName, groupItems], idx) => (
          <div key={`${key}-${idx}`}>
            <SectionHeading label={groupName} count={groupItems.length} t={t} />
            {idx === 0 && verificationBanner}
            {groupItems.map((item, i) => (
              <ResultCard
                key={i}
                item={item}
                type={key}
                verification={verifications[item.citation]}
                addBookmark={addBookmark}
                removeBookmark={removeBookmark}
                isBookmarked={isBookmarked}
              />
            ))}
          </div>
        )),
      };
    }

    return {
      key,
      label,
      count: items.length,
      node: (
        <>
          <SectionHeading label={label} count={items.length} t={t} />
          {verificationBanner}
          {items.map((item, i) => (
            <ResultCard
              key={analysisRequestId ? `${analysisRequestId}-${i}` : i}
              item={item}
              type={key}
              verification={verifications[item.citation]}
              onCardClick={key === "case_law" ? setSelectedCase : undefined}
              addBookmark={addBookmark}
              removeBookmark={removeBookmark}
              isBookmarked={isBookmarked}
              resultIndex={i}
              onReportCaseLaw={
                key === "case_law" ? handleReportCaseLaw : undefined
              }
            />
          ))}
        </>
      ),
    };
  };

  const sections = isOldFormat
    ? []
    : SECTIONS.map(({ key, label }) => buildSection(key, label)).filter(
        Boolean,
      );

  // Jump-link targets, in page order. The case-law empty state renders after
  // the other sections, so its link goes last too.
  const jumpLinks = sections.map(({ key, label, count }) => ({
    key,
    label,
    count,
  }));
  if (showCaseLawEmptyState) {
    jumpLinks.push({ key: "case_law", label: "Case Law", count: 0 });
  }

  const exportButton = (
    <Button
      variant={pdfState === "error" ? "danger" : "secondary"}
      size="sm"
      data-testid="export-pdf-btn"
      onClick={handleExportPdf}
      disabled={pdfState === "loading"}
      fullWidth={isWide}
      style={
        pdfState === "loading"
          ? { cursor: "progress", opacity: 0.7 }
          : undefined
      }
    >
      {pdfState === "idle" && <DownloadIcon />}
      {pdfState === "loading"
        ? "Generating…"
        : pdfState === "error"
          ? "Export failed"
          : "Export PDF"}
    </Button>
  );

  // Summary — first section; on phones it carries the Export PDF action
  const summary = (
    <>
      <SectionHeading
        label="Scenario Summary"
        headingId="cd-results-heading"
        t={t}
        style={{ marginTop: isWide ? 32 : 40 }}
        action={isWide ? undefined : exportButton}
      />
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(17px, 2.5vw, 20px)",
          color: t.text,
          lineHeight: 1.65,
          margin: 0,
          fontStyle: "italic",
        }}
      >
        {data.summary}
      </p>
    </>
  );

  // Old format notice
  const oldFormatNotice = isOldFormat && (
    <Callout tone={t.accent} t={t} style={{ marginTop: 32 }}>
      This result uses an older format. Re-run your search to see grouped
      results by law type.
    </Callout>
  );

  // Grouped result sections; ids are the sidebar's jump targets
  const sectionNodes = sections.map(({ key, node }) => (
    <div key={key} id={sectionAnchorId(key)} style={SECTION_ANCHOR_STYLE}>
      {node}
    </div>
  ));

  // Case law empty state
  const caseLawEmptyState = showCaseLawEmptyState && (
    <div id={sectionAnchorId("case_law")} style={SECTION_ANCHOR_STYLE}>
      <SectionHeading label="Case Law" t={t} />
      <Callout
        tone={
          caseLawMeta?.reason?.startsWith("retrieval_error") ||
          caseLawMeta?.reason === "missing_api_key"
            ? t.accentOlive
            : t.accent
        }
        t={t}
      >
        <div style={{ color: t.text }}>{caseLawEmptyMessage}</div>

        {caseLawEmptyGuidance.length > 0 && (
          <ul
            style={{
              fontSize: 13,
              color: t.textSecondary,
              lineHeight: 1.7,
              margin: "10px 0 0",
              paddingLeft: 18,
            }}
          >
            {caseLawEmptyGuidance.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}

        {canliiSearchUrl && (
          <Button
            variant="link"
            size="sm"
            href={canliiSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: 12 }}
          >
            Search CanLII manually {"↗"}
          </Button>
        )}

        {showRetrievalStats && (
          <div
            style={{
              fontSize: 12,
              color: t.textTertiary,
              marginTop: 8,
            }}
          >
            {retrievalStats.searchCalls} database
            {retrievalStats.searchCalls !== 1 ? "s" : ""} searched
            {" · "}
            {retrievalStats.candidateCount} candidate
            {retrievalStats.candidateCount !== 1 ? "s" : ""} evaluated
          </div>
        )}
      </Callout>
    </div>
  );

  // Headings in the sidebar sit closer together than in the main column
  const sidebarHeadingStyle = isWide ? { marginTop: 32 } : undefined;

  // Legal Analysis
  const analysis = (
    <div>
      <SectionHeading
        label="Legal Analysis"
        t={t}
        style={sidebarHeadingStyle}
      />
      <Callout
        tone={t.accent}
        t={t}
        style={{
          padding: isWide ? "14px 16px" : "16px 20px",
          fontSize: 14,
          lineHeight: 1.75,
          color: t.text,
        }}
      >
        {analysisText}
      </Callout>
    </div>
  );

  // Suggested Links
  const suggestionLinks = data.suggestions?.length > 0 && (
    <div>
      <SectionHeading
        label="Suggested Links"
        t={t}
        style={sidebarHeadingStyle}
      />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {data.suggestions.map((suggestion, i) => (
          <SuggestionLink key={i} suggestion={suggestion} />
        ))}
      </div>
    </div>
  );

  // Disclaimer
  const disclaimer = (
    <div
      style={{
        marginTop: 56,
        borderTop: `1px solid ${t.borderLight}`,
        paddingTop: 16,
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          color: t.textSecondary,
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        CaseDive is an educational research tool and does not constitute legal
        advice. Case citations should be verified through CanLII or official
        legal databases. Always consult a qualified legal professional.
      </p>
    </div>
  );

  // App wraps results in the page column, which supplies the gutter. On
  // desktop that column is wide: cards on the left, a sticky sidebar with
  // jump links, Export PDF, analysis and links on the right. Phones get one
  // column in reading order. Each piece renders exactly once per layout, and
  // the tree keeps the same shape at every width so crossing the breakpoint
  // doesn't remount the cards (ResultCard holds report drafts in state).
  return (
    <section data-testid="results-section" style={{ paddingBottom: 80 }}>
      <div
        style={
          isWide
            ? {
                display: "grid",
                gridTemplateColumns: `minmax(0, 1fr) ${RESULTS_SIDEBAR_WIDTH}px`,
                columnGap: 40,
                alignItems: "start",
              }
            : undefined
        }
      >
        <div style={{ minWidth: 0 }}>
          {summary}
          {oldFormatNotice}
          {sectionNodes}
          {caseLawEmptyState}
          {!isWide && analysis}
          {!isWide && suggestionLinks}
          {disclaimer}
        </div>

        {isWide && (
          <ResultsSidebar
            t={t}
            jumpLinks={jumpLinks}
            exportButton={exportButton}
          >
            {analysis}
            {suggestionLinks}
          </ResultsSidebar>
        )}
      </div>

      {selectedCase && (
        <CaseSummaryModal
          item={selectedCase}
          canliiUrl={
            selectedCase.url_canlii ||
            verifications[selectedCase.citation]?.url ||
            verifications[selectedCase.citation]?.searchUrl ||
            null
          }
          onClose={() => setSelectedCase(null)}
        />
      )}
    </section>
  );
}
