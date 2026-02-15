"use client";

import Image from "next/image";
import { EnrichedEpisode } from "@/types/episode";
import { useState, useRef, useEffect } from "react";
import SpotifyIcon from "./SpotifyIcon";
import {
  ApplePodcastsIcon,
  YouTubeIcon,
  YouTubeMusicIcon,
  GooglePodcastsIcon,
  SnipdIcon,
  PocketCastsIcon,
  CastboxIcon,
} from "./PodcastIcons";
import { trackEvent } from "@/lib/logger";

interface EpisodeCardProps {
  episode: EnrichedEpisode;
  index: number;
}

export default function EpisodeCard({ episode, index }: EpisodeCardProps) {
  const [showPlayer, setShowPlayer] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const metadata = episode.metadata;

  // Debug: Log if metadata is missing
  if (!metadata) {
    console.warn(`[EPISODE CARD] No metadata for episode: "${episode.title}" (Episode #${episode.episodeNumber})`);
  }

  // Construct Spotify embed URL if we have an episode ID
  const spotifyEmbedUrl = episode.spotifyEpisodeId
    ? `https://open.spotify.com/embed/episode/${episode.spotifyEpisodeId}?utm_source=generator&theme=0`
    : null;

  // Check if description overflows
  useEffect(() => {
    if (descriptionRef.current) {
      const element = descriptionRef.current;
      const isContentOverflowing = element.scrollHeight > element.clientHeight;
      setIsOverflowing(isContentOverflowing);
    }
  }, [episode.description]);

  // Handle expand/collapse
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    trackEvent("episode_description_toggle", {
      episodeNumber: episode.episodeNumber,
      action: isExpanded ? "collapse" : "expand",
    });
  };

  // Handle Spotify player open
  const handlePlayerOpen = () => {
    setShowPlayer(true);
    trackEvent("spotify_player_open", {
      episodeNumber: episode.episodeNumber,
      episodeTitle: episode.title,
    });
  };

  return (
    <article className="glass glass-hover rounded-sm overflow-hidden group relative flex flex-col h-full">
      {/* Episode Image with Grayscale Filter */}
      <div className="relative aspect-video overflow-hidden flex-shrink-0">
        <Image
          src={episode.imageUrl}
          alt={`תמונת עטיפה לפרק: ${episode.title}`}
          fill
          className="object-cover img-grayscale-default"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 2}
        />
        
        {/* Episode Number Badge - HUD Style */}
        <div className="absolute top-4 right-4 glass px-3 py-1 rounded-sm">
          <span className="technical-text">EP {episode.episodeNumber || index + 1}</span>
        </div>

        {/* Spotify Player Overlay */}
        {showPlayer && spotifyEmbedUrl && (
          <div className="absolute inset-0 bg-black/90 p-4 flex items-center justify-center">
            <div className="w-full h-full">
              <iframe
                src={spotifyEmbedUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-sm"
              />
            </div>
            {/* Close Button */}
            <button
              onClick={() => setShowPlayer(false)}
              className="absolute top-2 left-2 glass p-2 rounded-sm text-white hover:bg-white/20 transition-colors"
              aria-label="סגור נגן"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Sector Tag - Hebrew Label */}
        {metadata?.sector && (
          <div className="mb-3">
            <span className="technical-text text-white/40 text-[10px]">תחום</span>
            <span className="text-white/80 text-sm ms-2">{metadata.sector}</span>
          </div>
        )}

        {/* Episode Title */}
        <h3 className="text-xl font-bold text-white mb-3 leading-snug">
          {episode.title}
        </h3>

        {/* Description Container with Fixed Height */}
        <div className="relative mb-4 flex-1">
          {/* Description - Collapsible with max height */}
          <div 
            ref={descriptionRef}
            className={`body-text text-sm text-white/80 leading-relaxed prose prose-invert prose-sm max-w-none overflow-hidden transition-all duration-300 ${
              isExpanded ? "max-h-none" : "max-h-[120px]"
            }`}
            dangerouslySetInnerHTML={{ __html: episode.description }}
          />
          
          {/* Gradient Fade Effect (only when collapsed and overflowing) */}
          {!isExpanded && isOverflowing && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
          )}
          
          {/* Expand/Collapse Button */}
          {isOverflowing && (
            <button
              onClick={handleToggleExpand}
              className="mt-3 flex items-center gap-2 text-white/90 hover:text-white transition-all duration-300 text-sm group/expand glass px-4 py-2 rounded-sm w-fit"
              aria-label={isExpanded ? "הצג פחות" : "הצג עוד"}
            >
              <span className="technical-text">
                {isExpanded ? "הצג פחות" : "קרא עוד"}
              </span>
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Podcast Platforms - All Equal Size */}
        {episode.audioUrl && (
          <div className="mb-4 mt-auto">
            <div className="grid grid-cols-6 gap-2">
              {/* Spotify */}
              {spotifyEmbedUrl ? (
                <button
                  onClick={handlePlayerOpen}
                  className="glass p-3 rounded-sm glass-hover flex items-center justify-center"
                  aria-label="Spotify"
                >
                  <SpotifyIcon className="w-6 h-6" />
                </button>
              ) : (
                <a
                  href={episode.audioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-3 rounded-sm glass-hover flex items-center justify-center"
                  aria-label="Spotify"
                  onClick={() =>
                    trackEvent("podcast_platform_click", {
                      platform: "spotify",
                      episodeNumber: episode.episodeNumber,
                    })
                  }
                >
                  <SpotifyIcon className="w-6 h-6" />
                </a>
              )}

              {/* Apple Podcasts */}
              <a
                href="https://podcasts.apple.com/us/podcast/%D7%90%D7%99%D7%9A-%D7%A4%D7%95%D7%AA%D7%A8%D7%99%D7%9D-%D7%90%D7%AA-%D7%96%D7%94/id1750929970"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-3 rounded-sm glass-hover flex items-center justify-center"
                aria-label="Apple Podcasts"
                onClick={() =>
                  trackEvent("podcast_platform_click", {
                    platform: "apple_podcasts",
                    episodeNumber: episode.episodeNumber,
                  })
                }
              >
                <ApplePodcastsIcon className="w-6 h-6 text-white/80" />
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@howtosolvethis"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-3 rounded-sm glass-hover flex items-center justify-center"
                aria-label="YouTube"
                onClick={() =>
                  trackEvent("podcast_platform_click", {
                    platform: "youtube",
                    episodeNumber: episode.episodeNumber,
                  })
                }
              >
                <YouTubeIcon className="w-6 h-6 text-[#FF0000]" />
              </a>

              {/* Snipd */}
              <a
                href={`https://share.snipd.com/episode/${episode.spotifyEpisodeId || episode.guid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-3 rounded-sm glass-hover flex items-center justify-center"
                aria-label="Snipd"
                onClick={() =>
                  trackEvent("podcast_platform_click", {
                    platform: "snipd",
                    episodeNumber: episode.episodeNumber,
                  })
                }
              >
                <SnipdIcon className="w-6 h-6 text-white/80" />
              </a>

              {/* YouTube Music */}
              <a
                href="https://music.youtube.com/playlist?list=PLkPsVtA1_TZ_iuvlbCTHa4gmWl4vXdp89"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-3 rounded-sm glass-hover flex items-center justify-center"
                aria-label="YouTube Music"
                onClick={() =>
                  trackEvent("podcast_platform_click", {
                    platform: "youtube_music",
                    episodeNumber: episode.episodeNumber,
                  })
                }
              >
                <YouTubeMusicIcon className="w-6 h-6 text-[#FF0000]" />
              </a>

              {/* Pocket Casts */}
              <a
                href="https://pocketcasts.com/podcast/%D7%90%D7%99%D7%9A-%D7%A4%D7%95%D7%AA%D7%A8%D7%99%D7%9D-%D7%90%D7%AA-%D7%96%D7%94/1c570bc0-073c-013d-0d1e-0243b8a24f53"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-3 rounded-sm glass-hover flex items-center justify-center"
                aria-label="Pocket Casts"
                onClick={() =>
                  trackEvent("podcast_platform_click", {
                    platform: "pocket_casts",
                    episodeNumber: episode.episodeNumber,
                  })
                }
              >
                <PocketCastsIcon className="w-6 h-6 text-[#F43E37]" />
              </a>

              {/* Castbox */}
              <a
                href="https://castbox.fm/channel/id6193220?country=us"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-3 rounded-sm glass-hover flex items-center justify-center"
                aria-label="Castbox"
                onClick={() =>
                  trackEvent("podcast_platform_click", {
                    platform: "castbox",
                    episodeNumber: episode.episodeNumber,
                  })
                }
              >
                <CastboxIcon className="w-6 h-6 text-[#F55B23]" />
              </a>
            </div>
          </div>
        )}

        {/* Metadata Footer - HUD Lines - Hebrew Labels */}
        <div className="flex items-center gap-6 pt-6 border-t border-white/10">
          {/* Guests - Show TBD if no metadata */}
          <div className="flex-1">
            <div className="technical-text text-[10px] mb-1.5">אורחים</div>
            <div className="text-white/80 text-xs truncate">
              {metadata?.guests && metadata.guests.length > 0
                ? metadata.guests.join(", ")
                : "TBD"}
            </div>
          </div>
          <div className="hud-line-vertical h-10" />

          {/* Date */}
          <div>
            <div className="technical-text text-[10px] mb-1.5">תאריך</div>
            <div className="text-white/80 text-xs">
              {new Date(episode.pubDate).toLocaleDateString("he-IL", {
                year: "numeric",
                month: "short",
              })}
            </div>
          </div>
        </div>

        {/* Keywords Tags - Hebrew Label: תגיות */}
        {metadata?.keywords && metadata.keywords.length > 0 && (
          <div className="mt-6">
            <div className="technical-text text-[10px] mb-2.5 text-white/60">
              תגיות
            </div>
            <div className="flex flex-wrap gap-2" dir="rtl">
              {metadata.keywords.slice(0, 3).map((keyword, i) => {
                // Check if keyword is bilingual object or legacy string
                const isBilingual = typeof keyword === 'object' && 'en' in keyword && 'he' in keyword;
                
                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-default"
                    style={{
                      boxShadow: "0 0 10px rgba(255,255,255,0.1)",
                    }}
                  >
                    {isBilingual ? (
                      <>
                        <span className="text-white font-medium">{keyword.he}</span>
                        <span className="text-white/40">/</span>
                        <span className="text-white/60 font-mono text-[10px] uppercase tracking-wider">
                          {keyword.en}
                        </span>
                      </>
                    ) : (
                      <span className="technical-text text-xs text-white/80">
                        {keyword}
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
