import { useTheme } from "../lib/ThemeContext.jsx";
import {
  jurisdictions,
  courtLevels,
  dateRanges,
  lawTypeOptions,
  defaultLawTypes,
} from "../lib/constants.js";

// filtersOpen / setFiltersOpen are accepted but unused — filters are always visible inline
export default function FiltersPanel({ filters, setFilters }) {
  const t = useTheme();

  const selectStyle = {
    background: "none",
    border: "none",
    borderBottom: `1px solid ${t.border}`,
    color: t.textTertiary,
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 11,
    letterSpacing: "0.06em",
    padding: "3px 18px 3px 0",
    cursor: "pointer",
    outline: "none",
    appearance: "none",
    WebkitAppearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='7' height='4' viewBox='0 0 7 4'%3E%3Cpath fill='${encodeURIComponent(t.textTertiary)}' d='M0 0l3.5 4L7 0z'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 2px center",
    backgroundSize: "6px",
  };

  const isNonDefault =
    filters.jurisdiction !== "all" ||
    filters.courtLevel !== "all" ||
    filters.dateRange !== "all" ||
    lawTypeOptions.some((o) => !filters.lawTypes?.[o.key]);

  return (
    <div
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "12px 24px 0",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "8px 18px",
      }}
    >
      <select
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
      </select>

      <select
        value={filters.courtLevel}
        onChange={(e) => setFilters({ ...filters, courtLevel: e.target.value })}
        style={selectStyle}
        aria-label="Court level"
      >
        {courtLevels.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <select
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
      </select>

      {/* Visual divider */}
      <div
        style={{ width: 1, height: 12, background: t.border, flexShrink: 0 }}
      />

      {/* Law type toggles — strikethrough when off */}
      {lawTypeOptions.map((o) => {
        const active = !!filters.lawTypes?.[o.key];
        return (
          <button
            key={o.key}
            onClick={() =>
              setFilters({
                ...filters,
                lawTypes: { ...filters.lawTypes, [o.key]: !active },
              })
            }
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: 11,
              letterSpacing: "0.06em",
              color: active ? t.textSecondary : t.textTertiary,
              transition: "color 0.15s",
              textDecoration: active ? "none" : "line-through",
            }}
          >
            {o.label}
          </button>
        );
      })}

      {isNonDefault && (
        <button
          onClick={() =>
            setFilters({
              jurisdiction: "all",
              courtLevel: "all",
              dateRange: "all",
              lawTypes: { ...defaultLawTypes },
            })
          }
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Helvetica Neue', sans-serif",
            fontSize: 10,
            letterSpacing: "0.14em",
            color: t.textTertiary,
            padding: 0,
            textTransform: "uppercase",
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
}
