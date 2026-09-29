#!/usr/bin/env node
// scripts/buildStatuteData.mjs
// Builds src/lib/cdsaData.js / ycjaData.js (section lookup for the explorer's
// statute switcher) from the Justice Laws XML. Same extraction rules as
// buildCriminalCodeData.mjs (live <Body> only, <AmendedText> stripped, Part and
// heading tracked in document order) minus the Criminal Code's Part I special
// case, which does not exist in these Acts.
//
// Usage: node scripts/buildStatuteData.mjs <cdsa|ycja>
// Node's fetch can't resolve DNS through the sandbox proxy that curl uses:
//   curl -o $TMPDIR/C-38.8.xml https://laws-lois.justice.gc.ca/eng/XML/C-38.8.xml
//   XML_LOCAL_PATH=$TMPDIR/C-38.8.xml node scripts/buildStatuteData.mjs cdsa

import { writeFileSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const STATUTE_SOURCES = {
  cdsa: {
    xmlId: "C-38.8",
    title: "Controlled Drugs and Substances Act (SC 1996, c 19)",
    prefix: "CDSA",
    outFile: "src/lib/cdsaData.js",
  },
  ycja: {
    xmlId: "Y-1.5",
    title: "Youth Criminal Justice Act (SC 2002, c 1)",
    prefix: "YCJA",
    outFile: "src/lib/ycjaData.js",
  },
};

/** Keep only the live, in-force text: drop everything after </Body> (schedules,
 *  amendment annexes) and inline <AmendedText> previews of unproclaimed bills. */
export function extractLiveBody(xml) {
  const bodyStart = xml.indexOf("<Body");
  const bodyEnd = xml.indexOf("</Body>");
  if (bodyStart === -1 || bodyEnd === -1) {
    throw new Error("Could not find <Body>...</Body> in the XML");
  }
  return xml
    .slice(bodyStart, bodyEnd + "</Body>".length)
    .replace(/<AmendedText[^>]*>[\s\S]*?<\/AmendedText>/g, "");
}

const stripTags = (s) => s.replace(/<[^>]+>/g, "").trim();

/**
 * Walk headings and sections in document order. Level 1 = Part (or an
 * unlabelled preamble heading such as "Short Title"), level 2/3 = the Act's
 * own sub-headings. Level 4+ is ignored, as in the Criminal Code extractor.
 */
export function extractSections(xmlRaw) {
  const xml = extractLiveBody(xmlRaw);
  const sections = [];
  const seen = new Set();
  const partsSeen = [];

  const nodeRegex =
    /<Heading[^>]*level="(\d)"[^>]*>(?:<Label>([^<]*)<\/Label>)?<TitleText>([^<]*)<\/TitleText>|<Section([^>]*)>([\s\S]*?)<\/Section>/g;

  let currentPart = "";
  let currentHeading = "";
  let currentSubheading = "";
  let match;

  while ((match = nodeRegex.exec(xml)) !== null) {
    const [, level, label, headingTitle, sectionAttrs, block] = match;

    if (level) {
      const title = headingTitle.trim();
      if (level === "2") {
        currentHeading = title;
        currentSubheading = "";
      } else if (level === "3") {
        currentSubheading = title;
      } else if (level === "1") {
        currentSubheading = "";
        if (label && /^PART\s/i.test(label)) {
          currentHeading = "";
          if (/^\[Repealed/i.test(title)) {
            currentPart = "";
            continue;
          }
          const id = label.replace(/^PART\s*/i, "").trim();
          currentPart = `Part ${id} — ${title}`;
          partsSeen.push({ id, label: currentPart });
        } else {
          // Unlabelled level-1 heading (Short Title, Interpretation, Declaration
          // of Principle): its sections sit outside any Part.
          currentPart = "";
          currentHeading = title;
        }
      }
      continue;
    }

    const labelMatch = block.match(/<Label>(\d+(?:\.\d+)?)<\/Label>/);
    if (!labelMatch) continue;
    const num = labelMatch[1];

    const mn = block.match(/<MarginalNote[^>]*>([\s\S]*?)<\/MarginalNote>/);
    const title = mn ? stripTags(mn[1]) : "";
    if (!title) continue; // sub-provisions without their own marginal note

    // A fully repealed section keeps its marginal note but has no live text.
    const texts = block.match(/<Text>([\s\S]*?)<\/Text>/g) || [];
    const hasContent = texts.some(
      (t) => stripTags(t).replace(/\[Repealed[^\]]*\]/g, "").trim().length > 20,
    );
    if (block.includes("[Repealed") && !hasContent) continue;

    // First occurrence wins: later ones are transitional/consequential text.
    if (seen.has(num)) continue;
    seen.add(num);

    const dateMatch = sectionAttrs.match(/lims:lastAmendedDate="([^"]*)"/);
    sections.push({
      section: num,
      title,
      partOf: currentPart,
      heading: currentHeading,
      subheading: currentSubheading,
      lastAmendedDate: dateMatch ? dateMatch[1] : "",
    });
  }

  sections.sort((a, b) => parseFloat(a.section) - parseFloat(b.section) || a.section.localeCompare(b.section));

  // Only Parts that kept at least one live section, in document order.
  const live = new Set(sections.map((s) => s.partOf).filter(Boolean));
  const seenLabels = new Set();
  const parts = partsSeen.filter((p) => {
    if (seenLabels.has(p.label) || !live.has(p.label)) return false;
    seenLabels.add(p.label);
    return true;
  });

  return { sections, parts };
}

