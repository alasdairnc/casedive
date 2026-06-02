import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockCheckRateLimit = vi.fn();
const mockGetClientIp = vi.fn(() => "127.0.0.1");
const mockRateLimitHeaders = vi.fn(() => ({ "X-RateLimit-Limit": "60" }));
const mockApplyCorsHeaders = vi.fn();
const mockIsOriginAllowed = vi.fn(() => true);
const mockGetRetrievalHealthSnapshot = vi.fn();
const mockGetTrendlineSnapshots = vi.fn();
const mockGetFailureScenarioPage = vi.fn();
const mockEvaluateRetrievalAlerts = vi.fn(() => []);

// retrieval-health.js also imports `redis` from this module (used to gate the
// response cache). vitest throws on access to an undefined named export, so the
// mock must declare it. These tests exercise the non-cached path, so redis is null.
let mockRedis = null;
vi.mock("../../api/_rateLimit.js", () => ({
  checkRateLimit: mockCheckRateLimit,
  getClientIp: mockGetClientIp,
  rateLimitHeaders: mockRateLimitHeaders,
  get redis() {
    return mockRedis;
  },
}));

vi.mock("../../api/_cors.js", () => ({
  applyCorsHeaders: mockApplyCorsHeaders,
  isOriginAllowed: mockIsOriginAllowed,
}));

