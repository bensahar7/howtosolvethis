"use client";
import Image from "next/image";

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
  if (!companyName) return null;

  const logoPath = companyLogo && episodeFolderName
    ? `/Context/Episodes/${episodeFolderName}/${companyLogo}`
    : null;

  return (
    <section className="glass p-6 md:p-12 rounded-sm mb-6 md:mb-8">
      {/* Stack vertically on mobile, horizontal on desktop */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
        {/* Company Logo - Circular Glass Container */}
        {logoPath && (
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
            <div className="absolute inset-0 glass rounded-full border border-white/20 overflow-hidden">
              <Image
                src={logoPath}
                alt={`${companyName} logo`}
                fill
                className="object-contain p-3 md:p-4"
                sizes="(max-width: 768px) 96px, 128px"
              />
            </div>
          </div>
        )}

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

          {/* Company Website Button - Full width on mobile */}
          {companyWebsite && (
            <a
              href={companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full md:w-auto items-center justify-center gap-2 glass px-6 py-3 rounded-sm transition-all duration-300 hover:scale-105 min-h-[48px]"
              style={{ boxShadow: "0 0 20px rgba(255,255,255,0)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 20px rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 20px rgba(255,255,255,0)";
              }}
            >
              <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="text-white text-sm">בקר באתר החברה</span>
            </a>
          )}
        </div>
      </div>

      {/* Thin HUD reference line */}
      <div className="mt-8 pt-8 border-t border-white/10">
        <div className="technical-text text-xs text-white/40">
          COMPANY PROFILE
        </div>
      </div>
    </section>
  );
}
