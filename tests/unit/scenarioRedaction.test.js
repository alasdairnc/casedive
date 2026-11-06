import { describe, expect, it } from "vitest";
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
