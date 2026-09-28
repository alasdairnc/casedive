// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import Results from "../../src/components/Results.jsx";
import { ThemeProvider } from "../../src/lib/ThemeContext.jsx";

const FIRST = "R v Theroux, 1993 CanLII 134 (SCC)";
const SECOND = "R v Jordan, 2016 SCC 27";

const resultFor = (citation) => ({
  summary: "Summary.",
  criminal_code: [],
  case_law: [{ citation, title: citation, summary: "Case." }],
  civil_law: [],
  charter: [],
  analysis: "Analysis.",
  suggestions: [],
});

const verified = (citation) => ({
  [citation]: {
    status: "verified",
    url: "https://www.canlii.org/en/ca/scc/doc/2016/2016scc27/2016scc27.html",
  },
});

function view(data) {
  return (
    <ThemeProvider>
      <Results
        data={data}
        scenario="Scenario."
        scenarioSnippet="Scenario."
        filters={{}}
        addBookmark={vi.fn()}
        removeBookmark={vi.fn()}
        isBookmarked={() => false}
      />
    </ThemeProvider>
  );
}

// Each /api/verify call waits until the test answers it.
function mockVerify() {
  const pending = [];
  vi.stubGlobal(
    "fetch",
    vi.fn((url, init) => {
      if (url !== "/api/verify") {
        return Promise.resolve({ ok: true, json: async () => ({}) });
      }
      return new Promise((resolve) => {
        pending.push({
          citations: JSON.parse(init.body).citations,
          answer: (body) =>
            act(async () => resolve({ ok: true, json: async () => body })),
        });
      });
    }),
  );
  return pending;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Results citation checks", () => {
  it("checks new results even while an older check is still running", async () => {
    const calls = mockVerify();
    const { rerender } = render(view(resultFor(FIRST)));
    rerender(view(resultFor(SECOND)));

    expect(calls.map((c) => c.citations)).toEqual([[FIRST], [SECOND]]);

    await calls[1].answer(verified(SECOND));
    expect(screen.getByText("Verified on CanLII")).toBeTruthy();
  });

  it("ignores a late answer for results that were replaced", async () => {
    const calls = mockVerify();
    const { rerender } = render(view(resultFor(FIRST)));
    rerender(view(resultFor(SECOND)));

    await calls[1].answer(verified(SECOND));
    // The first check answers last. Applying it would drop SECOND's badge.
    await calls[0].answer(verified(FIRST));

    expect(screen.getByText("Verified on CanLII")).toBeTruthy();
  });
});
