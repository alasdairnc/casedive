// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RetrievalHealthDashboard from "../../src/components/RetrievalHealthDashboard.jsx";
import { ThemeProvider } from "../../src/lib/ThemeContext.jsx";

function renderDashboard() {
  return render(
    <ThemeProvider>
      <RetrievalHealthDashboard onNavigateHome={() => {}} />
    </ThemeProvider>,
  );
}

function makeQueue(items, overrides = {}) {
  return {
    items,
    counts: { all: items.length, new: items.length, reviewed: 0, promoted: 0, ignored: 0 },
    total: items.length,
    hasMore: false,
    nextOffset: null,
    limit: 20,
    offset: 0,
    retentionDays: 30,
    textRetentionDays: 14,
    ...overrides,
  };
}

function makeFailure(overrides = {}) {
  return {
    id: "f0123456789abcde",
    snippet: "My chair was stolen from outside my apartment.",
    reason: "no_verified",
    classId: "theft",
    issuePrimary: "theft",
    count: 3,
    status: "new",
    note: null,
    firstSeen: new Date(Date.now() - 86400000).toISOString(),
    lastSeen: new Date().toISOString(),
    finalCaseLawCount: 0,
    fallbackPathUsed: false,
    errorMessage: null,
    textState: "present",
    concepts: ["theft", "search"],
    lengthBucket: "medium",
    diagnostics: {
      termsTried: 3,
      databasesTried: 2,
      candidateCount: 5,
      verificationCalls: 4,
      semanticFilterDropCount: 1,
    },
    ...overrides,
  };
}

function makeHealthResponse(overrides = {}) {
  return {
    generatedAt: new Date().toISOString(),
    totalStoredEvents: 20,
    snapshotSource: "memory",
    windows: {
      "5m": {
        samples: { operational: 2, quality: 2, latency: 2 },
        rates: {
          errorRate: 0,
          noVerifiedRate: 0.5,
          fallbackPathRate: 0.5,
          avgVerifiedPerRequest: 0.5,
          avgRelevanceScore: 6,
          avgSemanticFilterDrops: 1,
          avgConceptRescues: 0.5,
          candidateSourceMix: { ai: 0.5, landmark: 0.25, localFallback: 0.25 },
        },
        latencyMs: { avg: 120, p95: 170 },
        firstEventAt: new Date(Date.now() - 300000).toISOString(),
        lastEventAt: new Date().toISOString(),
        breakdowns: { byIssue: [] },
      },
      "1h": {
        samples: { operational: 6, quality: 6, latency: 6 },
        rates: {
          errorRate: 0.05,
          noVerifiedRate: 0.35,
          fallbackPathRate: 0.4,
          avgVerifiedPerRequest: 1.2,
          avgRelevanceScore: 6.4,
          avgSemanticFilterDrops: 1.8,
          avgConceptRescues: 0.8,
          candidateSourceMix: { ai: 0.6, landmark: 0.2, localFallback: 0.2 },
        },
        latencyMs: { avg: 180, p95: 340 },
        firstEventAt: new Date(Date.now() - 3600000).toISOString(),
        lastEventAt: new Date().toISOString(),
        breakdowns: { byIssue: [] },
      },
    },
    alltime: {
      samples: { total: 20, operational: 20, quality: 20, latency: 20 },
      rates: {
        errorRate: 0.1,
        noVerifiedRate: 0.3,
        fallbackPathRate: 0.5,
        avgVerifiedPerRequest: 1.1,
        avgRelevanceScore: 6.1,
        avgSemanticFilterDrops: 1.9,
        avgConceptRescues: 0.7,
      },
      latencyMs: { avg: 220, p95: null },
      breakdowns: {
        byIssue: [
          {
            issuePrimary: "theft",
            requests: 10,
            fallbackPathRate: 0.2,
            noVerifiedRate: 0.1,
            errorRate: 0.01,
            avgVerifiedPerRequest: 2.1,
          },
          {
            issuePrimary: "robbery",
            requests: 4,
            fallbackPathRate: 0.1,
            noVerifiedRate: 0.8,
            errorRate: 0.2,
            avgVerifiedPerRequest: 0.4,
          },
          {
            issuePrimary: "charter_search_seizure",
            requests: 2,
            fallbackPathRate: 0.2,
            noVerifiedRate: 0.95,
            errorRate: 0.3,
            avgVerifiedPerRequest: 0.2,
          },
          {
            issuePrimary: "assault",
            requests: 5,
            fallbackPathRate: 0.7,
            noVerifiedRate: 0.5,
            errorRate: 0.1,
            avgVerifiedPerRequest: 0.9,
          },
        ],
      },
      firstEventAt: new Date(Date.now() - 86400000).toISOString(),
      lastEventAt: new Date().toISOString(),
    },
    trendline: [],
    thresholds: {
      errorRate1h: 0.2,
      noVerifiedRate1h: 0.7,
      p95LatencyMs1h: 2000,
      fallbackPathRate1h: 0.65,
      avgRelevanceScoreMin1h: 5,
      minSampleSize1h: 8,
    },
    failures: makeQueue([]),
    improvements: [],
    alerts: [],
    ...overrides,
  };
}

