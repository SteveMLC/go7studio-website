"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Gamepad2, Sparkles, Download, Activity } from "lucide-react";

// Animated floating particles
function FloatingElements() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            background: `radial-gradient(circle, ${
              i % 2 === 0 ? "rgba(232, 121, 249, 0.15)" : "rgba(59, 130, 246, 0.15)"
            } 0%, transparent 70%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Animated gradient mesh background
function GradientMesh() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-pink/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-brand-blue/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-brand-orange/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/50 to-ink-950" />
    </div>
  );
}

// Quick stats row
function QuickStats() {
  const stats = [
    { value: "50K+", label: "Downloads", icon: Download },
    { value: "4.6★", label: "Rating", icon: Sparkles },
    { value: "5", label: "Games", icon: Gamepad2 },
  ];

  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center gap-2 text-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
            <stat.icon className="h-4 w-4 text-brand-orange" />
          </div>
          <div className="text-left">
            <p className="text-lg font-bold text-white leading-none">{stat.value}</p>
            <p className="text-[10px] uppercase tracking-wider text-white/50">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <GradientMesh />
      <FloatingElements />

      {/* Animated border line */}
      <div className="absolute bottom-0 left-0 right-0 h-px">
        <div className="h-full bg-gradient-to-r from-transparent via-brand-pink/50 via-brand-orange/50 via-brand-blue/50 to-transparent" />
      </div>

      <div className="container-px relative py-20 sm:py-28 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Link
              href="/ai-lab"
              className="group mx-auto inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs text-white/80 ring-1 ring-white/10 backdrop-blur-sm transition-all hover:bg-white/10 hover:ring-white/20"
            >
              <span className="flex h-2 w-2">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
              </span>
              <span>New: AI Lab — field reports from real production</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-balance text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            We build{" "}
            <span className="relative">
              <span className="text-gradient">playful products</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10C50 2 100 2 150 6C200 10 250 10 298 2"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="animate-[dash_2s_ease-out_forwards]"
                  style={{
                    strokeDasharray: 400,
                    strokeDashoffset: 400,
                    animation: "dash 1.5s ease-out 0.8s forwards",
                  }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E879F9" />
                    <stop offset="50%" stopColor="#FB923C" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            {" "}
            that feel polished.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Mobile games & Roblox experiences built with obsessive attention to 
            detail. Fast iterations, clean UX, satisfying motion.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/games"
              className="group btn-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
            >
              Explore Games
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/services"
              className="btn-secondary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
            >
              Studio Services
            </Link>
          </motion.div>

          {/* Insights CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6"
          >
            <Link
              href="/insights"
              className="group inline-flex items-center gap-2 text-sm text-cyan-300/80 transition-colors hover:text-cyan-200"
            >
              <Activity className="h-4 w-4" />
              See what we&apos;re working on
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <QuickStats />
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  );
}
