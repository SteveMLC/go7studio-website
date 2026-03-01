"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Activity, Clock3, GitBranch, Lock } from "lucide-react";
import { GitHubRepo, LanguageMix, useGitHubInsights } from "./useGithubInsights";
import { OrbitalNetwork } from "./OrbitalNetwork";
import { ContributionStream } from "./ContributionStream";
import { RadialActivityRing } from "./RadialActivityRing";

// P0: Motion-enhanced StatCard with lift + glow
function StatCard({ label, value, index }: { label: string; value: string | number; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ 
        y: -4, 
        scale: 1.02,
        boxShadow: "0 0 30px rgba(56,189,248,0.15)"
      }}
      className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] cursor-default transition-colors hover:border-cyan-300/30"
    >
      <div className="text-xs uppercase tracking-[0.14em] text-white/60">{label}</div>
      <div className="mt-2 text-2xl font-bold text-white">{value}</div>
    </motion.div>
  );
}

function Heatmap({ days }: { days: Array<{ date: string; count: number }> }) {
  const max = Math.max(1, ...days.map((d) => d.count));
  return (
    <div className="overflow-x-auto">
      <div className="grid grid-rows-7 grid-flow-col gap-1 min-w-[900px]">
        {days.map((d) => {
          const p = d.count / max;
          const bg = d.count === 0 ? "rgba(255,255,255,0.06)" : `rgba(56,189,248,${0.2 + p * 0.8})`;
          return <div key={d.date} title={`${d.date}: ${d.count}`} className="h-3 w-3 rounded-sm" style={{ backgroundColor: bg }} />;
        })}
      </div>
    </div>
  );
}

function CodeVelocity({ rows }: { rows: Array<{ week: string; additions: number; deletions: number }> }) {
  const data = rows.slice(-24);
  const max = Math.max(1, ...data.map((r) => Math.max(r.additions, r.deletions)));

  return (
    <div className="space-y-2">
      {data.map((r, i) => (
        <div key={r.week} className="flex items-center gap-3 text-xs">
          <div className="w-20 text-white/50">{r.week.slice(5)}</div>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${Math.round((r.additions / max) * 220)}px` }}
            transition={{ duration: 0.5, delay: i * 0.02 }}
            className="h-2 rounded bg-cyan-400/80" 
          />
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${Math.round((r.deletions / max) * 220)}px` }}
            transition={{ duration: 0.5, delay: i * 0.02 }}
            className="h-2 rounded bg-pink-400/80" 
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
            animate={{ height: `${Math.max(4, Math.round((v / max) * 48))}px` }}
            transition={{ duration: 0.3, delay: i * 0.02 }}
            className="mx-auto w-3 rounded bg-fuchsia-400/80" 
          />
          <div className="text-[10px] text-white/40">{i}</div>
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
      <div className="space-y-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="h-8 w-48 animate-pulse rounded bg-white/10" />
          <div className="mt-4 h-4 w-96 animate-pulse rounded bg-white/10" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="h-3 w-20 animate-pulse rounded bg-white/10" />
              <div className="mt-2 h-8 w-24 animate-pulse rounded bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (user.error || repos.error || contributions.error || codeStats.error) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-red-400/40 bg-red-500/10 p-6 text-red-100"
      >
        <h3 className="font-semibold">Failed to load insights</h3>
        <p className="mt-2 text-sm opacity-80">Check GitHub token + API routes.</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* P0: Cinematic header with particles */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/15 via-slate-950 to-fuchsia-500/10 p-8 shadow-[0_0_40px_rgba(56,189,248,0.12)]"
      >
        {/* Floating particles */}
        <div className="pointer-events-none absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-cyan-400"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -20 - Math.random() * 20, 0],
                opacity: [0.1, 0.4 + Math.random() * 0.3, 0.1],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(56,189,248,0.2),transparent_35%),radial-gradient(circle_at_85%_85%,rgba(232,121,249,0.16),transparent_40%)]" />
        
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 text-white/80"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400"></span>
            </span>
            <span className="text-xs uppercase tracking-[0.22em]">Live Engineering Signal</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative mt-2 text-4xl font-bold tracking-tight text-white"
          >
            GitHub Insights
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative mt-2 max-w-3xl text-white/70"
          >
            Real-time contribution and repository telemetry for Go7Studio. Private repositories are anonymized.
          </motion.p>
        </div>
      </motion.div>

      {/* Stats with staggered entry */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Contributions" value={totals.totalContrib.toLocaleString()} index={0} />
        <StatCard label="Repositories" value={totals.repos} index={1} />
        <StatCard label="Private (Anonymized)" value={totals.privateRepos} index={2} />
        <StatCard label="Active Days" value={totals.activeDays} index={3} />
      </div>

      <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/55">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-cyan-200">telemetry</span>
        <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/30 bg-fuchsia-400/10 px-3 py-1 text-fuchsia-200">activity graph</span>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-white/70">repo anonymization active</span>
      </div>

      <OrbitalNetwork repos={repos.data || []} loading={repos.loading} />

      <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="mb-4 flex items-center gap-2 text-white">
          <Activity className="h-4 w-4 text-cyan-300" /> Activity Matrix (365d)
        </div>
        <Heatmap days={contributions.data?.days || []} />
      </section>

      <ContributionStream days={contributions.data?.days || []} loading={contributions.loading} />

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="mb-4 flex items-center gap-2 text-white">
            <GitBranch className="h-4 w-4 text-cyan-300" /> Code Velocity
          </div>
          <CodeVelocity rows={codeStats.data?.code_frequency || []} />
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="mb-4 flex items-center gap-2 text-white">
            <Clock3 className="h-4 w-4 text-fuchsia-300" /> Commit Clock
          </div>
          <CommitClock hourly={codeStats.data?.hourly_activity || new Array(24).fill(0)} />
        </section>
      </div>

      <RadialActivityRing days={contributions.data?.days || []} loading={contributions.loading} />

      {/* P1: Repo list with stagger + hover */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl border border-white/10 bg-white/5 p-5"
      >
        <div className="mb-4 flex items-center gap-2 text-white">
          <Lock className="h-4 w-4 text-amber-300" /> Repositories
        </div>
        <div className="space-y-2">
          {(repos.data || []).slice(0, 24).map((repo: GitHubRepo, i) => (
            <motion.div 
              key={repo.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.03 }}
              whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.08)" }}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2 transition-colors"
            >
              <div>
                <div className="font-medium text-white">{repo.name}</div>
                <div className="text-xs text-white/60">{repo.description || "No description"}</div>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <span className="rounded-full border border-white/10 px-2 py-1">{repo.language || "n/a"}</span>
                <span className="rounded-full border border-white/10 px-2 py-1">{repo.visibility}</span>
                <span className="rounded-full border border-white/20 px-2 py-1 text-white/70">No External Link</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* P1: Language bars with animated fill */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-2xl border border-white/10 bg-white/5 p-5"
      >
        <h3 className="mb-3 text-white">Language Mix</h3>
        <div className="space-y-2">
          {(languages.data || []).map((l: LanguageMix, i) => (
            <div key={l.name} className="space-y-1">
              <div className="flex justify-between text-xs text-white/70">
                <span>{l.name}</span>
                <span>{l.percentage}%</span>
              </div>
              <div className="h-2 w-full rounded bg-white/10">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${l.percentage}%` }}
                  transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
                  className="h-2 rounded bg-cyan-400" 
                />
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
