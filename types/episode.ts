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

export interface CompanyInfo {
  name: string;
  logo: string;              // Filename in public/logos/ (e.g., "tobee.png")
  website?: string;
  guestName: string;
  guestLinkedIn?: string;
  guestTitle?: string;       // "VP R&D" or "Product Manager"
  focus?: string;            // "Health Focus" or "Efficiency Focus"
  sector?: string;           // Optional: can differ from episode sector
}

export interface ResearcherInfo {
  name: string;
  linkedIn?: string;
  title?: string;            // "Dr." or "Prof."
  affiliation?: string;      // University or research institute
  googleScholar?: string;    // Google Scholar profile URL
  website?: string;          // Personal or institutional website
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
  transcript?: string;
  
  // MULTI-COMPANY SUPPORT (NEW)
  researcher?: ResearcherInfo; // For academic/expert guests
  companies?: CompanyInfo[];   // Array of companies featured
  
  // LEGACY FIELDS (keep for backward compatibility with single-company episodes)
  guestLinkedIn?: string[];      // Array to support multiple guests
  companyWebsite?: string;
  companyName?: string;
  companyLogo?: string;          // Filename: logo.png
}

export interface EnrichedEpisode extends RSSEpisode {
  metadata: LocalMetadata | null;
}

export interface PodcastStats {
  totalEpisodes: number;
  totalSeasons: number;
  companiesFeatured: number;
}
