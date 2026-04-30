"use client";

import { useEffect, useRef, useState } from "react";
import { GitBranch } from "lucide-react";

let mermaidPromise: Promise<typeof import("mermaid").default> | null = null;

function loadMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import("mermaid").then((mod) => {
      const mermaid = mod.default;
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "dark",
        themeVariables: {
          background: "#060912",
          primaryColor: "#1f2937",
          primaryTextColor: "#f8fafc",
          primaryBorderColor: "#334155",
          lineColor: "#94a3b8",
          secondaryColor: "#0f172a",
          tertiaryColor: "#1e293b",
          mainBkg: "#1f2937",
          contrastBkg: "#0f172a",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif",
          fontSize: "14px",
        },
        flowchart: { curve: "basis", htmlLabels: true, padding: 20 },
        sequence: { useMaxWidth: true, mirrorActors: false },
        gantt: { useMaxWidth: true },
      });
      return mermaid;
    });
  }
  return mermaidPromise;
}

export function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    setSvg(null);

    loadMermaid()
      .then(async (mermaid) => {
        if (cancelled) return;
        const id = `mermaid-${Math.random().toString(36).slice(2, 11)}`;
        try {
          const { svg: rendered } = await mermaid.render(id, chart);
          if (!cancelled) setSvg(rendered);
        } catch (err) {
          if (!cancelled) {
            const message =
              err instanceof Error ? err.message : "Diagram failed to render.";
            setError(message);
          }
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Mermaid failed to load.");
      });

    return () => {
      cancelled = true;
    };
  }, [chart]);

  return (
    <div className="my-8 overflow-hidden rounded-[24px] border border-white/10 bg-[#060912] shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
        <div className="flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-brand-teal" />
          <span>diagram</span>
        </div>
        <span className="text-white/35">AI Lab</span>
      </div>
      <div
        ref={ref}
        className="flex items-center justify-center overflow-x-auto bg-[#0b0f1a] px-6 py-8"
      >
        {svg ? (
          <div
            className="mermaid-svg w-full max-w-full [&_svg]:!h-auto [&_svg]:max-w-full"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : error ? (
          <div className="w-full">
            <p className="text-sm text-amber-300/90">
              Diagram failed to render — falling back to source.
            </p>
            <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words rounded-lg border border-white/10 bg-black/40 p-4 text-xs leading-6 text-white/70">
              {chart}
            </pre>
          </div>
        ) : (
          <div className="flex h-32 items-center justify-center text-sm text-white/40">
            <span>Rendering diagram…</span>
          </div>
        )}
      </div>
    </div>
  );
}
