"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { GitHubRepo, LanguageMix, useGitHubInsights } from "./useGithubInsights";
import { OrbitalNetwork } from "./OrbitalNetwork";
import { ContributionStream } from "./ContributionStream";
import { RadialActivityRing } from "./RadialActivityRing";

// LANGUAGE_COLORS for bars
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

// ENHANCED StatCard with tighter design
function StatCard({ label, value, index }: { label: string; value: string | number; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ y: -2, scale: 1.01 }}
      className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 cursor-default transition-colors hover:border-cyan-500/20"
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">{label}</div>
      <div className="mt-1 text-xl font-bold tabular-nums text-white">{value}</div>
    </motion.div>
  );
}

// ENHANCED Heatmap with month/day labels
function Heatmap({ days }: { days: Array<{ date: string; count: number }> }) {
  const max = Math.max(1, ...days.map((d) => d.count));
  
  // Calculate month positions
  const monthLabels = useMemo(() => {
    const labels: { month: string; index: number }[] = [];
    let currentMonth = "";
    days.forEach((d, i) => {
      const month = new Date(d.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
      if (month !== currentMonth && i % 7 === 0) {
        currentMonth = month;
        labels.push({ month, index: Math.floor(i / 7) });
      }
    });
    return labels;
  }, [days]);
  
  const dayLabels = ['MON', 'WED', 'FRI'];
  
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[900px]">
        {/* Month labels */}
        <div className="mb-2 flex text-[9px] font-semibold uppercase tracking-[0.15em] text-white/40">
          {monthLabels.map((m, i) => (
            <span 
              key={`${m.month}-${i}`} 
              style={{ marginLeft: i === 0 ? '28px' : `${(m.index - (monthLabels[i-1]?.index || 0)) * 16 - 28}px` }}
            >
              {m.month}
            </span>
          ))}
        </div>
        
        <div className="flex gap-1">
          {/* Day labels */}
          <div className="flex flex-col justify-around py-1 pr-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-white/40">
            {dayLabels.map((d) => (
              <span key={d} className="h-3 leading-3">{d}</span>
            ))}
          </div>
          
          {/* Grid */}
          <div className="grid grid-rows-7 grid-flow-col gap-[3px]">
            {days.map((d, i) => {
              const p = d.count / max;
              const bg = d.count === 0
                ? "rgba(255,255,255,0.05)"
                : `rgba(34,211,238,${0.4 + p * 0.6})`;
              return (
                <motion.div 
                  key={d.date}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: (i % 7) * 0.01 + Math.floor(i / 7) * 0.005,
                    duration: 0.2,
                  }}
                  whileHover={{
                    scale: 1.3,
                    boxShadow: "0 0 12px rgba(34,211,238,0.8)",
                  }}
                  title={`${d.date}: ${d.count}`}
                  className="h-3 w-3 rounded-[2px]"
                  style={{
                    backgroundColor: bg,
                    boxShadow: d.count > 0
                      ? `0 0 ${4 + p * 8}px rgba(34,211,238,0.4)`
                      : "none",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function CodeVelocity({ rows }: { rows: Array<{ week: string; additions: number; deletions: number }> }) {
  const data = rows.slice(-24);
  const max = Math.max(1, ...data.map((r) => Math.max(r.additions, r.deletions)));

  return (
    <div className="space-y-1.5">
      {data.map((r, i) => (
        <div key={r.week} className="flex items-center gap-2 text-xs">
          <div className="w-16 text-[10px] tabular-nums text-white/40">{r.week.slice(5)}</div>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${Math.round((r.additions / max) * 180)}px` }}
            transition={{ duration: 0.5, delay: i * 0.02 }}
            className="h-1.5 rounded-full bg-cyan-400" 
          />
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${Math.round((r.deletions / max) * 180)}px` }}
            transition={{ duration: 0.5, delay: i * 0.02 }}
            className="h-1.5 rounded-full bg-fuchsia-400" 
          />
        </div>
      ))}
    </div>
  );
}

function CommitClock({ hourly }: { hourly: number[] }) {
  const max = Math.max(1, ...hourly);
  return (
    <div className="grid grid-cols-12 gap-1">
      {hourly.map((v, i) => (
        <div key={i} className="space-y-1 text-center">
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: `${Math.max(4, Math.round((v / max) * 40))}px` }}
            transition={{ duration: 0.3, delay: i * 0.02 }}
            className="mx-auto w-2 rounded-full bg-fuchsia-400" 
          />
          <div className="text-[9px] tabular-nums text-white/40">{i}</div>
        </div>
      ))}
    </div>
  );
}

export function InsightsDashboard() {
  const username = "SteveMLC";
  const { user, repos, contributions, codeStats, languages } = useGitHubInsights(username);

  const totals = useMemo(() => {
    const rs = repos.data || [];
    const privateCount = rs.filter((r) => r.private).length;
    return {
      repos: rs.length,
      privateRepos: privateCount,
      totalContrib: contributions.data?.total_contributions || 0,
      activeDays: (contributions.data?.days || []).filter((d) => d.count > 0).length,
    };
  }, [repos.data, contributions.data]);

  if (user.loading || repos.loading || contributions.loading || codeStats.loading) {
    return (
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="h-6 w-48 animate-pulse rounded bg-white/10" />
          <div className="mt-3 h-3 w-96 animate-pulse rounded bg-white/10" />
        </div>
      </div>
    );
  }

  if (user.error || repos.error || contributions.error || codeStats.error) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-5xl rounded-xl border border-red-400/40 bg-red-500/10 p-6 text-red-100"
      >
        <h3 className="font-semibold">Failed to load insights</h3>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6">
      {/* ENHANCED: Cinematic header matching source */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-indigo-950 via-slate-950 to-cyan-950 p-6"
      >
        {/* Deep gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.25),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.20),transparent_50%)]" />
        
        {/* Floating particles */}
        <div className="pointer-events-none absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${1 + (i % 4)}px`,
                height: `${1 + (i % 4)}px`,
                backgroundColor: i % 2 === 0 ? "rgb(34 211 238)" : "rgb(232 121 249)",
                left: `${10 + (i * 7) % 80}%`,
                top: `${20 + (i * 13) % 60}%`,
              }}
              animate={{
                x: [0, 8 - (i % 3), 0],
                y: [0, -15 - (i % 5), 0],
                opacity: [0.1, 0.55, 0.1],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        <div className="relative">
          {/* Corner badges */}
          <div className="absolute right-0 top-0 flex gap-2">
            <span className="rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-300">
              STUDIO
            </span>
            <span className="rounded border border-white/20 bg-white/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/70">
              STEVEMLC
            </span>
          </div>
          
          {/* Eyebrow */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-400"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
            </span>
            Live System Telemetry
          </motion.div>
          
          {/* Main title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-2 text-2xl font-bold uppercase tracking-[0.12em] text-white"
          >
            Activity Network
          </motion.h1>
          
          {/* Operations counter badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-1.5"
          >
            <span className="text-lg font-bold tabular-nums text-cyan-300"
            >
              {totals.totalContrib.toLocaleString()}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-cyan-400/70"
            >
              operations logged in current cycle
            </span>
          </motion.div>
          
          {/* Mini stats row */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex gap-4"
          >
            <StatCard label="Repositories" value={totals.repos} index={0} />
            <StatCard label="Active Days" value={totals.activeDays} index={1} />
          </motion.div>
        </div>
      </motion.div>

      {/* ENHANCED: Activity Network (Orbital) */}
      <section className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
          Activity Network
        </h3>
        <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-cyan-300/70">
          Repository Constellation · Language Glow Map
        </p>
        <div className="mt-4">
          <OrbitalNetwork repos={repos.data || []} loading={repos.loading} />
        </div>
      </section>

      {/* ENHANCED: Activity Matrix with labels */}
      <section className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
          Activity Matrix
        </h3>
        <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-cyan-300/70">
          365 Day Contribution History
        </p>
        <div className="mt-4">
          <Heatmap days={contributions.data?.days || []} />
        </div>
      </section>

      {/* ENHANCED: Contribution Stream */}
      <section className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
          Contribution Stream
        </h3>
        <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-cyan-300/70">
          Last 90 Days — Particle Flow Visualization
        </p>
        <div className="mt-4">
          <ContributionStream days={contributions.data?.days || []} loading={contributions.loading} />
        </div>
      </section>

      {/* Code Velocity + Commit Clock */}
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Code Velocity
          </h3>
          <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-cyan-300/70">
            Weekly Additions vs Deletions
          </p>
          <div className="mt-4">
            <CodeVelocity rows={codeStats.data?.code_frequency || []} />
          </div>
        </section>

        <section className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Commit Clock
          </h3>
          <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-cyan-300/70">
            Activity by Hour of Day
          </p>
          <div className="mt-4">
            <CommitClock hourly={codeStats.data?.hourly_activity || new Array(24).fill(0)} />
          </div>
        </section>
      </div>

      <RadialActivityRing days={contributions.data?.days || []} loading={contributions.loading} />

      {/* Repositories */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4"
      >
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
          Repositories
        </h3>
        <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-cyan-300/70">
          {repos.data?.length || 0} Total — Private Repos Anonymized
        </p>
        <div className="mt-4 space-y-1.5">
          {(repos.data || []).slice(0, 24).map((repo: GitHubRepo, i) => (
            <motion.div 
              key={repo.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.02 }}
              whileHover={{ x: 2 }}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/[0.06] bg-black/20 px-3 py-2 transition-colors hover:border-white/10"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-white">{repo.name}</div>
                <div className="truncate text-xs text-white/50">{repo.description || "No description"}</div>
              </div>
              <div className="flex flex-shrink-0 items-center gap-1.5">
                <span 
                  className="rounded border border-white/10 px-1.5 py-0.5 text-[10px]"
                  style={{ color: LANGUAGE_COLORS[repo.language || ''] || '#8b949e' }}
                >
                  {repo.language || "n/a"}
                </span>
                <span className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-white/50">
                  {repo.visibility}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Language Mix */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4"
      >
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
          Language Mix
        </h3>
        <div className="mt-4 space-y-2">
          {(languages.data || []).map((l: LanguageMix, i) => (
            <div key={l.name} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-white/70">{l.name}</span>
                <span className="tabular-nums text-white/50">{l.percentage}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/10">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${l.percentage}%` }}
                  transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
                  className="h-1.5 rounded-full"
                  style={{ backgroundColor: LANGUAGE_COLORS[l.name] || '#38bdf8' }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
