import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DownloadButton } from "@/components/common/DownloadButton";
import { GooglePlayBadge } from "@/components/common/GooglePlayBadge";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.go7studio.empire_tycoon";
const TRAILER_URL = "https://youtu.be/-VsYxTfoPOo";

function YouTubeEmbed({ url }: { url: string }) {
  const videoId =
    url.match(/youtu\.be\/([^?]+)|youtube\.com\/watch\?v=([^&]+)/)?.[1] ||
    url.match(/youtu\.be\/([^?]+)|youtube\.com\/watch\?v=([^&]+)/)?.[2];

  if (!videoId) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title="Empire Tycoon Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

const features = [
  {
    icon: "💼",
    title: "11 Businesses, Endless Strategy",
    description:
      "From a mobile car wash to a global empire. Each business has multiple specialization paths and upgrade tiers. Hire managers to automate income while you plan your next move.",
    image: "/images/games/empire-tycoon/screenshots/ScreenTwo.png",
    imageAlt: "Businesses tab with upgrade flow and event banner",
  },
  {
    icon: "📈",
    title: "Real Investment System",
    description:
      "39 investments across stocks, crypto, meme coins, bonds, REITs, and more. Prices move in real time. Dividends pay out. Time the market for big returns.",
    image: "/images/games/empire-tycoon/screenshots/screenfive.png",
    imageAlt: "Investments portfolio screen",
  },
  {
    icon: "🏠",
    title: "600+ Properties Worldwide",
    description:
      "Build a global real estate portfolio. Buy, upgrade, and collect rent from properties across multiple locales. Your empire earns while you sleep.",
    image: "/images/games/empire-tycoon/screenshots/ScreenThree.png",
    imageAlt: "Global real estate property portfolio screen",
  },
  {
    icon: "🔄",
    title: "Prestige & Reincorporation",
    description:
      "Reset with permanent multipliers. Each cycle gets faster. Endless scaling for players who want to go deep. Your platinum points and achievements carry over.",
    image: "/images/games/empire-tycoon/screenshots/screenfour.png",
    imageAlt: "Stats and progression overview screen",
  },
  {
    icon: "💎",
    title: "Platinum Vault",
    description:
      "Cosmetic upgrades, premium boosts, permanent buffs, and mystery crates. Not pay-to-win — just more ways to enjoy the game.",
    image: "/images/games/empire-tycoon/screenshots/screensix.png",
    imageAlt: "Progression and achievements interface",
  },
  {
    icon: "⚡",
    title: "Dynamic Events",
    description:
      "Random crises and windfalls keep every session fresh. Adapt your strategy on the fly. No two playthroughs feel the same.",
    image: "/images/games/empire-tycoon/screenshots/ScreenOne.png",
    imageAlt: "Hustle gameplay screen",
  },
];

const stats = [
  { value: "11", label: "Businesses" },
  { value: "39", label: "Investments" },
  { value: "600+", label: "Properties" },
  { value: "5K+", label: "Downloads" },
];

export const metadata: Metadata = {
  title: "Empire Tycoon — Build Your Business Empire",
  description:
    "Build Your Business Empire — One satisfying tap at a time. Play free on Google Play.",
  alternates: { canonical: "/games/empire-tycoon" },
};

export default function EmpireTycoonLandingPage() {
  return (
    <div className="bg-[#0F1419] text-[#F5F0E8]">
      <section className="container-px pb-12 pt-12 sm:pb-20 sm:pt-16">
        <Link href="/games" className="mb-8 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to games
        </Link>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Build Your Business Empire
              <span className="mt-2 block text-[#D4A853]">One satisfying tap at a time</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/75">
              A relaxing idle tycoon game. Free to play. No pressure. Pure progress.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <DownloadButton href={PLAY_STORE_URL} label="🎮 PLAY FREE →" className="w-full justify-center sm:w-auto" />
              <GooglePlayBadge href={PLAY_STORE_URL} />
            </div>

            <p className="mt-4 text-sm text-white/70">New players get: 250 Bonus + Starter Missions</p>
            <p className="mt-2 text-xs text-white/50">Android only</p>
          </div>

          <YouTubeEmbed url={TRAILER_URL} />
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="container-px grid grid-cols-2 gap-4 py-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-[#D4A853]">{stat.value}</p>
              <p className="mt-1 text-sm text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-px py-16 sm:py-24">
        <h2 className="text-center text-3xl font-semibold sm:text-4xl">More than an idle game</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-white/70">
          Empire Tycoon has the depth of a business simulator with the satisfaction of an idle clicker.
        </p>

        <div className="mt-16 space-y-20">
          {features.map((feature, i) => (
            <div key={feature.title} className="grid items-center gap-8 lg:grid-cols-2">
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <span className="text-3xl">{feature.icon}</span>
                <h3 className="mt-2 text-2xl font-semibold text-[#D4A853]">{feature.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-white/75">{feature.description}</p>
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <Image src={feature.image} alt={feature.imageAlt} width={600} height={340} className="h-auto w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-px py-12 sm:py-16">
        <div className="rounded-2xl border border-[#D4A853]/30 bg-[#1C1812] p-6 sm:p-8">
          <h2 className="text-2xl font-semibold sm:text-3xl">Welcome, New Tycoon</h2>
          <p className="mt-3 text-white/75">Start your empire with a little boost:</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-lg font-semibold">💰 250 Bonus Cash</p>
              <p className="mt-2 text-sm text-white/70">Jumpstart your empire with extra capital.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-lg font-semibold">🎯 Starter Missions</p>
              <p className="mt-2 text-sm text-white/70">Clear goals to guide your first steps.</p>
            </div>
          </div>

          <p className="mt-6 text-white/75">No pressure. No timers. Just progress at your pace.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <DownloadButton href={PLAY_STORE_URL} label="🎮 PLAY FREE →" className="justify-center" />
          </div>
        </div>
      </section>

      <section className="container-px py-16 sm:py-20">
        <h2 className="text-2xl font-semibold sm:text-3xl">What players are saying</h2>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-xl font-semibold text-[#D4A853]">4.1★</p>
            <p className="text-sm text-white/70">Google Play</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-xl font-semibold text-[#D4A853]">5,000+</p>
            <p className="text-sm text-white/70">Downloads</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-xl font-semibold text-[#D4A853]">Weekly updates</p>
            <p className="text-sm text-white/70">Actively developed</p>
          </div>
        </div>

        <blockquote className="mx-auto mt-8 max-w-2xl rounded-2xl border border-[#D4A853]/20 bg-[#1C1812] p-8 text-center">
          <p className="text-xl leading-relaxed text-white/90 italic">
            &ldquo;I have really been enjoying this game. I constantly feel like I am making progress. This is truly a very hidden gem.&rdquo;
          </p>
          <footer className="mt-4">
            <span className="text-[#D4A853]">★★★★★</span>
            <span className="ml-2 text-sm text-white/60">— Jordan W. on Google Play</span>
          </footer>
        </blockquote>

        <p className="mt-6 text-center text-sm text-white/50">No paywalls. No pay-to-win. Just a game worth playing.</p>
      </section>

      <section className="container-px pb-20 pt-10 text-center sm:pb-24">
        <h2 className="text-3xl font-semibold">Your empire is waiting.</h2>
        <p className="mt-3 text-lg text-white/75">Take your time. Build something great.</p>
        <p className="mt-1 text-lg text-white/75">We&apos;ll be here when you&apos;re ready.</p>

        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6">
          <DownloadButton href={PLAY_STORE_URL} label="🎮 PLAY FREE →" className="w-full justify-center" />
          <p className="mt-4 text-sm text-white/60">Free on Google Play. Android.</p>
        </div>
      </section>
    </div>
  );
}
