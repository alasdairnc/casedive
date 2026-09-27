#!/usr/bin/env node
// scripts/extractPenaltyData.mjs
// Deterministic extraction of severity, maxPenalty and relatedSections from
// the live Criminal Code XML — no invention, only sections whose own <Text>
// contains exactly one clean, single-tier punishment clause are filled in.
// Multi-tier sections (several offences/subsections each with their own
// penalty, e.g. s. 160, s. 271) are left for the verified-summary pipeline,
// which has a human-reviewable JSON trail instead of a silent regex guess.
//
// Usage: XML_LOCAL_PATH=/path/to/C-46.xml node scripts/extractPenaltyData.mjs

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const XML_LOCAL_PATH = process.env.XML_LOCAL_PATH;

function extractLiveBody(xml) {
  const bodyStart = xml.indexOf("<Body");
  const bodyEnd = xml.indexOf("</Body>");
  if (bodyStart === -1 || bodyEnd === -1) {
    throw new Error("Could not find <Body>...</Body> in the XML");
  }
  const body = xml.slice(bodyStart, bodyEnd + "</Body>".length);
  return body.replace(/<AmendedText[^>]*>[\s\S]*?<\/AmendedText>/g, "");
}

const NUM_WORDS = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8,
  nine: 9, ten: 10, eleven: 11, twelve: 12, fourteen: 14, fifteen: 15,
  eighteen: 18, twenty: 20, twenty5: 25,
};

function wordOrDigitToYears(s) {
  const digit = s.match(/^\d+/);
  if (digit) return digit[0];
  const word = s.toLowerCase().replace(/[^a-z]/g, "");
  return NUM_WORDS[word] != null ? String(NUM_WORDS[word]) : null;
}

// "is (a) guilty of an indictable offence and liable to..." and "(a) is
// guilty of an indictable offence and is liable to..." are BOTH common
// Criminal Code sentence shapes — the "is/are" before "liable" is optional.
const INDICT_RE =
  /guilty of an indictable offence and (?:is |are )?liable to imprisonment for a term (?:of |)(?:not exceeding|not more than) ([\w-]+)\s+years?/gi;
const LIFE_RE =
  /guilty of an indictable offence and (?:is |are )?liable to imprisonment for life\b/gi;
// "guilty of" often governs multiple lettered branches and isn't repeated
// before each one (e.g. "guilty of (a) ... or (b) an offence punishable on
// summary conviction"), so don't require it immediately before this phrase.
const SUMMARY_RE = /(?:guilty of )?an offence punishable on summary conviction/gi;
const MIN_RE =
  /minimum punishment of imprisonment for a term of ([\w-]+(?: years?| months?| days?)?)/gi;
const XREF_RE = /<XRefInternal[^>]*>([^<]*)<\/XRefInternal>/g;

