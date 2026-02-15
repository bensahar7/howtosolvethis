"use client";

import { CompanyInfo } from "@/types/episode";
import CompanyCard from "./CompanyCard";

interface MultiCompanySectionProps {
  companies: CompanyInfo[];
}

/**
 * MultiCompanySection Component
 * Displays multiple companies in a responsive grid
 * Automatically adapts: 1 column (mobile), 2 columns (tablet+)
 */
export default function MultiCompanySection({ companies }: MultiCompanySectionProps) {
  if (!companies || companies.length === 0) return null;

  // Single company? Show full-width card
  if (companies.length === 1) {
    return (
      <section className="mb-6 md:mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-6 text-center technical-text">
          החברה המוצגת / Featured Company
        </h3>
        <CompanyCard company={companies[0]} index={0} />
      </section>
    );
  }

  // Multiple companies: Grid layout
  return (
    <section className="mb-6 md:mb-8">
      {/* Section Header */}
      <h3 className="text-xl md:text-2xl font-bold text-white mb-6 text-center technical-text">
        פתרונות בשוק / Market Solutions
      </h3>

      {/* Grid: 1 column on mobile, 2 columns on tablet+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {companies.map((company, index) => (
          <CompanyCard key={company.name} company={company} index={index} />
        ))}
      </div>

      {/* Optional: Comparison Note (if exactly 2 companies) */}
      {companies.length === 2 && (
        <div className="mt-6 p-4 glass rounded-sm border border-white/10">
          <p className="text-white/60 text-xs md:text-sm text-center technical-text">
            שתי החברות מציעות גישות שונות לאותה בעיה / Both companies offer different approaches to the same problem
          </p>
        </div>
      )}
    </section>
  );
}
