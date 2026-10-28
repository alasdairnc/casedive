import { afterEach, describe, expect, it, vi } from "vitest";

import { modelSaysNonCriminal } from "../../api/_caseLawRetrieval.js";

const provincial = [
  { citation: "Residential Tenancies Act, 2006, S.O. 2006, c. 17, s. 106" },
];

describe("modelSaysNonCriminal", () => {
  it("is true when there is no Criminal Code section and the statutes are civil", () => {
    expect(
      modelSaysNonCriminal({ criminalCode: [], civilLaw: provincial, issuePrimary: "general_criminal" }),
    ).toBe(true);
  });

  it("is false when the model cites any Criminal Code section", () => {
    expect(
      modelSaysNonCriminal({
        criminalCode: [{ citation: "s. 265" }],
        civilLaw: provincial,
        issuePrimary: "general_criminal",
      }),
    ).toBe(false);
  });

  it("is false when the only statutes are enforced as crimes", () => {
    for (const citation of [
      "Controlled Drugs and Substances Act, s. 5(1)",
      "Youth Criminal Justice Act, s. 3",
      "Fisheries Act, R.S.C. 1985, c. F-14",
      "Canadian Environmental Protection Act, 1999, S.C. 1999, c. 33",
    ]) {
      expect(
        modelSaysNonCriminal({ criminalCode: [], civilLaw: [{ citation }], issuePrimary: "general_criminal" }),
        citation,
      ).toBe(false);
    }
  });

  it("is false with no civil statutes at all (a pure Charter question)", () => {
    expect(
      modelSaysNonCriminal({ criminalCode: [], civilLaw: [], issuePrimary: "charter_detention" }),
    ).toBe(false);
  });

  it("never applies to family law, which the product serves on purpose", () => {
    expect(
      modelSaysNonCriminal({
        criminalCode: [],
        civilLaw: [{ citation: "Divorce Act, s. 15" }],
        issuePrimary: "family_support",
      }),
    ).toBe(false);
  });

  it("ignores missing or malformed input", () => {
    expect(modelSaysNonCriminal({})).toBe(false);
    expect(modelSaysNonCriminal({ criminalCode: null, civilLaw: provincial })).toBe(false);
  });
});

describe("the gate in retrieval", () => {
  const originalFetch = globalThis.fetch;
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  async function retrieve(extra) {
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: false, status: 404, json: async () => ({}) });
    const { retrieveVerifiedCaseLaw } = await import("../../api/_caseLawRetrieval.js");
    return retrieveVerifiedCaseLaw({
      apiKey: "test-key",
      scenario:
        "A store security guard stopped me at the exit and searched my bag. Were my Charter rights violated?",
      aiCaseLaw: [{ citation: "R v Grant, 2009 SCC 32", summary: "Detention and exclusion." }],
      landmarkMatches: [],
      maxResults: 10,
      ...extra,
    });
  }

  it("shows no case law when the model sees only civil statutes", async () => {
    const { cases, meta } = await retrieve({
      criminalCode: [],
      civilLaw: [{ citation: "Occupiers' Liability Act, R.S.O. 1990, c. O.2" }],
    });
    expect(cases).toEqual([]);
    expect(meta.reason).toBe("non_criminal_scope");
  });

  it("does not gate when the model cites a Criminal Code section", async () => {
    const { meta } = await retrieve({
      criminalCode: [{ citation: "s. 265" }],
      civilLaw: [{ citation: "Occupiers' Liability Act, R.S.O. 1990, c. O.2" }],
    });
    expect(meta.reason).not.toBe("non_criminal_scope");
  });
});
