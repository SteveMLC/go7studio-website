"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { DayPoint } from "./useGithubInsights";

type Particle = { x: number; y: number; baseY: number; size: number; count: number; date: string; r: number; g: number; b: number; t: number };

function colorForRatio(ratio: number): [number, number, number] {
  if (ratio <= 0.33) return [56 + ratio * 250, 189 - ratio * 90, 248 - ratio * 140].map(Math.round) as [number, number, number];
  if (ratio <= 0.66) {
    const t = (ratio - 0.33) / 0.33;
    return [140 + t * 115, 132 - t * 4, 152 + t * 103].map(Math.round) as [number, number, number];
  }
  const t = (ratio - 0.66) / 0.34;
  return [255, 128 + t * 30, 255].map(Math.round) as [number, number, number];
}

export function ContributionStream({ days, loading }: { days: DayPoint[]; loading?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; count: number; date: string } | null>(null);

  const recent = useMemo(() => days.slice(-90), [days]);

  useEffect(() => {
    const maxCount = Math.max(1, ...recent.map((d) => d.count));
    particlesRef.current = recent.map((d, i) => {
      const ratio = d.count / maxCount;
      const [r, g, b] = colorForRatio(ratio);
      return {
        x: i * 10,
        y: 100,
        baseY: 80 + Math.random() * 120,
        size: 1.8 + ratio * 6,
        count: d.count,
        date: d.date,
        r,
        g,
        b,
        t: Math.random() * Math.PI * 2,
      };
    });
  }, [recent]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (ts: number) => {
      const dpr = window.devicePixelRatio || 1;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "rgba(2,6,24,0.2)";
      ctx.fillRect(0, 0, w, h);

      const t = ts * 0.001;
      particlesRef.current.forEach((p, i) => {
        p.x = (i / Math.max(1, particlesRef.current.length - 1)) * w + Math.sin(t * 0.5 + p.t) * 4;
        p.y = p.baseY + Math.sin(t * 0.8 + p.t) * (10 + (p.count / 10));
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        glow.addColorStop(0, `rgba(${p.r},${p.g},${p.b},0.5)`);
        glow.addColorStop(1, `rgba(${p.r},${p.g},${p.b},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},0.95)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  if (loading) return <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">Rendering contribution stream…</div>;

  const onMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    let best: Particle | null = null;
    let bestDist = 22;
    particlesRef.current.forEach((p) => {
      const d = Math.hypot(mx - p.x, my - p.y);
      if (d < bestDist) {
        best = p;
        bestDist = d;
      }
    });

    if (best) {
      const hit = best as Particle;
      setTooltip({ x: hit.x, y: hit.y, count: hit.count, date: hit.date });
    } else {
      setTooltip(null);
    }
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="mb-1 text-white">Contribution Stream</h3>
      <p className="mb-4 text-[11px] uppercase tracking-[0.18em] text-cyan-200/70">Last 90 days · flow intensity by contribution count</p>
      <div ref={wrapRef} className="relative h-[220px] w-full overflow-hidden rounded-lg">
        <canvas ref={canvasRef} onMouseMove={onMove} onMouseLeave={() => setTooltip(null)} className="h-full w-full cursor-crosshair" />
        {tooltip && (
          <div
            className="pointer-events-none absolute rounded-lg border border-white/20 bg-[#020618]/90 px-3 py-2 text-xs text-white/90 shadow-[0_0_18px_rgba(56,189,248,0.2)]"
            style={{ left: `${Math.min(tooltip.x + 14, (wrapRef.current?.clientWidth || 300) - 140)}px`, top: `${Math.max(tooltip.y - 44, 8)}px` }}
          >
            <div className="font-semibold text-cyan-200">{tooltip.count} contribution{tooltip.count === 1 ? "" : "s"}</div>
            <div className="text-white/65">{new Date(tooltip.date).toLocaleDateString()}</div>
          </div>
        )}
      </div>
    </section>
  );
}
