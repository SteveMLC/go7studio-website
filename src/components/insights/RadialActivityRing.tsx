"use client";

import { useEffect, useMemo, useRef } from "react";
import type { DayPoint } from "./useGithubInsights";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function RadialActivityRing({ days, loading }: { days: DayPoint[]; loading?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const weekdayAverages = useMemo(() => {
    const sums = new Array(7).fill(0);
    const counts = new Array(7).fill(0);
    days.forEach((d) => {
      sums[d.weekday] += d.count;
      counts[d.weekday] += 1;
    });
    return sums.map((s, i) => (counts[i] ? s / counts[i] : 0));
  }, [days]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const maxAvg = Math.max(1, ...weekdayAverages);

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
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const size = Math.min(w, h);
      const inner = size * 0.23;
      const outer = size * 0.42;
      const pulse = 0.9 + Math.sin(ts * 0.002) * 0.07;

      weekdayAverages.forEach((avg, i) => {
        const segAngle = (Math.PI * 2) / 7;
        const gap = 0.04;
        const start = -Math.PI / 2 + i * segAngle + gap / 2;
        const end = start + segAngle - gap;
        const ratio = avg / maxAvg;
        const r = inner + (outer - inner) * ratio * pulse;

        const color = `hsla(${190 + i * 18}, 90%, 62%, 0.9)`;
        const grad = ctx.createRadialGradient(cx, cy, inner, cx, cy, r);
        grad.addColorStop(0, color.replace("0.9", "0.35"));
        grad.addColorStop(1, color);

        ctx.beginPath();
        ctx.arc(cx, cy, r, start, end);
        ctx.arc(cx, cy, inner, end, start, true);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        const labelR = r + 15;
        ctx.fillStyle = "rgba(255,255,255,0.75)";
        ctx.font = "11px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const a = (start + end) / 2;
        ctx.fillText(DAY_LABELS[i], cx + Math.cos(a) * labelR, cy + Math.sin(a) * labelR);
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [weekdayAverages]);

  if (loading) return <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">Building activity ring…</div>;

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="mb-1 text-white">Radial Activity Ring</h3>
      <p className="mb-4 text-[11px] uppercase tracking-[0.18em] text-cyan-200/70">Weekly rhythm · average contributions by weekday</p>
      <div ref={wrapRef} className="mx-auto aspect-square w-full max-w-[340px]">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>
    </section>
  );
}
