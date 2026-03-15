import { NextRequest, NextResponse } from "next/server";

/**
 * Simple click tracker — logs creator link clicks.
 * Data stored in Vercel Edge Config or logged to console for now.
 * 
 * GET /api/track-click?creator=escanor&redirect=...
 * POST /api/track-click { creator, source }
 * GET /api/track-click?stats=true  (returns click counts)
 */

// In-memory stats (resets on cold start — replace with KV/DB for persistence)
// For now, we log to Vercel's function logs which persist
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.go7studio.empire_tycoon";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const creator = searchParams.get("creator");
  const stats = searchParams.get("stats");

  // Stats endpoint
  if (stats === "true") {
    return NextResponse.json({
      message: "Check Vercel function logs for click data. Persistent storage coming soon.",
    });
  }

  if (!creator) {
    return NextResponse.json({ error: "Missing creator param" }, { status: 400 });
  }

  // Log the click (visible in Vercel function logs)
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const ua = req.headers.get("user-agent") || "unknown";
  const referer = req.headers.get("referer") || "direct";
  
  console.log(JSON.stringify({
    event: "creator_link_click",
    creator: creator.toLowerCase(),
    timestamp: new Date().toISOString(),
    ip: ip.split(",")[0].trim(), // First IP only
    userAgent: ua.substring(0, 200),
    referer,
  }));

  // Build tracked Play Store URL
  const referrer = `utm_source=${encodeURIComponent(creator.toLowerCase())}&utm_medium=creator&utm_campaign=creator_link`;
  const redirectUrl = `${PLAY_STORE_URL}&referrer=${encodeURIComponent(referrer)}`;

  return NextResponse.redirect(redirectUrl, 302);
}
