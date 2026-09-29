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

const registry = createCivilLawRegistry({
  aliases: [
    { pattern: /controlled drugs and substances act|\bCDSA\b/i, prefix: "CDSA", map: CDSA },
    { pattern: /youth criminal justice act|\bYCJA\b/i, prefix: "YCJA", map: YCJA },
  ],
});

export function lookupStatuteSection(citation) {
  return registry.lookup(citation);
}
