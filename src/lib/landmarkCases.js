// src/lib/landmarkCases.js
// High-signal landmark case seeds used by retrieval fallback/query enrichment.

const LANDMARK_CASES = [
  {
    citation: "R v Jordan, 2016 SCC 27",
    title: "R v Jordan",
    summary:
      "Sets presumptive ceilings for trial delay under Charter s. 11(b) and provides the modern framework for delay applications.",
    topics: ["trial delay", "charter 11(b)", "crown delay", "reasonable time"],
    structuredSummary: {
      facts:
        "Barrett Jordan was charged with drug offences. Over four years passed between charge and anticipated end of trial. Jordan brought a s. 11(b) application alleging unreasonable delay.",
      held: "Appeal allowed; stay of proceedings entered. The SCC held that delay exceeded the new presumptive ceiling and no exceptional circumstances justified it.",
      ratio:
        "The Court replaced the Morin framework with a new presumptive ceiling of 18 months for Provincial Court cases and 30 months for Superior Court cases (or cases with a preliminary inquiry). Delay beyond the ceiling is presumptively unreasonable unless the Crown can establish exceptional circumstances. Net delay is calculated by deducting defence-caused delay and other exceptional circumstances.",
      significance:
        "Jordan transformed Canadian delay law by replacing the Morin multi-factor balancing test with a ceiling-based framework that presumptively stays proceedings beyond fixed thresholds, dramatically increasing stays for trial delay across the country.",
    },
  },
  {
    citation: "R v Cody, 2017 SCC 31",
    title: "R v Cody",
    summary:
      "Clarifies and applies Jordan, including treatment of defence conduct and institutional delay in s. 11(b) analysis.",
    topics: [
      "trial delay",
      "charter 11(b)",
      "institutional delay",
      "jordan framework",
    ],
    structuredSummary: {
      facts:
        "Cody was charged with drug and firearms offences. Delay from charge to anticipated end of trial exceeded 30 months. The trial judge dismissed the s. 11(b) application; the Court of Appeal allowed it and entered a stay.",
      held: "Appeal dismissed; stay of proceedings upheld. The delay was presumptively unreasonable under the Jordan framework and no exceptional circumstances were established.",
      ratio:
        "The Court elaborated on how to apply Jordan: defence delay must be subtracted only where the defence caused it by its own choices, not merely because the defence was asserting its rights. The Court also addressed how to calculate delay attributable to discrete events and cautioned against over-attributing delay to the defence.",
      significance:
        "Cody is the leading application of Jordan, clarifying the treatment of defence conduct and providing guidance on how courts should attribute and calculate the components of delay under the new framework.",
    },
  },
  {
    citation: "R v Askov, [1990] 2 SCR 1199",
    title: "R v Askov",
    summary:
      "Foundational pre-Jordan delay case on Charter s. 11(b) rights and unreasonable trial delay.",
    topics: ["trial delay", "charter 11(b)", "unreasonable delay"],
    structuredSummary: {
      facts:
        "Askov and co-accused were charged with conspiracy and weapons offences. Their trial was delayed approximately two years from committal to trial, largely due to institutional delay in Peel Region.",
      held: "Stay of proceedings entered. The Court held the delay was unreasonable and violated s. 11(b) of the Charter.",
      ratio:
        "The SCC established a multi-factor balancing test for s. 11(b) applications (later clarified in Morin), weighing the length of delay, waiver of rights, the reasons for delay including systemic institutional delay, and prejudice to the accused. Systemic or institutional delay is attributable to the Crown and government.",
      significance:
        "Askov established that systemic delay is a s. 11(b) violation and led to stays in thousands of cases across Canada. It was later refined by Morin (1992) and ultimately replaced by the Jordan ceiling framework in 2016.",
    },
  },
  {
    citation: "R v Grant, 2009 SCC 32",
    title: "R v Grant",
    summary:
      "Major Charter s. 9 arbitrary detention case on police stops where people were arrested without clear grounds, refining reasonable suspicion and warrant-related detention analysis and exclusion of evidence framework.",
    topics: [
      "charter 9",
      "detention",
      "arbitrary detention",
      "exclusion of evidence",
    ],
    structuredSummary: {
      facts:
        "Grant, a young Black man, was stopped on a Toronto street by plain-clothes officers who found him 'suspicious.' He was questioned and physically blocked from leaving, then searched, revealing a firearm. The officers had no warrant and no reasonable grounds to detain him at the outset.",
      held: "Evidence excluded; acquittal restored. The Court held Grant had been arbitrarily detained contrary to s. 9 and that his s. 10(b) right to counsel had been violated. Applying the new s. 24(2) framework, the Court excluded the firearm.",
      ratio:
        "The Court replaced the Collins/Stillman s. 24(2) framework with a three-part test: (1) seriousness of the Charter-infringing conduct; (2) impact of the breach on the Charter-protected interests of the accused; (3) society's interest in adjudication on the merits. Courts must balance these factors to determine whether admission would bring the administration of justice into disrepute. The Court also clarified when psychological detention (short of physical restraint) constitutes a detention triggering ss. 9 and 10.",
      significance:
        "Grant is the defining modern case on arbitrary detention and the exclusion of evidence. The Grant three-part test replaced the automatic exclusion approach for derivative evidence and introduced a more contextual, balancing-based analysis that now governs all s. 24(2) applications.",
    },
  },
  {
    citation: "Hunter v Southam Inc, [1984] 2 SCR 145",
    title: "Hunter v Southam Inc",
    summary:
      "Foundational s. 8 Charter case on unreasonable search and seizure.",
    topics: ["charter 8", "search", "seizure", "privacy"],
    structuredSummary: {
      facts:
        "Officers of the Combines Investigation Branch executed a search of the Edmonton Journal offices under a warrant issued by the Director of Investigation and Research, who was a party to the investigation. The newspaper challenged the search as unreasonable.",
      held: "Search declared unreasonable; the Combines Investigation Act provisions authorizing the search were struck down as inconsistent with s. 8 of the Charter.",
      ratio:
        "Section 8 protects people, not places, and guarantees a reasonable expectation of privacy. Prior authorization by a neutral and impartial arbiter is presumptively required before a search; warrantless searches are prima facie unreasonable. The authorizing official must be capable of acting judicially and must balance the state's interest in law enforcement against the individual's privacy interest.",
      significance:
        "Hunter v Southam is the foundational s. 8 Charter decision, establishing that reasonable expectation of privacy is the governing standard, that prior judicial authorization is generally required, and that the authorizing official must be independent of the investigation. It remains the starting point for all search and seizure analysis in Canada.",
    },
  },
  {
    citation: "R v Stinchcombe, [1991] 3 SCR 326",
    title: "R v Stinchcombe",
    summary: "Defines Crown disclosure obligations in criminal proceedings.",
    topics: ["disclosure", "crown", "criminal procedure"],
    structuredSummary: {
      facts:
        "Stinchcombe was charged with breach of trust and fraud. His former secretary gave a statement to police that was favourable to the defence. The Crown did not disclose this statement before trial; Stinchcombe was convicted. The defence only learned of the statement post-conviction.",
      held: "New trial ordered. The failure to disclose the statement violated the accused's right to make full answer and defence.",
      ratio:
        "The Crown has a duty to disclose all relevant information in its possession, whether inculpatory or exculpatory, to the defence before trial. The standard is relevance: if the material might be useful to the defence, it must be disclosed. The only exceptions are information that is clearly irrelevant, privileged (such as informer privilege), or whose disclosure would be injurious to the public interest.",
      significance:
        "Stinchcombe is the foundational disclosure case in Canadian criminal law. It established the broad constitutional duty of Crown disclosure as necessary to the accused's right to make full answer and defence under s. 7 of the Charter, and remains the governing authority on disclosure obligations.",
    },
  },
  {
    citation: "R. v. Woods, 2005 SCC 42",
    title: "R. v. Woods",
    summary:
      "Clarifies the s. 10(b) right to counsel when a person is detained or arrested by police, including delayed ability to call a lawyer for hours in roadside breath-demand contexts and renewed informational duty.",
    topics: [
      "charter 10(b)",
      "right to counsel",
      "roadside detention",
      "breath demand",
    ],
    structuredSummary: {
      facts:
        "Woods was stopped for impaired driving and immediately given a roadside breath demand. He invoked his right to counsel but was not allowed to contact a lawyer before providing a roadside sample. He was then arrested, given another s. 10(b) warning, and provided an approved instrument sample.",
      held: "Appeal dismissed; s. 10(b) was not violated at the roadside stage because the approved screening device demand triggered the s. 254(2) roadside exception, which constitutionally permitted the brief delay in implementing the right to counsel.",
      ratio:
        "The right to counsel under s. 10(b) must be implemented 'immediately' upon arrest or detention, but the short delay inherent in the s. 254(2) roadside screening device demand is a justified limitation on that right. Once a detainee is subject to a breath demand on an approved instrument, a new and distinct s. 10(b) right arises, requiring a renewed informational and implementational duty.",
      significance:
        "Woods clarifies the interplay between the roadside screening regime and s. 10(b), confirming that the roadside ASD exception constitutionally justifies brief delay in contact with counsel, while requiring fresh s. 10(b) compliance at the evidentiary breath-testing stage.",
    },
  },
  {
    citation: "R v Gladue, [1999] 1 SCR 688",
    title: "R v Gladue",
    summary:
      "Landmark sentencing case on consideration of Indigenous circumstances under s. 718.2(e).",
    topics: ["sentencing", "indigenous", "gladue", "criminal code 718.2(e)"],
    structuredSummary: {
      facts:
        "Jamie Tanis Gladue, a young Cree woman, pleaded guilty to manslaughter after stabbing her partner. The sentencing judge imposed a three-year custodial term, finding that s. 718.2(e) did not apply because she was living off-reserve.",
      held: "Appeal dismissed on the facts, but the Court used the occasion to provide comprehensive guidance on s. 718.2(e), finding the sentencing judge erred in her approach to that provision (though the sentence imposed was not demonstrably unfit).",
      ratio:
        "Section 718.2(e) of the Criminal Code directs judges to consider all available sanctions other than imprisonment, with particular attention to the circumstances of Aboriginal offenders. Courts must consider: (1) the unique systemic or background factors that may have played a part in bringing the offender before the courts; (2) the types of sentencing procedures and sanctions which may be appropriate in the circumstances because of the offender's particular Aboriginal heritage or connection. The provision applies to all Aboriginal offenders regardless of where they live.",
      significance:
        "Gladue established the constitutional and statutory framework for sentencing Indigenous people, requiring individualized Gladue reports and analysis in every case involving an Aboriginal offender. It was applied and extended in R v Ipeelee, 2012 SCC 13.",
    },
  },
  {
    citation: "R v Oakes, [1986] 1 SCR 103",
    title: "R v Oakes",
    summary:
      "Establishes the Oakes test for Charter s. 1 justification of rights limits.",
    topics: ["charter", "section 1", "oakes test", "proportionality"],
    mustMatchAny: [
      "oakes",
      "section 1",
      "s. 1",
      "proportionality",
      "minimal impairment",
      "charter justification",
      "rights limit",
      "reasonable limits",
    ],
    structuredSummary: {
      facts:
        "Oakes was found in possession of a small quantity of hashish oil. Under s. 8 of the Narcotic Control Act, possession of a narcotic created a presumption of possession for the purpose of trafficking, shifting the burden of proof to the accused to establish the contrary.",
      held: "Section 8 of the Narcotic Control Act violated s. 11(d) of the Charter (presumption of innocence) and was not saved by s. 1.",
      ratio:
        "Section 1 of the Charter permits reasonable limits on rights if prescribed by law and demonstrably justified in a free and democratic society. The Court established the two-stage Oakes test: (1) the objective of the limiting measure must be pressing and substantial; (2) the means must be proportional, requiring (a) a rational connection between the objective and the measure, (b) minimal impairment of the right, and (c) proportionality between the effects of the limitation and the objective.",
      significance:
        "Oakes established the universal framework for s. 1 Charter analysis. The Oakes test governs every case in which a Charter right has been infringed and the government seeks to justify the infringement as a reasonable limit in a free and democratic society.",
    },
  },
];

