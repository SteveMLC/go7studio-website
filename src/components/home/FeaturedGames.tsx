import { GameCard } from "@/components/games/GameCard";
import { GAMES } from "@/lib/games";

export function FeaturedGames() {
  return (
    <section className="container-px py-16 sm:py-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            [Featured games]
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/60 sm:text-base">
            [Short intro to the featured games grid goes here]
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {GAMES.map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}
      </div>
    </section>
  );
}
