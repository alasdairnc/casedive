import { afterEach, describe, expect, it, vi } from "vitest";

import {
  buildOpenSearchQuery,
  searchOpenCaseLaw,
} from "../../api/_openCaseSearch.js";
import { retrieveVerifiedCaseLaw } from "../../api/_caseLawRetrieval.js";

const originalFetch = globalThis.fetch;
const originalFlag = process.env.OPEN_CASE_SEARCH;

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalFlag === undefined) delete process.env.OPEN_CASE_SEARCH;
  else process.env.OPEN_CASE_SEARCH = originalFlag;
});

const SCENARIO = "my therapist told my crimes to the police";
const TERMS = [{ term: "therapist privilege confidential disclosure" }];

// What A2AJ returned for the model's terms on 2026-11-02 (trimmed).
const A2AJ_BODY = {
  results: [
    {
      citation_en: "[1999] 1 SCR 455",
      name_en: "Smith v. Jones",
      snippet:
        "The <em>therapist</em> disclosed <em>confidential</em> statements to <em>police</em> on public safety grounds.",
    },
    {
      citation_en: "2001 SCC 14",
      name_en: "R. v. McClure",
      snippet: "lawyer, <em>police</em>, <em>therapist</em> privilege",
    },
    { citation_en: "C38577", name_en: "R. v. C., T.", snippet: "police" },
  ],
};

function mockFetch() {
  globalThis.fetch = vi.fn(async (url) => {
    if (String(url).includes("api.a2aj.ca")) {
      return { ok: true, status: 200, json: async () => A2AJ_BODY };
    }
    return {
      ok: true,
      status: 200,
      json: async () => ({ title: "R. v. McClure" }),
    };
  });
}

describe("buildOpenSearchQuery", () => {
  it("puts the model's terms before the scenario words and drops stop words", () => {
    const q = buildOpenSearchQuery({
      scenario: SCENARIO,
      aiSuggestions: [{ term: "therapist-patient privilege" }],
    });
    expect(q.startsWith("therapist patient privilege")).toBe(true);
    expect(q).toContain("police");
    expect(q.split(" ")).not.toContain("the");
  });
});

describe("searchOpenCaseLaw", () => {
  it("maps hits, strips markup and skips unparseable citations", async () => {
    mockFetch();
    const out = await searchOpenCaseLaw({
      scenario: SCENARIO,
      aiSuggestions: TERMS,
    });
    expect(out.map((c) => c.citation)).toEqual([
      "[1999] 1 SCR 455",
      "2001 SCC 14",
    ]);
    expect(out[0].summary).not.toContain("<em>");
    expect(out[0].matchedTerm).toBe("Open case-law search");
  });

  it("scopes the datasets to the jurisdiction and always keeps the SCC", async () => {
    mockFetch();
    await searchOpenCaseLaw({
      scenario: SCENARIO,
      aiSuggestions: TERMS,
      filters: { jurisdiction: "Ontario" },
    });
    expect(String(globalThis.fetch.mock.calls[0][0])).toContain(
      "dataset=SCC%2CONCA",
    );
  });

  it("drops passages that matched only one query word", async () => {
    globalThis.fetch = vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        results: [
          {
            citation_en: "2019 ONCA 637",
            name_en: "R. v. P.S.",
            snippet: "told <em>police</em>",
          },
        ],
      }),
    }));
    expect(
      await searchOpenCaseLaw({ scenario: SCENARIO, aiSuggestions: TERMS }),
    ).toEqual([]);
  });

  it("does not search on scenario words alone", async () => {
    mockFetch();
    expect(await searchOpenCaseLaw({ scenario: SCENARIO })).toEqual([]);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("fails open on a network error", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("down"));
    expect(
      await searchOpenCaseLaw({ scenario: SCENARIO, aiSuggestions: TERMS }),
    ).toEqual([]);
  });
});

describe("retrieveVerifiedCaseLaw with OPEN_CASE_SEARCH", () => {
  const run = () =>
    retrieveVerifiedCaseLaw({
      apiKey: "test-key",
      scenario: SCENARIO,
      aiSuggestions: [{ term: "therapist privilege confidential disclosure" }],
      criminalCode: [],
      civilLaw: [],
      maxResults: 3,
    });

  it("does not call the open index when the flag is off", async () => {
    delete process.env.OPEN_CASE_SEARCH;
    mockFetch();
    await run();
    const hitA2aj = globalThis.fetch.mock.calls.some(([u]) =>
      String(u).includes("api.a2aj.ca"),
    );
    expect(hitA2aj).toBe(false);
  });

  it.each([
    [
      "answers 500",
      async () => ({ ok: false, status: 500, json: async () => ({}) }),
    ],
    [
      "is unreachable",
      async () => {
        throw new Error("down");
      },
    ],
  ])(
    "counts the open search as an upstream error when A2AJ %s",
    async (_label, a2ajResponse) => {
      process.env.OPEN_CASE_SEARCH = "on";
      globalThis.fetch = vi.fn(async (url) =>
        String(url).includes("api.a2aj.ca")
          ? a2ajResponse()
          : { ok: true, status: 200, json: async () => ({ title: "x" }) },
      );

      const { cases, meta } = await run();

      // The failed search adds nothing, and the pool here is otherwise empty.
      expect(cases).toEqual([]);
      expect(meta.upstreamErrors).toBe(1);
    },
  );

  it("does not count an open search that answered with no usable hits", async () => {
    process.env.OPEN_CASE_SEARCH = "on";
    globalThis.fetch = vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ results: [] }),
    }));

    const { meta } = await run();

    expect(meta.upstreamErrors).toBe(0);
  });

  it("surfaces open-index cases for a scenario the corpus lacks", async () => {
    process.env.OPEN_CASE_SEARCH = "on";
    mockFetch();
    const { cases, meta } = await run();
    expect(meta.openSearchCandidates).toBe(2);
    const mcclure = cases.find((c) => c.citation === "2001 SCC 14");
    if (mcclure) expect(mcclure.matched_content).toContain("still good law");
    const citations = cases.map((c) => c.citation);
    expect(citations).toContain("[1999] 1 SCR 455");
    const smith = cases.find((c) => c.citation === "[1999] 1 SCR 455");
    expect(smith.verificationStatus).toBe("unverified");
    expect(smith.matched_content).not.toContain("Landmark Case Law Database");
    expect(smith.matched_content).toContain("still good law");
  });
});
