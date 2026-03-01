import { NextResponse } from "next/server";
import { anonymizePrivateRepos, fetchAuthenticatedRepos } from "@/lib/github-insights";

export const revalidate = 300;

export async function GET(_: Request, { params }: { params: { username: string } }) {
  try {
    const repos = await fetchAuthenticatedRepos(params.username);
    return NextResponse.json(anonymizePrivateRepos(repos));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed" },
      { status: 500 }
    );
  }
}
