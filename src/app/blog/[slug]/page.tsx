import { notFound } from "next/navigation";
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
import { getBlogPostBySlug, getPublishedBlogPosts, getRelatedBlogPosts } from "@/lib/content";

const SITE = "https://go7studio.com";

export function generateStaticParams() {
  return getPublishedBlogPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      url: `${SITE}/blog/${post.slug}`,
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

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

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
