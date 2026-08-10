import posthog from "posthog-js";

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

// Region host is only used to derive the UI host for links back to PostHog —
// traffic itself goes through the first-party /ingest proxy (see next.config.ts).
const regionHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

if (projectToken) {
  posthog.init(projectToken, {
    // First-party path so adblockers don't drop our analytics. Rewritten to the
    // real PostHog origin by the /ingest rules in next.config.ts.
    api_host: "/ingest",
    ui_host: regionHost.replace("//us.i.", "//us.").replace("//eu.i.", "//eu."),
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
    "[posthog] NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is unset — analytics events are being dropped."
  );
}
