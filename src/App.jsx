import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { ThemeProvider, useTheme } from "./lib/ThemeContext.jsx";
import { defaultLawTypes } from "./lib/constants.js";
import Header from "./components/Header.jsx";
import FiltersPanel from "./components/FiltersPanel.jsx";
import SearchArea from "./components/SearchArea.jsx";
import StagedLoading from "./components/StagedLoading.jsx";
import Results from "./components/Results.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import RetrievalHealthDashboard from "./components/RetrievalHealthDashboard.jsx";
import Button from "./components/ui/Button.jsx";
import { MAX_CASE_LAW_REPORT_SCENARIO_SNIPPET_LENGTH } from "./lib/caseLawReportReasons.js";
import {
  CONTENT_MAX_WIDTH,
  HEADER_MAX_WIDTH,
  PAGE_GUTTER,
} from "./lib/ui.js";
import { useAuth } from "./hooks/useAuth.js";
import { AuthProvider } from "./lib/AuthContext.jsx";
import { useCloudSync } from "./hooks/useCloudSync.js";
import Toast from "./components/Toast.jsx";

const SearchHistory = lazy(() => import("./components/SearchHistory.jsx"));
const BookmarksPanel = lazy(() => import("./components/BookmarksPanel.jsx"));
const CriminalCodeExplorer = lazy(
  () => import("./components/CriminalCodeExplorer.jsx"),
);
const AuthModal = lazy(() => import("./components/AuthModal.jsx"));

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
      <RetrievalHealthDashboard
        onNavigateHome={() => {
          window.history.pushState({}, "", "/");
          setPathname("/");
        }}
      />
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
      setResult(data);
      addToHistory(activeQuery.trim(), activeFilters, data);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
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

        <SearchArea
          query={query}
          setQuery={setQuery}
          onSubmit={analyzeScenario}
          loading={loading}
        />

        <FiltersPanel filters={filters} setFilters={setFilters} />

        {/* Disclaimer (colour must stay an inline hex for AppLandingContrast) */}
        <div style={{ ...contentColumn, paddingTop: 16 }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              lineHeight: 1.5,
              color: t.textTertiary,
              margin: 0,
            }}
          >
            Educational tool only — not legal advice. Always consult a qualified
            lawyer. Citations verified against CanLII where possible.
          </p>
        </div>

        {isEmpty && <ExampleScenarios setQuery={setQuery} t={t} />}

        {!isEmpty && (
          <div style={{ ...contentColumn, paddingTop: 32 }}>
            <div ref={resultsRef}>
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
