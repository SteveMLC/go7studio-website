import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers3, Sparkles } from "lucide-react";
import type { Project } from "@/lib/content";
import {
  getProjectCategoryLabel,
  getProjectStatusClasses,
  getProjectStatusLabel,
} from "./projectMeta";

export function ProjectCard({ project }: { project: Project }) {
  const keyHighlights = project.highlights?.slice(0, 2) ?? [];

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-brand-blue/10">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-brand-pink/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-40 w-40 rounded-full bg-brand-blue/20 blur-3xl" />
      </div>

      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
        {project.ogImage ? (
          <Image
            src={project.ogImage}
            alt={`${project.title} preview`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(232,121,249,0.28),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.22),_transparent_45%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${getProjectStatusClasses(project.projectStatus)}`}>
            {getProjectStatusLabel(project.projectStatus)}
          </span>
          <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/10">
            {getProjectCategoryLabel(project.category)}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs uppercase tracking-[0.24em] text-white/55">
            {project.industries?.[0] ?? "Digital Product"}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{project.title}</h3>
        </div>
      </div>

      <div className="relative p-5">
        <p className="text-sm leading-7 text-white/70">{project.excerpt}</p>

        {keyHighlights.length > 0 ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {keyHighlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-3"
              >
                <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-brand-orange">
                  <Sparkles className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium text-white">{highlight.title}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-brand-blue">
              <Layers3 className="h-4 w-4" />
            </div>
            <p className="text-sm text-white/70">
              Structured showcase page with highlights, build notes, and proof-safe product framing.
            </p>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="text-xs uppercase tracking-[0.18em] text-white/45">
            {project.platforms?.join(" • ") || "Web"}
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/75 transition-colors hover:text-white"
          >
            View project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
