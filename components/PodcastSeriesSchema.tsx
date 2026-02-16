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
      width: "1200",
      height: "630",
    },
    author: {
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
      "Sustainability",
      "Climate Tech",
    ],
    webFeed: "https://anchor.fm/s/f8c5a9a8/podcast/rss",
    keywords: "Climate-Tech, Sustainability, Startups, קליימט-טק, חדשנות, יזמות, AgriTech, FoodTech, Blue Tech",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastSeriesSchema) }}
    />
  );
}
