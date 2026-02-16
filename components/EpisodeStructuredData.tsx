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
  
  // Build the episode schema dynamically from episode data
  const episodeSchema = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "@id": `https://howtosolvethis.com/episodes/${episode.episodeNumber}#episode`,
    name: episode.title,
    description: metadata?.problem || episode.description,
    url: `https://howtosolvethis.com/episodes/${episode.episodeNumber}`,
    datePublished: episode.pubDate,
    dateModified: episode.pubDate,
    image: {
      "@type": "ImageObject",
      url: episode.imageUrl,
      width: 1400,
      height: 1400,
    },
    audio: {
      "@type": "AudioObject",
      contentUrl: episode.audioUrl,
      duration: episode.duration,
      encodingFormat: "audio/mpeg",
    },
    partOfSeries: {
      "@type": "PodcastSeries",
      "@id": "https://howtosolvethis.com/#podcast",
      name: "איך פותרים את זה?",
      url: "https://howtosolvethis.com",
    },
    episodeNumber: episode.episodeNumber,
    inLanguage: "he",
    // Dynamic creator/guest information
    creator: metadata?.guests?.map(guest => ({
      "@type": "Person",
      name: guest,
    })) || [{
      "@type": "Person",
      name: "בן סהר",
    }],
    // Topic/sector information
    about: metadata?.sector ? {
      "@type": "Thing",
      name: metadata.sector,
      description: metadata.problem,
    } : {
      "@type": "Thing",
      name: "Climate Tech",
    },
    // Keywords for discoverability
    keywords: metadata?.keywords?.map(k => 
      typeof k === 'string' ? k : `${k.he}, ${k.en}`
    ).join(", ") || "קליימט-טק, יזמות, אקלים",
    // Company/organization mentions
    mentions: metadata?.companyName ? [{
      "@type": "Organization",
      name: metadata.companyName,
      url: metadata.companyWebsite,
    }] : undefined,
    // Transcript for voice search optimization (if available)
    transcript: metadata?.transcript ? {
      "@type": "MediaObject",
      text: metadata.transcript.substring(0, 5000), // First 5000 chars for SEO
      encodingFormat: "text/plain",
      inLanguage: "he",
    } : undefined,
    // Interaction statistics (if available)
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/ListenAction",
      userInteractionCount: 0, // Can be updated with real analytics
    },
  };

  // Remove undefined fields for clean JSON-LD
  const cleanedSchema = JSON.parse(JSON.stringify(episodeSchema));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanedSchema) }}
    />
  );
}
