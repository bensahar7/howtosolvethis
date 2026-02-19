"use client";
import Image from "next/image";
import { useState } from "react";

interface CompanySectionProps {
  companyName?: string;
  companyWebsite?: string;
  companyLogo?: string;
  sector?: string;
  episodeFolderName?: string;
}

export default function CompanySection({
  companyName,
  companyWebsite,
  companyLogo,
  sector,
  episodeFolderName,
}: CompanySectionProps) {
  const [imageError, setImageError] = useState(false);
  
  if (!companyName) return null;

  // Dynamic logo path construction based on episode folder name
  // This prevents cross-episode contamination where multiple episodes have "logo.png"
  let logoPath: string | null = null;
  
  if (companyLogo && episodeFolderName) {
    // Extract just the extension from companyLogo (e.g., "logo.jpeg" -> "jpeg")
    const extension = companyLogo.split('.').pop() || '';
    
    // Map episode folders to their specific logo files in public/logos/
    // Only include episodes where the logo file actually exists
    const episodeLogoMap: Record<string, string> = {
      'ep2- Salicrop': `/logos/salicrop.jpg`,
      'ep3-daikawood': `/logos/daikawood.png`,
      'ep4-structurepal': `/logos/structurepal.jpg`,
      'ep5-wildfires-firewave': `/logos/firewave.png`,
      'ep6-textile-recycling-textre': `/logos/textre.jpg`,
      'ep7-carbon-rewind': `/logos/rewind.jpg`,
      'ep8-satellite-astrea': `/logos/asterra‏.jpg`,
      'ep10-waste-to-energy-boson': `/logos/boson.jpg`,
      'ep11-foodtech-brevel': `/logos/brevel.png`,
      'ep12-foodtech-oshi': `/logos/oshi.jpeg`,
      'ep13-materials-polymertal': `/logos/polymertal.png`,
      'ep14-blue-tech-econcrete': `/logos/econcrete.png`,
    };
    
    logoPath = episodeLogoMap[episodeFolderName] || null;
  }

  return (
    <section className="glass p-6 md:p-12 rounded-sm mb-6 md:mb-8">
      {/* Section Title at Top */}
      <div className="mb-6 md:mb-8 pb-4 border-b border-white/10">
        <div className="technical-text text-xs text-white/40">
          COMPANY PROFILE
        </div>
      </div>
      
      {/* Stack vertically on mobile, horizontal on desktop */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
        {/* Company Logo - Circular Glass Container */}
        {(logoPath && !imageError) ? (
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
            <div className="absolute inset-0 glass rounded-full border border-white/20 overflow-hidden bg-white/5">
              <Image
                src={logoPath}
                alt={`${companyName} logo`}
                fill
                className="object-contain p-3 md:p-4"
                sizes="(max-width: 768px) 96px, 128px"
                onError={() => setImageError(true)}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
              />
            </div>
          </div>
        ) : companyName ? (
          // Fallback: First letter placeholder
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
            <div className="absolute inset-0 glass rounded-full border border-white/20 flex items-center justify-center">
              <span className="text-4xl md:text-5xl font-bold text-white/90">
                {companyName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        ) : null}

        {/* Company Info - Centered on mobile */}
        <div className="flex-1 text-center md:text-right">
          <div className="technical-text text-xs mb-2">החברה</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{companyName}</h2>
          
          {sector && (
            <div className="mb-4">
              <span className="technical-text text-xs text-white/60">תחום: </span>
              <span className="text-white/80 text-sm">{sector}</span>
            </div>
          )}

          {/* Company Website Icon - Just the globe icon */}
          {companyWebsite && (
            <a
              href={companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center glass p-3 rounded-sm transition-all duration-300 hover:scale-110 active:scale-95"
              style={{ boxShadow: "0 0 20px rgba(255,255,255,0)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 20px rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 20px rgba(255,255,255,0)";
              }}
              aria-label={`Visit ${companyName} website`}
            >
              <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
