import { EnrichedEpisode } from "@/types/episode";

interface EpisodeStructuredDataProps {
  episode: EnrichedEpisode;
}

/**
 * Dynamic PodcastEpisode Schema Component
 * Generates episode-specific structured data for SEO
 */
export default function EpisodeStructuredData({ episode }: EpisodeStructuredDataProps) {
  const metadata = episode.metadata;
  
  // Build description from metadata or RSS
  const description = metadata?.problem || episode.description || "";
  const cleanDescription = typeof description === 'string' 
    ? description.replace(/<[^>]*>/g, '').substring(0, 300)
    : "";
  
  // Build guest/creator array
  const creators: any[] = [];
  
  // Add guests
  if (metadata?.guests && metadata.guests.length > 0) {
    metadata.guests.forEach((guest, index) => {
      creators.push({
        "@type": "Person",
        "name": guest,
        "url": metadata.guestLinkedIn?.[index] || undefined,
      });
    });
  }
  
  // Add researcher if exists
  if (metadata?.researcher) {
    creators.push({
      "@type": "Person",
      "name": metadata.researcher.name,
      "url": metadata.researcher.linkedIn || undefined,
      "jobTitle": "Researcher",
    });
  }
  
  // Add host
  creators.push({
    "@type": "Person",
    "name": "בן סהר",
    "url": "https://www.linkedin.com/in/ben-sahar/",
    "jobTitle": "Host",
  });
  
  const episodeSchema = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "@id": `https://howtosolvethis.com/episodes/${episode.episodeNumber}#episode`,
    "name": episode.title,
    "description": cleanDescription,
    "url": `https://howtosolvethis.com/episodes/${episode.episodeNumber}`,
    "datePublished": episode.pubDate,
    "image": {
      "@type": "ImageObject",
      "url": episode.imageUrl,
      "width": "1200",
      "height": "630",
    },
    "associatedMedia": {
      "@type": "AudioObject",
      "contentUrl": episode.audioUrl,
      "duration": episode.duration,
      "encodingFormat": "audio/mpeg",
      "embedUrl": episode.spotifyEpisodeId 
        ? `https://open.spotify.com/embed/episode/${episode.spotifyEpisodeId}`
        : undefined,
    },
    "partOfSeries": {
      "@type": "PodcastSeries",
      "@id": "https://howtosolvethis.com/#podcast",
      "name": "איך פותרים את זה?",
      "url": "https://howtosolvethis.com",
    },
    "creator": creators,
    "publisher": {
      "@id": "https://howtosolvethis.com/#organization",
    },
    "inLanguage": "he",
    "about": metadata?.sector ? {
      "@type": "Thing",
      "name": metadata.sector,
    } : undefined,
    "keywords": metadata?.keywords?.map(k => 
      typeof k === 'string' ? k : `${k.he}, ${k.en}`
    ).join(", ") || undefined,
    "episodeNumber": episode.episodeNumber,
    // Add company mentions if available
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

  // Remove undefined fields
  const cleanedSchema = JSON.parse(JSON.stringify(episodeSchema));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanedSchema) }}
    />
  );
}
