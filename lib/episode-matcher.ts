import { EnrichedEpisode, RSSEpisode, LocalMetadata } from "@/types/episode";
import { fetchRSSFeed } from "./rss-parser";
import { getAllLocalMetadata } from "./metadata-reader";
import { EPISODE_MAPPING } from "./episode-mapping";
import { getTranscriptByEpisode } from "./transcript-reader";

/**
 * Match an RSS episode with local metadata using manual mapping
 */
function matchEpisodeWithMetadata(
  rssEpisode: RSSEpisode,
  allMetadata: LocalMetadata[]
): LocalMetadata | null {
  const rssEpisodeNum = rssEpisode.episodeNumber;

  if (!rssEpisodeNum) {
    console.warn(`[MATCHER] No episode number for RSS episode: "${rssEpisode.title}"`);
    return null;
  }

  // Use manual mapping to find the correct folder
  const targetFolder = EPISODE_MAPPING[rssEpisodeNum];
  
  if (!targetFolder) {
    console.warn(`[MATCHER] No mapping found for RSS episode #${rssEpisodeNum}: "${rssEpisode.title}"`);
    return null;
  }

  // Find metadata by folder name
  const match = allMetadata.find((meta) => meta.folderName === targetFolder);

  if (match) {
    console.log(`[MATCHER] ✓ Matched RSS #${rssEpisodeNum} "${rssEpisode.title}" → "${match.title}"`);
    return match;
  } else {
    console.warn(`[MATCHER] ✗ Target folder "${targetFolder}" not found for RSS episode #${rssEpisodeNum}`);
    return null;
  }
}

/**
 * Fetch all episodes with enriched metadata
 * Combines RSS feed data with local metadata files
 */
export async function getEnrichedEpisodes(): Promise<EnrichedEpisode[]> {
  try {
    // Fetch both RSS and local metadata in parallel
    const [rssEpisodes, localMetadata] = await Promise.all([
      fetchRSSFeed(),
      getAllLocalMetadata(),
    ]);

    // If RSS failed, create episodes from local metadata only
    if (rssEpisodes.length === 0 && localMetadata.length > 0) {
      console.log("RSS feed unavailable, using local metadata as fallback");
      return localMetadata.map((metadata) => {
        // Use deterministic timestamp based on episode number
        // Base date: 2024-01-01, add episode number as days offset
        const baseDate = new Date("2024-01-01T00:00:00.000Z");
        const episodeDate = new Date(baseDate);
        episodeDate.setDate(baseDate.getDate() + metadata.episodeNumber);
        
        return {
          title: metadata.title,
          description: metadata.problem || metadata.solution || "",
          pubDate: episodeDate.toISOString(),
          imageUrl: "/images/earth-hero.png",
          audioUrl: "",
          guid: `local-${metadata.episodeNumber}`,
          episodeNumber: metadata.episodeNumber,
          metadata,
        };
      });
    }

    // Match RSS episodes with local metadata
    console.log(`\n[EPISODE MATCHER] Starting to match ${rssEpisodes.length} RSS episodes with ${localMetadata.length} local metadata files\n`);
    
    const enrichedEpisodes: EnrichedEpisode[] = await Promise.all(
      rssEpisodes.map(async (rssEpisode) => {
        const metadata = matchEpisodeWithMetadata(rssEpisode, localMetadata);
        
        // Fetch transcript if metadata exists
        if (metadata) {
          console.log(`[MATCH SUCCESS] Episode ${rssEpisode.episodeNumber}: "${rssEpisode.title}"`);
          console.log(`  → Guests: ${metadata.guests.join(", ")}`);
          console.log(`  → Sector: ${metadata.sector}`);
          
          // Fetch transcript
          const transcript = await getTranscriptByEpisode(
            metadata.episodeNumber,
            metadata.folderName
          );
          metadata.transcript = transcript || undefined;
        }
        
        return {
          ...rssEpisode,
          metadata,
        };
      })
    );

    // Sort by episode number (newest first)
    enrichedEpisodes.sort((a, b) => {
      const numA = a.episodeNumber || 0;
      const numB = b.episodeNumber || 0;
      return numB - numA;
    });

    return enrichedEpisodes;
  } catch (error) {
    console.error("Error enriching episodes:", error);
    return [];
  }
}

/**
 * Get a single enriched episode by episode number
 */
export async function getEnrichedEpisodeByNumber(
  episodeNumber: number
): Promise<EnrichedEpisode | null> {
  const episodes = await getEnrichedEpisodes();
  return episodes.find((e) => e.episodeNumber === episodeNumber) || null;
}
