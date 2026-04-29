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
import { getBlogPostBySlug, getPublishedBlogPosts } from "@/lib/content";

const SITE = "https://go7studio.com";

export function generateStaticParams() {
  return getPublishedBlogPosts()
    .filter((post) => post.pillar.toLowerCase() === "ai lab")
    .map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post || post.pillar.toLowerCase() !== "ai lab" || post.status !== "published") return {};
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    alternates: { canonical: `/ai-lab/${post.slug}` },
    openGraph: {
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      url: `${SITE}/ai-lab/${post.slug}`,
      type: "article",
      ...(post.ogImage ? { images: [{ url: `${SITE}${post.ogImage}`, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      ...(post.ogImage ? { images: [`${SITE}${post.ogImage}`] } : {}),
    },
  };
}

export default function AiLabPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post || post.pillar.toLowerCase() !== "ai lab" || post.status !== "published") notFound();
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
