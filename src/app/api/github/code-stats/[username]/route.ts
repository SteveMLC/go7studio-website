import { NextResponse } from "next/server";
import { fetchCodeStats } from "@/lib/github-insights";

export const revalidate = 900;

export async function GET(_: Request, { params }: { params: { username: string } }) {
  try {
    const data = await fetchCodeStats(params.username);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({
      code_frequency: [],
      hourly_activity: new Array(24).fill(0),
      day_hour_activity: Array.from({ length: 7 }, () => new Array(24).fill(0)),
      degraded: true,
    });
  }
}
