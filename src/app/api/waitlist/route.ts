import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface WaitlistEntry {
  email: string;
  game: string;
  timestamp: string;
  userAgent?: string;
}

const WAITLIST_FILE = path.join(process.cwd(), "data", "waitlist.json");

function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function readWaitlist(): WaitlistEntry[] {
  ensureDataDir();
  if (!fs.existsSync(WAITLIST_FILE)) {
    return [];
  }
  try {
    const data = fs.readFileSync(WAITLIST_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeWaitlist(entries: WaitlistEntry[]) {
  ensureDataDir();
  fs.writeFileSync(WAITLIST_FILE, JSON.stringify(entries, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, game = "unknown" } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const waitlist = readWaitlist();

    // Check if email already exists for this game
    const exists = waitlist.some(
      (entry) => entry.email.toLowerCase() === email.toLowerCase() && entry.game === game
    );

    if (exists) {
      return NextResponse.json(
        { message: "You're already on the waitlist!", alreadyExists: true },
        { status: 200 }
      );
    }

    // Add new entry
    const newEntry: WaitlistEntry = {
      email: email.toLowerCase().trim(),
      game,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") || undefined,
    };

    waitlist.push(newEntry);
    writeWaitlist(waitlist);

    return NextResponse.json(
      { message: "Successfully joined the waitlist!", alreadyExists: false },
      { status: 201 }
    );
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
