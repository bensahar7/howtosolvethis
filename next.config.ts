import type { NextConfig } from "next";
import path from "node:path";
import withBundleAnalyzer from "@next/bundle-analyzer";

// Upstream PostHog origins the /ingest proxy forwards to. NEXT_PUBLIC_POSTHOG_HOST
// stays the single source of truth for the region (us / eu); assets live on the
// matching *-assets host.
const POSTHOG_INGEST_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
const POSTHOG_ASSETS_HOST = POSTHOG_INGEST_HOST.replace(
  "//us.i.",
  "//us-assets.i."
).replace("//eu.i.", "//eu-assets.i.");

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable compression
  compress: true,
  // Strict mode for better error detection
  reactStrictMode: true,
  // Remove X-Powered-By header for security
  poweredByHeader: false,
  // PostHog's ingest endpoints (/flags/, /e/) are trailing-slash sensitive —
  // Next must not redirect them away before the rewrite runs.
  skipTrailingSlashRedirect: true,
  // Experimental features for better optimization
  experimental: {
    optimizePackageImports: ['@/components', '@/lib'],
  },
  // Serve PostHog through our own domain. us.i.posthog.com is on every standard
  // adblock list; proxying via /ingest keeps analytics first-party so blockers
  // don't silently drop a slice of our traffic.
  // Order matters: the /static/ rule must precede the catch-all.
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: `${POSTHOG_ASSETS_HOST}/static/:path*`,
      },
      {
        source: "/ingest/:path*",
        destination: `${POSTHOG_INGEST_HOST}/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      // Canonicalize host: www.howtosolvethis.com → howtosolvethis.com
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.howtosolvethis.com" }],
        destination: "https://howtosolvethis.com/:path*",
        permanent: true,
      },
      // Drop stray search-template query params that Google indexed from a stale SearchAction schema
      {
        source: "/",
        has: [{ type: "query", key: "search" }],
        destination: "/",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "query", key: "s" }],
        destination: "/",
        permanent: true,
      },
    ];
  },
};

// Wrap with bundle analyzer (enabled with ANALYZE=true)
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default bundleAnalyzer(nextConfig);
