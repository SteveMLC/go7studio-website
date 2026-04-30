import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { remarkAlert } from "remark-github-blockquote-alert";
import type { BlogPost as BlogPostType } from "@/lib/content";
import { aiLabMdxComponents } from "@/components/blog/AiLabMdxComponents";
import "remark-github-blockquote-alert/alert.css";

export function BlogPost({ post }: { post: BlogPostType }) {
  return (
    <article className="glass-card overflow-hidden p-8 sm:p-10">
      <h1 className="text-3xl font-bold sm:text-4xl">{post.title}</h1>
      <p className="mt-3 text-white/70">{post.excerpt}</p>
      <div className="mt-8 max-w-none ai-lab-mdx">
        <MDXRemote
          source={post.content}
          components={aiLabMdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm, remarkAlert],
            },
          }}
        />
      </div>
    </article>
  );
}
