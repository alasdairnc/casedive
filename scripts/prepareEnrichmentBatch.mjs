#!/usr/bin/env node
// scripts/prepareEnrichmentBatch.mjs
// Prepares per-section source text + existing data for a given list of
// Criminal Code section numbers, for the writer/verifier enrichment
// pipeline. Splits into batches by character count (not section count —
// some sections like s. 7 are ~30K chars on their own).
//
// Usage:
//   XML_LOCAL_PATH=/path/to/C-46.xml node scripts/prepareEnrichmentBatch.mjs \
//     <sections-json-file> <output-dir> [maxBatchChars]

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const XML_LOCAL_PATH = process.env.XML_LOCAL_PATH;

const [, , sectionsFile, outDir, maxBatchCharsArg] = process.argv;
const MAX_BATCH_CHARS = maxBatchCharsArg ? parseInt(maxBatchCharsArg, 10) : 25000;

function extractLiveBody(xml) {
  const bodyStart = xml.indexOf("<Body");
  const bodyEnd = xml.indexOf("</Body>");
  if (bodyStart === -1 || bodyEnd === -1) {
    throw new Error("Could not find <Body>...</Body> in the XML");
  }
  const body = xml.slice(bodyStart, bodyEnd + "</Body>".length);
  return body.replace(/<AmendedText[^>]*>[\s\S]*?<\/AmendedText>/g, "");
}

function stripTags(s) {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

async function main() {
  const wantedNums = JSON.parse(readFileSync(sectionsFile, "utf-8"));
  const wanted = new Set(wantedNums);

  const xmlRaw = readFileSync(XML_LOCAL_PATH, "utf-8");
  const xml = extractLiveBody(xmlRaw);

  const nodeRegex = /<Section[^>]*>([\s\S]*?)<\/Section>/g;
  const seen = new Set();
  const sourceTexts = {};
  let match;
  while ((match = nodeRegex.exec(xml)) !== null) {
    const block = match[1];
    const labelMatch = block.match(/<Label>(\d+(?:\.\d+)?)<\/Label>/);
    if (!labelMatch) continue;
    const num = labelMatch[1];
    if (!wanted.has(num) || seen.has(num)) continue;
    seen.add(num);
    const historicalStripped = block.replace(
      /<HistoricalNote>[\s\S]*?<\/HistoricalNote>/g,
      "",
    );
    sourceTexts[num] = stripTags(historicalStripped);
  }

  const missing = wantedNums.filter((n) => !sourceTexts[n]);
  if (missing.length) {
    console.warn(`WARNING: ${missing.length} requested sections not found in XML: ${missing.join(", ")}`);
  }

  const { CRIMINAL_CODE_SECTIONS } = await import(
    resolve(ROOT, "src/lib/criminalCodeData.js"),
  );
  const penaltyExtract = JSON.parse(
    readFileSync(resolve(__dirname, "criminal-code-penalty-extract.json"), "utf-8"),
  );

  const items = wantedNums
    .filter((n) => sourceTexts[n])
    .map((num) => {
      const existing = CRIMINAL_CODE_SECTIONS.get(num) || {};
      return {
        section: num,
        title: existing.title || "",
        sourceText: sourceTexts[num],
        existing: {
          severity: existing.severity || "",
          maxPenalty: existing.maxPenalty || "",
          definition: existing.definition || "",
          relatedSections: existing.relatedSections || [],
          isCurated: !!existing.definition,
        },
        parserSuggestion: penaltyExtract[num] || null,
      };
    });

  // Batch by cumulative source-text length.
  const batches = [];
  let current = [];
  let currentChars = 0;
  for (const item of items) {
    const itemChars = item.sourceText.length;
    if (current.length > 0 && currentChars + itemChars > MAX_BATCH_CHARS) {
      batches.push(current);
      current = [];
      currentChars = 0;
    }
    current.push(item);
    currentChars += itemChars;
  }
  if (current.length) batches.push(current);

  mkdirSync(outDir, { recursive: true });
  const manifest = [];
  batches.forEach((batch, i) => {
    const batchId = `batch-${String(i + 1).padStart(2, "0")}`;
    const path = resolve(outDir, `${batchId}.json`);
    writeFileSync(path, JSON.stringify(batch, null, 2));
    const chars = batch.reduce((sum, it) => sum + it.sourceText.length, 0);
    manifest.push({ batchId, path, sections: batch.length, chars });
    console.log(`${batchId}: ${batch.length} sections, ${chars} chars -> ${path}`);
  });
  writeFileSync(resolve(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`\n${items.length} sections in ${batches.length} batches (missing: ${missing.length})`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