function stripTags(s) {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

// Section number appears inside XRefInternal display text, e.g. "section 265"
// or "subsection 273.1(2)" — pull the leading number only.
function parseXrefSectionNum(displayText) {
  const m = displayText.match(/(\d+(?:\.\d+)?)/);
  return m ? m[1] : null;
}

function analyzeSection(rawBlock, ownNum, liveKeys) {
  // Only look at <Text> content, not <HistoricalNote> (citation lists that
  // may themselves contain years/numbers that aren't penalties).
  const historicalStripped = rawBlock.replace(
    /<HistoricalNote>[\s\S]*?<\/HistoricalNote>/g,
    "",
  );
  const plain = stripTags(historicalStripped);

  const indictMatches = [...plain.matchAll(INDICT_RE)];
  const lifeMatches = [...plain.matchAll(LIFE_RE)];
  const summaryMatches = [...plain.matchAll(SUMMARY_RE)];
  const minMatches = [...plain.matchAll(MIN_RE)];

  const tierCount = indictMatches.length + lifeMatches.length;
  // Multi-tier (more than one distinct indictable/life clause, OR more than
  // one summary-conviction clause — a section can have a summary-only base
  // offence plus a separate hybrid aggravated one, e.g. s. 66) is too risky
  // to summarize with a single string; leave for the verified writer pass.
  if (tierCount > 1) return null;
  if (summaryMatches.length > 1) return null;
  if (tierCount === 0 && summaryMatches.length === 0) return null; // no offence-creating clause found at all

  let severity = null;
  let maxPenalty = "";

  if (tierCount >= 1 && summaryMatches.length >= 1) severity = "Hybrid";
  else if (tierCount >= 1) severity = "Indictable";
  else if (summaryMatches.length >= 1) severity = "Summary";

  const parts = [];
  if (lifeMatches.length === 1) {
    parts.push("Life imprisonment");
  } else if (indictMatches.length === 1) {
    const years = wordOrDigitToYears(indictMatches[0][1]);
    if (years == null) return null; // unparseable year word — don't guess
    parts.push(`${years} years indictable`);
  }
  if (summaryMatches.length >= 1 && severity === "Hybrid") {
    parts.push("summary conviction available");
  } else if (summaryMatches.length >= 1 && severity === "Summary") {
    parts.push("summary conviction (s. 787 default penalty applies unless otherwise stated)");
  }
  if (minMatches.length === 1) {
    parts.push(`minimum ${minMatches[0][1]}`);
  } else if (minMatches.length > 1) {
    return null; // multiple distinct minimums — ambiguous which tier they attach to
  }

  maxPenalty = parts.join("; ");

  // relatedSections: XRefInternal targets inside this section's own <Text>
  // (already excludes HistoricalNote via historicalStripped), deduped,
  // excluding self-reference, capped so a section like s. 7 with dozens of
  // cross-references doesn't produce an unusable wall of pills.
  const seen = new Set();
  const related = [];
  for (const m of historicalStripped.matchAll(XREF_RE)) {
    const num = parseXrefSectionNum(stripTags(m[1]));
    if (!num || num === ownNum || seen.has(num) || !liveKeys.has(num)) continue;
    seen.add(num);
    related.push(num);
    if (related.length >= 8) break;
  }

  return { severity, maxPenalty, relatedSections: related };
}

async function main() {
  if (!XML_LOCAL_PATH) {
    console.error("Set XML_LOCAL_PATH to a local copy of the Justice Laws XML.");
    process.exit(1);
  }
  const xmlRaw = readFileSync(XML_LOCAL_PATH, "utf-8");
  const xml = extractLiveBody(xmlRaw);

  const liveSections = JSON.parse(
    readFileSync(resolve(__dirname, "criminal-code-sections.json"), "utf-8"),
  );
  const liveKeys = new Set(liveSections.map((s) => s.section));

  const nodeRegex = /<Section[^>]*>([\s\S]*?)<\/Section>/g;
  const seenNums = new Set();
  const results = {};
  let attempted = 0;
  let filled = 0;

  let match;
  while ((match = nodeRegex.exec(xml)) !== null) {
    const block = match[1];
    const labelMatch = block.match(/<Label>(\d+(?:\.\d+)?)<\/Label>/);
    if (!labelMatch) continue;
    const num = labelMatch[1];
    if (seenNums.has(num) || !liveKeys.has(num)) continue;
    seenNums.add(num);
    attempted++;

    const analyzed = analyzeSection(block, num, liveKeys);
    if (analyzed) {
      results[num] = analyzed;
      filled++;
    }
  }

  const outPath = resolve(__dirname, "criminal-code-penalty-extract.json");
  writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`Attempted: ${attempted} live sections`);
  console.log(`Confidently extracted: ${filled} (${((filled / attempted) * 100).toFixed(1)}%)`);
  console.log(`Left for verified-summary pass: ${attempted - filled}`);
  console.log(`Written to ${outPath}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
