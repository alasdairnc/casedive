import { afterEach, describe, expect, it } from "vitest";

import {
  MIN_DISTINCT_TERMS,
  fuseRankings,
  isFullTextRankingEnabled,
  rankCorpus,
} from "../../api/_corpusRanker.js";

const corpus = [
  {
    citation: "A",
    title: "R. v. Alpha",
    tags: ["entrapment"],
    topics: ["Abuse of Process"],
    facts:
      "An undercover officer repeatedly asked the accused to sell him drugs.",
    ratio: "Police may not induce an offence without reasonable suspicion.",
  },
  {
    citation: "B",
    title: "R. v. Bravo",
    tags: ["trafficking"],
    topics: ["Drugs"],
    facts: "The accused sold cocaine from a car.",
    ratio: "Trafficking requires a sale or offer to sell.",
  },
  {
    citation: "C",
    title: "R. v. Charlie",
    tags: ["delay"],
    topics: ["Charter"],
    facts: "The trial took three years to begin.",
    ratio: "Delay beyond the ceiling is presumptively unreasonable.",
  },
];

afterEach(() => {
  delete process.env.RETRIEVAL_FULLTEXT;
});

describe("rankCorpus", () => {
  it("finds a case through its facts, not only its tags", () => {
    const ranked = rankCorpus(
      "an undercover officer kept pressing me to sell drugs",
      corpus,
    );
    expect(ranked[0].caseLaw.citation).toBe("A");
  });

  it("counts distinct query words, not stem variants", () => {
    const ranked = rankCorpus("the officer sold cocaine", corpus);
    const bravo = ranked.find((r) => r.caseLaw.citation === "B");
    expect(bravo.matchedWords).toBeGreaterThanOrEqual(MIN_DISTINCT_TERMS);
    // "sell" and "sold" are different words; "search"/"searched" would count once.
    const single = rankCorpus("searched searching search", [
      { citation: "S", title: "Search", tags: ["search"], topics: [], facts: "", ratio: "" },
    ]);
    expect(single[0].matchedWords).toBe(1);
  });

  it("returns nothing for an empty corpus or a query with no usable words", () => {
    expect(rankCorpus("anything", [])).toEqual([]);
    expect(rankCorpus("the and for", corpus)).toEqual([]);
  });
});

describe("fuseRankings", () => {
  it("favours a case both lists rank, and keeps a case only one list has", () => {
    const [a, b, c] = corpus;
    const fused = fuseRankings([a, b], [b, c]);
    expect(fused[0].caseLaw.citation).toBe("B");
    expect(fused.map((f) => f.caseLaw.citation)).toContain("C");
  });
});

describe("isFullTextRankingEnabled", () => {
  it("is off unless RETRIEVAL_FULLTEXT is exactly 'on'", () => {
    expect(isFullTextRankingEnabled()).toBe(false);
    process.env.RETRIEVAL_FULLTEXT = "1";
    expect(isFullTextRankingEnabled()).toBe(false);
    process.env.RETRIEVAL_FULLTEXT = "on";
    expect(isFullTextRankingEnabled()).toBe(true);
  });
});
