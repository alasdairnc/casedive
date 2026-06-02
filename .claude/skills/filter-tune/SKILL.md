---
name: filter-tune
description: Run the CaseDive filter calibration pipeline in the correct sequence with baseline safety check. Checks for an existing baseline before calibrating, then compares results.
disable-model-invocation: true
---

# Filter Tune

Run the filter calibration pipeline in order:

1. Check that a baseline exists:
   `ls scripts/filter-baseline.json 2>/dev/null || echo MISSING`
   If MISSING, run `npm run test:filter:baseline` first and stop —
   do not proceed to calibrate without a baseline.

2. Run the current report: `npm run test:filter`

3. If the user confirmed calibration is wanted:
   `npm run test:filter:calibrate`

4. Run the comparison: `npm run test:filter:compare`

5. Summarize: how many queries improved / regressed / unchanged.
   Flag any category where pass rate dropped more than 5 percentage points.

Do not modify any threshold files manually — only the calibrate script
should write thresholds.
