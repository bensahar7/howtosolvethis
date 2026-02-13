/**
 * Episode type definitions for RSS feed and local metadata
 */

export interface RSSEpisode {
  title: string;
  description: string;
  pubDate: string;
  imageUrl: string;
  audioUrl: string;
  guid: string;
  duration?: string;
  episodeNumber?: number;
  spotifyEpisodeId?: string;
}

export interface LocalMetadata {
  episodeNumber: number;
  title: string;
  guests: string[];
  sector: string;
  keywords: string[];
  problem: string;
  solution: string;
  keyPoints?: string[];
  entrepreneurInsight?: string;
  folderName?: string; // Added to support manual episode mapping
}

export interface EnrichedEpisode extends RSSEpisode {
  metadata: LocalMetadata | null;
}

export interface PodcastStats {
  totalEpisodes: number;
  totalSeasons: number;
  companiesFeatured: number;
}
