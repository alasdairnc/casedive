import { useId } from "react";
import { useTheme } from "../lib/ThemeContext.jsx";
import Button from "./ui/Button.jsx";
import { SelectControl } from "./Select.jsx";
import { CONTENT_MAX_WIDTH, PAGE_GUTTER } from "../lib/ui.js";
import {
  jurisdictions,
  courtLevels,
  dateRanges,
  lawTypeOptions,
  defaultLawTypes,
} from "../lib/constants.js";

// Filter bar under the search box: a row of native selects, then the law-type
// toggle chips. Always visible (tests locate the selects and chips directly).
export default function FiltersPanel({ filters, setFilters }) {
  const t = useTheme();
  const includeLabelId = useId();

  const isNonDefault =
    filters.jurisdiction !== "all" ||
    filters.courtLevel !== "all" ||
    filters.dateRange !== "all" ||
    lawTypeOptions.some((o) => !filters.lawTypes?.[o.key]);

  const selectStyle = { flex: "1 1 150px" };

  return (
    <div
      style={{
        maxWidth: CONTENT_MAX_WIDTH,
        margin: "0 auto",
        padding: `16px ${PAGE_GUTTER}px 0`,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <SelectControl
          value={filters.jurisdiction}
          onChange={(e) =>
            setFilters({ ...filters, jurisdiction: e.target.value })
          }
          style={selectStyle}
          aria-label="Jurisdiction"
        >
          {jurisdictions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </SelectControl>

        <SelectControl
          value={filters.courtLevel}
          onChange={(e) =>
            setFilters({ ...filters, courtLevel: e.target.value })
          }
          style={selectStyle}
          aria-label="Court level"
        >
          {courtLevels.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </SelectControl>

        <SelectControl
          value={filters.dateRange}
          onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
          style={selectStyle}
          aria-label="Date range"
        >
          {dateRanges.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </SelectControl>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
        }}
      >
        {/* Law type toggles — pressed chips are included in results */}
        <div
          role="group"
          aria-labelledby={includeLabelId}
          style={{
            flex: "1 1 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            id={includeLabelId}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: t.textTertiary,
              marginRight: 2,
            }}
          >
            Include
          </span>
          {lawTypeOptions.map((o) => {
            const active = !!filters.lawTypes?.[o.key];
            return (
              <Button
                key={o.key}
                variant="toggle"
                size="sm"
                pill
                pressed={active}
                onClick={() =>
                  setFilters({
                    ...filters,
                    lawTypes: { ...filters.lawTypes, [o.key]: !active },
                  })
                }
              >
                {o.label}
              </Button>
            );
          })}
        </div>

        {isNonDefault && (
          <Button
            variant="link"
            size="sm"
            onClick={() =>
              setFilters({
                jurisdiction: "all",
                courtLevel: "all",
                dateRange: "all",
                lawTypes: { ...defaultLawTypes },
              })
            }
          >
            Reset filters
          </Button>
        )}
      </div>
    </div>
  );
}
