import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Smartphone, Gamepad2, Sparkles } from "lucide-react";
import type { Game } from "@/lib/games";

function PlatformIcon({ platform }: { platform: Game["platforms"][number] }) {
  switch (platform) {
    case "android":
      return <Smartphone className="h-3.5 w-3.5" />;
    case "roblox":
      return <Gamepad2 className="h-3.5 w-3.5" />;
    default:
      return null;
  }
}

function StatusBadge({ status }: { status: Game["status"] }) {
  if (status === "released") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-green-400 ring-1 ring-green-500/30">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400"></span>
        </span>
        Live
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-400 ring-1 ring-amber-500/30">
      <Sparkles className="h-3 w-3" />
      Coming Soon
    </span>
  );
}

function CtaButton({ game }: { game: Game }) {
  const isExternal = game.primaryCtaHref.startsWith("http");
  const baseClasses = "group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200";
  
  if (game.status === "released") {
    return (
      <a
        href={game.primaryCtaHref}
        className={`${baseClasses} bg-gradient-to-r from-brand-pink via-brand-orange to-brand-blue text-white shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/30 hover:scale-105`}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {game.platforms.includes("android") ? "Get on Play Store" : "Play Now"}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </a>
    );
  }
  
  return (
    <Link
      href={`/games/${game.slug}`}
      className={`${baseClasses} bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15 hover:scale-105`}
    >
      Wishlist
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export function GameCard({ game }: { game: Game }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-brand-pink/10">
      {/* Hover glow effect */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-brand-pink/20 blur-3xl" />
        <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-brand-blue/20 blur-3xl" />
      </div>

      {/* Thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={game.thumbnail}
          alt={`${game.title} thumbnail`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-all duration-500 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Status badge - positioned on image */}
        <div className="absolute left-3 top-3">
          <StatusBadge status={game.status} />
        </div>

        {/* Platform badges */}
        <div className="absolute right-3 top-3 flex gap-1.5">
          {game.platforms.map((p) => (
            <span
              key={p}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white/90 backdrop-blur-sm ring-1 ring-white/20"
            >
              <PlatformIcon platform={p} />
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative p-4">
        <h3 className="line-clamp-1 text-base font-bold text-white group-hover:text-gradient transition-colors">
          {game.title}
        </h3>
        
        <p className="mt-1 line-clamp-2 text-sm text-white/60 leading-relaxed">
          {game.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <Link
            href={`/games/${game.slug}`}
            className="text-xs font-medium text-white/70 hover:text-white transition-colors"
          >
            Learn more
          </Link>
          <CtaButton game={game} />
        </div>
      </div>
    </article>
  );
}
