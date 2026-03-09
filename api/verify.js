// /api/verify.js — Vercel Serverless Function
// Batch-verifies AI-generated case citations against the CanLII API.
// Degrades gracefully when CANLII_API_KEY is not set.

import {
  parseCitation,
  buildCaseId,
  buildApiUrl,
  buildCaseUrl,
  buildSearchUrl,
} from "../src/lib/canlii.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { citations } = req.body;

  if (!Array.isArray(citations) || citations.length === 0) {
    return res.status(400).json({ error: "citations array is required" });
  }

  const apiKey = process.env.CANLII_API_KEY || "";
  const results = {};

  await Promise.all(
    citations.map(async (citation) => {
      if (!citation || typeof citation !== "string") {
        results[citation] = { status: "unparseable", searchUrl: buildSearchUrl(citation || "") };
        return;
      }

      const parsed = parseCitation(citation);

      if (!parsed) {
        results[citation] = { status: "unparseable", searchUrl: buildSearchUrl(citation) };
        return;
      }

      if (!parsed.dbId) {
        results[citation] = { status: "unknown_court", searchUrl: buildSearchUrl(citation) };
        return;
      }

      const caseId = buildCaseId({ year: parsed.year, dbId: parsed.dbId, number: parsed.number });
      const caseUrl = buildCaseUrl(parsed.dbId, caseId);
      const searchUrl = buildSearchUrl(citation);

      if (!apiKey) {
        results[citation] = { status: "unverified", url: caseUrl, searchUrl };
        return;
      }

      try {
        const apiRes = await fetch(buildApiUrl(parsed.dbId, caseId, apiKey));

        if (apiRes.status === 404) {
          results[citation] = { status: "not_found", searchUrl };
          return;
        }
        if (!apiRes.ok) {
          results[citation] = { status: "error", searchUrl };
          return;
        }

        const data = await apiRes.json();
        results[citation] = {
          status: "verified",
          url: caseUrl,
          searchUrl,
          title: data.title || citation,
        };
      } catch {
        results[citation] = { status: "error", searchUrl };
      }
    })
  );

  return res.status(200).json(results);
}
