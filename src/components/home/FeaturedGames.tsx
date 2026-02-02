import Link from "next/link";
import { GameCard } from "@/components/games/GameCard";
import { GAMES } from "@/lib/games";

export function FeaturedGames() {
  return (
    <section className="container-px py-16 sm:py-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Featured Games
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70 sm:text-base">
            Three worlds. Three vibes. One mission: ridiculously fun gameplay.
            Jump into our newest releases and upcoming projects—each built to be
            fast, satisfying, and packed with “just try it” moments.
          </p>
        </div>

        <Link
          href="/games"
          className="hidden text-sm font-medium text-white/80 hover:text-white sm:inline-flex"
        >
          View all games
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {GAMES.map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <Link
          href="/games"
          className="btn-secondary inline-flex w-full items-center justify-center"
        >
          View all games
        </Link>
      </div>
    </section>
  );
}
