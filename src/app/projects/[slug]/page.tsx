import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ProjectCtaBand } from "@/components/projects/ProjectCtaBand";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { ProjectHighlights } from "@/components/projects/ProjectHighlights";
import { ProjectProofPoints } from "@/components/projects/ProjectProofPoints";
import { ProjectMediaGallery } from "@/components/projects/ProjectMediaGallery";
import { ProjectMetrics } from "@/components/projects/ProjectMetrics";
import { ProjectStructuredData } from "@/components/projects/ProjectStructuredData";
import { ProjectTechStack } from "@/components/projects/ProjectTechStack";
import {
  getCaseStudyBySlug,
  getProjectBySlug,
  getPublishedProjects,
  getRelatedBlogPostsBySlugs,
} from "@/lib/content";

const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="mt-10 text-2xl font-semibold text-white sm:text-3xl" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="mt-8 text-xl font-semibold text-white" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mt-4 text-base leading-8 text-white/72" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-8 text-white/72" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-base leading-8 text-white/72" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => <li className="pl-1" {...props} />,
  a: (props: React.ComponentProps<"a">) => (
    <a className="font-medium text-sky-300 hover:text-white" {...props} />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote className="mt-6 rounded-2xl border-l-2 border-brand-orange/50 bg-white/5 px-5 py-4 text-white/75" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-white" {...props} />
  ),
};

type PageProps = {
  params: { slug: string };
};

function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}

export function generateStaticParams() {
  return getPublishedProjects().map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project || project.status !== "published") return {};

  const baseUrl = "https://go7studio.com";
  const fullUrl = `${baseUrl}/projects/${project.slug}`;
  const ogImageUrl = project.ogImage ? `${baseUrl}${project.ogImage}` : `${baseUrl}/images/og-default.jpg`;
  const description = project.seoDescription ?? project.excerpt;

  return {
    title: project.seoTitle ?? project.title,
    description,
    keywords: project.tags,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.seoTitle ?? project.title,
      description,
      url: fullUrl,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.seoTitle ?? project.title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project || project.status !== "published") notFound();

  const candidateCaseStudy = project.relatedCaseStudySlug
    ? getCaseStudyBySlug(project.relatedCaseStudySlug)
    : undefined;
  const relatedCaseStudy = candidateCaseStudy?.status === "published" ? candidateCaseStudy : undefined;
  const relatedPosts = getRelatedBlogPostsBySlugs(project.relatedPostSlugs ?? []);
  const ctaPrimary = project.links?.find((link) => link.kind === "primary" || link.kind === "live") ?? project.links?.[0];
  const ctaSecondary = project.links?.find((link) => link.kind === "secondary" || link.kind === "case-study")
    ?? (relatedCaseStudy
      ? { label: "Read case study", href: `/case-studies/${relatedCaseStudy.slug}`, kind: "case-study" as const }
      : project.links?.find((link) => link.kind === "contact"));

  return (
    <>
      <ProjectStructuredData project={project} />
      <div className="container-px py-14 sm:py-20">
        <ProjectHero project={project} />
        <ProjectHighlights highlights={project.highlights} />

        <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
          <article className="glass-card p-6 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-white/55">
              <span>{project.readingTime}</span>
              <span>•</span>
              <span>Updated {project.modified ?? project.date}</span>
            </div>
            <MDXRemote source={project.content} components={mdxComponents} />
          </article>

          <aside className="space-y-6">
            <ProjectMetrics metrics={project.metrics} className="mt-0" />
            <ProjectProofPoints proofPoints={project.proofPoints} className="mt-0" />
            <ProjectTechStack stack={project.stack} className="mt-0" />
          </aside>
        </div>

        <ProjectMediaGallery media={project.media} title={`${project.title} media`} />

        {(relatedCaseStudy || relatedPosts.length || (project.links?.length ?? 0) > 2) ? (
          <section className="mt-10">
            <div className="glass-card p-6 sm:p-8">
              <div className="mb-6 max-w-2xl">
                <p className="text-sm uppercase tracking-[0.22em] text-white/45">Related links</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Keep exploring</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {relatedCaseStudy ? (
                  <Link
                    href={`/case-studies/${relatedCaseStudy.slug}`}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-white/20"
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-white/45">Case study</p>
                    <h3 className="mt-3 text-lg font-semibold text-white">{relatedCaseStudy.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/65">{relatedCaseStudy.excerpt}</p>
                  </Link>
                ) : null}

                {relatedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-white/20"
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-white/45">Insight</p>
                    <h3 className="mt-3 text-lg font-semibold text-white">{post.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/65">{post.excerpt}</p>
                  </Link>
                ))}

                {(project.links?.slice(2) ?? []).map((link) => {
                  const icon = isExternal(link.href) ? <ExternalLink className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />;
                  const content = (
                    <>
                      <p className="text-xs uppercase tracking-[0.22em] text-white/45">{link.kind.replace(/-/g, " ")}</p>
                      <h3 className="mt-3 text-lg font-semibold text-white">{link.label}</h3>
                      <div className="mt-4 inline-flex items-center gap-2 text-sm text-white/70">
                        Open link
                        {icon}
                      </div>
                    </>
                  );

                  return isExternal(link.href) ? (
                    <a
                      key={`${link.kind}:${link.href}`}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-white/20"
                    >
                      {content}
                    </a>
                  ) : (
                    <Link
                      key={`${link.kind}:${link.href}`}
                      href={link.href}
                      className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-white/20"
                    >
                      {content}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        <ProjectCtaBand
          heading="Want something like this for your product?"
          description="Go7Studio can help shape the UX, structure the content system, and ship a polished product story that feels clear from the first screen."
          primaryLink={ctaPrimary}
          secondaryLink={ctaSecondary ?? { label: "Contact Go7Studio", href: "/contact", kind: "contact" }}
        />
      </div>
    </>
  );
}
