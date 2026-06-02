import { describe, expect, it } from "vitest";
import {
  CASE_LAW_REPORT_REASONS,
  CASE_LAW_REPORT_REASON_VALUES,
  CASE_LAW_REPORT_REASON_SET,
  MAX_CASE_LAW_REPORT_NOTE_LENGTH,
  MAX_CASE_LAW_REPORT_SCENARIO_SNIPPET_LENGTH,
  MAX_CASE_LAW_REPORT_SUMMARY_LENGTH,
} from "../../src/lib/caseLawReportReasons.js";

describe("caseLawReportReasons", () => {
  it("exports expected reason entries with value and label", () => {
    expect(Array.isArray(CASE_LAW_REPORT_REASONS)).toBe(true);
    expect(CASE_LAW_REPORT_REASONS.length).toBeGreaterThan(0);
    for (const reason of CASE_LAW_REPORT_REASONS) {
      expect(typeof reason.value).toBe("string");
      expect(reason.value.length).toBeGreaterThan(0);
      expect(typeof reason.label).toBe("string");
      expect(reason.label.length).toBeGreaterThan(0);
    }
  });

  it("includes 'other' as a reason value", () => {
    expect(CASE_LAW_REPORT_REASON_VALUES).toContain("other");
  });

  it("CASE_LAW_REPORT_REASON_VALUES matches REASONS array values", () => {
    const expected = CASE_LAW_REPORT_REASONS.map((r) => r.value);
    expect(CASE_LAW_REPORT_REASON_VALUES).toEqual(expected);
  });

  it("CASE_LAW_REPORT_REASON_SET contains all values", () => {
    for (const v of CASE_LAW_REPORT_REASON_VALUES) {
      expect(CASE_LAW_REPORT_REASON_SET.has(v)).toBe(true);
    }
    expect(CASE_LAW_REPORT_REASON_SET.size).toBe(
      CASE_LAW_REPORT_REASON_VALUES.length,
    );
  });

  it("has no duplicate reason values", () => {
    const seen = new Set();
    for (const r of CASE_LAW_REPORT_REASONS) {
      expect(seen.has(r.value)).toBe(false);
      seen.add(r.value);
    }
  });

  it("exports expected max length constants", () => {
    expect(MAX_CASE_LAW_REPORT_NOTE_LENGTH).toBeGreaterThan(0);
    expect(MAX_CASE_LAW_REPORT_SCENARIO_SNIPPET_LENGTH).toBeGreaterThan(0);
    expect(MAX_CASE_LAW_REPORT_SUMMARY_LENGTH).toBeGreaterThan(0);
    expect(typeof MAX_CASE_LAW_REPORT_NOTE_LENGTH).toBe("number");
    expect(typeof MAX_CASE_LAW_REPORT_SCENARIO_SNIPPET_LENGTH).toBe("number");
    expect(typeof MAX_CASE_LAW_REPORT_SUMMARY_LENGTH).toBe("number");
  });
});
