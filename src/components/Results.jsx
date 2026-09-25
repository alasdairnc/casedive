import { useTheme } from "../lib/ThemeContext.jsx";
import { useTypewriter } from "../hooks/useTypewriter.js";
import ResultCard from "./ResultCard.jsx";
import CaseSummaryModal from "./CaseSummaryModal.jsx";
import SuggestionLink from "./SuggestionLink.jsx";
import Button from "./ui/Button.jsx";
import { RADIUS } from "../lib/ui.js";
import { useEffect, useState, useRef, useCallback } from "react";

// Section heading: a real <h2> over a hairline rule, with an optional muted
// count pill beside it and an optional action (e.g. Export PDF) on the right.
// The label keeps its own element so exact text matches stay stable.
function SectionHeading({ label, count, action, t, style }) {
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
      {count != null && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            minWidth: 24,
            padding: "1px 8px",
            borderRadius: RADIUS.pill,
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
      )}
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
  const analysisText = useTypewriter(data.analysis || "", 10);
  const [verifications, setVerifications] = useState({});
  const [verifyingCitations, setVerifyingCitations] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [pdfState, setPdfState] = useState("idle");
  const pdfErrorTimer = useRef(null);
  const caseLawMeta = data?.meta?.case_law;
  const retrievalMeta = caseLawMeta?.retrieval || {};
  const issuePrimary = retrievalMeta.issuePrimary || null;
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

  useEffect(() => {
    if (!data || verifyingCitations) return;
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
    if (citationSet.size === 0) return;
    setVerifyingCitations(true);
    fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ citations: Array.from(citationSet).slice(0, 10) }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json && typeof json === "object" && !Array.isArray(json)) {
          setVerifications(json);
        }
      })
      .catch(() => {})
      .finally(() => setVerifyingCitations(false));
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
  }, [pdfState, data, verifications]);

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
  // App wraps results in the content column, which supplies the gutter
  return (
    <section data-testid="results-section" style={{ paddingBottom: 80 }}>
      {/* Summary — first section, with the results toolbar (Export PDF) */}
      <SectionHeading
        label="Scenario Summary"
        t={t}
        style={{ marginTop: 40 }}
        action={
          <Button
            variant={pdfState === "error" ? "danger" : "secondary"}
            size="sm"
            data-testid="export-pdf-btn"
            onClick={handleExportPdf}
            disabled={pdfState === "loading"}
            style={
              pdfState === "loading"
                ? { cursor: "progress", opacity: 0.7 }
                : undefined
            }
          >
            {pdfState === "idle" && <DownloadIcon />}
            {pdfState === "loading"
              ? "Generating\u2026"
              : pdfState === "error"
                ? "Export failed"
                : "Export PDF"}
          </Button>
        }
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

      {/* Old format notice */}
      {isOldFormat && (
        <Callout tone={t.accent} t={t} style={{ marginTop: 32 }}>
          This result uses an older format. Re-run your search to see grouped
          results by law type.
        </Callout>
      )}

      {/* Grouped result sections */}
      {!isOldFormat &&
        SECTIONS.map(({ key, label }) => {
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
                  {verified} of {rawItems.length} verified — {removed}{" "}
                  unconfirmed removed
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
              return (
                <div key={key}>
                  <SectionHeading label={label} t={t} />
                  <Callout tone={t.accentOlive} t={t}>
                    None of the suggested case law citations were verified on
                    CanLII.
                  </Callout>
                </div>
              );
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

            return (
              <div key={key}>
                {Object.entries(groups).map(([groupName, groupItems], idx) => (
                  <div key={`${key}-${idx}`}>
                    <SectionHeading
                      label={groupName}
                      count={groupItems.length}
                      t={t}
                    />
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
                ))}
              </div>
            );
          }

          return (
            <div key={key}>
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
            </div>
          );
        })}

      {/* Case law empty state */}
      {showCaseLawEmptyState && (
        <div>
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
                Search CanLII manually {"\u2197"}
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
      )}

      {/* Legal Analysis */}
      <div>
        <SectionHeading label="Legal Analysis" t={t} />
        <Callout
          tone={t.accent}
          t={t}
          style={{
            padding: "16px 20px",
            fontSize: 14,
            lineHeight: 1.75,
            color: t.text,
          }}
        >
          {analysisText}
        </Callout>
      </div>

      {/* Suggested Links */}
      {data.suggestions?.length > 0 && (
        <div>
          <SectionHeading label="Suggested Links" t={t} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {data.suggestions.map((suggestion, i) => (
              <SuggestionLink key={i} suggestion={suggestion} />
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
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
