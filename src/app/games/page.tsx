import type { Metadata } from "next";
import { GameCard } from "@/components/games/GameCard";
import { GAMES } from "@/lib/games";
import {
  createSchemaGraph,
  getWebPageSchema,
  SCHEMA_IDS,
  SITE_URL,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Games",
  description:
    "Explore Go7Studio’s lineup of fun-first games across Android and Roblox—live releases and upcoming worlds in development.",
  alternates: { canonical: "/games" },
};

const gameEntityBySlug: Record<string, string> = {
  "empire-tycoon": `${SITE_URL}/games/empire-tycoon/#game`,
  slimeslip: `${SITE_URL}/games/slimeslip/#game`,
  "pet-paradise": `${SITE_URL}/games/pet-paradise/#game`,
};

export default function GamesPage() {
  const itemListSchema = {
    "@type": "ItemList",
    "@id": SCHEMA_IDS.GAMES_LIST,
    itemListElement: GAMES.map((game, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@id": gameEntityBySlug[game.slug] ?? `${SITE_URL}/games/${game.slug}/#game`,
      },
    })),
  };

  const gamesWebPageSchema = getWebPageSchema("/games", "Games | Go7Studio", SCHEMA_IDS.GAMES_LIST);
  const gamesSchemaGraph = createSchemaGraph(gamesWebPageSchema, itemListSchema);

  return (
    <div className="container-px py-14 sm:py-20">
      <script
        id="games-page-schema-graph-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(gamesSchemaGraph),
        }}
      />
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
