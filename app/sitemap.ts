import { MetadataRoute } from "next";
import { getEnrichedEpisodes } from "@/lib/episode-matcher";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://howtosolvethis.com";

  // Derive episode URLs from getEnrichedEpisodes() — the SAME source the episode
  // routes (generateStaticParams) use. This guarantees the sitemap can never list a
  // URL that 404s, nor omit a page that actually exists. Previously the sitemap was
  // built by scanning folder names (e.g. "ep19-…") while the routes were built from
  // RSS episode numbers; the two drifted apart and the sitemap shipped a /episodes/19
  // that 404'd while omitting the real /episodes/16.
  const episodes = await getEnrichedEpisodes();

  const seen = new Set<number>();
  const episodePages: MetadataRoute.Sitemap = [];
  for (const ep of episodes) {
    if (typeof ep.episodeNumber !== "number" || seen.has(ep.episodeNumber)) continue;
    seen.add(ep.episodeNumber);
    episodePages.push({
      url: `${baseUrl}/episodes/${ep.episodeNumber}`,
      // Use the published date so Google sees stable lastmod values and trusts the feed.
      lastModified: ep.pubDate
        ? new Date(ep.pubDate).toISOString()
        : new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    });
  }

  // episodes are sorted newest-first, so the first entry is the most recent date.
  const latest = episodePages[0]?.lastModified ?? new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: latest,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  return [...staticPages, ...episodePages];
}
