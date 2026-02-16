/**
 * Global Structured Data (Schema.org) Component
 * Provides Organization and WebSite schema for the entire site
 */

export default function StructuredData() {
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://howtosolvethis.com/#organization",
    name: "How To Solve This?",
    alternateName: "איך פותרים את זה?",
    url: "https://howtosolvethis.com",
    logo: {
      "@type": "ImageObject",
      url: "https://howtosolvethis.com/logo.png",
      width: "512",
      height: "512",
    },
    description: "פודקאסט קליימט-טק ויזמות אקלים",
    sameAs: [
      "https://www.linkedin.com/in/ben-sahar/",
      "https://open.spotify.com/show/your-show-id", // Update with actual Spotify show URL
      "https://podcasts.apple.com/us/podcast/%D7%90%D7%99%D7%9A-%D7%A4%D7%95%D7%AA%D7%A8%D7%99%D7%9D-%D7%90%D7%AA-%D7%96%D7%94/id1750929970",
    ],
    founder: {
      "@type": "Person",
      name: "בן סהר",
      url: "https://www.linkedin.com/in/ben-sahar/",
    },
  };

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://howtosolvethis.com/#website",
    url: "https://howtosolvethis.com",
    name: "How To Solve This?",
    alternateName: "איך פותרים את זה?",
    description: "פודקאסט קליימט-טק ויזמות אקלים",
    publisher: {
      "@id": "https://howtosolvethis.com/#organization",
    },
    inLanguage: "he",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://howtosolvethis.com/?s={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
