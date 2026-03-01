import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface NewsletterEntry {
  email: string;
  source: string;
  status: "pending" | "confirmed" | "unsubscribed";
  subscribedAt: string;
  confirmedAt?: string;
  userAgent?: string;
}

// Use /tmp for Vercel serverless compatibility
const DATA_DIR = process.env.VERCEL ? "/tmp" : path.join(process.cwd(), "data");
const NEWSLETTER_FILE = path.join(DATA_DIR, "newsletter.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readNewsletter(): NewsletterEntry[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(NEWSLETTER_FILE)) {
      return [];
    }
    const data = fs.readFileSync(NEWSLETTER_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading newsletter file:", error);
    return [];
  }
}

function writeNewsletter(entries: NewsletterEntry[]) {
  try {
    ensureDataDir();
    fs.writeFileSync(NEWSLETTER_FILE, JSON.stringify(entries, null, 2));
  } catch (error) {
    console.error("Error writing newsletter file:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source = "website" } = body;

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

    const newsletter = readNewsletter();

    // Check if email already exists
    const existing = newsletter.find(
      (entry) => entry.email.toLowerCase() === email.toLowerCase()
    );

    if (existing) {
      if (existing.status === "unsubscribed") {
        // Resubscribe
        existing.status = "confirmed";
        existing.source = source;
        writeNewsletter(newsletter);
        
        return NextResponse.json(
          { message: "Welcome back! You've been resubscribed.", alreadyExists: true },
          { status: 200 }
        );
      }
      
      return NextResponse.json(
        { message: "You're already subscribed!", alreadyExists: true },
        { status: 200 }
      );
    }

    // Add new subscriber
    const newEntry: NewsletterEntry = {
      email: email.toLowerCase().trim(),
      source,
      status: "confirmed", // Auto-confirm for now (no double opt-in)
      subscribedAt: new Date().toISOString(),
      confirmedAt: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") || undefined,
    };

    newsletter.push(newEntry);
    writeNewsletter(newsletter);

    // TODO: Send welcome email via Resend/SendGrid
    // await sendWelcomeEmail(email);

    return NextResponse.json(
      { message: "Successfully subscribed!", alreadyExists: false },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Get subscriber count (admin use)
export async function GET(request: NextRequest) {
  // Simple auth check via query param (replace with proper auth later)
  const { searchParams } = new URL(request.url);
  const adminKey = searchParams.get("key");
  
  if (adminKey !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const newsletter = readNewsletter();
  const confirmed = newsletter.filter(e => e.status === "confirmed");
  
  return NextResponse.json({
    total: newsletter.length,
    confirmed: confirmed.length,
    subscribers: confirmed.map(e => ({ email: e.email, subscribedAt: e.subscribedAt }))
  });
}
