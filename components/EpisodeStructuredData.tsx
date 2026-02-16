import { EnrichedEpisode } from "@/types/episode";
import { stringifySchema, formatKeywords, createImageSchema } from "@/lib/schema-helpers";

interface EpisodeStructuredDataProps {
  episode: EnrichedEpisode;
}

/**
 * Dynamic PodcastEpisode Schema Component
 * Generates rich structured data for each episode page
 * Enhances SEO, voice search, and podcast app discovery
 */
export default function EpisodeStructuredData({ episode }: EpisodeStructuredDataProps) {
  const metadata = episode.metadata;
  
  // Build guest/creator array with LinkedIn profiles if available
  const creators = [];
  
  // Add researcher if present
  if (metadata?.researcher) {
    creators.push({
      "@type": "Person",
      "name": metadata.researcher.name,
      "sameAs": metadata.researcher.linkedIn || undefined,
    });
  }
  
  // Add company guests
  if (metadata?.companies) {
    metadata.companies.forEach(company => {
      if (company.guestName) {
        creators.push({
          "@type": "Person",
          "name": company.guestName,
          "worksFor": {
            "@type": "Organization",
            "name": company.name,
            "url": company.website,
          },
          "sameAs": company.guestLinkedIn || undefined,
        });
      }
    });
  }
  
  // Fallback to legacy guests array
  if (creators.length === 0 && metadata?.guests) {
    metadata.guests.forEach((guest, index) => {
      creators.push({
        "@type": "Person",
        "name": guest,
        "sameAs": metadata.guestLinkedIn?.[index] || undefined,
      });
    });
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "@id": `https://howtosolvethis.com/episodes/${episode.episodeNumber}#episode`,
    "episodeNumber": episode.episodeNumber,
    "name": episode.title,
    "description": metadata?.problem || episode.description,
    "url": `https://howtosolvethis.com/episodes/${episode.episodeNumber}`,
    "datePublished": episode.pubDate,
    "image": createImageSchema(episode.imageUrl, 1200, 630),
    "audio": {
      "@type": "AudioObject",
      "contentUrl": episode.audioUrl,
      "duration": episode.duration,
      "encodingFormat": "audio/mpeg",
    },
    "partOfSeries": {
      "@type": "PodcastSeries",
      "@id": "https://howtosolvethis.com/#podcast",
      "name": "איך פותרים את זה?",
      "url": "https://howtosolvethis.com",
    },
    "publisher": {
      "@id": "https://howtosolvethis.com/#organization",
    },
    "creator": creators.length > 0 ? creators : undefined,
    "about": metadata?.sector ? {
      "@type": "Thing",
      "name": metadata.sector,
    } : undefined,
    "keywords": metadata?.keywords ? formatKeywords(metadata.keywords) : undefined,
    "inLanguage": "he",
    // Transcript for voice search optimization
    "transcript": metadata?.transcript ? {
      "@type": "MediaObject",
      "text": metadata.transcript.substring(0, 5000), // First 5000 chars for SEO
      "encodingFormat": "text/plain",
      "inLanguage": "he",
    } : undefined,
    // Add mentions of companies featured
    "mentions": metadata?.companies?.map(company => ({
      "@type": "Organization",
      "name": company.name,
      "url": company.website,
    })) || (metadata?.companyName ? [{
      "@type": "Organization",
      "name": metadata.companyName,
      "url": metadata.companyWebsite,
    }] : undefined),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: stringifySchema(structuredData) }}
    />
  );
}
