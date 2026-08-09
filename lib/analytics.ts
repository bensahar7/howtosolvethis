/**
 * Analytics event wrappers for PostHog and GA4.
 */

import posthog from "posthog-js";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const trackEvent = (action: string, params: Record<string, unknown> = {}) => {
  if (
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
    process.env.NEXT_PUBLIC_POSTHOG_HOST
  ) {
    posthog.capture(action, params);
  }

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
  trackEvent("listen_platform_clicked", {
    platform,
    location,
    episode_number: episodeNumber,
  });

export const trackEpisodeCardClick = (
  episodeNumber: number,
  episodeTitle: string,
  location: string
) =>
  trackEvent("episode_card_clicked", {
    episode_number: episodeNumber,
    episode_title: episodeTitle,
    location,
  });

export const trackTranscriptOpened = (episodeNumber: number) =>
  trackEvent("transcript_opened", { episode_number: episodeNumber });

export const trackNewsletterClick = (location: string) =>
  trackEvent("newsletter_clicked", { location });

export const trackSocialClick = (platform: string, location: string) =>
  trackEvent("social_clicked", { platform, location });

export const trackCompanyLinkClick = (companyName: string) =>
  trackEvent("company_link_clicked", { company_name: companyName });

export const trackEpisodeShared = (shareMethod: "whatsapp" | "linkedin" | "copy_link") =>
  trackEvent("episode_shared", { share_method: shareMethod });
