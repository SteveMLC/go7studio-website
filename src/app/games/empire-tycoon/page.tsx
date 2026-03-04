import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DownloadButton } from "@/components/common/DownloadButton";
import { GooglePlayBadge } from "@/components/common/GooglePlayBadge";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.go7studio.empire_tycoon";
const TRAILER_URL = "https://youtu.be/-VsYxTfoPOo";

/* ─── YouTube embed ────────────────────────────────────────────────── */
function YouTubeEmbed({ url }: { url: string }) {
  const videoId =
    url.match(/youtu\.be\/([^?]+)|youtube\.com\/watch\?v=([^&]+)/)?.[1] ||
    url.match(/youtu\.be\/([^?]+)|youtube\.com\/watch\?v=([^&]+)/)?.[2];
  if (!videoId) return null;
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
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

/* ─── Data ─────────────────────────────────────────────────────────── */
const stats = [
  { value: "11", label: "Businesses" },
  { value: "39", label: "Investments" },
  { value: "600+", label: "Properties" },
  { value: "5K+", label: "Downloads" },
];

const businessEvolutions = [
  {
    name: "Taco Stand",
    tiers: [
      "/images/games/empire-tycoon/art/businesses/taco_stand/tier1.png",
      "/images/games/empire-tycoon/art/businesses/taco_stand/tier2.png",
      "/images/games/empire-tycoon/art/businesses/taco_stand/tier3.png",
      "/images/games/empire-tycoon/art/businesses/taco_stand/tier4.png",
    ],
  },
  {
    name: "Mobile Car Wash",
    tiers: [
      "/images/games/empire-tycoon/art/businesses/mobile_car_wash/tier1.png",
      "/images/games/empire-tycoon/art/businesses/mobile_car_wash/tier2.png",
      "/images/games/empire-tycoon/art/businesses/mobile_car_wash/tier3.png",
      "/images/games/empire-tycoon/art/businesses/mobile_car_wash/tier4.png",
    ],
  },
  {
    name: "Boutique Hotel",
    tiers: [
      "/images/games/empire-tycoon/art/businesses/boutique_hotel/tier1.png",
      "/images/games/empire-tycoon/art/businesses/boutique_hotel/tier2.png",
      "/images/games/empire-tycoon/art/businesses/boutique_hotel/tier3.png",
      "/images/games/empire-tycoon/art/businesses/boutique_hotel/tier4.png",
    ],
  },
];

const investmentIcons = [
  "bcl", "dge", "grv", "gnm", "gms", "nxt", "etc", "frg",
  "hyd", "nnt", "btf", "vrv", "lxw", "lrr", "qbt", "shv",
  "stf", "urt", "atf",
];

const compactFeatures = [
  {
    icon: "🏠",
    title: "600+ Properties",
    desc: "Build a global real estate portfolio. Buy, upgrade, and collect rent from properties worldwide. Your empire earns while you sleep.",
  },
  {
    icon: "🔄",
    title: "Prestige System",
    desc: "Reincorporate with permanent multipliers. Each cycle gets faster. Platinum points and achievements carry over.",
  },
  {
    icon: "💎",
    title: "Platinum Vault",
    desc: "Cosmetic upgrades, premium boosts, permanent buffs, and mystery crates. Not pay-to-win — just more ways to play.",
  },
  {
    icon: "⚡",
    title: "Dynamic Events",
    desc: "Random crises and windfalls keep every session fresh. Adapt your strategy on the fly.",
  },
];

export const metadata: Metadata = {
  title: "Empire Tycoon — Build Your Business Empire",
  description:
    "Build Your Business Empire — One satisfying tap at a time. Play free on Google Play.",
  alternates: { canonical: "/games/empire-tycoon" },
};

/* ─── Page ─────────────────────────────────────────────────────────── */
export default function EmpireTycoonLandingPage() {
  return (
    <div className="bg-[#0F1419] text-[#F5F0E8]">
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="container-px pb-12 pt-12 sm:pb-20 sm:pt-16">
        <Link
          href="/games"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to games
        </Link>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Build Your Business Empire
              <span className="mt-2 block text-[#D4A853]">
                One satisfying tap at a time
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/75">
              A relaxing idle tycoon game. Free to play. No pressure. Pure
              progress.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <DownloadButton
                href={PLAY_STORE_URL}
                label="🎮 PLAY FREE →"
                className="w-full justify-center sm:w-auto"
              />
              <GooglePlayBadge href={PLAY_STORE_URL} />
            </div>

            <p className="mt-4 text-sm text-white/70">
              New players get: 250 Bonus + Starter Missions
            </p>
            <p className="mt-2 text-xs text-white/50">Android only</p>
          </div>

          <YouTubeEmbed url={TRAILER_URL} />
        </div>
      </section>

      {/* ── Stats bar ───────────────────────────────────────────── */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="container-px grid grid-cols-2 gap-4 py-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-[#D4A853]">{s.value}</p>
              <p className="mt-1 text-sm text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Business Evolutions ─────────────────────────────────── */}
      <section className="container-px py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-4xl">💼</span>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            11 Businesses, Endless Strategy
          </h2>
          <p className="mt-3 text-lg text-white/70">
            Every business evolves. Upgrade through tiers, unlock
            specializations, and watch your empire transform.
          </p>
        </div>

        <div className="mt-14 space-y-12">
          {businessEvolutions.map((biz) => (
            <div key={biz.name}>
              <p className="mb-4 text-center text-sm font-medium uppercase tracking-widest text-[#D4A853]">
                {biz.name}
              </p>
              <div className="flex items-center justify-center gap-2 sm:gap-4">
                {biz.tiers.map((src, i) => (
                  <div key={src} className="flex items-center gap-2 sm:gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-2 sm:h-28 sm:w-28 sm:rounded-2xl sm:p-3">
                      <Image
                        src={src}
                        alt={`${biz.name} Tier ${i + 1}`}
                        fill
                        className="object-contain p-1"
                        sizes="(max-width: 640px) 80px, 112px"
                      />
                    </div>
                    {i < 3 && (
                      <span className="text-lg text-white/30 sm:text-xl">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-white/50">
          Hire managers to automate income. Plan upgrades. Scale to the top.
        </p>
      </section>

      {/* ── Investment Scatter ──────────────────────────────────── */}
      <section className="container-px py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-4xl">📈</span>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            39 Investments. Real Strategy.
          </h2>
          <p className="mt-3 text-lg text-white/70">
            Stocks, crypto, meme coins, bonds, REITs, biotech, and more.
            Dividends pay out. Prices move. Time the market.
          </p>
        </div>

        {/* Scattered icon grid */}
        <div className="relative mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-3 sm:gap-4">
          {investmentIcons.map((id, i) => {
            // Subtle size variation for visual interest
            const sizes = ["h-16 w-16", "h-20 w-20", "h-14 w-14", "h-18 w-18"];
            const size = sizes[i % sizes.length];
            const rotations = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "rotate-0"];
            const rotation = rotations[i % rotations.length];
            return (
              <div
                key={id}
                className={`relative ${size} flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 transition-transform duration-300 hover:scale-110 hover:border-[#D4A853]/40 ${rotation}`}
              >
                <Image
                  src={`/images/games/empire-tycoon/art/investments/${id}.png`}
                  alt={`Investment: ${id.toUpperCase()}`}
                  fill
                  className="object-contain p-1"
                  sizes="80px"
                />
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-white/50">
          13 categories. From blue-chip to meme. Build the portfolio you want.
        </p>
      </section>

      {/* ── Compact feature grid ────────────────────────────────── */}
      <section className="container-px py-16 sm:py-20">
        <h2 className="text-center text-3xl font-semibold sm:text-4xl">
          And there&apos;s more
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {compactFeatures.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <span className="text-2xl">{f.icon}</span>
              <h3 className="mt-2 text-xl font-semibold text-[#D4A853]">
                {f.title}
              </h3>
              <p className="mt-2 text-white/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Welcome bonus ───────────────────────────────────────── */}
      <section className="container-px py-12 sm:py-16">
        <div className="rounded-2xl border border-[#D4A853]/30 bg-[#1C1812] p-6 sm:p-8">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Welcome, New Tycoon
          </h2>
          <p className="mt-3 text-white/75">
            Start your empire with a little boost:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-lg font-semibold">💰 250 Bonus Cash</p>
              <p className="mt-2 text-sm text-white/70">
                Jumpstart your empire with extra capital.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-lg font-semibold">🎯 Starter Missions</p>
              <p className="mt-2 text-sm text-white/70">
                Clear goals to guide your first steps.
              </p>
            </div>
          </div>

          <p className="mt-6 text-white/75">
            No pressure. No timers. Just progress at your pace.
          </p>
          <div className="mt-5">
            <DownloadButton
              href={PLAY_STORE_URL}
              label="🎮 PLAY FREE →"
              className="justify-center"
            />
          </div>
        </div>
      </section>

      {/* ── Testimonial ─────────────────────────────────────────── */}
      <section className="container-px py-16 sm:py-20">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          What players are saying
        </h2>

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
            <p className="text-xl font-semibold text-[#D4A853]">
              Weekly updates
            </p>
            <p className="text-sm text-white/70">Actively developed</p>
          </div>
        </div>

        <blockquote className="mx-auto mt-8 max-w-2xl rounded-2xl border border-[#D4A853]/20 bg-[#1C1812] p-8 text-center">
          <p className="text-xl leading-relaxed italic text-white/90">
            &ldquo;I have really been enjoying this game. I constantly feel like
            I am making progress. This is truly a very hidden gem.&rdquo;
          </p>
          <footer className="mt-4">
            <span className="text-[#D4A853]">★★★★★</span>
            <span className="ml-2 text-sm text-white/60">
              — Jordan W. on Google Play
            </span>
          </footer>
        </blockquote>

        <p className="mt-6 text-center text-sm text-white/50">
          No paywalls. No pay-to-win. Just a game worth playing.
        </p>
      </section>

      {/* ── Closing CTA ─────────────────────────────────────────── */}
      <section className="container-px pb-20 pt-10 text-center sm:pb-24">
        <h2 className="text-3xl font-semibold">Your empire is waiting.</h2>
        <p className="mt-3 text-lg text-white/75">
          Take your time. Build something great.
        </p>
        <p className="mt-1 text-lg text-white/75">
          We&apos;ll be here when you&apos;re ready.
        </p>

        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6">
          <DownloadButton
            href={PLAY_STORE_URL}
            label="🎮 PLAY FREE →"
            className="w-full justify-center"
          />
          <p className="mt-4 text-sm text-white/60">
            Free on Google Play. Android.
          </p>
        </div>
      </section>
    </div>
  );
}
