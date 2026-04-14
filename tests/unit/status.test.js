import { describe, it, expect } from "vitest";

// Minimal harness: simulate a Vercel-style req/res
function makeRes() {
  const res = { statusCode: null, body: null, headers: {} };
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (body) => {
    res.body = body;
    return res;
  };
  res.setHeader = (k, v) => {
    res.headers[k] = v;
    return res;
  };
  res.end = () => res;
  return res;
}

describe("GET /api/status", () => {
  it("returns 200 with ok:true", async () => {
    const handler = (await import("../../api/status.js")).default;
    const req = { method: "GET", headers: {} };
    const res = makeRes();
    await handler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ ok: true });
  });

  it("rejects non-GET with 405", async () => {
    const handler = (await import("../../api/status.js")).default;
    const req = { method: "POST", headers: {} };
    const res = makeRes();
    await handler(req, res);
    expect(res.statusCode).toBe(405);
  });
});
