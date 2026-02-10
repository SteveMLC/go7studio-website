"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Smartphone,
  Gamepad2,
  TrendingUp,
  FileCode,
  Zap,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Smartphone,
    title: "Mobile Game Development",
    description:
      "End-to-end Flutter development for iOS and Android. From concept to launch, with a focus on performance, polish, and monetization.",
    features: [
      "Cross-platform Flutter apps",
      "AdMob & IAP integration",
      "App store optimization",
    ],
  },
  {
    icon: Gamepad2,
    title: "Roblox Game Development",
    description:
      "Build engaging Roblox experiences with solid game loops, progression systems, and Robux monetization strategies.",
    features: [
      "Lua scripting & systems design",
      "Multiplayer mechanics",
      "Gamepasses & dev products",
    ],
  },
  {
    icon: TrendingUp,
    title: "Game Monetization Strategy",
    description:
      "Data-driven monetization planning for free-to-play games. AdMob, IAP, or hybrid models tailored to your game.",
    features: [
      "Revenue model design",
      "Ad placement optimization",
      "Player retention analysis",
    ],
  },
  {
    icon: FileCode,
    title: "Technical Architecture Review",
    description:
      "Code audits, architecture planning, and scalability assessments for existing or planned game projects.",
    features: [
      "Performance optimization",
      "Code quality review",
      "Tech stack recommendations",
    ],
  },
  {
    icon: Zap,
    title: "MVP Prototyping",
    description:
      "Rapid prototyping to validate your game concept. Get a playable build fast to test mechanics and gather feedback.",
    features: [
      "Core gameplay loop",
      "Minimal viable features",
      "2-4 week turnaround",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="container-px py-16 sm:py-24">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-16 max-w-3xl text-center"
      >
        <h1 className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Game Development
          <span className="mt-2 block bg-gradient-to-r from-brand-orange via-brand-pink to-brand-purple bg-clip-text text-transparent">
            Consulting
          </span>
        </h1>
        <p className="mb-8 text-lg text-white/70 sm:text-xl">
          Expert guidance for indie studios and teams building mobile games,
          Roblox experiences, and interactive entertainment. From technical
          architecture to monetization strategy—let&apos;s level up your game.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/contact" className="btn-primary inline-flex items-center">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <p className="text-sm text-white/60">
            Consultations starting at{" "}
            <span className="font-semibold text-brand-orange">$500</span>
          </p>
        </div>
      </motion.div>

      {/* Services Grid */}
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 font-display text-2xl font-semibold sm:text-3xl">
            Services We Offer
          </h2>
          <p className="text-white/70">
            Focused expertise to help you ship, scale, and succeed.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="glass-card group p-6 transition-all hover:border-brand-orange/30"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-orange/20 to-brand-pink/20 ring-1 ring-white/10">
                  <Icon className="h-6 w-6 text-brand-orange" />
                </div>
                <h3 className="mb-3 font-display text-xl font-semibold">
                  {service.title}
                </h3>
                <p className="mb-4 text-sm text-white/70">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-white/60"
                    >
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-brand-orange" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mx-auto mt-20 max-w-3xl text-center"
      >
        <div className="glass-card p-8 sm:p-12">
          <h2 className="mb-4 font-display text-2xl font-semibold sm:text-3xl">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-white/70">
            Whether you need a quick consultation, a full project build, or
            technical guidance—we&apos;re here to help. Tell us about your game
            and let&apos;s see how we can work together.
          </p>
          <Link
            href="/contact"
            className="btn-primary inline-flex items-center"
          >
            Contact Us
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
