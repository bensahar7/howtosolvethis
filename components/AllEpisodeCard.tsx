"use client";

import Image from "next/image";
import Link from "next/link";
import { EnrichedEpisode } from "@/types/episode";
import { episodePath } from "@/lib/episode-url";
import { trackEpisodeCardClick } from "@/lib/analytics";

interface AllEpisodeCardProps {
  episode: EnrichedEpisode;
  index: number;
}

// Strip HTML/markdown so the 2-line summary reads as clean Hebrew prose.
function cleanDescription(text: string): string {
  return (text ?? "")
    .replace(/<\/?p>/gi, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/\*\*\*|\*\*|\*/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function AllEpisodeCard({ episode, index }: AllEpisodeCardProps) {
  const episodeUrl = episodePath(episode);
  const summary = cleanDescription(episode.description);
  const formattedDate = new Date(episode.pubDate).toLocaleDateString("he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // All three links in this card lead to the same episode page.
  const handleClick = () =>
    trackEpisodeCardClick(
      episode.episodeNumber ?? index + 1,
      episode.title,
      "episodes_list"
    );

  return (
    <article className="glass glass-hover rounded-sm overflow-hidden group flex items-center gap-4 md:gap-6 p-3 md:p-4">
      {/* Thumbnail (right in RTL) — links to the episode page */}
      <Link
        href={episodeUrl}
        onClick={handleClick}
        className="relative w-24 h-24 md:w-36 md:h-36 flex-shrink-0 overflow-hidden rounded-sm"
      >
        <Image
          src={episode.imageUrl}
          alt={`תמונת עטיפה לפרק: ${episode.title}`}
          fill
          className="object-cover transition-all duration-300"
          sizes="(max-width: 768px) 96px, 144px"
          priority={index < 4}
          loading={index < 6 ? "eager" : "lazy"}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        />
      </Link>

      {/* Content (middle, grows) */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        {/* Episode number + date */}
        <div className="technical-text text-white/50 text-[10px] mb-1.5 flex items-center gap-2">
          <span>פרק {episode.episodeNumber || index + 1}</span>
          <span className="text-white/25">•</span>
          <time dateTime={episode.pubDate}>{formattedDate}</time>
        </div>

        {/* Title */}
        <h2 className="text-lg md:text-2xl font-bold text-white mb-1.5 md:mb-2 leading-snug line-clamp-1">
          <Link
            href={episodeUrl}
            onClick={handleClick}
            className="group-hover:text-blue-300 transition-colors"
          >
            {episode.title}
          </Link>
        </h2>

        {/* 2-line summary, truncated with ellipsis */}
        <p className="body-text text-sm md:text-base text-white/70 leading-relaxed line-clamp-2">
          {summary}
        </p>
      </div>

      {/* Play button (left in RTL) */}
      <Link
        href={episodeUrl}
        onClick={handleClick}
        aria-label={`האזן לפרק: ${episode.title}`}
        className="glass glass-hover flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full text-white hover:text-[#1ed760] transition-colors"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6 ms-0.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </Link>
    </article>
  );
}
