import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GAMES, getGameBySlug } from "@/lib/games";
import { ScreenshotGallery } from "@/components/games/ScreenshotGallery";
import { GooglePlayBadge } from "@/components/common/GooglePlayBadge";
import { DownloadButton } from "@/components/common/DownloadButton";
import { GameStructuredData } from "@/components/seo/GameStructuredData";

type PageProps = {
  params: { slug: string };
};

// Lightweight YouTube embed component
function YouTubeEmbed({ url }: { url: string }) {
  const videoId = url.match(/youtu\.be\/([^?]+)|youtube\.com\/watch\?v=([^&]+)/)?.[1] || 
                  url.match(/youtu\.be\/([^?]+)|youtube\.com\/watch\?v=([^&]+)/)?.[2];
  
  if (!videoId) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingBottom: "56.25%" }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Game Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 h-full w-full"
        style={{ border: 0 }}
      />
    </div>
  );
}

export function generateStaticParams() {
  return GAMES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const game = getGameBySlug(params.slug);
  if (!game) return {};

  const baseUrl = "https://go7studio.com";
  const fullUrl = `${baseUrl}/games/${game.slug}`;
  const fullDescription = `${game.tagline} ${game.description}`;
  const ogImageUrl = game.ogImage ? `${baseUrl}${game.ogImage}` : `${baseUrl}/og-default.png`;
  
  // Extract YouTube video ID for embed URL
  const videoId = game.trailerUrl?.match(/youtu\.be\/([^?]+)|youtube\.com\/watch\?v=([^&]+)/)?.[1] || 
                  game.trailerUrl?.match(/youtu\.be\/([^?]+)|youtube\.com\/watch\?v=([^&]+)/)?.[2];
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : undefined;

  return {
    title: game.title,
    description: fullDescription,
    keywords: game.keywords,
    alternates: { canonical: `/games/${game.slug}` },
    openGraph: {
      title: game.title,
      description: fullDescription,
      url: fullUrl,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: game.title,
        },
      ],
      videos: embedUrl ? [
        {
          url: embedUrl,
          width: 1280,
          height: 720,
        },
      ] : undefined,
    },
    twitter: {
      card: embedUrl ? "player" : "summary_large_image",
      title: game.title,
      description: fullDescription,
      images: [ogImageUrl],
      players: embedUrl ? {
        playerUrl: embedUrl,
        streamUrl: embedUrl,
        width: 1280,
        height: 720,
      } : undefined,
    },
  };
}

export default function GameDetailPage({ params }: PageProps) {
  const game = getGameBySlug(params.slug);
  if (!game) notFound();
  const showEnhancedEmpireCta = game.slug === "empire-tycoon";
  const isExternalPrimaryLink = game.primaryCtaHref.startsWith("http");

  return (
    <>
      <GameStructuredData game={game} />
      <div className={`container-px py-14 sm:py-20 ${showEnhancedEmpireCta ? "pb-28 sm:pb-20" : ""}`}>
      <div className="mb-8 flex items-center justify-between gap-4">
        <Link
          href="/games"
          className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to games
        </Link>

        <span className="chip">
          {game.status === "released" ? "LIVE" : "COMING SOON"}
        </span>
      </div>

      <header className="glass-card relative overflow-hidden p-8 sm:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-brand-teal/20 blur-3xl" />
          <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-brand-sky/20 blur-3xl" />
        </div>

        <div className="relative max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            {game.title}
          </h1>
          <p className="mt-3 text-base text-white/75 sm:text-lg">
            {game.tagline}
          </p>

          <p className="mt-6 whitespace-pre-line text-sm leading-7 text-white/75 sm:text-base">
            {game.longDescription}
          </p>

          {showEnhancedEmpireCta ? (
            <div className="mt-8 max-w-xl">
              <div className="mb-4 flex items-center gap-2">
                <span className="chip border-brand-teal/30 bg-brand-teal/15 text-white">Free to Play</span>
                <span className="text-xs uppercase tracking-wide text-white/60">Android</span>
              </div>
              <div className="flex flex-col items-start gap-4">
                <GooglePlayBadge href={game.primaryCtaHref} />
                <DownloadButton href={game.primaryCtaHref} label="Download Empire Tycoon" className="w-full sm:w-auto" />
              </div>
              {game.secondaryCtaLabel && game.secondaryCtaHref ? (
                <Link
                  href={game.secondaryCtaHref}
                  className="btn-secondary mt-4 inline-flex items-center justify-center"
                >
                  {game.secondaryCtaLabel}
                </Link>
              ) : null}
            </div>
          ) : (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={game.primaryCtaHref}
                className="btn-primary inline-flex items-center justify-center gap-2"
                rel="noopener noreferrer"
                target={isExternalPrimaryLink ? "_blank" : undefined}
              >
                {game.primaryCtaLabel}
                <ExternalLink className="h-4 w-4" />
              </a>

              {game.secondaryCtaLabel && game.secondaryCtaHref ? (
                <Link
                  href={game.secondaryCtaHref}
                  className="btn-secondary inline-flex items-center justify-center"
                >
                  {game.secondaryCtaLabel}
                </Link>
              ) : null}
            </div>
          )}
        </div>
      </header>

      {game.trailerUrl && (
        <section className="mt-10">
          <div className="glass-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Watch Trailer</h2>
            <YouTubeEmbed url={game.trailerUrl} />
          </div>
        </section>
      )}

      {game.screenshots?.length ? (
        <section className="mt-10">
          <ScreenshotGallery
            screenshots={game.screenshots}
            title={`${game.title} Screenshots`}
          />
        </section>
      ) : null}

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="glass-card p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-white">Features</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {game.features.map((f) => (
              <li key={f}>• {f}</li>
            ))}
          </ul>
        </div>

        <aside className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white">Details</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-white/60">Platform</dt>
              <dd className="text-white/90 capitalize">
                {game.platforms.join(", ")}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-white/60">Status</dt>
              <dd className="text-white/90">
                {game.status === "released" ? "Live" : "Coming Soon"}
              </dd>
            </div>
          </dl>
        </aside>
      </section>
      </div>

      {showEnhancedEmpireCta ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/15 bg-ink-900/95 px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.45)] backdrop-blur sm:hidden">
          <DownloadButton href={game.primaryCtaHref} label="Download Free on Google Play" className="w-full justify-center" />
        </div>
      ) : null}
    </>
  );
}
