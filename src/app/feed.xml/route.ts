import { getBlogPostHref, getPublishedBlogPosts, getPublishedCaseStudies } from "@/lib/content";

const SITE = "https://go7studio.com";

export async function GET() {
  const posts = getPublishedBlogPosts();
  const studies = getPublishedCaseStudies();
  const items = [
    ...posts.map(
      (post) => `<item><title><![CDATA[${post.title}]]></title><link>${SITE}${getBlogPostHref(post)}</link><guid>${SITE}${getBlogPostHref(post)}</guid><pubDate>${new Date(post.date).toUTCString()}</pubDate><description><![CDATA[${post.excerpt}]]></description></item>`,
    ),
    ...studies.map(
      (study) => `<item><title><![CDATA[${study.title}]]></title><link>${SITE}/case-studies/${study.slug}</link><guid>${SITE}/case-studies/${study.slug}</guid><pubDate>${new Date(study.date).toUTCString()}</pubDate><description><![CDATA[${study.excerpt}]]></description></item>`,
    ),
  ].join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?><rss version="2.0"><channel><title>Go7Studio Blog</title><link>${SITE}</link><description>Go7Studio blog feed</description>${items}</channel></rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
