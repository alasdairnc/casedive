#!/usr/bin/env node
// Live eval for STATUTE_GROUNDING: runs the CDSA/YCJA scenario set through the
// real /api/analyze handler and the real model, with grounding on and/or off.
//
// OPT-IN. This calls the Anthropic API (about 2 calls per scenario in
// --mode both), so it is never run in CI or by any hook. It needs
// ANTHROPIC_API_KEY and an explicit --live flag.
//
//   ANTHROPIC_API_KEY=... node scripts/evaluate-statute-grounding.mjs --live
//   ... --live --mode both      compare grounding off vs on
//   ... --live --only youth_publication,cannabis_only
//   ... --live --out artifacts/statute-grounding-eval.json
//
// Hard failures (exit 1): a cited section that does not exist in the Act and
// survived to the output, an `exclude` citation, or any CDSA/YCJA citation for
// a scenario that should engage neither Act (in --mode both only the grounding-on
// run gates the exit code; off is a baseline). Coverage (how many of a
// scenario's expected sections the model actually cited) is reported, not
// gated. Flipping STATUTE_GROUNDING on in production is the owner's call once
// this has been read.
import fs from "node:fs";
import path from "node:path";
import { STATUTE_SCENARIOS } from "../tests/unit/statuteGroundingScenarios.js";
import { lookupStatuteSection } from "../src/lib/statuteLookup.js";

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

if (!flag("live")) {
  console.error(
    "Refusing to run: this calls the Anthropic API. Re-run with --live.",
  );
  process.exit(2);
}
if (!process.env.ANTHROPIC_API_KEY) {
  console.error("ANTHROPIC_API_KEY is not set.");
  process.exit(2);
}

// The live run must not touch Redis, CanLII or the production flag state.
delete process.env.UPSTASH_REDIS_REST_URL;
delete process.env.UPSTASH_REDIS_REST_TOKEN;
delete process.env.KV_REST_API_URL;
delete process.env.KV_REST_API_TOKEN;
delete process.env.CANLII_API_KEY;
process.env.ALLOW_IN_MEMORY_RATE_LIMIT_FALLBACK = "1";

const { default: handler } = await import("../api/analyze.js");

// The handler logs one JSON line per request; keep the report readable.
const log = console.log.bind(console);
// The model call's own log line (duration, stop reason, tokens, retry) is kept.
let lastModelCall = null;
console.log = (...parts) => {
  if (typeof parts[0] === "string" && parts[0].startsWith('{"timestamp"')) {
    try {
      const line = JSON.parse(parts[0]);
      if (line.event === "external_api_call" && line.apiName === "anthropic") {
        lastModelCall = line;
      }
    } catch {
      /* not JSON; drop it */
    }
    return;
  }
  log(...parts);
};

const STATUTE_CITATION =
  /\b(?:CDSA|YCJA)\b|controlled drugs and substances act|youth criminal justice act/i;
// "Controlled Drugs and Substances Act, s. 5(1)" -> "CDSA s. 5"; null if no section.
function canon(citation) {
  const act = /ycja|youth criminal/i.test(citation) ? "YCJA" : "CDSA";
  const m = citation.match(
    /\bs{1,2}\.\s*(\d+(?:\.\d+)?)|\bsections?\s+(\d+(?:\.\d+)?)/i,
  );
  return m ? `${act} s. ${m[1] || m[2]}` : null;
}

function fakeRes() {
  return {
    statusCode: 0,
    body: null,
    setHeader() {},
    status(c) {
      this.statusCode = c;
      return this;
    },
    json(p) {
      this.body = p;
      return this;
    },
    end() {
      return this;
    },
  };
}

let ipCounter = 0;
async function analyze(scenario, groundingOn) {
  if (groundingOn) process.env.STATUTE_GROUNDING = "on";
  else delete process.env.STATUTE_GROUNDING;
  const res = fakeRes();
  // A distinct client IP per call keeps the hourly AI rate limit out of the way.
  const ip = `10.77.${Math.floor(ipCounter / 250)}.${(ipCounter++ % 250) + 1}`;
  lastModelCall = null;
  const t0 = Date.now();
  await handler(
    {
      method: "POST",
      socket: { remoteAddress: ip },
      // Default filters: the prompt the model sees here is the production prompt.
      body: { scenario },
      headers: {
        "content-type": "application/json",
        "content-length": "100",
        "x-vercel-forwarded-for": ip,
      },
    },
    res,
  );
  res.ms = Date.now() - t0;
  res.model = lastModelCall;
  return res;
}

