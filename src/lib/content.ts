import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const CASE_STUDIES_DIR = path.join(process.cwd(), "src/content/case-studies");
const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");

export type PublishStatus = "published" | "draft";

export type BlogFrontmatter = {
  title: string;
  slug: string;
  date: string;
  modified?: string;
  excerpt: string;
  pillar: string;
  tags: string[];
  ogImage?: string;
  status?: PublishStatus;
  schemaType?: "Article" | "HowTo" | "FAQ";
  targetKeywords?: string[];
  relatedGames?: string[];
  relatedServices?: string[];
  seoTitle?: string;
  seoDescription?: string;
  readingTime?: string;
  featured?: boolean;
};

export type BlogPost = BlogFrontmatter & {
  content: string;
  headings: { id: string; text: string; level: number }[];
};

export type CaseStudyFrontmatter = {
  title: string;
  slug: string;
  date: string;
  modified?: string;
  excerpt: string;
  tags: string[];
  status?: PublishStatus;
  ogImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  featured?: boolean;
};

export type CaseStudy = CaseStudyFrontmatter & {
  content: string;
  readingTime: string;
};

export type ProjectStatus =
  | "live"
  | "beta"
  | "in-development"
  | "client-work"
  | "internal";

export type ProjectCategory =
  | "education-platform"
  | "learning-hub"
  | "client-platform"
  | "internal-product"
  | "creative-tool"
  | "saas";

export type ProjectMediaType = "image" | "video" | "embed";

export type ProjectMetric = {
  label: string;
  value: string;
  note?: string;
};

export type ProjectHighlight = {
  title: string;
  description: string;
  icon?: string;
};

export type ProjectMedia = {
  type: ProjectMediaType;
  src: string;
  alt: string;
  caption?: string;
  poster?: string;
  aspectRatio?: "16:9" | "4:3" | "3:2" | "1:1" | "phone";
  featured?: boolean;
};

export type ProjectLink = {
  label: string;
  href: string;
  kind: "primary" | "secondary" | "case-study" | "live" | "contact";
};

export type ProjectFrontmatter = {
  title: string;
  slug: string;
  date: string;
  modified?: string;
  excerpt: string;
  status?: PublishStatus;
  projectStatus: ProjectStatus;
  category: ProjectCategory;
  client?: string;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  tags: string[];
  roles?: string[];
  platforms?: string[];
  industries?: string[];
  featuredVideo?: string;
  links?: ProjectLink[];
  metrics?: ProjectMetric[];
  highlights?: ProjectHighlight[];
  media?: ProjectMedia[];
  stack?: string[];
  relatedCaseStudySlug?: string;
  relatedPostSlugs?: string[];
};

export type Project = ProjectFrontmatter & {
  content: string;
  readingTime: string;
};

function getFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function extractHeadings(content: string) {
  const lines = content.split("\n");
  return lines
    .map((line) => {
      const match = line.match(/^(#{2,3})\s+(.+)/);
      if (!match) return null;
      const level = match[1].length;
      const text = match[2].replace(/[#*_`]/g, "").trim();
      return { id: slugify(text), text, level };
    })
    .filter((h): h is { id: string; text: string; level: number } => Boolean(h));
}

function parseBlogFile(filePath: string): BlogPost {
  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  const reading = readingTime(content);
  const frontmatter = data as BlogFrontmatter;

  return {
    ...frontmatter,
    status: frontmatter.status ?? "draft",
    readingTime: frontmatter.readingTime ?? reading.text,
    content,
    headings: extractHeadings(content),
  };
}

function parseCaseStudyFile(filePath: string): CaseStudy {
  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  const frontmatter = data as CaseStudyFrontmatter;

  return {
    ...frontmatter,
    status: frontmatter.status ?? "draft",
    content,
    readingTime: readingTime(content).text,
  };
}

function parseProjectFile(filePath: string): Project {
  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  const frontmatter = data as ProjectFrontmatter;

  return {
    ...frontmatter,
    status: frontmatter.status ?? "draft",
    links: frontmatter.links ?? [],
    metrics: frontmatter.metrics ?? [],
    highlights: frontmatter.highlights ?? [],
    media: frontmatter.media ?? [],
    stack: frontmatter.stack ?? [],
    roles: frontmatter.roles ?? [],
    platforms: frontmatter.platforms ?? [],
    industries: frontmatter.industries ?? [],
    relatedPostSlugs: frontmatter.relatedPostSlugs ?? [],
    content,
    readingTime: readingTime(content).text,
  };
}

function byDateDesc<T extends { date: string }>(a: T, b: T) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export function getAllBlogPosts(): BlogPost[] {
  return getFiles(BLOG_DIR)
    .map((f) => parseBlogFile(path.join(BLOG_DIR, f)))
    .sort(byDateDesc);
}

export function getPublishedBlogPosts(): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.status === "published");
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((post) => post.slug === slug);
}

export function getRelatedBlogPosts(post: BlogPost, max = 3): BlogPost[] {
  const tags = new Set(post.tags);
  return getPublishedBlogPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      post: candidate,
      score: candidate.tags.reduce((acc, tag) => (tags.has(tag) ? acc + 1 : acc), 0),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map((entry) => entry.post);
}

export function getRelatedBlogPostsBySlugs(slugs: string[], max = 3): BlogPost[] {
  if (!slugs.length) return [];
  const wanted = new Set(slugs);
  return getPublishedBlogPosts()
    .filter((post) => wanted.has(post.slug))
    .sort((a, b) => slugs.indexOf(a.slug) - slugs.indexOf(b.slug))
    .slice(0, max);
}

export function getAllCaseStudies(): CaseStudy[] {
  return getFiles(CASE_STUDIES_DIR)
    .map((f) => parseCaseStudyFile(path.join(CASE_STUDIES_DIR, f)))
    .sort(byDateDesc);
}

export function getPublishedCaseStudies(): CaseStudy[] {
  return getAllCaseStudies().filter((post) => post.status === "published");
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return getAllCaseStudies().find((post) => post.slug === slug);
}

export function getAllProjects(): Project[] {
  return getFiles(PROJECTS_DIR)
    .map((f) => parseProjectFile(path.join(PROJECTS_DIR, f)))
    .sort(byDateDesc);
}

export function getPublishedProjects(): Project[] {
  return getAllProjects().filter((project) => project.status === "published");
}

export function getFeaturedProjects(): Project[] {
  return getPublishedProjects().filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.slug === slug);
}
