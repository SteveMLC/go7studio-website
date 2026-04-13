import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { getPublishedProjects } from "@/lib/content";
import {
  SCHEMA_IDS,
  SITE_URL,
  createSchemaGraph,
  getWebPageSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Go7Studio projects beyond games, including learning platforms, client systems, and polished digital product work.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getPublishedProjects();

  const itemListSchema = {
    "@type": "ItemList",
    "@id": SCHEMA_IDS.PROJECTS_LIST,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@id": `${SITE_URL}/projects/${project.slug}/#project`,
      },
    })),
  };

  const projectsWebPageSchema = getWebPageSchema("/projects", "Projects | Go7Studio", SCHEMA_IDS.PROJECTS_LIST);
  const projectsSchemaGraph = createSchemaGraph(projectsWebPageSchema, itemListSchema);

  return (
    <div className="container-px py-14 sm:py-20">
      <script
        id="projects-page-schema-graph-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsSchemaGraph),
        }}
      />

      <header className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.22em] text-white/45">Go7Studio Portfolio</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Projects
        </h1>
        <p className="mt-4 text-sm leading-7 text-white/75 sm:text-base">
          This is where Go7Studio’s non-game work lives. Education platforms, learning hubs, and product systems with strong UX, clear structure, and careful claims.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
