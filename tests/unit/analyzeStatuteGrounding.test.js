import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Handler-level checks for the STATUTE_GROUNDING flag. Mocks mirror
// analyzeApi.test.js; the model is a stub, so this proves the wiring (prompt
// content, post-check, cache key), not the model's behaviour. The live model
// is checked by scripts/evaluate-statute-grounding.mjs.

const mockCheckRateLimit = vi.fn();
const mockRetrieveVerifiedCaseLaw = vi.fn();
let mockRedis = null;

vi.mock("../../api/_rateLimit.js", () => ({
  get redis() {
    return mockRedis;
  },
  checkRateLimit: mockCheckRateLimit,
  getClientIp: vi.fn(() => "127.0.0.1"),
  rateLimitHeaders: vi.fn(() => ({})),
}));
vi.mock("../../api/_cors.js", () => ({
  applyCorsHeaders: vi.fn(),
  isOriginAllowed: vi.fn(() => true),
}));
vi.mock("../../api/_logging.js", () => ({
  logRequestStart: vi.fn(),
  logRateLimitCheck: vi.fn(),
  logValidationError: vi.fn(),
  logCacheHit: vi.fn(),
  logCacheMiss: vi.fn(),
  logExternalApiCall: vi.fn(),
  logSuccess: vi.fn(),
  logError: vi.fn(),
}));
vi.mock("../../api/_retrievalMetrics.js", () => ({
  logRetrievalMetrics: vi.fn(),
}));
vi.mock("../../api/_sentry.js", () => ({
  initSentry: vi.fn(),
  Sentry: { captureException: vi.fn() },
}));
vi.mock("../../api/_caseLawRetrieval.js", () => ({
  retrieveVerifiedCaseLaw: mockRetrieveVerifiedCaseLaw,
}));
vi.mock("../../src/lib/caselaw/index.js", () => ({ MASTER_CASE_LAW_DB: [] }));

const { default: handler } = await import("../../api/analyze.js");

function createRes() {
  return {
    statusCode: null,
    headers: {},
    body: null,
    setHeader(k, v) {
      this.headers[k] = v;
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
      return this;
    },
  };
}

function aiResponse(civil_law) {
  return JSON.stringify({
    summary: "s",
    criminal_code: [],
    case_law: [],
    civil_law,
    charter: [],
    analysis: "a",
    suggestions: [],
  });
}

function stubAnthropic(civil_law) {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({ content: [{ text: aiResponse(civil_law) }] }),
  });
}

async function run(scenario, filters) {
  const res = createRes();
  await handler(
    {
      method: "POST",
      body: { scenario, ...(filters ? { filters } : {}) },
      headers: { "content-type": "application/json", "content-length": "100" },
    },
    res,
  );
  const call = globalThis.fetch.mock.calls.find((c) =>
    String(c[0]).includes("api.anthropic.com"),
  );
  const sent = JSON.parse(call[1].body);
  const system = Array.isArray(sent.system)
    ? sent.system.map((b) => b.text).join("")
    : sent.system;
  const user =
    typeof sent.messages[0].content === "string"
      ? sent.messages[0].content
      : sent.messages[0].content.map((b) => b.text || "").join("");
  return { res, system, user };
}

const originalFetch = globalThis.fetch;
const env = {
  flag: process.env.STATUTE_GROUNDING,
  anthropic: process.env.ANTHROPIC_API_KEY,
  canlii: process.env.CANLII_API_KEY,
};

beforeEach(() => {
  vi.clearAllMocks();
  mockRedis = null;
  mockCheckRateLimit.mockResolvedValue({
    allowed: true,
    limit: 60,
    remaining: 59,
    reset: 999,
  });
  process.env.ANTHROPIC_API_KEY = "test-anthropic-key";
  delete process.env.CANLII_API_KEY;
  mockRetrieveVerifiedCaseLaw.mockResolvedValue({
    cases: [],
    meta: { reason: "no_verified" },
  });
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const [k, v] of [
    ["STATUTE_GROUNDING", env.flag],
    ["ANTHROPIC_API_KEY", env.anthropic],
    ["CANLII_API_KEY", env.canlii],
  ]) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
});

const YOUTH_DRUG =
  "A 16-year-old was arrested with cocaine he planned to sell.";

