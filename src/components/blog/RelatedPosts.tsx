import Link from "next/link";
import { getBlogPostHref, type BlogPost } from "@/lib/content";

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-xl font-semibold">Related Posts</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={getBlogPostHref(post)} className="glass-card block p-4 hover:border-brand-teal/40">
            <p className="text-xs text-brand-teal">{post.pillar}</p>
            <p className="mt-1 text-sm font-medium">{post.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
