import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { CDSA_SECTIONS, CDSA_PARTS } from "../../src/lib/cdsaData.js";
import { YCJA_SECTIONS, YCJA_PARTS } from "../../src/lib/ycjaData.js";
import {
  STATUTE_TOPIC_CONFIGS,
  statuteTopicFor,
} from "../../src/lib/statuteTopics.js";
import { partIdOf } from "../../src/lib/criminalCodeTopics.js";

const ACTS = {
  cdsa: { sections: CDSA_SECTIONS, parts: CDSA_PARTS, url: "c-38.8" },
  ycja: { sections: YCJA_SECTIONS, parts: YCJA_PARTS, url: "y-1.5" },
};

describe.each(Object.entries(ACTS))("%s data and topics", (id, act) => {
  const cfg = STATUTE_TOPIC_CONFIGS[id];
  const all = [...act.sections.entries()];
  const entries = all.filter(([, e]) => e.kind !== "schedule");
  const topicIds = new Set(cfg.topics.map((t) => t.id));

  it("has sections with a title, a Justice Laws url and well-formed extracted penalty data", () => {
    expect(entries.length).toBeGreaterThan(50);
    for (const [num, e] of entries) {
      expect(e.title, num).toBeTruthy();
      expect(e.url, num).toBe(`https://laws-lois.justice.gc.ca/eng/acts/${act.url}/section-${num}.html`);
      // Extracted from the Act's text only: both set together, or both empty.
      expect(["", "Indictable", "Hybrid", "Summary"], num).toContain(e.severity);
      expect(!!e.severity, num).toBe(!!e.maxPenalty);
      for (const r of e.relatedSections ?? []) {
        expect(act.sections.has(r), `s. ${num} -> s. ${r}`).toBe(true);
        expect(r, num).not.toBe(num);
      }
    }
  });

  it("carries penalty data only on offence sections (spot checks)", () => {
    const pen = (n) => act.sections.get(n).maxPenalty;
    if (id === "cdsa") {
      expect(pen("5")).toMatch(/life imprisonment/i);
      expect(pen("4")).toMatch(/7 years/);
      expect(pen("2")).toBe("");
    } else {
      expect(pen("137")).toBe("Summary conviction");
      expect(pen("3")).toBe("");
    }
  });

  it("has unique topic ids in known groups", () => {
    expect(topicIds.size).toBe(cfg.topics.length);
    const groups = new Set(cfg.groups.map((g) => g.id));
    for (const t of cfg.topics) expect(groups.has(t.group), t.id).toBe(true);
  });

  it("puts every section in a topic (no silent 'Other') and leaves none empty", () => {
    const used = new Set();
    for (const [num, e] of all) {
      const topic = statuteTopicFor(id, e);
      expect(topicIds.has(topic), `s. ${num} (${e.partOf})`).toBe(true);
      used.add(topic);
    }
    expect(cfg.topics.filter((t) => !used.has(t.id)).map((t) => t.id)).toEqual([]);
  });

  it("only references real Parts and headings (no stale rules)", () => {
    const partIds = new Set(act.parts.map((p) => partIdOf(p.label)));
    for (const key of Object.keys(cfg.partDefaults)) expect(partIds.has(key), key).toBe(true);
    const headings = new Set(entries.map(([, e]) => `${partIdOf(e.partOf)}|${e.heading || ""}`));
    for (const key of Object.keys(cfg.headingRules)) expect(headings.has(key), key).toBe(true);
    for (const p of act.parts) expect(cfg.partDefaults[partIdOf(p.label)], p.label).toBeTruthy();
  });
});

describe("Act-specific spot checks", () => {
  it("keeps CDSA s. 5 separate from Criminal Code s. 5", () => {
    expect(CDSA_SECTIONS.get("5").title).toMatch(/trafficking/i);
  });
  it("routes YCJA adult sentences and detention to their own topics", () => {
    expect(statuteTopicFor("ycja", YCJA_SECTIONS.get("64"))).toBe("adult-sentence");
    expect(statuteTopicFor("ycja", YCJA_SECTIONS.get("29"))).toBe("detention");
  });
});

