import { MDXRemote } from "next-mdx-remote/rsc";
import type { BlogPost as BlogPostType } from "@/lib/content";

const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="mt-8 text-2xl font-semibold" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="mt-6 text-xl font-semibold" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="mt-4 leading-8 text-white/80" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="mt-4 list-disc space-y-2 pl-6 text-white/80" {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="text-brand-teal underline" {...props} />,
};

export function BlogPost({ post }: { post: BlogPostType }) {
  return (
    <article className="glass-card p-8">
      <h1 className="text-3xl font-bold sm:text-4xl">{post.title}</h1>
      <p className="mt-3 text-white/70">{post.excerpt}</p>
      <div className="prose prose-invert mt-8 max-w-none">
        <MDXRemote source={post.content} components={components} />
      </div>
    </article>
  );
}
