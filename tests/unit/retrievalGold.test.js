import { describe, expect, it } from "vitest";

import { buildCitationIdentityKey } from "../../src/lib/canlii.js";
import { MASTER_CASE_LAW_DB } from "../../src/lib/caselaw/index.js";
import {
  citationKey,
  classifyScenario,
  loadFixtures,
  runFailureNegatives,
  runGoldEval,
  summarizeGold,
} from "../../scripts/_retrievalGoldEval.js";
import { RETRIEVAL_GOLD_SET } from "./retrievalGoldSet.js";
import { RETRIEVAL_HELD_OUT_SET } from "./retrievalHeldOutSet.js";
import { RETRIEVAL_HELD_OUT_SET_2 } from "./retrievalHeldOutSet2.js";
import { RETRIEVAL_FAILURE_SET } from "./retrievalFailureSet.js";
import { RETRIEVAL_NEAR_MISS_NEGATIVES } from "./retrievalNearMissNegatives.js";

describe("corpus integrity", () => {
  it("has one row per case", () => {
    const seen = new Map();
    for (const c of MASTER_CASE_LAW_DB) {
      const key = buildCitationIdentityKey(c.citation);
      expect(
        seen.has(key),
        `${c.title} (${c.citation}) duplicates ${seen.get(key)}`,
      ).toBe(false);
      seen.set(key, c.title);
    }
  });
});

describe("held-out set integrity", () => {
  it("has unique ids that do not collide with the gold set, and real labels", () => {
    const ids = [
      ...RETRIEVAL_GOLD_SET,
      ...RETRIEVAL_HELD_OUT_SET,
      ...RETRIEVAL_HELD_OUT_SET_2,
    ].map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    const corpusKeys = new Set(
      MASTER_CASE_LAW_DB.map((c) => citationKey(c.citation)),
    );
    for (const s of [...RETRIEVAL_HELD_OUT_SET, ...RETRIEVAL_HELD_OUT_SET_2]) {
      for (const tier of ["relevant", "acceptable", "wrong"]) {
        for (const citation of s[tier] || []) {
          expect(corpusKeys.has(citationKey(citation)), `${s.id}.${tier}`).toBe(true);
        }
      }
    }
  });
});

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
// Measured 2026-10-08 on feat/retrieval-gold-eval (50 criminal-law scenarios,
// 91-case corpus after the first lane fills): hit 71.1%, strong 73.8%,
// recall@3 70.2%, precision 74.6%, empty-when-right 100%, wrong 7, dupes 0.
describe("retrieval against the gold set (offline)", () => {
  it("does not regress", { timeout: 180_000 }, async () => {
    const { summary, fetchCalls } = await runGoldEval();

    expect(fetchCalls).toBe(0);
    expect(summary.hitRate).toBeGreaterThanOrEqual(0.71);
    expect(summary.strongHitRate).toBeGreaterThanOrEqual(0.73);
    expect(summary.recallAtK).toBeGreaterThanOrEqual(0.7);
    expect(summary.precision).toBeGreaterThanOrEqual(0.74);
    expect(summary.emptyOkRate).toBe(1);
    expect(summary.wrongCount).toBeLessThanOrEqual(7);
    expect(summary.duplicateCount).toBe(0);
  });
});

// Frozen scenarios the ranking was never developed against, and the "expect no
// case law" scenarios replayed through the production candidate scorer.
// Measured 2026-10-08 with RETRIEVAL_FULLTEXT off (production behaviour): held-out
// hit 61.5%, strong 38.5%, recall@3 34.6%, precision 50%, wrong 0; 2 of 26
// negatives leak (robbery_not_hunter, simple_possession_not_trafficking).
describe("held-out and negative replay (offline)", () => {
  it("does not regress", { timeout: 180_000 }, async () => {
    const held = await runGoldEval({ scenarios: RETRIEVAL_HELD_OUT_SET });
    expect(held.fetchCalls).toBe(0);
    expect(held.summary.hitRate).toBeGreaterThanOrEqual(0.6);
    expect(held.summary.strongHitRate).toBeGreaterThanOrEqual(0.38);
    expect(held.summary.recallAtK).toBeGreaterThanOrEqual(0.34);
    expect(held.summary.precision).toBeGreaterThanOrEqual(0.49);
    expect(held.summary.wrongCount).toBe(0);

    const negatives = await runFailureNegatives();
    expect(negatives.total).toBeGreaterThanOrEqual(26);
    expect(negatives.leakCount).toBeLessThanOrEqual(2);
  });
});

