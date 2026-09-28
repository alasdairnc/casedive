// scripts/enrichmentWorkflow.mjs
// Reusable Workflow script for the Criminal Code enrichment pipeline.
// Not run with `node` directly — pass its contents to the Workflow tool via
// `scriptPath: "scripts/enrichmentWorkflow.mjs"`, with `args` set to one of:
//
//   { mode: "enrich", batchPaths: ["reports/criminal-code-enrichment/full-batches/batch-01.json", ...] }
//   { mode: "curated-audit", batchPaths: [...] }
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
// Batch files are produced by prepareEnrichmentBatch.mjs. After a run,
// apply results with: node scripts/mergeEnrichmentBatch.mjs <results.json>

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
        },
        required: [
          'section', 'summaryAccepted', 'finalSummary', 'finalSeverity',
          'finalMaxPenalty', 'finalRelatedSections', 'curatedMismatch',
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

4. CURATED CHECK: If existing.isCurated is true, this section already has a hand-curated existing.definition and existing.maxPenalty that a human wrote — do NOT propose replacing them (leave finalSummary, finalSeverity, finalMaxPenalty, finalRelatedSections empty for this section, since the curated definition already covers it). Instead, compare existing.definition and existing.maxPenalty against sourceText: does the curated content still accurately and completely describe the CURRENT sourceText (sourceText may include amendments the curated text predates)? If everything the curated text says is still accurate and nothing significant introduced by amendments is missing, set curatedMismatch="". If the curated content is now inaccurate, incomplete, or missing something sourceText clearly adds, describe the specific gap in curatedMismatch (one sentence, concrete — name what's missing or wrong, don't just say "outdated").

Return one entry per section via the schema, section number exactly as given.`
}

const verified = MODE === 'curated-audit'
  ? await pipeline(
      BATCH_PATHS,
      (batchPath, _item, i) => agent(verifierPrompt(batchPath, null), {
        label: `audit:batch-${i + 1}`,
        phase: 'Verify',
        schema: VERIFIER_SCHEMA,
      }),
    )
  : await pipeline(
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

const flat = verified.filter(Boolean).flatMap((v) => v.results ?? v)
log(`${MODE === 'curated-audit' ? 'Audited' : 'Verified'} ${flat.length} sections across ${BATCH_PATHS.length} batches. Tokens spent: ${budget.spent()}`)

return { mode: MODE, batches: BATCH_PATHS.length, results: flat, tokensSpent: budget.spent() }
