import { EnrichedEpisode, RSSEpisode, LocalMetadata } from "@/types/episode";
import { unstable_cache } from "next/cache";
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
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[MATCHER] No episode number for RSS episode: "${rssEpisode.title}"`);
    }
    return null;
  }

  // Use manual mapping to find the correct folder
  const targetFolder = EPISODE_MAPPING[rssEpisodeNum];
  
  if (!targetFolder) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[MATCHER] No mapping found for RSS episode #${rssEpisodeNum}: "${rssEpisode.title}"`);
    }
    return null;
  }

  // Find metadata by folder name
  const match = allMetadata.find((meta) => meta.folderName === targetFolder);

  if (match) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[MATCHER] ✓ Matched RSS #${rssEpisodeNum} "${rssEpisode.title}" → "${match.title}"`);
    }
    return match;
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[MATCHER] ✗ Target folder "${targetFolder}" not found for RSS episode #${rssEpisodeNum}`);
    }
    return null;
  }
}

/**
 * Fetch all episodes with enriched metadata (WITHOUT transcripts for performance)
 * Combines RSS feed data with local metadata files
 * Transcripts are loaded separately only when needed
 */
async function getEnrichedEpisodesUncached(): Promise<EnrichedEpisode[]> {
  try {
    // Fetch both RSS and local metadata in parallel
    const [rssEpisodes, localMetadata] = await Promise.all([
      fetchRSSFeed(),
      getAllLocalMetadata(),
    ]);

    // If RSS failed, create episodes from local metadata only
    if (rssEpisodes.length === 0 && localMetadata.length > 0) {
      if (process.env.NODE_ENV === 'development') {
        console.log("RSS feed unavailable, using local metadata as fallback");
      }
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

    // Match RSS episodes with local metadata (NO transcript loading for performance)
    if (process.env.NODE_ENV === 'development') {
      console.log(`\n[EPISODE MATCHER] Starting to match ${rssEpisodes.length} RSS episodes with ${localMetadata.length} local metadata files\n`);
    }
    
    const enrichedEpisodes: EnrichedEpisode[] = rssEpisodes.map((rssEpisode) => {
      const metadata = matchEpisodeWithMetadata(rssEpisode, localMetadata);
      
      if (metadata && process.env.NODE_ENV === 'development') {
        console.log(`[MATCH SUCCESS] Episode ${rssEpisode.episodeNumber}: "${rssEpisode.title}"`);
        console.log(`  → Guests: ${metadata.guests.join(", ")}`);
        console.log(`  → Sector: ${metadata.sector}`);
      }
      
      return {
        ...rssEpisode,
        metadata,
      };
    });

    // Sort by episode number (newest first)
    enrichedEpisodes.sort((a, b) => {
      const numA = a.episodeNumber || 0;
      const numB = b.episodeNumber || 0;
      return numB - numA;
    });

    return enrichedEpisodes;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("Error enriching episodes:", error);
    }
    return [];
  }
}

export const getEnrichedEpisodes = unstable_cache(
  getEnrichedEpisodesUncached,
  ['enriched-episodes'],
  { revalidate: 3600, tags: ['episodes'] }
);

/**
 * Get a single enriched episode by episode number
 */
export async function getEnrichedEpisodeByNumber(
  episodeNumber: number
): Promise<EnrichedEpisode | null> {
  const episodes = await getEnrichedEpisodes();
  return episodes.find((e) => e.episodeNumber === episodeNumber) || null;
}

/**
 * Get a single episode WITH transcript (for individual episode pages)
 * Cached separately to avoid loading transcripts for all episodes
 */
async function getEpisodeWithTranscriptUncached(
  episodeNumber: number
): Promise<EnrichedEpisode | null> {
  const episodes = await getEnrichedEpisodes();
  const episode = episodes.find((ep) => ep.episodeNumber === episodeNumber);
  
  if (!episode) {
    return null;
  }
  
  // Fetch transcript only for this specific episode
  if (episode.metadata?.folderName) {
    const transcript = await getTranscriptByEpisode(
      episodeNumber,
      episode.metadata.folderName
    );
    if (transcript && episode.metadata) {
      episode.metadata.transcript = transcript;
    }
  }
  
  return episode;
}

export const getEpisodeWithTranscript = unstable_cache(
  getEpisodeWithTranscriptUncached,
  ['episode-with-transcript'],
  { revalidate: 3600, tags: ['episodes', 'transcripts'] }
);
