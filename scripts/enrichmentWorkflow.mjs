// scripts/enrichmentWorkflow.mjs
// Reusable Workflow script for the Criminal Code enrichment pipeline.
// Not run with `node` directly — pass its contents to the Workflow tool via
// `scriptPath: "scripts/enrichmentWorkflow.mjs"`, with `args` set to one of:
//
//   { mode: "enrich", batchPaths: ["reports/criminal-code-enrichment/full-batches/batch-01.json", ...] }
//   { mode: "curated-audit", batchPaths: [...] }
//   { mode: "curated-rewrite", batchPaths: [...] }
//   { mode: "penalty-audit", batchPaths: [...] }
//
// "enrich" mode is the proven pilot pattern: writer drafts a plain-language
// summary per section from sourceText only, an independent verifier re-checks
// every claim, and non-curated results get a `summary` field. Curated
// entries (existing.definition present) are still cross-checked for
// mismatches by the verifier's CURATED CHECK step, same as the pilot.
//
// "curated-audit" mode is verifier-only (no writer stage) — for hand-curated
// entries that were never part of an "enrich" batch. It only produces
// curatedMismatch findings for human review; it never proposes a summary and
// mergeEnrichmentBatch.mjs never auto-applies anything to a curated entry
// regardless of mode.
//
// "curated-rewrite" mode fixes curated entries a prior "curated-audit" flagged.
// Batch items are shaped {section, title, sourceText, existing, curatedMismatch}
// (built by a one-off prep step, not prepareEnrichmentBatch.mjs, since it needs
// the mismatch description attached). Writer drafts a corrected `definition`
// (and maxPenalty/relatedSections if warranted) from sourceText only, fixing
// the flagged gap and any other gap it notices; verifier independently
// re-checks the rewrite against sourceText before it's approved. Apply
// approved results with: node scripts/mergeCuratedFix.mjs <results.json>
//
// "penalty-audit" mode is verifier-only, independent-second-check for sections
// that already carry a non-empty maxPenalty a prior pass set with no second
// reviewer (either an untouched pre-enrichment value, or a value the "enrich"
// verifier wrote itself from sourceText during its own SEVERITY/PENALTY step —
// in both cases only ONE agent's judgment, never cross-checked). Batch items
// are shaped {section, title, sourceText, existing: {maxPenalty, severity}}
// (built by a one-off prep step). Produces {section, issue, finalMaxPenalty,
// finalSeverity} — issue="" means confirmed accurate; finalMaxPenalty/
// finalSeverity are only populated when issue is non-empty AND sourceText
// supports a confident correction. Apply corrections with:
// node scripts/mergePenaltyFix.mjs <corrections-only.json> (filter results to
// issue!=="" and finalMaxPenalty!=="" first — see script comments)
//
// Batch files for enrich/curated-audit are produced by prepareEnrichmentBatch.mjs.
// After an enrich/curated-audit run, apply with: node scripts/mergeEnrichmentBatch.mjs <results.json>

export const meta = {
  name: 'criminal-code-enrichment-chunk',
  description: 'Writer+verifier (or verifier-only curated audit) for one chunk of Criminal Code batches',
  phases: [{ title: 'Write' }, { title: 'Verify' }],
}

const BATCH_PATHS = args.batchPaths
const MODE = args.mode || 'enrich'

const WRITER_SCHEMA = {
  type: 'object',
  properties: {
    summaries: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          section: { type: 'string' },
          summary: { type: 'string' },
        },
        required: ['section', 'summary'],
      },
    },
  },
  required: ['summaries'],
}

const REWRITE_WRITER_SCHEMA = {
  type: 'object',
  properties: {
    rewrites: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          section: { type: 'string' },
          definition: { type: 'string' },
          maxPenalty: { type: 'string' },
          relatedSections: { type: 'array', items: { type: 'string' } },
        },
        required: ['section', 'definition', 'maxPenalty', 'relatedSections'],
      },
    },
  },
  required: ['rewrites'],
}

const REWRITE_VERIFIER_SCHEMA = {
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          section: { type: 'string' },
          approved: { type: 'boolean' },
          finalDefinition: { type: 'string' },
          finalMaxPenalty: { type: 'string' },
          finalRelatedSections: { type: 'array', items: { type: 'string' } },
          notes: { type: 'string' },
        },
        required: ['section', 'approved', 'finalDefinition', 'finalMaxPenalty', 'finalRelatedSections', 'notes'],
      },
    },
  },
  required: ['results'],
}