function score(sc, res) {
  const failures = [];
  const civil = Array.isArray(res.body?.civil_law) ? res.body.civil_law : [];
  const cited = civil
    .map((i) => (typeof i?.citation === "string" ? i.citation : ""))
    .filter((c) => STATUTE_CITATION.test(c));
  const canonical = new Set(cited.map(canon).filter(Boolean));

  // Citations the model produced that are not real sections. With grounding on
  // the server already removed them and recorded them in meta.
  const hallucinated = (res.body?.meta?.statutes?.check?.dropped || []).slice();
  for (const c of cited) {
    if (
      /\bs{1,2}\.\s*\d|\bsections?\s+\d|\bschedule\b/i.test(c) &&
      !lookupStatuteSection(c)
    ) {
      hallucinated.push(c);
      failures.push(`cited a section that does not exist: ${c}`);
    }
  }

  if (sc.expectNull && cited.length) {
    failures.push(
      `engaged CDSA/YCJA for an unrelated scenario: ${cited.join(", ")}`,
    );
  }
  for (const ex of sc.exclude || []) {
    if (canonical.has(ex)) failures.push(`cited excluded section: ${ex}`);
  }
  if (sc.cannabisOnly && [...canonical].some((c) => c.startsWith("CDSA"))) {
    failures.push("cited the CDSA for cannabis alone");
  }

  const include = sc.include || [];
  return {
    cited,
    hallucinated,
    failures,
    include,
    covered: include.filter((i) => canonical.has(i)),
  };
}

const only = opt("only", "").split(",").filter(Boolean);
const mode = opt("mode", "on");
const modes = mode === "both" ? [false, true] : [mode !== "off"];
const scenarios = STATUTE_SCENARIOS.filter(
  (s) => !only.length || only.includes(s.id),
);

const report = [];
let hardFailures = 0;
for (const sc of scenarios) {
  for (const groundingOn of modes) {
    // In --mode both the off run is a baseline; only the run being judged gates the exit code.
    const gated = groundingOn || modes.length === 1;
    const res = await analyze(sc.scenario, groundingOn);
    const row = {
      id: sc.id,
      grounding: groundingOn ? "on" : "off",
      status: res.statusCode,
      ms: res.ms,
      modelMs: res.model?.durationMs ?? null,
      retried: res.model?.retried ?? null,
      stopReason: res.model?.stopReason ?? null,
      outputTokens: res.model?.outputTokens ?? null,
    };
    if (res.statusCode !== 200) {
      row.error = res.body?.error || "non-200";
      if (gated) hardFailures += 1;
    } else {
      const s = score(sc, res);
      Object.assign(row, {
        cited: s.cited,
        hallucinated: s.hallucinated,
        covered: `${s.covered.length}/${s.include.length}`,
        failures: s.failures,
      });
      if (gated) hardFailures += s.failures.length;
    }
    report.push(row);
    const mark = row.error || row.failures?.length ? "FAIL" : "ok  ";
    console.log(
      `${mark} ${sc.id.padEnd(30)} grounding=${row.grounding.padEnd(3)} cited=[${(row.cited || []).join("; ")}] covered=${row.covered ?? "-"}${
        row.hallucinated?.length
          ? ` hallucinated=${row.hallucinated.length}`
          : ""
      }`,
    );
    for (const f of row.failures || []) console.log(`       - ${f}`);
  }
}

// The handler aborts a model call at ANALYZE_MODEL_TIMEOUT_MS and answers 504. Grounding adds prompt and output tokens;
// watch these numbers when comparing off and on.
function median(values) {
  const v = values.filter(Number.isFinite).sort((x, y) => x - y);
  return v.length ? v[Math.floor(v.length / 2)] : null;
}

function latency(rows) {
  const ms = rows
    .map((r) => r.ms)
    .filter(Number.isFinite)
    .sort((x, y) => x - y);
  const at = (q) =>
    ms.length ? ms[Math.min(ms.length - 1, Math.floor(q * ms.length))] : null;
  return {
    medianMs: at(0.5),
    p95Ms: at(0.95),
    // The handler answers 504 when the model call hits its time cap.
    timeouts: rows.filter((r) => r.status === 504).length,
    errors: rows.filter((r) => r.status !== 200).length,
    // Truncated JSON (stop_reason max_tokens) and second model calls: the two
    // ways a call gets slow or fails besides the API being slow.
    truncated: rows.filter((r) => r.stopReason === "max_tokens").length,
    retried: rows.filter((r) => r.retried).length,
    medianOutputTokens: median(rows.map((r) => r.outputTokens)),
    maxOutputTokens: Math.max(0, ...rows.map((r) => r.outputTokens || 0)),
  };
}

const summary = {
  scenarios: scenarios.length,
  hardFailures,
  byMode: Object.fromEntries(
    ["off", "on"].map((m) => {
      const rows = report.filter((r) => r.grounding === m && !r.error);
      const [c, t] = rows.reduce(
        (acc, r) => {
          const [a, b] = (r.covered || "0/0").split("/").map(Number);
          return [acc[0] + a, acc[1] + b];
        },
        [0, 0],
      );
      return [
        m,
        {
          runs: rows.length,
          hallucinatedCitations: rows.reduce(
            (n, r) => n + (r.hallucinated?.length || 0),
            0,
          ),
          coverage: t ? `${c}/${t}` : "-",
          ...latency(report.filter((r) => r.grounding === m)),
        },
      ];
    }),
  ),
};
console.log("\n" + JSON.stringify(summary, null, 2));

const out = opt("out", "");
if (out) {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify({ summary, report }, null, 2));
  console.log(`Wrote ${out}`);
}
process.exit(hardFailures ? 1 : 0);
