import { NextResponse } from "next/server";
import { fetchLanguages } from "@/lib/github-insights";

export const revalidate = 600;

export async function GET(_: Request, { params }: { params: { username: string } }) {
  try {
    const data = await fetchLanguages(params.username);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}
