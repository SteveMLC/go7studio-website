import type { Game } from "@/lib/games";

type GameStructuredDataProps = {
  game: Game;
};

const BASE_URL = "https://go7studio.com";
const DEFAULT_TRAILER_UPLOAD_DATE = "2026-02-11T12:00:00-05:00";

function toYouTubeEmbedUrl(url: string) {
  const match = url.match(/youtu\.be\/([^?]+)|youtube\.com\/watch\?v=([^&]+)/);
  const videoId = match?.[1] || match?.[2];

  return videoId ? `https://www.youtube.com/embed/${videoId}` : undefined;
}

export function getGameStructuredData(game: Game) {
  const gameUrl = `${BASE_URL}/games/${game.slug}`;
  const canonicalName = game.slug === "empire-tycoon" ? "Empire Tycoon" : game.title;
  const description = `${game.tagline} ${game.description}`;
  const operatingSystem = game.platforms.includes("android") ? "Android" : undefined;
  const isEmpireTycoon = game.slug === "empire-tycoon";
  const gameId = `${gameUrl}/#game`;
  const trailerId = `${gameUrl}/#trailer-1`;
  const softwareVersion = (game as Game & { softwareVersion?: string }).softwareVersion ?? "1.0.0";
  const normalizedScreenshots = game.screenshots?.map((screenshot) =>
    screenshot.startsWith("http") ? screenshot : `${BASE_URL}${screenshot}`,
  );
  const empireScreenshots = [
    "https://go7studio.com/images/games/empire-tycoon/screenshots/ScreenOne.png",
    "https://go7studio.com/images/games/empire-tycoon/screenshots/ScreenTwo.png",
    "https://go7studio.com/images/games/empire-tycoon/screenshots/ScreenThree.png",
    "https://go7studio.com/images/games/empire-tycoon/screenshots/screenfour.png",
    "https://go7studio.com/images/games/empire-tycoon/screenshots/screenfive.png",
    "https://go7studio.com/images/games/empire-tycoon/screenshots/screensix.png",
  ];

  const applicationSchema = {
    "@context": "https://schema.org",
    "@id": gameId,
    "@type": isEmpireTycoon
      ? ["SoftwareApplication", "MobileApplication", "VideoGame"]
      : game.platforms.includes("android")
        ? "MobileApplication"
        : "SoftwareApplication",
    name: canonicalName,
    description,
    applicationCategory: "GameApplication",
    operatingSystem,
    url: gameUrl,
    inLanguage: isEmpireTycoon ? "en" : undefined,
    installUrl: isEmpireTycoon
      ? "https://play.google.com/store/apps/details?id=com.go7studio.empire_tycoon"
      : undefined,
    downloadUrl: game.primaryCtaHref,
    identifier: isEmpireTycoon
      ? {
          "@type": "PropertyValue",
          propertyID: "androidPackageName",
          value: "com.go7studio.empire_tycoon",
        }
      : undefined,
    screenshot: isEmpireTycoon ? empireScreenshots : normalizedScreenshots,
    softwareVersion: isEmpireTycoon ? softwareVersion : undefined,
    releaseNotes: isEmpireTycoon
      ? "Build your business empire with real estate and smart investing. Latest update includes improved offline earnings and new upgrades."
      : undefined,
    genre: isEmpireTycoon ? ["Idle game", "Tycoon"] : undefined,
    gamePlatform: isEmpireTycoon ? ["Android"] : undefined,
    publisher: isEmpireTycoon ? { "@id": "https://go7studio.com/#org" } : undefined,
    offers: game.status === "released"
      ? {
          "@type": "Offer",
          price: 0,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: game.primaryCtaHref,
        }
      : undefined,
    aggregateRating: game.slug === "empire-tycoon"
      ? {
          "@type": "AggregateRating",
          ratingValue: 4.6,
          ratingCount: 1200,
        }
      : undefined,
  };

  const videoSchema = game.trailerUrl
    ? {
        "@context": "https://schema.org",
        "@id": trailerId,
        "@type": "VideoObject",
        name: `${canonicalName} Official Trailer`,
        description: `Watch the official trailer for ${canonicalName}.`,
        thumbnailUrl: game.ogImage ? `${BASE_URL}${game.ogImage}` : `${BASE_URL}/images/games/empire-tycoon/icon.jpg`,
        uploadDate: DEFAULT_TRAILER_UPLOAD_DATE,
        contentUrl: game.trailerUrl,
        embedUrl: toYouTubeEmbedUrl(game.trailerUrl),
      }
    : null;

  return { applicationSchema, videoSchema };
}

export function GameStructuredData({ game }: GameStructuredDataProps) {
  const { applicationSchema, videoSchema } = getGameStructuredData(game);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(applicationSchema),
        }}
      />
      {videoSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(videoSchema),
          }}
        />
      ) : null}
    </>
  );
}