vi.mock("../../api/_retrievalHealthStore.js", () => ({
  getRetrievalHealthSnapshot: mockGetRetrievalHealthSnapshot,
  getTrendlineSnapshots: mockGetTrendlineSnapshots,
  getFailureScenarioPage: mockGetFailureScenarioPage,
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
      retentionMs: 86_400_000,
      historyMode: "all_time_capped",
      historyMaxEvents: 10_000,
      totalStoredEvents: 10,
      windows: { fiveMinutes: {}, oneHour: {} },
      recentFailures: [
        {
          ts: new Date(1).toISOString(),
          endpoint: "analyze",
          reason: "no_verified",
          classId: "trial_delay",
          issuePrimary: "trial_delay",
        },
      ],
    });
    mockGetTrendlineSnapshots.mockResolvedValue([
      { ts: 1, errorRate: null, noVerifiedRate: null, avgLatencyMs: null },
    ]);
    mockGetFailureScenarioPage.mockResolvedValue({
      items: [
        {
          ts: new Date(1).toISOString(),
          endpoint: "analyze",
          reason: "no_verified",
          classId: "trial_delay",
          issuePrimary: "trial_delay",
        },
      ],
      hasMore: false,
      nextOffset: null,
      nextBeforeTs: null,
      totalFailures: 1,
      limit: 20,
      offset: 0,
    });
    process.env.RETRIEVAL_HEALTH_TOKEN = "test-token";
  });

  afterEach(() => {
    process.env.RETRIEVAL_HEALTH_TOKEN = originalToken;
  });

  it("returns 200 for OPTIONS preflight", async () => {
    const req = { method: "OPTIONS", headers: {} };
    const res = createRes();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.ended).toBe(true);
    expect(mockCheckRateLimit).not.toHaveBeenCalled();
    expect(mockApplyCorsHeaders).toHaveBeenCalledWith(
      req,
      res,
      "GET, OPTIONS",
      "Authorization, Content-Type",
    );
  });

  it("returns 405 for non-GET methods", async () => {
    const req = { method: "POST", headers: {} };
    const res = createRes();

    await handler(req, res);

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
    const req = {
      method: "GET",
      headers: { authorization: "Bearer test-token" },
    };
    const res = createRes();

    await handler(req, res);

    expect(res.statusCode).toBe(429);
    expect(res.body).toEqual({
      error: "Rate limit exceeded. Please try again later.",
    });
  });

  it("returns 401 when auth token is missing or invalid", async () => {
    const req = { method: "GET", headers: { authorization: "Bearer wrong" } };
    const res = createRes();

    await handler(req, res);

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ error: "Unauthorized" });
  });

  it("returns 401 when token is not configured", async () => {
    process.env.RETRIEVAL_HEALTH_TOKEN = "";
    const req = {
      method: "GET",
      headers: { authorization: "Bearer anything" },
    };
    const res = createRes();

    await handler(req, res);

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ error: "Unauthorized" });
  });

  it("returns health snapshot payload for authorized requests", async () => {
    mockEvaluateRetrievalAlerts.mockReturnValue([{ code: "high_error_rate" }]);
    const req = {
      method: "GET",
      headers: { authorization: "Bearer test-token" },
    };
    const res = createRes();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      generatedAt: new Date(0).toISOString(),
      retentionMs: 86_400_000,
      historyMode: "all_time_capped",
      historyMaxEvents: 10_000,
      totalStoredEvents: 10,
      recentFailures: [
        {
          ts: new Date(1).toISOString(),
          endpoint: "analyze",
          reason: "no_verified",
          classId: "trial_delay",
          issuePrimary: "trial_delay",
        },
      ],
      failureArchive: {
        items: [
          {
            ts: new Date(1).toISOString(),
            endpoint: "analyze",
            reason: "no_verified",
            classId: "trial_delay",
            issuePrimary: "trial_delay",
          },
        ],
        hasMore: false,
        nextOffset: null,
        nextBeforeTs: null,
        totalFailures: 1,
        limit: 20,
        offset: 0,
      },
      trendline: [
        { ts: 1, errorRate: null, noVerifiedRate: null, avgLatencyMs: null },
      ],
      alerts: [{ code: "high_error_rate" }],
      thresholds: {
        highErrorRate: 0.2,
        highNoVerifiedRate: 0.7,
      },
    });
    expect(Array.isArray(res.body.improvements)).toBe(true);
    expect(res.headers["X-RateLimit-Limit"]).toBe("60");
    expect(res.headers["X-Content-Type-Options"]).toBe("nosniff");
    expect(res.headers["X-Frame-Options"]).toBe("DENY");
    expect(res.headers["Referrer-Policy"]).toBe(
      "strict-origin-when-cross-origin",
    );
    expect(res.headers["Content-Security-Policy"]).toBe("default-src 'none'");
  });

  it("clamps archive pagination query params before reading failures", async () => {
    const req = {
      method: "GET",
      url: "/api/retrieval-health?failureLimit=999&failuresBeforeTs=Infinity&failuresOffset=5000",
      headers: { authorization: "Bearer test-token" },
    };
    const res = createRes();

    await handler(req, res);

    expect(mockGetFailureScenarioPage).toHaveBeenCalledWith({
      limit: 100,
      beforeTs: null,
      offset: 1000,
    });
  });

  // Regression: the response cache key must be derived from the CLAMPED params, not
  // the raw req.url. Two requests whose raw params differ but clamp to the same values
  // must resolve to the same cache entry (second request = cache hit), preventing
  // cache fragmentation / unbounded 7-day-TTL growth from unclamped query values.
  it("keys the response cache on clamped params (no fragmentation from out-of-range values)", async () => {
    const store = new Map();
    mockRedis = {
      get: vi.fn((key) => Promise.resolve(store.get(key) ?? null)),
      setex: vi.fn((key, _ttl, value) => {
        store.set(key, value);
        return Promise.resolve("OK");
      }),
    };

    try {
      // First request: failuresOffset=5000 clamps to 1000.
      const req1 = {
        method: "GET",
        url: "/api/retrieval-health?failureLimit=999&failuresOffset=5000",
        headers: { authorization: "Bearer test-token" },
      };
      await handler(req1, createRes());

      // Second request: a DIFFERENT raw offset (99999) that clamps to the SAME 1000.
      const req2 = {
        method: "GET",
        url: "/api/retrieval-health?failureLimit=12345&failuresOffset=99999",
        headers: { authorization: "Bearer test-token" },
      };
      const res2 = createRes();
      await handler(req2, res2);

      // Exactly one cache entry was written (both requests share the clamped key:
      // limit=100, offset=1000), and the second request was served from cache.
      expect(store.size).toBe(1);
      expect(mockRedis.setex).toHaveBeenCalledTimes(1);
      expect(res2.statusCode).toBe(200);
      // Second request hit the cache, so the upstream store was only read once total.
      expect(mockGetFailureScenarioPage).toHaveBeenCalledTimes(1);
      // The key reflects clamped values, not the raw query string.
      const writtenKey = [...store.keys()][0];
      expect(writtenKey).toContain("v2:100:none:1000");
      expect(writtenKey).not.toContain("5000");
      expect(writtenKey).not.toContain("99999");
    } finally {
      mockRedis = null;
    }
  });

  it("passes through upstream 4xx errors unchanged", async () => {
    const upstreamError = new Error("bad request");
    upstreamError.status = 400;
    mockGetRetrievalHealthSnapshot.mockRejectedValue(upstreamError);
    const req = {
      method: "GET",
      headers: { authorization: "Bearer test-token" },
    };
    const res = createRes();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Internal server error" });
  });

  it("maps upstream 5xx errors to 502", async () => {
    const upstreamError = new Error("upstream failed");
    upstreamError.status = 503;
    mockGetRetrievalHealthSnapshot.mockRejectedValue(upstreamError);
    const req = {
      method: "GET",
      headers: { authorization: "Bearer test-token" },
    };
    const res = createRes();

    await handler(req, res);

    expect(res.statusCode).toBe(502);
    expect(res.body).toEqual({ error: "Internal server error" });
  });
});
