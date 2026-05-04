import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getCaseStudyBySlug, getPublishedCaseStudies, type CaseStudy } from "@/lib/content";
import {
  createSchemaGraph,
  getBreadcrumbListSchema,
  getWebPageSchema,
  SCHEMA_IDS,
  SITE_URL,
} from "@/lib/schema";

type PageProps = {
  params: { slug: string };
};

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
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-white" {...props} />
  ),
};

function absoluteUrl(url?: string) {
  if (!url) return `${SITE_URL}/images/og-default.jpg`;
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

export function generateStaticParams() {
  return getPublishedCaseStudies().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const study = getCaseStudyBySlug(params.slug);
  if (!study || study.status !== "published") return {};

  const canonicalPath = `/case-studies/${study.slug}`;
  const fullUrl = `${SITE_URL}${canonicalPath}`;
  const imageUrl = absoluteUrl(study.ogImage);
  const title = study.seoTitle ?? study.title;
  const description = study.seoDescription ?? study.excerpt;

  return {
    title,
    description,
    keywords: study.tags,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      url: fullUrl,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: study.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

function CaseStudyStructuredData({ study }: { study: CaseStudy }) {
  const caseStudyUrl = `${SITE_URL}/case-studies/${study.slug}`;
  const caseStudyId = `${caseStudyUrl}#case-study`;
  const description = study.seoDescription ?? study.excerpt;

  const webpage = getWebPageSchema(
    `/case-studies/${study.slug}`,
    `${study.title} | Go7Studio`,
    caseStudyId,
  );
  const breadcrumbs = getBreadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Case Studies", url: "/case-studies" },
    { name: study.title, url: `/case-studies/${study.slug}` },
  ]);
  const caseStudy = {
    "@type": ["Article", "CreativeWork"],
    "@id": caseStudyId,
    headline: study.title,
    name: study.title,
    description,
    url: caseStudyUrl,
    image: absoluteUrl(study.ogImage),
    datePublished: study.date,
    dateModified: study.modified ?? study.date,
    keywords: study.tags.join(", "),
    author: { "@id": SCHEMA_IDS.ORG },
    publisher: { "@id": SCHEMA_IDS.ORG },
    mainEntityOfPage: { "@id": `${caseStudyUrl}#page` },
  };
  const graph = createSchemaGraph(webpage, breadcrumbs, caseStudy);

  return (
    <script
      id={`case-study-structured-data-${study.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export default function CaseStudyDetailPage({ params }: PageProps) {
  const study = getCaseStudyBySlug(params.slug);
  if (!study || study.status !== "published") notFound();

  return (
    <>
      <CaseStudyStructuredData study={study} />
      <div className="container-px py-14 sm:py-20">
        <nav className="mb-6 text-sm text-white/60">
          <Link href="/" className="hover:text-brand-teal">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/case-studies" className="hover:text-brand-teal">Case Studies</Link>
          <span className="mx-2">/</span>
          <span className="text-white/80">{study.title}</span>
        </nav>

        <article className="glass-card overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/55">
              <span className="rounded-full border border-brand-pink/30 bg-brand-pink/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-pink">
                Case study
              </span>
              <span>{study.readingTime}</span>
              <span>Updated {study.modified ?? study.date}</span>
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl">
              {study.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/70">{study.excerpt}</p>
          </div>

          {study.ogImage ? (
            <div className="relative mx-6 mb-8 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] sm:mx-8">
              <Image
                src={study.ogImage}
                alt={`${study.title} visual summary`}
                fill
                sizes="(min-width: 1024px) 960px, calc(100vw - 48px)"
                className="object-cover"
                priority
              />
            </div>
          ) : null}

          <div className="border-t border-white/10 p-6 sm:p-8">
            <MDXRemote source={study.content} components={mdxComponents} />
          </div>
        </article>
      </div>
    </>
  );
}
