"use client";

/**
 * LinkedIn Badge Component
 * Pill-shaped badge with centered text
 * Styled with glassmorphism for atmospheric design
 */

import { trackEvent } from "@/lib/logger";

export default function LinkedInBadge() {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/732c9a20-d459-4eb0-9038-49ff5920b402',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'LinkedInBadge.tsx:12',message:'LinkedInBadge component rendering',data:{timestamp:new Date().toISOString()},timestamp:Date.now(),hypothesisId:'H1'})}).catch(()=>{});
  // #endregion

  const handleClick = () => {
    trackEvent("linkedin_badge_click", {
      target: "ben_sahar_profile",
      component: "LinkedInBadge",
    });
  };

  return (
    <div className="flex justify-center items-center gap-4 my-12">
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

      {/* X (Twitter) Icon */}
      <a
        href="https://x.com/bensahar"
        target="_blank"
        rel="noopener noreferrer"
        className="glass glass-hover p-3 rounded-full transition-all duration-300"
        aria-label="Ben Sahar on X (Twitter)"
        onClick={() => {
          // #region agent log
          fetch('http://127.0.0.1:7243/ingest/732c9a20-d459-4eb0-9038-49ff5920b402',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'LinkedInBadge.tsx:47',message:'X icon clicked',data:{href:'https://x.com/bensahar'},timestamp:Date.now(),hypothesisId:'H4'})}).catch(()=>{});
          // #endregion
        }}
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
    </div>
  );
}
