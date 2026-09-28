import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { ThemeProvider, useTheme } from "./lib/ThemeContext.jsx";
import { defaultLawTypes } from "./lib/constants.js";
import Header from "./components/Header.jsx";
import FiltersPanel from "./components/FiltersPanel.jsx";
import SearchArea from "./components/SearchArea.jsx";
import StagedLoading from "./components/StagedLoading.jsx";
import Results from "./components/Results.jsx";
import SearchSummaryBar from "./components/SearchSummaryBar.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import Button from "./components/ui/Button.jsx";
import { MAX_CASE_LAW_REPORT_SCENARIO_SNIPPET_LENGTH } from "./lib/caseLawReportReasons.js";
import {
  CONTENT_MAX_WIDTH,
  HEADER_MAX_WIDTH,
  WIDE_MAX_WIDTH,
  WIDE_LAYOUT_QUERY,
  PAGE_GUTTER,
} from "./lib/ui.js";
import { useAuth } from "./hooks/useAuth.js";
import { useMediaQuery } from "./hooks/useMediaQuery.js";
import { scrollBehavior } from "./lib/scroll.js";
import { AuthProvider } from "./lib/AuthContext.jsx";
import { useCloudSync } from "./hooks/useCloudSync.js";
import Toast from "./components/Toast.jsx";

const SearchHistory = lazy(() => import("./components/SearchHistory.jsx"));
const BookmarksPanel = lazy(() => import("./components/BookmarksPanel.jsx"));
const CriminalCodeExplorer = lazy(
  () => import("./components/CriminalCodeExplorer.jsx"),
);
const AuthModal = lazy(() => import("./components/AuthModal.jsx"));
const RetrievalHealthDashboard = lazy(
  () => import("./components/RetrievalHealthDashboard.jsx"),
);

// NOTE: Sensitive user scenario data is no longer stored in localStorage. AdSense script context is restricted.
const EXAMPLE_SCENARIOS = [
  {
    label: "Impaired driving",
    text: "A driver was pulled over at a RIDE checkpoint, failed the roadside breath test, and refused to provide a breathalyzer sample. Police arrested the driver and obtained a blood sample.",
  },
  {
    label: "Break and enter",
    text: "A person was found inside an occupied house at 2 a.m. with stolen electronics. The homeowner was home during the break-in and called 911.",
  },
  {
    label: "Drug trafficking",
    text: "An individual was stopped by police and found with 50 grams of cocaine packaged in individual baggies alongside a scale and $3,000 cash. Police conducted a warrantless search of the vehicle.",
  },
  {
    label: "Assault (GBH)",
    text: "Two people got into a fight outside a bar. One person punched the other repeatedly, causing a broken nose and cheekbone fracture that required surgery.",
  },
  {
    label: "Youth offender",
    text: "A 17-year-old was apprehended shoplifting $800 in clothing from a retail store. It is a first offence with no prior record.",
  },
  {
    label: "Fraud over $5,000",
    text: "An accused allegedly defrauded an elderly victim of $90,000 through a fake investment scheme, collecting payments over 18 months before the victim discovered the fraud.",
  },
];

function createDefaultFilters() {
  return {
    jurisdiction: "all",
    courtLevel: "all",
    dateRange: "all",
    lawTypes: { ...defaultLawTypes },
  };
}

function cloneSubmittedFilters(filters = {}) {
  return {
    jurisdiction: filters.jurisdiction || "all",
    courtLevel: filters.courtLevel || "all",
    dateRange: filters.dateRange || "all",
    lawTypes: {
      criminal_code: filters?.lawTypes?.criminal_code !== false,
      case_law: filters?.lawTypes?.case_law !== false,
      civil_law: filters?.lawTypes?.civil_law !== false,
      charter: filters?.lawTypes?.charter !== false,
    },
  };
}

function toScenarioSnippet(value) {
  if (typeof value !== "string") return "";
  return value
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_CASE_LAW_REPORT_SCENARIO_SNIPPET_LENGTH);
}

const DONATE_URL = "https://buymeacoffee.com/alasdairnc";

const contentColumn = {
  maxWidth: CONTENT_MAX_WIDTH,
  margin: "0 auto",
  paddingLeft: PAGE_GUTTER,
  paddingRight: PAGE_GUTTER,
};

