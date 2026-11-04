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

  it("documents the known gap: names are not removed", () => {
    // Pattern matching cannot find names. The privacy text must not claim it can.
    expect(redactScenario("My neighbour Jane Doe took my bike")).toContain(
      "Jane Doe",
    );
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

  it("is the same when only redacted details differ", () => {
    const a = scenarioFingerprint(redactScenario("call me at 416-555-0101 about the theft"));
    const b = scenarioFingerprint(redactScenario("call me at 647-555-0199 about the theft"));
    expect(a).toBe(b);
  });

  it("returns null for empty input", () => {
    expect(scenarioFingerprint("")).toBeNull();
    expect(scenarioFingerprint("  ")).toBeNull();
  });
});
