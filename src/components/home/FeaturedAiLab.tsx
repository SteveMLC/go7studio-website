import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getPublishedBlogPosts, getBlogPostHref } from "@/lib/content";

export function FeaturedAiLab() {
  const posts = getPublishedBlogPosts()
    .filter((post) => post.pillar.toLowerCase() === "ai lab")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  if (!posts.length) return null;

  return (
    <section className="container-px py-20">
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-brand-teal">AI Lab</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Latest field reports</h2>
          <p className="mt-2 max-w-2xl text-base text-white/60">
            Builder notes from real AI-assisted engineering work: model routing, review loops, coding workflows, and shipped product lessons.
          </p>
        </div>

        <Link
          href="/ai-lab"
          className="hidden items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white sm:inline-flex"
        >
          Open AI Lab
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={getBlogPostHref(post)}
            className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-200 hover:border-brand-teal/40 hover:bg-white/[0.05]"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-brand-teal">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI Lab</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold leading-snug text-white group-hover:text-brand-teal">
              {post.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-white/60">{post.excerpt}</p>
            <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-teal/90 group-hover:text-white">
              Read technical note
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <Link href="/ai-lab" className="btn-secondary inline-flex w-full items-center justify-center">
          Open AI Lab
        </Link>
      </div>
    </section>
  );
}
