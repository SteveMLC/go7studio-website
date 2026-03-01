import { NextResponse } from "next/server";
import { fetchUser } from "@/lib/github-insights";

export const revalidate = 300;

export async function GET(_: Request, { params }: { params: { username: string } }) {
  try {
    const data = await fetchUser(params.username);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed" },
      { status: 500 }
    );
  }
}
