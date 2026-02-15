import { getEnrichedEpisodes } from "@/lib/episode-matcher";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import SpotifyIcon from "@/components/SpotifyIcon";
import {
  ApplePodcastsIcon,
  YouTubeIcon,
  YouTubeMusicIcon,
  PocketCastsIcon,
  CastboxIcon,
} from "@/components/PodcastIcons";
import { trackEvent } from "@/lib/logger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

// Generate static params for all episodes
export async function generateStaticParams() {
  const episodes = await getEnrichedEpisodes();
  return episodes.map((episode) => ({
    id: episode.episodeNumber?.toString() || "1",
  }));
}

// Generate metadata for each episode
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const episodes = await getEnrichedEpisodes();
  const episode = episodes.find((ep) => ep.episodeNumber?.toString() === params.id);

  if (!episode) {
    return {
      title: "Episode Not Found",
    };
  }

  const metadata = episode.metadata;

  return {
    title: episode.title,
    description: episode.description || metadata?.problem || "איך פותרים את זה? - פודקאסט",
    openGraph: {
      title: episode.title,
      description: episode.description || metadata?.problem || "",
      images: [episode.imageUrl],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: episode.title,
      description: episode.description || metadata?.problem || "",
      images: [episode.imageUrl],
    },
  };
}

export default async function EpisodePage({ params }: { params: { id: string } }) {
  const episodes = await getEnrichedEpisodes();
  const episode = episodes.find((ep) => ep.episodeNumber?.toString() === params.id);

  if (!episode) {
    notFound();
  }

  const metadata = episode.metadata;
  const spotifyEmbedUrl = episode.spotifyEpisodeId
    ? `https://open.spotify.com/embed/episode/${episode.spotifyEpisodeId}?utm_source=generator&theme=0`
    : null;

  return (
    <>
      <Header />
      
      <article className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        {/* Back Button */}
        <Link
          href="/#episodes"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 glass px-4 py-2 rounded-full"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          חזרה לפרקים
        </Link>

        {/* Episode Header */}
        <div className="glass p-8 rounded-sm mb-8">
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

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
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
            />
          </div>

          {/* Description */}
          {episode.description && (
            <div
              className="text-white/80 text-lg leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: episode.description }}
            />
          )}

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
            {metadata?.guests && metadata.guests.length > 0 && (
              <div>
                <div className="technical-text text-xs mb-2">אורחים</div>
                <div className="text-white text-sm">{metadata.guests.join(", ")}</div>
              </div>
            )}
            <div>
              <div className="technical-text text-xs mb-2">תאריך</div>
              <div className="text-white text-sm">
                {new Date(episode.pubDate).toLocaleDateString("he-IL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            {metadata?.sector && (
              <div>
                <div className="technical-text text-xs mb-2">תחום</div>
                <div className="text-white text-sm">{metadata.sector}</div>
              </div>
            )}
          </div>

          {/* Keywords */}
          {metadata?.keywords && metadata.keywords.length > 0 && (
            <div className="mt-6">
              <div className="technical-text text-xs mb-3">תגיות</div>
              <div className="flex flex-wrap gap-2">
                {metadata.keywords.map((keyword, i) => (
                  <span
                    key={i}
                    className="technical-text text-xs px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white/80"
                  >
                    {typeof keyword === 'string' ? keyword : keyword.he}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Spotify Player */}
        {spotifyEmbedUrl && (
          <div className="glass p-6 rounded-sm mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">האזן לפרק</h2>
            <div className="aspect-[3/1] rounded-sm overflow-hidden">
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
          <div className="glass p-6 rounded-sm">
            <h2 className="text-2xl font-bold text-white mb-4">האזן בפלטפורמות אחרות</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              <a
                href={episode.audioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-4 rounded-sm glass-hover flex items-center justify-center"
                aria-label="Spotify"
              >
                <SpotifyIcon className="w-8 h-8" />
              </a>
              <a
                href="https://podcasts.apple.com/us/podcast/%D7%90%D7%99%D7%9A-%D7%A4%D7%95%D7%AA%D7%A8%D7%99%D7%9D-%D7%90%D7%AA-%D7%96%D7%94/id1750929970"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-4 rounded-sm glass-hover flex items-center justify-center"
                aria-label="Apple Podcasts"
              >
                <ApplePodcastsIcon className="w-8 h-8 text-white/80" />
              </a>
              <a
                href="https://music.youtube.com/playlist?list=PLkPsVtA1_TZ_iuvlbCTHa4gmWl4vXdp89"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-4 rounded-sm glass-hover flex items-center justify-center"
                aria-label="YouTube Music"
              >
                <YouTubeMusicIcon className="w-8 h-8 text-[#FF0000]" />
              </a>
              <a
                href="https://www.youtube.com/@howtosolvethis"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-4 rounded-sm glass-hover flex items-center justify-center"
                aria-label="YouTube"
              >
                <YouTubeIcon className="w-8 h-8 text-[#FF0000]" />
              </a>
              <a
                href="https://pocketcasts.com/podcast/%D7%90%D7%99%D7%9A-%D7%A4%D7%95%D7%AA%D7%A8%D7%99%D7%9D-%D7%90%D7%AA-%D7%96%D7%94/1c570bc0-073c-013d-0d1e-0243b8a24f53"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-4 rounded-sm glass-hover flex items-center justify-center"
                aria-label="Pocket Casts"
              >
                <PocketCastsIcon className="w-8 h-8 text-[#F43E37]" />
              </a>
              <a
                href="https://castbox.fm/channel/id6193220?country=us"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-4 rounded-sm glass-hover flex items-center justify-center"
                aria-label="Castbox"
              >
                <CastboxIcon className="w-8 h-8 text-[#F55B23]" />
              </a>
            </div>
          </div>
        )}
      </article>

      <Footer />
    </>
  );
}
