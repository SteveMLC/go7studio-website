import Link from "next/link";
import type { BlogPost } from "@/lib/content";
import { ReadingTime } from "./ReadingTime";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="glass-card p-6 transition hover:border-brand-teal/40">
      <p className="text-xs uppercase tracking-wide text-brand-teal">{post.pillar}</p>
      <h3 className="mt-2 text-xl font-semibold">
        <Link href={`/blog/${post.slug}`} className="hover:text-brand-teal">{post.title}</Link>
      </h3>
      <p className="mt-2 text-sm text-white/70">{post.excerpt}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-white/60">
        <span>{post.date}</span>
        <ReadingTime value={post.readingTime ?? ""} />
      </div>
    </article>
  );
}
