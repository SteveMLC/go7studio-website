import Link from "next/link";
import { ArrowRight, Smartphone, Gamepad2 } from "lucide-react";
import type { Game } from "@/lib/games";

function PlatformIcon({ platform }: { platform: Game["platforms"][number] }) {
  switch (platform) {
    case "android":
      return <Smartphone className="h-4 w-4" />;
    case "roblox":
      return <Gamepad2 className="h-4 w-4" />;
    default:
      return null;
  }
}

export function GameCard({ game }: { game: Game }) {
  return (
    <article className="glass-card group relative overflow-hidden p-6">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="relative space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">{game.title}</h3>
            <p className="mt-1 text-sm text-white/60">{game.tagline}</p>
          </div>

          <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10">
            {game.status === "released" ? "Released" : "Coming Soon"}
          </span>
        </div>

        <p className="text-sm leading-6 text-white/70">{game.description}</p>

        <div className="flex flex-wrap items-center gap-2">
          {game.platforms.map((p) => (
            <span
              key={p}
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10"
            >
              <PlatformIcon platform={p} />
              <span className="capitalize">{p}</span>
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <Link
            href={`/games/${game.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white"
          >
            View details
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href={game.primaryCtaHref}
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 hover:bg-white/15"
          >
            {game.primaryCtaLabel}
          </a>
        </div>
      </div>
    </article>
  );
}