const q = (s) => JSON.stringify(s);

export function renderDataFile(key, { sections, parts, currentDate }) {
  const src = STATUTE_SOURCES[key];
  const base = `https://laws-lois.justice.gc.ca/eng/acts/${src.xmlId.toLowerCase()}`;
  const P = src.prefix;
  const rows = sections
    .map((s) => {
      const fields = [
        `title: ${q(s.title)}`,
        `severity: ""`,
        `maxPenalty: ""`,
        `url: \`\${JUSTICE_LAWS_BASE}/section-${s.section}.html\``,
        `partOf: ${q(s.partOf)}`,
        `heading: ${q(s.heading)}`,
        `subheading: ${q(s.subheading)}`,
        `lastAmendedDate: ${q(s.lastAmendedDate)}`,
      ];
      return `  [\n    ${q(s.section)},\n    {\n      ${fields.join(",\n      ")},\n    },\n  ],`;
    })
    .join("\n");
  const partRows = parts.map((p) => `  { id: ${q(p.id)}, label: ${q(p.label)} },`).join("\n");
  return `// ${src.outFile}
// ${src.title} section lookup for the explorer's statute switcher.
// Auto-generated by scripts/buildStatuteData.mjs from Justice Laws XML
// (laws-lois.justice.gc.ca/eng/XML/${src.xmlId}.xml)
// Source current as of: ${currentDate} (Justice Laws lims:current-date) | Sections: ${sections.length}
// Browse data only: no summaries, penalties or severity, and not read by
// retrieval or api/verify.js. Kept apart from criminalCodeData.js because
// section numbers collide across Acts (CDSA s. 5 vs Criminal Code s. 5).

const JUSTICE_LAWS_BASE = "${base}";

export const ${P}_SECTIONS = new Map([
${rows}
]);

export const ${P}_PARTS = [
${partRows}
];
`;
}

async function main() {
  const key = process.argv[2];
  const src = STATUTE_SOURCES[key];
  if (!src) {
    console.error(`Usage: node scripts/buildStatuteData.mjs <${Object.keys(STATUTE_SOURCES).join("|")}>`);
    process.exit(1);
  }
  const local = process.env.XML_LOCAL_PATH;
  let xml;
  if (local) {
    xml = readFileSync(local, "utf-8");
  } else {
    const res = await fetch(`https://laws-lois.justice.gc.ca/eng/XML/${src.xmlId}.xml`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    xml = await res.text();
  }
  const { sections, parts } = extractSections(xml);
  const currentDate = (xml.match(/lims:current-date="([^"]*)"/) || [])[1] || "unknown";
  writeFileSync(resolve(__dirname, "..", src.outFile), renderDataFile(key, { sections, parts, currentDate }));
  console.log(`${key}: ${sections.length} sections, ${parts.length} parts -> ${src.outFile}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
