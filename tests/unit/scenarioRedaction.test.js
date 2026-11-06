import { describe, expect, it } from "vitest";
import { RETRIEVAL_GOLD_SET } from "./retrievalGoldSet.js";
import { RETRIEVAL_FAILURE_SET } from "./retrievalFailureSet.js";
import {
  FINGERPRINT_PATTERN,
  redactScenario,
  scenarioFingerprint,
  SCENARIO_SNIPPET_MAX_CHARS,
} from "../../api/_scenarioRedaction.js";

describe("redactScenario", () => {
  it("removes emails, phone numbers and urls", () => {
    const out = redactScenario(
      "Email me at jane.doe+legal@example.com or call (416) 555-0199 or 647-555-0100, see https://example.com/doc?id=1 and www.foo.ca/x",
    );
    expect(out).not.toMatch(/example\.com|555|foo\.ca/);
    expect(out).toContain("[email]");
    expect(out).toContain("[phone]");
    expect(out).toContain("[url]");
  });

  it("removes SINs, postal codes, addresses and long digit runs", () => {
    const out = redactScenario(
      "SIN 123-456-789, lives at 221 King Street West, M5V 2T6, licence D12345678901 and case 20240012345",
    );
    expect(out).not.toMatch(/123-456-789|M5V|221 King|20240012345|D12345678901/);
    expect(out).toContain("[id]");
    expect(out).toContain("[postal]");
    expect(out).toContain("[address]");
  });

  it("leaves ordinary legal facts intact", () => {
    const text =
      "I was stopped at a RIDE check and the officer demanded a breath sample after 2 drinks";
    expect(redactScenario(text)).toBe(text);
  });

  it("collapses whitespace and caps length on a word boundary", () => {
    const long = `${"word ".repeat(200)}end`;
    const out = redactScenario(long);
    expect(out.length).toBeLessThanOrEqual(SCENARIO_SNIPPET_MAX_CHARS + 1);
    expect(out.endsWith("…")).toBe(true);
    expect(out).not.toMatch(/\s{2}/);
  });

  it("keeps the facts of a paragraph-length scenario (500 characters)", () => {
    const paragraph =
      "I was driving home on Highway 401 near Toronto around midnight when the officer pulled me over for speeding. He said he smelled alcohol and demanded a breath sample at the roadside, but he never told me I could speak to a lawyer first. I blew over the limit at the station and got a 90-day licence suspension. " +
      "My lawyer says the demand may not have been valid. At trial the Crown relied on the roadside result.";
    expect(paragraph.length).toBeGreaterThan(400);
    expect(paragraph.length).toBeLessThan(500);
    expect(redactScenario(paragraph)).toBe(paragraph);
    expect(SCENARIO_SNIPPET_MAX_CHARS).toBe(500);

    const out = redactScenario(`${paragraph} ${paragraph}`);
    expect(out.length).toBeLessThanOrEqual(501);
    expect(out.endsWith("…")).toBe(true);
  });

  it("returns an empty string for non-strings and blanks", () => {
    expect(redactScenario(undefined)).toBe("");
    expect(redactScenario(null)).toBe("");
    expect(redactScenario("   \n\t ")).toBe("");
    expect(redactScenario(42)).toBe("");
  });

  describe("name masking", () => {
    it("masks a full name in the middle of a sentence", () => {
      const out = redactScenario("My neighbour Jane Doe took my bike");
      expect(out).toBe("My neighbour [name] took my bike");
    });

    it("keeps the title and masks the name after it", () => {
      expect(redactScenario("Officer Jones searched my car")).toBe(
        "Officer [name] searched my car",
      );
      expect(redactScenario("I told Mr. Patel about it")).toContain("[name]");
      expect(redactScenario("I told Mr. Patel about it")).not.toContain("Patel");
    });

    it("masks a single Capitalised word mid-sentence", () => {
      expect(redactScenario("I think my friend Sarah saw it")).toBe(
        "I think my friend [name] saw it",
      );
    });

    it("masks two names in a row at the start of a sentence", () => {
      expect(redactScenario("Jane Doe took my bike")).toBe("[name] took my bike");
    });

    it("keeps legal vocabulary, jurisdictions, days and acronyms", () => {
      const text =
        "On Monday in Ontario the Crown said the Criminal Code and the Charter applied at the RIDE stop, a CDSA matter";
      expect(redactScenario(text)).toBe(text);
    });

    it("keeps a public case name after R v", () => {
      const text = "My lawyer cited R v Grant and R. v. Mann";
      expect(redactScenario(text)).toContain("R v Grant");
      expect(redactScenario(text)).toContain("R. v. Mann");
    });

    it("does not touch the tags redaction already inserted", () => {
      expect(redactScenario("Email me at a@b.com, thanks")).toBe(
        "Email me at [email], thanks",
      );
    });

    it("documents the remaining gaps: lowercase names and a lone name opening a sentence", () => {
      // Heuristic masking cannot see these. The privacy text must not claim
      // names are always removed.
      expect(redactScenario("my brother mike took my bike")).toContain("mike");
      expect(redactScenario("Mike took my bike")).toContain("Mike");
    });

    it("keeps places, shops and apps: where it happened helps retrieval", () => {
      const text =
        "I was arrested at the Eaton Centre in Toronto for shoplifting from Sephora after an Uber ride, near King Street and Dundas";
      expect(redactScenario(text)).toBe(text);
    });

    it("masks the person but keeps the surrounding facts", () => {
      expect(
        redactScenario("My roommate Sarah and I were at Walmart in Brampton when security grabbed my bag"),
      ).toBe("My roommate [name] and I were at Walmart in Brampton when security grabbed my bag");
      expect(
        redactScenario("Police in Mississauga said Mike took my laptop"),
      ).toBe("Police in Mississauga said [name] took my laptop");
    });

    it("masks a single name after a relationship or introduction word", () => {
      for (const text of [
        "my brother Mike was there",
        "a guy named Dave hit me",
        "my landlord Raj entered the unit",
        "I told Sarah about it",
      ]) {
        expect(redactScenario(text)).toContain("[name]");
      }
    });

    it("masks a single name before a verb a person does", () => {
      expect(redactScenario("My landlord said Sarah grabbed my phone")).toBe(
        "My landlord said [name] grabbed my phone",
      );
    });

    it("masks a possessive name mid-sentence, but not a place's possessive", () => {
      expect(redactScenario("my landlord said Sarah's dog bit me")).toBe(
        "my landlord said [name] dog bit me",
      );
      expect(redactScenario("I was in Toronto's west end and at Costco's lot")).toBe(
        "I was in Toronto's west end and at Costco's lot",
      );
    });

    it("does not swallow a sentence opener into the name", () => {
      expect(redactScenario("Then Sarah grabbed my phone")).toBe(
        "Then [name] grabbed my phone",
      );
    });

    it("keeps a shop by its full name, but still masks a person who shares a word with it", () => {
      expect(redactScenario("I stopped at Tim Hortons and a Canadian Tire in Barrie")).toBe(
        "I stopped at Tim Hortons and a Canadian Tire in Barrie",
      );
      expect(redactScenario("my brother Tim took my car")).toBe(
        "my brother [name] took my car",
      );
    });

    it("keeps a city that is also a first name, unless a person signal is around it", () => {
      expect(redactScenario("I live in Victoria and work in London")).toBe(
        "I live in Victoria and work in London",
      );
      expect(redactScenario("my friend Victoria said it was fine")).toBe(
        "my friend [name] said it was fine",
      );
    });

    it("never overrides legal vocabulary, even with a person signal", () => {
      expect(redactScenario("my lawyer said Charter rights applied")).toBe(
        "my lawyer said Charter rights applied",
      );
    });

    it("documents the cost of keeping context: a lone name with no cue slips through", () => {
      // Kept on purpose, so shops and neighbourhoods are not hidden. The privacy
      // text says names can slip through.
      expect(redactScenario("I met Sarah yesterday")).toContain("Sarah");
    });

    it("does not mask pronouns or ordinary sentence openers", () => {
      const text = "He took my bag. She said it was theirs. The officer saw it.";
      expect(redactScenario(text)).toBe(text);
    });

    it("leaves every scenario in the gold and failure sets untouched by name masking", () => {
      // These are realistic, impersonal scenarios. Losing words here would mean
      // the masking is eating the signal retrieval needs.
      const all = [...RETRIEVAL_GOLD_SET, ...RETRIEVAL_FAILURE_SET]
        .map((c) => c.scenario)
        .filter(Boolean);
      expect(all.length).toBeGreaterThan(50);
      for (const scenario of all) {
        expect(redactScenario(scenario)).not.toContain("[name]");
      }
    });

    it("is idempotent", () => {
      const once = redactScenario("My neighbour Jane Doe, Officer Jones, call 416-555-0101");
      expect(redactScenario(once)).toBe(once);
    });
  });
});

