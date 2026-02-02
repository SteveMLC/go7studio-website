export type GameStatus = "released" | "coming-soon";
export type GamePlatform = "android" | "roblox";

export type Game = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  features: string[];
  status: GameStatus;
  platforms: GamePlatform[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

export const GAMES: Game[] = [
  {
    slug: "empire-tycoon",
    title: "Empire Tycoon",
    tagline: "From tiny shop to unstoppable empire.",
    description:
      "Build businesses, automate income, and scale from your first shop to a booming empire.",
    longDescription:
      "Start small and think big. Empire Tycoon puts you in charge of turning a simple business into a money-printing machine—one upgrade, one expansion, and one smart decision at a time.\n\nHire managers, unlock new industries, and watch your profits skyrocket as your empire spreads. The deeper you go, the more satisfying the strategy becomes: optimize your income, pick the best upgrades, and build a growth engine that never stops.\n\nWhether you play for five minutes or five hours, Empire Tycoon is designed to deliver constant progress—smooth, addictive, and incredibly rewarding.",
    features: [
      "Build multiple businesses and expand into new industries",
      "Upgrade production, profits, and speed for explosive growth",
      "Hire managers to automate and optimize your income",
      "Unlock new zones and scale your empire across the map",
      "Satisfying progression with clear goals and juicy rewards",
      "Offline earnings so your empire keeps working while you’re away",
    ],
    status: "released",
    platforms: ["android"],
    primaryCtaLabel: "Get Empire Tycoon on Google Play",
    primaryCtaHref: "https://play.google.com/store/apps/details?id=com.go7studio.empire_tycoon",
    secondaryCtaLabel: "Meet the Studio",
    secondaryCtaHref: "/#about",
  },
  {
    slug: "slimeslip",
    title: "SlimeSlip: Don’t Die!",
    tagline: "Slip fast. Dodge everything. Don’t die.",
    description:
      "A high-speed Roblox obstacle experience built for chaos with friends—slick movement, wild hazards, and clutch wins.",
    longDescription:
      "Welcome to SlimeSlip: Don’t Die!—a high-speed Roblox obstacle experience where the floor is slick, the hazards are unfair (in the best way), and your friends are definitely going to push you.\n\nDash, slide, bounce, and scramble through slime-coated courses built for maximum chaos. Every run is a new chance to clutch a win, unlock cool cosmetics, and prove you can survive the slip.",
    features: [
      "Slime movement mechanics: speed, slides, and satisfying control",
      "Wild hazards, traps, and “how did I survive that?” moments",
      "Multiplayer mayhem that’s better (and louder) with friends",
      "Unlocks & cosmetics to flex your drip between rounds",
    ],
    status: "coming-soon",
    platforms: ["roblox"],
    primaryCtaLabel: "Follow Development",
    primaryCtaHref: "/#about",
    secondaryCtaLabel: "Explore other games",
    secondaryCtaHref: "/games",
  },
  {
    slug: "pet-paradise",
    title: "Pet Paradise",
    tagline: "Breed. Mutate. Create your dream pet.",
    description:
      "A cozy Roblox pet-collecting world with deep breeding, surprising mutations, and rare combos worth showing off.",
    longDescription:
      "Pet Paradise is a Roblox pet-collecting and breeding game where your imagination is the meta. Hatch adorable companions, combine traits, and discover surprising mutations as you build the ultimate roster.\n\nIt’s cozy, it’s addictive, and it’s packed with “wait… that actually worked?” moments. Build a perfect pet, trade with friends, and chase rare combinations you’ll want to show off.",
    features: [
      "Deep breeding system: mix traits to create new looks and abilities",
      "Mutation rolls with rare outcomes and collect-worthy surprises",
      "Customization: assemble pets with unique parts, colors, and styles",
      "Progression loops designed for collectors, creators, and traders",
    ],
    status: "released",
    platforms: ["roblox"],
    primaryCtaLabel: "Play Pet Paradise on Roblox",
    primaryCtaHref: "https://www.roblox.com/games/124370058891623/Pet-Paradise",
    secondaryCtaLabel: "Explore other games",
    secondaryCtaHref: "/games",
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return GAMES.find((g) => g.slug === slug);
}
