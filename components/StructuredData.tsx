/**
 * Structured Data (Schema.org) Component
 * Provides rich metadata for search engines
 */

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: "איך פותרים את זה?",
    description:
      "פודקאסט שמנגיש את הבעיות הגדולות של תקופתינו ומפגיש בין יזמים, חוקרים ומשקיעים בעולמות האקלים והסביבה",
    url: "https://www.howtosolvethis.com",
    author: {
      "@type": "Person",
      name: "בן סהר",
      url: "https://www.linkedin.com/in/ben-sahar/",
    },
    image: "https://www.howtosolvethis.com/images/earth-hero.png",
    inLanguage: "he",
    genre: ["Technology", "Climate", "Innovation", "Entrepreneurship"],
    webFeed: "https://anchor.fm/s/f8c5a9a8/podcast/rss",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
