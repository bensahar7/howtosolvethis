import { EnrichedEpisode, RSSEpisode, LocalMetadata } from "@/types/episode";
import { unstable_cache } from "next/cache";
import { fetchRSSFeed } from "./rss-parser";
import { getAllLocalMetadata } from "./metadata-reader";
import { EPISODE_MAPPING } from "./episode-mapping";
import { getTranscriptByEpisode } from "./transcript-reader";

function matchEpisodeWithMetadata(rssEpisode: RSSEpisode, allMetadata: LocalMetadata[]): LocalMetadata | null {
  const rssEpisodeNum = rssEpisode.episodeNumber;
  if (!rssEpisodeNum) return null;

  // Prefer matching by episodeNumber parsed from local `meta.md.txt`.
  // This is more robust than relying solely on folder-name mapping.
  const directMatch = allMetadata.find((meta) => meta.episodeNumber === rssEpisodeNum);
  if (directMatch) return directMatch;

  // Fallback to manual mapping between RSS episode numbers and local folder names.
  const targetFolder = EPISODE_MAPPING[rssEpisodeNum];
  if (!targetFolder) return null;
  return allMetadata.find((meta) => meta.folderName === targetFolder) || null;
}

/**
 * Build fallback EnrichedEpisodes from local metadata when RSS feed is unavailable.
 * This prevents episode pages from returning 404 if the external RSS feed is down,
 * which is critical for Google indexing (intermittent 404s cause de-indexing).
 */
function buildFallbackEpisodes(localMetadata: LocalMetadata[]): EnrichedEpisode[] {
  const reverseMapping: Record<string, number> = {};
  for (const [epNum, folder] of Object.entries(EPISODE_MAPPING)) {
    reverseMapping[folder] = parseInt(epNum, 10);
  }

  return localMetadata
    .filter((meta) => meta.folderName && reverseMapping[meta.folderName])
    .map((meta) => {
      const episodeNumber = reverseMapping[meta.folderName!];
      return {
        title: meta.title || `Episode ${episodeNumber}`,
        description: meta.problem || meta.solution || "",
        pubDate: new Date().toISOString(),
        imageUrl: "/images/earth-hero.png",
        audioUrl: "",
        guid: `fallback-episode-${episodeNumber}`,
        episodeNumber,
        metadata: meta,
      } as EnrichedEpisode;
    })
    .sort((a, b) => (b.episodeNumber || 0) - (a.episodeNumber || 0));
}

async function getEnrichedEpisodesUncached(): Promise<EnrichedEpisode[]> {
  try {
    const [rssEpisodes, localMetadata] = await Promise.all([fetchRSSFeed(), getAllLocalMetadata()]);
    
    // If RSS feed failed but we have local metadata, use fallback
    if (rssEpisodes.length === 0 && localMetadata.length > 0) {
      console.warn("[episode-matcher] RSS feed returned 0 episodes, using local metadata fallback");
      return buildFallbackEpisodes(localMetadata);
    }
    
    if (rssEpisodes.length === 0) return [];
    
    return rssEpisodes.map((rssEpisode) => ({
      ...rssEpisode,
      metadata: matchEpisodeWithMetadata(rssEpisode, localMetadata),
    })).sort((a, b) => (b.episodeNumber || 0) - (a.episodeNumber || 0));
  } catch (error) {
    console.error("Error in getEnrichedEpisodes:", error);
    
    // Fallback: try to serve from local metadata even if RSS completely fails
    try {
      const localMetadata = await getAllLocalMetadata();
      if (localMetadata.length > 0) {
        console.warn("[episode-matcher] Using local metadata fallback after RSS error");
        return buildFallbackEpisodes(localMetadata);
      }
    } catch (fallbackError) {
      console.error("Fallback also failed:", fallbackError);
    }
    
    return [];
  }
}

export const getEnrichedEpisodes = unstable_cache(getEnrichedEpisodesUncached, ['enriched-episodes'], { revalidate: 60 });

/**
 * Get a single episode with transcript loaded
 * Used for individual episode pages where transcript is needed
 */
export async function getEpisodeWithTranscript(episodeNumber: number): Promise<EnrichedEpisode | null> {
  try {
    const episodes = await getEnrichedEpisodes();
    const episode = episodes.find((ep) => ep.episodeNumber === episodeNumber);
    
    if (!episode) {
      return null;
    }
    
    // Load transcript if metadata exists
    if (episode.metadata?.folderName) {
      const transcript = await getTranscriptByEpisode(episodeNumber, episode.metadata.folderName);
      if (transcript && episode.metadata) {
        episode.metadata.transcript = transcript;
      }
    }
    
    return episode;
  } catch (error) {
    console.error(`Error loading episode ${episodeNumber} with transcript:`, error);
    return null;
  }
}