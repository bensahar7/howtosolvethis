"use client";

/**
 * LinkedIn Badge Component
 * Pill-shaped badge with centered text
 * Styled with glassmorphism for atmospheric design
 */

import { trackEvent } from "@/lib/logger";

export default function LinkedInBadge() {
  const handleClick = () => {
    trackEvent("linkedin_badge_click", {
      target: "ben_sahar_profile",
      component: "LinkedInBadge",
    });
  };

  return (
    <div className="flex justify-center my-12">
      <a
        href="https://www.linkedin.com/in/ben-sahar/"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="glass glass-hover inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full transition-all duration-300 group"
        aria-label="Ben Sahar on LinkedIn"
      >
        {/* Text content (centered) */}
        <span className="technical-text text-white text-sm whitespace-nowrap">
          Ben Sahar
        </span>
        <span className="text-white/40">|</span>
        <span className="technical-text text-white/70 text-sm whitespace-nowrap">
          LinkedIn
        </span>
      </a>
    </div>
  );
}
