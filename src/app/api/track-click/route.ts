import { NextRequest, NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

/**
 * Creator link click tracker with Firebase persistence.
 * 
 * GET /api/track-click?creator=escanor  → logs click + redirects to Play Store
 * GET /api/track-click?stats=true       → returns click counts per creator
 */

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.go7studio.empire_tycoon";

function getDb() {
  if (!getApps().length) {
    const creds = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}");
    if (creds.project_id) {
      initializeApp({ credential: cert(creds) });
    } else {
      // Fallback — log only, no persistence
      return null;
    }
  }
  return getFirestore();
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const creator = searchParams.get("creator");
  const stats = searchParams.get("stats");

  // Stats endpoint
  if (stats === "true") {
    const db = getDb();
    if (!db) return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
    
    const snap = await db.collection("creator_clicks").get();
    const data: Record<string, any> = {};
    snap.forEach(doc => { data[doc.id] = doc.data(); });
    return NextResponse.json(data);
  }

  if (!creator) {
    return NextResponse.json({ error: "Missing creator param" }, { status: 400 });
  }

  const creatorKey = creator.toLowerCase();
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const ua = req.headers.get("user-agent") || "unknown";
  const referer = req.headers.get("referer") || "direct";
  const now = new Date().toISOString();

  // Log to console (always works)
  console.log(JSON.stringify({
    event: "creator_link_click",
    creator: creatorKey,
    timestamp: now,
    ip,
    referer,
  }));

  // Persist to Firebase
  try {
    const db = getDb();
    if (db) {
      // Increment counter
      await db.collection("creator_clicks").doc(creatorKey).set({
        totalClicks: FieldValue.increment(1),
        lastClick: now,
        creator: creatorKey,
      }, { merge: true });

      // Log individual click
      await db.collection("creator_clicks").doc(creatorKey)
        .collection("clicks").add({
          timestamp: now,
          ip,
          userAgent: ua.substring(0, 200),
          referer,
        });
    }
  } catch (e) {
    console.error("Firebase click log failed:", e);
  }

  // Build tracked Play Store URL
  const referrer = `utm_source=${encodeURIComponent(creatorKey)}&utm_medium=creator&utm_campaign=creator_link`;
  const redirectUrl = `${PLAY_STORE_URL}&referrer=${encodeURIComponent(referrer)}`;

  return NextResponse.redirect(redirectUrl, 302);
}
