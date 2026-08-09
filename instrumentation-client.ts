import posthog from "posthog-js";

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (projectToken && apiHost) {
  posthog.init(projectToken, {
    api_host: apiHost,
    defaults: "2026-01-30",

    // Log every click, input and form submit sitewide — not just the
    // hand-instrumented ones. Named events in lib/analytics.ts stay on top
    // of this for the interactions we actually report on.
    autocapture: true,

    // SPA navigations: App Router changes the URL without a reload.
    capture_pageview: "history_change",
    capture_pageleave: true,

    // Frustration signals — clicks that went nowhere.
    rageclick: true,
    capture_dead_clicks: true,

    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  });
} else if (process.env.NODE_ENV === "development") {
  // Warn, don't throw: a missing key must not take down the dev server.
  console.warn(
    "[posthog] NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN / NEXT_PUBLIC_POSTHOG_HOST are unset — analytics events are being dropped."
  );
}