describe("scenarioFingerprint", () => {
  it("is stable across case, punctuation and spacing", () => {
    const a = scenarioFingerprint(redactScenario("My chair was stolen!"));
    const b = scenarioFingerprint(redactScenario("  my  chair was STOLEN "));
    expect(a).toBe(b);
    expect(a).toMatch(FINGERPRINT_PATTERN);
  });

  it("differs for different scenarios", () => {
    expect(scenarioFingerprint("my chair was stolen")).not.toBe(
      scenarioFingerprint("my bike was stolen"),
    );
  });

  it("is the same when only masked names differ", () => {
    const a = scenarioFingerprint(redactScenario("my neighbour Jane Doe took my bike"));
    const b = scenarioFingerprint(redactScenario("my neighbour Bob Roy took my bike"));
    expect(a).toBe(b);
  });

  it("is the same when only redacted details differ", () => {
    const a = scenarioFingerprint(redactScenario("call me at 416-555-0101 about the theft"));
    const b = scenarioFingerprint(redactScenario("call me at 647-555-0199 about the theft"));
    expect(a).toBe(b);
  });

  it("never produces an id that JSON-parses (Upstash would turn it into a number)", () => {
    for (let i = 0; i < 5000; i++) {
      const id = scenarioFingerprint(`scenario number ${i} ${i * 7919}`);
      expect(id).toMatch(FINGERPRINT_PATTERN);
      expect(() => JSON.parse(id)).toThrow();
    }
  });

  it("returns null for empty input", () => {
    expect(scenarioFingerprint("")).toBeNull();
    expect(scenarioFingerprint("  ")).toBeNull();
  });
});
