"use client";

interface ReadMoreDescriptionProps {
  content: string;
  maxLines?: number;
}

export default function ReadMoreDescription({
  content,
}: ReadMoreDescriptionProps) {
  // Clean markdown formatting from content
  const cleanContent = (text: string): string => {
    const raw = text ?? "";
    const cleaned = raw
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
      .replace(/&quot;/g, '"')              // Decode &quot; to "
      .replace(/&amp;/g, '&')               // Decode &amp; to &
      .replace(/&lt;/g, '<')                // Decode &lt; to <
      .replace(/&gt;/g, '>')                // Decode &gt; to >
      .replace(/&#39;/g, "'")               // Decode &#39; to '
      .replace(/&nbsp;/g, ' ')              // Decode &nbsp; to space
      .replace(/\n{3,}/g, '\n\n')           // Max 2 consecutive line breaks
      .trim();

    return cleaned;
  };

  const cleanedContent = cleanContent(content);

  // Render full description — no truncation, so Google indexes all text
  return (
    <div
      className="text-white/80 text-base md:text-lg leading-relaxed whitespace-pre-wrap"
      style={{ wordBreak: 'break-word' }}
    >
      {cleanedContent}
    </div>
  );
}
