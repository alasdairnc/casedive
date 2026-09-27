// The /api/analyze success body that the E2E specs mock. Plain data with no
// Playwright import, so the vitest contract test in tests/unit/analyzeApi.test.js
// can load it too.
//
// Specs pass only what differs from the default.

const DEFAULT_RESPONSE = {
  summary:
    "A person entered a residential property at night without permission and stole jewelry.",
  criminal_code: [
    {
      citation: "s. 348(1)(b)",
      title: "Breaking and Entering",
      summary:
        "Breaking and entering a place with intent to commit an indictable offence.",
    },
  ],
  case_law: [],
  civil_law: [],
  charter: [],
  analysis: "This scenario involves a residential break and enter.",
  suggestions: [],
};

export function analyzeResponse(overrides = {}) {
  return structuredClone({ ...DEFAULT_RESPONSE, ...overrides });
}
