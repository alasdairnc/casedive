import { describe, it, expect } from "vitest";
import {
  jurisdictions,
  courtLevels,
  dateRanges,
  lawTypeOptions,
  defaultLawTypes,
} from "../../src/lib/constants.js";

describe("jurisdictions", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(jurisdictions)).toBe(true);
    expect(jurisdictions.length).toBeGreaterThan(0);
  });

  it("each entry has value and label strings", () => {
    for (const item of jurisdictions) {
      expect(typeof item.value).toBe("string");
      expect(typeof item.label).toBe("string");
    }
  });

  it("first entry is the 'all' option", () => {
    expect(jurisdictions[0].value).toBe("all");
  });
});

describe("courtLevels", () => {
  it("includes scc and appeal options", () => {
    const values = courtLevels.map((c) => c.value);
    expect(values).toContain("scc");
    expect(values).toContain("appeal");
  });
});

describe("dateRanges", () => {
  it("includes 5, 10, 20 year options", () => {
    const values = dateRanges.map((d) => d.value);
    expect(values).toContain("5");
    expect(values).toContain("10");
    expect(values).toContain("20");
  });
});

describe("lawTypeOptions", () => {
  it("has exactly 4 law type options", () => {
    expect(lawTypeOptions).toHaveLength(4);
  });

  it("includes criminal_code and charter keys", () => {
    const keys = lawTypeOptions.map((o) => o.key);
    expect(keys).toContain("criminal_code");
    expect(keys).toContain("charter");
  });
});

describe("defaultLawTypes", () => {
  it("has all four law types set to true", () => {
    expect(defaultLawTypes.criminal_code).toBe(true);
    expect(defaultLawTypes.case_law).toBe(true);
    expect(defaultLawTypes.civil_law).toBe(true);
    expect(defaultLawTypes.charter).toBe(true);
  });
});
