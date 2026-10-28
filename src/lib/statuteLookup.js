// src/lib/statuteLookup.js
// Full-Act lookup for CDSA and YCJA citations, used by api/verify.js as a
// fallback behind the hand-curated civilLawData.js maps. Kept out of
// civilLawData.js so the client bundle (SuggestionLink) does not pull in both
// Acts, and so retrieval's CIVIL_LAW_INDEX is unchanged.
import { createCivilLawRegistry } from "./civilLawRegistry.js";
import { CDSA_SECTIONS } from "./cdsaData.js";
import { YCJA_SECTIONS } from "./ycjaData.js";

function shaped(map, statute, shortName) {
  return new Map(
    Array.from(map, ([num, e]) => [
      num,
      {
        jurisdiction: "Federal",
        statute,
        shortName,
        kind: e.kind,
        title: e.title,
        url: e.url,
        severity: e.severity,
        maxPenalty: e.maxPenalty,
      },
    ]),
  );
}

const CDSA = shaped(CDSA_SECTIONS, "Controlled Drugs and Substances Act", "CDSA");
const YCJA = shaped(YCJA_SECTIONS, "Youth Criminal Justice Act", "YCJA");

const ACTS = [
  { pattern: /controlled drugs and substances act|\bCDSA\b/i, prefix: "CDSA", map: CDSA },
  { pattern: /youth criminal justice act|\bYCJA\b/i, prefix: "YCJA", map: YCJA },
];

const registry = createCivilLawRegistry({ aliases: ACTS });

const ROMAN = /^[IVX]+$/i;

// "CDSA Schedule I", "Schedule II, CDSA", "YCJA Schedule". A citation that also
// names a section ("CDSA s. 5, Schedule I") is resolved as that section.
function lookupSchedule(citation) {
  const m = citation.match(/\bschedule(?:\s+([IVX]+)\b)?/i);
  if (!m || /\bs\.\s*\d|\bsection\s+\d/i.test(citation)) return null;
  for (const { pattern, map, prefix } of ACTS) {
    if (!pattern.test(citation)) continue;
    const key = m[1] && ROMAN.test(m[1]) ? `Schedule ${m[1].toUpperCase()}` : "Schedule";
    const entry = map.get(key);
    if (entry?.kind === "schedule") return { entry, prefix };
  }
  return null;
}

export function lookupStatuteSection(citation) {
  if (!citation || typeof citation !== "string") return null;
  return lookupSchedule(citation) || registry.lookup(citation);
}