// The primary ratchet: the model's recorded suggestions and CanLII's recorded
// answers replayed through the full production path (scripts/record-retrieval-
// fixtures.js; re-record with --ids when a scenario is added). Measured
// 2026-10-08, after the vouched lane: dev hit 77.8%, strong 81.0%, recall@3
// 77.4%, precision 73.4%, wrong 7; held-out hit 84.6%, strong 61.5%, recall@3
// 61.5%, precision 83.3%, wrong 0; held-out batch 2 (aggregate only) hit 80.0%,
// strong 73.3%, recall@3 73.3%, precision 66.7%, wrong 0; 8 of 40 negatives
// leak (2 original, 6 near-miss; the near-miss set leaked 7 before any lane
// work, so those are the pipeline's existing false positives outside criminal law).
describe("model replay (recorded fixtures)", () => {
  const fixtures = loadFixtures();

  it("has a recording for every scenario", () => {
    expect(fixtures).not.toBeNull();
    const texts = [
      ...RETRIEVAL_GOLD_SET,
      ...RETRIEVAL_HELD_OUT_SET,
      ...RETRIEVAL_HELD_OUT_SET_2,
      ...RETRIEVAL_NEAR_MISS_NEGATIVES,
    ].map((s) => s.scenario);
    const missing = texts.filter((t) => !fixtures.scenarios[t]);
    expect(missing, "record these with scripts/record-retrieval-fixtures.js").toEqual([]);
  });

  it("does not regress", { timeout: 180_000 }, async () => {
    const dev = await runGoldEval({ fixtures });
    expect(dev.fetchCalls).toBe(0);
    expect(dev.summary.hitRate).toBeGreaterThanOrEqual(0.77);
    expect(dev.summary.strongHitRate).toBeGreaterThanOrEqual(0.8);
    expect(dev.summary.recallAtK).toBeGreaterThanOrEqual(0.77);
    expect(dev.summary.precision).toBeGreaterThanOrEqual(0.73);
    expect(dev.summary.wrongCount).toBeLessThanOrEqual(7);
    expect(dev.summary.duplicateCount).toBe(0);

    const held = await runGoldEval({ scenarios: RETRIEVAL_HELD_OUT_SET, fixtures });
    expect(held.fetchCalls).toBe(0);
    expect(held.summary.hitRate).toBeGreaterThanOrEqual(0.84);
    expect(held.summary.strongHitRate).toBeGreaterThanOrEqual(0.61);
    expect(held.summary.recallAtK).toBeGreaterThanOrEqual(0.61);
    expect(held.summary.precision).toBeGreaterThanOrEqual(0.83);
    expect(held.summary.wrongCount).toBe(0);

    const held2 = await runGoldEval({ scenarios: RETRIEVAL_HELD_OUT_SET_2, fixtures });
    expect(held2.fetchCalls).toBe(0);
    expect(held2.summary.hitRate).toBeGreaterThanOrEqual(0.8);
    expect(held2.summary.strongHitRate).toBeGreaterThanOrEqual(0.73);
    expect(held2.summary.recallAtK).toBeGreaterThanOrEqual(0.73);
    expect(held2.summary.precision).toBeGreaterThanOrEqual(0.66);
    expect(held2.summary.wrongCount).toBe(0);

    const negatives = await runFailureNegatives({
      scenarios: [...RETRIEVAL_FAILURE_SET, ...RETRIEVAL_NEAR_MISS_NEGATIVES],
      fixtures,
    });
    expect(negatives.total).toBeGreaterThanOrEqual(40);
    expect(negatives.leakCount).toBeLessThanOrEqual(8);
  });
});
