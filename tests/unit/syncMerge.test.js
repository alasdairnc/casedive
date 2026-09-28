import { describe, expect, it } from "vitest";
import {
  mergeBookmarks,
  mergeHistory,
  stableStringify,
} from "../../src/lib/syncMerge.js";

const bookmark = (citation, bookmarkedAt, summary = citation) => ({
  id: citation,
  citation,
  summary,
  type: "case_law",
  bookmarkedAt,
  verification: null,
});

const search = (query, timestamp) => ({
  id: String(timestamp),
  query,
  filters: {},
  resultCounts: {},
  timestamp,
});

describe("mergeBookmarks", () => {
  it("keeps one entry per citation, newest first", () => {
    const merged = mergeBookmarks(
      [bookmark("A", 300), bookmark("B", 100)],
      [bookmark("B", 100), bookmark("C", 200)],
    );

    expect(merged.map((b) => b.id)).toEqual(["A", "C", "B"]);
  });

  it("keeps the newer copy when both sides have a citation", () => {
    const merged = mergeBookmarks(
      [bookmark("A", 100, "device copy")],
      [bookmark("A", 200, "account copy")],
    );

    expect(merged).toEqual([bookmark("A", 200, "account copy")]);
  });

  it("drops citations removed while the account copy loaded", () => {
    const merged = mergeBookmarks([], [bookmark("A", 100), bookmark("B", 50)], {
      removed: new Set(["A"]),
    });

    expect(merged.map((b) => b.id)).toEqual(["B"]);
  });

  it("gives account rows an id from their citation", () => {
    const { id, ...row } = bookmark("A", 100);

    expect(mergeBookmarks([], [row])[0].id).toBe("A");
  });

  it("trims the oldest past the limit", () => {
    const merged = mergeBookmarks(
      [bookmark("A", 300)],
      [bookmark("B", 200), bookmark("C", 100)],
      { limit: 2 },
    );

    expect(merged.map((b) => b.id)).toEqual(["A", "B"]);
  });
});

describe("mergeHistory", () => {
  it("collapses only exact copies and keeps repeated searches", () => {
    const merged = mergeHistory(
      [search("assault", 300), search("theft", 100)],
      [search("theft", 100), search("assault", 50)],
    );

    expect(merged.map((h) => [h.query, h.timestamp])).toEqual([
      ["assault", 300],
      ["theft", 100],
      ["assault", 50],
    ]);
  });

  it("prefers this device's copy of a duplicate, so its id stays stable", () => {
    const local = { ...search("theft", 100), id: "local-id" };

    expect(mergeHistory([local], [search("theft", 100)])[0].id).toBe(
      "local-id",
    );
  });
});

describe("stableStringify", () => {
  it("ignores object key order", () => {
    expect(stableStringify({ b: 1, a: { d: [1, { f: 2, e: 3 }], c: null } }))
      .toBe(stableStringify({ a: { c: null, d: [1, { e: 3, f: 2 }] }, b: 1 }));
  });

  it("still tells different values apart", () => {
    expect(stableStringify([{ a: 1 }])).not.toBe(stableStringify([{ a: 2 }]));
  });
});
