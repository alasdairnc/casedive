// Failure review queue for the retrieval-health dashboard.
// Each card is one distinct (redacted) scenario that came back empty or errored,
// with how often it has been seen. Reviewers mark it reviewed / promoted /
// ignored; "promoted" ones are pulled into the regression corpus by
// `npm run retrieval:promote`.

import { useState } from "react";
import {
  buildAgentFixPrompt,
  buildFixtureStub,
  fmtDate,
  num,
} from "./retrievalHealthUtils.js";

export const QUEUE_TABS = [
  { status: "new", label: "New" },
  { status: "reviewed", label: "Reviewed" },
  { status: "promoted", label: "Promoted" },
  { status: "ignored", label: "Ignored" },
];

const NOTE_MAX = 280;

const EMPTY_COPY = {
  new: "Nothing waiting for review. Failed scenarios show up here as they happen.",
  reviewed: "No scenarios are marked reviewed.",
  promoted:
    "No scenarios are promoted yet. Promote one to queue it for the regression corpus.",
  ignored: "No scenarios are ignored.",
};

// Which moves make sense from each status. The first is the main action.
const ACTIONS = {
  new: [
    { to: "promoted", label: "Promote to test" },
    { to: "reviewed", label: "Mark reviewed" },
    { to: "ignored", label: "Ignore" },
  ],
  reviewed: [
    { to: "promoted", label: "Promote to test" },
    { to: "ignored", label: "Ignore" },
    { to: "new", label: "Reopen" },
  ],
  promoted: [{ to: "new", label: "Reopen" }],
  ignored: [{ to: "new", label: "Reopen" }],
};

function buttonStyle(t, { primary = false, disabled = false } = {}) {
  return {
    padding: "7px 12px",
    border: `1px solid ${primary ? t.accent : t.borderLight}`,
    background: "transparent",
    color: primary ? t.accent : t.textSecondary,
    cursor: disabled ? "wait" : "pointer",
    opacity: disabled ? 0.6 : 1,
    fontFamily: "var(--font-body)",
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  };
}

const TEXT_GONE = {
  erased: "Scenario text deleted when this was reviewed.",
  expired: "Scenario text deleted after its retention period.",
};

function Chip({ children, t }) {
  return (
    <span
      style={{
        border: `1px solid ${t.borderLight}`,
        padding: "2px 8px",
        fontFamily: "var(--font-body)",
        fontSize: 11,
        color: t.textSecondary,
      }}
    >
      {children}
    </span>
  );
}

