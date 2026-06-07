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

// Mock Supabase admin client
const mockSupabaseSignUp = vi.fn();
const mockSupabaseSignIn = vi.fn();
const mockSupabaseGetUser = vi.fn();
const mockSupabaseSignOut = vi.fn();

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({
    auth: {
      signUp: mockSupabaseSignUp,
      signInWithPassword: mockSupabaseSignIn,
      getUser: mockSupabaseGetUser,
      signOut: mockSupabaseSignOut,
    },
  })),
}));

// ── Request / response helpers ────────────────────────────────────────────────

function makeReq(body, method = "POST", headers = {}) {
  return {
    method,
    headers: {
      "content-type": "application/json",
      origin: "https://casedive.ca",
      ...headers,
    },
    body,
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

describe("api/auth.js", () => {
  let handler;

  beforeEach(async () => {
    vi.resetModules();
    mockCheckRateLimit.mockResolvedValue({ allowed: true });
    mockSupabaseSignUp.mockResolvedValue({
      data: { user: { id: "uid-1", email: "test@example.com" } },
      error: null,
    });
    mockSupabaseSignIn.mockResolvedValue({
      data: { user: { id: "uid-1" }, session: { access_token: "tok-abc" } },
      error: null,
    });
    mockSupabaseGetUser.mockResolvedValue({
      data: { user: { id: "uid-1", email: "test@example.com" } },
      error: null,
    });
    process.env.SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_KEY = "service-key-test";
    const mod = await import("../../api/auth.js");
    handler = mod.default;
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_KEY;
  });

  // ── Security headers ────────────────────────────────────────────────────────

  it("sets standard security headers on every response", async () => {
    const req = makeReq({
      action: "signin",
      email: "a@b.com",
      password: "pass123!",
    });
    const res = makeRes();
    await handler(req, res);
    expect(res._headers["X-Content-Type-Options"]).toBe("nosniff");
    expect(res._headers["X-Frame-Options"]).toBe("DENY");
  });

  it("returns 405 for non-POST requests", async () => {
    const req = makeReq({}, "GET");
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(405);
  });

  it("returns 403 for disallowed origins", async () => {
    mockIsOriginAllowed.mockReturnValueOnce(false);
    const req = makeReq(
      { action: "signin", email: "a@b.com", password: "pass123!" },
      "POST",
      { origin: "https://evil.com" },
    );
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(403);
  });

  // ── Rate limiting ───────────────────────────────────────────────────────────

  it("returns 429 when rate limit exceeded", async () => {
    mockCheckRateLimit.mockResolvedValue({
      allowed: false,
      reason: "exceeded",
    });
    const req = makeReq({
      action: "signin",
      email: "a@b.com",
      password: "pass123!",
    });
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(429);
  });

  it("uses a stricter auth-specific rate limit (max 10/hr per IP)", async () => {
    // Verify checkRateLimit is called with auth-specific config (limit ≥ 10, window = 1hr)
    const req = makeReq({
      action: "signin",
      email: "a@b.com",
      password: "pass123!",
    });
    const res = makeRes();
    await handler(req, res);
    expect(mockCheckRateLimit).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        max: expect.any(Number),
        windowMs: 60 * 60 * 1000,
      }),
    );
    const callArgs = mockCheckRateLimit.mock.calls[0][1];
    expect(callArgs.max).toBeLessThanOrEqual(10);
  });

  // ── Input validation ────────────────────────────────────────────────────────

  it("returns 400 when action is missing", async () => {
    const req = makeReq({ email: "a@b.com", password: "pass123!" });
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(400);
    expect(res._body.error).toMatch(/action/i);
  });

  it("returns 400 for unknown action", async () => {
    const req = makeReq({
      action: "delete_user",
      email: "a@b.com",
      password: "pass123!",
    });
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(400);
  });

  it("returns 400 when email is malformed", async () => {
    const req = makeReq({
      action: "signin",
      email: "not-an-email",
      password: "pass123!",
    });
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(400);
    expect(res._body.error).toMatch(/email/i);
  });

  it("returns 400 when password is too short (< 8 chars)", async () => {
    const req = makeReq({
      action: "signup",
      email: "a@b.com",
      password: "abc",
    });
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(400);
    expect(res._body.error).toMatch(/password/i);
  });

  // ── Sign-up ─────────────────────────────────────────────────────────────────

  it("signs up a new user and returns user id", async () => {
    const req = makeReq({
      action: "signup",
      email: "new@casedive.ca",
      password: "SecurePass1!",
    });
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(200);
    expect(res._body).toMatchObject({
      user: { id: "uid-1", email: "test@example.com" },
    });
  });

  it("returns 409 when email already registered", async () => {
    mockSupabaseSignUp.mockResolvedValueOnce({
      data: {},
      error: { message: "User already registered", status: 400 },
    });
    const req = makeReq({
      action: "signup",
      email: "existing@casedive.ca",
      password: "SecurePass1!",
    });
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(409);
  });

  // ── Sign-in ─────────────────────────────────────────────────────────────────

  it("signs in and returns session token", async () => {
    const req = makeReq({
      action: "signin",
      email: "a@b.com",
      password: "SecurePass1!",
    });
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(200);
    expect(res._body).toMatchObject({ session: { access_token: "tok-abc" } });
  });

  it("returns 401 for invalid credentials", async () => {
    mockSupabaseSignIn.mockResolvedValueOnce({
      data: {},
      error: { message: "Invalid login credentials", status: 400 },
    });
    const req = makeReq({
      action: "signin",
      email: "a@b.com",
      password: "wrongpass!",
    });
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(401);
  });

  // ── Token verification ──────────────────────────────────────────────────────

  it("verifies a valid JWT token", async () => {
    const req = makeReq({ action: "verify" }, "POST", {
      authorization: "Bearer tok-abc",
    });
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(200);
    expect(res._body.user).toBeDefined();
  });

  it("returns 401 for invalid/missing token on verify", async () => {
    mockSupabaseGetUser.mockResolvedValueOnce({
      data: { user: null },
      error: { message: "invalid token" },
    });
    const req = makeReq({ action: "verify" }, "POST", {
      authorization: "Bearer bad-token",
    });
    const res = makeRes();
    await handler(req, res);
    expect(res._status).toBe(401);
  });

  // ── Password never logged ───────────────────────────────────────────────────

  it("does not echo password back in any response", async () => {
    const req = makeReq({
      action: "signin",
      email: "a@b.com",
      password: "MySecret99!",
    });
    const res = makeRes();
    await handler(req, res);
    expect(JSON.stringify(res._body)).not.toContain("MySecret99!");
  });
});
