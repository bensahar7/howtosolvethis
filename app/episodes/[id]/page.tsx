import { getEnrichedEpisodes, getEpisodeWithTranscript } from "@/lib/episode-matcher";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import BilingualTag from "@/components/BilingualTag";
import GuestInfo from "@/components/GuestInfo";
import CompanySection from "@/components/CompanySection";
import MultiCompanySection from "@/components/MultiCompanySection";
import ResearcherSection from "@/components/ResearcherSection";
import TranscriptAccordion from "@/components/TranscriptAccordion";
import ReadMoreDescription from "@/components/ReadMoreDescription";
import EpisodeStructuredData from "@/components/EpisodeStructuredData";
import RelatedEpisodes from "@/components/RelatedEpisodes";
import ShareButtons from "@/components/ShareButtons";
import SpotifyIcon from "@/components/SpotifyIcon";
import {
  ApplePodcastsIcon,
  YouTubeIcon,
  YouTubeMusicIcon,
  PocketCastsIcon,
  CastboxIcon,
  SnipdIcon,
  GooglePodcastsIcon,
} from "@/components/PodcastIcons";

// Force static generation for better performance
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

// Generate static params for all episodes
export async function generateStaticParams() {
  const episodes = await getEnrichedEpisodes();
  return episodes.map((episode) => ({
    id: episode.episodeNumber?.toString() || "1",
  }));
}

// Enhanced SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const episodeNumber = parseInt(id, 10);
  
  // Use getEpisodeWithTranscript to fetch full data
  const episode = await getEpisodeWithTranscript(episodeNumber);

  if (!episode) {
    return {
      title: "Episode Not Found",
    };
  }

  const metadata = episode.metadata;
  
  // SEO Title: Episode [Number]: [Title] | [Guests]
  const guests = metadata?.guests?.join(", ") || "";
  const seoTitle = `Episode ${episodeNumber}: ${episode.title}${guests ? ` | ${guests}` : ""}`;
  
  // SEO Description: Use metadata.problem (limit to 155 chars)
  const seoDescription = metadata?.problem 
    ? metadata.problem.substring(0, 155).trim() + (metadata.problem.length > 155 ? "..." : "")
    : episode.description?.replace(/<[^>]*>/g, '').substring(0, 155) || "";
  
  // Rich keywords combining sector, guest names, and bilingual keywords
  const seoKeywords = [
    metadata?.sector,
    ...(metadata?.guests || []),
    metadata?.companyName,
    ...(metadata?.keywords?.map(k => typeof k === 'string' ? k : `${k.he}, ${k.en}`) || []),
    "פודקאסט קליימט-טק",
    "Climate Tech Israel",
    "חדשנות ישראלית",
    "יזמות סביבתית"
  ].filter(Boolean).join(", ");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    
    // OpenGraph for LinkedIn/WhatsApp/Facebook sharing (HEBREW optimized)
    openGraph: {
      type: "article",
      locale: "he_IL",
      url: `https://howtosolvethis.com/episodes/${id}`,
      siteName: "איך פותרים את זה?",
      title: seoTitle,
      description: seoDescription,
      images: [
        {
          url: episode.imageUrl,
          width: 1200,
          height: 630,
          alt: episode.title,
        },
      ],
      publishedTime: episode.pubDate,
      authors: metadata?.guests || ["בן סהר"],
      tags: metadata?.keywords?.map(k => typeof k === 'string' ? k : k.he) || [],
    },
    
    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [episode.imageUrl],
      creator: "@bensahar",
    },
    
    // Canonical URL
    alternates: {
      canonical: `https://howtosolvethis.com/episodes/${id}`,
    },
  };
}

