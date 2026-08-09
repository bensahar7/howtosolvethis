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

export const POSTHOG_ENABLED = Boolean(
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
    process.env.NEXT_PUBLIC_POSTHOG_HOST
);

/**
 * Single funnel for every named event. Sends to PostHog and GA4 so the two
 * never drift apart. Everything client-side should route through here.
 */
export const fire = (action: string, params: Record<string, unknown> = {}) => {
  if (typeof window === "undefined") return;

  if (POSTHOG_ENABLED) {
    posthog.capture(action, params);
  }

  if (!window.gtag) return;
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
  episodeNumber: number | undefined,
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
  episodeNumber?: number
) =>
  fire("company_link_clicked", {
    company_name: companyName,
    episode_number: episodeNumber,
  });

export const trackEpisodeShared = (shareMethod: "whatsapp" | "linkedin" | "copy_link") =>
  fire("episode_shared", { share_method: shareMethod });

export const trackNavClick = (label: string, href: string) =>
  fire("nav_clicked", { label, href });

export const trackMenuToggle = (isOpen: boolean) =>
  fire("nav_menu_toggled", { state: isOpen ? "open" : "closed" });

export const trackCtaClick = (label: string, location: string) =>
  fire("cta_clicked", { label, location });

export const trackGuestLinkClick = (
  guestName: string,
  linkType: "linkedin" | "google_scholar" | "website",
  episodeNumber?: number
) =>
  fire("guest_link_clicked", {
    guest_name: guestName,
    link_type: linkType,
    episode_number: episodeNumber,
  });

export const trackChatOpened = () => fire("chat_opened");

export const trackChatClosed = (messageCount: number) =>
  fire("chat_closed", { message_count: messageCount });

export const trackChatQuestion = (questionLength: number) =>
  fire("chat_question_submitted", { question_length: questionLength });

export const trackChatResponse = (outcome: "success" | "error") =>
  fire("chat_response_received", { outcome });

export const trackChatSourceClick = (episodeNumber?: number) =>
  fire("chat_source_clicked", { episode_number: episodeNumber });
