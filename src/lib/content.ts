import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const CASE_STUDIES_DIR = path.join(process.cwd(), "src/content/case-studies");

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
