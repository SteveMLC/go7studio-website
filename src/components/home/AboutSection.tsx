import Link from "next/link";
import { Sparkles } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="container-px py-16 sm:py-20">
      <div className="glass-card grid gap-10 p-8 sm:p-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-medium text-white/75">
            <Sparkles className="h-4 w-4 text-brand-purple" />
            About Go7Studio
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            A small, scrappy studio with a big love for games that feel alive.
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-white/75 sm:text-base">
            <p>
              Go7Studio is a small, scrappy studio with a big love for games that
              feel <em>alive</em>. We obsess over the little things—snappy
              feedback, juicy animations, rewarding progression—because the best
              games don’t just look good… they <em>feel</em> good.
            </p>
            <p>
              From mobile tycoon strategy to Roblox experiences built for chaos
              with friends, we design every project around one idea: <b>fun
              first</b>. That means easy-to-learn mechanics, smart difficulty
              curves, and a steady stream of goals that keep players saying,
              “Okay, last run… for real.”
            </p>
            <p>
              We’re constantly experimenting, polishing, and shipping. If you’re
              here, you’re early—and we can’t wait to build the next hit with
              you.
            </p>
          </div>

          <div className="mt-8">
            <Link href="/games" className="btn-secondary inline-flex">
              Explore the games
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <p className="text-sm font-medium text-white">Fun First</p>
            <p className="mt-1 text-sm text-white/70">
              If it isn’t fun in 30 seconds, we rework it.
            </p>
          </div>
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <p className="text-sm font-medium text-white">Polish Matters</p>
            <p className="mt-1 text-sm text-white/70">
              Feedback, motion, and sound should feel juicy and rewarding.
            </p>
          </div>
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <p className="text-sm font-medium text-white">Ship & Improve</p>
            <p className="mt-1 text-sm text-white/70">
              Launch, learn, iterate—then make it even better.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
