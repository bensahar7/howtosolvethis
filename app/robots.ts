import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://howtosolvethis.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
