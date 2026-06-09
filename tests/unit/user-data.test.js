import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── Module mocks ──────────────────────────────────────────────────────────────

const mockCheckRateLimit = vi.fn();
const mockGetClientIp = vi.fn(() => "127.0.0.1");
const mockRateLimitHeaders = vi.fn(() => ({}));
const mockApplyCorsHeaders = vi.fn();
const mockIsOriginAllowed = vi.fn(() => true);

vi.mock("../../api/_rateLimit.js", () => ({
  get redis() {
    return null;
  },
  checkRateLimit: mockCheckRateLimit,
  getClientIp: mockGetClientIp,
  rateLimitHeaders: mockRateLimitHeaders,
}));

vi.mock("../../api/_cors.js", () => ({
  applyCorsHeaders: mockApplyCorsHeaders,
  isOriginAllowed: mockIsOriginAllowed,
}));

vi.mock("../../api/_logging.js", () => ({
  logRequestStart: vi.fn(),
  logRateLimitCheck: vi.fn(),
  logValidationError: vi.fn(),
  logSuccess: vi.fn(),
  logError: vi.fn(),
}));

vi.mock("../../api/_sentry.js", () => ({
  captureException: vi.fn(),
}));

// Supabase admin mock (used for JWT verification)
const mockGetUser = vi.fn();
const mockFrom = vi.fn();
const mockSelect = vi.fn();
const mockInsert = vi.fn();
const mockUpsert = vi.fn();
const mockDelete = vi.fn();
const mockEq = vi.fn();
const mockOrder = vi.fn();
const mockLimit = vi.fn();

const mockQueryChain = {
  select: mockSelect,
  insert: mockInsert,
  upsert: mockUpsert,
  delete: mockDelete,
  eq: mockEq,
  order: mockOrder,
  limit: mockLimit,
};

// Each chained call returns the chain itself, except terminal ones
mockSelect.mockReturnValue(mockQueryChain);
mockEq.mockReturnValue(mockQueryChain);
mockOrder.mockReturnValue(mockQueryChain);
mockLimit.mockReturnValue(mockQueryChain);
mockDelete.mockReturnValue(mockQueryChain);

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({
    auth: { getUser: mockGetUser },
    from: mockFrom,
  })),
}));

// ── Request / response helpers ────────────────────────────────────────────────

function makeReq(method, body, token = "valid-token", headers = {}) {
  return {
    method,
    headers: {
      "content-type": "application/json",
      origin: "https://casedive.ca",
      authorization: token ? `Bearer ${token}` : undefined,
      ...headers,
    },
    body,
    query: {},
  };
}

