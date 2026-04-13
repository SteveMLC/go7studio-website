import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/content";
import {
  getProjectCategoryLabel,
  getProjectLinkClasses,
  getProjectStatusClasses,
  getProjectStatusLabel,
} from "./projectMeta";

function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}

export function ProjectHero({ project }: { project: Project }) {
  const primaryLinks = project.links?.slice(0, 2) ?? [];
  const heroHeadline = project.heroHeadline ?? project.title;
  const heroSubhead = project.heroSubhead ?? project.excerpt;

  return (
    <>
      <div className="mb-8 flex items-center justify-between gap-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>
        <span className="text-xs uppercase tracking-[0.22em] text-white/45">
          {project.client ? `Client: ${project.client}` : "Go7Studio Project"}
        </span>
      </div>

      <header className="glass-card relative overflow-hidden p-8 sm:p-10 lg:p-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-brand-pink/20 blur-3xl" />
          <div className="absolute right-0 top-10 h-64 w-64 rounded-full bg-brand-blue/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-brand-orange/15 blur-3xl" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.9fr)] lg:items-end">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getProjectStatusClasses(project.projectStatus)}`}>
                {getProjectStatusLabel(project.projectStatus)}
              </span>
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/10">
                {getProjectCategoryLabel(project.category)}
              </span>
              {project.client ? (
                <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/70 ring-1 ring-white/10">
                  {project.client}
                </span>
              ) : null}
            </div>

            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-brand-orange">
              {project.title}
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {heroHeadline}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
              {heroSubhead}
            </p>

            {(project.roles?.length || project.industries?.length) ? (
              <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/65">
                {project.roles?.map((role) => (
                  <span key={role} className="chip">
                    {role}
                  </span>
                ))}
                {project.industries?.slice(0, 2).map((industry) => (
                  <span key={industry} className="chip border-white/5 bg-white/5 text-white/60">
                    {industry}
                  </span>
                ))}
              </div>
            ) : null}

            {primaryLinks.length > 0 ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {primaryLinks.map((link) => {
                  const external = isExternal(link.href);
                  const icon = external ? <ExternalLink className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />;

                  return external ? (
                    <a
                      key={`${link.kind}:${link.href}`}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={getProjectLinkClasses(link.kind)}
                    >
                      {link.label}
                      {icon}
                    </a>
                  ) : (
                    <Link key={`${link.kind}:${link.href}`} href={link.href} className={getProjectLinkClasses(link.kind)}>
                      {link.label}
                      {icon}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">At a glance</p>
            <div className="mt-4 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">Primary surface</p>
                <p className="mt-2 text-lg font-semibold text-white">{project.platforms?.join(", ") || "Web"}</p>
                <p className="mt-2 text-sm leading-6 text-white/60">Designed to feel polished on the public-facing product layer, not just in the underlying system.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">Focus areas</p>
                <p className="mt-2 text-lg font-semibold text-white">{project.roles?.slice(0, 2).join(" + ") || "Product UX"}</p>
                <p className="mt-2 text-sm leading-6 text-white/60">The work combines product design, interface structure, and implementation detail.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">Reading time</p>
                <p className="mt-2 text-lg font-semibold text-white">{project.readingTime}</p>
                <p className="mt-2 text-sm leading-6 text-white/60">A quick showcase page with enough depth to explain the product decisions behind the surface.</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
