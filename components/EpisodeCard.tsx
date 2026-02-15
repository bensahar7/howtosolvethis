"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { EnrichedEpisode } from "@/types/episode";
import { useState, useRef, useEffect } from "react";
import SpotifyIcon from "./SpotifyIcon";
import { ApplePodcastsIcon, YouTubeMusicIcon, PocketCastsIcon } from "./PodcastIcons";

interface EpisodeCardProps {
  episode: EnrichedEpisode;
  index: number;
}

export default function EpisodeCard({ episode, index }: EpisodeCardProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const metadata = episode.metadata;

  // Check if description overflows
  useEffect(() => {
    if (descriptionRef.current) {
      const element = descriptionRef.current;
      const isContentOverflowing = element.scrollHeight > element.clientHeight;
      setIsOverflowing(isContentOverflowing);
    }
  }, [episode.description]);

  const handleCardClick = () => {
    router.push(`/episodes/${episode.episodeNumber}`);
  };

  return (
    <article 
      onClick={handleCardClick}
      className="glass glass-hover rounded-sm overflow-hidden group relative flex flex-col h-full cursor-pointer transition-all duration-300 hover:scale-[1.02]"
    >
        {/* Episode Image with Grayscale Filter */}
        <div className="relative aspect-video overflow-hidden flex-shrink-0">
          <Image
            src={episode.imageUrl}
            alt={`תמונת עטיפה לפרק: ${episode.title}`}
            fill
            className="object-cover img-grayscale-default group-hover:filter-none transition-all duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 2}
          />
          
          {/* Episode Number Badge - HUD Style */}
          <div className="absolute top-4 right-4 glass px-3 py-1 rounded-sm">
            <span className="technical-text">EP {episode.episodeNumber || index + 1}</span>
          </div>
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
          <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-blue-300 transition-colors">
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
          </div>

          {/* Metadata Footer - HUD Lines - Hebrew Labels */}
          <div className="flex items-center gap-6 pt-6 border-t border-white/10 mt-auto">
            {/* Guests - Show TBD if no metadata */}
            <div className="flex-1">
              <div className="technical-text text-[10px] mb-1.5">אורחים</div>
              <div className="text-white/80 text-xs truncate">
                {metadata?.guests && metadata.guests.length > 0
                  ? metadata.guests.join(", ")
                  : "TBD"}
              </div>
            </div>

            <div className="hud-line-vertical h-8" />

            {/* Date */}
            <div className="flex-1">
              <div className="technical-text text-[10px] mb-1.5">תאריך</div>
              <div className="text-white/80 text-xs">
                {new Date(episode.pubDate).toLocaleDateString("he-IL", {
                  month: "short",
                  year: "numeric",
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
              <div className="flex flex-wrap gap-2">
                {metadata.keywords.slice(0, 3).map((keyword, i) => (
                  <span
                    key={i}
                    className="technical-text text-xs px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white/80 hover:bg-white/20 transition-all duration-300 cursor-default"
                    style={{
                      boxShadow: "0 0 10px rgba(255,255,255,0.1)",
                    }}
                  >
                    {typeof keyword === 'string' ? keyword : keyword.he}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Platform Icons - Listen Now */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="technical-text text-[10px] mb-3 text-white/60">
              האזן עכשיו
            </div>
            <div className="flex gap-2">
              {/* Spotify */}
              <a
                href={episode.spotifyEpisodeId 
                  ? `https://open.spotify.com/episode/${episode.spotifyEpisodeId}` 
                  : `https://open.spotify.com/show/1ddFDGd1vH4UWIlfGjhS2Y`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-2 rounded-sm glass-hover flex-1 flex items-center justify-center"
                aria-label="Spotify"
                onClick={(e) => e.stopPropagation()}
              >
                <SpotifyIcon className="w-5 h-5" />
              </a>

              {/* Apple Podcasts */}
              <a
                href="https://podcasts.apple.com/us/podcast/%D7%90%D7%99%D7%9A-%D7%A4%D7%95%D7%AA%D7%A8%D7%99%D7%9D-%D7%90%D7%AA-%D7%96%D7%94/id1750929970"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-2 rounded-sm glass-hover flex-1 flex items-center justify-center"
                aria-label="Apple Podcasts"
                onClick={(e) => e.stopPropagation()}
              >
                <ApplePodcastsIcon className="w-5 h-5 text-white/80" />
              </a>

              {/* YouTube Music */}
              <a
                href="https://music.youtube.com/playlist?list=PLkPsVtA1_TZ_iuvlbCTHa4gmWl4vXdp89"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-2 rounded-sm glass-hover flex-1 flex items-center justify-center"
                aria-label="YouTube Music"
                onClick={(e) => e.stopPropagation()}
              >
                <YouTubeMusicIcon className="w-5 h-5 text-[#FF0000]" />
              </a>

              {/* Pocket Casts */}
              <a
                href="https://pocketcasts.com/podcast/%D7%90%D7%99%D7%9A-%D7%A4%D7%95%D7%AA%D7%A8%D7%99%D7%9D-%D7%90%D7%AA-%D7%96%D7%94/1c570bc0-073c-013d-0d1e-0243b8a24f53"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-2 rounded-sm glass-hover flex-1 flex items-center justify-center"
                aria-label="Pocket Casts"
                onClick={(e) => e.stopPropagation()}
              >
                <PocketCastsIcon className="w-5 h-5 text-[#F43E37]" />
              </a>
            </div>
          </div>
        </div>
      </article>
  );
}
