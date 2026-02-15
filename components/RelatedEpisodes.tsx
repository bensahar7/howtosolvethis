"use client";
import { EnrichedEpisode } from "@/types/episode";
import Link from "next/link";
import Image from "next/image";

interface RelatedEpisodesProps {
  currentEpisode: EnrichedEpisode;
  allEpisodes: EnrichedEpisode[];
}

export default function RelatedEpisodes({ currentEpisode, allEpisodes }: RelatedEpisodesProps) {
  // Match by sector or keywords
  const relatedEpisodes = allEpisodes
    .filter(ep => ep.episodeNumber !== currentEpisode.episodeNumber)
    .filter(ep => {
      const sameSector = ep.metadata?.sector === currentEpisode.metadata?.sector;
      const hasSharedKeyword = ep.metadata?.keywords?.some(k1 => 
        currentEpisode.metadata?.keywords?.some(k2 => {
          const k1Text = typeof k1 === 'string' ? k1 : k1.he;
          const k2Text = typeof k2 === 'string' ? k2 : k2.he;
          return k1Text === k2Text;
        })
      );
      return sameSector || hasSharedKeyword;
    })
    .slice(0, 3);

  if (relatedEpisodes.length === 0) return null;

  return (
    <section className="glass p-6 md:p-12 rounded-sm mb-6 md:mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-2">פרקים קשורים</h2>
      <p className="technical-text text-[10px] md:text-xs text-white/60 mb-6 md:mb-8">
        RELATED EPISODES — CONTINUE EXPLORING
      </p>
      
      {/* Single column on mobile, 3 columns on tablet+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {relatedEpisodes.map((episode) => (
          <Link
            key={episode.episodeNumber}
            href={`/episodes/${episode.episodeNumber}`}
            className="glass rounded-sm overflow-hidden transition-all duration-300 active:scale-95 lg:hover:scale-105 group"
            style={{ boxShadow: "0 0 20px rgba(255,255,255,0)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 20px rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 20px rgba(255,255,255,0)";
            }}
          >
            <div className="relative aspect-video">
              <Image
                src={episode.imageUrl}
                alt={episode.title}
                fill
                className="object-cover img-grayscale-default group-hover:filter-none transition-all duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-3 md:p-4">
              <div className="technical-text text-xs mb-1 md:mb-2">EP {episode.episodeNumber}</div>
              <h3 className="text-white text-sm font-bold line-clamp-2">
                {episode.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
