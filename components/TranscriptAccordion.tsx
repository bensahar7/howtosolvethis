"use client";
import { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="glass p-6 md:p-12 rounded-sm mb-6 md:mb-8">
      {/* Header with Toggle */}
      <button
        onClick={() => {
          const next = !isOpen;
          setIsOpen(next);
          if (next && episodeNumber != null) trackTranscriptOpened(episodeNumber);
        }}
        className="w-full flex items-center justify-between mb-4 md:mb-6 group"
        aria-expanded={isOpen}
        aria-controls="transcript-content"
      >
        <div>
          <p className="technical-text text-[10px] md:text-xs text-white/60 mt-1 md:mt-2">
            FULL TRANSCRIPT
          </p>
        </div>
        
        {/* Chevron Icon - Larger on mobile for touch */}
        <svg
          className={`w-7 h-7 md:w-6 md:h-6 text-white/80 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Transcript Content - Server-rendered for SEO, hidden via CSS */}
      <div
        id="transcript-content"
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-[10000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pt-4 md:pt-6 border-t border-white/10">
          <div
            className="text-white/80 text-sm md:text-base leading-relaxed whitespace-pre-wrap font-mono"
            dir="rtl"
          >
            {transcript}
          </div>
        </div>
      </div>

      {/* HUD reference line at bottom */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="technical-text text-xs text-white/40">
          EPISODE: {episodeTitle}
        </div>
      </div>
    </section>
  );
}
