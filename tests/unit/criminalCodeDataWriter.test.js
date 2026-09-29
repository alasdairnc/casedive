// Shared writer behind the five scripts/merge*.mjs scripts. Covers the
// serializer round-trip and the safety check that stands between a merge
// script and src/lib/criminalCodeData.js. Nothing here writes to disk.
import { readFileSync } from "fs";
import { describe, expect, it } from "vitest";

import {
  patchRows,
  renderDataFile,
  verifyRendered,
} from "../../scripts/_criminalCodeDataWriter.mjs";
import {
  CRIMINAL_CODE_SECTIONS,
  CRIMINAL_CODE_PARTS,
} from "../../src/lib/criminalCodeData.js";

const PARTS = [{ id: "I", label: "Part I — General" }];
const URL_BASE = "https://laws-lois.justice.gc.ca/eng/acts/c-46";

function section(num, fields) {
  return { title: `Section ${num}`, severity: "", maxPenalty: "", url: `${URL_BASE}/section-${num}.html`, ...fields };
}

function fixture() {
  return new Map([
    ["1", section("1", { summary: "Short title." })],
    ["2", section("2", { summary: "Definitions.", partOf: "Part I — General" })],
    [
      "34",
      section("34", {
        title: 'Defence — "force" \\ test\nline',
        maxPenalty: "N/A",
        definition: "Curated definition.",
        relatedSections: ["35"],
        defences: [],
        topicsTagged: ["self-defence"],
        partOf: "Part I — General",
        heading: "Defence of Person",
        subheading: 'Sub "heading" \\ test',
      }),
    ],
    ["320.14", section("320.14", { severity: "Hybrid", summary: "Impaired operation.", partOf: "Part I — General" })],
    ["320.2", section("320.2", { summary: "Later section.", partOf: "Part I — General" })],
  ]);
}

function render(before, rows, orphanRows = []) {
  const curatedCount = [...before.values()].filter((v) => v.definition).length;
  return renderDataFile({ rows, orphanRows, parts: PARTS, curatedCount });
}

describe("patchRows", () => {
  it("sorts sections numerically, not lexically", () => {
    const rows = patchRows(fixture(), [], () => ({}));
    expect(rows.map(([num]) => num)).toEqual(["1", "2", "34", "320.14", "320.2"]);
  });

  it("throws when a patch sets a field outside allowedFields", () => {
    expect(() => patchRows(fixture(), ["maxPenalty"], () => ({ summary: "x" }))).toThrow(
      /may not change/,
    );
  });

  it("drops undefined patch values instead of blanking the field", () => {
    const rows = patchRows(fixture(), ["severity"], () => ({ severity: undefined }));
    expect(new Map(rows).get("320.14").severity).toBe("Hybrid");
  });
});

describe("renderDataFile + verifyRendered", () => {
  it("round-trips every field, including escaped characters", async () => {
    const before = fixture();
    const output = render(before, patchRows(before, [], () => ({})));
    const { problems } = await verifyRendered(output, { before, allowedFields: [] });
    expect(problems).toEqual([]);
  });

  it("reads the source date from criminal-code-meta.json", () => {
    const { sourceCurrentDate } = JSON.parse(
      readFileSync(new URL("../../scripts/criminal-code-meta.json", import.meta.url), "utf-8"),
    );
    const before = fixture();
    const output = render(before, patchRows(before, [], () => ({})));
    expect(output).toContain(`Source current as of: ${sourceCurrentDate} `);
  });

  it("allows a declared field change", async () => {
    const before = fixture();
    const rows = patchRows(before, ["maxPenalty"], (num) => (num === "2" ? { maxPenalty: "5 years" } : {}));
    const { problems } = await verifyRendered(render(before, rows), { before, allowedFields: ["maxPenalty"] });
    expect(problems).toEqual([]);
  });

  it("flags a change to a field the script didn't declare", async () => {
    const before = fixture();
    const rows = patchRows(before, [], () => ({}));
    rows[1][1] = { ...rows[1][1], title: "Tampered" };
    const { problems } = await verifyRendered(render(before, rows), { before, allowedFields: ["maxPenalty"] });
    expect(problems.join("\n")).toMatch(/s\.2: "title" changed/);
  });

  it("flags a lost summary by count and by field", async () => {
    const before = fixture();
    const rows = patchRows(before, [], () => ({}));
    rows[0][1] = { ...rows[0][1], summary: undefined };
    const { problems } = await verifyRendered(render(before, rows), { before, allowedFields: [] });
    expect(problems).toContain("summary count 4 -> 3, expected 4");
    expect(problems.join("\n")).toMatch(/s\.1: "summary" changed/);
  });

  it("flags a missing summary the script said it would add", async () => {
    const before = fixture();
    const rows = patchRows(before, ["summary"], () => ({}));
    const { problems } = await verifyRendered(render(before, rows), {
      before,
      allowedFields: ["summary"],
      expect: { summary: 1 },
    });
    expect(problems).toContain("summary count 4 -> 4, expected 5");
  });

  it("flags a dropped section", async () => {
    const before = fixture();
    const rows = patchRows(before, [], () => ({})).filter(([num]) => num !== "320.2");
    const { problems } = await verifyRendered(render(before, rows), { before, allowedFields: [] });
    expect(problems).toContain("sections count 5 -> 4, expected 5");
    expect(problems).toContain("s.320.2: section missing from output");
  });

  it("lockCurated blocks an otherwise-allowed change on a curated entry", async () => {
    const before = fixture();
    const rows = patchRows(before, ["maxPenalty"], (num) => (num === "34" ? { maxPenalty: "Life" } : {}));
    const output = render(before, rows);
    expect((await verifyRendered(output, { before, allowedFields: ["maxPenalty"] })).problems).toEqual([]);
    const locked = await verifyRendered(output, { before, allowedFields: ["maxPenalty"], lockCurated: true });
    expect(locked.problems.join("\n")).toMatch(/s\.34: "maxPenalty" changed on a curated entry/);
  });

  it("keeps orphans under their own header and counts them", async () => {
    const before = fixture();
    const rows = patchRows(before, [], () => ({})).filter(([num]) => num !== "34");
    const output = render(before, rows, [["34", before.get("34")]]);
    expect(output).toContain("| Sections: 5\n");
    expect(output).toMatch(/ORPHANED \(not in current XML — needs review\) ──\n {2}\[\n {4}"34"/);
    expect((await verifyRendered(output, { before, allowedFields: [] })).problems).toEqual([]);
  });

  it("regenerates the real data file without changing any entry", async () => {
    const before = CRIMINAL_CODE_SECTIONS;
    const curatedCount = [...before.values()].filter((v) => v.definition).length;
    const output = renderDataFile({
      rows: patchRows(before, [], () => ({})),
      parts: CRIMINAL_CODE_PARTS,
      curatedCount,
    });
    const { problems } = await verifyRendered(output, { before, allowedFields: [] });
    expect(problems).toEqual([]);
  });
});
