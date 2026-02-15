import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getGameBySlug } from "@/lib/games";
import { GameStructuredData } from "@/components/seo/GameStructuredData";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.go7studio.empire_tycoon";
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

export default function PlayEmpirePage() {
  const game = getGameBySlug(GAME_SLUG);

  // Check if request is from a bot/crawler (serve content) vs human (redirect)
  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "";
  const isBot = /googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator|whatsapp|flipboard|tumblr|bitlybot/i.test(userAgent);

  // If it's a human, redirect immediately
  if (!isBot) {
    redirect(PLAY_STORE_URL);
  }

  // For bots: render structured data and then meta-refresh redirect
  return (
    <>
      {game && <GameStructuredData game={game} />}
      <meta httpEquiv="refresh" content={`0;url=${PLAY_STORE_URL}`} />
      <div className="flex min-h-screen items-center justify-center bg-ink-900 p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Empire Tycoon</h1>
          <p className="mt-2 text-white/75">Build your business empire!</p>
          <p className="mt-4 text-sm text-white/50">
            Redirecting to Google Play...{" "}
            <a href={PLAY_STORE_URL} className="text-brand-teal underline">
              Click here if not redirected
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
