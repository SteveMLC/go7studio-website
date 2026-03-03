const GITHUB_API = "https://api.github.com";

type GitHubUserResponse = {
  login: string;
  name: string | null;
  avatar_url: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  type: string;
  company: string | null;
  location: string | null;
  blog: string;
};

type GitHubRepoResponse = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  private: boolean;
  topics?: string[];
  size: number;
  owner?: { login?: string };
};

export type RepoSummary = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  private: boolean;
  visibility: "public" | "private";
  topics: string[];
  size: number;
};

function getToken(): string | null {
  return process.env.GITHUB_TOKEN || null;
}

async function githubFetch<T>(path: string): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${GITHUB_API}${path}`, {
    headers,
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`GitHub API ${res.status} for ${path}`);
  }

  return res.json() as Promise<T>;
}

export async function fetchUser(username: string) {
  const user = await githubFetch<GitHubUserResponse>(`/users/${username}`);
  return {
    login: user.login,
    name: user.name,
    avatar_url: user.avatar_url,
    bio: user.bio,
    public_repos: user.public_repos,
    followers: user.followers,
    following: user.following,
    html_url: user.html_url,
    type: user.type,
    company: user.company,
    location: user.location,
    blog: user.blog,
  };
}

export async function fetchAuthenticatedRepos(username: string): Promise<RepoSummary[]> {
  const token = getToken();
  const endpoint = token
    ? "/user/repos?sort=pushed&per_page=100&type=all"
    : `/users/${username}/repos?sort=pushed&per_page=100&type=owner`;
  const repos = await githubFetch<GitHubRepoResponse[]>(endpoint);

  return repos
    .filter((r) => (r.owner?.login || "").toLowerCase() === username.toLowerCase())
    .map((r) => ({
      id: r.id,
      name: r.name,
      full_name: r.full_name,
      description: r.description,
      html_url: r.private ? null : r.html_url,
      language: r.language,
      stargazers_count: r.stargazers_count,
      forks_count: r.forks_count,
      updated_at: r.updated_at,
      pushed_at: r.pushed_at,
      private: !!r.private,
      visibility: r.private ? "private" : "public",
      topics: r.private ? [] : (r.topics || []),
      size: r.size,
    }));
}

export function anonymizePrivateRepos(repos: RepoSummary[]): RepoSummary[] {
  let privateCounter = 0;
  return repos.map((r) => {
    if (!r.private) return r;
    privateCounter += 1;
    return {
      ...r,
      name: `Private Project ${privateCounter}`,
      full_name: `${r.full_name.split("/")[0]}/private-project-${privateCounter}`,
      description: "Private repository",
      html_url: null,
      topics: [],
    };
  });
}

export async function fetchContributionCalendar(username: string) {
  const token = getToken();
  if (!token) {
    throw new Error("Missing GITHUB_TOKEN for contributions API");
  }
  
  // Get date range for last 90 days to capture more data
  const now = new Date();
  const fromDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  const toDate = now;
  
  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          totalIssueContributions
          totalRepositoryContributions
          restrictedContributionsCount
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                weekday
                color
              }
            }
          }
        }
      }
    }
  `;
  
  const variables = { 
    username, 
    from: fromDate.toISOString(), 
    to: toDate.toISOString() 
  };

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL ${res.status}`);
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors[0].message || "GraphQL error");
  }

  return json.data?.user?.contributionsCollection;
}

export async function fetchLanguages(username: string) {
  const repos = await fetchAuthenticatedRepos(username);
  const top = repos.slice(0, 20);
  const totals: Record<string, number> = {};

  await Promise.all(top.map(async (repo) => {
    try {
      const owner = repo.full_name.split("/")[0];
      const rawRepoName = repo.private ? null : repo.name;
      if (!rawRepoName) return;
      const data = await githubFetch<Record<string, number>>(`/repos/${owner}/${rawRepoName}/languages`);
      for (const [lang, bytes] of Object.entries(data)) {
        totals[lang] = (totals[lang] || 0) + bytes;
      }
    } catch {
      // best effort
    }
  }));

  const totalBytes = Object.values(totals).reduce((a, b) => a + b, 0);
  return Object.entries(totals)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: totalBytes ? Math.round((bytes / totalBytes) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 8);
}

async function fetchCodeFrequency(owner: string, repo: string) {
  const token = getToken();
  if (!token) return null;
  const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/stats/code_frequency`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
    next: { revalidate: 900 },
  });
  if (res.status === 202 || !res.ok) return null;
  return res.json() as Promise<[number, number, number][]>;
}

async function fetchPunchCard(owner: string, repo: string) {
  const token = getToken();
  if (!token) return null;
  const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/stats/punch_card`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
    next: { revalidate: 900 },
  });
  if (res.status === 202 || !res.ok) return null;
  return res.json() as Promise<[number, number, number][]>;
}

export async function fetchCodeStats(username: string) {
  const repos = await fetchAuthenticatedRepos(username);
  const sortable = repos
    .map((r) => ({ ...r, rawName: r.full_name.split("/")[1] }))
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
    .slice(0, 10);

  const codeFreqResults = await Promise.all(
    sortable.map(async (repo) => ({
      repo: repo.name,
      data: await fetchCodeFrequency(username, repo.rawName),
    }))
  );

  const punchCardResults = await Promise.all(
    sortable.map(async (repo) => ({
      repo: repo.name,
      data: await fetchPunchCard(username, repo.rawName),
    }))
  );

  const weeklyCodeFreq: Record<string, { additions: number; deletions: number }> = {};
  for (const { data } of codeFreqResults) {
    if (!data) continue;
    for (const [timestamp, additions, deletions] of data) {
      const weekKey = new Date(timestamp * 1000).toISOString().split("T")[0];
      if (!weeklyCodeFreq[weekKey]) weeklyCodeFreq[weekKey] = { additions: 0, deletions: 0 };
      weeklyCodeFreq[weekKey].additions += additions;
      weeklyCodeFreq[weekKey].deletions += Math.abs(deletions);
    }
  }

  const hourlyActivity = new Array<number>(24).fill(0);
  const dayHourActivity = Array.from({ length: 7 }, () => new Array<number>(24).fill(0));
  for (const { data } of punchCardResults) {
    if (!data) continue;
    for (const [day, hour, count] of data) {
      hourlyActivity[hour] += count;
      dayHourActivity[day][hour] += count;
    }
  }

  const code_frequency = Object.entries(weeklyCodeFreq)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-52)
    .map(([week, stats]) => ({ week, ...stats }));

  return {
    code_frequency,
    hourly_activity: hourlyActivity,
    day_hour_activity: dayHourActivity,
  };
}
