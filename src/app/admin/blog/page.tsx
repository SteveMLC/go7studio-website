import { getAllBlogPosts, getBlogPostHref } from "@/lib/content";
import { StatusToggle } from "./StatusToggle";

export const dynamic = "force-dynamic";

const PILLAR_ACCENT: Record<string, string> = {
  "ai lab": "border-brand-teal/40 bg-brand-teal/10 text-[#5eead4]",
  studio: "border-brand-orange/40 bg-brand-orange/10 text-[#fed7aa]",
  "case study": "border-pink-400/40 bg-pink-400/10 text-pink-200",
  qualora: "border-blue-400/40 bg-blue-400/10 text-blue-200",
};

const STATUS_BADGE: Record<string, string> = {
  published: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  draft: "border-amber-300/30 bg-amber-300/10 text-amber-200",
};

export default function BlogAdminPage() {
  const posts = getAllBlogPosts().sort((a, b) => {
    // Published first, then by modified-desc, then by date-desc
    if (a.status !== b.status) {
      return a.status === "published" ? -1 : 1;
    }
    const aDate = new Date(a.modified ?? a.date).getTime();
    const bDate = new Date(b.modified ?? b.date).getTime();
    return bDate - aDate;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-teal">Blog admin</p>
        <h1 className="text-3xl font-bold text-white">All posts</h1>
        <p className="text-white/60">
          Click <span className="font-semibold text-white">Edit</span> to open the source MDX in github.dev.
          Use the status pill to flip a post between draft and published &mdash; it commits through the GitHub API and Vercel auto-deploys.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10 bg-white/[0.03] text-left text-xs uppercase tracking-[0.18em] text-white/50">
            <tr>
              <th className="px-4 py-3 font-semibold">Title</th>
              <th className="px-4 py-3 font-semibold">Pillar</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Modified</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {posts.map((post) => {
              const pillarKey = post.pillar.toLowerCase();
              const pillarStyle = PILLAR_ACCENT[pillarKey] ?? "border-white/15 bg-white/5 text-white/70";
              const statusKey = post.status ?? "draft";
              const statusStyle = STATUS_BADGE[statusKey] ?? "border-white/15 bg-white/5 text-white/70";
              const editUrl = `https://github.dev/SteveMLC/go7studio-website/blob/main/src/content/blog/${post.slug}.mdx`;
              const liveUrl = statusKey === "published" ? getBlogPostHref(post) : null;

              return (
                <tr key={post.slug} className="align-top">
                  <td className="px-4 py-4">
                    <p className="font-semibold text-white">{post.title}</p>
                    <p className="mt-1 font-mono text-xs text-white/40">{post.slug}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide ${pillarStyle}`}>
                      {post.pillar}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide ${statusStyle}`}>
                      {statusKey}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-white/60">
                    {post.modified ?? post.date}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <StatusToggle slug={post.slug} status={statusKey} />
                      <a
                        href={editUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/80 transition hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
                      >
                        Edit on github.dev
                      </a>
                      {liveUrl ? (
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-brand-teal hover:text-white"
                        >
                          View live ↗
                        </a>
                      ) : null}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm text-white/65">
        <p className="font-semibold text-white">How publishing works</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li><span className="font-mono text-brand-teal">draft</span> &mdash; lives in repo, invisible on the site, ignored by the daily cron.</li>
          <li><span className="font-mono text-brand-teal">published</span> &mdash; live at <code className="font-mono text-brand-teal">/blog/&lt;slug&gt;</code> or <code className="font-mono text-brand-teal">/ai-lab/&lt;slug&gt;</code>, listed on hub pages and homepage.</li>
          <li>
            The daily publisher cron (<code className="font-mono">14:00 UTC</code>) reads <code className="font-mono">scripts/publish-queue.txt</code> and flips the next eligible draft. To force a flip immediately, hit the status pill on this page.
          </li>
        </ul>
      </div>
    </div>
  );
}
