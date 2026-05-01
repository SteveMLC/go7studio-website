import fs from "fs";
import path from "path";
import { ArrowRight } from "lucide-react";
import { getBlogPostBySlug, getBlogPostHref } from "@/lib/content";

export const dynamic = "force-dynamic";

const QUEUE_FILE = path.join(process.cwd(), "scripts", "publish-queue.txt");
const CRON_SCHEDULE_UTC = "14:00 UTC daily";

interface QueueLine {
  type: "slug" | "comment" | "blank";
  raw: string;
  slug?: string;
  position?: number;
}

function loadQueue(): QueueLine[] {
  let text = "";
  try {
    text = fs.readFileSync(QUEUE_FILE, "utf-8");
  } catch {
    return [];
  }
  let position = 0;
  return text.split("\n").map<QueueLine>((line) => {
    const trimmed = line.trim();
    if (!trimmed) return { type: "blank", raw: line };
    if (trimmed.startsWith("#")) return { type: "comment", raw: line };
    position += 1;
    return { type: "slug", raw: line, slug: trimmed, position };
  });
}

function nextHoursUntilCron(): { hours: number; minutes: number } {
  const now = new Date();
  const next = new Date(now);
  next.setUTCHours(14, 0, 0, 0);
  if (next <= now) {
    next.setUTCDate(next.getUTCDate() + 1);
  }
  const diff = next.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { hours, minutes };
}

export default function QueueAdminPage() {
  const lines = loadQueue();
  const slugLines = lines.filter((l) => l.type === "slug");

  // Find the first eligible slug — file exists with status:"draft"
  let nextEligibleSlug: string | null = null;
  for (const line of slugLines) {
    if (!line.slug) continue;
    const post = getBlogPostBySlug(line.slug);
    if (post && post.status === "draft") {
      nextEligibleSlug = line.slug;
      break;
    }
  }

  const { hours, minutes } = nextHoursUntilCron();
  const queueEditUrl = "https://github.dev/SteveMLC/go7studio-website/blob/main/scripts/publish-queue.txt";

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-brand-teal">Publish queue</p>
        <h1 className="mt-1 text-3xl font-bold text-white">Schedule</h1>
        <p className="mt-2 max-w-2xl text-white/60">
          The daily publisher cron reads <code className="font-mono text-brand-teal">scripts/publish-queue.txt</code> and flips the first eligible draft to published. Tier-1 placeholders (Steve&apos;s voice-defining posts) are commented out until the .mdx file exists.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-white/45">Cron</p>
          <p className="mt-2 text-xl font-semibold text-white">{CRON_SCHEDULE_UTC}</p>
          <p className="mt-1 text-xs text-white/55">
            Next run in ~{hours}h {minutes}m. Manually triggerable in GitHub Actions.
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.06] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-200">Up next</p>
          <p className="mt-2 truncate text-xl font-semibold text-white">
            {nextEligibleSlug ?? "Nothing eligible"}
          </p>
          <p className="mt-1 text-xs text-emerald-200/80">
            {nextEligibleSlug
              ? "Will publish on the next cron tick (or click Publish now in the blog admin)."
              : "All eligible slugs are exhausted. Add new ones to the queue."}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-white/45">In queue</p>
          <p className="mt-2 text-xl font-semibold text-white">{slugLines.length} slugs</p>
          <p className="mt-1 text-xs text-white/55">
            Includes drafts that exist + slugs whose Tier-1 .mdx hasn&apos;t been written yet (those auto-skip).
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10 bg-white/[0.03] text-left text-xs uppercase tracking-[0.18em] text-white/50">
            <tr>
              <th className="w-12 px-4 py-3 font-semibold">#</th>
              <th className="px-4 py-3 font-semibold">Slug / line</th>
              <th className="px-4 py-3 font-semibold">Title</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {lines.map((line, idx) => {
              if (line.type === "blank") {
                return (
                  <tr key={`blank-${idx}`} className="bg-white/[0.01]">
                    <td colSpan={5} className="h-1.5"></td>
                  </tr>
                );
              }

              if (line.type === "comment") {
                const isHeading = line.raw.includes("PARKED") || line.raw.includes("Day ");
                return (
                  <tr key={`comment-${idx}`} className="bg-white/[0.015]">
                    <td className="px-4 py-2 text-xs text-white/30">—</td>
                    <td className="px-4 py-2 font-mono text-xs text-white/40" colSpan={4}>
                      {line.raw.replace(/^# ?/, "")}
                      {isHeading && line.raw.includes("PARKED") ? (
                        <span className="ml-2 inline-flex rounded-full border border-rose-400/30 bg-rose-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-rose-200">
                          parked
                        </span>
                      ) : null}
                    </td>
                  </tr>
                );
              }

              const post = line.slug ? getBlogPostBySlug(line.slug) : undefined;
              const fileExists = !!post;
              const isNext = line.slug === nextEligibleSlug;
              const status = post?.status ?? "missing";

              return (
                <tr
                  key={line.slug}
                  className={isNext ? "bg-emerald-400/[0.06]" : "align-top"}
                >
                  <td className="px-4 py-3 text-xs font-mono text-white/55">
                    {line.position}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">
                    <span className={isNext ? "font-semibold text-emerald-200" : "text-white/80"}>
                      {line.slug}
                    </span>
                    {isNext ? (
                      <span className="ml-2 inline-flex rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-200">
                        next
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">
                    {post ? (
                      <span className="text-white/85">{post.title}</span>
                    ) : (
                      <span className="text-white/40 italic">(file not yet written — Tier 1 or future post)</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {fileExists ? (
                      status === "published" ? (
                        <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-emerald-200">
                          published
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-amber-200">
                          draft
                        </span>
                      )
                    ) : (
                      <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-white/50">
                        no file
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {post ? (
                      <a
                        href={post.status === "published" ? getBlogPostHref(post) : `https://github.dev/SteveMLC/go7studio-website/blob/main/src/content/blog/${post.slug}.mdx`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-brand-teal hover:text-white"
                      >
                        {post.status === "published" ? "View live ↗" : "Open in editor ↗"}
                      </a>
                    ) : (
                      <span className="text-xs text-white/30">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm text-white/65">
        <p className="font-semibold text-white">How to reorder, add, or skip</p>
        <p className="mt-2">
          The queue file is plain text. Open it in github.dev and edit directly:
        </p>
        <p className="mt-2">
          <a
            href={queueEditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white transition hover:border-white/30 hover:bg-white/[0.08]"
          >
            Edit publish-queue.txt on github.dev
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-white/60">
          <li>One slug per line. Order is publish order.</li>
          <li>Lines starting with <code className="font-mono text-brand-teal">#</code> are ignored — use to comment out a slug or annotate a Day-N slot.</li>
          <li>The cron processes the first non-comment slug whose .mdx exists with <code className="font-mono">status: &quot;draft&quot;</code>. Missing .mdx files are skipped (line stays in queue).</li>
          <li>To force-publish ad-hoc: don&apos;t edit the queue. Use the &quot;Publish now&quot; button in the <a href="/admin/blog" className="text-brand-teal hover:underline">blog admin</a>.</li>
        </ul>
      </div>
    </div>
  );
}
