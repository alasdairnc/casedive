import { useTheme } from "../lib/ThemeContext.jsx";
import Button from "./ui/Button.jsx";
import { RADIUS, WIDE_MAX_WIDTH, PAGE_GUTTER } from "../lib/ui.js";
import {
  jurisdictions,
  courtLevels,
  dateRanges,
  lawTypeOptions,
} from "../lib/constants.js";

function optionLabel(options, value) {
  return options.find((o) => o.value === value)?.label || value;
}

// One line describing the filters the results were run with, e.g.
// "Ontario · Court of Appeal · Excludes Case Law".
export function describeFilters(filters = {}) {
  const parts = [];
  if (filters.jurisdiction && filters.jurisdiction !== "all") {
    parts.push(optionLabel(jurisdictions, filters.jurisdiction));
  }
  if (filters.courtLevel && filters.courtLevel !== "all") {
    parts.push(optionLabel(courtLevels, filters.courtLevel));
  }
  if (filters.dateRange && filters.dateRange !== "all") {
    parts.push(optionLabel(dateRanges, filters.dateRange));
  }
  const excluded = lawTypeOptions
    .filter((o) => filters.lawTypes?.[o.key] === false)
    .map((o) => o.label);
  if (excluded.length) parts.push(`Excludes ${excluded.join(", ")}`);
  return parts.length
    ? parts.join(" · ")
    : "All jurisdictions, courts and dates";
}

// Desktop results view: the search box and filters collapse into this bar so
// results start higher on the page. "Edit search" brings the full form back.
export default function SearchSummaryBar({ query, filters, onEdit }) {
  const t = useTheme();

  return (
    <section
      data-testid="search-summary"
      aria-label="Current search"
      style={{
        maxWidth: WIDE_MAX_WIDTH,
        margin: "0 auto",
        padding: `20px ${PAGE_GUTTER}px 0`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "14px 16px 14px 18px",
          background: t.bgAlt,
          border: `1px solid ${t.border}`,
          borderRadius: RADIUS.lg,
        }}
      >
        <div style={{ flex: "1 1 auto", minWidth: 0 }}>
          <p
            title={query}
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: 15,
              lineHeight: 1.5,
              color: t.text,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {query}
          </p>
          <p
            style={{
              margin: "4px 0 0",
              fontFamily: "var(--font-body)",
              fontSize: 12,
              lineHeight: 1.5,
              color: t.textTertiary,
            }}
          >
            {describeFilters(filters)}
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={onEdit}
          aria-controls="cd-search-form"
          style={{ flexShrink: 0 }}
        >
          Edit search
        </Button>
      </div>
    </section>
  );
}
