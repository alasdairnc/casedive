// /api/user-data.js — Vercel Serverless Function
// Cloud sync of bookmarks, history, and scenarios per authenticated user

import { createClient } from "@supabase/supabase-js";
import { applyStandardApiHeaders, respondRateLimit } from "./_apiCommon.js";
import { checkRateLimit, getClientIp } from "./_rateLimit.js";

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

  // Method gate — support GET and POST only
  if (!["GET", "POST"].includes(req.method)) {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Rate limit
  const rlResult = await checkRateLimit(getClientIp(req), "user-data");
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
    return res
      .status(400)
      .json({
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

  // POST
  const { data: items } = req.body ?? {};
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: "data must be an array" });
  }
  if (items.length > maxItems) {
    return res
      .status(400)
      .json({ error: `Maximum ${maxItems} items allowed for ${type}` });
  }

  const rows = items.map((item) => ({ ...item, user_id: user.id }));

  const { error: upsertError } = await supabase.from(table).upsert(rows);
  if (upsertError) {
    return res.status(500).json({ error: "Failed to save data" });
  }

  return res.status(200).json({ ok: true });
}
