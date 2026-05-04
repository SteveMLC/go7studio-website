import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Music Tools for Education | Go7 Studio",
  description:
    "Free, ad-free metronome app built for music classrooms. Precise BPM control, tap tempo, time signatures, and offline support — no account required.",
  alternates: { canonical: "/education" },
};

const features = [
  { icon: "🎵", title: "Precise BPM Control", desc: "20–300 BPM with fine-grained adjustments" },
  { icon: "🎼", title: "Time Signatures", desc: "2/4, 3/4, 4/4, 5/4, 6/8, 7/8" },
  { icon: "👆", title: "Tap Tempo", desc: "Tap to set the beat — intuitive and fast" },
  { icon: "🎨", title: "Visual Beat Indicators", desc: "See the beat, not just hear it" },
  { icon: "🔇", title: "No Ads, No Distractions", desc: "Clean interface, zero interruptions" },
  { icon: "📱", title: "Works Offline", desc: "No internet required — works anywhere" },
];

const teacherReasons = [
  "No ads interrupting practice",
  "No account required — just open and play",
  "Works on any phone or tablet",
  "Built specifically for classroom use",
];

export default function EducationPage() {
  return (
    <div className="container-px py-14 sm:py-20">
      {/* Hero */}
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Free Music Tools for Students
        </h1>
        <p className="mt-4 text-lg leading-8 text-white/75">
          Built by Go7 Studio — simple, distraction-free apps for music education
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="mailto:hello@go7studio.com?subject=Metronome%20app%20access"
            className="btn-primary inline-flex items-center gap-2 text-base"
          >
            Request Classroom Access
          </a>
        </div>
      </header>

      {/* The Metronome App */}
      <section className="mt-20 sm:mt-28">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          The Metronome App
        </h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <span className="text-2xl">{f.icon}</span>
                <h3 className="mt-2 font-medium text-white">{f.title}</h3>
                <p className="mt-1 text-sm text-white/60">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-10">
            <span className="text-lg text-white/40">App Screenshot</span>
          </div>
        </div>
      </section>

      {/* Why Teachers Love It */}
      <section className="mt-20 sm:mt-28">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Why Teachers Love It
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {teacherReasons.map((reason) => (
            <li
              key={reason}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <span className="mt-0.5 text-green-400">✓</span>
              <span className="text-white/80">{reason}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* About Go7 Studio */}
      <section className="mt-20 sm:mt-28">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          About Go7 Studio
        </h2>
        <div className="mt-6 max-w-2xl space-y-4 text-white/75">
          <p>
            We&apos;re an indie game and tool studio. We build apps that people
            actually enjoy using.
          </p>
          <p>
            Our mission: create quality tools and games that respect users&apos; time
            and attention.
          </p>
          <Link
            href="/games"
            className="mt-4 inline-block text-sm font-medium text-white underline underline-offset-4 hover:text-white/80"
          >
            See our games →
          </Link>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="mt-20 rounded-2xl border border-white/10 bg-white/5 p-8 text-center sm:mt-28 sm:p-12">
        <p className="text-lg font-medium text-white">
          Using our metronome in your classroom? We&apos;d love to hear about it!
        </p>
        <a
          href="mailto:contact@go7studio.com"
          className="mt-4 inline-block text-sm font-medium text-white underline underline-offset-4 hover:text-white/80"
        >
          contact@go7studio.com
        </a>
      </section>
    </div>
  );
}
