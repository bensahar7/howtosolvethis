"use client";
import { BilingualTag as BilingualTagType } from "@/types/episode";

interface BilingualTagProps {
  keyword: string | BilingualTagType;
}

export default function BilingualTag({ keyword }: BilingualTagProps) {
  const isString = typeof keyword === "string";
  const heText = isString ? keyword : keyword.he;
  const enText = isString ? null : keyword.en;

  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-sm glass border border-white/20 transition-all duration-300 hover:border-white/40">
      {/* Hebrew - Bold White */}
      <span className="text-white font-bold text-xs md:text-sm tracking-tight">
        {heText}
      </span>
      
      {/* English - Monospace HUD Style */}
      {enText && (
        <>
          <span className="text-white/20">/</span>
          <span className="text-white/40 text-[10px] md:text-xs font-mono uppercase tracking-wider">
            {enText}
          </span>
        </>
      )}
    </div>
  );
}
