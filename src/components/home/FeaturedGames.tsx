"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GameCard } from "@/components/games/GameCard";
import { GAMES } from "@/lib/games";
import { Smartphone, Gamepad2, Sparkles, Rocket, Filter } from "lucide-react";

type FilterType = "all" | "android" | "roblox" | "released" | "coming-soon";

const filters: { value: FilterType; label: string; icon: typeof Smartphone }[] = [
  { value: "all", label: "All Games", icon: Filter },
  { value: "android", label: "Mobile", icon: Smartphone },
  { value: "roblox", label: "Roblox", icon: Gamepad2 },
  { value: "released", label: "Released", icon: Rocket },
  { value: "coming-soon", label: "Coming Soon", icon: Sparkles },
];

export function FeaturedGames() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredGames = GAMES.filter((game) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "released") return game.status === "released";
    if (activeFilter === "coming-soon") return game.status === "coming-soon";
    return game.platforms.includes(activeFilter);
  });

  return (
    <section className="container-px py-20">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">
            Featured Projects
          </h2>
          <p className="mt-2 max-w-xl text-base text-white/60">
            Games built to be fast, satisfying, and packed with &ldquo;just try it&rdquo; moments.
          </p>
        </div>

        <Link
          href="/games"
          className="hidden text-sm font-medium text-white/70 hover:text-white sm:inline-flex"
        >
          View all projects
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.value;
          
          return (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-white text-slate-950"
                  : "bg-white/5 text-white/70 ring-1 ring-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className={`h-4 w-4 transition-colors ${isActive ? "text-slate-950" : ""}`} />
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Games grid */}
      <AnimatePresence mode="popLayout">
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          layout
        >
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              layout
            >
              <GameCard game={game} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredGames.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-white/50">No games match this filter.</p>
        </div>
      )}

      <div className="mt-8 sm:hidden">
        <Link
          href="/games"
          className="btn-secondary inline-flex w-full items-center justify-center"
        >
          View all projects
        </Link>
      </div>
    </section>
  );
}