function extractIssueOrder(container) {
  const matches = [
    ...container.textContent.matchAll(/([a-z_]+)\s*·\s*\d+\s*requests/g),
  ];
  return matches.map((m) => m[1]);
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("RetrievalHealthDashboard all-time issue trends", () => {
  it("defaults to risk-first order and falls back to volume sort on toggle", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => makeHealthResponse(),
      }),
    );

    const { container } = renderDashboard();

    await screen.findByText("All-time by issue trend");

    await waitFor(() => {
      const order = extractIssueOrder(container);
      expect(order.slice(0, 3)).toEqual(["robbery", "assault", "theft"]);
      expect(order).not.toContain("charter_search_seizure");
    });

    fireEvent.click(screen.getByRole("button", { name: "Sort: Volume" }));

    await waitFor(() => {
      const order = extractIssueOrder(container);
      expect(order.slice(0, 3)).toEqual(["theft", "assault", "robbery"]);
      expect(order).not.toContain("charter_search_seizure");
    });
  });

  it("falls back to showing all issue rows when every issue is below min sample threshold", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () =>
          makeHealthResponse({
            alltime: {
              samples: { total: 6, operational: 6, quality: 6, latency: 6 },
              rates: {
                errorRate: 0.1,
                noVerifiedRate: 0.3,
                fallbackPathRate: 0.5,
                avgVerifiedPerRequest: 0.9,
                avgRelevanceScore: 5.8,
                avgSemanticFilterDrops: 1.2,
                avgConceptRescues: 0.4,
              },
              latencyMs: { avg: 180, p95: null },
              breakdowns: {
                byIssue: [
                  {
                    issuePrimary: "theft",
                    requests: 2,
                    fallbackPathRate: 0.2,
                    noVerifiedRate: 0.1,
                    errorRate: 0,
                    avgVerifiedPerRequest: 1.3,
                  },
                  {
                    issuePrimary: "robbery",
                    requests: 1,
                    fallbackPathRate: 0.6,
                    noVerifiedRate: 0.9,
                    errorRate: 0.2,
                    avgVerifiedPerRequest: 0.2,
                  },
                ],
              },
              firstEventAt: new Date(Date.now() - 3600000).toISOString(),
              lastEventAt: new Date().toISOString(),
            },
          }),
      }),
    );

    const { container } = renderDashboard();

    await screen.findByText("All-time by issue trend");

    await waitFor(() => {
      const order = extractIssueOrder(container);
      expect(order).toContain("theft");
      expect(order).toContain("robbery");
      expect(order).toHaveLength(2);
    });
  });

  it("renders compact issue alert summary when issue-level alerts are present", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () =>
          makeHealthResponse({
            alerts: [
              {
                id: "retrieval_issue_no_verified_rate_1h_robbery",
                metric: "issueNoVerifiedRate",
                issuePrimary: "robbery",
                requests: 8,
                value: 0.9,
                threshold: 0.85,
                message: "Issue robbery is degraded.",
              },
            ],
          }),
      }),
    );

    renderDashboard();

    await screen.findByText("Issue Alert Summary");
    expect(screen.getByText("robbery · 8 requests")).toBeTruthy();
    expect(
      screen.getByText("No-verified at 90.0% (threshold 85.0%)"),
    ).toBeTruthy();
  });
});

