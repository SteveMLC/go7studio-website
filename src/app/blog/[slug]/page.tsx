import { notFound, redirect } from "next/navigation";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { BlogBreadcrumbs } from "@/components/blog/BlogBreadcrumbs";
import { BlogPost } from "@/components/blog/BlogPost";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { HowToSchema } from "@/components/seo/HowToSchema";
import { getBlogPostBySlug, getBlogPostHref, getPublishedBlogPosts, getRelatedBlogPosts, isAiLabPost } from "@/lib/content";

const SITE = "https://go7studio.com";

export function generateStaticParams() {
  return getPublishedBlogPosts()
    .filter((post) => !isAiLabPost(post))
    .map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};
  if (isAiLabPost(post)) {
    const canonicalPath = getBlogPostHref(post);
    return {
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      alternates: { canonical: canonicalPath },
      openGraph: {
        title: post.seoTitle ?? post.title,
        description: post.seoDescription ?? post.excerpt,
        url: `${SITE}${canonicalPath}`,
        type: "article",
        // images intentionally omitted — opengraph-image.tsx in this folder
        // generates a per-post branded card via next/og.
      },
      twitter: {
        card: "summary_large_image",
        title: post.seoTitle ?? post.title,
        description: post.seoDescription ?? post.excerpt,
        // images intentionally omitted — Next.js auto-applies the
        // opengraph-image.tsx output to twitter.images.
      },
    };
  }
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      url: `${SITE}/blog/${post.slug}`,
      type: "article",
      // images intentionally omitted — opengraph-image.tsx in this folder
      // generates a per-post branded card via next/og.
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      // images intentionally omitted — Next.js auto-applies the
      // opengraph-image.tsx output to twitter.images.
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();
  if (isAiLabPost(post)) redirect(getBlogPostHref(post));

  const related = getRelatedBlogPosts(post, 3);

  return (
    <div className="container-px py-14">
      <ArticleSchema post={post} />
      <BreadcrumbSchema items={[{ name: "Home", url: SITE }, { name: "Blog", url: `${SITE}/blog` }, { name: post.title, url: `${SITE}/blog/${post.slug}` }]} />
      {post.schemaType === "HowTo" ? <HowToSchema title={post.title} steps={post.headings.map((h) => h.text)} /> : null}
      {post.schemaType === "FAQ" ? <FAQSchema items={post.headings.map((h) => ({ question: h.text, answer: post.excerpt }))} /> : null}
      <BlogBreadcrumbs title={post.title} />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <BlogPost post={post} />
          <ShareButtons title={post.title} url={`${SITE}/blog/${post.slug}`} />
          <AuthorCard />
          <RelatedPosts posts={related} />
        </div>
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <TableOfContents items={post.headings} />
        </div>
      </div>
    </div>
  );
}
