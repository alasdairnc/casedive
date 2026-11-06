// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Results from "../../src/components/Results.jsx";
import { ThemeProvider } from "../../src/lib/ThemeContext.jsx";

import { installViewport } from "./helpers/viewport.js";

const UNAVAILABLE =
  "Case law retrieval is temporarily unavailable. Please try again in a moment.";
const NO_MATCH_PREFIX = "No directly on-point verified case law was found.";
const REPHRASE_TIP = "Add the specific legal issue you want researched.";

function dataWithCaseLawMeta(caseLawMeta) {
  return {
    summary: "Police searched a phone without a warrant.",
    criminal_code: [],
    case_law: [],
    civil_law: [],
    charter: [],
    analysis: "Section 8 of the Charter applies.",
    suggestions: [],
    meta: { case_law: caseLawMeta },
  };
}

function renderResults(caseLawMeta) {
  return render(
    <ThemeProvider>
      <Results
        data={dataWithCaseLawMeta(caseLawMeta)}
        scenario="Police searched a phone without a warrant."
        scenarioSnippet="Police searched a phone without a warrant."
        filters={{}}
        addBookmark={vi.fn()}
        removeBookmark={vi.fn()}
        isBookmarked={() => false}
      />
    </ThemeProvider>,
  );
}

let viewport;
beforeEach(() => {
  viewport = installViewport(390);
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({ ok: true, json: async () => ({}) })),
  );
});

afterEach(() => {
  viewport?.restore();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Results case-law empty state when retrieval failed", () => {
  it.each(["retrieval_timeout", "retrieval_error"])(
    "says retrieval is unavailable for %s, with no rephrasing tips",
    (reason) => {
      renderResults({ source: "retrieval_error", verifiedCount: 0, reason });

      expect(screen.getByText(UNAVAILABLE)).toBeTruthy();
      expect(screen.queryByText(REPHRASE_TIP)).toBeNull();
    },
  );

  it("says retrieval is unavailable when CanLII lookups failed fast and nothing is left", () => {
    // A 500 or 429 from CanLII doesn't make retrieval throw: the source stays
    // retrieval_ranked and the failures are counted instead.
    renderResults({
      source: "retrieval_ranked",
      verifiedCount: 0,
      reason: "no_verified",
      retrieval: { upstreamErrors: 2, issuePrimary: "charter_search_seizure" },
    });

    expect(screen.getByText(UNAVAILABLE)).toBeTruthy();
    expect(screen.queryByText(REPHRASE_TIP)).toBeNull();
  });

  it("keeps the no-match message and tips when retrieval worked", () => {
    renderResults({
      source: "retrieval_ranked",
      verifiedCount: 0,
      reason: "no_verified",
    });

    expect(screen.queryByText(UNAVAILABLE)).toBeNull();
    expect(screen.getByText(new RegExp(`^${NO_MATCH_PREFIX}`))).toBeTruthy();
    expect(screen.getByText(REPHRASE_TIP)).toBeTruthy();
  });
});
