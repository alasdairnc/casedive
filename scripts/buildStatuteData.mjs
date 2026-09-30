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

import { writeFileSync, readFileSync, existsSync } from "fs";
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

// Repeat until stable so nested fragments like "<<b>script>" can't survive one
// pass, then drop any stray angle bracket. Titles are only ever rendered as text.
function stripTags(s) {
  let prev;
  let out = s;
  do {
    prev = out;
    out = out.replace(/<[^>]*>/g, "");
  } while (out !== prev);
  return out.replace(/[<>]/g, "").trim();
}

const NUM_WORDS = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
  ten: 10, eleven: 11, twelve: 12, fourteen: 14, fifteen: 15, eighteen: 18, twenty: 20,
};

const wordToNum = (w) => (/^\d+$/.test(w) ? Number(w) : NUM_WORDS[w.toLowerCase()] ?? null);
// "section 5", "subsection 4(1)", "paragraph 42(2)(c)" written in prose. The XML
// tags few of these, so read the text; skip any that name another Act.
const TEXT_REF_RE = /\b(?:sections?|subsections?|paragraphs?)\s+(\d+(?:\.\d+)?)(?:\(\w+\))*(?!\d)([^.;]{0,60})/gi;
const OTHER_ACT_RE = /^[\s\w.(),]{0,30}?\b(?:of|in) (?:the |that )(?!this Act)[A-Z]/;
const XREF_RE = /<XRefInternal[^>]*>([^<]*)<\/XRefInternal>/g;
const TERM_RE = /imprisonment for a term not exceeding ([\w-]+) (years|months)( less a day)?/gi;

/**
 * Deterministic severity + maximum penalty from a section's own text. Only
 * sections that create an offence ("is guilty of") are read. Where a section has
 * several tiers (by substance, quantity, prior offence) the highest indictable
 * maximum is reported and flagged as varying, never a single misleading figure.
 * Returns null when nothing can be stated safely.
 */
export function extractPenalty(block) {
  const plain = stripTags(
    block.replace(/<HistoricalNote>[\s\S]*?<\/HistoricalNote>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " "),
  );
  if (!/\bis guilty of\b/.test(plain)) return null;

  const indictable = /guilty of an indictable offence/.test(plain);
  const summary = /punishable on summary conviction/.test(plain);
  if (!indictable && !summary) return null;
  const severity = indictable && summary ? "Hybrid" : indictable ? "Indictable" : "Summary";
  if (!indictable) return { severity, maxPenalty: "Summary conviction" };

  const life = (plain.match(/liable to imprisonment for life/g) || []).length;
  const terms = [];
  for (const m of plain.matchAll(TERM_RE)) {
    const n = wordToNum(m[1]);
    if (n == null) return null; // unparseable number word: don't guess
    terms.push({ months: m[2].toLowerCase() === "years" ? n * 12 : n, text: `${n} ${m[2].toLowerCase()}${m[3] ? " less a day" : ""}` });
  }
  const tiers = life + terms.length;
  if (tiers === 0) return null;
  terms.sort((a, b) => b.months - a.months);
  // Summary-conviction terms (months) sit alongside indictable ones; the indictable
  // maximum is always the larger, so the top of the list is the right figure.
  const top = life ? "Life imprisonment" : `${terms[0].text} indictable`;
  const parts = [tiers > 1 ? `Varies by circumstances; up to ${top.toLowerCase()}` : top];
  if (severity === "Hybrid") parts.push("summary conviction available");
  return { severity, maxPenalty: parts.join("; ") };
}

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

    const textOnly = block.replace(/<HistoricalNote>[\s\S]*?<\/HistoricalNote>/g, "");
    const related = [];
    for (const m of textOnly.matchAll(XREF_RE)) {
      const ref = (stripTags(m[1]).match(/(\d+(?:\.\d+)?)/) || [])[1];
      if (ref && ref !== num && !related.includes(ref)) related.push(ref);
    }
    // Prose references. The tail after the number is checked for "of the <other Act>".
    const plainText = stripTags(textOnly.replace(/<[^>]+>/g, " ").replace(/\s+/g, " "));
    for (const m of plainText.matchAll(TEXT_REF_RE)) {
      if (OTHER_ACT_RE.test(m[2]) || /^\s*of (?:the )?(?!this Act)[A-Z]/.test(m[2])) continue;
      if (m[1] !== num && !related.includes(m[1])) related.push(m[1]);
    }
    const penalty = extractPenalty(block);

    const dateMatch = sectionAttrs.match(/lims:lastAmendedDate="([^"]*)"/);
    sections.push({
      section: num,
      title,
      partOf: currentPart,
      heading: currentHeading,
      subheading: currentSubheading,
      lastAmendedDate: dateMatch ? dateMatch[1] : "",
      severity: penalty?.severity ?? "",
      maxPenalty: penalty?.maxPenalty ?? "",
      related,
    });
  }

  sections.sort((a, b) => parseFloat(a.section) - parseFloat(b.section) || a.section.localeCompare(b.section));

  // Cross-references only count when they land on a section that is in the data.
  for (const s of sections) s.related = s.related.filter((r) => seen.has(r)).slice(0, 8);

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

