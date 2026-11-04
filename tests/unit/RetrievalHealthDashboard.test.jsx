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
