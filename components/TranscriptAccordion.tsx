"use client";
import { useRef } from "react";
import { trackTranscriptOpened } from "@/lib/analytics";

interface TranscriptAccordionProps {
  transcript: string;
  episodeTitle: string;
  episodeNumber?: number;
}

export default function TranscriptAccordion({
  transcript,
  episodeTitle,
  episodeNumber,
}: TranscriptAccordionProps) {
  const tracked = useRef(false);

  return (
    <section className="glass p-6 md:p-12 rounded-sm mb-6 md:mb-8">
      {/* Native <details> — Google indexes content inside <details> elements */}
      <details
        onToggle={(e) => {
          if (
            (e.target as HTMLDetailsElement).open &&
            !tracked.current &&
            episodeNumber != null
          ) {
            tracked.current = true;
            trackTranscriptOpened(episodeNumber);
          }
        }}
      >
        <summary className="w-full flex items-center justify-between cursor-pointer list-none [&::-webkit-details-marker]:hidden mb-4 md:mb-6 group">
          <div>
            <p className="technical-text text-[10px] md:text-xs text-white/60 mt-1 md:mt-2">
              FULL TRANSCRIPT
            </p>
          </div>

          {/* Chevron Icon - rotates when open */}
          <svg
            className="w-7 h-7 md:w-6 md:h-6 text-white/80 transition-transform duration-300 flex-shrink-0 details-chevron"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>

        <div className="pt-4 md:pt-6 border-t border-white/10">
          <div
            className="text-white/80 text-sm md:text-base leading-relaxed whitespace-pre-wrap font-mono"
            dir="rtl"
          >
            {transcript}
          </div>
        </div>
      </details>

      {/* HUD reference line at bottom */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="technical-text text-xs text-white/40">
          EPISODE: {episodeTitle}
        </div>
      </div>
    </section>
  );
}