// Landing headline above the search box. Hidden once there's a result.
function Hero({ t }) {
  return (
    <section
      className="cd-fade-in"
      style={{
        ...contentColumn,
        paddingTop: "clamp(32px, 7vw, 56px)",
        paddingBottom: 12,
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(28px, 5vw, 40px)",
          fontWeight: 500,
          color: t.text,
          margin: "0 0 12px 0",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
        }}
      >
        Describe your legal scenario.
      </h1>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 15,
          color: t.textSecondary,
          lineHeight: 1.6,
          margin: 0,
          maxWidth: 560,
        }}
      >
        Criminal Code sections, verified case law, Charter rights, and civil law
        statutes — drawn from CanLII and the Justice Laws database.
      </p>
    </section>
  );
}

// Example chips under the search box. Clicking one fills the textarea.
function ExampleScenarios({ setQuery, t }) {
  return (
    <section
      className="cd-fade-in"
      aria-labelledby="cd-examples-label"
      style={{ ...contentColumn, paddingTop: 32 }}
    >
      {/* Colour must stay an inline hex (AppLandingContrast reads it) */}
      <h2
        id="cd-examples-label"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 13,
          fontWeight: 600,
          color: t.textSecondary,
          margin: "0 0 12px 0",
        }}
      >
        Try an example
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {EXAMPLE_SCENARIOS.map(({ label, text }) => (
          <Button
            key={label}
            variant="secondary"
            size="sm"
            pill
            onClick={() => setQuery(text)}
          >
            {label}
          </Button>
        ))}
      </div>
    </section>
  );
}

function SiteFooter({ t }) {
  const linkStyle = { color: t.textSecondary, minHeight: 32 };

  return (
    <footer style={{ borderTop: `1px solid ${t.borderLight}` }}>
      <div
        style={{
          maxWidth: HEADER_MAX_WIDTH,
          margin: "0 auto",
          padding: `32px ${PAGE_GUTTER}px`,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 24,
        }}
      >
        <div style={{ maxWidth: 440 }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 15,
              fontWeight: 600,
              color: t.text,
              margin: "0 0 4px 0",
            }}
          >
            CaseDive
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: t.textSecondary,
              margin: "0 0 12px 0",
            }}
          >
            Canadian legal research
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: t.textTertiary,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Educational tool only. Not legal advice. Always consult a qualified
            lawyer. Verify all citations with CanLII.
          </p>
        </div>

        <nav
          aria-label="Footer"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            columnGap: 20,
          }}
        >
          <Button variant="link" size="sm" href="/about.html" style={linkStyle}>
            About
          </Button>
          <Button
            variant="link"
            size="sm"
            href="/privacy.html"
            style={linkStyle}
          >
            Privacy
          </Button>
          <Button variant="link" size="sm" href="/terms.html" style={linkStyle}>
            Terms
          </Button>
          <Button
            variant="link"
            size="sm"
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Donate
          </Button>
        </nav>
      </div>
    </footer>
  );
}

