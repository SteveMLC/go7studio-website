"use client";

import { useMemo } from "react";
import { Activity, Clock3, GitBranch, Lock, Sparkles } from "lucide-react";
import { GitHubRepo, LanguageMix, useGitHubInsights } from "./useGithubInsights";
import { OrbitalNetwork } from "./OrbitalNetwork";
import { ContributionStream } from "./ContributionStream";
import { RadialActivityRing } from "./RadialActivityRing";

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors hover:border-cyan-300/30">
      <div className="text-xs uppercase tracking-[0.14em] text-white/60">{label}</div>
      <div className="mt-2 text-2xl font-bold text-white">{value}</div>
    </div>
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
      {data.map((r) => (
        <div key={r.week} className="flex items-center gap-3 text-xs">
          <div className="w-20 text-white/50">{r.week.slice(5)}</div>
          <div className="h-2 rounded bg-cyan-400/80" style={{ width: `${Math.round((r.additions / max) * 220)}px` }} />
          <div className="h-2 rounded bg-pink-400/80" style={{ width: `${Math.round((r.deletions / max) * 220)}px` }} />
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
          <div className="mx-auto w-3 rounded bg-fuchsia-400/80" style={{ height: `${Math.max(4, Math.round((v / max) * 48))}px` }} />
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
    return <div className="py-16 text-white/70">Loading insights…</div>;
  }

  if (user.error || repos.error || contributions.error || codeStats.error) {
    return (
      <div className="rounded-2xl border border-red-400/40 bg-red-500/10 p-6 text-red-100">
        Failed to load insights. Check GitHub token + API routes.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/15 via-slate-950 to-fuchsia-500/10 p-8 shadow-[0_0_40px_rgba(56,189,248,0.12)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(56,189,248,0.2),transparent_35%),radial-gradient(circle_at_85%_85%,rgba(232,121,249,0.16),transparent_40%)]" />
        <div className="relative flex flex-wrap items-center gap-3 text-white/80">
          <Sparkles className="h-5 w-5 text-cyan-300" />
          <span className="text-xs uppercase tracking-[0.22em]">Live Engineering Signal</span>
        </div>
        <h1 className="relative mt-2 text-4xl font-bold tracking-tight text-white">GitHub Insights</h1>
        <p className="relative mt-2 max-w-3xl text-white/70">
          Real-time contribution and repository telemetry for Go7Studio. Private repositories are anonymized.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Contributions" value={totals.totalContrib.toLocaleString()} />
        <StatCard label="Repositories" value={totals.repos} />
        <StatCard label="Private (Anonymized)" value={totals.privateRepos} />
        <StatCard label="Active Days" value={totals.activeDays} />
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

      <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="mb-4 flex items-center gap-2 text-white">
          <Lock className="h-4 w-4 text-amber-300" /> Repositories
        </div>
        <div className="space-y-2">
          {(repos.data || []).slice(0, 24).map((repo: GitHubRepo) => (
            <div key={repo.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
              <div>
                <div className="font-medium text-white">{repo.name}</div>
                <div className="text-xs text-white/60">{repo.description || "No description"}</div>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <span className="rounded-full border border-white/10 px-2 py-1">{repo.language || "n/a"}</span>
                <span className="rounded-full border border-white/10 px-2 py-1">{repo.visibility}</span>
                <span className="rounded-full border border-white/20 px-2 py-1 text-white/70">No External Link</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h3 className="mb-3 text-white">Language Mix</h3>
        <div className="space-y-2">
          {(languages.data || []).map((l: LanguageMix) => (
            <div key={l.name} className="space-y-1">
              <div className="flex justify-between text-xs text-white/70"><span>{l.name}</span><span>{l.percentage}%</span></div>
              <div className="h-2 w-full rounded bg-white/10"><div className="h-2 rounded bg-cyan-400" style={{ width: `${l.percentage}%` }} /></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
