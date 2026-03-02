"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GitHubRepo } from "./useGithubInsights";
import { AnimatedTooltip } from "./AnimatedTooltip";

type OrbitalNode = {
  repo: GitHubRepo;
  orbitRadius: number;
  angle: number;
  speed: number;
  size: number;
  color: string;
};

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Lua: "#000080",
  "C#": "#178600",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
};

const getLanguageColor = (lang: string | null) => (lang ? (LANGUAGE_COLORS[lang] || "#8b949e") : "#6b7280");
const hexToRgb = (hex: string): [number, number, number] => [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];

export function OrbitalNetwork({ repos, loading }: { repos: GitHubRepo[]; loading?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const nodesRef = useRef<OrbitalNode[]>([]);
  const hoveredRef = useRef<number>(-1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const topRepos = useMemo(() => {
    const now = Date.now();
    return [...repos]
      .map((r) => {
        const recency = Math.max(0, 1 - (now - new Date(r.pushed_at).getTime()) / (365 * 24 * 60 * 60 * 1000));
        return { ...r, _activity: recency * 10 + r.stargazers_count + r.forks_count };
      })
      .sort((a, b) => b._activity - a._activity)
      .slice(0, 20);
  }, [repos]);

  useEffect(() => {
    const maxActivity = Math.max(1, ...topRepos.map((r) => r._activity));
    nodesRef.current = topRepos.map((repo, i) => {
      const normalized = repo._activity / maxActivity;
      const layer = i < 6 ? 0.22 : i < 13 ? 0.34 : 0.45;
      return {
        repo,
        orbitRadius: layer + (Math.random() - 0.5) * 0.05,
        angle: (Math.PI * 2 * i) / Math.max(1, topRepos.length),
        speed: 0.00007 + Math.random() * 0.00012,
        size: 3 + normalized * 12,
        color: getLanguageColor(repo.language),
      };
    });
  }, [topRepos]);

  const render = useCallback((ts: number) => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = wrapper.clientWidth;
    const height = wrapper.clientHeight;
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const scale = Math.min(width, height);

    ctx.strokeStyle = "rgba(56,189,248,0.12)";
    ctx.setLineDash([3, 7]);
    [0.22, 0.34, 0.45].forEach((r) => {
      ctx.beginPath();
      ctx.ellipse(cx, cy, r * scale, r * scale * 0.6, 0, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.setLineDash([]);

    const positions = nodesRef.current.map((n) => {
      const angle = n.angle + ts * n.speed;
      return { x: cx + Math.cos(angle) * n.orbitRadius * scale, y: cy + Math.sin(angle) * n.orbitRadius * scale * 0.6 };
    });

    nodesRef.current.forEach((n, i) => {
      const p = positions[i];
      const [r, g, b] = hexToRgb(n.color);
      const hovered = hoveredRef.current === i;
      const pulse = 1 + Math.sin(ts * 0.001 + i) * 0.1;

      // motion trail
      for (let t = 1; t <= 5; t++) {
        const trailAngle = n.angle + (ts - t * 50) * n.speed;
        const tx = cx + Math.cos(trailAngle) * n.orbitRadius * scale;
        const ty = cy + Math.sin(trailAngle) * n.orbitRadius * scale * 0.6;
        const alpha = 0.16 - t * 0.025;
        if (alpha <= 0) continue;
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.beginPath();
        ctx.arc(tx, ty, Math.max(1, n.size * (0.42 - t * 0.06)), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowColor = `rgba(${r},${g},${b},0.95)`;
      ctx.shadowBlur = hovered ? 35 : 20 * pulse;
      const grad = ctx.createRadialGradient(p.x - 1, p.y - 1, 0, p.x, p.y, n.size * (hovered ? 2.1 : 1.4));
      grad.addColorStop(0, `rgba(${Math.min(255, r + 90)},${Math.min(255, g + 90)},${Math.min(255, b + 90)},0.98)`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0.85)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, n.size * (hovered ? 1.45 : 1.1) * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    rafRef.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafRef.current);
  }, [render]);

  const onMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const width = wrapper.clientWidth;
    const height = wrapper.clientHeight;
    const cx = width / 2;
    const cy = height / 2;
    const scale = Math.min(width, height);
    const t = performance.now();

    let best = -1;
    let bestDist = Number.POSITIVE_INFINITY;
    nodesRef.current.forEach((n, i) => {
      const angle = n.angle + t * n.speed;
      const x = cx + Math.cos(angle) * n.orbitRadius * scale;
      const y = cy + Math.sin(angle) * n.orbitRadius * scale * 0.6;
      const d = Math.hypot(mx - x, my - y);
      if (d < n.size * 1.8 && d < bestDist) {
        best = i;
        bestDist = d;
      }
    });

    hoveredRef.current = best;
    if (best >= 0) {
      setHoveredIndex(best);
      setMousePos({ x: Math.min(mx + 14, width - 220), y: Math.max(my - 50, 8) });
    } else {
      setHoveredIndex(null);
    }
  };

  if (loading) return <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">Mapping orbital network…</div>;

  return (
    <div ref={wrapperRef} className="relative h-[420px] w-full">
      <canvas
        ref={canvasRef}
        onMouseMove={onMove}
        onMouseLeave={() => {
          hoveredRef.current = -1;
          setHoveredIndex(null);
        }}
        className="h-full w-full"
      />
      <AnimatedTooltip show={hoveredIndex !== null} x={mousePos.x} y={mousePos.y}>
        {hoveredIndex !== null
          ? `${nodesRef.current[hoveredIndex]?.repo.name} · ${nodesRef.current[hoveredIndex]?.repo.language || "Unknown"}`
          : ""}
      </AnimatedTooltip>
    </div>
  );
}
