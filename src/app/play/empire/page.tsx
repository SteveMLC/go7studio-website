import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getGameBySlug } from "@/lib/games";
import { GameStructuredData } from "@/components/seo/GameStructuredData";

const PLAY_STORE_BASE = "https://play.google.com/store/apps/details?id=com.go7studio.empire_tycoon";
const GAME_SLUG = "empire-tycoon";

export const metadata: Metadata = {
  title: "Empire Tycoon - Download on Google Play",
  description: "Build your business empire! Idle tycoon with real estate & smart investing. Download free on Google Play.",
  alternates: { canonical: "/play/empire" },
  openGraph: {
    title: "Empire Tycoon - Download on Google Play",
    description: "Build your business empire! Idle tycoon with real estate & smart investing.",
    url: "https://go7studio.com/play/empire",
    type: "website",
    images: [
      {
        url: "https://go7studio.com/images/games/empire-tycoon/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Empire Tycoon",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

function buildPlayStoreUrl(searchParams: PageProps["searchParams"]): string {
  // Build referrer string from query params
  // Supports: referrer (direct), ref (shorthand), utm_* params
  const referrerParts: string[] = [];

  // Direct referrer param (already formatted for Play Store)
  const directReferrer = searchParams.referrer;
  if (typeof directReferrer === "string" && directReferrer) {
    return `${PLAY_STORE_BASE}&referrer=${encodeURIComponent(directReferrer)}`;
  }

  // Referral code shorthand (e.g., ?ref=ABC123)
  const refCode = searchParams.ref;
  if (typeof refCode === "string" && refCode) {
    referrerParts.push(`referral_code=${refCode}`);
  }

  // UTM params
  const utmParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  for (const param of utmParams) {
    const value = searchParams[param];
    if (typeof value === "string" && value) {
      referrerParts.push(`${param}=${value}`);
    }
  }

  // Add default source if we have other params but no utm_source
  if (referrerParts.length > 0 && !referrerParts.some((p) => p.startsWith("utm_source="))) {
    referrerParts.unshift("utm_source=go7studio");
  }

  if (referrerParts.length > 0) {
    const referrerString = referrerParts.join("&");
    return `${PLAY_STORE_BASE}&referrer=${encodeURIComponent(referrerString)}`;
  }

  return PLAY_STORE_BASE;
}

export default function PlayEmpirePage({ searchParams }: PageProps) {
  const game = getGameBySlug(GAME_SLUG);

  // Check if request is from a bot/crawler (serve content) vs human (redirect)
  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "";
  const isBot = /googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator|whatsapp|flipboard|tumblr|bitlybot/i.test(userAgent);

  const playStoreUrl = buildPlayStoreUrl(searchParams);

  // If it's a human, redirect immediately
  if (!isBot) {
    redirect(playStoreUrl);
  }

  // For bots: render structured data and then meta-refresh redirect
  return (
    <>
      {game && <GameStructuredData game={game} />}
      <meta httpEquiv="refresh" content={`0;url=${playStoreUrl}`} />
      <div className="flex min-h-screen items-center justify-center bg-ink-900 p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Empire Tycoon</h1>
          <p className="mt-2 text-white/75">Build your business empire!</p>
          <p className="mt-4 text-sm text-white/50">
            Redirecting to Google Play...{" "}
            <a href={playStoreUrl} className="text-brand-teal underline">
              Click here if not redirected
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
