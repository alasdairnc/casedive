// Presentational sections for the retrieval-health dashboard.
// Everything is themed through ThemeContext tokens passed in as `t`.

import { useState } from "react";
import { clip, num, pct } from "./retrievalHealthUtils.js";

const ISSUE_TREND_MIN_REQUESTS = 3;

export function sectionLabelStyle(t) {
  return {
    fontFamily: "var(--font-body)",
    fontSize: 10,
    letterSpacing: 3.5,
    textTransform: "uppercase",
    color: t.textTertiary,
    marginBottom: 10,
  };
}

export function Section({ title, hint, children, t, marginBottom = 20 }) {
  return (
    <section
      style={{
        border: `1px solid ${t.borderLight}`,
        padding: 16,
        marginBottom,
        background: t.bg,
      }}
    >
      <div style={sectionLabelStyle(t)}>{title}</div>
      {hint && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: t.textSecondary,
            margin: "0 0 12px 0",
            lineHeight: 1.5,
          }}
        >
          {hint}
        </p>
      )}
      {children}
    </section>
  );
}

function smallButton(t, active = false) {
  return {
    padding: "8px 12px",
    border: `1px solid ${active ? t.accent : t.borderLight}`,
    background: "transparent",
    color: active ? t.accent : t.textSecondary,
    cursor: "pointer",
    fontFamily: "var(--font-body)",
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  };
}

export function healthSummaryFromState({ data, status, checks }) {
  if (!data) {
    return {
      headline: "Waiting for telemetry",
      detail: "Connect to /api/retrieval-health to calculate health checks.",
    };
  }
  const critical = checks.filter((c) => c.badge.level === "critical").length;
  const warning = checks.filter((c) => c.badge.level === "warning").length;

  if (critical > 0) {
    return {
      headline: "Needs immediate attention",
      detail: `${critical} critical signal(s) exceeded thresholds in the last hour.`,
    };
  }
  if (warning > 0 || status.label === "Warning") {
    return {
      headline: "Watch closely",
      detail: `${warning || 1} signal(s) are approaching threshold limits.`,
    };
  }
  if ((data?.totalStoredEvents || 0) === 0) {
    return {
      headline: "No recent events",
      detail: "Health cannot be assessed until retrieval traffic is observed.",
    };
  }
  return {
    headline: "System looks healthy",
    detail:
      "Key failure and latency signals are currently within target ranges.",
  };
}

export function StatusPanel({ status, summary, checks, t }) {
  return (
    <Section title="Health overview" t={t}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 6,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 26,
            color: status.color,
            lineHeight: 1.2,
          }}
        >
          {summary.headline}
        </div>
        <span
          style={{
            border: `1px solid ${status.color}`,
            color: status.color,
            padding: "4px 10px",
            fontFamily: "var(--font-body)",
            fontSize: 11,
            letterSpacing: 1.6,
            textTransform: "uppercase",
          }}
        >
          {status.label}
        </span>
      </div>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 13,
          color: t.textSecondary,
          margin: "0 0 14px 0",
          lineHeight: 1.5,
        }}
      >
        {summary.detail}
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 10,
        }}
      >
        {checks.map((check) => (
          <div
            key={check.id}
            style={{ border: `1px solid ${t.borderLight}`, padding: 12 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: t.text,
              }}
            >
              {check.label}
              <span
                style={{
                  border: `1px solid ${check.badge.border}`,
                  color: check.badge.color,
                  fontSize: 10,
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                  padding: "2px 6px",
                }}
              >
                {check.badge.label}
              </span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 18,
                color: t.text,
                marginBottom: 4,
              }}
            >
              {check.valueLabel}
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                color: t.textSecondary,
                marginBottom: 6,
              }}
            >
              Threshold: {check.thresholdLabel}
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                color: t.textTertiary,
                lineHeight: 1.45,
              }}
            >
              {check.whyItMatters}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function IssueAlertSummary({ alerts, t }) {
  const issueAlerts = (Array.isArray(alerts) ? alerts : []).filter(
    (a) =>
      typeof a?.id === "string" &&
      (a.id.startsWith("retrieval_issue_no_verified_rate_1h_") ||
        a.id.startsWith("retrieval_issue_error_rate_1h_")),
  );
  if (issueAlerts.length === 0) return null;

  return (
    <Section title="Issue Alert Summary" t={t}>
      <div style={{ display: "grid", gap: 8 }}>
        {issueAlerts.slice(0, 5).map((alert) => (
          <div
            key={alert.id}
            style={{ border: `1px solid ${t.borderLight}`, padding: 10 }}
          >
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: t.text,
                marginBottom: 4,
              }}
            >
              {alert.issuePrimary || "unknown"} · {num(alert.requests)} requests
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                color: t.textSecondary,
              }}
            >
              {alert.metric === "issueNoVerifiedRate" ? "No-verified" : "Error"}{" "}
              at {pct(alert.value)} (threshold {pct(alert.threshold)})
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function IssueTrend({ rows, t }) {
  const [sortMode, setSortMode] = useState("risk");
  const raw = Array.isArray(rows) ? rows : [];
  const filtered = raw.filter(
    (row) => Number(row?.requests || 0) >= ISSUE_TREND_MIN_REQUESTS,
  );
  const base = filtered.length > 0 ? filtered : raw;
  const n = (v) => Number(v || 0);
  const sorted = [...base].sort((a, b) =>
    sortMode === "volume"
      ? n(b.requests) - n(a.requests) ||
        n(b.noVerifiedRate) - n(a.noVerifiedRate) ||
        n(b.errorRate) - n(a.errorRate)
      : n(b.noVerifiedRate) - n(a.noVerifiedRate) ||
        n(b.errorRate) - n(a.errorRate) ||
        n(b.fallbackPathRate) - n(a.fallbackPathRate) ||
        n(b.requests) - n(a.requests),
  );

  return (
    <Section
      title="All-time by issue trend"
      hint="Longitudinal view of top issue classes by volume and retrieval quality."
      t={t}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <button
          type="button"
          onClick={() => setSortMode("risk")}
          style={smallButton(t, sortMode === "risk")}
        >
          Sort: Highest risk
        </button>
        <button
          type="button"
          onClick={() => setSortMode("volume")}
          style={smallButton(t, sortMode === "volume")}
        >
          Sort: Volume
        </button>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: t.textTertiary,
          }}
        >
          Showing issues with {ISSUE_TREND_MIN_REQUESTS}+ requests when
          available.
        </span>
      </div>
      {sorted.length > 0 ? (
        <div style={{ display: "grid", gap: 8 }}>
          {sorted.map((row) => (
            <div
              key={row.issuePrimary}
              style={{ border: `1px solid ${t.borderLight}`, padding: 10 }}
            >
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: t.text,
                  marginBottom: 4,
                }}
              >
                <strong>{row.issuePrimary}</strong> · {num(row.requests)}{" "}
                requests
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "2px 14px",
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  color: t.textSecondary,
                }}
              >
                <span>fallback {pct(row.fallbackPathRate)}</span>
                <span>no-verified {pct(row.noVerifiedRate)}</span>
                <span>error {pct(row.errorRate)}</span>
                <span>avg verified {num(row.avgVerifiedPerRequest)}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: t.textSecondary,
            margin: 0,
          }}
        >
          No issue-level aggregate data yet.
        </p>
      )}
    </Section>
  );
}