describe("STATUTE_GROUNDING off (default)", () => {
  beforeEach(() => {
    delete process.env.STATUTE_GROUNDING;
  });

  it("sends no statute block, no hints, and leaves civil_law alone", async () => {
    stubAnthropic([{ citation: "CDSA s. 999", summary: "made up" }]);
    const { res, system, user } = await run(YOUTH_DRUG);
    expect(user).not.toContain("statute_db");
    expect(system).not.toContain("statute_db");
    expect(system).not.toContain("12-17");
    expect(res.body.civil_law).toHaveLength(1);
    expect(res.body.meta.statutes).toBeUndefined();
  });

  it("uses the unchanged cache key", async () => {
    stubAnthropic([]);
    const get = vi.fn().mockResolvedValue(null);
    mockRedis = { get, setex: vi.fn().mockResolvedValue("OK") };
    await run(YOUTH_DRUG);
    expect(get.mock.calls[0][0]).toMatch(/^cache:analyze:v4:/);
  });
});

describe("STATUTE_GROUNDING on", () => {
  beforeEach(() => {
    process.env.STATUTE_GROUNDING = "on";
  });

  it("offers verified candidates and civil_law rules for a youth drug scenario", async () => {
    stubAnthropic([{ citation: "CDSA s. 5", summary: "ok" }]);
    const { user, system } = await run(YOUTH_DRUG);
    expect(user).toContain('<reference_context source="statute_db">');
    expect(user).toContain("CDSA s. 5 (Trafficking in substance)");
    expect(user).toContain("YCJA s. 3 (");
    expect(system).toContain('written as "CDSA s. 5"');
    expect(system).toContain("at most 4 in civil_law");
    expect(system).toContain("In analysis, say only what the text");
    expect(system).toContain("Do not predict remedies");
    expect(system).toContain("12-17");
  });

  it("drops a hallucinated section and records the check", async () => {
    stubAnthropic([
      { citation: "CDSA s. 5", summary: "real" },
      { citation: "CDSA s. 999", summary: "made up" },
      { citation: "Highway Traffic Act s. 128", summary: "other act" },
    ]);
    const { res } = await run(YOUTH_DRUG);
    expect(res.body.civil_law.map((i) => i.citation)).toEqual([
      "CDSA s. 5",
      "Highway Traffic Act s. 128",
    ]);
    expect(res.body.meta.statutes.check).toEqual({
      checked: 2,
      verified: 1,
      dropped: ["CDSA s. 999"],
    });
    expect(res.body.meta.statutes.youth).toBe(true);
    expect(res.body.meta.statutes.candidates).toContain("YCJA s. 3");
  });

  it("puts the verified section text on cited statute items and drops the model's application line", async () => {
    stubAnthropic([
      {
        citation: "YCJA s. 26",
        summary: "model words",
        matched_section: "failure may undermine the confession",
      },
      {
        citation: "Highway Traffic Act s. 128",
        summary: "other act",
        matched_section: "kept",
      },
    ]);
    const { res } = await run(YOUTH_DRUG);
    const [ycja, other] = res.body.civil_law;
    expect(ycja.summary).toMatch(
      /^If a young person is arrested and detained pending court/,
    );
    expect(ycja).not.toHaveProperty("matched_section");
    expect(other.matched_section).toBe("kept");
    expect(res.body.meta.statutes.anchored).toBe(1);
  });

  it("leaves the model's wording alone when the flag is off", async () => {
    delete process.env.STATUTE_GROUNDING;
    const written = {
      citation: "YCJA s. 26",
      summary: "model words",
      matched_section: "model application",
    };
    stubAnthropic([{ ...written }]);
    const { res } = await run(YOUTH_DRUG);
    expect(res.body.civil_law[0]).toEqual(written);
  });

  it("checks citations even when the scenario itself raised no grounding", async () => {
    stubAnthropic([{ citation: "YCJA s. 999", summary: "made up" }]);
    const { res, user } = await run("A man stole a bike from a store.");
    expect(user).not.toContain("statute_db");
    expect(res.body.civil_law).toEqual([]);
    expect(res.body.meta.statutes.check.dropped).toEqual(["YCJA s. 999"]);
  });

  it("does nothing when the civil_law filter is off", async () => {
    stubAnthropic([{ citation: "CDSA s. 999", summary: "made up" }]);
    const { res, user } = await run(YOUTH_DRUG, {
      lawTypes: { civil_law: false },
    });
    expect(user).not.toContain("statute_db");
    expect(res.body.meta.statutes).toBeUndefined();
  });

  it("keys the cache separately so flag-off users never see grounded results", async () => {
    stubAnthropic([]);
    const get = vi.fn().mockResolvedValue(null);
    mockRedis = { get, setex: vi.fn().mockResolvedValue("OK") };
    await run(YOUTH_DRUG);
    expect(get.mock.calls[0][0]).toMatch(/^cache:analyze:v4g:/);
  });
});
