// @vitest-environment happy-dom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import {
  MetricCard,
  TrendlineChart,
  WindowPanel,
} from "../../src/components/retrievalHealthPanels.jsx";

const t = {
  bg: "#fff",
  text: "#000",
  textSecondary: "#555",
  textTertiary: "#888",
  borderLight: "#ddd",
  accent: "#0055cc",
};

afterEach(() => {
  cleanup();
});

describe("MetricCard", () => {
  it("renders label and value", () => {
    render(<MetricCard label="Error Rate" value="4.2%" hint="last 5m" t={t} />);
    expect(screen.getByText("Error Rate")).toBeTruthy();
    expect(screen.getByText("4.2%")).toBeTruthy();
    expect(screen.getByText("last 5m")).toBeTruthy();
  });

  it("renders badge when provided", () => {
    const badge = { label: "WARN", color: "#a00", border: "#a00" };
    render(
      <MetricCard label="No Results" value="12" hint="" badge={badge} t={t} />,
    );
    expect(screen.getByText("WARN")).toBeTruthy();
  });

  it("renders without badge", () => {
    render(<MetricCard label="Latency" value="120ms" hint="" t={t} />);
    expect(screen.getByText("Latency")).toBeTruthy();
    expect(screen.queryByText("WARN")).toBeNull();
  });
});

describe("TrendlineChart", () => {
  it("renders 'No trendline data' when array is empty", () => {
    render(<TrendlineChart trendline={[]} t={t} />);
    expect(screen.getByText("No trendline data")).toBeTruthy();
  });

  it("renders 'No trendline data' when trendline is null", () => {
    render(<TrendlineChart trendline={null} t={t} />);
    expect(screen.getByText("No trendline data")).toBeTruthy();
  });

  it("renders an SVG when trendline has data points", () => {
    const trendline = [
      { errorRate: 0.1, noVerifiedRate: 0.2 },
      { errorRate: 0.05, noVerifiedRate: 0.15 },
      { errorRate: 0.08, noVerifiedRate: 0.1 },
    ];
    const { container } = render(
      <TrendlineChart trendline={trendline} t={t} />,
    );
    expect(container.querySelector("svg")).toBeTruthy();
  });
});

describe("WindowPanel", () => {
  it("renders 'No data' message when windowStats is null", () => {
    render(
      <WindowPanel label="5 MIN" windowStats={null} thresholds={{}} t={t} />,
    );
    expect(screen.getByText("5 MIN")).toBeTruthy();
    expect(screen.getByText(/no data/i)).toBeTruthy();
  });

  it("renders window stats when provided", () => {
    const windowStats = {
      samples: { operational: 10, quality: 8, latency: 5 },
      rates: {
        errorRate: 0.05,
        noVerifiedRate: 0.1,
        fallbackPathRate: 0.2,
        avgVerifiedPerRequest: 2.5,
        avgRelevanceScore: 7.1,
        avgSemanticFilterDrops: 1.2,
        avgConceptRescues: 0.3,
        candidateSourceMix: { ai: 0.6, landmark: 0.3, localFallback: 0.1 },
      },
      latencyMs: { avg: 150, p95: 220 },
      firstEventAt: new Date(Date.now() - 300000).toISOString(),
      lastEventAt: new Date().toISOString(),
      breakdowns: { byIssue: [] },
    };
    const { container } = render(
      <WindowPanel
        label="1 HOUR"
        windowStats={windowStats}
        thresholds={{}}
        t={t}
      />,
    );
    expect(screen.getByText("1 HOUR")).toBeTruthy();
    expect(
      screen.getByText(/Latency avg \/ p95: 150 ms \/ 220 ms/),
    ).toBeTruthy();
    expect(screen.getByText(/Avg verified \/ request: 2\.5/)).toBeTruthy();
    expect(screen.getByText(/Error rate \(5\.0%\)/)).toBeTruthy();
  });
});
