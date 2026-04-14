import { applyStandardApiHeaders } from "./_apiCommon.js";
import { checkRateLimit, rateLimitHeaders, getClientIp } from "./_rateLimit.js";

export default async function handler(req, res) {
  applyStandardApiHeaders(req, res, "GET, OPTIONS");

  const ip = getClientIp(req);
  const rl = await checkRateLimit(ip, "status");
  const rlHeaders = rateLimitHeaders(rl);
  for (const [k, v] of Object.entries(rlHeaders)) {
    res.setHeader(k, v);
  }

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!rl.allowed) {
    return res.status(429).json({ error: "Rate limit exceeded" });
  }

  return res.status(200).json({ ok: true, ts: new Date().toISOString() });
}
