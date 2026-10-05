import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  CDSA_RULES,
  YCJA_RULES,
  buildStatuteGrounding,
  checkStatuteCitations,
  detectDrugContext,
  detectYouth,
  isStatuteGroundingEnabled,
} from "../../api/_statuteGrounding.js";
import { buildSystemPrompt } from "../../src/lib/prompts.js";
import { CDSA_SECTIONS } from "../../src/lib/cdsaData.js";
import { YCJA_SECTIONS } from "../../src/lib/ycjaData.js";
import { CRIMINAL_CODE_SECTIONS } from "../../src/lib/criminalCodeData.js";
import { STATUTE_SCENARIOS } from "./statuteGroundingScenarios.js";

const originalFlag = process.env.STATUTE_GROUNDING;
beforeEach(() => {
  process.env.STATUTE_GROUNDING = "on";
});
afterEach(() => {
  if (originalFlag === undefined) delete process.env.STATUTE_GROUNDING;
  else process.env.STATUTE_GROUNDING = originalFlag;
});

describe("flag", () => {
  it("is off unless STATUTE_GROUNDING is exactly 'on'", () => {
    delete process.env.STATUTE_GROUNDING;
    expect(isStatuteGroundingEnabled()).toBe(false);
    process.env.STATUTE_GROUNDING = "true";
    expect(isStatuteGroundingEnabled()).toBe(false);
    process.env.STATUTE_GROUNDING = "on";
    expect(isStatuteGroundingEnabled()).toBe(true);
  });

  it("returns nothing when off, even for a youth drug scenario", () => {
    delete process.env.STATUTE_GROUNDING;
    expect(
      buildStatuteGrounding("A 15-year-old was caught with cocaine."),
    ).toBeNull();
  });

  it("returns nothing when civil_law is filtered out", () => {
    expect(
      buildStatuteGrounding("A 15-year-old was caught with cocaine.", {
        lawTypes: { civil_law: false },
      }),
    ).toBeNull();
  });
});

describe("detectYouth", () => {
  it.each([
    ["A 15-year-old stole a bike", true],
    ["He was 16 when it happened", true],
    ["aged 14", true],
    ["a 13 year old girl", true],
    ["I'm 17 and was arrested", true],
    ["a young offender", true],
    ["a teenager", true],
    ["under 18", true],
    ["A 25-year-old stole a bike", false],
    ["My 15-year-old car was stolen", false],
    ["a 12-year-old furnace", false],
    ["The speed limit was 50 and I was doing 15 over", false],
    ["He was 15 minutes late", false],
    ["It was 15 degrees out", false],
    ["I punched someone and they had minor injuries", false],
    ["a minor traffic stop", false],
  ])("%s -> %s", (text, expected) => {
    expect(detectYouth(text).detected).toBe(expected);
  });

  it("marks a scenario with both a youth and an adult age as ambiguous", () => {
    expect(detectYouth("He is 19 now but was 16 at the time").ambiguous).toBe(
      true,
    );
    expect(detectYouth("A 15-year-old stole a bike").ambiguous).toBe(false);
  });

  it("treats an under-12 age as outside the YCJA", () => {
    const y = detectYouth("An 8-year-old pushed another child");
    expect(y.detected).toBe(false);
    expect(y.underTwelve).toBe(true);
  });

  it("does not flag under-12 when an adult age is also named", () => {
    expect(
      detectYouth("A 30-year-old hit an 8-year-old child").underTwelve,
    ).toBe(false);
  });
});

describe("detectDrugContext", () => {
  it("separates cannabis from CDSA drugs", () => {
    expect(detectDrugContext("selling weed").cannabisOnly).toBe(true);
    expect(detectDrugContext("selling weed and cocaine").cannabisOnly).toBe(
      false,
    );
    expect(detectDrugContext("a fentanyl trafficking charge").detected).toBe(
      true,
    );
  });

  it("does not read speed or ordinary words as drugs", () => {
    for (const t of [
      "the speed limit was 50",
      "I was in a lab at school",
      "he came on a scale of one to ten",
      "I produced my licence",
    ]) {
      expect(detectDrugContext(t).detected, t).toBe(false);
    }
  });
});

