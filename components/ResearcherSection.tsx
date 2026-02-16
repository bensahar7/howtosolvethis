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
         Research Context
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
            
            {/* Facebook Icon */}
            {researcher.facebook && (
              <Link
                href={researcher.facebook}
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
                aria-label={`Facebook profile of ${researcher.name}`}
              >
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
            )}
            
            {/* Instagram Icon */}
            {researcher.instagram && (
              <Link
                href={researcher.instagram}
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
                aria-label={`Instagram profile of ${researcher.name}`}
              >
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
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
        // Academic badge removed as requested
      </div>
    </section>
  );
}
