import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockCheckRateLimit = vi.fn();
const mockGetClientIp = vi.fn(() => "127.0.0.1");
const mockRateLimitHeaders = vi.fn(() => ({ "X-RateLimit-Limit": "60" }));
const mockApplyCorsHeaders = vi.fn();
const mockIsOriginAllowed = vi.fn(() => true);
const mockGetRetrievalHealthSnapshot = vi.fn();
const mockGetFailureQueue = vi.fn();
const mockSetFailureStatus = vi.fn();
const mockEvaluateRetrievalAlerts = vi.fn(() => []);

vi.mock("../../api/_rateLimit.js", () => ({
  checkRateLimit: mockCheckRateLimit,
  getClientIp: mockGetClientIp,
  rateLimitHeaders: mockRateLimitHeaders,
  redis: null,
}));

vi.mock("../../api/_cors.js", () => ({
  applyCorsHeaders: mockApplyCorsHeaders,
  isOriginAllowed: mockIsOriginAllowed,
}));

vi.mock("../../api/_retrievalHealthStore.js", () => ({
  FAILURE_STATUSES: ["new", "reviewed", "promoted", "ignored"],
  getRetrievalHealthSnapshot: mockGetRetrievalHealthSnapshot,
  getFailureQueue: mockGetFailureQueue,
  setFailureStatus: mockSetFailureStatus,
}));

vi.mock("../../api/_retrievalThresholds.js", () => ({
  evaluateRetrievalAlerts: mockEvaluateRetrievalAlerts,
  RETRIEVAL_ALERT_THRESHOLDS: {
    highErrorRate: 0.2,
    highNoVerifiedRate: 0.7,
  },
}));

vi.mock("../../api/_logging.js", () => ({
  logRequestStart: vi.fn(),
  logRateLimitCheck: vi.fn(),
  logValidationError: vi.fn(),
  logSuccess: vi.fn(),
  logError: vi.fn(),
}));

const { default: handler } = await import("../../api/retrieval-health.js");

const ID = "0123456789abcdef";

function createRes() {
  return {
    statusCode: null,
    headers: {},
    body: null,
    ended: false,
    setHeader(key, value) {
      this.headers[key] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
    end() {
      this.ended = true;
      return this;
    },
  };
}

function getReq(url = "/api/retrieval-health", token = "test-token") {
  return { method: "GET", url, headers: { authorization: `Bearer ${token}` } };
}

function postReq(body, { token = "test-token", contentType } = {}) {
  return {
    method: "POST",
    url: "/api/retrieval-health",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": contentType ?? "application/json",
    },
    body,
  };
}

