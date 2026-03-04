import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DownloadButton } from "@/components/common/DownloadButton";
import { GooglePlayBadge } from "@/components/common/GooglePlayBadge";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.go7studio.empire_tycoon";
const APK_URL = "https://share.go7studio.com/empire-tycoon-latest.apk";

const moments = [
  {
    title: "Start Small",
    body: "Your first coffee shop opens.",
    image: "/images/games/empire-tycoon/screenshots/ScreenOne.png",
  },
  {
    title: "Watch It Grow",
    body: "Numbers go up. Up. UP.",
    image: "/images/games/empire-tycoon/screenshots/ScreenTwo.png",
  },
  {
    title: "Earn While Away",
    body: "Close the app. Come back rich.",
    image: "/images/games/empire-tycoon/screenshots/ScreenThree.png",
  },
];

const testimonials = [
  {
    quote: "I constantly feel like I am making progress... This is truly a very hidden gem.",
    source: "Jordan W. • Google Play • 5★",
  },
  {
    quote: "The growth loop is super satisfying without feeling stressful.",
    source: "Google Play review • 5★",
  },
  {
    quote: "Perfect idle game for short sessions and long sessions.",
    source: "Google Play review • 4★",
  },
];

export const metadata: Metadata = {
  title: "Empire Tycoon — Build Your Business Empire",
  description:
    "Build Your Business Empire — One satisfying tap at a time. Play free on Google Play or download the latest APK.",
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
            <p className="mt-2 text-xs text-white/50">Android + APK only</p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <Image
              src="/images/games/empire-tycoon/screenshots/screenfive.png"
              alt="Empire Tycoon gameplay"
              width={1200}
              height={720}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </section>

      <section className="container-px py-12 sm:py-16">
        <h2 className="text-2xl font-semibold sm:text-3xl">The satisfaction of building</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {moments.map((moment) => (
            <article key={moment.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="overflow-hidden rounded-lg border border-white/10">
                <Image src={moment.image} alt={moment.title} width={600} height={340} className="h-auto w-full" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-[#D4A853]">{moment.title}</h3>
              <p className="mt-2 text-white/75">{moment.body}</p>
            </article>
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
            <a
              href={APK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Download APK
            </a>
          </div>
        </div>
      </section>

      <section className="container-px py-12 sm:py-16">
        <h2 className="text-2xl font-semibold sm:text-3xl">What players are saying</h2>
        <p className="mt-2 text-sm text-white/60">Real 4–5★ Play Store reviews.</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-xl font-semibold text-[#D4A853]">5,000+</p>
            <p className="text-sm text-white/70">Downloads</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-xl font-semibold text-[#D4A853]">4.1★</p>
            <p className="text-sm text-white/70">Google Play rating</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-xl font-semibold text-[#D4A853]">Regular updates</p>
            <p className="text-sm text-white/70">Actively maintained</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-white/90">“{t.quote}”</p>
              <footer className="mt-3 text-xs text-white/60">— {t.source}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="container-px pb-20 pt-10 text-center sm:pb-24">
        <h2 className="text-3xl font-semibold">Your empire is waiting.</h2>
        <p className="mt-3 text-lg text-white/75">Take your time. Build something great.</p>
        <p className="mt-1 text-lg text-white/75">We&apos;ll be here when you&apos;re ready.</p>

        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6">
          <DownloadButton href={PLAY_STORE_URL} label="🎮 PLAY FREE →" className="w-full justify-center" />
          <p className="mt-4 text-sm text-white/60">No credit card required. Android + APK only.</p>
        </div>
      </section>
    </div>
  );
}
