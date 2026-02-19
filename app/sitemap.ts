import { MetadataRoute } from "next";
import fs from "fs/promises";
import path from "path";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://howtosolvethis.com";
  const episodesDir = path.join(process.cwd(), "Context", "Episodes");

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  // Dynamically scan for episodes with meta.md.txt files
  const episodePages: MetadataRoute.Sitemap = [];
  
  try {
    const entries = await fs.readdir(episodesDir, { withFileTypes: true });
    const episodeDirs = entries.filter((entry) => entry.isDirectory());

    for (const dir of episodeDirs) {
      const episodePath = path.join(episodesDir, dir.name);
      
      // Check if meta.md.txt exists
      try {
        await fs.access(path.join(episodePath, "meta.md.txt"));
        
        // Extract episode number from directory name (e.g., "ep1-bees" -> 1)
        const episodeNumMatch = dir.name.match(/ep(\d+)/i);
        if (episodeNumMatch) {
          const episodeNumber = parseInt(episodeNumMatch[1], 10);
          
          episodePages.push({
            url: `${baseUrl}/episodes/${episodeNumber}`,
            lastModified: new Date().toISOString(), // Fresh timestamp to force re-crawl
            changeFrequency: "monthly" as const,
            priority: 0.8,
          });
        }
      } catch {
        // Skip directories without meta.md.txt
        continue;
      }
    }

    // Sort by episode number descending
    episodePages.sort((a, b) => {
      const numA = parseInt(a.url.split('/').pop() || '0', 10);
      const numB = parseInt(b.url.split('/').pop() || '0', 10);
      return numB - numA;
    });

  } catch (error) {
    console.error("Error generating sitemap:", error);
  }

  return [...staticPages, ...episodePages];
}
