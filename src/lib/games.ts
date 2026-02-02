export type GameStatus = "released" | "coming-soon";
export type GamePlatform = "android" | "roblox";

export type Game = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  status: GameStatus;
  platforms: GamePlatform[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
};

export const GAMES: Game[] = [
  {
    slug: "empire-tycoon",
    title: "Empire Tycoon",
    tagline: "[Tagline goes here]",
    description: "[Short description goes here]",
    status: "released",
    platforms: ["android"],
    primaryCtaLabel: "[Get on Google Play]",
    primaryCtaHref: "#",
  },
  {
    slug: "slimeslip",
    title: "SlimeSlip: Don't Die!",
    tagline: "[Tagline goes here]",
    description: "[Short description goes here]",
    status: "coming-soon",
    platforms: ["roblox"],
    primaryCtaLabel: "[Play on Roblox]",
    primaryCtaHref: "#",
  },
  {
    slug: "pet-paradise",
    title: "Pet Paradise",
    tagline: "[Tagline goes here]",
    description: "[Short description goes here]",
    status: "coming-soon",
    platforms: ["roblox"],
    primaryCtaLabel: "[Play on Roblox]",
    primaryCtaHref: "#",
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return GAMES.find((g) => g.slug === slug);
}
