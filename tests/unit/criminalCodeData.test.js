import { describe, it, expect } from "vitest";
import {
  normalizeSection,
  lookupSection,
  CRIMINAL_CODE_SECTIONS,
} from "../../src/lib/criminalCodeData.js";

describe("normalizeSection", () => {
  it("extracts bare section number", () => {
    expect(normalizeSection("348")).toBe("348");
  });

  it("extracts section number from 's. 348' format", () => {
    expect(normalizeSection("s. 348")).toBe("348");
  });

  it("extracts section number from 'section 7' format", () => {
    expect(normalizeSection("section 7")).toBe("7");
  });

  it("extracts decimal section like 2.1", () => {
    expect(normalizeSection("s. 2.1")).toBe("2.1");
  });

  it("returns null for null input", () => {
    expect(normalizeSection(null)).toBeNull();
  });

  it("returns null for non-string input", () => {
    expect(normalizeSection(123)).toBeNull();
  });
});

describe("lookupSection", () => {
  it("returns entry for known section", () => {
    const entry = lookupSection("348");
    expect(entry).not.toBeNull();
    expect(entry).toHaveProperty("title");
    expect(entry).toHaveProperty("url");
    expect(entry.url).toContain("laws-lois.justice.gc.ca");
  });

  it("returns entry for 'Criminal Code s. 348' format", () => {
    const entry = lookupSection("Criminal Code s. 348");
    expect(entry).not.toBeNull();
  });

  it("returns null for unknown section number", () => {
    expect(lookupSection("9999")).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(lookupSection("")).toBeNull();
  });

  it("returns entry with url for section 2", () => {
    const entry = lookupSection("2");
    expect(entry).not.toBeNull();
    expect(entry.url).toContain("section-2.html");
  });
});

describe("CRIMINAL_CODE_SECTIONS", () => {
  it("is a Map with more than 100 entries", () => {
    expect(CRIMINAL_CODE_SECTIONS).toBeInstanceOf(Map);
    expect(CRIMINAL_CODE_SECTIONS.size).toBeGreaterThan(100);
  });

  it("each entry has title and url", () => {
    for (const [, entry] of CRIMINAL_CODE_SECTIONS) {
      expect(typeof entry.title).toBe("string");
      expect(typeof entry.url).toBe("string");
      expect(entry.url).toContain("https://");
    }
  });
});