function FailureCard({ item, busy, onTriage, textRetentionDays, t }) {
  const [note, setNote] = useState(item.note || "");
  const [copied, setCopied] = useState("");
  const actions = ACTIONS[item.status] || ACTIONS.new;

  const copy = async (kind, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      setTimeout(() => setCopied(""), 1500);
    } catch {
      setCopied("");
    }
  };

  return (
    <article
      aria-label={`Failed scenario ${item.id}`}
      style={{
        border: `1px solid ${t.borderLight}`,
        padding: 14,
        background: t.bg,
      }}
    >
      {item.snippet ? (
        <p
          style={{
            margin: "0 0 8px 0",
            fontFamily: "var(--font-body)",
            fontSize: 14,
            lineHeight: 1.5,
            color: t.text,
            overflowWrap: "anywhere",
          }}
        >
          {item.snippet}
        </p>
      ) : (
        <p
          style={{
            margin: "0 0 8px 0",
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontStyle: "italic",
            color: t.textTertiary,
          }}
        >
          {TEXT_GONE[item.textState] || TEXT_GONE.expired}
        </p>
      )}
      {item.reason === "non_criminal_scope" && (
        <p
          style={{
            margin: "0 0 8px 0",
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: t.textSecondary,
          }}
        >
          <strong>Out of scope.</strong> The scope check decided this isn&apos;t
          criminal law, so no search ran. If that was right, mark it ignored. If
          it was a criminal scenario, hand it off: the check got it wrong.
        </p>
      )}
      {(item.concepts?.length > 0 || item.lengthBucket) && (
        <div
          aria-label="Matched legal concepts"
          style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}
        >
          {(item.concepts || []).map((concept) => (
            <Chip key={concept} t={t}>
              {concept}
            </Chip>
          ))}
          {item.lengthBucket && <Chip t={t}>{item.lengthBucket} scenario</Chip>}
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px 14px",
          fontFamily: "var(--font-body)",
          fontSize: 11,
          color: t.textSecondary,
          marginBottom: 10,
        }}
      >
        <span>{item.reason}</span>
        <span>{item.classId}</span>
        <span>seen {num(item.count)}×</span>
        <span>first {fmtDate(item.firstSeen)}</span>
        <span>last {fmtDate(item.lastSeen)}</span>
        {item.fallbackPathUsed && <span>fallback used</span>}
        {item.diagnostics && (
          <span>
            {num(item.diagnostics.termsTried)} terms ·{" "}
            {num(item.diagnostics.candidateCount)} candidates ·{" "}
            {num(item.diagnostics.verificationCalls)} verified calls
          </span>
        )}
      </div>
      {item.errorMessage && (
        <p
          style={{
            margin: "0 0 10px 0",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: t.textTertiary,
            overflowWrap: "anywhere",
          }}
        >
          {item.errorMessage}
        </p>
      )}
      <textarea
        aria-label="Reviewer note"
        value={note}
        onChange={(e) => setNote(e.target.value.slice(0, NOTE_MAX))}
        placeholder="Note (optional): what should happen here?"
        rows={2}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "8px 10px",
          marginBottom: 10,
          border: `1px solid ${t.borderLight}`,
          background: t.bg,
          color: t.text,
          fontFamily: "var(--font-body)",
          fontSize: 12,
          resize: "vertical",
        }}
      />
      {item.snippet && (
        <p
          style={{
            margin: "0 0 10px 0",
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: t.textTertiary,
          }}
        >
          Marking this reviewed or ignored deletes the stored text (it is
          deleted after {textRetentionDays ?? 14} days anyway). The legal
          concepts and counts stay. Promote keeps the text until it expires, so
          you can rewrite it as a test.
        </p>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {actions.map((action, index) => (
          <button
            key={action.to}
            type="button"
            disabled={busy}
            onClick={() => onTriage(item.id, action.to, note)}
            style={buttonStyle(t, { primary: index === 0, disabled: busy })}
          >
            {action.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => copy("handoff", `/fix-retrieval-failure ${item.id}`)}
          style={buttonStyle(t)}
          title="Copies a command for Claude Code. Paste it into a session in the casedive repo."
        >
          {copied === "handoff" ? "Copied: paste into Claude Code" : "Hand off to Claude"}
        </button>
        <button
          type="button"
          onClick={() => copy("prompt", buildAgentFixPrompt(item))}
          style={buttonStyle(t)}
        >
          {copied === "prompt" ? "Copied" : "Copy fix prompt"}
        </button>
        <button
          type="button"
          onClick={() =>
            copy("fixture", JSON.stringify(buildFixtureStub(item), null, 2))
          }
          style={buttonStyle(t)}
        >
          {copied === "fixture" ? "Copied" : "Copy test stub"}
        </button>
      </div>
    </article>
  );
}

export default function FailureQueue({
  queue,
  status,
  onStatusChange,
  onLoadMore,
  loadingMore,
  onTriage,
  busyIds,
  t,
}) {
  const counts = queue?.counts || {};
  const items = Array.isArray(queue?.items) ? queue.items : [];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Failure status"
        style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}
      >
        {QUEUE_TABS.map((tab) => {
          const active = tab.status === status;
          return (
            <button
              key={tab.status}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onStatusChange(tab.status)}
              style={{
                ...buttonStyle(t, { primary: active }),
                borderColor: active ? t.accent : t.borderLight,
              }}
            >
              {tab.label} ({num(counts[tab.status] ?? 0)})
            </button>
          );
        })}
      </div>

      {items.length === 0 ? (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: t.textSecondary,
            margin: 0,
          }}
        >
          {EMPTY_COPY[status] || EMPTY_COPY.new}
        </p>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {items.map((item) => (
            <FailureCard
              key={item.id}
              item={item}
              busy={busyIds?.has(item.id)}
              onTriage={onTriage}
              textRetentionDays={queue?.textRetentionDays}
              t={t}
            />
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: 14,
          fontFamily: "var(--font-body)",
          fontSize: 11,
          color: t.textTertiary,
        }}
      >
        <span>
          Showing {num(items.length)} of {num(queue?.total ?? items.length)}
        </span>
        {queue?.hasMore && (
          <button
            type="button"
            onClick={onLoadMore}
            disabled={loadingMore}
            style={buttonStyle(t, { disabled: loadingMore })}
          >
            {loadingMore ? "Loading…" : "Load more"}
          </button>
        )}
        {queue?.textRetentionDays ? (
          <span>
            Text is redacted and deleted {queue.textRetentionDays} days after it
            is first captured, or sooner once reviewed or ignored. Counts and
            concepts are kept {queue.retentionDays} days.
          </span>
        ) : null}
      </div>
    </div>
  );
}