function AppInner() {
  const t = useTheme();
  const [pathname, setPathname] = useState(() =>
    typeof window !== "undefined" ? window.location.pathname : "/",
  );

  useEffect(() => {
    const onPop = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const {
    user,
    token,
    loading: authLoading,
    signOut,
    recovery,
    clearRecovery,
    isAuthEnabled,
    authNotice,
    clearAuthNotice,
  } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("signin");

  const openAuthModal = (mode) => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  // Arriving from a password-reset email link: prompt for the new password.
  useEffect(() => {
    if (recovery) {
      setAuthModalMode("reset");
      setAuthModalOpen(true);
    }
  }, [recovery]);

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [codeExplorerOpen, setCodeExplorerOpen] = useState(false);
  const [filters, setFilters] = useState(() => createDefaultFilters());
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [submittedScenarioSnippet, setSubmittedScenarioSnippet] = useState("");
  const [submittedFilters, setSubmittedFilters] = useState(() =>
    createDefaultFilters(),
  );
  const resultsRef = useRef(null);
  // Desktop results view: wide two-column layout, search collapsed to a bar.
  // Stays wide after the first result so a re-search doesn't snap back to
  // the narrow landing column while it loads.
  const isWide = useMediaQuery(WIDE_LAYOUT_QUERY);
  const [hasShownResult, setHasShownResult] = useState(false);
  const [searchCollapsed, setSearchCollapsed] = useState(false);
  const searchInputRef = useRef(null);
  const focusSearchOnExpand = useRef(false);
  // Latest draft, read after the analyze await to tell whether the user kept
  // typing a new scenario while the last one was running.
  const queryRef = useRef(query);
  useEffect(() => {
    queryRef.current = query;
  }, [query]);
  const wideLayout = isWide && hasShownResult;
  const showSummaryBar = wideLayout && searchCollapsed;

  // "Edit search" reveals the form; move focus into the textarea once shown.
  useEffect(() => {
    if (showSummaryBar || !focusSearchOnExpand.current) return;
    focusSearchOnExpand.current = false;
    searchInputRef.current?.focus();
  }, [showSummaryBar]);

  const {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    clearBookmarks,
    history,
    addToHistory,
    clearHistory,
    rerunQuery,
  } = useCloudSync(user, token);

  if (pathname === "/internal/retrieval-health") {
    return (
      <Suspense fallback={null}>
        <RetrievalHealthDashboard
          onNavigateHome={() => {
            window.history.pushState({}, "", "/");
            setPathname("/");
          }}
        />
      </Suspense>
    );
  }

  const analyzeScenario = async (overrideQuery, overrideFilters) => {
    const activeQuery =
      typeof overrideQuery === "string" ? overrideQuery : query;
    const activeFilters =
      overrideFilters && !overrideFilters.target ? overrideFilters : filters;
    if (!activeQuery.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: activeQuery.trim(),
          filters: activeFilters,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        if (response.status === 429) {
          const retryAfter = response.headers.get("Retry-After");
          const mins = retryAfter ? Math.ceil(Number(retryAfter) / 60) : null;
          throw new Error(
            errData.error ||
              (mins
                ? `Rate limit reached. Try again in ${mins} minute${mins !== 1 ? "s" : ""}.`
                : "Rate limit exceeded."),
          );
        }
        throw new Error(errData.error || `Request failed (${response.status})`);
      }

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setSubmittedQuery(activeQuery.trim());
      setSubmittedScenarioSnippet(toScenarioSnippet(activeQuery));
      setSubmittedFilters(cloneSubmittedFilters(activeFilters));
      // Desktop collapses the search over the results, unless the user is
      // still typing a new draft into it.
      const form = document.getElementById("cd-search-form");
      // Focus is "unplaced" if it was in the search form or already dropped to
      // <body> (the Research button disables while loading, which blurs it).
      const isUnplaced = (el) =>
        !el || el === document.body || !!form?.contains(el);
      const focusWasUnplaced = isUnplaced(document.activeElement);
      const stillEditing =
        document.activeElement === searchInputRef.current &&
        queryRef.current.trim() !== activeQuery.trim();

      setResult(data);
      setHasShownResult(true);
      if (!stillEditing) setSearchCollapsed(true);
      addToHistory(activeQuery.trim(), activeFilters, data);

      // On desktop the search sits collapsed above the results, so go to the
      // top of the page; otherwise bring the results into view. The breakpoint
      // is read now because the window may have been resized mid-request.
      setTimeout(() => {
        const behavior = scrollBehavior();
        if (!window.matchMedia?.(WIDE_LAYOUT_QUERY).matches) {
          resultsRef.current?.scrollIntoView?.({ behavior, block: "start" });
          return;
        }
        if (window.scrollY > 0) window.scrollTo?.({ top: 0, behavior });
        // With the form hidden, keyboard and screen-reader users would
        // otherwise start again from <body>; hand focus to the results.
        if (
          focusWasUnplaced &&
          form?.hidden &&
          isUnplaced(document.activeElement)
        ) {
          document
            .getElementById("cd-results-heading")
            ?.focus({ preventScroll: true });
        }
      }, 100);
    } catch (err) {
      const isInternalParse =
        err.message?.includes("parse") && !err.message.includes("Rate");
      setError(
        isInternalParse
          ? "The AI response couldn't be parsed. Try rephrasing your scenario with more detail."
          : err.message || "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const isEmpty = !result && !loading && !error;
  const formWidth = wideLayout ? WIDE_MAX_WIDTH : CONTENT_MAX_WIDTH;

  const expandSearch = () => {
    focusSearchOnExpand.current = true;
    setSearchCollapsed(false);
  };

  return (
    <div
      style={{
        background: t.bg,
        minHeight: "100vh",
        color: t.text,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header
        bookmarkCount={bookmarks.length}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        onOpenCodeExplorer={() => setCodeExplorerOpen(true)}
        onShowHistory={() => setHistoryOpen(true)}
        user={user}
        onAuthClick={
          // Hidden until the stored session is read, so signed-in users
          // don't see Sign In flash before their email appears.
          isAuthEnabled && !authLoading
            ? () => openAuthModal("signin")
            : undefined
        }
        onSignOut={signOut}
      />

      <main
        style={{
          flex: "1 0 auto",
          paddingTop: isEmpty ? 0 : 12,
          paddingBottom: 48,
        }}
      >
        {isEmpty && <Hero t={t} />}

        {showSummaryBar && (
          <SearchSummaryBar
            query={result ? submittedQuery : query}
            filters={result ? submittedFilters : filters}
            onEdit={expandSearch}
          />
        )}

        {/* Kept mounted while collapsed so the draft and history re-runs
            still land in the textarea. */}
        <div id="cd-search-form" hidden={showSummaryBar}>
          <SearchArea
            query={query}
            setQuery={setQuery}
            onSubmit={analyzeScenario}
            loading={loading}
            inputRef={searchInputRef}
            maxWidth={formWidth}
          />

          <FiltersPanel
            filters={filters}
            setFilters={setFilters}
            maxWidth={formWidth}
          />

          {/* Disclaimer (colour must stay an inline hex for AppLandingContrast) */}
          <div
            style={{ ...contentColumn, maxWidth: formWidth, paddingTop: 16 }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                lineHeight: 1.5,
                color: t.textTertiary,
                margin: 0,
              }}
            >
              Educational tool only — not legal advice. Always consult a
              qualified lawyer. Citations verified against CanLII where
              possible.
            </p>
          </div>
        </div>

        {isEmpty && <ExampleScenarios setQuery={setQuery} t={t} />}

        {!isEmpty && (
          <div
            style={{
              ...contentColumn,
              maxWidth: wideLayout ? WIDE_MAX_WIDTH : CONTENT_MAX_WIDTH,
              paddingTop: showSummaryBar ? 8 : 32,
            }}
          >
            {/* Loading and errors keep the reading width in the wide layout */}
            <div
              ref={resultsRef}
              style={wideLayout ? { maxWidth: CONTENT_MAX_WIDTH } : undefined}
            >
              {loading && <StagedLoading />}
              {error && (
                <ErrorMessage message={error} onRetry={analyzeScenario} />
              )}
            </div>

            {result && (
              <div className="cd-results-in">
                <Results
                  data={result}
                  scenario={submittedQuery}
                  scenarioSnippet={submittedScenarioSnippet}
                  filters={submittedFilters}
                  addBookmark={addBookmark}
                  removeBookmark={removeBookmark}
                  isBookmarked={isBookmarked}
                />
              </div>
            )}
          </div>
        )}
      </main>

      <Suspense fallback={null}>
        {authModalOpen && (
          <AuthModal
            isOpen={authModalOpen}
            onClose={() => {
              setAuthModalOpen(false);
              if (recovery) clearRecovery?.();
            }}
            mode={authModalMode}
          />
        )}

        {bookmarksOpen && (
          <BookmarksPanel
            bookmarks={bookmarks}
            removeBookmark={removeBookmark}
            clearBookmarks={clearBookmarks}
            onClose={() => setBookmarksOpen(false)}
          />
        )}

        {codeExplorerOpen && (
          <CriminalCodeExplorer onClose={() => setCodeExplorerOpen(false)} />
        )}

        {historyOpen && (
          <SearchHistory
            history={history}
            onClose={() => setHistoryOpen(false)}
            clearHistory={clearHistory}
            onSelect={(id) => {
              const entry = rerunQuery(id);
              if (!entry) return;
              setQuery(entry.query);
              const restoredFilters = {
                jurisdiction: entry.filters.jurisdiction || "all",
                courtLevel: entry.filters.courtLevel || "all",
                dateRange: entry.filters.dateRange || "all",
                lawTypes: entry.filters.lawTypes || { ...defaultLawTypes },
              };
              setFilters(restoredFilters);
              analyzeScenario(entry.query, restoredFilters);
            }}
          />
        )}
      </Suspense>

      {authNotice && (
        <Toast
          message={authNotice.message}
          actionLabel={
            authNotice.kind === "linkError" && !user ? "Sign in" : undefined
          }
          onAction={() => openAuthModal("signin")}
          onDismiss={clearAuthNotice}
        />
      )}

      <SiteFooter t={t} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </ThemeProvider>
  );
}
