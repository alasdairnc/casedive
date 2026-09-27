import { afterAll, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

// Node 25+ has its own localStorage/sessionStorage globals (localStorage is
// undefined unless --localstorage-file is set). Vitest's happy-dom environment
// won't replace a global that already exists, so DOM tests got Node's storage
// instead of the window's. Point both at happy-dom's for the file's duration.
if (typeof document !== "undefined") {
  const { PropertySymbol } = await import("happy-dom");
  const domWindow = document[PropertySymbol.window];
  if (domWindow) {
    const originals = new Map();
    for (const key of ["localStorage", "sessionStorage"]) {
      originals.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
      Object.defineProperty(globalThis, key, {
        value: domWindow[key],
        writable: true,
        configurable: true,
        enumerable: true,
      });
    }
    afterAll(() => {
      for (const [key, descriptor] of originals) {
        if (descriptor) Object.defineProperty(globalThis, key, descriptor);
        else delete globalThis[key];
      }
    });
  }
}
