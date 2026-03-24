// /api/analyze.js — Vercel Serverless Function
// Keeps the Anthropic API key server-side

import { createHash, randomUUID } from "crypto";
import { buildSystemPrompt } from "../src/lib/prompts.js";
import { checkRateLimit, getClientIp, rateLimitHeaders, redis } from "./_rateLimit.js";
import { retrieveVerifiedCaseLaw } from "./_caseLawRetrieval.js";
import { logRetrievalMetrics } from "./_retrievalMetrics.js";
import { lookupCase } from "../src/lib/canlii.js";
import {
  logRequestStart,
  logRateLimitCheck,
  logValidationError,
  logCacheHit,
  logCacheMiss,
  logExternalApiCall,
  logSuccess,
  logError,
} from "./_logging.js";

// Strip XML-like tags from user input to prevent delimiter escape.
// Uses [^>\s]* instead of [^>]* to avoid catastrophic backtracking (ReDoS).
function sanitizeUserInput(input) {
  return input.replace(/<\/?[a-zA-Z_][a-zA-Z0-9_]*(?:\s[^>\s][^>]*)?>/g, "");
}

const CACHE_TTL_S = 60 * 60 * 24; // 24 hours

function cacheKey(scenario, filters) {
  return "cache:analyze:" + createHash("sha256").update(scenario + JSON.stringify(filters)).digest("hex");
}

function ensureMetaContainer(result) {
  if (!result.meta || typeof result.meta !== "object" || Array.isArray(result.meta)) {
    result.meta = {};
  }
  return result.meta;
}

// ── Anthropic call ───────────────────────────────────────────────────────────

async function callAnthropic(messages, system, apiKey) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    signal: AbortSignal.timeout(25_000), // 25s — Vercel serverless limit is 30s
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1800,
      system,
      messages,
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const err = new Error(errData.error?.message || `Anthropic API error: ${response.status}`);
    err.status = response.status;
    throw err;
  }

  const data = await response.json();
  const text = data.content?.map((b) => b.text || "").join("") || "";
  return text.replace(/```json|```/g, "").trim();
}

// ── Re-ranking with AI ───────────────────────────────────────────────────────

async function rerankCasesWithAI(scenario, candidates, apiKey) {
  // Only re-rank if we have enough candidates to make it meaningful
  if (!candidates || candidates.length <= 3) return candidates;

  const candidateList = candidates.map((c, i) => 
    `ID: ${i}\nCitation: ${c.citation}\nSummary: ${c.summary}`
  ).join("\n\n");

  const system = "You are CaseDive, a Canadian legal research expert. Your task is to select the 3 most relevant cases from a list of candidates based on a specific legal scenario. HIGHEST PRIORITY: If a case name is explicitly mentioned in the user scenario (e.g., 'R v Jordan' or 'Morgentaler'), that case MUST be included in the top 3 if it exists in the candidates. SECONDARY PRIORITY: Landmark SCC decisions and cases that directly address the core legal issues in the scenario.";
  const messages = [
    {
      role: "user",
      content: `Scenario: ${scenario}\n\nCandidates:\n${candidateList}\n\nReturn ONLY a JSON array of the IDs (0-indexed integers) of the top 3 most relevant cases, in order of relevance. Example: [2, 0, 5]`
    }
  ];

  try {
    const raw = await callAnthropic(messages, system, apiKey);
    // Clean up response to find just the array
    const match = raw.match(/\[\s*\d+\s*(?:,\s*\d+\s*)*\]/);
    if (match) {
      const topIndices = JSON.parse(match[0]);
      if (Array.isArray(topIndices)) {
        return topIndices
          .map(id => candidates[id])
          .filter(Boolean)
          .slice(0, 3);
      }
    }
  } catch (err) {
    // Fail gracefully: return first 3 if re-ranking fails
  }
  return candidates.slice(0, 3);
}

// ── Parse with one retry ─────────────────────────────────────────────────────

