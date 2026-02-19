import { EnrichedEpisode, RSSEpisode, LocalMetadata } from "@/types/episode";
import { unstable_cache } from "next/cache";
import { fetchRSSFeed } from "./rss-parser";
import { getAllLocalMetadata } from "./metadata-reader";
import { EPISODE_MAPPING } from "./episode-mapping";
import { getTranscriptByEpisode } from "./transcript-reader";

function matchEpisodeWithMetadata(rssEpisode: RSSEpisode, allMetadata: LocalMetadata[]): LocalMetadata | null {
  const rssEpisodeNum = rssEpisode.episodeNumber;
  if (!rssEpisodeNum) return null;
  const targetFolder = EPISODE_MAPPING[rssEpisodeNum];
  if (!targetFolder) return null;
  return allMetadata.find((meta) => meta.folderName === targetFolder) || null;
}

async function getEnrichedEpisodesUncached(): Promise<EnrichedEpisode[]> {
  try {
    const [rssEpisodes, localMetadata] = await Promise.all([fetchRSSFeed(), getAllLocalMetadata()]);
    if (rssEpisodes.length === 0) return [];
    return rssEpisodes.map((rssEpisode) => ({
      ...rssEpisode,
      metadata: matchEpisodeWithMetadata(rssEpisode, localMetadata),
    })).sort((a, b) => (b.episodeNumber || 0) - (a.episodeNumber || 0));
  } catch (error) {
    console.error("Error in getEnrichedEpisodes:", error);
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