import { useState, useMemo, useEffect, useRef } from "react";
import { STATUTES, DEFAULT_STATUTE_ID } from "../lib/statutes.js";

const MAX_RESULTS = 100;
const DEBOUNCE_MS = 100;

/**
 * Natural sort for section numbers (e.g., "2", "2.1", "10", "100")
 */
function compareSections(a, b) {
  const partsA = a.split(".").map(Number);
  const partsB = b.split(".").map(Number);

  for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
    const valA = partsA[i] || 0;
    const valB = partsB[i] || 0;
    if (valA !== valB) return valA - valB;
  }
  return a.localeCompare(b);
}

export function useCriminalCodeSearch() {
  const [statuteId, setStatuteIdState] = useState(DEFAULT_STATUTE_ID);
  const statute = STATUTES[statuteId];
  const [query, setQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [partFilter, setPartFilter] = useState("all");
  const [topicFilter, setTopicFilter] = useState("all");
  const [results, setResults] = useState([]);
  const [totalMatches, setTotalMatches] = useState(0);
  const [sections, setSections] = useState(null);
  const [parts, setParts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef(null);

  // Lazy-load the selected statute's dataset. This hook is only used inside
  // CriminalCodeExplorer (a conditional modal), so nothing loads until the
  // explorer opens, and the other Acts load only when their tab is picked.
  useEffect(() => {
    let cancelled = false;
    STATUTES[statuteId].load().then((m) => {
      if (cancelled) return;
      setSections(m.sections);
      setParts(m.parts);
      setIsLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [statuteId]);

  // Switching Acts clears every filter: Parts, topics and severity differ per Act.
  const setStatuteId = (id) => {
    if (id === statuteId || !STATUTES[id]) return;
    setStatuteIdState(id);
    setSections(null);
    setParts([]);
    setIsLoading(true);
    setQuery("");
    setSeverityFilter("all");
    setPartFilter("all");
    setTopicFilter("all");
    setResults([]);
    setTotalMatches(0);
  };

  // Convert Map to array once sections are loaded
  const allSections = useMemo(() => {
    if (!sections) return [];
    return Array.from(sections.entries())
      .map(([num, entry]) => ({
        num,
        ...entry,
        topic: statute.topicFor(num, entry),
        groupLabel: statute.groupLabel(num, entry),
      }))
      .sort((a, b) => compareSections(a.num, b.num));
  }, [sections, statute]);

  // Total section count
  const totalSections = allSections.length;

  useEffect(() => {
    if (!sections) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const q = query
        .toLowerCase()
        .replace(/^s\.\s*/, "")
        .trim();
      const filtered = [];
      let total = 0;

      // Pre-filter by severity and part if they are not "all"
      const needsSeverityFilter = severityFilter !== "all";
      const needsPartFilter = partFilter !== "all";
      const needsTopicFilter = topicFilter !== "all";
      const sevFilterLower = severityFilter.toLowerCase();

      for (const section of allSections) {
        // Severity filter
        if (needsSeverityFilter) {
          const sev = (section.severity || "").toLowerCase();
          if (!sev.includes(sevFilterLower)) continue;
        }

        // Part filter
        if (needsPartFilter) {
          if (!section.partOf || !section.partOf.includes(partFilter)) continue;
        }

        // Topic filter
        if (needsTopicFilter && section.topic !== topicFilter) continue;

        // Text search
        let score = 0;
        if (q) {
          const numMatch = section.num.startsWith(q);
          const titleMatch = (section.title || "").toLowerCase().includes(q);
          const defMatch = (section.definition || "").toLowerCase().includes(q);
          const summaryMatch = (section.summary || "").toLowerCase().includes(q);
          const tagMatch = (section.topicsTagged || []).some((t) =>
            t.toLowerCase().includes(q),
          );

          if (!numMatch && !titleMatch && !defMatch && !summaryMatch && !tagMatch) continue;

          // Score for sorting: exact number > starts with number > title starts > title includes > definition/tags
          if (section.num === q) score = 1000;
          else if (numMatch) score = 800;
          else if ((section.title || "").toLowerCase().startsWith(q))
            score = 600;
          else if (titleMatch) score = 400;
          else if (defMatch) score = 200;
          else score = 100;
        }

        total++;
        if (filtered.length < MAX_RESULTS || q) {
          filtered.push({ ...section, _score: score });
        }
      }

      // Sort by score (desc), then by section number (asc)
      if (q) {
        filtered.sort((a, b) => {
          if (b._score !== a._score) return b._score - a._score;
          return compareSections(a.num, b.num);
        });
      }

      setResults(
        q ? filtered.slice(0, MAX_RESULTS) : filtered.slice(0, MAX_RESULTS),
      );
      setTotalMatches(total);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timerRef.current);
  }, [query, severityFilter, partFilter, topicFilter, allSections, sections]);

  return {
    statute,
    setStatuteId,
    parts,
    query,
    setQuery,
    severityFilter,
    setSeverityFilter,
    partFilter,
    setPartFilter,
    topicFilter,
    setTopicFilter,
    allSections,
    results,
    totalMatches,
    totalSections,
    isLoading,
  };
}
