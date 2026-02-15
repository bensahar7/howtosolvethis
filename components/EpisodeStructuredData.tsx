import { EnrichedEpisode } from "@/types/episode";

interface EpisodeStructuredDataProps {
  episode: EnrichedEpisode;
}

export default function EpisodeStructuredData({ episode }: EpisodeStructuredDataProps) {
  const metadata = episode.metadata;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "name": episode.title,
    "description": metadata?.problem || episode.description,
    "url": `https://howtosolvethis.com/episodes/${episode.episodeNumber}`,
    "datePublished": episode.pubDate,
    "image": episode.imageUrl,
    "audio": {
      "@type": "AudioObject",
      "contentUrl": episode.audioUrl,
      "duration": episode.duration,
    },
    "partOfSeries": {
      "@type": "PodcastSeries",
      "name": "איך פותרים את זה?",
      "url": "https://howtosolvethis.com",
    },
    "creator": metadata?.guests?.map(guest => ({
      "@type": "Person",
      "name": guest,
    })) || [],
    "about": {
      "@type": "Thing",
      "name": metadata?.sector || "Climate Tech",
    },
    "keywords": metadata?.keywords?.map(k => 
      typeof k === 'string' ? k : `${k.he}, ${k.en}`
    ).join(", "),
    // Transcript for voice search optimization
    "transcript": metadata?.transcript ? {
      "@type": "MediaObject",
      "text": metadata.transcript.substring(0, 5000), // First 5000 chars
      "encodingFormat": "text/plain",
      "inLanguage": "he",
    } : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
