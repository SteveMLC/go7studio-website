import type { Metadata } from "next";
import { GameCard } from "@/components/games/GameCard";
import { GAMES } from "@/lib/games";

export const metadata: Metadata = {
  title: "Games",
  description:
    "Explore Go7Studio’s lineup of fun-first games across Android and Roblox—live releases and upcoming worlds in development.",
  alternates: { canonical: "/games" },
};

export default function GamesPage() {
  return (
    <div className="container-px py-14 sm:py-20">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Games
        </h1>
        <p className="mt-3 text-sm leading-7 text-white/75 sm:text-base">
          Find something fun fast. Jump into our latest releases or peek at what
          we’re building next—each game is designed around satisfying progression,
          snappy feedback, and “okay… one more run.”
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {GAMES.map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}
      </div>
    </div>
  );
}
