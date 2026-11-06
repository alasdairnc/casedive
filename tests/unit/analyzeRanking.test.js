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
    // "arrest". analyze.js used to keep its own copy of the issue classifier
    // that missed this lay phrasing (fixed only in retrieval's detectCoreIssue
    // for the R v Grant regression); it fell through to "general_criminal"
    // and an unrelated theft case outranked Grant. Both passes now share
    // detectCoreIssue.
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

describe("selectTopRetrievedCases shares retrieval's classifier", () => {
  it("treats a forced police entry as a search and ranks an s. 8 case over a break-and-enter decoy", () => {
    // Forced-entry phrasing was added to retrieval's detectCoreIssue (#111).
    // analyze.js's own copy never got it, read this as general_criminal and
    // let the decoy with more overlapping words win.
    const selected = __testables.selectTopRetrievedCases(
      "Police kicked down the door of my apartment at 3 a.m. and went through every room.",
      [
        {
          citation: "R v Doe, 2015 ONCA 30",
          summary:
            "Break and enter of an apartment at 3 a.m.; the accused kicked the door and went through every room before police arrived.",
          matched_content: "",
          year: 2015,
        },
        {
          citation: "R v Feeney, [1997] 2 SCR 13",
          summary:
            "Warrantless police entry into a dwelling violated the Charter s. 8 right against unreasonable search.",
          matched_content: "",
          year: 1997,
        },
      ],
      3,
    );

    expect(selected[0].citation).toBe("R v Feeney, [1997] 2 SCR 13");
    expect(selected.map((c) => c.citation)).not.toContain(
      "R v Doe, 2015 ONCA 30",
    );
  });

  it("keeps R v Jobidon on a fist-fight assault scenario", () => {
    // Jobidon is about consent to a fight. Retrieval's domain detector read
    // bare "consent" as sexual assault and dropped its assault tag, so the
    // shared gate would have removed it from assault scenarios.
    const selected = __testables.selectTopRetrievedCases(
      "I got into a bar fight and the other guy broke my arm. We both agreed to fight outside.",
      [
        {
          citation: "R. v. Jobidon, [1991] 2 SCR 714",
          summary:
            "Consent is no defence to assault where the parties intend and cause serious bodily harm in a fist fight.",
          matched_content: "Landmark Case Law Database",
          year: 1991,
        },
        {
          citation: "R. v. Khill, 2021 SCC 37",
          summary:
            "Self-defence to a charge arising from an assault; the accused's role in the incident.",
          matched_content: "Landmark Case Law Database",
          year: 2021,
        },
      ],
      3,
    );

    expect(selected.map((c) => c.citation)).toContain(
      "R. v. Jobidon, [1991] 2 SCR 714",
    );
  });
});

describe("selectTopRetrievedCases landmark bonus", () => {
  it("keeps R v Woods when retrieval labels it 'Landmark Case Law Database'", () => {
    // What retrieveVerifiedCaseLaw actually emits for a curated landmark. The
    // bonus used to check only for "Landmark RAG Match", which never reaches
    // matched_content, so Woods fell under the overlap filter.
    const selected = __testables.selectTopRetrievedCases(
      "After my arrest at the station, officers kept questioning me for two hours and refused to let me speak to a lawyer.",
      [
        {
          citation: "R. v. Woods, 2005 SCC 42",
          summary:
            "Right to counsel obligations upon arrest or detention. charter 10(b) counsel arrest counsel charter rights",
          matched_content:
            "Landmark Case Law Database | Semantic matches: s. 10, s. 10(b), right to counsel",
          year: 2005,
        },
      ],
      3,
    );
    expect(selected.map((c) => c.citation)).toEqual([
      "R. v. Woods, 2005 SCC 42",
    ]);
  });
});
