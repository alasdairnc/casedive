import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockCheckRateLimit = vi.fn();
const mockGetClientIp = vi.fn(() => "127.0.0.1");
const mockRateLimitHeaders = vi.fn(() => ({ "X-RateLimit-Limit": "20" }));
const mockApplyCorsHeaders = vi.fn();
const mockIsOriginAllowed = vi.fn(() => true);
let mockRedis = null;

vi.mock("../../api/_rateLimit.js", () => ({
  get redis() {
    return mockRedis;
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

const { default: handler } = await import("../../api/export-pdf.js");

const RESULTS = {
  scenario: "Someone took a bike that was locked outside a store.",
  summary: "The facts point to theft.",
  criminal_code: [{ section: "s. 322", summary: "Theft." }],
  case_law: [
    {
      citation: "R v Jordan, 2016 SCC 27",
      summary: "Presumptive ceilings for trial delay.",
    },
  ],
  civil_law: [],
  charter: [],
  analysis: "A conviction needs proof of intent to deprive.",
  verifications: { "R v Jordan, 2016 SCC 27": { status: "verified" } },
};

function createReq({ method = "POST", body = RESULTS, headers = {} } = {}) {
  return {
    method,
    body,
    headers: {
      "content-type": "application/json",
      ...headers,
    },
  };
}

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
    send(payload) {
      this.body = payload;
      return this;
    },
    end() {
      this.ended = true;
      return this;
    },
  };
}

async function run(reqOptions) {
  const res = createRes();
  await handler(createReq(reqOptions), res);
  return res;
}

describe("export-pdf handler", () => {
  const originalEnv = {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRedis = null;
    mockCheckRateLimit.mockResolvedValue({
      allowed: true,
      limit: 20,
      remaining: 19,
      reset: 123,
    });
    // Anonymous callers: the rate limit keys on the client IP, not Supabase.
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_KEY;
  });

  afterEach(() => {
    for (const [name, value] of Object.entries(originalEnv)) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  });

  it("returns 405 for methods other than POST", async () => {
    const res = await run({ method: "GET" });

    expect(res.statusCode).toBe(405);
    expect(res.body).toEqual({ error: "Method not allowed" });
    expect(mockCheckRateLimit).not.toHaveBeenCalled();
  });

  it("returns 403 for a disallowed origin", async () => {
    mockIsOriginAllowed.mockReturnValueOnce(false);

    const res = await run({ headers: { origin: "https://evil.example" } });

    expect(res.statusCode).toBe(403);
    expect(res.body).toEqual({ error: "Origin not allowed" });
    expect(mockCheckRateLimit).not.toHaveBeenCalled();
  });

  it("returns 415 when the content type is not JSON", async () => {
    const res = await run({ headers: { "content-type": "text/plain" } });

    expect(res.statusCode).toBe(415);
    expect(mockCheckRateLimit).not.toHaveBeenCalled();
  });

  it("returns 413 when the body exceeds 200kb", async () => {
    const res = await run({
      body: { ...RESULTS, analysis: "x".repeat(200_001) },
    });

    expect(res.statusCode).toBe(413);
    expect(res.body).toEqual({ error: "Request body too large" });
    expect(mockCheckRateLimit).not.toHaveBeenCalled();
  });

  it("returns 429 with rate-limit headers when the limit is exceeded", async () => {
    mockCheckRateLimit.mockResolvedValue({
      allowed: false,
      limit: 20,
      remaining: 0,
      reset: 123,
    });

    const res = await run();

    expect(res.statusCode).toBe(429);
    expect(res.headers["X-RateLimit-Limit"]).toBe("20");
    expect(res.headers["Content-Type"]).toBeUndefined();
  });

  it("returns 400 when the body is missing", async () => {
    const res = await run({ body: null });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Request body is required" });
  });

  it("returns 400 when there are no results to export", async () => {
    const res = await run({ body: { scenario: RESULTS.scenario } });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Results data is required" });
  });

  it("returns a PDF attachment with the security headers", async () => {
    const res = await run();

    expect(res.statusCode).toBe(200);
    expect(Buffer.isBuffer(res.body)).toBe(true);
    expect(res.body.subarray(0, 5).toString("latin1")).toBe("%PDF-");
    expect(res.body.subarray(-16).toString("latin1")).toContain("%%EOF");
    expect(res.headers).toMatchObject({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="casedive-analysis.pdf"',
      "Content-Length": res.body.length,
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Cache-Control": "no-store",
    });
  });

  it("caches the generated PDF for 7 days", async () => {
    const setex = vi.fn().mockResolvedValue("OK");
    mockRedis = { get: vi.fn().mockResolvedValue(null), setex };

    const res = await run();

    expect(setex).toHaveBeenCalledWith(
      expect.stringMatching(/^cache:export-pdf:[0-9a-f]{64}$/),
      604800,
      res.body.toString("base64"),
    );
  });

  it("serves a cached PDF as-is", async () => {
    const cachedPdf = Buffer.from("%PDF-1.3 cached copy\n%%EOF");
    mockRedis = {
      get: vi.fn().mockResolvedValue(cachedPdf.toString("base64")),
      setex: vi.fn(),
    };

    const res = await run();

    expect(res.statusCode).toBe(200);
    expect(res.body.equals(cachedPdf)).toBe(true);
    expect(res.headers["Content-Length"]).toBe(cachedPdf.length);
    expect(mockRedis.setex).not.toHaveBeenCalled();
  });
});
