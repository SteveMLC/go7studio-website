"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Gamepad2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-25 bg-animated-gradient"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #8B5CF6 0%, #3B82F6 50%, #22D3EE 100%)",
          }}
        />
        <div className="absolute left-1/2 top-[-240px] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-brand-purple/25 blur-3xl" />
        <div className="absolute left-[10%] top-[30%] h-[420px] w-[420px] rounded-full bg-brand-blue/20 blur-3xl" />
        <div className="absolute right-[5%] top-[45%] h-[460px] w-[460px] rounded-full bg-brand-cyan/15 blur-3xl" />
      </div>

      <div className="container-px py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs text-white/75 ring-1 ring-white/10">
            <Gamepad2 className="h-4 w-4 text-brand-cyan" />
            Fun-first mobile & Roblox games
          </p>

          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            <span className="text-gradient">Build. Play. Repeat.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-white/75 sm:text-lg">
            Go7Studio crafts punchy, feel-good games that turn “one more minute”
            into a full-on adventure—whether you’re building a booming empire on
            mobile or slipping through slime-soaked chaos on Roblox.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/games"
              className="btn-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
            >
              Play Our Games
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/#about"
              className="btn-secondary inline-flex w-full items-center justify-center sm:w-auto"
            >
              Meet the Studio
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
