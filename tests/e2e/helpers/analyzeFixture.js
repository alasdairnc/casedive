// The /api/analyze success body that the E2E specs mock. Plain data with no
// Playwright import, so the vitest contract test in tests/unit/analyzeApi.test.js
// can load it too.
//
// Specs pass only what differs from the default. Items follow the real shapes:
// criminal_code, civil_law and charter items come from the JSON template in
// src/lib/prompts.js (no `title`), and case_law items come from retrieval.
// `meta` is built the way api/analyze.js builds it unless a spec passes one.

export const FIXTURE_REQUEST_ID = "req_e2e_fixture";

const DEFAULT_RESPONSE = {
  summary:
    "A person entered a residential property at night without permission and stole jewelry.",
  criminal_code: [
    {
      citation: "s. 348(1)(b)",
      summary:
        "Breaking and entering a place with intent to commit an indictable offence.",
      matched_section:
        "Entering a dwelling-house at night and committing theft inside.",
    },
  ],
  case_law: [],
  civil_law: [],
  charter: [],
  analysis: "This scenario involves a residential break and enter.",
  suggestions: [],
};

// meta after case-law retrieval ran (the case-law filter is on).
export function retrievalMeta(caseLaw = []) {
  const count = caseLaw.length;
  return {
    requestId: FIXTURE_REQUEST_ID,
    case_law: {
      source: "retrieval_ranked",
      verifiedCount: count,
      reason: count > 0 ? "verified_results" : "no_verified",
      retrieval: {
        fallbackSearchUsed: false,
        fallbackReason: null,
        retrievalPass: "phase_b_ranked",
        issuePrimary: null,
        searchCalls: 0,
        verificationCalls: count,
        candidateCount: count,
        termsTried: 0,
      },
    },
  };
}

// meta when the case-law filter is off: the handler skips retrieval.
export const CASE_LAW_FILTER_OFF_META = {
  requestId: FIXTURE_REQUEST_ID,
  case_law: { source: "retrieval", verifiedCount: 0, reason: "filter_disabled" },
};

export function analyzeResponse(overrides = {}) {
  const response = { ...DEFAULT_RESPONSE, ...overrides };
  if (!("meta" in overrides)) response.meta = retrievalMeta(response.case_law);
  return structuredClone(response);
}
