import { NextResponse } from "next/server";
import { fetchContributionCalendar } from "@/lib/github-insights";

export const revalidate = 600;

export async function GET(_: Request, { params }: { params: { username: string } }) {
  try {
    const contributions = await fetchContributionCalendar(params.username);
    if (!contributions) {
      return NextResponse.json({ error: "No contribution data" }, { status: 404 });
    }

    const calendar = contributions.contributionCalendar;
    const days: Array<{ date: string; count: number; color: string; weekday: number }> = [];
    for (const week of calendar.weeks) {
      for (const day of week.contributionDays) {
        days.push({
          date: day.date,
          count: day.contributionCount,
          color: day.color,
          weekday: day.weekday,
        });
      }
    }

    type ContributionDay = { contributionCount: number };
    type ContributionWeek = { contributionDays: ContributionDay[] };
    const weekly_totals = (calendar.weeks as ContributionWeek[]).map((w) =>
      w.contributionDays.reduce((sum: number, d) => sum + d.contributionCount, 0)
    );

    return NextResponse.json({
      total_contributions: calendar.totalContributions,
      total_commits: contributions.totalCommitContributions,
      total_prs: contributions.totalPullRequestContributions,
      total_reviews: contributions.totalPullRequestReviewContributions,
      total_issues: contributions.totalIssueContributions,
      total_repos_created: contributions.totalRepositoryContributions,
      restricted_contributions: contributions.restrictedContributionsCount,
      weekly_totals,
      days,
    });
  } catch {
    return NextResponse.json({
      total_contributions: 0,
      total_commits: 0,
      total_prs: 0,
      total_reviews: 0,
      total_issues: 0,
      total_repos_created: 0,
      restricted_contributions: 0,
      weekly_totals: [],
      days: [],
      degraded: true,
    });
  }
}
