import { afterEach, describe, expect, it, vi } from "vitest";

import { resolveCorpusCase } from "../../src/lib/canlii.js";

const corpus = [
  { citation: "2009 SCC 32", title: "R. v. Grant", year: 2009, court: "SCC" },
  { citation: "[1993] 3 SCR 223", title: "R. v. Grant", year: 1993, court: "SCC" },
  { citation: "2015 SCC 34", title: "R. v. Smith", year: 2015, court: "SCC" },
  { citation: "2015 ONCA 100", title: "R. v. Smith", year: 2015, court: "ONCA" },
  { citation: "[1990] 2 SCR 633", title: "R. v. Martineau", year: 1990, court: "SCC" },
  { citation: "2013 SCC 72", title: "Canada (AG) v. Bedford", year: 2013, court: "SCC" },
  // Two rows that would both match a legacy CanLII cite.
  { citation: "2020 SCC 1", title: "R. v. Twin", year: 2020, court: "SCC" },
  { citation: "2020 SCC 2", title: "R. v. Twin", year: 2020, court: "SCC" },
];

const resolve = (citation, title) =>
  resolveCorpusCase({ citation, title }, corpus)?.citation ?? null;

describe("resolveCorpusCase", () => {
  it("resolves a correct name and year with a wrong or non-neutral number", () => {
    expect(resolve("R v Martineau, 1990 CanLII 631 (SCC)")).toBe("[1990] 2 SCR 633");
    expect(resolve("R v Martineau, 1990 SCC 12")).toBe("[1990] 2 SCR 633");
  });

  it("uses the year to keep different cases with the same parties apart", () => {
    expect(resolve("R v Grant, 2009 SCC 32")).toBe("2009 SCC 32");
    expect(resolve("R v Grant, 1993 CanLII 5 (SCC)")).toBe("[1993] 3 SCR 223");
    expect(resolve("R v Grant, 2001 SCC 5")).toBeNull();
  });

  it("uses the court so a provincial case is not taken for the SCC case", () => {
    expect(resolve("R v Smith, 2015 ONCA 100")).toBe("2015 ONCA 100");
    expect(resolve("R v Smith, 2015 CanLII 77 (SCC)")).toBe("2015 SCC 34");
    expect(resolve("R v Smith, 2015 ABCA 9")).toBeNull();
  });

  it("does not resolve when two neutral numbers contradict", () => {
    // Same parties, year and court, but a different case.
    expect(resolve("R v Smith, 2015 SCC 99")).toBeNull();
  });

  it("ignores punctuation in the parties", () => {
    expect(resolve("R. v. Martineau, 1990 CanLII 631 (SCC)")).toBe("[1990] 2 SCR 633");
    expect(resolve("R v. Martineau [1990] 2 SCR 633")).toBe("[1990] 2 SCR 633");
  });

  it("treats (Attorney General) and (AG) as the same", () => {
    expect(resolve("Canada (Attorney General) v Bedford, 2013 SCC 72")).toBe("2013 SCC 72");
    expect(resolve("Canada (AG) v Bedford, 2013 CanLII 3 (SCC)")).toBe("2013 SCC 72");
  });

  it("does not resolve an ambiguous match", () => {
    expect(resolve("R v Twin, 2020 CanLII 5 (SCC)")).toBeNull();
  });

  it("returns null without parties, a year or a parseable citation", () => {
    expect(resolveCorpusCase({ citation: "2009 SCC 32" }, corpus)).toBeNull();
    expect(resolveCorpusCase({ citation: "not a citation" }, corpus)).toBeNull();
    expect(resolveCorpusCase({}, corpus)).toBeNull();
    // A bare cite resolves through the title the model gave.
    expect(
      resolveCorpusCase({ citation: "2009 SCC 32", title: "R v Grant" }, corpus)?.citation,
    ).toBe("2009 SCC 32");
  });
});

describe("model citations in retrieval", () => {
  const originalFetch = globalThis.fetch;
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  async function retrieve(scenario, aiCaseLaw) {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({}),
    });
    const { retrieveVerifiedCaseLaw } = await import("../../api/_caseLawRetrieval.js");
    return retrieveVerifiedCaseLaw({
      apiKey: "test-key",
      scenario,
      aiCaseLaw,
      landmarkMatches: [],
      maxResults: 10,
    });
  }

  it("keeps a corpus case the model named with a wrong number", async () => {
    const { cases } = await retrieve(
      "I think the law I am charged under violates the Charter. How does a court decide whether a limit on my rights is justified under section 1?",
      [
        {
          citation: "R v Oakes, 1986 CanLII 46 (SCC)",
          summary: "Section 1 test for justifying Charter limits.",
        },
      ],
    );
    expect(cases.map((c) => c.title)).toContain("R. v. Oakes");
  });

  it("keeps Jordan for a trial-delay question that never says 'delay'", async () => {
    // The semantic filter's delay regex ("delay", "waited") used to drop it.
    const { cases } = await retrieve(
      "I have been waiting eighteen months for my trial on an assault charge. Can I get the charge thrown out because it is taking too long?",
      [{ citation: "R v Jordan, 2016 SCC 27", summary: "Delay ceilings." }],
    );
    expect(cases.map((c) => c.title)).toContain("R. v. Jordan");
  });

  it("keeps Martineau when the model gave the wrong number", async () => {
    const { cases } = await retrieve(
      "I am charged with murder but I was very drunk and never meant to kill him. Can a murder charge stand without intent?",
      [{ citation: "R v Martineau, 1990 CanLII 90 (SCC)", summary: "Murder mens rea." }],
    );
    expect(cases.map((c) => c.title)).toContain("R. v. Martineau");
  });

  it("gives a clearly non-criminal scenario nothing, even when the model names a case", async () => {
    const { cases } = await retrieve(
      "My landlord is raising my rent by 20 percent and I want to know whether that is allowed under the tenancy rules.",
      [{ citation: "R v Martineau, 1990 CanLII 90 (SCC)", summary: "Murder mens rea." }],
    );
    expect(cases).toEqual([]);
  });

  it("does not let an unrelated corpus case through just because the model named it", async () => {
    const { cases } = await retrieve(
      "Someone posted false claims about my business online and I want to sue them for defamation.",
      [
        {
          citation: "R v Stinchcombe, 1991 CanLII 76 (SCC)",
          summary: "Crown disclosure.",
        },
      ],
    );
    expect(cases).toEqual([]);
  });
});