const ROMAN = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10 };

/** Text of a fragment with footnote markers dropped, tags stripped, spaces collapsed. */
function plain(fragment) {
  return stripTags(fragment.replace(/<FootnoteRef\b[^>]*>[^<]*<\/FootnoteRef>/g, "").replace(/\s+/g, " "));
}

// Block-level pieces of a schedule in document order: list depth, headings,
// table captions and rows, and labelled Item/Section/Paragraph text.
const SCHEDULE_TOKEN_RE =
  /<List\b[^>]*>|<\/List>|<thead\b[^>]*>|<\/thead>|<GroupHeading\b[^>]*>([\s\S]*?)<\/GroupHeading>|<Caption\b[^>]*>([\s\S]*?)<\/Caption>|<row\b[^>]*>([\s\S]*?)<\/row>|<(Item|Section|Subsection|Paragraph|Subparagraph|Clause)\b[^>]*>(?:<Label>([^<]*)<\/Label>)?(?:<MarginalNote\b[^>]*>[\s\S]*?<\/MarginalNote>)?<Text>([\s\S]*?)<\/Text>/g;
const ENTRY_RE = /<entry\b[^>]*?(?:\/>|>([\s\S]*?)<\/entry>)/g;
const NESTED_LEVEL = { Section: 0, Subsection: 0, Paragraph: 1, Subparagraph: 2, Clause: 3 };

/**
 * Schedules of the Act (after </Body>), kept as data, not prose: every item's full
 * text, including "and the salts of..." and "including:" lines, so the list
 * never overstates or understates what is scheduled. Skips repealed schedules and
 * the RELATED PROVISIONS / AMENDMENTS NOT IN FORCE blocks. Fails loudly if a
 * schedule contains an element dated after the source's current date.
 */