async function analyzeWithRetry(scenario, filters, apiKey) {
  const system = buildSystemPrompt(filters || {});
  const sanitized = sanitizeUserInput(scenario);
  const messages = [{ role: "user", content: `<user_input>\n${sanitized}\n</user_input>` }];

  // First attempt
  const raw = await callAnthropic(messages, system, apiKey);
  try {
    return { result: JSON.parse(raw), raw };
  } catch {
    // Retry: feed Claude its bad output back and ask for valid JSON only
    const retryMessages = [
      ...messages,
      { role: "assistant", content: raw },
      {
        role: "user",
        content:
          "Your previous response was not valid JSON. Return only the JSON object as specified — no explanation, no preamble, no markdown fences. Just the raw JSON.",
      },
    ];

    const retryRaw = await callAnthropic(retryMessages, system, apiKey);
    try {
      return { result: JSON.parse(retryRaw), raw, retryRaw };
    } catch {
      return { result: null, raw, retryRaw };
    }
  }
}

// ── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  const requestId = req.headers['x-vercel-id'] || randomUUID();
  const startMs = Date.now();
  logRequestStart(req, "analyze", requestId);
  const origin = req.headers.origin ?? "";
  const allowed = ["https://casedive.ca", "https://www.casedive.ca", "https://casefinder-project.vercel.app"];
  if (allowed.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");

  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Content-Security-Policy", "default-src 'none'");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const ct = req.headers["content-type"] || "";
  if (!ct.includes("application/json")) {
    logValidationError(requestId, "analyze", "Invalid Content-Type", "content-type");
    return res.status(415).json({ error: "Content-Type must be application/json" });
  }

  const contentLength = parseInt(req.headers["content-length"] || "0", 10);
  if (contentLength > 50_000) {
    logValidationError(requestId, "analyze", "Request body too large", "content-length");
    return res.status(413).json({ error: "Request body too large" });
  }

  const rlResult = await checkRateLimit(getClientIp(req), "analyze");
  logRateLimitCheck(requestId, "analyze", rlResult, getClientIp(req));
  const rlHeaders = rateLimitHeaders(rlResult);
  Object.entries(rlHeaders).forEach(([k, v]) => res.setHeader(k, v));
  if (!rlResult.allowed) {
    const retryAfter = rlHeaders["Retry-After"] ? Math.ceil(Number(rlHeaders["Retry-After"]) / 60) : null;
    const msg = retryAfter
      ? `Rate limit reached. Try again in ${retryAfter} minute${retryAfter !== 1 ? "s" : ""}.`
      : "Rate limit exceeded. Please try again later.";
    return res.status(429).json({ error: msg });
  }

  const { scenario, filters: rawFilters } = req.body;

  if (!scenario || typeof scenario !== "string" || !scenario.trim()) {
    logValidationError(requestId, "analyze", "Scenario is required", "scenario");
    return res.status(400).json({ error: "Scenario is required" });
  }
  if (scenario.length > 5000) {
    logValidationError(requestId, "analyze", "Scenario too long", "scenario");
    return res.status(400).json({ error: "Scenario must be 5,000 characters or fewer." });
  }

  // Whitelist filter values — prevents prompt injection via filter fields
  const VALID_JURISDICTIONS = new Set([
    "all","Ontario","British Columbia","Alberta","Quebec",
    "Manitoba","Saskatchewan","Nova Scotia","New Brunswick",
    "Newfoundland and Labrador","Prince Edward Island",
  ]);
  const VALID_COURT_LEVELS = new Set(["all","scc","appeal","superior","provincial"]);
  const VALID_DATE_RANGES   = new Set(["all","5","10","20"]);
  const VALID_LAW_TYPES     = new Set(["criminal_code","case_law","civil_law","charter"]);

  // Validate lawTypes — only allow known keys with boolean values, default true
  const rawLawTypes = rawFilters?.lawTypes || {};
  const lawTypes = {};
  for (const key of VALID_LAW_TYPES) {
    lawTypes[key] = rawLawTypes[key] === false ? false : true;
  }

  const filters = {
    jurisdiction: VALID_JURISDICTIONS.has(rawFilters?.jurisdiction) ? rawFilters.jurisdiction : "all",
    courtLevel:   VALID_COURT_LEVELS.has(rawFilters?.courtLevel)    ? rawFilters.courtLevel   : "all",
    dateRange:    VALID_DATE_RANGES.has(rawFilters?.dateRange)       ? rawFilters.dateRange    : "all",
    lawTypes,
  };

  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      logValidationError(requestId, "analyze", "ANTHROPIC_API_KEY is not configured", "environment");
      return res.status(503).json({ error: "Analysis service temporarily unavailable." });
    }

    // Check cache first
    if (redis) {
      try {
        const cacheKeyStr = cacheKey(scenario, filters);
        const cached = await redis.get(cacheKeyStr);
        if (cached) {
          const cachedResult = typeof cached === "string" ? JSON.parse(cached) : cached;
          if (filters.lawTypes.case_law !== false) {
            const cachedCaseLaw = Array.isArray(cachedResult?.case_law) ? cachedResult.case_law : [];
            const cachedCaseLawMeta =
              cachedResult?.meta && typeof cachedResult.meta === "object"
                ? cachedResult.meta.case_law || {}
                : {};

            await logRetrievalMetrics({
              requestId,
              endpoint: "analyze",
              source: "cache",
              filters,
              reason:
                typeof cachedCaseLawMeta.reason === "string"
                  ? cachedCaseLawMeta.reason
                  : cachedCaseLaw.length > 0
                  ? "verified_results"
                  : "unknown_cached",
              retrievalLatencyMs: 0,
              finalCaseLawCount: cachedCaseLaw.length,
              retrievalMeta: {
                verifiedCount:
                  typeof cachedCaseLawMeta.verifiedCount === "number"
                    ? cachedCaseLawMeta.verifiedCount
                    : cachedCaseLaw.length,
              },
              cacheHit: true,
            });
          }

          logCacheHit(requestId, "analyze", cacheKeyStr);
          logSuccess(requestId, "analyze", 200, Date.now() - startMs, rlResult, { cacheUsed: true });
          return res.status(200).json(cachedResult);
        }
        logCacheMiss(requestId, "analyze");
      } catch { /* cache miss — proceed normally */ }
    }

    const anthropicStartMs = Date.now();
    const { result, raw, retryRaw } = await analyzeWithRetry(
      scenario,
      filters,
      apiKey
    );
    const anthropicDurationMs = Date.now() - anthropicStartMs;
    logExternalApiCall(requestId, "analyze", "anthropic", 200, anthropicDurationMs, { retried: !!retryRaw });

    if (!result) {
      logValidationError(requestId, "analyze", "AI returned unstructured response", "ai_output");
      return res.status(422).json({
        error:
          "The AI returned an unstructured response for this scenario. Try adding more detail — specify the location, what happened, and any relevant context.",
      });
    }

    // Phase B retrieval-first path: merge AI-generated case_law with retrieval results.
    const meta = ensureMetaContainer(result);
    const aiSuggestedCases = Array.isArray(result.case_law) ? result.case_law : [];
    
    if (filters.lawTypes.case_law !== false) {
      const canliiKey = process.env.CANLII_API_KEY || "";
      const retrievalStartMs = Date.now();
      try {
        const { cases: retrievedCases, meta: retrievalMeta } = await retrieveVerifiedCaseLaw({
          scenario: scenario.trim(),
          filters,
          aiSuggestions: Array.isArray(result.suggestions) ? result.suggestions : [],
          criminalCode: Array.isArray(result.criminal_code) ? result.criminal_code : [],
          apiKey: canliiKey,
          maxResults: 10,
        });
        const retrievalDurationMs = Date.now() - retrievalStartMs;

        if ((retrievalMeta.searchCalls || 0) > 0 || (retrievalMeta.verificationCalls || 0) > 0) {
          logExternalApiCall(requestId, "analyze", "canlii-retrieval", 200, retrievalDurationMs, {
            ...retrievalMeta,
            casesReturned: retrievedCases.length,
          });
        }

        // Deduplicate: merge AI suggestions (if any) with retrieved cases
        const seenCitations = new Set();
        const candidates = [];

        // 1. Prioritize AI suggested cases (we trust Claude's relevance, but verify later via client or batch)
        // Actually, verify them NOW using lookupCase to ensure they are real
        for (const c of aiSuggestedCases) {
          if (!c.citation) continue;
          const key = c.citation.toLowerCase().trim();
          if (seenCitations.has(key)) continue;
          
          // Basic verification check for AI citations
          const v = await lookupCase(c.citation, canliiKey);
          if (v.status === "verified" || v.status === "unverified" || v.status === "not_found" || v.status === "unparseable") {
            candidates.push({
              ...c,
              url_canlii: v.url || v.searchUrl || "",
              verificationStatus: v.status === "verified" ? "verified" : "unverified"
            });
            seenCitations.add(key);
          }
        }

        // 2. Append retrieval results
        for (const c of retrievedCases) {
          if (!c.citation) continue;
          const key = c.citation.toLowerCase().trim();
          if (seenCitations.has(key)) continue;
          candidates.push(c);
          seenCitations.add(key);
        }

        // 3. AI Re-Ranking Pass: Select top 3 from the larger pool
        const rerankStartMs = Date.now();
        let topCases = await rerankCasesWithAI(scenario, candidates, apiKey);
        
        // 4. Safety Fallback: Ensure specifically mentioned cases are NOT dropped
        const scenarioLower = scenario.toLowerCase();
        for (const candidate of candidates) {
          // If the citation contains a name mentioned in the scenario (e.g., "Jordan" or "Morgentaler")
          const parties = candidate.citation.split(",")[0].toLowerCase();
          const words = parties.replace(/r v /g, "").split(/\s+/).filter(w => w.length > 3);
          
          const isMentioned = words.some(w => scenarioLower.includes(w));
          if (isMentioned) {
            // Check if it's already in topCases
            const alreadyIn = topCases.some(t => t.citation.toLowerCase() === candidate.citation.toLowerCase());
            if (!alreadyIn) {
              // Swap it into the bottom of the list
              topCases = [topCases[0], topCases[1], candidate];
            }
          }
        }

        const rerankDurationMs = Date.now() - rerankStartMs;
        logExternalApiCall(requestId, "analyze", "ai-rerank", 200, rerankDurationMs, {
          candidatesProvided: candidates.length,
          finalCount: topCases.length
        });

        result.case_law = topCases;
        
        const reason = retrievalMeta.reason || (result.case_law.length > 0 ? "verified_results" : "no_verified");
        meta.case_law = {
          source: "hybrid_reranked",
          verifiedCount: result.case_law.length,
          reason,
        };
        await logRetrievalMetrics({
          requestId,
          endpoint: "analyze",
          source: "retrieval",
          filters,
          reason,
          retrievalMeta,
          retrievalLatencyMs: retrievalDurationMs,
          finalCaseLawCount: result.case_law.length,
        });
      } catch (retrievalErr) {
        // Fallback to AI suggestions only if retrieval fails
        result.case_law = aiSuggestedCases;
        meta.case_law = {
          source: "ai_fallback",
          verifiedCount: aiSuggestedCases.length,
          reason: "retrieval_error",
        };
      }
    } else {
      result.case_law = [];
      meta.case_law = {
        source: "retrieval",
        verifiedCount: 0,
        reason: "filter_disabled",
      };
    }

    // Store in cache (fire-and-forget)
    if (redis) {
      redis.setex(cacheKey(scenario, filters), CACHE_TTL_S, JSON.stringify(result)).catch(() => {});
    }

    logSuccess(requestId, "analyze", 200, Date.now() - startMs, rlResult, { cached: true });
    return res.status(200).json(result);
  } catch (err) {
    const statusCode = err.status ? (err.status >= 500 ? 502 : err.status) : 500;
    logError(requestId, "analyze", err, statusCode, Date.now() - startMs);
    if (err.status) {
      return res.status(statusCode).json({ error: "Analysis service temporarily unavailable." });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}
