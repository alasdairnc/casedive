import { describe, expect, it } from "vitest";

import { __testables } from "../../api/analyze.js";

describe("selectTopRetrievedCases fallback", () => {
  it("keeps ranked candidates when strict overlap filter excludes all results", () => {
    const scenario = "i was hit over the back of the head with a baseball bat";
    const retrievedCases = [
      {
        citation: "R v Example, 2018 SCC 10",
        summary:
          "Assault causing bodily harm with a weapon and intent evidence.",
        matched_content: "Landmark RAG Match",
        year: 2018,
      },
      {
        citation: "R v Sample, 2011 SCC 5",
        summary:
          "Criminal assault facts with injuries and evidentiary analysis.",
        matched_content: "Landmark RAG Match",
        year: 2011,
      },
    ];

    const selected = __testables.selectTopRetrievedCases(
      scenario,
      retrievedCases,
      3,
    );

    expect(selected.length).toBeGreaterThan(0);
    expect(selected[0].citation).toBe("R v Example, 2018 SCC 10");
  });

  it("ranks a Charter detention case over an off-domain decoy for lay-phrased detention scenarios", () => {
    // "stopped by police" / "held for X minutes" never say "detain" or
    // "arrest" — api/_caseLawRetrieval.js's detectCoreIssue recognizes these
    // lay phrasings (fixed for the R v Grant retrieval regression), but this
    // file's own classifier only matched literal detention/arrest tokens. It
    // fell through to "general_criminal", which skips the domain-compatibility
    // penalty for every candidate (caseCompatibleWithScenarioIssue returns
    // true unconditionally for general_criminal), so an unrelated theft case
    // with slightly higher raw token overlap outranked the correct case.
    const scenario =
      "I was stopped by police outside a convenience store and held for forty minutes before they went through my backpack";
    const retrievedCases = [
      {
        citation: "R v Grant, 2009 SCC 32",
        summary:
          "Arbitrary detention under Charter section 9; the accused was held by police without arrest before a search of his belongings.",
        matched_content: "",
        year: 2009,
      },
      {
        citation: "R v Doe, 2010 ONCA 20",
        summary:
          "Theft under five thousand dollars; the accused took merchandise from a convenience store and fled when confronted by staff.",
        matched_content: "",
        year: 2010,
      },
    ];

    const selected = __testables.selectTopRetrievedCases(
      scenario,
      retrievedCases,
      3,
    );

    expect(selected[0].citation).toBe("R v Grant, 2009 SCC 32");
  });
});
