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
});
