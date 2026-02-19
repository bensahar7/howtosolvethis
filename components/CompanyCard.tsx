"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CompanyInfo } from "@/types/episode";

interface CompanyCardProps {
  company: CompanyInfo;
  index?: number; // For staggered animations
}

/**
 * CompanyCard Component
 * Single company card with logo, guest info, and website link
 * Used in multi-company grid layouts
 */
export default function CompanyCard({ company, index = 0 }: CompanyCardProps) {
  const [imageError, setImageError] = useState(false);

  // Map logo filenames to public folder paths
  const logoMapping: Record<string, string> = {
    // Generic filenames (for multi-company episodes)
    "logo.jpeg": "/logos/oshi.jpeg",
    "logo.png": "/logos/polymertal.png",
    "logo1.jpeg": "/logos/beehero.png",
    "logo1.png": "/logos/beehero.png",
    "logo2.jpeg": "/logos/tobee.jpg",
    "logo2.jpg": "/logos/tobee.jpg",
    // Specific filenames (for newer episodes with descriptive names)
    "greeneye.png": "/logos/greeneye.png",
    "textre.jpeg": "/logos/textre.jpg",
    "rewind.jpg": "/logos/rewind.jpg",
    "salicrop.jpg": "/logos/salicrop.jpg",
  };

  const logoPath =
    company.logo && logoMapping[company.logo]
      ? logoMapping[company.logo]
      : company.logo 
        ? `/logos/${company.logo}` // Fallback: try direct path construction
        : null;

  return (
    <div
      className="glass p-6 md:p-8 rounded-sm transition-all duration-300 hover:scale-[1.02] h-full flex flex-col"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Company Logo */}
      <div className="flex justify-center mb-6">
        {logoPath && !imageError ? (
          <div className="relative w-24 h-24 md:w-28 md:h-28">
            <div className="absolute inset-0 glass rounded-full border border-white/20 overflow-hidden bg-white/5">
              <Image
                src={logoPath}
                alt={`${company.name} logo`}
                fill
                className="object-contain p-3 md:p-4"
                sizes="(max-width: 768px) 96px, 112px"
                onError={() => setImageError(true)}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
              />
            </div>
          </div>
        ) : (
          // Fallback: First letter
          <div className="relative w-24 h-24 md:w-28 md:h-28">
            <div className="absolute inset-0 glass rounded-full border border-white/20 flex items-center justify-center bg-white/5">
              <span className="text-3xl md:text-4xl font-bold text-white/90">
                {company.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Company Name */}
      <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-4">
        {company.name}
      </h3>

      {/* Focus Area (if provided) */}
      {company.focus && (
        <div className="mb-4 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 technical-text">
            {company.focus}
          </span>
        </div>
      )}

      {/* Guest Info */}
      <div className="mb-6 flex-1">
        <div className="technical-text text-xs text-white/60 mb-2 text-center">
          אורח
        </div>
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-white text-sm md:text-base font-medium text-center">
            {company.guestName}
          </span>
          {company.guestLinkedIn && (
            <Link
              href={company.guestLinkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-2 rounded-sm transition-all duration-300 hover:scale-110 active:scale-95"
              style={{ boxShadow: "0 0 20px rgba(255,255,255,0)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(255,255,255,0)";
              }}
              aria-label={`LinkedIn profile of ${company.guestName}`}
            >
              <svg
                className="w-4 h-4 text-white/80"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </Link>
          )}
        </div>
        {company.guestTitle && (
          <p className="text-white/60 text-xs md:text-sm text-center">
            {company.guestTitle}
          </p>
        )}
      </div>

      {/* Website Button */}
      {company.website && (
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 glass px-4 py-3 rounded-sm transition-all duration-300 hover:scale-105 active:scale-95 min-h-[48px]"
          style={{ boxShadow: "0 0 20px rgba(255,255,255,0)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 20px rgba(255,255,255,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 0 20px rgba(255,255,255,0)";
          }}
        >
          <svg
            className="w-5 h-5 text-white/80"
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
          {/* רק האיקון, בלי טקסט */}
        </a>
      )}
    </div>
  );
}
