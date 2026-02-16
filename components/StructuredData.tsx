/**
 * Global Structured Data (Schema.org) Component
 * Provides Organization and WebSite schemas for the entire site
 * Injected into the root layout <head>
 */

import { stringifySchema, createImageSchema } from "@/lib/schema-helpers";

export default function StructuredData() {
  // Organization Schema - Defines the podcast organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://howtosolvethis.com/#organization",
    name: "How To Solve This?",
    alternateName: "איך פותרים את זה?",
    url: "https://howtosolvethis.com",
    logo: createImageSchema("https://howtosolvethis.com/logo.png", 512, 512),
    description: "פודקאסט שמנגיש את הבעיות הגדולות של תקופתינו ומפגיש בין יזמים, חוקרים ומשקיעים בעולמות האקלים והסביבה",
    sameAs: [
      "https://www.linkedin.com/in/ben-sahar/",
      "https://open.spotify.com/show/4VRyo4K7vZ8nXz3nXz3nXz", // Replace with actual Spotify show URL
      "https://podcasts.apple.com/us/podcast/%D7%90%D7%99%D7%9A-%D7%A4%D7%95%D7%AA%D7%A8%D7%99%D7%9D-%D7%90%D7%AA-%D7%96%D7%94/id1750929970",
      "https://www.youtube.com/@howtosolvethis",
    ],
    founder: {
      "@type": "Person",
      name: "בן סהר",
      url: "https://www.linkedin.com/in/ben-sahar/",
    },
  };

  // WebSite Schema - Defines the website and search functionality
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://howtosolvethis.com/#website",
    url: "https://howtosolvethis.com",
    name: "How To Solve This?",
    alternateName: "איך פותרים את זה?",
    description: "פודקאסט קליימט-טק ויזמות אקלים",
    inLanguage: "he",
    publisher: {
      "@id": "https://howtosolvethis.com/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://howtosolvethis.com/?s={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  // Combine both schemas into a single JSON-LD script
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, websiteSchema],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: stringifySchema(combinedSchema) }}
    />
  );
}
