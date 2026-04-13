import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { getFeaturedProjects } from "@/lib/content";

export function FeaturedProjects() {
  const projects = getFeaturedProjects().slice(0, 2);

  if (!projects.length) return null;

  return (
    <section className="container-px py-20">
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-white/45">Projects</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Featured Projects</h2>
          <p className="mt-2 max-w-2xl text-base text-white/60">
            Product work that shows how Go7Studio thinks beyond games: structured UX, clear information architecture, and polished delivery for serious digital experiences.
          </p>
        </div>

        <Link
          href="/projects"
          className="hidden items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white sm:inline-flex"
        >
          View all projects
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <Link href="/projects" className="btn-secondary inline-flex w-full items-center justify-center">
          View all projects
        </Link>
      </div>
    </section>
  );
}
