import { describe, it, expect } from "vitest";
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
  const entries = [...act.sections.entries()];
  const topicIds = new Set(cfg.topics.map((t) => t.id));

  it("has sections with a title, a Justice Laws url and no invented penalty data", () => {
    expect(entries.length).toBeGreaterThan(50);
    for (const [num, e] of entries) {
      expect(e.title, num).toBeTruthy();
      expect(e.url, num).toBe(`https://laws-lois.justice.gc.ca/eng/acts/${act.url}/section-${num}.html`);
      expect(e.severity, num).toBe("");
      expect(e.maxPenalty, num).toBe("");
    }
  });

  it("has unique topic ids in known groups", () => {
    expect(topicIds.size).toBe(cfg.topics.length);
    const groups = new Set(cfg.groups.map((g) => g.id));
    for (const t of cfg.topics) expect(groups.has(t.group), t.id).toBe(true);
  });

  it("puts every section in a topic (no silent 'Other') and leaves none empty", () => {
    const used = new Set();
    for (const [num, e] of entries) {
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
