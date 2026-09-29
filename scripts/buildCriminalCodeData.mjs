#!/usr/bin/env node
// scripts/buildCriminalCodeData.mjs
// Fetches Criminal Code XML from Justice Laws and extracts all section numbers + titles.
// Outputs a JSON file that can be used to expand criminalCodeData.js.
//
// Usage: node scripts/buildCriminalCodeData.mjs

import { writeFileSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
// Repeat until stable so nested fragments like "<<b>b>" cannot survive one pass.
function stripTags(str) {
  let prev;
  let out = str;
  do {
    prev = out;
    out = out.replace(/<[^>]+>/g, "");
  } while (out !== prev);
  return out;
}

const XML_URL = "https://laws-lois.justice.gc.ca/eng/XML/C-46.xml";
// Node's fetch can't resolve DNS through the sandbox proxy that curl uses.
// Pre-download with curl and point this at the local file to work around it:
//   curl -o /tmp/C-46.xml https://laws-lois.justice.gc.ca/eng/XML/C-46.xml
//   XML_LOCAL_PATH=/tmp/C-46.xml node scripts/buildCriminalCodeData.mjs
const XML_LOCAL_PATH = process.env.XML_LOCAL_PATH;

// Part assignment is derived from the XML's own <Heading level="1"> markers
// in document order, not hardcoded section-number ranges — ranges silently
// drift every time a bill inserts decimal-numbered sections.
//
// Part I is a special case in the statute's own structure: the "PART I"
// label never actually appears — the document has a "Short Title" heading,
// then an "Interpretation" heading, then a bare "Part I" heading followed by
// a "General" sub-heading. By long-standing convention (matching Justice
// Laws' own table of contents), sections 2 through 45.1 are all "Part I —
// General"; section 1 (Short title) itself is treated as outside any Part.
const PART_I_LABEL = "Part I — General";
const PART_I_ID = "I";

async function fetchXML() {
  if (XML_LOCAL_PATH) {
    console.log(`Reading local ${XML_LOCAL_PATH}...`);
    const text = readFileSync(XML_LOCAL_PATH, "utf-8");
    console.log(`Read ${(text.length / 1024 / 1024).toFixed(1)} MB`);
    return text;
  }
  console.log(`Fetching ${XML_URL}...`);
  const res = await fetch(XML_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  console.log(`Fetched ${(text.length / 1024 / 1024).toFixed(1)} MB`);
  return text;
}

// Restrict extraction to the live, in-force text: everything after </Body>
// (schedules, amendment-history annexes) reuses real-looking section labels
// for its own purposes — e.g. a transitional clause quoting old s. 254 text
// happens to be numbered "36", which would misread as redefining live s. 36.
// <AmendedText> blocks inside <Body> are inline previews of not-yet-in-force
// bills (flagged include-in-TableOfProvisions="no") and get stripped too.
function extractLiveBody(xml) {
  const bodyStart = xml.indexOf("<Body");
  const bodyEnd = xml.indexOf("</Body>");
  if (bodyStart === -1 || bodyEnd === -1) {
    throw new Error("Could not find <Body>...</Body> in the XML");
  }
  const body = xml.slice(bodyStart, bodyEnd + "</Body>".length);
  return body.replace(/<AmendedText[^>]*>[\s\S]*?<\/AmendedText>/g, "");
}

// Walk Heading(level=1) and Section blocks in document order, tracking the
// most recently seen Part heading, so every section is assigned to whatever
// Part it actually appears under in the statute — no numeric ranges to keep
// in sync by hand.
function extractSections(xmlRaw) {
  const xml = extractLiveBody(xmlRaw);
  const sections = [];
  const seen = new Set();
  const partsSeen = [];

  const nodeRegex =
    /<Heading[^>]*level="(\d)"[^>]*>(?:<Label>([^<]*)<\/Label>)?<TitleText>([^<]*)<\/TitleText>|<Section([^>]*)>([\s\S]*?)<\/Section>/g;

  let currentPart = "";
  // Nearest level-2 / level-3 headings above a section (the Code's own
  // sub-headings, e.g. Part VIII > "Homicide"). Level-4 headings are ignored:
  // they only occur inside the sexual-activity-evidence and records regimes
  // (ss. 276-278.98), where the level-3 parent is the useful label.
  let currentHeading = "";
  let currentSubheading = "";
  let pendingPartI = false; // saw the bare "Part I" heading, waiting for "General"
  let match;

  while ((match = nodeRegex.exec(xml)) !== null) {
    const [, level, label, headingTitle, sectionAttrs, sectionBlock] = match;

    if (level) {
      // The "General" sub-heading that completes the Part I special case is
      // level="2" — check it before the level-1-only filter below.
      if (pendingPartI && level === "2" && headingTitle.trim() === "General") {
        currentPart = PART_I_LABEL;
        partsSeen.push({ id: PART_I_ID, label: currentPart });
        pendingPartI = false;
        currentHeading = headingTitle.trim();
        currentSubheading = "";
        continue;
      }
      if (level === "2") {
        currentHeading = headingTitle.trim();
        currentSubheading = "";
        continue;
      }
      if (level === "3") {
        currentSubheading = headingTitle.trim();
        continue;
      }
      if (level !== "1") continue; // level-4 headings don't change anything
      currentHeading = "";
      currentSubheading = "";
      pendingPartI = false;

      if (label && /^PART\s/i.test(label)) {
        const romanLabel = label.replace(/^PART/i, "Part");
        const id = romanLabel.replace(/^Part\s*/i, "").trim();
        const title = headingTitle.trim();
        // A Part heading whose title is "[Repealed, ...]" has no live
        // sections under it — don't add it to the Parts list, but do clear
        // currentPart so nothing downstream is mis-tagged.
        if (/^\[Repealed/i.test(title)) {
          currentPart = "";
          continue;
        }
        currentPart = `${romanLabel} — ${title}`;
        partsSeen.push({ id, label: currentPart });
      } else if (headingTitle.trim() === "Part I") {
        pendingPartI = true;
      } else if (headingTitle.trim() === "Short Title") {
        currentHeading = "Short Title";
      } else if (headingTitle.trim() === "Interpretation") {
        currentHeading = "Interpretation";
        // Precedes the literal "Part I"/"General" heading pair in the
        // document, but ss. 2–3.01 are conventionally treated as Part I.
        currentPart = PART_I_LABEL;
        partsSeen.push({ id: PART_I_ID, label: currentPart });
      }
      // The "Short Title" heading (before "Interpretation") doesn't change
      // currentPart — s. 1 alone is left with no Part, matching convention.
      continue;
    }

    // Section block
    const block = sectionBlock;
    const labelMatch = block.match(/<Label>(\d+(?:\.\d+)?)<\/Label>/);
    if (!labelMatch) continue;
    const sectionNum = labelMatch[1];

    // Skip if the entire section is repealed
    if (block.includes("[Repealed") && !block.match(/<Text>[^<]*[A-Za-z]/)) {
      const textBlocks = block.match(/<Text>([\s\S]*?)<\/Text>/g) || [];
      const hasContent = textBlocks.some((t) => {
        const stripped = stripTags(t)
          .replace(/\[Repealed[^\]]*\]/g, "")
          .trim();
        return stripped.length > 20;
      });
      if (!hasContent) continue;
    }

    const mnMatch = block.match(
      /<MarginalNote[^>]*>([\s\S]*?)<\/MarginalNote>/,
    );
    let title = "";
    if (mnMatch) {
      title = stripTags(mnMatch[1]).trim();
    }
    if (!title) continue; // sub-provisions without their own marginal note

    const dateMatch = sectionAttrs.match(/lims:lastAmendedDate="([^"]*)"/);
    const lastAmendedDate = dateMatch ? dateMatch[1] : "";

    // Deduplicate: keep the first occurrence of each section number
    // (first in document order is the main provision; later ones are transitional/review)
    if (!seen.has(sectionNum)) {
      seen.add(sectionNum);
      sections.push({
        section: sectionNum,
        title,
        partOf: sectionNum === "1" ? "" : currentPart,
        heading: currentHeading,
        subheading: currentSubheading,
        lastAmendedDate,
      });
    }
  }

  return { sections, partsSeen };
}

async function main() {
  const xml = await fetchXML();
  const { sections, partsSeen } = extractSections(xml);

  console.log(`Extracted ${sections.length} sections`);

  // lims:current-date is the XML's own consolidation date — more precise
  // than "generated this month" for judging how stale the data has gotten.
  const currentDateMatch = xml.match(/lims:current-date="([^"]*)"/);
  const metaOutPath = resolve(__dirname, "criminal-code-meta.json");
  writeFileSync(
    metaOutPath,
    JSON.stringify(
      { sourceCurrentDate: currentDateMatch ? currentDateMatch[1] : null },
      null,
      2,
    ),
  );

  // Sort by numeric section number
  sections.sort((a, b) => {
    const na = parseFloat(a.section);
    const nb = parseFloat(b.section);
    return na - nb;
  });

  // Write output
  const outPath = resolve(__dirname, "criminal-code-sections.json");
  writeFileSync(outPath, JSON.stringify(sections, null, 2));
  console.log(`Written to ${outPath}`);

  // Write the ordered, deduplicated Parts list (only Parts with >=1 live
  // section end up here — a repealed Part like the old XII.1 is dropped).
  const livePartLabels = new Set(sections.map((s) => s.partOf).filter(Boolean));
  const seenLabels = new Set();
  const orderedParts = partsSeen.filter((p) => {
    if (seenLabels.has(p.label) || !livePartLabels.has(p.label)) return false;
    seenLabels.add(p.label);
    return true;
  });
  const partsOutPath = resolve(__dirname, "criminal-code-parts.json");
  writeFileSync(partsOutPath, JSON.stringify(orderedParts, null, 2));
  console.log(`Written ${orderedParts.length} live Parts to ${partsOutPath}`);

  // Print summary by Part
  const partCounts = {};
  for (const s of sections) {
    const p = s.partOf || "(no part)";
    partCounts[p] = (partCounts[p] || 0) + 1;
  }
  console.log("\nSections by Part (in document order):");
  for (const part of orderedParts) {
    console.log(`  ${part.label}: ${partCounts[part.label] || 0}`);
  }
  if (partCounts["(no part)"]) {
    console.log(`  (no part): ${partCounts["(no part)"]}`);
  }
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
