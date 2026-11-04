import { useTheme } from "../lib/ThemeContext.jsx";
import {
  fmtDate,
  num,
  pct,
  severityForMetric,
  statusFromData,
} from "./retrievalHealthUtils.js";
import {
  MetricCard,
  TrendlineChart,
  WindowPanel,
} from "./retrievalHealthPanels.jsx";
import {
  AccessPanel,
  healthSummaryFromState,
  Improvements,
  IssueAlertSummary,
  IssueTrend,
  Section,
  StatusPanel,
} from "./retrievalHealthSections.jsx";
import FailureQueue from "./retrievalHealthFailures.jsx";
import useRetrievalHealth from "./useRetrievalHealth.js";

function buildChecks(oneHour, thresholds) {
  const min = thresholds?.minSampleSize1h;
  const sample = (count) => ({ count, min });
  return [
    {
      id: "error-rate",
      label: "Error rate (1h)",
      valueLabel: pct(oneHour?.rates?.errorRate),
      thresholdLabel: pct(thresholds?.errorRate1h),
      badge: severityForMetric(
        oneHour?.rates?.errorRate,
        thresholds?.errorRate1h,
        "above_is_bad",
        sample(oneHour?.samples?.operational),
      ),
      whyItMatters: "High values indicate retrieval requests are failing.",
    },
    {
      id: "no-verified-rate",
      label: "No-verified rate (1h)",
      valueLabel: pct(oneHour?.rates?.noVerifiedRate),
      thresholdLabel: pct(thresholds?.noVerifiedRate1h),
      badge: severityForMetric(
        oneHour?.rates?.noVerifiedRate,
        thresholds?.noVerifiedRate1h,
        "above_is_bad",
        sample(oneHour?.samples?.quality),
      ),
      whyItMatters:
        "High values mean users get no verified case law despite a response.",
    },
    {
      id: "p95-latency",
      label: "p95 latency (1h)",
      valueLabel: `${num(oneHour?.latencyMs?.p95)} ms`,
      thresholdLabel: `${num(thresholds?.p95LatencyMs1h)} ms`,
      badge: severityForMetric(
        oneHour?.latencyMs?.p95,
        thresholds?.p95LatencyMs1h,
        "above_is_bad",
        sample(oneHour?.samples?.latency),
      ),
      whyItMatters: "Tail latency captures the slowest user experiences.",
    },
  ];
}

export default function RetrievalHealthDashboard({ onNavigateHome }) {
  const t = useTheme();
  const health = useRetrievalHealth();
  const { data, queue, error } = health;

  const status = statusFromData(data);
  const oneHour = data?.windows?.["1h"];
  const fiveMin = data?.windows?.["5m"];
  const thresholds = data?.thresholds || {};
  const checks = buildChecks(oneHour, thresholds);
  const summary = healthSummaryFromState({ data, status, checks });
  const historyHint =
    data?.historyMode === "counters_plus_recent"
      ? `Lifetime counters + last ${num(data?.historyMaxEvents)} events`
      : "2h rolling retention (memory fallback)";

  return (
    <div style={{ background: t.bg, minHeight: "100vh", color: t.text }}>
      <header
        style={{
          borderBottom: `1px solid ${t.borderLight}`,
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              margin: 0,
              fontWeight: 400,
            }}
          >
            Retrieval health
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              color: t.textTertiary,
              margin: "6px 0 0 0",
            }}
          >
            Internal metrics from /api/retrieval-health
          </p>
        </div>
        <button
          type="button"
          onClick={onNavigateHome}
          style={{
            background: "none",
            border: `1px solid ${t.borderLight}`,
            padding: "8px 14px",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
            fontSize: 11,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            color: t.textSecondary,
          }}
        >
          Back to app
        </button>
      </header>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px" }}>
        <AccessPanel
          token={health.token}
          onSaveToken={health.setToken}
          onClearToken={() => health.setToken("")}
          onRefresh={health.load}
          loading={health.loading}
          autoRefresh={health.autoRefresh}
          onAutoRefresh={health.setAutoRefresh}
          t={t}
        />

        {error && (
          <div
            role="alert"
            style={{
              border: `1px solid #E15B4C`,
              padding: 12,
              marginBottom: 16,
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: t.text,
            }}
          >
            {error}
          </div>
        )}

        {data && (
          <>
            <StatusPanel
              status={status}
              summary={summary}
              checks={checks}
              t={t}
            />

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: t.textSecondary,
                margin: "0 0 16px 0",
              }}
            >
              Generated {fmtDate(data.generatedAt)} · Stored events:{" "}
              {num(data.totalStoredEvents)} · {historyHint}
            </p>

            <IssueAlertSummary alerts={data.alerts} t={t} />

            <Section
              title="Failed scenarios"
              hint="Distinct scenarios that returned no verified case law or errored, with redacted text. Promote the ones that should become regression tests."
              t={t}
            >
              <FailureQueue
                queue={queue}
                status={health.queueStatus}
                onStatusChange={health.setQueueStatus}
                onLoadMore={health.loadMore}
                loadingMore={health.loadingMore}
                onTriage={health.triage}
                busyIds={health.busyIds}
                t={t}
              />
            </Section>

            <Improvements items={data.improvements} t={t} />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <MetricCard
                label="Stored Events"
                value={num(data.totalStoredEvents)}
                hint={historyHint}
                t={t}
              />
              <MetricCard
                label="5m Operational"
                value={num(fiveMin?.samples?.operational)}
                hint="Requests eligible for quality checks"
                t={t}
              />
              <MetricCard
                label="1h Fallback Rate"
                value={pct(oneHour?.rates?.fallbackPathRate)}
                hint="Requests using fallback retrieval paths"
                t={t}
              />
              <MetricCard
                label="1h Relevance"
                value={num(oneHour?.rates?.avgRelevanceScore)}
                hint="Average retrieval relevance score"
                t={t}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 16,
                marginBottom: 24,
              }}
            >
              <WindowPanel
                label="5 minute window"
                windowStats={data.windows?.["5m"]}
                thresholds={data.thresholds}
                t={t}
              />
              <WindowPanel
                label="1 hour window"
                windowStats={data.windows?.["1h"]}
                thresholds={data.thresholds}
                t={t}
              />
              <WindowPanel
                label="All time"
                windowStats={data.alltime}
                thresholds={data.thresholds}
                t={t}
              />
            </div>

            <Section title="Trend (last 75 minutes)" t={t}>
              <TrendlineChart trendline={data.trendline} t={t} />
            </Section>

            <IssueTrend rows={data.alltime?.breakdowns?.byIssue} t={t} />
          </>
        )}
      </div>
    </div>
  );
}
