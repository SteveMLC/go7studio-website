"use client";

import { useEffect, useState } from "react";

export type DayPoint = { date: string; count: number; weekday: number; color?: string };
export type GitHubUser = { login: string; name: string | null; avatar_url: string | null; bio: string | null };
export type GitHubRepo = { id: number; name: string; description: string | null; language: string | null; visibility: string; private: boolean };
export type Contributions = { total_contributions: number; days: DayPoint[]; weekly_totals: number[]; total_commits?: number };
export type CodeStats = { code_frequency: Array<{ week: string; additions: number; deletions: number }>; hourly_activity: number[]; day_hour_activity: number[][] };
export type LanguageMix = { name: string; bytes: number; percentage: number };

type State<T> = { data: T | null; loading: boolean; error: string | null };

function useApi<T>(url: string): State<T> {
  const [state, setState] = useState<State<T>>({ data: null, loading: true, error: null });

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as T;
        if (active) setState({ data, loading: false, error: null });
      } catch (err) {
        if (active) setState({ data: null, loading: false, error: err instanceof Error ? err.message : "Failed" });
      }
    })();

    return () => {
      active = false;
    };
  }, [url]);

  return state;
}

export function useGitHubInsights(username: string) {
  const user = useApi<GitHubUser>(`/api/github/user/${username}`);
  const repos = useApi<GitHubRepo[]>(`/api/github/repos/${username}`);
  const contributions = useApi<Contributions>(`/api/github/contributions/${username}`);
  const codeStats = useApi<CodeStats>(`/api/github/code-stats/${username}`);
  const languages = useApi<LanguageMix[]>(`/api/github/languages/${username}`);

  return { user, repos, contributions, codeStats, languages };
}
