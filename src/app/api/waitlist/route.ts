import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { submitToFormspree } from "@/lib/formspree";

interface WaitlistEntry {
  email: string;
  game: string;
  timestamp: string;
  userAgent?: string;
}

// Use /tmp for Vercel serverless compatibility
const DATA_DIR = process.env.VERCEL ? "/tmp" : path.join(process.cwd(), "data");
const WAITLIST_FILE = path.join(DATA_DIR, "waitlist.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readWaitlist(): WaitlistEntry[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(WAITLIST_FILE)) {
      return [];
    }
    const data = fs.readFileSync(WAITLIST_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading waitlist file:", error);
    return [];
  }
}

function writeWaitlist(entries: WaitlistEntry[]) {
  try {
    ensureDataDir();
    fs.writeFileSync(WAITLIST_FILE, JSON.stringify(entries, null, 2));
  } catch (error) {
    console.error("Error writing waitlist file:", error);
    throw error;
  }
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

    await submitToFormspree({
      _subject: `New ${game} waitlist signup`,
      formType: "game-waitlist",
      email: newEntry.email,
      game,
      submittedAt: newEntry.timestamp,
      source: "go7studio.com/api/waitlist",
    });

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
