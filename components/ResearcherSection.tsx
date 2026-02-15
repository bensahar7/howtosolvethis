"use client";

import Link from "next/link";
import { ResearcherInfo } from "@/types/episode";

interface ResearcherSectionProps {
  researcher: ResearcherInfo;
  episodeContext?: string; // Optional description of researcher's role in episode
}

/**
 * ResearcherSection Component
 * Displays academic/research guest with distinct styling from company guests
 * Uses full-width layout with scientific/academic aesthetic
 */
export default function ResearcherSection({
  researcher,
  episodeContext,
}: ResearcherSectionProps) {
  return (
    <section className="glass p-6 md:p-10 rounded-sm mb-6 md:mb-8 border-l-4 border-blue-400/30">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-400/10 border border-blue-400/30 flex items-center justify-center">
          <svg
            className="w-4 h-4 md:w-5 md:h-5 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <h3 className="text-lg md:text-xl font-bold text-white/90 technical-text">
          הקשר מדעי / Research Context
        </h3>
      </div>

      {/* Researcher Info */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
        {/* Name and Title */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h4 className="text-xl md:text-2xl font-bold text-white">
              {researcher.name}
            </h4>
            
            {/* LinkedIn Icon */}
            {researcher.linkedIn && (
              <Link
                href={researcher.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-2 rounded-sm transition-all duration-300 hover:scale-110 active:scale-95"
                style={{ boxShadow: "0 0 20px rgba(96, 165, 250, 0)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(96, 165, 250, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(96, 165, 250, 0)";
                }}
                aria-label={`LinkedIn profile of ${researcher.name}`}
              >
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
            )}
            
            {/* Google Scholar Icon */}
            {researcher.googleScholar && (
              <Link
                href={researcher.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-2 rounded-sm transition-all duration-300 hover:scale-110 active:scale-95"
                style={{ boxShadow: "0 0 20px rgba(96, 165, 250, 0)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(96, 165, 250, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(96, 165, 250, 0)";
                }}
                aria-label={`Google Scholar profile of ${researcher.name}`}
              >
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C9.813 0 8 1.813 8 4c0 1.422.75 2.672 1.875 3.375L8.25 9H6v2h2.25l.375 1.5L7.5 13.875C6.672 13.672 6 12.922 6 12c0-.563.188-1.078.5-1.5l-1.406-1.406C4.406 10.016 4 11.016 4 12c0 2.188 1.813 4 4 4 1.422 0 2.672-.75 3.375-1.875L13 15.75V18h2v-2.25l1.5-.375 1.375 1.125C18.672 17.328 20 16.172 20 14.5c0-1.531-1.016-2.828-2.406-3.281l-1.406 1.406C16.578 12.922 17 13.438 17 14c0 .922-.672 1.672-1.5 1.875l-1.125-1.375.375-1.5H17v-2h-2.25l-1.625-1.625C14.25 8.672 15 7.422 15 6c0-2.188-1.813-4-4-4zm0 2c1.109 0 2 .891 2 2s-.891 2-2 2-2-.891-2-2 .891-2 2-2zm-8 8v2h2v-2H4zm16 0v2h2v-2h-2z"/>
                </svg>
              </Link>
            )}
            
            {/* Website/Globe Icon */}
            {researcher.website && (
              <Link
                href={researcher.website}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-2 rounded-sm transition-all duration-300 hover:scale-110 active:scale-95"
                style={{ boxShadow: "0 0 20px rgba(96, 165, 250, 0)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(96, 165, 250, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(96, 165, 250, 0)";
                }}
                aria-label={`Website of ${researcher.name}`}
              >
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </Link>
            )}
          </div>

          {/* Affiliation */}
          {researcher.affiliation && (
            <p className="text-white/70 text-sm md:text-base mb-2 technical-text">
              {researcher.affiliation}
            </p>
          )}

          {/* Episode Context */}
          {episodeContext && (
            <p className="text-white/60 text-sm md:text-base leading-relaxed mt-3">
              {episodeContext}
            </p>
          )}
        </div>

        {/* Visual Indicator (Academic Badge) */}
        <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-sm glass border border-blue-400/20">
          <svg
            className="w-10 h-10 text-blue-400/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 14l9-5-9-5-9 5 9 5z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
