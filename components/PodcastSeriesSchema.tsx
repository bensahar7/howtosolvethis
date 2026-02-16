/**
 * PodcastSeries Schema Component
 * Specific to the home page - defines the podcast series
 */

import { stringifySchema, createImageSchema } from "@/lib/schema-helpers";

export default function PodcastSeriesSchema() {
  const podcastSeriesSchema = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    "@id": "https://howtosolvethis.com/#podcast",
    name: "איך פותרים את זה?",
    alternateName: "How To Solve This?",
    description: "פודקאסט קליימט-טק ויזמות אקלים",
    url: "https://howtosolvethis.com",
    image: createImageSchema("https://howtosolvethis.com/images/earth-hero.png", 1200, 630),
    author: {
      "@type": "Person",
      name: "בן סהר",
      url: "https://www.linkedin.com/in/ben-sahar/",
    },
    creator: {
      "@type": "Person",
      name: "בן סהר",
      url: "https://www.linkedin.com/in/ben-sahar/",
    },
    publisher: {
      "@id": "https://howtosolvethis.com/#organization",
    },
    inLanguage: "he",
    genre: [
      "Technology",
      "Climate",
      "Innovation",
      "Entrepreneurship",
      "Climate Tech",
      "Sustainability",
    ],
    keywords: "Climate-Tech, קליימט-טק, פודקאסט, ישראל, יזמות, חדשנות, סביבה",
    webFeed: "https://anchor.fm/s/f8c5a9a8/podcast/rss",
    potentialAction: {
      "@type": "ListenAction",
      target: [
        {
          "@type": "EntryPoint",
          urlTemplate: "https://open.spotify.com/show/YOUR_SHOW_ID",
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
            "http://schema.org/IOSPlatform",
            "http://schema.org/AndroidPlatform",
          ],
        },
        {
          "@type": "EntryPoint",
          urlTemplate: "https://podcasts.apple.com/us/podcast/%D7%90%D7%99%D7%9A-%D7%A4%D7%95%D7%AA%D7%A8%D7%99%D7%9D-%D7%90%D7%AA-%D7%96%D7%94/id1750929970",
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
            "http://schema.org/IOSPlatform",
          ],
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: stringifySchema(podcastSeriesSchema) }}
    />
  );
}
