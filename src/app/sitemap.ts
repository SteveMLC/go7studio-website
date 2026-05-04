import type { MetadataRoute } from "next";
import { GAMES } from "@/lib/games";
import {
  getBlogPostHref,
  getPublishedBlogPosts,
  getPublishedCaseStudies,
  getPublishedProjects,
} from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://go7studio.com";
  const blogPosts = getPublishedBlogPosts();
  const caseStudies = getPublishedCaseStudies();
  const projects = getPublishedProjects();

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/games`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...GAMES.map((g) => ({
      url: `${siteUrl}/games/${g.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: new Date(project.modified ?? project.date),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/ai-lab`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPosts.map((post) => ({
      url: `${siteUrl}${getBlogPostHref(post)}`,
      lastModified: new Date(post.modified ?? post.date),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    {
      url: `${siteUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...caseStudies.map((study) => ({
      url: `${siteUrl}/case-studies/${study.slug}`,
      lastModified: new Date(study.modified ?? study.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return routes;
}
