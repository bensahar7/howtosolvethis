import { MetadataRoute } from "next";
import { getEnrichedEpisodes } from "@/lib/episode-matcher";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.howtosolvethis.com";

  // Get all episodes for dynamic sitemap entries
  const episodes = await getEnrichedEpisodes();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  // Dynamic episode pages (if you add individual episode pages in the future)
  const episodePages: MetadataRoute.Sitemap = episodes.map((episode) => ({
    url: `${baseUrl}/episodes/${episode.episodeNumber}`,
    lastModified: new Date(episode.pubDate),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...episodePages];
}
