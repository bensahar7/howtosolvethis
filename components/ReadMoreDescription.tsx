"use client";
import { useState, useRef, useEffect } from "react";

interface ReadMoreDescriptionProps {
  content: string;
  maxLines?: number;
}

export default function ReadMoreDescription({
  content,
  maxLines = 3,
}: ReadMoreDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Clean markdown formatting from content
  const cleanContent = (text: string): string => {
    return text
      .replace(/<\/?p>/gi, '\n\n')          // Convert <p> tags to line breaks
      .replace(/<br\s*\/?>/gi, '\n')        // Convert <br> to line breaks
      .replace(/<\/?strong>/gi, '')         // Remove <strong> tags
      .replace(/<\/?em>/gi, '')             // Remove <em> tags
      .replace(/<\/?b>/gi, '')              // Remove <b> tags
      .replace(/<\/?i>/gi, '')              // Remove <i> tags
      .replace(/<\/?[^>]+(>|$)/g, '')       // Remove any remaining HTML tags
      .replace(/\*\*\*/g, '')               // Remove triple asterisks
      .replace(/\*\*/g, '')                 // Remove double asterisks (bold)
      .replace(/\*/g, '')                   // Remove single asterisks (italic)
      .replace(/\n{3,}/g, '\n\n')           // Max 2 consecutive line breaks
      .trim();
  };

  const cleanedContent = cleanContent(content);

  useEffect(() => {
    if (contentRef.current) {
      const lineHeight = parseInt(getComputedStyle(contentRef.current).lineHeight);
      const maxHeight = lineHeight * maxLines;
      const actualHeight = contentRef.current.scrollHeight;
      setIsOverflowing(actualHeight > maxHeight);
    }
  }, [cleanedContent, maxLines]);

  return (
    <div>
      <div
        ref={contentRef}
        className={`text-white/80 text-base md:text-lg leading-relaxed transition-all duration-300 whitespace-pre-wrap ${
          isExpanded ? "" : `line-clamp-${maxLines}`
        }`}
        style={{ wordBreak: 'break-word' }}
      >
        {cleanedContent}
      </div>
      
      {isOverflowing && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-all duration-200"
          aria-label={isExpanded ? "הצג פחות" : "קרא עוד"}
        >
          <span className="technical-text">
            {isExpanded ? "הצג פחות" : "קרא עוד"}
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
    </div>
  );
}
