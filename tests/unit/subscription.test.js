import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const ORIGINAL_ENV = { ...process.env };

const mockGetUser = vi.fn();
const mockMaybeSingle = vi.fn();
const mockCheckRateLimit = vi.fn(async (identity, endpoint, options) => ({
  allowed: true,
  limit: options?.limit ?? 0,
  remaining: 0,
  __identity: identity,
}));
const mockGetClientIp = vi.fn(() => "9.9.9.9");

// Re-import the module fresh so the cached Supabase client and current env are
// picked up per test (mirrors tests/unit/rateLimit.test.js).
async function loadModule() {
  vi.resetModules();
  vi.doMock("@supabase/supabase-js", () => ({
    createClient: () => ({
      auth: { getUser: mockGetUser },
      from: () => ({
        select: () => ({
          eq: () => ({ maybeSingle: mockMaybeSingle }),
        }),
      }),
    }),
  }));
  vi.doMock("../../api/_rateLimit.js", () => ({
    checkRateLimit: mockCheckRateLimit,
    getClientIp: mockGetClientIp,
  }));
  return import("../../api/_subscription.js");
}

function reqWith(token) {
  return { headers: token ? { authorization: `Bearer ${token}` } : {} };
}

beforeEach(() => {
  vi.clearAllMocks();
  process.env.SUPABASE_URL = "https://example.supabase.co";
  process.env.SUPABASE_SERVICE_KEY = "service-key";
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.resetModules();
  vi.doUnmock("@supabase/supabase-js");
  vi.doUnmock("../../api/_rateLimit.js");
  process.env = { ...ORIGINAL_ENV };
});

describe("plan limit config", () => {
  it("maps each plan to its hourly abuse limit; free matches the legacy anon cap", async () => {
    const m = await loadModule();
    expect(m.getHourlyRateLimit("free")).toBe(5);
    expect(m.getHourlyRateLimit("plus")).toBe(100);
    expect(m.getHourlyRateLimit("student")).toBe(100);
  });

  it("falls back to the free limit for an unknown plan", async () => {
    const m = await loadModule();
    expect(m.getHourlyRateLimit("enterprise")).toBe(5);
    expect(m.getPlanLimits("nonsense").label).toBe("Free");
  });
});

describe("getBearerToken", () => {
  it("extracts a Bearer token and returns null otherwise", async () => {
    const m = await loadModule();
    expect(m.getBearerToken({ headers: { authorization: "Bearer abc" } })).toBe(
      "abc",
    );
    expect(m.getBearerToken({ headers: { authorization: "Basic abc" } })).toBe(
      null,
    );
    expect(m.getBearerToken({ headers: {} })).toBe(null);
    expect(m.getBearerToken({})).toBe(null);
  });
});

describe("resolvePlan", () => {
  it("returns free for an anonymous request without touching Supabase", async () => {
    const m = await loadModule();
    expect(await m.resolvePlan(null)).toBe("free");
    expect(mockGetUser).not.toHaveBeenCalled();
  });

  it("returns free when Supabase is not configured", async () => {
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_KEY;
    const m = await loadModule();
    expect(await m.resolvePlan("some-token")).toBe("free");
  });

  it("returns the paid plan for an active subscriber", async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: "u1" } }, error: null });
    mockMaybeSingle.mockResolvedValue({
      data: { plan: "plus", status: "active" },
      error: null,
    });
    const m = await loadModule();
    expect(await m.resolvePlan("tok")).toBe("plus");
  });

  it("downgrades a non-entitled status (e.g. past_due) to free", async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: "u1" } }, error: null });
    mockMaybeSingle.mockResolvedValue({
      data: { plan: "plus", status: "past_due" },
      error: null,
    });
    const m = await loadModule();
    expect(await m.resolvePlan("tok")).toBe("free");
  });

  it("degrades to free on an auth error", async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: { message: "bad" } });
    const m = await loadModule();
    expect(await m.resolvePlan("tok")).toBe("free");
  });

  it("degrades to free if the subscriptions lookup throws", async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: "u1" } }, error: null });
    mockMaybeSingle.mockRejectedValue(new Error("db down"));
    const m = await loadModule();
    expect(await m.resolvePlan("tok")).toBe("free");
  });
});

describe("checkRequestRateLimit", () => {
  it("keys anonymous requests on the client IP with the free limit", async () => {
    const m = await loadModule();
    const { result, identity, plan } = await m.checkRequestRateLimit(
      reqWith(null),
      "analyze",
    );
    expect(identity).toBe("9.9.9.9");
    expect(plan).toBe("free");
    expect(mockCheckRateLimit).toHaveBeenCalledWith("9.9.9.9", "analyze", {
      limit: 5,
    });
    expect(result.limit).toBe(5);
  });

  it("keys an authenticated paid user on user:<id> with the plan limit", async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: "u42" } }, error: null });
    mockMaybeSingle.mockResolvedValue({
      data: { plan: "plus", status: "active" },
      error: null,
    });
    const m = await loadModule();
    const { identity, plan, userId } = await m.checkRequestRateLimit(
      reqWith("tok"),
      "analyze",
    );
    expect(userId).toBe("u42");
    expect(plan).toBe("plus");
    expect(identity).toBe("user:u42");
    expect(mockCheckRateLimit).toHaveBeenCalledWith("user:u42", "analyze", {
      limit: 100,
    });
    // A real IP can never collide with the user namespace.
    expect(mockGetClientIp).not.toHaveBeenCalled();
  });
});
