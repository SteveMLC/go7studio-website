"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Gamepad2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute left-[10%] top-[30%] h-[420px] w-[420px] rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute right-[5%] top-[45%] h-[460px] w-[460px] rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="container-px py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs text-white/70 ring-1 ring-white/10">
            <Gamepad2 className="h-4 w-4 text-accent" />
            [Announcement / tagline goes here]
          </p>

          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            <span className="text-gradient">[Hero headline goes here]</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-white/70 sm:text-lg">
            [Hero supporting copy goes here. Explain what Go7Studio builds and why
            players love it.]
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/games"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90 sm:w-auto"
            >
              [Explore games]
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="#"
              className="inline-flex w-full items-center justify-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/15 sm:w-auto"
            >
              [Secondary CTA]
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
