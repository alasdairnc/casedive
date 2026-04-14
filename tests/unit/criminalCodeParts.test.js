import { describe, it, expect } from "vitest";
import { CRIMINAL_CODE_PARTS } from "../../src/lib/criminalCodeParts.js";

describe("CRIMINAL_CODE_PARTS", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(CRIMINAL_CODE_PARTS)).toBe(true);
    expect(CRIMINAL_CODE_PARTS.length).toBeGreaterThan(0);
  });

  it("every entry has a non-empty string id and label", () => {
    for (const part of CRIMINAL_CODE_PARTS) {
      expect(typeof part.id).toBe("string");
      expect(part.id.length).toBeGreaterThan(0);
      expect(typeof part.label).toBe("string");
      expect(part.label.length).toBeGreaterThan(0);
    }
  });

  it("all ids are unique", () => {
    const ids = CRIMINAL_CODE_PARTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("includes known parts", () => {
    const ids = new Set(CRIMINAL_CODE_PARTS.map((p) => p.id));
    expect(ids.has("I")).toBe(true);
    expect(ids.has("XXVIII")).toBe(true);
  });

  it("every label starts with 'Part'", () => {
    for (const part of CRIMINAL_CODE_PARTS) {
      expect(part.label.startsWith("Part")).toBe(true);
    }
  });
});
