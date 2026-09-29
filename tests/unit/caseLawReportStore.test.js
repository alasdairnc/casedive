import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

let mockRedis = null;

vi.mock("../../api/_rateLimit.js", () => ({
  get redis() {
    return mockRedis;
  },
}));

const {
  recordCaseLawReport,
  getStoredCaseLawReports,
  resetInMemoryCaseLawReports,
  REPORT_RETENTION_DAYS,
} = await import("../../api/_caseLawReportStore.js");

const DAY_MS = 24 * 60 * 60 * 1000;

function daysAgo(days) {
  return new Date(Date.now() - days * DAY_MS).toISOString();
}

function makeFakeRedis() {
  const values = new Map();
  return {
    values,
    set: vi.fn(async (key, value) => {
      values.set(key, value);
      return "OK";
    }),
    scan: vi.fn(async (_cursor, { match }) => {
      const prefix = match.replace(/\*$/, "");
      return ["0", [...values.keys()].filter((k) => k.startsWith(prefix))];
    }),
    mget: vi.fn(async (...keys) => keys.map((k) => values.get(k) ?? null)),
  };
}

function makeReport(index = 1) {
  return {
    reportId: `clr_${index}`,
    reportedAt: new Date().toISOString(),
    analysisRequestId: "req_123",
    scenarioSnippet:
      "A person broke into a house at night and stole electronics.",
    filters: {
      jurisdiction: "all",
      courtLevel: "all",
      dateRange: "all",
      lawTypes: {
        criminal_code: true,
        case_law: true,
        civil_law: true,
        charter: true,
      },
    },
    item: {
      citation: `R v Example ${index}, 2024 SCC ${index}`,
      title: "R v Example",
      court: "SCC",
      year: "2024",
      url_canlii: "https://www.canlii.org/en/ca/scc/doc/example.html",
      summary: "Example summary",
    },
    resultIndex: 0,
    reason: "wrong_legal_issue",
    note: "Needs a tighter factual match.",
    caseLawMeta: {
      source: "retrieval_ranked",
      reason: "verified_results",
      issuePrimary: "theft",
      retrievalPass: "phase_b_ranked",
      fallbackReason: null,
      verifiedCount: 1,
    },
  };
}

beforeEach(() => {
  mockRedis = null;
  resetInMemoryCaseLawReports();
});

afterEach(() => {
  mockRedis = null;
  resetInMemoryCaseLawReports();
  vi.restoreAllMocks();
});

describe("case-law report store", () => {
  it("normalizes and stores a report in memory fallback", async () => {
    await recordCaseLawReport({
      ...makeReport(),
      scenarioSnippet:
        "   A person broke into a house at night and stole electronics.   ",
      item: {
        ...makeReport().item,
        title: "  R v Example   ",
        url_canlii: "not-a-url",
        summary: "  Example summary with extra spacing.  ",
      },
      note: "  Needs a tighter factual match.  ",
    });

    const stored = await getStoredCaseLawReports();
    expect(stored).toHaveLength(1);
    expect(stored[0]).toMatchObject({
      scenarioSnippet:
        "A person broke into a house at night and stole electronics.",
      item: {
        citation: "R v Example 1, 2024 SCC 1",
        title: "R v Example",
        summary: "Example summary with extra spacing.",
        url_canlii: null,
      },
      note: "Needs a tighter factual match.",
      caseLawMeta: {
        source: "retrieval_ranked",
        reason: "verified_results",
        issuePrimary: "theft",
      },
    });
  });

  it("keeps only the most recent bounded number of reports", async () => {
    for (let index = 0; index < 1005; index += 1) {
      await recordCaseLawReport(makeReport(index));
    }

    const stored = await getStoredCaseLawReports();
    expect(stored).toHaveLength(1000);
    expect(stored[0].reportId).toBe("clr_5");
    expect(stored.at(-1).reportId).toBe("clr_1004");
  });

  it("drops in-memory reports older than the retention window", async () => {
    await recordCaseLawReport({
      ...makeReport(1),
      reportedAt: daysAgo(REPORT_RETENTION_DAYS + 1),
    });
    await recordCaseLawReport({
      ...makeReport(2),
      reportedAt: daysAgo(REPORT_RETENTION_DAYS - 1),
    });

    const stored = await getStoredCaseLawReports();
    expect(stored.map((r) => r.reportId)).toEqual(["clr_2"]);
  });

  it("writes each report to its own Redis key with a retention expiry", async () => {
    mockRedis = makeFakeRedis();

    await recordCaseLawReport(makeReport(7));

    expect(mockRedis.set).toHaveBeenCalledTimes(1);
    const [key, value, options] = mockRedis.set.mock.calls[0];
    expect(key).toBe("feedback:case-law-report:v2:clr_7");
    expect(JSON.parse(value).reportId).toBe("clr_7");
    expect(options).toEqual({ ex: REPORT_RETENTION_DAYS * 24 * 60 * 60 });
  });

  it("reads reports back from Redis, oldest first, skipping expired ones", async () => {
    mockRedis = makeFakeRedis();
    const store = (report) =>
      mockRedis.values.set(
        `feedback:case-law-report:v2:${report.reportId}`,
        JSON.stringify(report),
      );
    store({ ...makeReport(1), reportedAt: daysAgo(2) });
    store({ ...makeReport(2), reportedAt: daysAgo(REPORT_RETENTION_DAYS + 5) });
    store({ ...makeReport(3), reportedAt: daysAgo(10) });

    const stored = await getStoredCaseLawReports();
    expect(stored.map((r) => r.reportId)).toEqual(["clr_3", "clr_1"]);
  });
});