function rewriteWriterPrompt(batchPath) {
  return `Read the JSON file at ${batchPath}. It is an array of Criminal Code of Canada sections, each shaped {section, title, sourceText, existing: {severity, maxPenalty, definition, relatedSections}, curatedMismatch}. existing.definition is a hand-curated definition that a prior independent review found to be inaccurate or incomplete; curatedMismatch describes the specific problem found.

For EVERY section, write a corrected definition using ONLY sourceText as your source of legal content — no outside legal knowledge, no assumptions, nothing not in sourceText. Rules:
- Fix the specific problem named in curatedMismatch.
- Also check the rest of existing.definition against sourceText yourself — if you notice OTHER inaccuracies or omissions beyond the one named, fix those too.
- Preserve everything in existing.definition that is still accurate and well-phrased; don't rewrite from scratch if only one clause is wrong.
- Match the style of a real statute reference: plain but precise legal language, gender-neutral where sourceText itself is gender-neutral, 2-5 sentences depending on how much the section actually contains. Cover every operative paragraph/subsection of an offence-creating section (don't silently drop a branch to save space).
- Do not state case law, outside commentary, or anything not traceable to sourceText.
- Propose a corrected maxPenalty ONLY if sourceText's own punishment clause(s) support a specific, accurate string (if the section has multiple tiers, describe them concisely, e.g. "X years indictable (Y years if <condition>); summary conviction available"). If you're not confident, set maxPenalty to existing.maxPenalty unchanged rather than guessing.
- Propose relatedSections ONLY for sections sourceText itself explicitly cross-references (cap 8). If none should change, return existing.relatedSections unchanged.

Return one entry per section via the schema, section number exactly as given.`
}

function rewriteVerifierPrompt(batchPath, writerOutput) {
  const draftJson = JSON.stringify(writerOutput.rewrites, null, 2)
  return `Read the JSON file at ${batchPath} again — same file: an array of {section, title, sourceText, existing, curatedMismatch}.

A separate writer agent produced draft corrected definitions for these curated sections, using only sourceText, meant to fix the problem in each section's curatedMismatch. Here are its drafts:
${draftJson}

You are the independent verifier. You did NOT write these — your job is to catch anything wrong, not rubber-stamp it. For EVERY section, checking only against that section's own sourceText:

1. Does the draft definition state ONLY things actually in sourceText, with nothing invented, no outside legal knowledge?
2. Does it actually fix the problem described in curatedMismatch?
3. Does it cover every operative paragraph/subsection sourceText contains for this offence, or does it still silently drop something?
4. Is draft maxPenalty accurate against sourceText's own punishment clause(s) (not a cross-reference to another section)? If sourceText doesn't support a confident single answer, finalMaxPenalty should just be existing.maxPenalty unchanged, not a guess.
5. Are relatedSections limited to sections sourceText itself explicitly cross-references?

If the draft passes all checks (or you can fix small issues yourself using only sourceText), set approved=true and put your (possibly corrected) final text in finalDefinition/finalMaxPenalty/finalRelatedSections. If the draft has a problem you cannot fix confidently from sourceText alone, set approved=false, put your reasoning in notes, and leave the final* fields as existing.definition/existing.maxPenalty/existing.relatedSections unchanged (never leave a curated entry with worse text than it started with).

Return one entry per section via the schema, section number exactly as given.`
}

const VERIFIER_SCHEMA = {
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          section: { type: 'string' },
          summaryAccepted: { type: 'boolean' },
          finalSummary: { type: 'string' },
          finalSeverity: { type: 'string' },
          finalMaxPenalty: { type: 'string' },
          finalRelatedSections: { type: 'array', items: { type: 'string' } },
          curatedMismatch: { type: 'string' },
          existingPenaltyIssue: { type: 'string' },
        },
        required: [
          'section', 'summaryAccepted', 'finalSummary', 'finalSeverity',
          'finalMaxPenalty', 'finalRelatedSections', 'curatedMismatch', 'existingPenaltyIssue',
        ],
      },
    },
  },
  required: ['results'],
}

function writerPrompt(batchPath) {
  return `Read the JSON file at ${batchPath}. It is an array of Criminal Code of Canada sections, each shaped {section, title, sourceText, existing, parserSuggestion}. sourceText is the section's actual current statute text (already stripped of historical amendment notes).

For EVERY section in the array, write a plain-language summary of what that section does or says, using ONLY sourceText as your source — no outside legal knowledge, no assumptions, no case law, nothing not in the text. Rules:
- At most 2 sentences.
- Never state a penalty, maximum sentence, or minimum sentence — that is handled by a separate field, and repeating it here risks it going stale independently.
- For an offence-creating section, describe the conduct that constitutes the offence.
- For a procedural, definitional, or administrative section (no offence), describe factually what it does (e.g. "Defines terms used in this Part." / "Sets out the process a court follows when...").
- If sourceText is itself just "[Repealed...]" or otherwise contains no real content, write "No summary — repealed or has no substantive text."
- Do not editorialize, do not add context about why the provision exists, do not cite external sources.

Return one entry per section via the schema, with the section number exactly as given.`
}

