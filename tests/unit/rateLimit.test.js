import { afterEach, describe, expect, it, vi } from "vitest";

const ORIGINAL_ENV = { ...process.env };

function resetRateLimitEnv() {
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  delete process.env.KV_REST_API_URL;
  delete process.env.KV_REST_API_TOKEN;
  delete process.env.ALLOW_IN_MEMORY_RATE_LIMIT_FALLBACK;
  delete process.env.VERCEL_ENV;
  delete process.env.VERCEL;
}

async function loadRateLimitModule({ redisImpl = null } = {}) {
  vi.resetModules();
  if (redisImpl) {
    vi.doMock("@upstash/redis", () => ({
      Redis: class MockRedis {
        constructor() {
          return redisImpl;
        }
      },
    }));
  } else {
    vi.doMock("@upstash/redis", () => ({
      Redis: class MockRedis {
        constructor() {
          throw new Error(
            "Redis constructor should not be called in this test",
          );
        }
      },
    }));
  }
  return import("../../api/_rateLimit.js");
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.resetModules();
  vi.doUnmock("@upstash/redis");
  process.env = { ...ORIGINAL_ENV };
});

describe("rate limiter", () => {
  it("uses atomic Redis counters and sets expiry on the first hit", async () => {
    resetRateLimitEnv();
    process.env.UPSTASH_REDIS_REST_URL = "https://redis.example";
    process.env.UPSTASH_REDIS_REST_TOKEN = "token";
    process.env.VERCEL_ENV = "production";

    const redisImpl = {
      incr: vi.fn().mockResolvedValue(1),
      expire: vi.fn().mockResolvedValue(1),
    };

    const { checkRateLimit } = await loadRateLimitModule({ redisImpl });
    const result = await checkRateLimit("1.2.3.4", "analyze");

    expect(redisImpl.incr).toHaveBeenCalledTimes(1);
    expect(redisImpl.expire).toHaveBeenCalledTimes(1);
    expect(result).toMatchObject({
      allowed: true,
      limit: 5,
      remaining: 4,
      reason: null,
    });
  });

  it("fails closed in production when Redis is unavailable", async () => {
    resetRateLimitEnv();
    process.env.UPSTASH_REDIS_REST_URL = "https://redis.example";
    process.env.UPSTASH_REDIS_REST_TOKEN = "token";
    process.env.VERCEL_ENV = "production";

    const redisImpl = {
      incr: vi.fn().mockRejectedValue(new Error("redis down")),
      expire: vi.fn(),
    };

    const { checkRateLimit } = await loadRateLimitModule({ redisImpl });
    const result = await checkRateLimit("1.2.3.4", "analyze");

    expect(result.allowed).toBe(false);
    expect(result.reason).toBe("backend_unavailable");
    expect(result.retryAfterSeconds).toBe(60);
  });

  it("falls back to in-memory counters in development", async () => {
    resetRateLimitEnv();
    process.env.VERCEL_ENV = "development";

    const { checkRateLimit } = await loadRateLimitModule();

    let result = null;
    for (let i = 0; i < 6; i += 1) {
      result = await checkRateLimit("1.2.3.4", "analyze");
    }

    expect(result).toMatchObject({
      allowed: false,
      limit: 5,
      remaining: 0,
      reason: null,
    });
  });

  it("prefers trusted platform IP headers and ignores spoofed x-forwarded-for on Vercel", async () => {
    resetRateLimitEnv();
    process.env.VERCEL_ENV = "production";

    const { getClientIp } = await loadRateLimitModule();
    const ip = getClientIp({
      headers: {
        "x-vercel-id": "iad1::abc",
        "x-real-ip": "2.2.2.2",
        "x-forwarded-for": "9.9.9.9",
      },
      socket: {},
    });

    expect(ip).toBe("2.2.2.2");
  });

  it("prefers x-vercel-forwarded-for over other candidates", async () => {
    resetRateLimitEnv();
    process.env.VERCEL_ENV = "production";

    const { getClientIp } = await loadRateLimitModule();
    const ip = getClientIp({
      headers: {
        "x-vercel-forwarded-for": "4.4.4.4, 5.5.5.5",
        "x-real-ip": "2.2.2.2",
        "x-forwarded-for": "9.9.9.9",
      },
      socket: {},
    });

    expect(ip).toBe("4.4.4.4");
  });

  it("collapses malformed/injected IP header values into the shared 'unknown' bucket", async () => {
    resetRateLimitEnv();
    process.env.VERCEL_ENV = "production";

    const { getClientIp } = await loadRateLimitModule();
    // A value that is not an IP shape (e.g. a key-injection attempt) must not
    // be used verbatim as a Redis key.
    const ip = getClientIp({
      headers: { "x-vercel-forwarded-for": "rl:analyze:victim:0" },
      socket: {},
    });

    expect(ip).toBe("unknown");
  });

  // Security regression (CWE-770): on Vercel, a client cannot escape its rate-limit
  // bucket by spoofing the freely-settable X-Forwarded-For header. Two requests that
  // are identical except for X-Forwarded-For, with the trusted platform header held
  // constant, must resolve to the same bucket key.
  it("does not let a spoofed x-forwarded-for create a fresh rate-limit bucket on Vercel", async () => {
    resetRateLimitEnv();
    process.env.UPSTASH_REDIS_REST_URL = "https://redis.example";
    process.env.UPSTASH_REDIS_REST_TOKEN = "token";
    process.env.VERCEL_ENV = "production";

    const seen = [];
    const redisImpl = {
      incr: vi.fn((key) => {
        seen.push(key);
        return Promise.resolve(seen.filter((k) => k === key).length);
      }),
      expire: vi.fn().mockResolvedValue(1),
    };

    const { checkRateLimit, getClientIp } = await loadRateLimitModule({
      redisImpl,
    });

    const platformHeader = { "x-vercel-forwarded-for": "8.8.8.8" };
    const attempt = (spoofedXff) =>
      checkRateLimit(
        getClientIp({
          headers: { ...platformHeader, "x-forwarded-for": spoofedXff },
          socket: {},
        }),
        "analyze",
      );

    // First five exhaust the bucket; the sixth — with a rotated spoofed XFF —
    // must still be denied (same bucket), not reset to a fresh one.
    let last = null;
    for (let i = 0; i < 6; i += 1) {
      last = await attempt(`10.0.0.${i}`);
    }

    expect(last.allowed).toBe(false);
    // Every request hashed to the same key despite rotating X-Forwarded-For.
    expect(new Set(seen).size).toBe(1);
    expect(seen[0]).toContain("8.8.8.8");
  });
});
