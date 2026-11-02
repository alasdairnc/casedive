#!/usr/bin/env node
// Live eval for OPEN_CASE_SEARCH: runs each scenario's model-style search terms
// through the real A2AJ index (api.a2aj.ca) and reports which expected cases
// came back. No Claude tokens and no CanLII calls, but it needs the network:
// Node's fetch cannot resolve DNS inside the Claude Code sandbox, so run it
// from a normal terminal.
//
//   npm run eval:open-search
//   npm run eval:open-search -- --only therapist_disclosure
//   npm run eval:open-search -- --out artifacts/open-search-eval.json
//
// Expected citations are authorities a lawyer would name for the scenario. A
// miss is reported, not gated: coverage is partial (see api/_openCaseSearch.js)
// and the terms are written the way the analyze model phrases them. Exit 1
// only when the index is unreachable or returns nothing for every scenario.
import fs from "node:fs";
import path from "node:path";
import { searchOpenCaseLaw } from "../api/_openCaseSearch.js";

const SCENARIOS = [
  {
    id: "therapist_disclosure",
    scenario: "my therapist told my crimes to the police",
    terms: ["therapist privilege confidential disclosure"],
    expect: ["[1999] 1 SCR 455", "[1995] 4 SCR 411"], // Smith v Jones, O'Connor
  },
  {
    id: "counsel_denied",
    scenario: "the police arrested me and would not let me call a lawyer",
    terms: ["right to counsel arrest implementation"],
    expect: ["2009 SCC 32"], // R v Grant
  },
  {
    id: "trial_delay",
    scenario: "my trial for a fraud charge is taking two years to start",
    terms: ["unreasonable delay section 11(b) ceiling"],
    expect: ["2016 SCC 27"], // R v Jordan
  },
  {
    id: "crown_disclosure",
    scenario: "the crown never gave my lawyer the police notes before trial",
    terms: ["crown disclosure obligation defence"],
    expect: ["[1991] 3 SCR 326"], // R v Stinchcombe
  },
];

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
};
const only = opt("only")?.split(",");
const out = opt("out");

const rows = [];
for (const s of SCENARIOS.filter((x) => !only || only.includes(x.id))) {
  const hits = await searchOpenCaseLaw({
    scenario: s.scenario,
    aiSuggestions: s.terms.map((term) => ({ term })),
    timeoutMs: 10000,
  });
  const cited = new Set(hits.map((h) => h.citation));
  const found = s.expect.filter((c) => cited.has(c));
  rows.push({
    id: s.id,
    returned: hits.length,
    expected: s.expect,
    found,
    results: hits.map((h) => `${h.citation} ${h.title}`),
  });
  console.log(
    `${found.length === s.expect.length ? "ok  " : "miss"} ${s.id}: ${found.length}/${s.expect.length} expected, ${hits.length} returned`,
  );
  for (const r of hits) console.log(`       ${r.citation}  ${r.title}`);
}

if (out) {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(rows, null, 2));
}

if (rows.length > 0 && rows.every((r) => r.returned === 0)) {
  console.error(
    "\nNo scenario returned anything: the index is unreachable or blocked.",
  );
  process.exit(1);
}
