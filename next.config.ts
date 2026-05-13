import type { NextConfig } from "next";
import path from "node:path";
import withBundleAnalyzer from "@next/bundle-analyzer";

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
  // Experimental features for better optimization
  experimental: {
    optimizePackageImports: ['@/components', '@/lib'],
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
