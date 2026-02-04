import type { Game } from "@/lib/games";

type GameStructuredDataProps = {
  game: Game;
};

export function GameStructuredData({ game }: GameStructuredDataProps) {
  const baseUrl = "https://go7studio.com";
  
  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: `${game.tagline} ${game.description}`,
    genre: game.keywords?.join(", ") || "Idle Game, Tycoon",
    gamePlatform: game.platforms.map((p) => 
      p === "android" ? "Android" : "Roblox"
    ).join(", "),
    applicationCategory: "Game",
    operatingSystem: game.platforms.includes("android") ? "ANDROID" : undefined,
    offers: game.status === "released" ? {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: game.primaryCtaHref,
    } : undefined,
    aggregateRating: game.slug === "empire-tycoon" ? {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "1000",
    } : undefined,
    trailer: game.trailerUrl ? {
      "@type": "VideoObject",
      name: `${game.title} Trailer`,
      description: `Watch the official trailer for ${game.title}`,
      thumbnailUrl: game.ogImage ? `${baseUrl}${game.ogImage}` : undefined,
      uploadDate: new Date().toISOString().split('T')[0],
      embedUrl: game.trailerUrl.replace('youtu.be/', 'www.youtube.com/embed/'),
    } : undefined,
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: game.title,
    description: `${game.tagline} ${game.description}`,
    applicationCategory: "GameApplication",
    operatingSystem: game.platforms.includes("android") ? "ANDROID" : undefined,
    offers: game.status === "released" ? {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    } : undefined,
    aggregateRating: game.slug === "empire-tycoon" ? {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "1000",
    } : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoGameSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareAppSchema),
        }}
      />
    </>
  );
}
