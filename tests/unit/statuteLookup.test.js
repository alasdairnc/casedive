import { describe, it, expect } from "vitest";
import { lookupStatuteSection } from "../../src/lib/statuteLookup.js";
import { lookupCivilLawSection } from "../../src/lib/civilLawData.js";
import { CDSA_SECTIONS } from "../../src/lib/cdsaData.js";
import { YCJA_SECTIONS } from "../../src/lib/ycjaData.js";

describe("lookupStatuteSection", () => {
  it("covers CDSA sections the curated set lacks", () => {
    expect(lookupCivilLawSection("CDSA s. 7.1")).toBeNull();
    const found = lookupStatuteSection("CDSA s. 7.1");
    expect(found.entry.title).toBe(CDSA_SECTIONS.get("7.1").title);
    expect(found.entry.url).toContain("/c-38.8/section-7.1.html");
  });

  it("resolves full Act names and subsections, and carries penalty data", () => {
    const found = lookupStatuteSection("Controlled Drugs and Substances Act, s. 5(2)");
    expect(found.entry.shortName).toBe("CDSA");
    expect(found.entry.severity).toBe("Hybrid");
    expect(found.entry.maxPenalty).toMatch(/life/i);
  });

  it("resolves YCJA sections", () => {
    const found = lookupStatuteSection("YCJA s. 137");
    expect(found.entry.statute).toBe("Youth Criminal Justice Act");
    expect(found.entry.maxPenalty).toBe("Summary conviction");
  });

  it("every explorer section is reachable", () => {
    for (const [n, e] of CDSA_SECTIONS) if (e.kind !== "schedule") expect(lookupStatuteSection(`CDSA s. ${n}`), n).not.toBeNull();
    for (const [n, e] of YCJA_SECTIONS) if (e.kind !== "schedule") expect(lookupStatuteSection(`YCJA s. ${n}`), n).not.toBeNull();
  });

  it("rejects sections that do not exist and other Acts", () => {
    expect(lookupStatuteSection("CDSA s. 9999")).toBeNull();
    expect(lookupStatuteSection("CHRA s. 3")).toBeNull();
  });
});