function norm(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreLandmark(caseItem, haystack) {
  const text = norm(
    [
      caseItem.title,
      caseItem.citation,
      caseItem.summary,
      ...(caseItem.topics || []),
    ].join(" "),
  );
  if (!text) return 0;

  let score = 0;
  if (haystack.includes(norm(caseItem.title))) score += 12;
  if (haystack.includes(norm(caseItem.citation))) score += 14;

  for (const topic of caseItem.topics || []) {
    const t = norm(topic);
    if (!t) continue;
    if (haystack.includes(t)) score += 4;
    const tokens = t.split(" ").filter(Boolean);
    if (tokens.length > 1 && tokens.every((tok) => haystack.includes(tok))) {
      score += 2;
    }
  }

  return score;
}

function hasStrongLandmarkSignal(caseItem, haystack, score) {
  const haystackTokens = new Set(haystack.split(" ").filter(Boolean));
  const matchesRequiredTerm = (term) => {
    if (!term) return false;
    const termTokens = term.split(" ").filter(Boolean);
    if (termTokens.length === 0) return false;
    if (termTokens.length === 1) return haystackTokens.has(termTokens[0]);

    const escaped = termTokens.map((token) =>
      token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    );
    const phrasePattern = new RegExp(`\\b${escaped.join("\\s+")}\\b`);
    if (phrasePattern.test(haystack)) return true;

    return termTokens.every((token) => haystackTokens.has(token));
  };

  const requiredTerms = Array.isArray(caseItem.mustMatchAny)
    ? caseItem.mustMatchAny.map(norm).filter(Boolean)
    : [];
  if (
    requiredTerms.length > 0 &&
    !requiredTerms.some((term) => matchesRequiredTerm(term))
  ) {
    return false;
  }

  const normalizedTitle = norm(caseItem.title);
  const normalizedCitation = norm(caseItem.citation);
  const titleOrCitationHit =
    (normalizedTitle && haystack.includes(normalizedTitle)) ||
    (normalizedCitation && haystack.includes(normalizedCitation));

  if (titleOrCitationHit) return true;

  // Topic-only matches need a higher bar to avoid broad false positives.
  return score >= 6;
}

export function findLandmarkSeeds({
  scenario = "",
  terms = [],
  limit = 3,
} = {}) {
  const haystack = norm([scenario, ...(terms || [])].join(" "));
  if (!haystack) return [];

  const scored = LANDMARK_CASES.map((item) => ({
    item,
    score: scoreLandmark(item, haystack),
  }))
    .filter((entry) => entry.score > 0)
    .filter((entry) =>
      hasStrongLandmarkSignal(entry.item, haystack, entry.score),
    )
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(1, limit))
    .map((entry) => ({
      citation: entry.item.citation,
      title: entry.item.title,
      summary: entry.item.summary,
      matchedTerm: "Landmark seed",
      isLandmark: true,
      landmarkSeed: true,
      retrievalScore: 20 + entry.score,
      retrievalReasons: ["landmark_seed", `seed_score:${entry.score}`],
      semanticMatches: [],
      issueSignals: entry.item.topics.slice(0, 6),
      overlapTokens: [],
    }));

  return scored;
}

// Look up a curated structured summary for a landmark case by citation.
// Returns { facts, held, ratio, significance, keyQuote } or null if not found.
// Used by api/case-summary.js to skip the Claude call for known landmark cases.
export function findLandmarkSummary(citation) {
  if (!citation || typeof citation !== "string") return null;
  const normalizedInput = norm(citation);
  for (const item of LANDMARK_CASES) {
    if (!item.structuredSummary) continue;
    if (norm(item.citation) === normalizedInput) {
      return { ...item.structuredSummary, keyQuote: null };
    }
  }
  return null;
}

export { LANDMARK_CASES };
