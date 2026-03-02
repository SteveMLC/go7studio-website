import Link from "next/link";
import { getPublishedCaseStudies } from "@/lib/content";

export default function CaseStudiesPage() {
  const studies = getPublishedCaseStudies();

  return (
    <div className="container-px py-16">
      <h1 className="text-4xl font-bold">Case Studies</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {studies.map((study) => (
          <article key={study.slug} className="glass-card p-6">
            <h2 className="text-2xl font-semibold">
              <Link href={`/case-studies/${study.slug}`} className="hover:text-brand-teal">{study.title}</Link>
            </h2>
            <p className="mt-2 text-white/70">{study.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