export function Improvements({ items, t }) {
  const list = Array.isArray(items) ? items : [];
  return (
    <Section
      title="Where to tune next"
      hint="Open failures grouped by issue class, ranked by how often real users hit them."
      t={t}
    >
      {list.length === 0 ? (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: t.textSecondary,
            margin: 0,
          }}
        >
          No open failures to learn from.
        </p>
      ) : (
        <div style={{ display: "grid", gap: 8 }}>
          {list.slice(0, 5).map((item) => (
            <div
              key={item.id}
              style={{ border: `1px solid ${t.borderLight}`, padding: 10 }}
            >
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: t.text,
                  marginBottom: 4,
                }}
              >
                <strong>{item.classId}</strong> · {num(item.failureCount)}{" "}
                failures across {num(item.scenarioCount ?? 1)} scenario(s)
              </div>
              {Array.isArray(item.suggestedTerms) &&
                item.suggestedTerms.length > 0 && (
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 11,
                      color: t.textSecondary,
                      marginBottom: 4,
                    }}
                  >
                    Try terms: {item.suggestedTerms.join(" | ")}
                  </div>
                )}
              {(item.examples || []).map((example) => (
                <div
                  key={example.id || example.snippet}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    color: t.textTertiary,
                  }}
                >
                  “{clip(example.snippet, 140)}”
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

export function AccessPanel({
  token,
  onSaveToken,
  onClearToken,
  onRefresh,
  loading,
  autoRefresh,
  onAutoRefresh,
  t,
}) {
  const [input, setInput] = useState("");
  return (
    <Section title="Access" t={t} marginBottom={24}>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          color: t.textSecondary,
          margin: "0 0 12px 0",
        }}
      >
        Paste the RETRIEVAL_HEALTH_TOKEN value. Stored in session storage for
        this tab only.
      </p>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}
      >
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={token ? "Replace token…" : "Bearer token"}
          aria-label="Health token"
          style={{
            flex: "1 1 220px",
            minWidth: 200,
            padding: "10px 12px",
            border: `1px solid ${t.borderLight}`,
            background: t.bg,
            color: t.text,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
          }}
        />
        <button
          type="button"
          onClick={() => {
            onSaveToken(input);
            setInput("");
          }}
          style={smallButton(t, true)}
        >
          Save
        </button>
        {token && (
          <button type="button" onClick={onClearToken} style={smallButton(t)}>
            Clear
          </button>
        )}
        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          style={smallButton(t)}
        >
          {loading ? "Loading…" : "Refresh"}
        </button>
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            border: `1px solid ${t.borderLight}`,
            padding: "8px 10px",
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: t.textSecondary,
          }}
        >
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={(e) => onAutoRefresh(e.target.checked)}
          />
          Auto-refresh 30s
        </label>
      </div>
      {token && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: t.textTertiary,
            margin: "12px 0 0 0",
          }}
        >
          Token on file ({token.length} chars)
        </p>
      )}
    </Section>
  );
}
