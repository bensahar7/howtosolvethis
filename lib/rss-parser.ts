import Parser from "rss-parser";
import { RSSEpisode } from "@/types/episode";

const RSS_FEED_URL = "https://anchor.fm/s/f75630a4/podcast/rss";

interface CustomFeed {
  title: string;
  description: string;
  link: string;
  image?: {
    url: string;
    title: string;
  };
}

interface CustomItem {
  title: string;
  contentSnippet?: string;
  content?: string;
  description?: string;
  pubDate?: string;
  link?: string;
  guid?: string;
  enclosure?: {
    url: string;
    type: string;
  };
  itunes?: {
    image?: string;
    duration?: string;
    episode?: string;
    season?: string;
  };
}

/**
 * Extract Spotify episode ID from various sources
 */
function extractSpotifyEpisodeId(item: CustomItem): string | null {
  // Try to extract from link field (Anchor/Spotify often includes this)
  if (item.link) {
    const spotifyMatch = item.link.match(/spotify\.com\/episode\/([a-zA-Z0-9]+)/);
    if (spotifyMatch) return spotifyMatch[1];
  }

  // Try to extract from guid
  if (item.guid) {
    const spotifyMatch = item.guid.match(/spotify\.com\/episode\/([a-zA-Z0-9]+)/);
    if (spotifyMatch) return spotifyMatch[1];
  }

  return null;
}

/**
 * Fetches and parses the podcast RSS feed
 * Implements caching via Next.js fetch with revalidation
 */
export async function fetchRSSFeed(): Promise<RSSEpisode[]> {
  try {
    const parser: Parser<CustomFeed, CustomItem> = new Parser({
      customFields: {
        feed: ["image"],
        item: [
          ["itunes:image", "itunes.image"],
          ["itunes:duration", "itunes.duration"],
          ["itunes:episode", "itunes.episode"],
        ],
      },
    });

    // Fetch with Next.js caching - revalidate every hour
    const response = await fetch(RSS_FEED_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`RSS fetch failed: ${response.status}`);
    }

    const xmlText = await response.text();
    const feed = await parser.parseString(xmlText);

    const episodes: RSSEpisode[] = feed.items.map((item, index) => {
      // Use iTunes season and episode to calculate absolute episode number
      let episodeNumber: number | undefined;
      
      const season = item.itunes?.season ? parseInt(item.itunes.season, 10) : null;
      const episodeInSeason = item.itunes?.episode ? parseInt(item.itunes.episode, 10) : null;
      
      // Calculate absolute episode number based on season
      if (season && episodeInSeason) {
        if (season === 1) {
          episodeNumber = episodeInSeason; // Season 1: episodes 1-10
        } else if (season === 2) {
          episodeNumber = 10 + episodeInSeason; // Season 2: episodes 11-14 (10 + 1-4)
        }
      }
      
      // Fallback: Try Hebrew: "פרק 14"
      if (!episodeNumber) {
        const hebrewMatch = item.title?.match(/פרק\s*(\d+)/i);
        if (hebrewMatch) {
          episodeNumber = parseInt(hebrewMatch[1], 10);
        }
      }
      
      // Fallback: Try English: "Episode 14", "ep14", "EP 14"
      if (!episodeNumber) {
        const englishMatch = item.title?.match(/(?:episode|ep)\s*(\d+)/i);
        if (englishMatch) {
          episodeNumber = parseInt(englishMatch[1], 10);
        }
      }
      
      // Last resort: use reverse index (but log warning)
      if (!episodeNumber) {
        episodeNumber = feed.items.length - index;
        console.warn(`[RSS PARSER] Could not extract episode number from title: "${item.title}", using index: ${episodeNumber}`);
      }

      // Extract Spotify episode ID
      const spotifyEpisodeId = extractSpotifyEpisodeId(item);
      
      // Construct Spotify URL if we have an episode ID
      const spotifyUrl = spotifyEpisodeId 
        ? `https://open.spotify.com/episode/${spotifyEpisodeId}`
        : null;

      return {
        title: item.title || "Untitled Episode",
        description: item.content || item.description || item.contentSnippet || "",
        pubDate: item.pubDate || new Date().toISOString(),
        imageUrl:
          item.itunes?.image ||
          feed.image?.url ||
          "/images/earth-hero.png",
        // Prioritize Spotify URL, then link field, then enclosure as last resort
        audioUrl: spotifyUrl || item.link || item.enclosure?.url || "",
        guid: item.guid || item.link || `episode-${index}`,
        duration: item.itunes?.duration,
        episodeNumber,
        spotifyEpisodeId: spotifyEpisodeId || undefined,
      };
    });

    return episodes;
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    // Return empty array on error - fallback to local metadata
    return [];
  }
}

/**
 * Get podcast statistics from RSS feed
 */
export async function getPodcastStats() {
  try {
    const episodes = await fetchRSSFeed();
    return {
      totalEpisodes: episodes.length,
      totalSeasons: 2, // Hardcoded from config
      companiesFeatured: episodes.length, // Approximate - one company per episode
    };
  } catch (error) {
    console.error("Error getting podcast stats:", error);
    return {
      totalEpisodes: 16,
      totalSeasons: 2,
      companiesFeatured: 16,
    };
  }
}
