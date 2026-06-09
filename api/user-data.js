// /api/user-data.js — Vercel Serverless Function
// Cloud sync of bookmarks, history, and scenarios per authenticated user

import { createClient } from "@supabase/supabase-js";
import {
  applyStandardApiHeaders,
  respondRateLimit,
  validateJsonRequest,
} from "./_apiCommon.js";
import { checkRateLimit, getClientIp, rateLimitHeaders } from "./_rateLimit.js";
import { logValidationError } from "./_logging.js";

const TABLE = {
  bookmarks: "user_bookmarks",
  history: "user_history",
  scenarios: "user_scenarios",
};

const MAX_ITEMS = {
  bookmarks: 200,
  history: 100,
  scenarios: 50,
};

const ORDER_COL = {
  bookmarks: "bookmarkedAt",
  history: "timestamp",
  scenarios: "savedAt",
};

export default async function handler(req, res) {
  applyStandardApiHeaders(
    req,
    res,
    "GET, POST, OPTIONS",
    "Content-Type, Authorization",
  );

  // OPTIONS preflight already handled by applyStandardApiHeaders via CORS headers;
  // respond 200 and stop.
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Method gate — support GET and POST only
  if (!["GET", "POST"].includes(req.method)) {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Config guard — fail cleanly (not a crash) when Supabase isn't configured
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    return res.status(503).json({ error: "Account sync is not available" });
  }

  // Rate limit
  const rlResult = await checkRateLimit(getClientIp(req), "user-data");
  const rlHdrs = rateLimitHeaders(rlResult);
  Object.entries(rlHdrs).forEach(([k, v]) => res.setHeader(k, v));
  if (respondRateLimit(res, rlResult)) return;

  // Auth — require Bearer token
  const authHeader = req.headers.authorization ?? "";
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader.slice(7);

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
  );

  const { data: authData, error: authError } =
    await supabase.auth.getUser(token);
  const user = authData?.user;
  if (authError || !user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Type validation — prefer query param, fall back to body (POST sends type in body)
  const type = req.query?.type ?? req.body?.type;
  if (!TABLE[type]) {
    return res.status(400).json({
      error: "Invalid type. Must be one of: bookmarks, history, scenarios",
    });
  }

  const table = TABLE[type];
  const maxItems = MAX_ITEMS[type];
  const orderCol = ORDER_COL[type];

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("user_id", user.id)
      .order(orderCol, { ascending: false })
      .limit(maxItems);

    if (error) {
      return res.status(500).json({ error: "Failed to fetch data" });
    }

    return res.status(200).json({ [type]: data ?? [] });
  }

  // POST — validate JSON body
  if (
    !validateJsonRequest(req, res, {
      requestId: "",
      endpoint: "user-data",
      maxBytes: 500_000,
      logValidationError,
    })
  ) {
    return;
  }

  const { data: items } = req.body ?? {};
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: "data must be an array" });
  }
  if (items.length > maxItems) {
    return res
      .status(400)
      .json({ error: `Maximum ${maxItems} items allowed for ${type}` });
  }

  // Build rows from an explicit field allowlist — never spread client data
  // into the DB row, which could overwrite user_id or inject unexpected columns.
  const rows = items.map((item) => {
    const base = { user_id: user.id };
    if (type === "bookmarks") {
      return {
        ...base,
        citation:
          typeof item.citation === "string" ? item.citation.slice(0, 500) : "",
        summary:
          typeof item.summary === "string" ? item.summary.slice(0, 2000) : "",
        type: typeof item.type === "string" ? item.type.slice(0, 50) : "",
        bookmarkedAt: Number.isFinite(item.bookmarkedAt)
          ? item.bookmarkedAt
          : Date.now(),
        verification: item.verification != null ? item.verification : null,
      };
    }
    if (type === "history") {
      return {
        ...base,
        query: typeof item.query === "string" ? item.query.slice(0, 1000) : "",
        filters:
          item.filters && typeof item.filters === "object" ? item.filters : {},
        resultCounts:
          item.resultCounts && typeof item.resultCounts === "object"
            ? item.resultCounts
            : {},
        timestamp: Number.isFinite(item.timestamp)
          ? item.timestamp
          : Date.now(),
      };
    }
    // scenarios
    return {
      ...base,
      name: typeof item.name === "string" ? item.name.slice(0, 200) : "",
      text: typeof item.text === "string" ? item.text.slice(0, 10000) : "",
      savedAt: Number.isFinite(item.savedAt) ? item.savedAt : Date.now(),
    };
  });

  // Replace semantics: the client POSTs the full desired array for this type,
  // so we delete the user's existing rows and insert the new set. This makes
  // removals and clears (empty array) propagate correctly, and prevents the
  // table from accumulating duplicate rows on every sync.
  const { error: deleteError } = await supabase
    .from(table)
    .delete()
    .eq("user_id", user.id);
  if (deleteError) {
    return res.status(500).json({ error: "Failed to save data" });
  }

  if (rows.length > 0) {
    const { error: insertError } = await supabase.from(table).insert(rows);
    if (insertError) {
      return res.status(500).json({ error: "Failed to save data" });
    }
  }

  return res.status(200).json({ ok: true });
}
