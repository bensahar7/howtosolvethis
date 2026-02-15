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

export interface BilingualTag {
  en: string;
  he: string;
}

export interface LocalMetadata {
  episodeNumber: number;
  title: string;
  guests: string[];
  sector: string;
  keywords: (string | BilingualTag)[]; // Support both legacy strings and new bilingual objects in same array
  problem: string;
  solution: string;
  keyPoints?: string[];
  entrepreneurInsight?: string;
  folderName?: string; // Added to support manual episode mapping
  
  // NEW FIELDS for Knowledge Hub
  guestLinkedIn?: string[];      // Array to support multiple guests
  companyWebsite?: string;
  companyName?: string;
  companyLogo?: string;          // Filename: logo.png
  transcript?: string;
}

export interface EnrichedEpisode extends RSSEpisode {
  metadata: LocalMetadata | null;
}

export interface PodcastStats {
  totalEpisodes: number;
  totalSeasons: number;
  companiesFeatured: number;
}
