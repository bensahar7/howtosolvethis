import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://howtosolvethis.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Explicitly welcome AI crawlers and point them to the LLM-optimised
      // content endpoints so they prefer clean text over HTML.
      {
        userAgent: [
          "ChatGPT-User",
          "GPTBot",
          "Google-Extended",
          "GoogleOther",
          "Claude-Web",
          "ClaudeBot",
          "anthropic-ai",
          "Bytespider",
          "CCBot",
          "PerplexityBot",
          "YouBot",
        ],
        allow: ["/", "/llms.txt", "/llms-full.txt"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
