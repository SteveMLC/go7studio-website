import fs from "fs";
import path from "path";
import Link from "next/link";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/content";
import { ArrowRight, CalendarClock, FileText, Newspaper, Sparkles, Wrench } from "lucide-react";

export const dynamic = "force-dynamic";

const QUEUE_FILE = path.join(process.cwd(), "scripts", "publish-queue.txt");

function nextEligibleSlug(): string | null {
  let text = "";
  try {
    text = fs.readFileSync(QUEUE_FILE, "utf-8");
  } catch {
    return null;
  }
  for (const raw of text.split("\n")) {
    const trimmed = raw.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const post = getBlogPostBySlug(trimmed);
    if (post && post.status === "draft" && post.publishable === true) return trimmed;
  }
  return null;
}

function nextCronWindow(): string {
  const now = new Date();
  const next = new Date(now);
  next.setUTCHours(14, 0, 0, 0);
  if (next <= now) next.setUTCDate(next.getUTCDate() + 1);
  const diff = next.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
}

export default function AdminHome() {
  const posts = getAllBlogPosts();
  const nextSlug = nextEligibleSlug();
  const nextPost = nextSlug ? getBlogPostBySlug(nextSlug) : null;
  const cronCountdown = nextCronWindow();
  const counts = {
    total: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    draft: posts.filter((p) => p.status === "draft").length,
    aiLab: posts.filter((p) => p.pillar.toLowerCase() === "ai lab").length,
  };

  const cards = [
    {
      title: "Total posts",
      value: counts.total,
      hint: "Across blog + ai-lab",
      icon: Newspaper,
    },
    {
      title: "Live",
      value: counts.published,
      hint: "status: published",
      icon: Sparkles,
      accent: "text-emerald-400",
    },
    {
      title: "Drafts",
      value: counts.draft,
      hint: "status: draft (queued or unqueued)",
      icon: FileText,
      accent: "text-amber-300",
    },
    {
      title: "AI Lab posts",
      value: counts.aiLab,
      hint: "pillar = AI Lab",
      icon: Wrench,
      accent: "text-brand-teal",
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-white">Welcome back.</h1>
        <p className="mt-2 max-w-2xl text-white/60">
          Quick admin surface for managing Go7Studio. Edits commit through GitHub and Vercel auto-deploys; the site picks them up within ~30 seconds.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.18em] text-white/45">{card.title}</p>
              <card.icon className={`h-4 w-4 ${card.accent ?? "text-white/40"}`} />
            </div>
            <p className={`mt-3 text-3xl font-bold ${card.accent ?? "text-white"}`}>{card.value}</p>
            <p className="mt-1 text-xs text-white/50">{card.hint}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.05] p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-200">
            <CalendarClock className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-200">Next scheduled publish</p>
            {nextPost ? (
              <>
                <h2 className="mt-1 text-xl font-semibold text-white">{nextPost.title}</h2>
                <p className="mt-1 font-mono text-xs text-emerald-200/80">{nextPost.slug}</p>
                <p className="mt-3 text-sm text-white/65">
                  Auto-publishes in roughly <span className="font-semibold text-white">{cronCountdown}</span> (cron at 14:00 UTC daily). Or hit Publish now from the blog admin to flip immediately.
                </p>
              </>
            ) : (
              <>
                <h2 className="mt-1 text-xl font-semibold text-white">Queue is empty or all entries skipped</h2>
                <p className="mt-3 text-sm text-white/65">
                  No queued drafts are marked <code className="font-mono text-brand-teal">publishable: true</code>. Mark a reviewed draft publishable or use Blog admin for a manual flip.
                </p>
              </>
            )}
            <Link
              href="/admin/queue"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-200 hover:text-white"
            >
              View full schedule
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Link
          href="/admin/blog"
          className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-brand-teal/40 hover:bg-white/[0.05]"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-brand-teal">Blog</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Manage posts</h2>
          <p className="mt-2 text-sm text-white/60">
            All {counts.total} posts. Flip status (draft → published or vice versa), or open the editor on github.dev.
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-teal/90 group-hover:text-white">
            Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </Link>

        <Link
          href="/admin/queue"
          className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-emerald-400/40 hover:bg-white/[0.05]"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-200">Schedule</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Publish queue</h2>
          <p className="mt-2 text-sm text-white/60">
            See the order each post will publish in. Reorder, comment out, or annotate Day-N slots.
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-200 group-hover:text-white">
            Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </Link>

        <a
          href="https://github.com/SteveMLC/go7studio-website/tree/main/src/content/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/30 hover:bg-white/[0.05]"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-white/45">GitHub</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Open repo on GitHub</h2>
          <p className="mt-2 text-sm text-white/60">
            Raw MDX editing, <code className="font-mono text-brand-teal">github.dev</code>, or other repo files.
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white/70 group-hover:text-white">
            Open repo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </a>
      </div>

      <div className="rounded-2xl border border-amber-300/20 bg-amber-300/[0.04] p-5 text-sm text-white/70">
        <p className="font-semibold text-amber-200">A note on writes</p>
        <p className="mt-2">
          Status flips on the blog page commit through the GitHub API using a personal access token from <code className="font-mono">GITHUB_TOKEN</code>. If that env var isn&apos;t set on the deployment, you&apos;ll see the posts here but the flip buttons won&apos;t fire. Set it in the Vercel project settings.
        </p>
      </div>
    </div>
  );
}
