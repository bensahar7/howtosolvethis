"use client";

/**
 * LinkedIn Badge Component
 * Pill-shaped badge with profile image, name, and menu icon
 * Styled with glassmorphism for atmospheric design
 */

import Image from "next/image";
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
        className="glass glass-hover inline-flex items-center gap-4 px-6 py-3 rounded-full transition-all duration-300 group"
        aria-label="Ben Sahar on LinkedIn"
      >
        {/* Three-dots menu icon (left side in RTL) */}
        <svg
          className="w-5 h-5 text-white/60 group-hover:text-white/90 transition-colors flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>

        {/* Text content (center) */}
        <div className="flex items-center gap-2">
          <span className="technical-text text-white text-sm whitespace-nowrap">
            Ben Sahar
          </span>
          <span className="text-white/40">|</span>
          <span className="technical-text text-white/70 text-sm whitespace-nowrap">
            LinkedIn
          </span>
        </div>

        {/* Profile image (right side in RTL) */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-white/40 transition-colors flex-shrink-0">
          <Image
            src="https://media.licdn.com/dms/image/v2/D4D03AQGxOltYM8u5Ow/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1718716697019?e=1744848000&v=beta&t=aZQgNJ-8sFPPPQNZfOZnPo5MHjXfKU5qCKQKZPvVFsI"
            alt="Ben Sahar"
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
      </a>
    </div>
  );
}