describe("statute summaries", () => {
  const summaries = JSON.parse(readFileSync("scripts/statute-summaries.json", "utf8"));

  it.each(Object.entries(ACTS))("%s: side file and generated data agree", (id, act) => {
    const expected = summaries[id];
    for (const [num, text] of Object.entries(expected)) {
      expect(act.sections.get(num)?.summary, `${id} s. ${num}`).toBe(text);
    }
    // No summary sneaks in that the side file does not own.
    for (const [num, e] of act.sections) {
      if (e.summary) expect(expected[num], `${id} s. ${num}`).toBeTruthy();
    }
  });

  it("summaries do not describe the drafting process to readers", () => {
    const text = Object.values(summaries).flatMap((m) => Object.values(m)).join("\n");
    expect(text).not.toMatch(/not shown|text reviewed|as the section provides|rest of the section/i);
  });

  it.each(Object.entries(ACTS))("%s: every section has a summary except the short title", (id, act) => {
    const sections = [...act.sections].filter(([, e]) => e.kind !== "schedule"); // schedules are item lists, not prose
    const without = sections.filter(([, e]) => !e.summary).map(([n]) => n);
    expect(without).toEqual(["1"]);
    for (const [num, e] of sections) {
      if (num !== "1") {
        expect(e.summary.length, `${id} s. ${num}`).toBeGreaterThan(40);
        expect(e.summarySource, `${id} s. ${num}`).toBe("verified");
      }
    }
  });
});

describe.each(Object.entries(ACTS))("%s schedules", (id, act) => {
  const schedules = [...act.sections].filter(([, e]) => e.kind === "schedule");
  const cfg = STATUTE_TOPIC_CONFIGS[id];

  it("has schedules, keyed 'Schedule ...', after the numbered sections' keys", () => {
    expect(schedules.length).toBeGreaterThan(0);
    for (const [key] of schedules) expect(key).toMatch(/^Schedule( [IVX]+)?$/);
  });

  it("links to the Act's own heading anchor and uses only in-data section references", () => {
    for (const [key, e] of schedules) {
      expect(e.url, key).toMatch(new RegExp(`^https://laws-lois\\.justice\\.gc\\.ca/eng/acts/${act.url}/FullText\\.html#h-\\d+$`));
      for (const r of e.relatedSections ?? []) expect(act.sections.has(r), `${key} -> s. ${r}`).toBe(true);
    }
  });

  it("carries real item lists, never repealed or amendment text, and is in the schedules topic", () => {
    for (const [key, e] of schedules) {
      expect(e.scheduleItems.some((i) => !i.h), key).toBe(true);
      for (const i of e.scheduleItems) {
        expect(i.t, key).not.toMatch(/^\[Repealed/);
        expect(i.t, key).not.toMatch(/not in force/i);
      }
      expect(statuteTopicFor(id, e), key).toBe("schedules");
      expect(e.summary, key).toBeUndefined(); // the list is the content; no unverified prose
    }
    expect(cfg.topics.some((t) => t.id === "schedules")).toBe(true);
  });
});

describe("CDSA schedule content", () => {
  it("lists repealed-free Schedules I-VI and IX (VII and VIII are repealed)", () => {
    const keys = [...CDSA_SECTIONS.keys()].filter((k) => k.startsWith("Schedule"));
    expect(keys).toEqual(["Schedule I", "Schedule II", "Schedule III", "Schedule IV", "Schedule V", "Schedule VI", "Schedule IX"]);
  });

  it("keeps full item text and the time-limited periods in Schedule V", () => {
    const s1 = CDSA_SECTIONS.get("Schedule I").scheduleItems.map((i) => i.t).join("\n");
    expect(s1).toMatch(/Fentanyl/i);
    expect(s1).toMatch(/and the salts, derivatives and salts of derivatives/);
    const v = CDSA_SECTIONS.get("Schedule V");
    expect(v.scheduleColumns).toEqual(["Item", "Substance", "Period"]);
    expect(v.scheduleItems.filter((i) => i.n).every((i) => /\d{4}/.test(i.n))).toBe(true);
  });

  it("points Schedule I at the offence sections that use it", () => {
    expect(CDSA_SECTIONS.get("Schedule I").relatedSections).toEqual(expect.arrayContaining(["4", "5", "6", "7"]));
  });
});
