import { describe, it, expect } from "vitest";
import { CRIMINAL_CODE_SECTIONS } from "../../src/lib/criminalCodeData.js";
import {
  TOPICS,
  TOPIC_GROUPS,
  SECTION_OVERRIDES,
  HEADING_RULES,
  SUBHEADING_RULES,
  PART_DEFAULTS,
  buildTopicBrowse,
  groupLabelFor,
  partIdOf,
  topicForSection,
} from "../../src/lib/criminalCodeTopics.js";

const entries = [...CRIMINAL_CODE_SECTIONS.entries()];
const topicIds = new Set(TOPICS.map((t) => t.id));

describe("criminal code topics", () => {
  it("has unique topic ids, each in a known group", () => {
    expect(topicIds.size).toBe(TOPICS.length);
    const groups = new Set(TOPIC_GROUPS.map((g) => g.id));
    for (const t of TOPICS) expect(groups.has(t.group), t.id).toBe(true);
  });

  it("puts every section in exactly one topic (no silent 'Other')", () => {
    const unmapped = entries.filter(([n, e]) => !topicIds.has(topicForSection(n, e))).map(([n]) => n);
    expect(unmapped).toEqual([]);
  });

  it("leaves no topic empty", () => {
    const used = new Set(entries.map(([n, e]) => topicForSection(n, e)));
    expect(TOPICS.filter((t) => !used.has(t.id)).map((t) => t.id)).toEqual([]);
  });

  it("only references real topics, headings and Parts (no stale rules)", () => {
    const parts = new Set(entries.map(([, e]) => partIdOf(e.partOf)));
    const headings = new Set(entries.map(([, e]) => `${partIdOf(e.partOf)}|${e.heading || ""}`));
    const subs = new Set(
      entries.map(([, e]) => `${partIdOf(e.partOf)}|${e.heading || ""}|${e.subheading || ""}`),
    );
    const targets = [
      ...Object.values(HEADING_RULES),
      ...Object.values(SUBHEADING_RULES),
      ...Object.values(PART_DEFAULTS),
      ...Object.values(SECTION_OVERRIDES).map((o) => o.topic),
    ];
    for (const id of targets) expect(topicIds.has(id), id).toBe(true);
    for (const k of Object.keys(HEADING_RULES)) expect(headings.has(k), k).toBe(true);
    for (const k of Object.keys(SUBHEADING_RULES)) expect(subs.has(k), k).toBe(true);
    for (const k of Object.keys(PART_DEFAULTS)) expect(parts.has(k), k).toBe(true);
    for (const n of Object.keys(SECTION_OVERRIDES)) expect(CRIMINAL_CODE_SECTIONS.has(n), n).toBe(true);
  });

  it("files known sections under the topic a lawyer would look in", () => {
    const topic = (n) => topicForSection(n, CRIMINAL_CODE_SECTIONS.get(n));
    expect(topic("1")).toBe("general");
    expect(topic("34")).toBe("defences");
    expect(topic("229")).toBe("homicide");
    expect(topic("265")).toBe("assault");
    expect(topic("271")).toBe("sexual"); // sits under "Assaults" in the statute
    expect(topic("276")).toBe("sexual");
    expect(topic("320.14")).toBe("driving");
    expect(topic("348")).toBe("theft");
    expect(topic("380")).toBe("fraud");
    expect(topic("515")).toBe("arrest-bail");
    expect(topic("718")).toBe("sentencing");
    expect(topic("490.012")).toBe("sentencing"); // sex offender registry lives in Part XV
  });

  it("labels the Code heading a section sits under", () => {
    const label = (n) => groupLabelFor(n, CRIMINAL_CODE_SECTIONS.get(n));
    expect(label("229")).toBe("Murder, Manslaughter and Infanticide");
    expect(label("271")).toBe("Sexual assault");
    expect(label("276")).toBe("Admissibility of Sexual Activity Evidence");
    // A Part with no sub-headings falls back to its own title
    expect(label("463")).toBe("Attempts — Conspiracies — Accessories");
  });

  it("buildTopicBrowse covers every section exactly once", () => {
    const sections = entries.map(([num, e]) => ({
      num,
      ...e,
      topic: topicForSection(num, e),
      groupLabel: groupLabelFor(num, e),
    }));
    const browse = buildTopicBrowse(sections);
    expect(browse.map((b) => b.topic.id)).toEqual(TOPICS.map((t) => t.id));
    const nums = browse.flatMap((b) => b.groups.flatMap((g) => g.sections.map((s) => s.num)));
    expect(nums.length).toBe(sections.length);
    expect(new Set(nums).size).toBe(sections.length);
    for (const b of browse) expect(b.groups.reduce((n, g) => n + g.sections.length, 0)).toBe(b.count);
  });
});
