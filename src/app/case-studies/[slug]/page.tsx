import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getCaseStudyBySlug, getPublishedCaseStudies } from "@/lib/content";

export function generateStaticParams() {
  return getPublishedCaseStudies().map((post) => ({ slug: post.slug }));
}

export default function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudyBySlug(params.slug);
  if (!study) notFound();

  return (
    <div className="container-px py-16">
      <article className="glass-card p-8">
        <h1 className="text-4xl font-bold">{study.title}</h1>
        <p className="mt-3 text-white/70">{study.excerpt}</p>
        <div className="mt-8">
          <MDXRemote source={study.content} />
        </div>
      </article>
    </div>
  );
}