export default async function EpisodePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const episodeNumber = parseInt(id, 10);
  
  // Use the optimized function that loads transcript only for this episode
  const episode = await getEpisodeWithTranscript(episodeNumber);

  if (!episode) {
    notFound();
  }
  
  // Fetch all episodes for RelatedEpisodes component (without transcripts for performance)
  const allEpisodes = await getEnrichedEpisodes();

  const metadata = episode.metadata;
  const spotifyEmbedUrl = episode.spotifyEpisodeId
    ? `https://open.spotify.com/embed/episode/${episode.spotifyEpisodeId}?utm_source=generator&theme=0`
    : null;
  const episodeUrl = `https://howtosolvethis.com/episodes/${id}`;

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <EpisodeStructuredData episode={episode} />
      
      <Header />
      
      <article className="relative z-0">
        {/* Mobile-First Grid: Full width on mobile, asymmetric on desktop */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 max-w-7xl mx-auto px-4 md:px-6 pt-20 pb-12 md:pb-24">
          
          {/* Main Content - Responsive column span */}
          <div className="col-span-12 lg:col-span-9 lg:col-start-2">
            
            {/* Back Button */}
            <Link
              href="/#episodes"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6 md:mb-8 glass px-4 py-2 rounded-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              חזרה לפרקים
            </Link>

            {/* 1. Hero: Episode Title */}
            <div className="glass p-6 md:p-12 rounded-sm mb-6 md:mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="glass px-3 py-1 rounded-sm">
                  <span className="technical-text">EP {episode.episodeNumber}</span>
                </div>
                {metadata?.sector && (
                  <div className="glass px-3 py-1 rounded-sm">
                    <span className="technical-text text-xs">{metadata.sector}</span>
                  </div>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                {episode.title}
              </h1>

              {/* Episode Image */}
              <div className="relative aspect-video overflow-hidden rounded-sm mb-6">
                <Image
                  src={episode.imageUrl}
                  alt={episode.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 70vw"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                />
              </div>

              {/* Description with Read More */}
              {episode.description && (
                <ReadMoreDescription content={episode.description} maxLines={3} />
              )}
            </div>

            {/* 2. Professional Profile: Guest Name/Role + Company */}
            {/* Guest Info Section - Show ONLY if no researcher/companies (backward compatibility) */}
            {metadata?.guests && metadata.guests.length > 0 && !metadata.researcher && !metadata.companies && (
              <div className="glass p-6 md:p-12 rounded-sm mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">אורחים</h2>
                <div className="flex flex-col gap-4 md:gap-6">
                  {metadata.guests.map((guest, i) => (
                    <GuestInfo
                      key={i}
                      name={guest}
                      linkedIn={metadata.guestLinkedIn?.[i]}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* NEW: Researcher Section (for multi-guest episodes) */}
            {metadata?.researcher && (
              <ResearcherSection researcher={metadata.researcher} />
            )}

            {/* NEW: Multi-Company Section (for comparative episodes) */}
            {metadata?.companies && metadata.companies.length > 0 ? (
              <MultiCompanySection companies={metadata.companies} />
            ) : (
              /* LEGACY: Single Company Section (backward compatibility) */
              <CompanySection
                companyName={metadata?.companyName}
                companyWebsite={metadata?.companyWebsite}
                companyLogo={metadata?.companyLogo}
                sector={metadata?.sector}
                episodeFolderName={metadata?.folderName}
              />
            )}

            {/* 3. Contextual Value: The Problem & The Solution */}
            {metadata?.problem && (
              <div className="glass p-6 md:p-12 rounded-sm mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">הבעיה</h2>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  {metadata.problem}
                </p>
              </div>
            )}

            {metadata?.solution && (
              <div className="glass p-6 md:p-12 rounded-sm mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">הפתרון</h2>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  {metadata.solution}
                </p>
              </div>
            )}

            {/* NEW: Entrepreneur Tip Callout (High-Contrast) */}
            {metadata?.entrepreneurTip && (
              <div className="relative glass p-6 md:p-12 rounded-sm mb-6 md:mb-8 border-2 border-blue-400/30 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                <div className="absolute top-4 right-4 glass px-3 py-1 rounded-sm">
                  <span className="technical-text text-blue-300">טיפ ליזם</span>
                </div>
                <div className="mt-8">
                  <p className="text-white text-base md:text-lg leading-relaxed font-medium">
                    💡 {metadata.entrepreneurTip}
                  </p>
                </div>
              </div>
            )}

            {/* 4. Key Insight: טיפ ליזם (Entrepreneur Insight - Legacy) */}
            {metadata?.entrepreneurInsight && (
              <div className="glass p-6 md:p-12 rounded-sm mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">תובנת יזם</h2>
                <p className="text-white/80 text-sm md:text-base leading-relaxed italic">
                  "{metadata.entrepreneurInsight}"
                </p>
              </div>
            )}

            {/* Key Discussion Points (After Insight) */}
            {metadata?.keyPoints && metadata.keyPoints.length > 0 && (
              <div className="glass p-6 md:p-12 rounded-sm mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">נקודות מפתח</h2>
                <ul className="list-disc list-inside text-white/80 text-sm md:text-base leading-relaxed space-y-2">
                  {metadata.keyPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 5. Conversion: Podcast Player & Platform Links */}
            {spotifyEmbedUrl && (
              <div className="glass p-4 md:p-6 rounded-sm mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">האזן לפרק</h2>
                {/* Taller aspect ratio on mobile for better Spotify embed */}
                <div className="aspect-[3/2] md:aspect-[3/1] rounded-sm overflow-hidden">
                  <iframe
                    src={spotifyEmbedUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            {/* Platform Links */}
            {episode.audioUrl && (
              <div className="glass p-6 md:p-12 rounded-sm mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">האזן בפלטפורמות אחרות</h2>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
                  <a
                    href={episode.audioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass p-3 md:p-4 rounded-sm glass-hover flex items-center justify-center min-h-[48px]"
                    aria-label="Spotify"
                  >
                    <SpotifyIcon className="w-6 h-6 md:w-8 md:h-8" />
                  </a>
                  <a
                    href="https://podcasts.apple.com/us/podcast/%D7%90%D7%99%D7%9A-%D7%A4%D7%95%D7%AA%D7%A8%D7%99%D7%9D-%D7%90%D7%AA-%D7%96%D7%94/id1750929970"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass p-3 md:p-4 rounded-sm glass-hover flex items-center justify-center min-h-[48px]"
                    aria-label="Apple Podcasts"
                  >
                    <ApplePodcastsIcon className="w-6 h-6 md:w-8 md:h-8 text-white/80" />
                  </a>
                  <a
                    href="https://music.youtube.com/playlist?list=PLkPsVtA1_TZ_iuvlbCTHa4gmWl4vXdp89"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass p-3 md:p-4 rounded-sm glass-hover flex items-center justify-center min-h-[48px]"
                    aria-label="YouTube Music"
                  >
                    <YouTubeMusicIcon className="w-6 h-6 md:w-8 md:h-8 text-[#FF0000]" />
                  </a>
                  <a
                    href="https://www.youtube.com/@howtosolvethis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass p-3 md:p-4 rounded-sm glass-hover flex items-center justify-center min-h-[48px]"
                    aria-label="YouTube"
                  >
                    <YouTubeIcon className="w-6 h-6 md:w-8 md:h-8 text-[#FF0000]" />
                  </a>
                  <a
                    href="https://pocketcasts.com/podcast/%D7%90%D7%99%D7%9A-%D7%A4%D7%95%D7%AA%D7%A8%D7%99%D7%9D-%D7%90%D7%AA-%D7%96%D7%94/1c570bc0-073c-013d-0d1e-0243b8a24f53"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass p-3 md:p-4 rounded-sm glass-hover flex items-center justify-center min-h-[48px]"
                    aria-label="Pocket Casts"
                  >
                    <PocketCastsIcon className="w-6 h-6 md:w-8 md:h-8 text-[#F43E37]" />
                  </a>
                  <a
                    href="https://castbox.fm/channel/id6193220?country=us"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass p-3 md:p-4 rounded-sm glass-hover flex items-center justify-center min-h-[48px]"
                    aria-label="Castbox"
                  >
                    <CastboxIcon className="w-6 h-6 md:w-8 md:h-8 text-[#F55B23]" />
                  </a>
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <ShareButtons 
              episodeTitle={episode.title}
              episodeUrl={episodeUrl}
            />

            {/* Keywords Section - Combined bilingual tags + SEO keywords */}
            {((metadata?.keywords && metadata.keywords.length > 0) || 
              (metadata?.seoKeywords && metadata.seoKeywords.length > 0)) && (
              <div className="glass p-6 md:p-12 rounded-sm mb-6 md:mb-8">
                <h2 className="technical-text text-xs mb-4 md:mb-6">KEYWORDS</h2>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {/* Bilingual Keywords (fancy tags) */}
                  {metadata?.keywords?.map((keyword, i) => (
                    <BilingualTag key={`bilingual-${i}`} keyword={keyword} />
                  ))}
                  
                  {/* SEO Keywords (simple tags) */}
                  {metadata?.seoKeywords?.map((keyword, i) => (
                    <span 
                      key={`seo-${i}`}
                      className="px-3 py-1 text-xs text-white/50 bg-white/5 rounded-full border border-white/10"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Content Archive: Transcript (Accordion - closed by default) */}
            {metadata?.transcript && (
              <TranscriptAccordion
                transcript={metadata.transcript}
                episodeTitle={episode.title}
              />
            )}

            {/* Related Episodes */}
            <RelatedEpisodes
              currentEpisode={episode}
              allEpisodes={allEpisodes}
            />
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
