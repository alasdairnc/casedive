import { useEffect, useState } from "react";

function supportsMatchMedia() {
  return (
    typeof window !== "undefined" && typeof window.matchMedia === "function"
  );
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => supportsMatchMedia() && window.matchMedia(query).matches,
  );

  useEffect(() => {
    if (!supportsMatchMedia()) return undefined;
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    setMatches(mq.matches);
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
    mq.addListener(handler);
    return () => mq.removeListener(handler);
  }, [query]);

  return matches;
}