export function extractSchedules(xmlRaw, currentDate, validSections) {
  const tail = xmlRaw.slice(xmlRaw.indexOf("</Body>"));
  const out = [];
  for (const m of tail.matchAll(/<Schedule\b[^>]*>([\s\S]*?)<\/Schedule>/g)) {
    const block = m[1].replace(/<AmendedText[^>]*>[\s\S]*?<\/AmendedText>/g, "");
    const head = block.match(/<ScheduleFormHeading([^>]*)>\s*<Label>([^<]*)<\/Label>(?:<OriginatingRef>([^<]*)<\/OriginatingRef>)?/);
    if (!head || !/^SCHEDULE\b/.test(head[2])) continue;
    const future = [...block.matchAll(/lims:inforce-start-date="(\d{4}-\d\d-\d\d)"/g)].filter((d) => currentDate !== "unknown" && d[1] > currentDate);
    if (future.length) throw new Error(`${head[2]} has text not yet in force (${future[0][1]})`);

    const items = [];
    let depth = 0;
    let inHead = false;
    let columns = [];
    for (const t of block.matchAll(SCHEDULE_TOKEN_RE)) {
      const tok = t[0];
      if (tok.startsWith("<List")) depth++;
      else if (tok === "</List>") depth--;
      else if (tok.startsWith("<thead")) inHead = true;
      else if (tok === "</thead>") inHead = false;
      else if (t[1] !== undefined) {
        const label = plain(t[1].match(/<Label>([\s\S]*?)<\/Label>/)?.[1] ?? "");
        const title = plain(t[1].match(/<TitleText>([\s\S]*?)<\/TitleText>/)?.[1] ?? "");
        items.push({ h: true, l: label, t: title });
      } else if (t[2] !== undefined) items.push({ h: true, l: "", t: plain(t[2]) });
      else if (t[3] !== undefined) {
        const cells = [...t[3].matchAll(ENTRY_RE)].map((c) => plain(c[1] ?? ""));
        if (inHead) columns = cells;
        else if (cells.some(Boolean)) {
          const [l, text, ...rest] = cells;
          const note = rest.filter(Boolean).join("; ");
          if (text.startsWith("[Repealed")) continue;
          items.push(note ? { l, t: text, d: 0, n: note } : { l, t: text, d: 0 });
        }
      } else if (t[4]) {
        const d = t[4] === "Item" ? Math.max(0, depth - 1) : NESTED_LEVEL[t[4]];
        const text = plain(t[6]);
        if (text && !text.startsWith("[Repealed")) items.push({ l: t[5] ?? "", t: text, d });
      }
    }
    if (!items.some((i) => !i.h)) continue; // fully repealed (Schedules VII, VIII)

    const label = head[2].trim().toLowerCase().replace(/^schedule/, "Schedule").replace(/\b([ivx]+)$/, (r) => r.toUpperCase());
    const idMatch = head[1].match(/lims:id="(\d+)"/);
    const partTitles = items.filter((i) => i.h && i.l && i.t).map((i) => i.t);
    const tops = items.filter((i) => !i.h && i.d === 0).map((i) => i.t.split(/[(,:]/)[0].trim());
    // Title comes from the schedule's own Part headings, else from its first distinct item names.
    const distinct = [...new Set(tops)].filter((n) => n.length > 2 && n.length < 40);
    const name = partTitles.length ? partTitles.slice(0, 3).join("; ") : distinct.length >= 3 && items.length >= 20 ? distinct.slice(0, 3).join("; ") + "…" : "";

    // Sections that use the schedule, from its own "(Sections 2, 4 to 7.1, ...)" note.
    const related = [];
    const ref = (head[3] || "").replace(/^\(|\)$/g, "").replace(/^(?:Sub)?sections?\s+/i, "");
    for (const part of ref.split(/,\s*|\s+and\s+/)) {
      const range = part.match(/^(\d+(?:\.\d+)?)\s+to\s+(\d+(?:\.\d+)?)/);
      const one = part.match(/^(\d+(?:\.\d+)?)/);
      if (range) {
        for (const k of validSections) if (parseFloat(k) >= parseFloat(range[1]) && parseFloat(k) <= parseFloat(range[2])) related.push(k);
      } else if (one && validSections.has(one[1])) related.push(one[1]);
    }
    out.push({
      section: label,
      rank: ROMAN[label.replace(/^Schedule\s*/, "")] ?? 0,
      title: name ? `${label} — ${name}` : related.length === 1 ? `${label} — referred to in s. ${related[0]}` : label,
      related: [...new Set(related)].filter((r) => r !== label),
      sourceId: idMatch ? idMatch[1] : "",
      columns,
      items,
    });
  }
  return out;
}

const q = (s) => JSON.stringify(s);

/** Hand-written, source-checked summaries for the offence sections, kept in a
 *  side file so regenerating from the XML never drops them. */
export function loadSummaries(key) {
  const file = resolve(__dirname, "statute-summaries.json");
  return existsSync(file) ? (JSON.parse(readFileSync(file, "utf-8"))[key] ?? {}) : {};
}

export function renderDataFile(key, { sections, parts, currentDate, summaries = {}, schedules = [] }) {
  const src = STATUTE_SOURCES[key];
  const base = `https://laws-lois.justice.gc.ca/eng/acts/${src.xmlId.toLowerCase()}`;
  const P = src.prefix;
  const rows = sections
    .map((s) => {
      const fields = [
        `title: ${q(s.title)}`,
        `severity: ${q(s.severity)}`,
        `maxPenalty: ${q(s.maxPenalty)}`,
        `url: \`\${JUSTICE_LAWS_BASE}/section-${s.section}.html\``,
        `partOf: ${q(s.partOf)}`,
        `heading: ${q(s.heading)}`,
        `subheading: ${q(s.subheading)}`,
        `lastAmendedDate: ${q(s.lastAmendedDate)}`,
      ];
      if (summaries[s.section]) {
        // Each summary was checked claim-by-claim against the section text by an
        // independent verifier (2026-09-30); corrections are applied in the side file.
        fields.splice(3, 0, `summary: ${q(summaries[s.section])}`, `summarySource: "verified"`);
      }
      if (s.related.length) fields.push(`relatedSections: ${q(s.related)}`);
      return `  [\n    ${q(s.section)},\n    {\n      ${fields.join(",\n      ")},\n    },\n  ],`;
    })
    .join("\n");
  const scheduleRows = schedules
    .map((sc) => {
      const fields = [
        `kind: "schedule"`,
        `title: ${q(sc.title)}`,
        `severity: ""`,
        `maxPenalty: ""`,
        `url: \`\${JUSTICE_LAWS_BASE}/FullText.html#h-${sc.sourceId}\``,
        `partOf: ""`,
        `heading: "Schedules"`,
        `subheading: ""`,
        `lastAmendedDate: ""`,
      ];
      if (sc.related.length) fields.push(`relatedSections: ${q(sc.related)}`);
      if (sc.columns.some(Boolean)) fields.push(`scheduleColumns: ${q(sc.columns.filter(Boolean))}`);
      fields.push(`scheduleItems: [\n${sc.items.map((i) => `        ${q(i)},`).join("\n")}\n      ]`);
      return `  [\n    ${q(sc.section)},\n    {\n      ${fields.join(",\n      ")},\n    },\n  ],`;
    })
    .join("\n");
  const partRows = parts.map((p) => `  { id: ${q(p.id)}, label: ${q(p.label)} },`).join("\n");
  return `// ${src.outFile}
// ${src.title} section lookup for the explorer's statute switcher.
// Auto-generated by scripts/buildStatuteData.mjs from Justice Laws XML
// (laws-lois.justice.gc.ca/eng/XML/${src.xmlId}.xml)
// Source current as of: ${currentDate} (Justice Laws lims:current-date) | Sections: ${sections.length}
// Severity, maxPenalty and relatedSections are extracted from the Act's own text;
// summary comes from scripts/statute-summaries.json; schedules (kind "schedule") carry their own item lists.
// Read by the explorer and api/verify.js (via statuteLookup.js), not by retrieval.
// Kept apart from criminalCodeData.js because section numbers collide across
// Acts (CDSA s. 5 vs Criminal Code s. 5).

const JUSTICE_LAWS_BASE = "${base}";

export const ${P}_SECTIONS = new Map([
${rows}
${scheduleRows}
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
  const currentDate0 = (xml.match(/lims:current-date="([^"]*)"/) || [])[1] || "unknown";
  const schedules = extractSchedules(xml, currentDate0, new Set(sections.map((x) => x.section)));
  const currentDate = (xml.match(/lims:current-date="([^"]*)"/) || [])[1] || "unknown";
  writeFileSync(resolve(__dirname, "..", src.outFile), renderDataFile(key, { sections, parts, currentDate, summaries: loadSummaries(key), schedules }));
  console.log(`${key}: ${sections.length} sections, ${parts.length} parts -> ${src.outFile}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
