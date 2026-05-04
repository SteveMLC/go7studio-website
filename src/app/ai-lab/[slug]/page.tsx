import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { BlogPost } from "@/components/blog/BlogPost";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { HowToSchema } from "@/components/seo/HowToSchema";
import { getBlogPostBySlug, getPublishedBlogPosts, isAiLabPost } from "@/lib/content";

const SITE = "https://go7studio.com";

export function generateStaticParams() {
  return getPublishedBlogPosts()
    .filter(isAiLabPost)
    .map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post || post.status !== "published" || !isAiLabPost(post)) return {};
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    alternates: { canonical: `/ai-lab/${post.slug}` },
    openGraph: {
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      url: `${SITE}/ai-lab/${post.slug}`,
      type: "article",
      // images intentionally omitted — opengraph-image.tsx in this folder
      // generates a per-post branded card via next/og and Next.js auto-wires it
      // into the openGraph.images metadata for the route.
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      // images intentionally omitted — Next.js auto-applies the
      // opengraph-image.tsx output to twitter.images for summary_large_image.
    },
  };
}

export default function AiLabPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post || post.status !== "published" || !isAiLabPost(post)) notFound();
  const url = `${SITE}/ai-lab/${post.slug}`;

  return (
    <div className="container-px py-14">
      <ArticleSchema post={post} url={url} />
      <BreadcrumbSchema items={[{ name: "Home", url: SITE }, { name: "AI Lab", url: `${SITE}/ai-lab` }, { name: post.title, url }]} />
      {post.schemaType === "HowTo" ? <HowToSchema title={post.title} steps={post.headings.map((h) => h.text)} /> : null}
      {post.schemaType === "FAQ" ? <FAQSchema items={post.headings.map((h) => ({ question: h.text, answer: post.excerpt }))} /> : null}
      <nav className="mb-6 text-sm text-white/60">
        <Link href="/" className="hover:text-brand-teal">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/ai-lab" className="hover:text-brand-teal">AI Lab</Link>
        <span className="mx-2">/</span>
        <span className="text-white/80">{post.title}</span>
      </nav>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <BlogPost post={post} />
          <ShareButtons title={post.title} url={url} />
          <AuthorCard />
        </div>
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <TableOfContents items={post.headings} />
        </div>
      </div>
    </div>
  );
}
