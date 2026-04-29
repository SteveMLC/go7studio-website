import { MDXRemote } from "next-mdx-remote/rsc";
import type { BlogPost as BlogPostType } from "@/lib/content";
import { aiLabMdxComponents } from "@/components/blog/AiLabMdxComponents";

export function BlogPost({ post }: { post: BlogPostType }) {
  return (
    <article className="glass-card overflow-hidden p-8 sm:p-10">
      <h1 className="text-3xl font-bold sm:text-4xl">{post.title}</h1>
      <p className="mt-3 text-white/70">{post.excerpt}</p>
      <div className="mt-8 max-w-none">
        <MDXRemote source={post.content} components={aiLabMdxComponents} />
      </div>
    </article>
  );
}
