import type { Game } from "@/lib/games";

type GameStructuredDataProps = {
  game: Game;
};

const BASE_URL = "https://go7studio.com";
const DEFAULT_TRAILER_UPLOAD_DATE = "2026-02-11";

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

  const applicationSchema = {
    "@context": "https://schema.org",
    "@type": game.platforms.includes("android") ? "MobileApplication" : "SoftwareApplication",
    name: canonicalName,
    description,
    applicationCategory: "GameApplication",
    operatingSystem,
    url: gameUrl,
    downloadUrl: game.primaryCtaHref,
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
