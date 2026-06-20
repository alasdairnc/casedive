import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── Shared mocks ──────────────────────────────────────────────────────────────
const mockCheckRequestRateLimit = vi.fn(async () => ({
  result: { allowed: true, limit: 100, remaining: 99 },
  identity: "user:u1",
}));
const mockGetAuthedUser = vi.fn();
const mockGetServiceClient = vi.fn();
const mockGetBearerToken = vi.fn(() => "tok");

const mockStripe = {
  checkout: { sessions: { create: vi.fn() } },
  billingPortal: { sessions: { create: vi.fn() } },
  subscriptions: { retrieve: vi.fn() },
  webhooks: { constructEvent: vi.fn() },
};
const mockIsStripeConfigured = vi.fn(() => true);

vi.mock("../../api/_subscription.js", () => ({
  checkRequestRateLimit: mockCheckRequestRateLimit,
  getAuthedUser: mockGetAuthedUser,
  getServiceClient: mockGetServiceClient,
  getBearerToken: mockGetBearerToken,
}));

vi.mock("../../api/_stripe.js", () => ({
  getStripe: () => mockStripe,
  isStripeConfigured: mockIsStripeConfigured,
  planToPriceId: (plan) => (plan === "plus" ? "price_plus" : null),
  priceToPlan: (id) => (id === "price_plus" ? "plus" : null),
  CHECKOUT_PLANS: new Set(["plus", "student"]),
}));

vi.mock("../../api/_rateLimit.js", () => ({
  rateLimitHeaders: () => ({ "X-RateLimit-Limit": "100" }),
}));

// NB: _logging is intentionally NOT mocked. The real logging helpers have
// strict arg orders (e.g. logRequestStart(req, ...), logSuccess(..., rlResult))
// that a mock silently swallows — running them for real catches those bugs.

vi.mock("../../api/_cors.js", () => ({
  applyCorsHeaders: vi.fn(),
  isOriginAllowed: () => true,
}));

const { default: billingHandler } = await import("../../api/billing.js");
const { default: webhookHandler } = await import("../../api/stripe-webhook.js");

// ── Helpers ───────────────────────────────────────────────────────────────────
function createRes() {
  return {
    statusCode: null,
    headers: {},
    body: null,
    setHeader(k, v) {
      this.headers[k] = v;
    },
    status(c) {
      this.statusCode = c;
      return this;
    },
    json(p) {
      this.body = p;
      return this;
    },
    end() {
      return this;
    },
  };
}

function checkoutReq({ body = {}, headers = {} } = {}) {
  return {
    method: "POST",
    url: "/api/billing",
    body,
    headers: { "content-type": "application/json", ...headers },
    socket: { remoteAddress: "127.0.0.1" },
  };
}

// Webhook req is an async-iterable stream (handler reads the raw body).
function webhookReq({ rawBody = "{}", headers = {} } = {}) {
  return {
    method: "POST",
    url: "/api/stripe-webhook",
    headers: { "stripe-signature": "sig", ...headers },
    socket: { remoteAddress: "127.0.0.1" },
    async *[Symbol.asyncIterator]() {
      yield Buffer.from(rawBody);
    },
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  mockIsStripeConfigured.mockReturnValue(true);
  process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
});

afterEach(() => {
  delete process.env.STRIPE_WEBHOOK_SECRET;
});

