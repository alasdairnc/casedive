// An explicit { behavior: "smooth" } overrides the reduced-motion rule in
// index.css, so scroll calls ask this instead of hard-coding "smooth".
export function scrollBehavior() {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  return reduce ? "auto" : "smooth";
}
