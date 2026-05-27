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
    associatedMedia: {
      "@type": "MediaObject",
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
      webFeed: "https://anchor.fm/s/f75630a4/podcast/rss",
      author: {
        "@type": "Person",
        name: "בן סהר",
        url: "https://www.linkedin.com/in/ben-sahar/",
      },
    },
    
    // Episode metadata
    episodeNumber: episode.episodeNumber,
    inLanguage: "he-IL",
    
    // Publisher information - helps Google understand authority
    publisher: {
      "@type": "Organization",
      name: "איך פותרים את זה?",
      url: "https://howtosolvethis.com",
      logo: {
        "@type": "ImageObject",
        url: "https://howtosolvethis.com/logo.png",
        width: 512,
        height: 512,
      },
    },

    isAccessibleForFree: true,
    
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
          industry: company.sector || metadata?.sector,
        }))
      : metadata?.companyName
        ? [{
            "@type": "Organization",
            name: metadata.companyName,
            url: metadata.companyWebsite,
            industry: metadata?.sector,
          }]
        : undefined,

    // Speakable — marks key passages for voice/audio extraction
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-tldr]", "[data-problem]", "[data-solution]"],
    },
    
    // Full transcript for content validation - CRITICAL for indexing
    // Including full transcript helps Google understand content depth
    transcript: metadata?.transcript ? {
      "@type": "MediaObject",
      text: metadata.transcript, // Full transcript, not truncated
      encodingFormat: "text/plain",
      inLanguage: "he-IL",
    } : undefined,
    
  };

  // BreadcrumbList schema — enables breadcrumb trails in Google SERPs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "איך פותרים את זה?",
        item: "https://howtosolvethis.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "פרקים",
        item: "https://howtosolvethis.com/#episodes",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `פרק ${episode.episodeNumber}: ${episode.title}`,
        item: `https://howtosolvethis.com/episodes/${episode.episodeNumber}`,
      },
    ],
  };

  // FAQPage schema — high-ROI for AI extraction
  const faqEntries: Array<{ q: string; a: string }> = [];

  // Guest question — enriched with company + role context
  if (metadata?.guests?.length) {
    const guestList = metadata.guests.join(" ו-");
    const companyContext = metadata.companies?.length
      ? metadata.companies.map(c => c.name).join(" ו-")
      : metadata.companyName;
    const sectorContext = metadata.sector ? ` בתחום ה-${metadata.sector}` : "";
    faqEntries.push({
      q: `מי האורח/ת בפרק ${episode.episodeNumber} של 'איך פותרים את זה?'?`,
      a: `${guestList}${companyContext ? ` מחברת ${companyContext}` : ""}${sectorContext}. הפרק מתמקד ב${episode.title}.`,
    });
  }

  // Problem — with episode context
  if (metadata?.problem) {
    faqEntries.push({
      q: `מה הבעיה שפרק ${episode.episodeNumber} עוסק בה?`,
      a: metadata.problem,
    });
  }

  // Solution — with company attribution
  if (metadata?.solution) {
    const companyName = metadata.companies?.[0]?.name || metadata.companyName;
    faqEntries.push({
      q: companyName
        ? `איך ${companyName} פותרים את הבעיה?`
        : "מהו הפתרון שמוצג בפרק?",
      a: metadata.solution,
    });
  }

  // Entrepreneur tip — high value for AI extraction
  if (metadata?.entrepreneurTip) {
    faqEntries.push({
      q: "מה הטיפ ליזמים מהפרק הזה?",
      a: metadata.entrepreneurTip,
    });
  }

  // Sector context question
  if (metadata?.sector) {
    faqEntries.push({
      q: `באיזה תחום עוסק פרק ${episode.episodeNumber}?`,
      a: `הפרק עוסק בתחום ה-${metadata.sector}. הפודקאסט 'איך פותרים את זה?' מכסה מגוון תחומים בקליימט-טק ישראלי, כולל AgriTech, FoodTech, Blue Tech, אנרגיה ועוד.`,
    });
  }

  // Key points summary — if available
  if (metadata?.keyPoints?.length) {
    faqEntries.push({
      q: "מה הנקודות המרכזיות בפרק?",
      a: metadata.keyPoints.join(". ") + ".",
    });
  }

  // Company website — drives traffic + helps AI cite
  const mainCompany = metadata?.companies?.[0];
  if (mainCompany?.website) {
    faqEntries.push({
      q: `מה האתר של ${mainCompany.name}?`,
      a: `אתר החברה: ${mainCompany.website}. ${mainCompany.focus ? `${mainCompany.name} מתמקדת ב-${mainCompany.focus}.` : ""}`,
    });
  } else if (metadata?.companyWebsite && metadata?.companyName) {
    faqEntries.push({
      q: `מה האתר של ${metadata.companyName}?`,
      a: `אתר החברה: ${metadata.companyWebsite}.`,
    });
  }

  // Listening platforms — always last
  faqEntries.push({
    q: "איפה ניתן להאזין לפרק?",
    a: `הפרק זמין ב-Spotify, Apple Podcasts, YouTube Music, Pocket Casts, Castbox ו-Snipd. ניתן גם להאזין באתר howtosolvethis.com/episodes/${episode.episodeNumber} עם תמלול מלא.`,
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntries.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  // Remove undefined fields for clean JSON-LD
  const cleanedSchema = JSON.parse(JSON.stringify(episodeSchema));

  const escape = (obj: object) =>
    JSON.stringify(obj, null, 2)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escape(cleanedSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escape(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escape(faqSchema) }}
      />
    </>
  );
}
