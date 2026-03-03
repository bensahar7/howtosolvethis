import { EnrichedEpisode } from "@/types/episode";

interface EpisodeStructuredDataProps {
  episode: EnrichedEpisode;
}

/**
 * Enhanced PodcastEpisode Schema Component
 * Generates complete episode-specific structured data for Google indexing
 * 
 * Key improvements for indexing:
 * - Complete PodcastEpisode schema with all required fields
 * - Full transcript included for content validation
 * - Detailed partOfSeries relationship
 * - Publisher information
 */
export default function EpisodeStructuredData({ episode }: EpisodeStructuredDataProps) {
  const metadata = episode.metadata;
  
  // Clean description for schema (remove HTML tags)
  const cleanDescription = (text?: string | null): string => {
    if (!text) return "";
    return text.replace(/<[^>]*>/g, '').trim();
  };
  
  // Build the episode schema dynamically from episode data
  const episodeSchema = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "@id": `https://howtosolvethis.com/episodes/${episode.episodeNumber}#episode`,
    
    // Core identification fields
    name: episode.title,
    description: cleanDescription(metadata?.problem || episode.description),
    url: `https://howtosolvethis.com/episodes/${episode.episodeNumber}`,
    
    // Temporal metadata
    datePublished: episode.pubDate,
    dateModified: episode.pubDate,
    
    // Media assets
    image: {
      "@type": "ImageObject",
      url: episode.imageUrl,
      width: 1400,
      height: 1400,
      caption: episode.title,
    },
    audio: {
      "@type": "AudioObject",
      contentUrl: episode.audioUrl,
      duration: episode.duration,
      encodingFormat: "audio/mpeg",
      name: episode.title,
    },
    
    // Series relationship - CRITICAL for proper indexing
    partOfSeries: {
      "@type": "PodcastSeries",
      "@id": "https://howtosolvethis.com/#podcast",
      name: "איך פותרים את זה?",
      description: "פודקאסט שמנגיש את הבעיות הגדולות של תקופתינו ומפגיש בין יזמים, חוקרים ומשקיעים בעולמות האקלים והסביבה",
      url: "https://howtosolvethis.com",
      webFeed: "https://anchor.fm/s/f2ae20b0/podcast/rss",
      author: {
        "@type": "Person",
        name: "בן סהר",
        url: "https://www.linkedin.com/in/ben-sahar/",
      },
    },
    
    // Episode metadata
    episodeNumber: episode.episodeNumber,
    inLanguage: "he",
    
    // Publisher information - helps Google understand authority
    publisher: {
      "@type": "Organization",
      name: "איך פותרים את זה?",
      url: "https://howtosolvethis.com",
      logo: {
        "@type": "ImageObject",
        url: "https://howtosolvethis.com/images/earth-hero.png",
      },
    },
    
    // Creator/contributor information
    creator: metadata?.guests && metadata.guests.length > 0 
      ? metadata.guests.map(guest => ({
          "@type": "Person",
          name: guest,
        }))
      : [{
          "@type": "Person",
          name: "בן סהר",
          url: "https://www.linkedin.com/in/ben-sahar/",
        }],
    
    // Host information
    actor: {
      "@type": "Person",
      name: "בן סהר",
      url: "https://www.linkedin.com/in/ben-sahar/",
    },
    
    // Topic/sector information
    about: metadata?.sector ? {
      "@type": "Thing",
      name: metadata.sector,
      description: metadata.problem,
    } : {
      "@type": "Thing",
      name: "Climate Tech",
      description: "Climate technology and sustainability innovation",
    },
    
    // Keywords for discoverability
    keywords: metadata?.keywords?.map(k => 
      typeof k === 'string' ? k : `${k.he}, ${k.en}`
    ).join(", ") || "קליימט-טק, יזמות, אקלים, Climate Tech, Israel",
    
    // Company/organization mentions
    mentions: metadata?.companies && metadata.companies.length > 0
      ? metadata.companies.map(company => ({
          "@type": "Organization",
          name: company.name,
          url: company.website,
        }))
      : metadata?.companyName 
        ? [{
            "@type": "Organization",
            name: metadata.companyName,
            url: metadata.companyWebsite,
          }]
        : undefined,
    
    // Full transcript for content validation - CRITICAL for indexing
    // Including full transcript helps Google understand content depth
    transcript: metadata?.transcript ? {
      "@type": "MediaObject",
      text: metadata.transcript, // Full transcript, not truncated
      encodingFormat: "text/plain",
      inLanguage: "he",
    } : undefined,
    
    // Interaction statistics
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/ListenAction",
      userInteractionCount: 0,
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
