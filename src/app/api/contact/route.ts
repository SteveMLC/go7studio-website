import { NextRequest, NextResponse } from "next/server";

// Telegram notification config (set via Vercel env vars)
const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN || "";
const TG_CHAT_ID = process.env.TG_CHAT_ID || "";

// Rate limiting: simple in-memory (resets on cold start, good enough for serverless)
const submissions = new Map<string, number[]>();
const RATE_LIMIT = 5; // max submissions per IP per hour
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const times = (submissions.get(ip) || []).filter((t) => now - t < RATE_WINDOW);
  submissions.set(ip, times);
  return times.length >= RATE_LIMIT;
}

function recordSubmission(ip: string) {
  const times = submissions.get(ip) || [];
  times.push(Date.now());
  submissions.set(ip, times);
}

async function sendTelegramNotification(data: {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budget?: string;
  message: string;
  referral?: string;
}) {
  if (!TG_BOT_TOKEN || !TG_CHAT_ID) return;

  const lines = [
    `🔔 <b>New Go7Studio Contact Form Submission</b>`,
    ``,
    `👤 <b>Name:</b> ${escapeHtml(data.name)}`,
    `📧 <b>Email:</b> ${escapeHtml(data.email)}`,
  ];

  if (data.company) lines.push(`🏢 <b>Company:</b> ${escapeHtml(data.company)}`);
  if (data.projectType) lines.push(`📋 <b>Project:</b> ${escapeHtml(data.projectType)}`);
  if (data.budget) lines.push(`💰 <b>Budget:</b> ${escapeHtml(data.budget)}`);

  lines.push(``, `💬 <b>Message:</b>`, escapeHtml(data.message));

  if (data.referral) lines.push(``, `📣 <b>Referral:</b> ${escapeHtml(data.referral)}`);

  lines.push(``, `⏰ ${new Date().toISOString()}`);

  try {
    await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text: lines.join("\n"),
        parse_mode: "HTML",
      }),
    });
  } catch (err) {
    console.error("Telegram notification failed:", err);
  }
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    // Parse form data (supports both FormData and JSON)
    let data: Record<string, string> = {};
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      data = await req.json();
    } else {
      const formData = await req.formData();
      formData.forEach((value, key) => {
        if (typeof value === "string") data[key] = value;
      });
    }

    // Validate required fields
    const name = data.name?.trim();
    const email = data.email?.trim();
    const message = data.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // Honeypot check (if a hidden field is filled, it's likely a bot)
    if (data._gotcha) {
      return NextResponse.json({ ok: true }); // silently accept
    }

    recordSubmission(ip);

    // Send Telegram notification
    await sendTelegramNotification({
      name,
      email,
      company: data.company?.trim(),
      projectType: data.projectType?.trim(),
      budget: data.budget?.trim(),
      message,
      referral: data.referral?.trim(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
