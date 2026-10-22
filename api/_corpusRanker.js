// Full-text ranking of the case-law corpus (BM25 + reciprocal rank fusion).
//
// matchLandmarkCases in analyze.js scores a scenario against each case's tags,
// topics and title only. The richest text, `facts` and `ratio`, was never
// searched, so a plain-language question ("an undercover officer kept pressing
// me to sell drugs") could not reach a case that never uses the user's words
// as tags. This module ranks the whole case text. It is pure and offline.
//
// Gated at the call site by RETRIEVAL_FULLTEXT=on (see isFullTextRankingEnabled).
import {
  RANK_STOP_WORDS,
  SIMPLE_STOP_WORDS,
  tokenizeWithExpansion,
} from "./_textUtils.js";

// Standard BM25 parameters. Deliberately not tuned against our scenarios.
const K1 = 1.2;
const B = 0.75;
// Reciprocal rank fusion constant (Cormack et al.); needs no tuned weights.
export const RRF_K = 60;
// A BM25-only candidate must match this many distinct query words. One shared
// word ("phone", "search") is not evidence of relevance.
export const MIN_DISTINCT_TERMS = 2;

const FIELD_WEIGHTS = { title: 2, tags: 2, topics: 2, facts: 1, ratio: 1 };
const STOP_WORDS = new Set([...RANK_STOP_WORDS, ...SIMPLE_STOP_WORDS]);

export function isFullTextRankingEnabled() {
  return process.env.RETRIEVAL_FULLTEXT === "on";
}

function tokenize(text) {
  return tokenizeWithExpansion(text, {
    stopWords: STOP_WORDS,
    returnType: "array",
  });
}

// Words that differ only by a plural or tense ("search", "searched") share a
// 5-letter prefix; used to count distinct query words, not matched variants.
const wordKey = (token) => token.slice(0, 5);

let cached = null;

function corpusSignature(corpus) {
  return `${corpus.length}|${corpus[0]?.citation}|${corpus[corpus.length - 1]?.citation}`;
}

function buildIndex(corpus) {
  const signature = corpusSignature(corpus);
  if (cached && cached.signature === signature) return cached;

  const docs = corpus.map((caseLaw) => {
    const tf = new Map();
    let length = 0;
    for (const [field, weight] of Object.entries(FIELD_WEIGHTS)) {
      const raw = caseLaw?.[field];
      const text = Array.isArray(raw) ? raw.join(" ") : raw;
      for (const token of tokenize(text)) {
        tf.set(token, (tf.get(token) || 0) + weight);
        length += weight;
      }
    }
    return { caseLaw, tf, length };
  });

  const df = new Map();
  for (const doc of docs) {
    for (const token of doc.tf.keys()) df.set(token, (df.get(token) || 0) + 1);
  }
  const avgLength =
    docs.reduce((sum, doc) => sum + doc.length, 0) / Math.max(1, docs.length);

  cached = { signature, docs, df, avgLength, size: docs.length };
  return cached;
}

/**
 * Rank every case against the query. Returns cases with at least one matching
 * word, best first: [{ caseLaw, score, matchedWords }].
 */
export function rankCorpus(query, corpus) {
  if (!Array.isArray(corpus) || corpus.length === 0) return [];
  const index = buildIndex(corpus);
  const queryTokens = [...new Set(tokenize(query))];
  if (queryTokens.length === 0) return [];

  const ranked = [];
  for (const doc of index.docs) {
    let score = 0;
    const matched = new Set();
    for (const token of queryTokens) {
      const f = doc.tf.get(token);
      if (!f) continue;
      matched.add(wordKey(token));
      const n = index.df.get(token) || 0;
      const idf = Math.log(1 + (index.size - n + 0.5) / (n + 0.5));
      score +=
        idf *
        ((f * (K1 + 1)) /
          (f + K1 * (1 - B + (B * doc.length) / index.avgLength)));
    }
    if (score > 0) {
      ranked.push({ caseLaw: doc.caseLaw, score, matchedWords: matched.size });
    }
  }
  return ranked.sort((a, b) => b.score - a.score);
}

/**
 * Reciprocal rank fusion of ranked lists of cases (best first). Returns
 * [{ caseLaw, score }] best first. A case is identified by its citation.
 */
export function fuseRankings(...lists) {
  const fused = new Map();
  for (const list of lists) {
    list.forEach((caseLaw, i) => {
      const key = caseLaw?.citation;
      if (!key) return;
      const entry = fused.get(key) || { caseLaw, score: 0 };
      entry.score += 1 / (RRF_K + i + 1);
      fused.set(key, entry);
    });
  }
  return [...fused.values()].sort((a, b) => b.score - a.score);
}
