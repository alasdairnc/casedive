import { lookupCivilLawSection } from "./src/lib/civilLawData.js";

const testCitations = [
  "HTA s. 53",
  "MVA s. 144",
  "TSA s. 115",
  "TSA s. 94",
  "AHRA s. 7",
  "CDSA s. 4",
  "YCJA s. 3",
  "CHRA s. 3",
  "CEA s. 16",
  "CCRA s. 100",
  "CC s. 718",
];

testCitations.forEach(citation => {
  const result = lookupCivilLawSection(citation);
  if (result) {
    console.log(`PASS: ${citation} -> ${result.entry.jurisdiction} (${result.entry.statute})`);
  } else {
    console.error(`FAIL: Could not lookup citation: ${citation}`);
    process.exit(1);
  }
});

console.log("All backend civil law lookups verified (including Alberta).");
