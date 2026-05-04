import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { remarkAlert } from "remark-github-blockquote-alert";
import type { BlogPost as BlogPostType } from "@/lib/content";
import { aiLabMdxComponents } from "@/components/blog/AiLabMdxComponents";
import "remark-github-blockquote-alert/alert.css";

export function BlogPost({ post }: { post: BlogPostType }) {
  return (
    <article className="glass-card min-w-0 max-w-full overflow-hidden p-6 sm:p-10">
      <h1 className="break-words text-3xl font-bold sm:text-4xl">{post.title}</h1>
      <p className="mt-3 break-words text-white/70">{post.excerpt}</p>
      <div className="ai-lab-mdx mt-8 max-w-full min-w-0 overflow-hidden">
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