describe("RetrievalHealthDashboard failure queue", () => {
  function stubFetch(handler) {
    const fetchMock = vi.fn(async (url, init = {}) => handler(String(url), init));
    vi.stubGlobal("fetch", fetchMock);
    return fetchMock;
  }
  const ok = (body) => ({ ok: true, json: async () => body });

  it("shows redacted scenarios with repeat counts and tab totals", async () => {
    stubFetch(() =>
      ok(
        makeHealthResponse({
          failures: makeQueue([makeFailure()], {
            counts: { all: 6, new: 1, reviewed: 2, promoted: 1, ignored: 2 },
          }),
        }),
      ),
    );
    renderDashboard();

    await screen.findByText("My chair was stolen from outside my apartment.");
    expect(screen.getByText("seen 3×")).toBeTruthy();
    expect(screen.getByRole("tab", { name: "New (1)" })).toBeTruthy();
    expect(screen.getByRole("tab", { name: "Reviewed (2)" })).toBeTruthy();
    expect(screen.getByRole("tab", { name: "Ignored (2)" })).toBeTruthy();
  });

  it("requests the selected status when a tab is clicked", async () => {
    const fetchMock = stubFetch(() => ok(makeHealthResponse()));
    renderDashboard();
    await screen.findByText("Failed scenarios");

    fireEvent.click(screen.getByRole("tab", { name: /Ignored/ }));

    await waitFor(() => {
      expect(
        fetchMock.mock.calls.some(([url]) => String(url).includes("status=ignored")),
      ).toBe(true);
    });
  });

  it("posts a triage change with the note, then reloads the queue", async () => {
    const failure = makeFailure();
    const fetchMock = stubFetch((url, init) => {
      if (init.method === "POST") return ok({ failure: { ...failure, status: "promoted" } });
      return ok(makeHealthResponse({ failures: makeQueue([failure]) }));
    });
    renderDashboard();
    await screen.findByText(failure.snippet);

    fireEvent.change(screen.getByLabelText("Reviewer note"), {
      target: { value: "add to corpus" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Promote to test" }));

    await waitFor(() => {
      const post = fetchMock.mock.calls.find(([, init]) => init?.method === "POST");
      expect(post).toBeTruthy();
      expect(JSON.parse(post[1].body)).toEqual({
        id: failure.id,
        status: "promoted",
        note: "add to corpus",
      });
    });
    // A GET after the POST means the list was refreshed from the server.
    await waitFor(() => {
      const calls = fetchMock.mock.calls;
      const postIndex = calls.findIndex(([, init]) => init?.method === "POST");
      expect(calls.slice(postIndex + 1).some(([, init]) => !init?.method)).toBe(true);
    });
  });

  it("shows the server error when a triage change fails", async () => {
    stubFetch((url, init) => {
      if (init.method === "POST") {
        return { ok: false, status: 404, json: async () => ({ error: "Not found" }) };
      }
      return ok(makeHealthResponse({ failures: makeQueue([makeFailure()]) }));
    });
    renderDashboard();
    await screen.findByText("My chair was stolen from outside my apartment.");

    fireEvent.click(screen.getByRole("button", { name: "Mark reviewed" }));

    expect((await screen.findByRole("alert")).textContent).toContain("Not found");
  });

  it("loads the next page with the queue offset", async () => {
    const fetchMock = stubFetch((url) => {
      if (url.includes("failuresOffset=1")) {
        return ok(
          makeHealthResponse({
            failures: makeQueue([makeFailure({ id: "f0000000000000002", snippet: "second page scenario" })], {
              total: 2,
              offset: 1,
            }),
          }),
        );
      }
      return ok(
        makeHealthResponse({
          failures: makeQueue([makeFailure()], { total: 2, hasMore: true, nextOffset: 1 }),
        }),
      );
    });
    renderDashboard();
    await screen.findByText("My chair was stolen from outside my apartment.");

    fireEvent.click(screen.getByRole("button", { name: "Load more" }));

    await screen.findByText("second page scenario");
    expect(screen.getByText("My chair was stolen from outside my apartment.")).toBeTruthy();
    expect(fetchMock).toHaveBeenCalled();
  });

  it("explains an empty queue", async () => {
    stubFetch(() => ok(makeHealthResponse()));
    renderDashboard();
    expect(await screen.findByText(/Nothing waiting for review/)).toBeTruthy();
  });
});

describe("RetrievalHealthDashboard low-traffic honesty", () => {
  const ok = (body) => ({ ok: true, json: async () => body });

  it("does not call one failed request critical", async () => {
    const base = makeHealthResponse();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        ok({
          ...base,
          totalStoredEvents: 1,
          thresholds: { ...base.thresholds, noVerifiedRate1h: 0.7, minSampleSize1h: 3 },
          windows: {
            ...base.windows,
            "1h": {
              ...base.windows["1h"],
              samples: { operational: 1, quality: 1, latency: 1 },
              rates: { ...base.windows["1h"].rates, errorRate: 0, noVerifiedRate: 1 },
            },
          },
        }),
      ),
    );
    renderDashboard();

    await screen.findByText("Not enough traffic to judge");
    expect(screen.queryByText("Needs immediate attention")).toBeNull();
    expect(screen.queryByText("Critical")).toBeNull();
    // The three overview checks plus the per-window panel badges.
    expect(screen.getAllByText("Low sample").length).toBeGreaterThanOrEqual(3);
  });

  it("uses singular wording for one failure in one scenario", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        ok(
          makeHealthResponse({
            improvements: [
              { id: "improve-1", classId: "theft", failureCount: 1, scenarioCount: 1, suggestedTerms: [], examples: [] },
            ],
          }),
        ),
      ),
    );
    const { container } = renderDashboard();
    await screen.findByText("Where to tune next");
    await waitFor(() => {
      expect(container.textContent).toMatch(/theft\s*·\s*1 failure across 1 scenario/);
    });
    expect(container.textContent).not.toMatch(/1 failures/);
  });
});

