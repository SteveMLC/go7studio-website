import type { MetadataRoute } from "next";
import { GAMES } from "@/lib/games";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://go7studio.com";

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
    ...GAMES.map((g) => ({
      url: `${siteUrl}/games/${g.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  return routes;
}
