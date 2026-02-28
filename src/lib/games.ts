export type GameStatus = "released" | "coming-soon";
export type GamePlatform = "android" | "roblox";

export type Game = {
  slug: string;
  title: string;
  thumbnail: string;
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
  trailerUrl?: string;
  screenshots?: string[];
  ogImage?: string;
  keywords?: string[];
};

export const GAMES: Game[] = [
  {
    slug: "rampart",
    title: "Rampart - Wave Defense",
    thumbnail: "/images/games/rampart/icon.png",
    tagline: "Defend your kingdom. Build your fortress. Survive the endless waves.",
    description:
      "A medieval wave defense where strategy meets chaos—build defenses, command units, and hold the line against relentless enemy waves.",
    longDescription:
      "The horde is coming. In Rampart, you are the last line of defense between your kingdom and total destruction.\n\nBuild an impenetrable fortress with walls, towers, and strategic chokepoints. Command powerful units and heroes to turn the tide. Face increasingly challenging waves of enemies—from militia scouts to fire-breathing dragons.\n\nEvery decision matters: placement, upgrades, timing. Will your rampart hold, or will the kingdom fall?",
    features: [
      "Strategic wave defense with deep placement mechanics",
      "Command units: Militia, Archers, Knights, and more",
      "Hero system: Unlock powerful champions to turn the tide",
      "Dynamic castle health system—watch your fortress take damage",
      "Endless waves with increasing difficulty and enemy variety",
      "Medieval pixel art aesthetic with earthy, warm tones",
    ],
    status: "coming-soon",
    platforms: ["android"],
    primaryCtaLabel: "Join the Waitlist",
    primaryCtaHref: "#",
    secondaryCtaLabel: "Meet the Studio",
    secondaryCtaHref: "/#about",
    screenshots: [
      "/images/games/rampart/enemy-orc.png",
      "/images/games/rampart/enemy-wolf.png",
      "/images/games/rampart/hero-bg.png",
    ],
    ogImage: "/images/games/rampart/hero-bg.png",
    keywords: ["wave defense", "strategy game", "medieval", "pixel art", "android game", "castle defense", "endless waves"],
  },
  {
    slug: "empire-tycoon",
    title: "Empire Tycoon - Idle Business",
    thumbnail: "/images/games/empire-tycoon/icon-new.jpg",
    tagline: "Build your business empire! Idle tycoon with real estate & smart investing.",
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
      "Offline earnings so your empire keeps working while you're away",
    ],
    status: "released",
    platforms: ["android"],
    primaryCtaLabel: "Get Empire Tycoon on Google Play",
    primaryCtaHref: "https://play.google.com/store/apps/details?id=com.go7studio.empire_tycoon",
    secondaryCtaLabel: "Meet the Studio",
    secondaryCtaHref: "/#about",
    trailerUrl: "https://youtu.be/fTPL9IJ-BpI",
    screenshots: [
      "/images/games/empire-tycoon/screenshots/ScreenOne.png",
      "/images/games/empire-tycoon/screenshots/ScreenTwo.png",
      "/images/games/empire-tycoon/screenshots/ScreenThree.png",
      "/images/games/empire-tycoon/screenshots/screenfour.png",
      "/images/games/empire-tycoon/screenshots/screenfive.png",
      "/images/games/empire-tycoon/screenshots/screensix.png",
    ],
    ogImage: "/images/games/empire-tycoon/og-image.jpg",
    keywords: ["idle game", "tycoon", "business simulator", "investment game", "real estate", "offline earnings", "android game"],
  },
  {
    slug: "slimeslip",
    title: "SlimeSlip: Don't Die!",
    thumbnail: "/images/games/slimeslip-promo.jpg",
    tagline: "Slip fast. Dodge everything. Don't die.",
    description:
      "A high-speed Roblox obstacle experience built for chaos with friends-slick movement, wild hazards, and clutch wins.",
    longDescription:
      "Welcome to SlimeSlip: Don't Die!-a high-speed Roblox obstacle experience where the floor is slick, the hazards are unfair (in the best way), and your friends are definitely going to push you.\n\nDash, slide, bounce, and scramble through slime-coated courses built for maximum chaos. Every run is a new chance to clutch a win, unlock cool cosmetics, and prove you can survive the slip.",
    features: [
      "Slime movement mechanics: speed, slides, and satisfying control",
      "Wild hazards, traps, and \"how did I survive that?\" moments",
      "Multiplayer mayhem that's better (and louder) with friends",
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
    thumbnail: "/images/games/pet-paradise-promo.jpg",
    tagline: "Breed. Mutate. Create your dream pet.",
    description:
      "A cozy Roblox pet-collecting world with deep breeding, surprising mutations, and rare combos worth showing off.",
    longDescription:
      "Pet Paradise is a Roblox pet-collecting and breeding game where your imagination is the meta. Hatch adorable companions, combine traits, and discover surprising mutations as you build the ultimate roster.\n\nIt's cozy, it's addictive, and it's packed with \"wait… that actually worked?\" moments. Build a perfect pet, trade with friends, and chase rare combinations you'll want to show off.",
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
  {
    slug: "stakd",
    title: "STAKD - Zen Block Puzzle",
    thumbnail: "/images/games/stakd/icon.png",
    tagline: "Stack. Sort. Find your zen.",
    description:
      "A meditative block-sorting puzzle game with a zen garden that grows as you play. Solve, breathe, grow.",
    longDescription:
      "STAKD is a zen puzzle game where you sort colored blocks into stacks—simple to learn, deeply satisfying to master.\n\nEvery puzzle you solve grows your personal zen garden. Watch it evolve from bare stones to a lush paradise as you progress through 25 ranks of mastery.\n\nFour difficulty levels from Easy to Ultra, special blocks that challenge your strategy, and a progression system with 48 achievements to unlock. No ads interrupting your flow. No timers. Just puzzles, peace, and your garden.",
    features: [
      "Meditative block-sorting puzzles across 4 difficulty levels",
      "Zen garden that grows and evolves as you solve puzzles",
      "25 ranks from Curious Wanderer to Infinite Keeper",
      "48 achievements across mastery, speed, streaks, and more",
      "Special blocks: locked and frozen challenges",
      "No intrusive ads — play at your own pace",
    ],
    status: "released",
    platforms: ["android"],
    primaryCtaLabel: "Get STAKD on Google Play",
    primaryCtaHref: "https://play.google.com/store/apps/details?id=com.go7studio.stakd",
    secondaryCtaLabel: "Meet the Studio",
    secondaryCtaHref: "/#about",
    keywords: ["puzzle game", "zen game", "block sorting", "relaxing puzzle", "meditation game", "android game"],
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return GAMES.find((g) => g.slug === slug);
}
