import Link from "next/link";

export function BlogBreadcrumbs({ title }: { title?: string }) {
  return (
    <nav className="mb-6 text-sm text-white/60">
      <Link href="/" className="hover:text-brand-teal">Home</Link>
      <span className="mx-2">/</span>
      <Link href="/blog" className="hover:text-brand-teal">Blog</Link>
      {title ? (
        <>
          <span className="mx-2">/</span>
          <span className="text-white/80">{title}</span>
        </>
      ) : null}
    </nav>
  );
}
