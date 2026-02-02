import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GAMES, getGameBySlug } from "@/lib/games";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return GAMES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const game = getGameBySlug(params.slug);
  if (!game) return {};

  return {
    title: game.title,
    description: `${game.tagline} ${game.description}`,
    alternates: { canonical: `/games/${game.slug}` },
    openGraph: {
      title: game.title,
      description: `${game.tagline} ${game.description}`,
      url: `/games/${game.slug}`,
      type: "article",
    },
  };
}

export default function GameDetailPage({ params }: PageProps) {
  const game = getGameBySlug(params.slug);
  if (!game) notFound();

  return (
    <div className="container-px py-14 sm:py-20">
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

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={game.primaryCtaHref}
              className="btn-primary inline-flex items-center justify-center gap-2"
              rel="noopener noreferrer"
              target={game.primaryCtaHref.startsWith("http") ? "_blank" : undefined}
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
        </div>
      </header>

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
  );
}
