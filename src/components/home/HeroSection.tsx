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
              "linear-gradient(90deg, #E879F9 0%, #FB923C 50%, #3B82F6 100%)",
          }}
        />
        <div className="absolute left-1/2 top-[-240px] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-brand-pink/20 blur-3xl" />
        <div className="absolute left-[10%] top-[30%] h-[420px] w-[420px] rounded-full bg-brand-orange/18 blur-3xl" />
        <div className="absolute right-[5%] top-[45%] h-[460px] w-[460px] rounded-full bg-brand-blue/15 blur-3xl" />
      </div>

      <div className="container-px py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs text-white/75 ring-1 ring-white/10">
            <Gamepad2 className="h-4 w-4 text-brand-orange" />
            Games • Apps • Design/Dev Services
          </p>

          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            We build <span className="text-gradient">playful products</span> that feel polished.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-white/75 sm:text-lg">
            Go7Studio creates mobile + Roblox games, handy apps, and design-driven development for partners. Fast iterations, clean UX, satisfying motion, and shipping over talking.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/games"
              className="btn-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
            >
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/#about"
              className="btn-secondary inline-flex w-full items-center justify-center sm:w-auto"
            >
              About the Studio
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