describe("retrieval-health handler", () => {
  const originalToken = process.env.RETRIEVAL_HEALTH_TOKEN;

  beforeEach(() => {
    vi.clearAllMocks();
    mockCheckRateLimit.mockResolvedValue({
      allowed: true,
      limit: 60,
      remaining: 59,
      reset: 123,
    });
    mockGetRetrievalHealthSnapshot.mockResolvedValue({
      generatedAt: new Date(0).toISOString(),
      snapshotSource: "primary",
      retentionMs: 604_800_000,
      historyMode: "counters_plus_recent",
      historyMaxEvents: 1500,
      totalStoredEvents: 10,
      windows: { "5m": {}, "1h": {} },
      alltime: { samples: { total: 10 } },
      trendline: [],
    });
    mockGetFailureQueue.mockResolvedValue({
      items: [
        {
          id: ID,
          snippet: "my chair was stolen",
          reason: "no_verified",
          classId: "theft",
          issuePrimary: "theft",
          count: 3,
          status: "new",
        },
      ],
      counts: { all: 1, new: 1, reviewed: 0, promoted: 0, ignored: 0 },
      total: 1,
      hasMore: false,
      nextOffset: null,
      limit: 20,
      offset: 0,
    });
    process.env.RETRIEVAL_HEALTH_TOKEN = "test-token";
  });

  afterEach(() => {
    process.env.RETRIEVAL_HEALTH_TOKEN = originalToken;
  });

  it("returns 200 for OPTIONS preflight and advertises POST", async () => {
    const req = { method: "OPTIONS", headers: {} };
    const res = createRes();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.ended).toBe(true);
    expect(mockCheckRateLimit).not.toHaveBeenCalled();
    expect(mockApplyCorsHeaders).toHaveBeenCalledWith(
      req,
      res,
      "GET, POST, OPTIONS",
      "Authorization, Content-Type",
    );
  });

  it("returns 405 for methods other than GET and POST", async () => {
    const res = createRes();
    await handler({ method: "DELETE", headers: {} }, res);
    expect(res.statusCode).toBe(405);
    expect(res.body).toEqual({ error: "Method not allowed" });
  });

  it("returns 429 when rate limit is exceeded", async () => {
    mockCheckRateLimit.mockResolvedValue({
      allowed: false,
      limit: 60,
      remaining: 0,
      reset: 123,
    });
    const res = createRes();
    await handler(getReq(), res);
    expect(res.statusCode).toBe(429);
  });

  it("returns 401 for a wrong token on GET and POST", async () => {
    const getRes = createRes();
    await handler(getReq("/api/retrieval-health", "wrong"), getRes);
    expect(getRes.statusCode).toBe(401);

    const postRes = createRes();
    await handler(postReq({ id: ID, status: "reviewed" }, { token: "wrong" }), postRes);
    expect(postRes.statusCode).toBe(401);
    expect(mockSetFailureStatus).not.toHaveBeenCalled();
  });

  it("returns 401 when the token is not configured", async () => {
    process.env.RETRIEVAL_HEALTH_TOKEN = "";
    const res = createRes();
    await handler(getReq("/api/retrieval-health", "anything"), res);
    expect(res.statusCode).toBe(401);
  });

  it("returns the snapshot with the failure queue and is never cached", async () => {
    const res = createRes();
    await handler(getReq(), res);

    expect(res.statusCode).toBe(200);
    expect(res.headers["Cache-Control"]).toBe("no-store");
    expect(res.body).toMatchObject({
      totalStoredEvents: 10,
      trendline: [],
      alerts: [],
      failures: { total: 1 },
    });
    expect(res.body.failures.items[0].snippet).toBe("my chair was stolen");
    expect(Array.isArray(res.body.improvements)).toBe(true);
    expect(res.body.improvements[0]).toMatchObject({
      classId: "theft",
      failureCount: 3,
    });
  });

  it("clamps status and pagination params before reading the queue", async () => {
    const res = createRes();
    await handler(
      getReq(
        "/api/retrieval-health?status=bogus&failureLimit=9999&failuresOffset=999999",
      ),
      res,
    );

    expect(res.statusCode).toBe(200);
    expect(mockGetFailureQueue).toHaveBeenCalledWith({
      status: "new",
      limit: 100,
      offset: 1000,
    });
  });

  it("accepts a known status filter, including all", async () => {
    await handler(getReq("/api/retrieval-health?status=ignored"), createRes());
    expect(mockGetFailureQueue).toHaveBeenCalledWith(
      expect.objectContaining({ status: "ignored" }),
    );
    mockGetFailureQueue.mockClear();
    await handler(getReq("/api/retrieval-health?status=all"), createRes());
    expect(mockGetFailureQueue).toHaveBeenCalledWith(
      expect.objectContaining({ status: "all" }),
    );
  });

  describe("POST triage", () => {
    it("updates a failure and returns it", async () => {
      mockSetFailureStatus.mockResolvedValue({ id: ID, status: "promoted" });
      const res = createRes();

      await handler(
        postReq({ id: ID, status: "promoted", note: "add to corpus" }),
        res,
      );

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ failure: { id: ID, status: "promoted" } });
      expect(mockSetFailureStatus).toHaveBeenCalledWith(ID, {
        id: ID,
        status: "promoted",
        note: "add to corpus",
      });
    });

    it("returns 404 for an unknown or expired id", async () => {
      mockSetFailureStatus.mockResolvedValue(null);
      const res = createRes();
      await handler(postReq({ id: ID, status: "reviewed" }), res);
      expect(res.statusCode).toBe(404);
    });

    it.each([
      ["a missing id", { status: "reviewed" }],
      ["a non-fingerprint id", { id: "../../etc/passwd", status: "reviewed" }],
      ["an id that is too long", { id: `${ID}0`, status: "reviewed" }],
      ["an unknown status", { id: ID, status: "deleted" }],
      ["a non-string note", { id: ID, status: "reviewed", note: { a: 1 } }],
      ["an oversized note", { id: ID, status: "reviewed", note: "x".repeat(281) }],
      ["an array body", [ID]],
      ["a null body", null],
    ])("rejects %s with 400 and never touches the store", async (_name, body) => {
      const res = createRes();
      await handler(postReq(body), res);
      expect(res.statusCode).toBe(400);
      expect(mockSetFailureStatus).not.toHaveBeenCalled();
    });

    it("rejects a non-JSON content type with 415", async () => {
      const res = createRes();
      await handler(
        postReq({ id: ID, status: "reviewed" }, { contentType: "text/plain" }),
        res,
      );
      expect(res.statusCode).toBe(415);
      expect(mockSetFailureStatus).not.toHaveBeenCalled();
    });

    it("rejects an oversized body with 413", async () => {
      const res = createRes();
      await handler(
        postReq({ id: ID, status: "reviewed", pad: "x".repeat(5000) }),
        res,
      );
      expect(res.statusCode).toBe(413);
      expect(mockSetFailureStatus).not.toHaveBeenCalled();
    });
  });

  it("passes through upstream 4xx errors unchanged", async () => {
    const upstreamError = new Error("bad request");
    upstreamError.status = 400;
    mockGetRetrievalHealthSnapshot.mockRejectedValue(upstreamError);
    const res = createRes();
    await handler(getReq(), res);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Internal server error" });
  });

  it("maps upstream 5xx errors to 502", async () => {
    const upstreamError = new Error("upstream failed");
    upstreamError.status = 503;
    mockGetRetrievalHealthSnapshot.mockRejectedValue(upstreamError);
    const res = createRes();
    await handler(getReq(), res);
    expect(res.statusCode).toBe(502);
    expect(res.body).toEqual({ error: "Internal server error" });
  });
});
