const SITE = "https://go7studio.com";

export function ArticleSchema({ post, url: providedUrl }: { post: { title: string; slug: string; excerpt: string; date: string; modified?: string; ogImage?: string }, url?: string }) {
  const url = providedUrl ?? `${SITE}/blog/${post.slug}`;
  const imageUrl = `${url}/opengraph-image`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.modified ?? post.date,
    image: imageUrl,
    author: { "@type": "Organization", name: "Go7Studio" },
    publisher: { "@id": "https://go7studio.com/#org" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