function verifierPrompt(batchPath, writerOutput) {
  const draftJson = writerOutput ? JSON.stringify(writerOutput.summaries, null, 2) : '[] (curated-audit mode: no writer draft — every entry in this batch is a hand-curated entry, skip the SUMMARY step entirely and only do the CURATED CHECK)'
  return `Read the JSON file at ${batchPath} again — same file: an array of {section, title, sourceText, existing, parserSuggestion}.

A separate writer agent produced draft plain-language summaries for these sections, using only sourceText. Here are its drafts:
${draftJson}

You are the independent verifier. You did NOT write these summaries — your job is to catch anything the writer got wrong, not to rubber-stamp it. For EVERY section in the batch file, do all of the following, checking only against that section's own sourceText:

1. SUMMARY: Does the draft summary state ONLY things actually in sourceText, with nothing invented, no penalty amounts, no outside knowledge? If it's accurate, set summaryAccepted=true and finalSummary=the (possibly lightly cleaned-up) summary. If it invents anything, states a penalty, or is unsupported, either fix it using only sourceText and set summaryAccepted=true with your corrected finalSummary, or if you cannot produce an accurate 1-2 sentence summary from sourceText alone, set summaryAccepted=false and finalSummary="". If there is no writer draft for this section (curated-audit mode), leave summaryAccepted=false and finalSummary="".

2. SEVERITY/PENALTY: Look at parserSuggestion (may be null) and the section's own sourceText. Only set finalSeverity ("Indictable"|"Hybrid"|"Summary"|"") and finalMaxPenalty if sourceText contains exactly ONE unambiguous, single-tier punishment clause for THIS section itself (not a cross-reference to another section's penalty). If the section has multiple offences/tiers with different penalties, or no penalty clause of its own (e.g. a definitions section), or you are not fully confident, leave finalSeverity and finalMaxPenalty as empty strings "" rather than guessing — do not trust parserSuggestion blindly, verify it against sourceText yourself. In curated-audit mode, always leave these empty — the curated maxPenalty is human-owned.

3. RELATED SECTIONS: Only include a number in finalRelatedSections if sourceText itself explicitly cross-references that section (e.g. "under section 265", "within the meaning of section 279.04"). Do not invent related sections. Cap at 6. In curated-audit mode, always leave this empty.

4. CURATED CHECK: If existing.isCurated is true, this section already has a hand-curated existing.definition and existing.maxPenalty that a human wrote — do NOT propose replacing them (leave finalSummary, finalSeverity, finalMaxPenalty, finalRelatedSections empty for this section, since the curated definition already covers it). Instead, compare existing.definition and existing.maxPenalty against sourceText: does the curated content still accurately and completely describe the CURRENT sourceText (sourceText may include amendments the curated text predates)? If everything the curated text says is still accurate and nothing significant introduced by amendments is missing, set curatedMismatch="". If the curated content is now inaccurate, incomplete, or missing something sourceText clearly adds, describe the specific gap in curatedMismatch (one sentence, concrete — name what's missing or wrong, don't just say "outdated"). Leave existingPenaltyIssue="" for curated sections (step 5 doesn't apply to them).

5. EXISTING PENALTY CHECK (non-curated sections only, i.e. existing.isCurated is false): if existing.maxPenalty is a non-empty string (a value from a prior, unverified pass), check it against sourceText the same way you checked parserSuggestion in step 2. Important: if sourceText itself contains NO punishment clause for this section (the real penalty is very likely stated in a DIFFERENT, cross-referenced section — this is common, e.g. one section defines an offence and a separate numbered section states the penalty for it), you CANNOT verify existing.maxPenalty from sourceText alone — set existingPenaltyIssue="unverifiable — sourceText has no penalty clause of its own, penalty likely lives in a separate section" rather than assuming it's wrong. If sourceText DOES contain its own penalty clause and existing.maxPenalty contradicts it (wrong tier, wrong minimum, wrong years), set existingPenaltyIssue to a one-sentence description of the discrepancy. If existing.maxPenalty is empty already, or sourceText's own penalty clause confirms it, set existingPenaltyIssue="".

Return one entry per section via the schema, section number exactly as given.`
}

