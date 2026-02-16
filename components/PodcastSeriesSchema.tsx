/**
 * PodcastSeries Schema Component
 * Used on the home page to define the podcast series
 */

export default function PodcastSeriesSchema() {
  const podcastSeriesSchema = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    "@id": "https://howtosolvethis.com/#podcast",
    name: "איך פותרים את זה?",
    alternateName: "How To Solve This?",
    description: "פודקאסט קליימט-טק ויזמות אקלים",
    url: "https://howtosolvethis.com",
    image: {
      "@type": "ImageObject",
      url: "https://howtosolvethis.com/images/earth-hero.png",
      width: 1200,
      height: 630,
    },
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
      "Business",
      "Science",
    ],
    keywords: "קליימט-טק, יזמות, אקלים, חדשנות, סביבה, טכנולוגיה, ישראל, Climate Tech, Sustainability, Startups",
    webFeed: "https://anchor.fm/s/f8c5a9a8/podcast/rss",
    potentialAction: {
      "@type": "ListenAction",
      target: [
        {
          "@type": "EntryPoint",
          urlTemplate: "https://open.spotify.com/show/4VKarRdsnGJxd4VDXXfVKH",
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastSeriesSchema) }}
    />
  );
}
