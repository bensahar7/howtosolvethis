/**
 * Analytics — GA4 thin wrapper.
 * No-ops when NEXT_PUBLIC_GA_MEASUREMENT_ID is unset or running on the server.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const fire = (action: string, params: Record<string, unknown> = {}) => {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", action, params);
};

export const pageview = (url: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) return;
  window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
};

export const trackListenPlatform = (
  platform: string,
  location: string,
  episodeNumber?: number
) =>
  fire("listen_platform_clicked", {
    platform,
    location,
    episode_number: episodeNumber,
  });

export const trackEpisodeCardClick = (
  episodeNumber: number,
  episodeTitle: string,
  location: string
) =>
  fire("episode_card_clicked", {
    episode_number: episodeNumber,
    episode_title: episodeTitle,
    location,
  });

export const trackTranscriptOpened = (episodeNumber: number) =>
  fire("transcript_opened", { episode_number: episodeNumber });

export const trackNewsletterClick = (location: string) =>
  fire("newsletter_clicked", { location });

export const trackSocialClick = (platform: string, location: string) =>
  fire("social_clicked", { platform, location });

export const trackCompanyLinkClick = (
  companyName: string,
  episodeNumber: number
) =>
  fire("company_link_clicked", {
    company_name: companyName,
    episode_number: episodeNumber,
  });
