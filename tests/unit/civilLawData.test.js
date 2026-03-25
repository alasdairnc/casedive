import { describe, it, expect } from "vitest";
import { lookupCivilLawSection } from "../../src/lib/civilLawData.js";

describe("lookupCivilLawSection", () => {
  it("returns entry for a known CDSA section", () => {
    const result = lookupCivilLawSection("CDSA s. 4");
    expect(result).not.toBeNull();
    expect(result.entry).toHaveProperty("title");
    expect(result.entry.statute).toContain("Controlled Drugs");
    expect(result.entry).toHaveProperty("url");
  });

  it("returns entry for YCJA citation", () => {
    const result = lookupCivilLawSection("YCJA s. 3");
    expect(result).not.toBeNull();
    expect(result.entry.statute).toContain("Youth Criminal Justice");
  });

  it("returns null for completely unrecognized statute", () => {
    expect(lookupCivilLawSection("Some Random Act s. 5")).toBeNull();
  });

  it("returns null for null input", () => {
    expect(lookupCivilLawSection(null)).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(lookupCivilLawSection("")).toBeNull();
  });

  it("entry has jurisdiction field", () => {
    const result = lookupCivilLawSection("CDSA s. 5");
    expect(result).not.toBeNull();
    expect(typeof result.entry.jurisdiction).toBe("string");
  });
});
