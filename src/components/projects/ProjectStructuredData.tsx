import type { Project } from "@/lib/content";
import {
  SITE_URL,
  SCHEMA_IDS,
  createSchemaGraph,
  getBreadcrumbListSchema,
  getWebPageSchema,
} from "@/lib/schema";

function absoluteUrl(url?: string) {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

export function ProjectStructuredData({ project }: { project: Project }) {
  const projectUrl = `${SITE_URL}/projects/${project.slug}`;
  const projectId = `${projectUrl}/#project`;

  const webpage = getWebPageSchema(`/projects/${project.slug}`, `${project.title} | Go7Studio`, projectId);
  const breadcrumbs = getBreadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
    { name: project.title, url: `/projects/${project.slug}` },
  ]);

  const softwareProject = {
    "@type": "SoftwareApplication",
    "@id": projectId,
    name: project.title,
    description: project.seoDescription ?? project.excerpt,
    applicationCategory: project.category,
    operatingSystem: project.platforms?.join(", ") || "Web",
    url: projectUrl,
    keywords: project.tags.join(", "),
    image: absoluteUrl(project.ogImage),
    creator: { "@id": SCHEMA_IDS.ORG },
    publisher: { "@id": SCHEMA_IDS.ORG },
    client: project.client,
  };

  const graph = createSchemaGraph(webpage, breadcrumbs, softwareProject);

  return (
    <script
      id={`project-structured-data-${project.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph),
      }}
    />
  );
}
