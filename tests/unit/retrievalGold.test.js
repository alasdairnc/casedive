import { describe, expect, it } from "vitest";

import { MASTER_CASE_LAW_DB } from "../../src/lib/caselaw/index.js";
import {
  citationKey,
  classifyScenario,
  runGoldEval,
  summarizeGold,
} from "../../scripts/_retrievalGoldEval.js";
import { RETRIEVAL_GOLD_SET } from "./retrievalGoldSet.js";

describe("gold set integrity", () => {
  const corpusKeys = new Set(MASTER_CASE_LAW_DB.map((c) => citationKey(c.citation)));

  it("has unique ids and non-empty scenarios", () => {
    const ids = RETRIEVAL_GOLD_SET.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const s of RETRIEVAL_GOLD_SET) {
      expect(s.scenario.trim().length).toBeGreaterThan(10);
    }
  });

  it("labels only cases that exist in the corpus", () => {
    for (const s of RETRIEVAL_GOLD_SET) {
      for (const tier of ["relevant", "acceptable", "wrong"]) {
        for (const citation of s[tier] || []) {
          expect(
            corpusKeys.has(citationKey(citation)),
            `${s.id}.${tier}: ${citation} is not in the corpus`,
          ).toBe(true);
        }
      }
    }
  });

  it("never puts a case in two tiers of the same scenario", () => {
    for (const s of RETRIEVAL_GOLD_SET) {
      const keys = ["relevant", "acceptable", "wrong"].flatMap((tier) =>
        (s[tier] || []).map(citationKey),
      );
      expect(new Set(keys).size, s.id).toBe(keys.length);
    }
  });
});

describe("classifyScenario", () => {
  const scenario = {
    id: "x",
    relevant: ["2009 SCC 32"],
    acceptable: ["2004 SCC 52"],
    wrong: ["[1973] SCR 313"],
  };
  const returned = (...citations) =>
    citations.map((citation) => ({ citation, title: citation }));

  it("matches a named citation to a bare label", () => {
    const r = classifyScenario(scenario, returned("R v Grant, 2009 SCC 32"));
    expect(r.verdict).toBe("HIT");
    expect(r.recallAtK).toBe(1);
  });

  it("scores weak, missed and wrong answers", () => {
    expect(classifyScenario(scenario, returned("2004 SCC 52")).verdict).toBe(
      "HIT_WEAK",
    );
    expect(classifyScenario(scenario, []).verdict).toBe("MISS");
    expect(classifyScenario(scenario, returned("2013 SCC 60")).verdict).toBe(
      "MISS",
    );
    // A wrong case outranks a hit shown beside it.
    expect(
      classifyScenario(scenario, returned("2009 SCC 32", "[1973] SCR 313"))
        .verdict,
    ).toBe("WRONG");
  });

  it("treats a scenario with no labelled answer as expect-empty", () => {
    const none = { id: "n" };
    expect(classifyScenario(none, []).verdict).toBe("OK_EMPTY");
    expect(classifyScenario(none, returned("2009 SCC 32")).verdict).toBe(
      "REVIEW",
    );
  });

  it("counts the same case shown twice", () => {
    const r = classifyScenario(
      scenario,
      returned("R v Grant, 2009 SCC 32", "2009 SCC 32"),
    );
    expect(r.duplicates).toBe(1);
  });
});

describe("summarizeGold", () => {
  it("aggregates hit rate, precision and wrong count", () => {
    const a = classifyScenario(
      { id: "a", relevant: ["2009 SCC 32"] },
      [{ citation: "2009 SCC 32", title: "Grant" }],
    );
    const b = classifyScenario(
      { id: "b", relevant: ["2004 SCC 52"], wrong: ["[1973] SCR 313"] },
      [{ citation: "[1973] SCR 313", title: "Calder" }],
    );
    const s = summarizeGold([a, b]);
    expect(s.hitRate).toBe(0.5);
    expect(s.precision).toBe(0.5);
    expect(s.wrongCount).toBe(1);
  });
});

// Ratchet: today's measured numbers, rounded down. A retrieval change that
// makes any of them worse fails here; raise the floors as retrieval improves.
// Measured 2026-10-08 on feat/retrieval-gold-eval: hit 73.2%, strong 74.4%,
// recall@3 69.2%, precision 78.8%, empty-when-right 85.7%, wrong 6, dupes 2.
describe("retrieval against the gold set (offline)", () => {
  it("does not regress", { timeout: 180_000 }, async () => {
    const { summary, fetchCalls } = await runGoldEval();

    expect(fetchCalls).toBe(0);
    expect(summary.hitRate).toBeGreaterThanOrEqual(0.73);
    expect(summary.strongHitRate).toBeGreaterThanOrEqual(0.74);
    expect(summary.recallAtK).toBeGreaterThanOrEqual(0.69);
    expect(summary.precision).toBeGreaterThanOrEqual(0.78);
    expect(summary.emptyOkRate).toBeGreaterThanOrEqual(0.85);
    expect(summary.wrongCount).toBeLessThanOrEqual(6);
    expect(summary.duplicateCount).toBeLessThanOrEqual(2);
  });
});