describe("RetrievalHealthDashboard privacy-aware failure cards", () => {
  const ok = (body) => ({ ok: true, json: async () => body });
  const stub = (failure) =>
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        ok(makeHealthResponse({ failures: makeQueue([failure]) })),
      ),
    );

  it("shows the matched concepts, length bucket and retrieval figures", async () => {
    stub(makeFailure());
    const { container } = renderDashboard();
    await screen.findByText("My chair was stolen from outside my apartment.");

    const chips = screen.getByLabelText("Matched legal concepts");
    expect(chips.textContent).toContain("theft");
    expect(chips.textContent).toContain("search");
    expect(chips.textContent).toContain("medium scenario");
    expect(container.textContent).toMatch(/3 terms\s*·\s*5 candidates\s*·\s*4 verified calls/);
  });

  it("warns that reviewing or ignoring deletes the text", async () => {
    stub(makeFailure());
    renderDashboard();
    expect(await screen.findByText(/deletes the stored text/)).toBeTruthy();
  });

  it("explains a scenario whose text was deleted on review, and keeps its concepts", async () => {
    stub(makeFailure({ snippet: null, textState: "erased", status: "new" }));
    renderDashboard();

    expect(await screen.findByText("Scenario text deleted when this was reviewed.")).toBeTruthy();
    expect(screen.getByLabelText("Matched legal concepts").textContent).toContain("theft");
    // Nothing left to delete, so no warning.
    expect(screen.queryByText(/deletes the stored text/)).toBeNull();
  });

  it("explains a scenario whose text expired", async () => {
    stub(makeFailure({ snippet: null, textState: "expired" }));
    renderDashboard();
    expect(
      await screen.findByText("Scenario text deleted after its retention period."),
    ).toBeTruthy();
  });

  it("states both retention periods in the footer", async () => {
    stub(makeFailure());
    const { container } = renderDashboard();
    await screen.findByText("My chair was stolen from outside my apartment.");
    expect(container.textContent).toMatch(/deleted 14 days after it is first captured/);
    expect(container.textContent).toMatch(/kept 30 days/);
  });

  it("shows shared concepts in the tuning suggestions", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        ok(
          makeHealthResponse({
            improvements: [
              {
                id: "improve-1", classId: "theft", failureCount: 4, scenarioCount: 2,
                suggestedTerms: [], examples: [],
                topConcepts: [{ concept: "theft", count: 4 }, { concept: "search", count: 3 }],
              },
            ],
          }),
        ),
      ),
    );
    const { container } = renderDashboard();
    await screen.findByText("Where to tune next");
    await waitFor(() => {
      expect(container.textContent).toContain("Shared concepts: theft (4) · search (3)");
    });
  });
});

describe("RetrievalHealthDashboard hand-off", () => {
  it("copies a /fix-retrieval-failure command for the card's id", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => makeHealthResponse({ failures: makeQueue([makeFailure()]) }),
      }),
    );
    renderDashboard();
    await screen.findByText("My chair was stolen from outside my apartment.");

    fireEvent.click(screen.getByRole("button", { name: "Hand off to Claude" }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith("/fix-retrieval-failure f0123456789abcde");
    });
    // The command carries the id only, never the scenario text.
    expect(writeText.mock.calls[0][0]).not.toContain("chair");
    expect(await screen.findByText(/Copied: paste into Claude Code/)).toBeTruthy();
  });
});
