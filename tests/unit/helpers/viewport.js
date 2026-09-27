import { act } from "@testing-library/react";

// Stubs window.matchMedia so min-/max-width queries answer as if the window
// were `width` pixels wide. resize() fires change listeners the way a browser
// does, so useMediaQuery re-renders. Other queries (e.g. reduced motion)
// never match.
export function installViewport(initialWidth) {
  const original = window.matchMedia;
  let width = initialWidth;
  const lists = new Set();

  const evaluate = (query) => {
    const min = /min-width:\s*(\d+)px/.exec(query);
    const max = /max-width:\s*(\d+)px/.exec(query);
    if (!min && !max) return false;
    return (
      (!min || width >= Number(min[1])) && (!max || width <= Number(max[1]))
    );
  };

  window.matchMedia = (query) => {
    const listeners = new Set();
    const list = {
      media: query,
      get matches() {
        return evaluate(query);
      },
      onchange: null,
      addEventListener: (_type, fn) => listeners.add(fn),
      removeEventListener: (_type, fn) => listeners.delete(fn),
      addListener: (fn) => listeners.add(fn),
      removeListener: (fn) => listeners.delete(fn),
      dispatchEvent: () => false,
      listeners,
    };
    lists.add(list);
    return list;
  };

  return {
    resize(nextWidth) {
      act(() => {
        const before = new Map([...lists].map((l) => [l, l.matches]));
        width = nextWidth;
        for (const l of lists) {
          if (l.matches === before.get(l)) continue;
          l.listeners.forEach((fn) =>
            fn({ matches: l.matches, media: l.media }),
          );
        }
      });
    },
    restore() {
      window.matchMedia = original;
    },
  };
}
