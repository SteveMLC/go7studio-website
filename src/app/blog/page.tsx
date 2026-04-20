import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import { getPublishedBlogPosts } from "@/lib/content";

const title = "Blog";
const description = "Game dev, growth, and product insights from Go7Studio.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `${title} | Go7Studio`,
    description,
    url: "https://go7studio.com/blog",
  },
  twitter: {
    title: `${title} | Go7Studio`,
    description,
  },
};

export default function BlogIndexPage({ searchParams }: { searchParams: { pillar?: string } }) {
  const posts = getPublishedBlogPosts();
  const activePillar = searchParams.pillar;
  const filtered = activePillar ? posts.filter((p) => p.pillar === activePillar) : posts;
  const pillars = [...new Set(posts.map((p) => p.pillar))];

  return (
    <div className="container-px py-16">
      <h1 className="text-4xl font-bold">Blog</h1>
      <p className="mt-2 text-white/70">Playbooks and practical lessons from shipping games.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        <a href="/blog" className={`chip ${!activePillar ? "border-brand-teal/40" : ""}`}>All</a>
        {pillars.map((pillar) => (
          <a key={pillar} href={`/blog?pillar=${encodeURIComponent(pillar)}`} className={`chip ${pillar === activePillar ? "border-brand-teal/40" : ""}`}>
            {pillar}
          </a>
        ))}
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {filtered.map((post) => <BlogCard key={post.slug} post={post} />)}
      </div>
    </div>
  );
}
