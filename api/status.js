import {
  applyStandardApiHeaders,
  handleOptionsAndMethod,
  respondRateLimit,
} from "./_apiCommon.js";
import { checkRateLimit, rateLimitHeaders, getClientIp } from "./_rateLimit.js";

export default async function handler(req, res) {
  applyStandardApiHeaders(req, res, "GET, OPTIONS");
  if (handleOptionsAndMethod(req, res, "GET")) return;

  const ip = getClientIp(req);
  const rl = await checkRateLimit(ip, "status");
  const rlHeaders = rateLimitHeaders(rl);
  for (const [k, v] of Object.entries(rlHeaders)) {
    res.setHeader(k, v);
  }

  if (respondRateLimit(res, rl, { exceeded: "Rate limit exceeded" })) return;

  return res.status(200).json({ ok: true, ts: new Date().toISOString() });
}
