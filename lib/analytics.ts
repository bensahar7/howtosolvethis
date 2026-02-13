/**
 * Analytics Utilities
 * Google Analytics 4 integration (optional)
 */

// Type definitions for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Track page views
export const pageview = (url: string) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (!window.gtag) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track Spotify plays
export const trackSpotifyPlay = (episodeNumber: number, episodeTitle: string) => {
  event({
    action: "play_episode",
    category: "Engagement",
    label: `Episode ${episodeNumber}: ${episodeTitle}`,
    value: episodeNumber,
  });
};

// Track newsletter signups
export const trackNewsletterSignup = () => {
  event({
    action: "newsletter_signup",
    category: "Conversion",
    label: "Substack Newsletter",
  });
};
