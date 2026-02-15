"use client";

interface ShareButtonsProps {
  episodeTitle: string;
  episodeUrl: string;
}

export default function ShareButtons({ episodeTitle, episodeUrl }: ShareButtonsProps) {
  const shareToWhatsApp = () => {
    const text = encodeURIComponent(`שווה להאזין: ${episodeTitle}`);
    const url = encodeURIComponent(episodeUrl);
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
  };

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(episodeUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(episodeUrl);
    // TODO: Add toast notification "הקישור הועתק!"
  };

  return (
    <div className="glass p-4 md:p-8 rounded-sm mb-6 md:mb-8">
      <div className="technical-text text-xs mb-3 md:mb-4">שתפו את הפרק</div>
      {/* Stack on mobile, row on larger screens */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* WhatsApp - Primary channel in Israel */}
        <button
          onClick={shareToWhatsApp}
          className="flex-1 glass px-4 py-4 md:py-3 rounded-sm transition-all duration-300 active:scale-95 hover:scale-105 flex items-center justify-center gap-2 min-h-[48px]"
          aria-label="Share on WhatsApp"
        >
          <svg className="w-5 h-5" fill="#25D366" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="text-white text-sm">WhatsApp</span>
        </button>

        {/* LinkedIn */}
        <button
          onClick={shareToLinkedIn}
          className="flex-1 glass px-4 py-4 md:py-3 rounded-sm transition-all duration-300 active:scale-95 hover:scale-105 flex items-center justify-center gap-2 min-h-[48px]"
          aria-label="Share on LinkedIn"
        >
          <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          <span className="text-white text-sm">LinkedIn</span>
        </button>

        {/* Copy Link - Touch-friendly size */}
        <button
          onClick={copyLink}
          className="glass px-4 py-4 md:py-3 rounded-sm transition-all duration-300 active:scale-95 hover:scale-105 min-h-[48px] sm:w-auto w-full"
          aria-label="Copy link"
        >
          <svg className="w-5 h-5 text-white/80 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