function makeRes() {
  const res = {
    _status: 200,
    _body: null,
    _headers: {},
    status(code) {
      this._status = code;
      return this;
    },
    json(data) {
      this._body = data;
      return this;
    },
    setHeader(k, v) {
      this._headers[k] = v;
    },
    end() {},
  };
  return res;
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("api/user-data.js", () => {
  let handler;
  const VALID_USER = { id: "uid-1", email: "a@b.com" };

  beforeEach(async () => {
    vi.resetModules();
    mockCheckRateLimit.mockResolvedValue({ allowed: true });
    mockGetUser.mockResolvedValue({ data: { user: VALID_USER }, error: null });
    mockFrom.mockReturnValue(mockQueryChain);
    mockInsert.mockResolvedValue({ data: [], error: null });
    mockUpsert.mockResolvedValue({ data: [], error: null });
    mockSelect.mockReturnValue({
      ...mockQueryChain,
      then: (resolve) => resolve({ data: [], error: null }),
    });
    // delete().eq(...) is awaited directly in the POST replace path — make the
    // eq() after a delete resolve to a success result. GET path uses
    // eq().order().limit() which is overridden per-test below.
    mockDelete.mockReturnValue({
      eq: vi.fn().mockResolvedValue({ data: [], error: null }),
    });
    mockEq.mockReturnValue({
      ...mockQueryChain,
      order: () => ({
        limit: () => Promise.resolve({ data: [], error: null }),
      }),
    });
    process.env.SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_KEY = "service-key-test";
    const mod = await import("../../api/user-data.js");
    handler = mod.default;
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_KEY;
  });

  // ── Security headers ────────────────────────────────────────────────────────

  it("sets standard security headers", async () => {
    const req = makeReq("GET", null);
    req.query = { type: "bookmarks" };
    const res = makeRes();
    await handler(req, res);
    expect(res._headers["X-Content-Type-Options"]).toBe("nosniff");
    expect(res._headers["X-Frame-Options"]).toBe("DENY");
  });

  // ── Auth guard ──────────────────────────────────────────────────────────────

  it("returns 401 when no Authorization header present", async () => {
    const req = makeReq("GET", null, null);
    req.query = { type: "bookmarks" };
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(401);
  });

  it("returns 401 when token is invalid", async () => {
    mockGetUser.mockResolvedValueOnce({
      data: { user: null },
      error: { message: "invalid token" },
    });
    const req = makeReq("GET", null, "bad-token");
    req.query = { type: "bookmarks" };
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(401);
  });

  // ── Rate limiting ───────────────────────────────────────────────────────────

  it("returns 429 when rate limit exceeded", async () => {
    mockCheckRateLimit.mockResolvedValueOnce({
      allowed: false,
      reason: "exceeded",
    });
    const req = makeReq("GET", null);
    req.query = { type: "bookmarks" };
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(429);
  });

  // ── Input validation ────────────────────────────────────────────────────────

  it("returns 400 for unknown data type", async () => {
    const req = makeReq("GET", null);
    req.query = { type: "malware" };
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(400);
  });

  it("returns 405 for unsupported HTTP method", async () => {
    const req = makeReq("DELETE", null);
    req.query = { type: "bookmarks" };
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(405);
  });

  // ── GET bookmarks ───────────────────────────────────────────────────────────

  it("GET bookmarks returns array for authenticated user", async () => {
    const bookmarks = [
      { id: "b1", citation: "R v Jordan, 2016 SCC 27", bookmarkedAt: 1000 },
    ];
    mockEq.mockReturnValueOnce({
      order: () => ({
        limit: () => Promise.resolve({ data: bookmarks, error: null }),
      }),
    });
    const req = makeReq("GET", null);
    req.query = { type: "bookmarks" };
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(200);
    expect(Array.isArray(res._body.bookmarks)).toBe(true);
  });

  // ── POST bookmarks ──────────────────────────────────────────────────────────

  it("POST bookmarks replaces data for authenticated user (delete then insert)", async () => {
    const bookmarks = [
      { citation: "R v Grant, 2009 SCC 32", summary: "Charter s.24(2)" },
    ];
    const req = makeReq("POST", { type: "bookmarks", data: bookmarks });
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(200);
    expect(res._body).toMatchObject({ ok: true });
    // Replace semantics: the user's existing rows are deleted, then the new
    // set is inserted. This is what makes removals/clears propagate and
    // prevents duplicate accumulation on every sync.
    expect(mockDelete).toHaveBeenCalled();
    expect(mockInsert).toHaveBeenCalled();
    // The inserted rows must carry the verified user's id, never the client's.
    const insertedRows = mockInsert.mock.calls[0][0];
    expect(insertedRows.every((r) => r.user_id === VALID_USER.id)).toBe(true);
    // Client-supplied id must NOT survive into the DB row.
    expect(insertedRows.every((r) => !("id" in r))).toBe(true);
  });

  it("POST with empty array clears the user's rows (delete, no insert)", async () => {
    const req = makeReq("POST", { type: "bookmarks", data: [] });
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(200);
    expect(res._body).toMatchObject({ ok: true });
    // Clear = delete all, insert nothing.
    expect(mockDelete).toHaveBeenCalled();
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("POST bookmarks rejects payload over 200 items (logged-in limit)", async () => {
    const tooMany = Array.from({ length: 201 }, (_, i) => ({
      citation: `R v Case${i}, 2020 SCC ${i}`,
    }));
    const req = makeReq("POST", { type: "bookmarks", data: tooMany });
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(400);
  });

  // ── GET history ─────────────────────────────────────────────────────────────

  it("GET history returns array for authenticated user", async () => {
    const history = [{ id: "h1", query: "assault", timestamp: 1000 }];
    mockEq.mockReturnValueOnce({
      order: () => ({
        limit: () => Promise.resolve({ data: history, error: null }),
      }),
    });
    const req = makeReq("GET", null);
    req.query = { type: "history" };
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(200);
    expect(Array.isArray(res._body.history)).toBe(true);
  });

  // ── GET scenarios ───────────────────────────────────────────────────────────

  it("GET scenarios returns array for authenticated user", async () => {
    const scenarios = [
      {
        id: "s1",
        name: "Impaired driving",
        text: "A driver was pulled over...",
        savedAt: 1000,
      },
    ];
    mockEq.mockReturnValueOnce({
      order: () => ({
        limit: () => Promise.resolve({ data: scenarios, error: null }),
      }),
    });
    const req = makeReq("GET", null);
    req.query = { type: "scenarios" };
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(200);
    expect(Array.isArray(res._body.scenarios)).toBe(true);
  });

  it("POST scenarios rejects payload over 50 items", async () => {
    const tooMany = Array.from({ length: 51 }, (_, i) => ({
      name: `Scenario ${i}`,
      text: "Some text",
    }));
    const req = makeReq("POST", { type: "scenarios", data: tooMany });
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(400);
  });

  // ── Data isolation ──────────────────────────────────────────────────────────

  it("queries are scoped to the authenticated user id", async () => {
    const req = makeReq("GET", null);
    req.query = { type: "bookmarks" };
    const res = makeRes();
    await handler(req, res);
    // eq should be called with user_id = VALID_USER.id to scope the query
    const eqCalls = mockEq.mock.calls;
    const scopedToUser = eqCalls.some(
      (call) => call[0] === "user_id" && call[1] === VALID_USER.id,
    );
    expect(scopedToUser).toBe(true);
  });
});
