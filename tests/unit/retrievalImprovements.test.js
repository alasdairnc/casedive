import { describe, expect, it } from "vitest";

import { buildRetrievalImprovements } from "../../api/_retrievalImprovements.js";

describe("buildRetrievalImprovements", () => {
  it("classifies trial delay failures with Jordan/Cody terms", () => {
    const improvements = buildRetrievalImprovements([
      {
        reason: "no_verified",
        classId: "trial_delay",
        issuePrimary: "trial_delay",
      },
    ]);

    expect(improvements).toHaveLength(1);
    expect(improvements[0].classId).toBe("trial_delay");
    expect(
      improvements[0].suggestedTerms.some((t) => t.includes("Jordan")),
    ).toBe(true);
  });

  it("aggregates repeated failures for the same class", () => {
    const improvements = buildRetrievalImprovements([
      { reason: "no_verified", classId: "mischief", issuePrimary: "mischief" },
      { reason: "no_verified", classId: "mischief", issuePrimary: "mischief" },
    ]);

    expect(improvements).toHaveLength(1);
    expect(improvements[0].failureCount).toBe(2);
    expect(improvements[0].confidence).toBe("high");
    expect(improvements[0].issuePrimary).toBe("mischief");
  });

  it("ranks the legal concepts that failures share, weighted by repeats", () => {
    const [item] = buildRetrievalImprovements([
      { classId: "theft", count: 3, concepts: ["theft", "search"] },
      { classId: "theft", count: 1, concepts: ["theft"] },
      { classId: "theft", count: 1, concepts: ["detention"] },
    ]);
    expect(item.topConcepts).toEqual([
      { concept: "theft", count: 4 },
      { concept: "search", count: 3 },
      { concept: "detention", count: 1 },
    ]);
  });

  it("still suggests from records whose text has been deleted", () => {
    const [item] = buildRetrievalImprovements([
      { classId: "theft", count: 2, snippet: null, concepts: ["theft"] },
    ]);
    expect(item.failureCount).toBe(2);
    expect(item.examples).toEqual([]);
    expect(item.topConcepts[0].concept).toBe("theft");
  });
});