describe("rule integrity", () => {
  // Every section a rule offers must be a real, independently verified,
  // in-force provision, not a schedule. This is what keeps the grounding from
  // handing the model a bad citation.
  const cases = [
    ["CDSA", CDSA_SECTIONS, CDSA_RULES],
    ["YCJA", YCJA_SECTIONS, YCJA_RULES],
  ];
  for (const [act, map, rules] of cases) {
    for (const rule of rules) {
      for (const num of rule.sections) {
        it(`${rule.id} -> ${act} s. ${num} exists and is verified`, () => {
          const entry = map.get(num);
          expect(entry, `${act} s. ${num} missing`).toBeDefined();
          expect(entry.kind).not.toBe("schedule");
          expect(entry.summarySource).toBe("verified");
          expect(entry.title).not.toMatch(/repealed/i);
          expect(entry.summary.length).toBeGreaterThan(40);
          expect(entry.url).toMatch(/^https:\/\/laws-lois\.justice\.gc\.ca\//);
        });
      }
    }
  }

  it("the under-12 hint cites a Criminal Code section that exists (s. 13)", () => {
    expect(CRIMINAL_CODE_SECTIONS.get("13")).toBeDefined();
  });

  it("CDSA Schedule II lists only synthetic cannabinoids, so cannabis stays out of the CDSA", () => {
    const items = CDSA_SECTIONS.get("Schedule II").scheduleItems;
    const top = items.filter((i) => i.d === 0);
    expect(top).toHaveLength(1);
    expect(top[0].t).toMatch(/^Synthetic cannabinoid receptor type 1 agonists/);
    for (const it of items) {
      expect(it.t).not.toMatch(/\b(cannabis|marihuana|marijuana)\b/i);
    }
  });
});

describe("eval scenarios (offline)", () => {
  for (const sc of STATUTE_SCENARIOS) {
    it(sc.id, () => {
      const g = buildStatuteGrounding(sc.scenario);
      if (sc.expectNull) {
        expect(g).toBeNull();
        return;
      }
      expect(g, "expected grounding").not.toBeNull();
      const cites = g.candidates.map((c) => c.citation);
      for (const c of sc.include || []) expect(cites).toContain(c);
      for (const c of sc.exclude || []) expect(cites).not.toContain(c);
      if (sc.youth !== undefined) expect(g.meta.youth).toBe(sc.youth);
      if (sc.youthAmbiguous !== undefined) {
        expect(g.meta.youthAmbiguous).toBe(sc.youthAmbiguous);
      }
      if (sc.cdsa !== undefined) expect(g.meta.cdsa).toBe(sc.cdsa);
      if (sc.cannabisOnly !== undefined) {
        expect(g.meta.cannabisOnly).toBe(sc.cannabisOnly);
      }
      if (sc.hint) expect(g.hints.join(" ")).toContain(sc.hint);
    });
  }

  it("caps candidates and gives each a real title, summary and url", () => {
    const g = buildStatuteGrounding(
      "A 16-year-old was arrested and held in custody before trial, then pleaded guilty to selling fentanyl. His name was posted on social media.",
    );
    expect(g.candidates.length).toBeLessThanOrEqual(8);
    for (const c of g.candidates) {
      expect(c.title).toBeTruthy();
      expect(c.summary.length).toBeGreaterThan(20);
      expect(c.summary.length).toBeLessThanOrEqual(301);
      expect(c.url).toMatch(/^https:/);
    }
  });
});

describe("buildSystemPrompt hints", () => {
  it("is byte-identical with no hints", () => {
    const base = buildSystemPrompt({});
    expect(buildSystemPrompt({}, {})).toBe(base);
    expect(buildSystemPrompt({}, { statuteHints: [] })).toBe(base);
    expect(buildSystemPrompt({}, { statuteHints: undefined })).toBe(base);
    expect(base).not.toContain("statute_db");
  });

  it("adds the hints right after the civil_law rule and nothing else", () => {
    const base = buildSystemPrompt({});
    const withHints = buildSystemPrompt(
      {},
      { statuteHints: ["HINT ONE", "HINT TWO"] },
    );
    expect(withHints).toContain(
      "- For civil_law: cite specific statutes with section numbers.\n  - HINT ONE\n  - HINT TWO\n- For charter:",
    );
    expect(withHints.replace("\n  - HINT ONE\n  - HINT TWO", "")).toBe(base);
  });
});

describe("checkStatuteCitations", () => {
  const run = (citations) => {
    const result = {
      civil_law: citations.map((citation) => ({ citation, summary: "x" })),
    };
    const check = checkStatuteCitations(result);
    return { kept: result.civil_law.map((i) => i.citation), check };
  };

  it("keeps real sections in the usual formats", () => {
    const real = [
      "CDSA s. 5",
      "CDSA s. 5(1)",
      "CDSA, s. 4",
      "Controlled Drugs and Substances Act, s. 5",
      "CDSA s. 10.2",
      "YCJA s. 38",
      "Youth Criminal Justice Act, s. 42",
      "YCJA ss. 4",
      "CDSA Schedule I",
      "YCJA Schedule",
    ];
    const { kept, check } = run(real);
    expect(kept).toEqual(real);
    expect(check.dropped).toEqual([]);
    expect(check.verified).toBe(real.length);
  });

  it("drops a section that does not exist in the Act", () => {
    const { kept, check } = run([
      "CDSA s. 999",
      "YCJA s. 999",
      "CDSA s. 5",
      "CDSA Schedule XII",
    ]);
    expect(kept).toEqual(["CDSA s. 5"]);
    expect(check.dropped).toEqual([
      "CDSA s. 999",
      "YCJA s. 999",
      "CDSA Schedule XII",
    ]);
  });

  it("leaves other statutes and unparseable CDSA mentions alone", () => {
    const other = [
      "Criminal Code s. 5",
      "Highway Traffic Act s. 128",
      "CDSA",
      "Cannabis Act s. 8",
    ];
    const { kept, check } = run(other);
    expect(kept).toEqual(other);
    expect(check.checked).toBe(0);
  });

  it("tolerates a missing or malformed civil_law", () => {
    expect(checkStatuteCitations({}).checked).toBe(0);
    expect(checkStatuteCitations({ civil_law: "nope" }).checked).toBe(0);
    expect(checkStatuteCitations(null).checked).toBe(0);
    const r = { civil_law: [null, { citation: 5 }, {}] };
    checkStatuteCitations(r);
    expect(r.civil_law).toHaveLength(3);
  });
});
