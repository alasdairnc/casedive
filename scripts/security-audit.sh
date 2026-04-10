#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${1:-casedive.ca}"
TS="$(date +"%Y%m%d_%H%M%S")"
OUT_DIR="security_audit"
RUN_LOG="${OUT_DIR}/run_${TS}.txt"

SUBDOMAINS_FILE="${OUT_DIR}/subdomains_${TS}.txt"
LIVE_TARGETS_FILE="${OUT_DIR}/live_targets_${TS}.txt"
JS_FILES_FILE="${OUT_DIR}/js_files_${TS}.txt"
JSLUICE_SECRETS_FILE="${OUT_DIR}/jsluice_secrets_${TS}.txt"
JSLUICE_URLS_FILE="${OUT_DIR}/jsluice_urls_${TS}.txt"
NUCLEI_RESULTS_FILE="${OUT_DIR}/nuclei_${TS}.txt"

TMP_DIR="$(mktemp -d)"
cleanup() {
  rm -rf "${TMP_DIR}"
}
trap cleanup EXIT

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "[ERROR] Required command not found: $1" >&2
    exit 1
  fi
}

mkdir -p "${OUT_DIR}"

for cmd in subfinder httpx subjs jsluice nuclei curl; do
  require_cmd "${cmd}"
done

log() {
  local msg="$1"
  echo "[$(date +"%Y-%m-%d %H:%M:%S")] ${msg}" | tee -a "${RUN_LOG}"
}

log "Starting security audit for ${DOMAIN}"
log "Output directory: ${OUT_DIR}"

log "Step 1/5: Enumerating subdomains with subfinder"
subfinder -silent -d "${DOMAIN}" | sort -u > "${SUBDOMAINS_FILE}"
log "Subdomains found: $(wc -l < "${SUBDOMAINS_FILE}" | tr -d ' ')"

log "Step 2/5: Verifying live targets with httpx"
httpx -silent -l "${SUBDOMAINS_FILE}" | sort -u > "${LIVE_TARGETS_FILE}"
log "Live targets found: $(wc -l < "${LIVE_TARGETS_FILE}" | tr -d ' ')"

log "Step 3/5: Discovering JavaScript files with subjs"
subjs < "${LIVE_TARGETS_FILE}" | sort -u > "${JS_FILES_FILE}"
log "JavaScript files found: $(wc -l < "${JS_FILES_FILE}" | tr -d ' ')"

: > "${JSLUICE_SECRETS_FILE}"
: > "${JSLUICE_URLS_FILE}"

log "Step 4/5: Running jsluice secrets + urls on each JS file"
js_count=0
while IFS= read -r js_url; do
  [[ -z "${js_url}" ]] && continue
  js_count=$((js_count + 1))

  tmp_js="${TMP_DIR}/js_${js_count}.js"
  if ! curl -fsSL --max-time 30 "${js_url}" -o "${tmp_js}"; then
    log "WARN: Failed to fetch JS (${js_url}), skipping"
    continue
  fi

  {
    echo "===== ${js_url} ====="
    jsluice secrets "${tmp_js}" 2>&1 || true
    echo
  } >> "${JSLUICE_SECRETS_FILE}"

  {
    echo "===== ${js_url} ====="
    jsluice urls "${tmp_js}" 2>&1 || true
    echo
  } >> "${JSLUICE_URLS_FILE}"
done < "${JS_FILES_FILE}"
log "Processed JS files: ${js_count}"

log "Step 5/5: Running nuclei scan (severity: medium,high,critical | tags: xss,exposure | rate-limit: 5)"
nuclei \
  -l "${LIVE_TARGETS_FILE}" \
  -severity medium,high,critical \
  -tags xss,exposure \
  -rate-limit 5 \
  -no-color \
  > "${NUCLEI_RESULTS_FILE}" 2>&1

log "Nuclei scan complete"
log "Security audit completed"
log "Artifacts:"
log "- ${SUBDOMAINS_FILE}"
log "- ${LIVE_TARGETS_FILE}"
log "- ${JS_FILES_FILE}"
log "- ${JSLUICE_SECRETS_FILE}"
log "- ${JSLUICE_URLS_FILE}"
log "- ${NUCLEI_RESULTS_FILE}"
