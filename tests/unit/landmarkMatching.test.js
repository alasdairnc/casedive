import { describe, it, expect } from "vitest";
import { __testables } from "../../api/analyze.js";

const { matchLandmarkCases } = __testables;

const FRAUD_SCENARIO =
  "An accused allegedly defrauded an elderly victim of $90,000 through a fake investment scheme, collecting payments over 18 months before the victim discovered the fraud.";

describe("matchLandmarkCases against the real corpus", () => {
  it("does not put R v Barton on a fraud scenario that only shares 'victim'", () => {
    const citations = matchLandmarkCases(FRAUD_SCENARIO).map((c) => c.citation);
    expect(citations).not.toContain("2019 SCC 33");
  });

  it("does not match on a role word alone", () => {
    expect(
      matchLandmarkCases("The victim told the accused to leave.").map(
        (c) => c.citation,
      ),
    ).not.toContain("2019 SCC 33");
  });

  it("still finds R v Barton on a rape shield scenario", () => {
    const citations = matchLandmarkCases(
      "The defence wants to question the complainant about her prior sexual history under the rape shield provisions, s. 276.",
    ).map((c) => c.citation);
    expect(citations).toContain("2019 SCC 33");
  });
});