const PENALTY_AUDIT_SCHEMA = {
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          section: { type: 'string' },
          issue: { type: 'string' },
          finalMaxPenalty: { type: 'string' },
          finalSeverity: { type: 'string' },
        },
        required: ['section', 'issue', 'finalMaxPenalty', 'finalSeverity'],
      },
    },
  },
  required: ['results'],
}

function penaltyAuditPrompt(batchPath) {
  return `Read the JSON file at ${batchPath}. It is an array of Criminal Code of Canada sections, each shaped {section, title, sourceText, existing: {maxPenalty, severity}}. sourceText is the section's actual current statute text. existing.maxPenalty is a value a PRIOR pass wrote — some were never independently checked, others were set by a single agent's own reading of sourceText with no second reviewer. Your job is that second, independent check.

For EVERY section, checking only against that section's own sourceText:

1. If sourceText contains its own clear punishment clause(s) for this section, verify existing.maxPenalty (and existing.severity — Indictable/Hybrid/Summary) against it: right tier(s), right years, right minimum(s) if any, right severity classification (does sourceText actually offer a summary-conviction option, or is it indictable-only?). If accurate and complete, set issue="".
2. If existing.maxPenalty is wrong, incomplete (e.g. conflates two different tiers into one, omits a minimum, omits a branch with a different penalty), or overstates/understates something, set issue to a specific one-sentence description of the discrepancy, and — ONLY if sourceText itself clearly supports a specific correct answer — set finalMaxPenalty and finalSeverity to the corrected values. If you can identify the problem but sourceText doesn't let you construct full corrected text with confidence, still describe the issue but leave finalMaxPenalty/finalSeverity as empty strings.
3. If sourceText has NO punishment clause of its own for this section (the real penalty is stated in a different, cross-referenced section — common in this Code), set issue="unverifiable — sourceText has no penalty clause of its own" and leave finalMaxPenalty/finalSeverity empty. Do not guess whether the existing value happens to be right.
4. Do not invent anything not traceable to sourceText. Do not use outside legal knowledge beyond what's needed to parse the statute text correctly.

Return one entry per section via the schema, section number exactly as given.`
}

let verified
if (MODE === 'curated-audit') {
  verified = await pipeline(
    BATCH_PATHS,
    (batchPath, _item, i) => agent(verifierPrompt(batchPath, null), {
      label: `audit:batch-${i + 1}`,
      phase: 'Verify',
      schema: VERIFIER_SCHEMA,
    }),
  )
} else if (MODE === 'penalty-audit') {
  verified = await parallel(BATCH_PATHS.map((batchPath, i) => () =>
    agent(penaltyAuditPrompt(batchPath), {
      label: `penalty-audit:batch-${i + 1}`,
      phase: 'Verify',
      schema: PENALTY_AUDIT_SCHEMA,
    })
  ))
} else if (MODE === 'curated-rewrite') {
  verified = await pipeline(
    BATCH_PATHS,
    (batchPath, _item, i) => agent(rewriteWriterPrompt(batchPath), {
      label: `rewrite:batch-${i + 1}`,
      phase: 'Write',
      schema: REWRITE_WRITER_SCHEMA,
    }),
    (writerOutput, batchPath, i) => {
      if (!writerOutput) return null
      return agent(rewriteVerifierPrompt(batchPath, writerOutput), {
        label: `verify-rewrite:batch-${i + 1}`,
        phase: 'Verify',
        schema: REWRITE_VERIFIER_SCHEMA,
      })
    },
  )
} else {
  verified = await pipeline(
    BATCH_PATHS,
    (batchPath, _item, i) => agent(writerPrompt(batchPath), {
      label: `write:batch-${i + 1}`,
      phase: 'Write',
      schema: WRITER_SCHEMA,
      effort: 'low',
    }),
    (writerOutput, batchPath, i) => {
      if (!writerOutput) return null
      return agent(verifierPrompt(batchPath, writerOutput), {
        label: `verify:batch-${i + 1}`,
        phase: 'Verify',
        schema: VERIFIER_SCHEMA,
      })
    },
  )
}

const flat = verified.filter(Boolean).flatMap((v) => v.results ?? v)
log(`${MODE} produced ${flat.length} results across ${BATCH_PATHS.length} batches. Tokens spent: ${budget.spent()}`)

return { mode: MODE, batches: BATCH_PATHS.length, results: flat, tokensSpent: budget.spent() }