// ── billing: checkout ───────────────────────────────────────────────────────
describe("billing (action=checkout)", () => {
  it("503 when Stripe is not configured", async () => {
    mockIsStripeConfigured.mockReturnValue(false);
    const res = createRes();
    await billingHandler(
      checkoutReq({ body: { action: "checkout", plan: "plus" } }),
      res,
    );
    expect(res.statusCode).toBe(503);
  });

  it("401 when unauthenticated", async () => {
    mockGetAuthedUser.mockResolvedValue(null);
    const res = createRes();
    await billingHandler(
      checkoutReq({ body: { action: "checkout", plan: "plus" } }),
      res,
    );
    expect(res.statusCode).toBe(401);
  });

  it("400 on an invalid plan", async () => {
    mockGetAuthedUser.mockResolvedValue({ id: "u1", email: "a@b.co" });
    const res = createRes();
    await billingHandler(
      checkoutReq({ body: { action: "checkout", plan: "enterprise" } }),
      res,
    );
    expect(res.statusCode).toBe(400);
    expect(mockStripe.checkout.sessions.create).not.toHaveBeenCalled();
  });

  it("400 on an unknown action", async () => {
    mockGetAuthedUser.mockResolvedValue({ id: "u1", email: "a@b.co" });
    const res = createRes();
    await billingHandler(checkoutReq({ body: { action: "wat" } }), res);
    expect(res.statusCode).toBe(400);
  });

  it("creates a session and returns its URL on the happy path", async () => {
    mockGetAuthedUser.mockResolvedValue({ id: "u1", email: "a@b.co" });
    mockStripe.checkout.sessions.create.mockResolvedValue({
      url: "https://checkout.stripe.com/c/test",
    });
    const res = createRes();
    await billingHandler(
      checkoutReq({ body: { action: "checkout", plan: "plus" } }),
      res,
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.url).toContain("checkout.stripe.com");
    const arg = mockStripe.checkout.sessions.create.mock.calls[0][0];
    expect(arg.mode).toBe("subscription");
    expect(arg.line_items[0].price).toBe("price_plus");
    expect(arg.client_reference_id).toBe("u1");
    expect(arg.metadata.supabase_user_id).toBe("u1");
  });
});

// ── stripe-webhook ────────────────────────────────────────────────────────────
describe("stripe-webhook", () => {
  it("400 when the signature header is missing", async () => {
    const res = createRes();
    await webhookHandler(
      webhookReq({ headers: { "stripe-signature": undefined } }),
      res,
    );
    expect(res.statusCode).toBe(400);
    expect(mockStripe.webhooks.constructEvent).not.toHaveBeenCalled();
  });

  it("400 when signature verification fails", async () => {
    mockStripe.webhooks.constructEvent.mockImplementation(() => {
      throw new Error("bad sig");
    });
    const res = createRes();
    await webhookHandler(webhookReq(), res);
    expect(res.statusCode).toBe(400);
  });

  it("upserts a complete row and 200s on checkout.session.completed", async () => {
    const upsert = vi.fn(async () => ({ error: null }));
    mockGetServiceClient.mockReturnValue({
      from: () => ({ upsert }),
    });
    mockStripe.webhooks.constructEvent.mockReturnValue({
      type: "checkout.session.completed",
      data: {
        object: {
          subscription: "sub_1",
          client_reference_id: "u1",
          metadata: { supabase_user_id: "u1", plan: "plus" },
        },
      },
    });
    mockStripe.subscriptions.retrieve.mockResolvedValue({
      id: "sub_1",
      customer: "cus_1",
      status: "active",
      current_period_end: 1893456000,
      items: { data: [{ price: { id: "price_plus" } }] },
      metadata: { supabase_user_id: "u1", plan: "plus" },
    });

    const res = createRes();
    await webhookHandler(webhookReq(), res);

    expect(res.statusCode).toBe(200);
    expect(upsert).toHaveBeenCalledTimes(1);
    const [row, opts] = upsert.mock.calls[0];
    expect(opts).toEqual({ onConflict: "user_id" });
    expect(row).toMatchObject({
      user_id: "u1",
      stripe_customer_id: "cus_1",
      stripe_subscription_id: "sub_1",
      plan: "plus",
      status: "active",
    });
  });

  it("maps an unrecognized Stripe status to 'inactive'", async () => {
    const upsert = vi.fn(async () => ({ error: null }));
    mockGetServiceClient.mockReturnValue({ from: () => ({ upsert }) });
    mockStripe.webhooks.constructEvent.mockReturnValue({
      type: "customer.subscription.updated",
      data: {
        object: {
          id: "sub_1",
          customer: "cus_1",
          status: "incomplete",
          items: { data: [{ price: { id: "price_plus" } }] },
          metadata: { supabase_user_id: "u1" },
        },
      },
    });
    const res = createRes();
    await webhookHandler(webhookReq(), res);
    expect(res.statusCode).toBe(200);
    expect(upsert.mock.calls[0][0].status).toBe("inactive");
  });
});
