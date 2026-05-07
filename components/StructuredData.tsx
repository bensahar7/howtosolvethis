/**
 * Global Structured Data (Schema.org) Component
 * Provides Organization and WebSite schemas for the entire site
 * This is injected in the root layout for all pages
 */

export default function StructuredData() {
  // Organization Schema - Defines the podcast/company entity
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
      width: 512,
      height: 512,
    },
    description: "פודקאסט שמנגיש את הבעיות הגדולות של תקופתינו ומפגיש בין יזמים, חוקרים ומשקיעים בעולמות האקלים והסביבה",
    founder: {
      "@type": "Person",
      name: "בן סהר",
      url: "https://www.linkedin.com/in/ben-sahar/",
    },
    sameAs: [
      "https://www.linkedin.com/in/ben-sahar/",
      "https://open.spotify.com/show/1ddFDGd1vH4UWIlfGjhS2Y",
      "https://podcasts.apple.com/us/podcast/%D7%90%D7%99%D7%9A-%D7%A4%D7%95%D7%AA%D7%A8%D7%99%D7%9D-%D7%90%D7%AA-%D7%96%D7%94/id1750929970",
      "https://www.youtube.com/@HowToSolveThis",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Creator",
      url: "https://www.linkedin.com/in/ben-sahar/",
    },
  };

  // WebSite Schema - Defines the website and enables sitelinks search box
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://howtosolvethis.com/#website",
    url: "https://howtosolvethis.com",
    name: "איך פותרים את זה?",
    description: "פודקאסט קליימט-טק ויזמות אקלים",
    publisher: {
      "@id": "https://howtosolvethis.com/#organization",
    },
    inLanguage: "he-IL",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "מה זה 'איך פותרים את זה?'",
        acceptedAnswer: {
          "@type": "Answer",
          text: "פודקאסט עברי על קליימט-טק וחדשנות ישראלית. בכל פרק יזם או חוקר מציג בעיה סביבתית אמיתית והפתרון שהוא בנה.",
        },
      },
      {
        "@type": "Question",
        name: "מי המגיש?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "בן סהר, יזם בתחום הקליימט-טק והקיימות.",
        },
      },
      {
        "@type": "Question",
        name: "באילו תחומים הפודקאסט עוסק?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "קליימט-טק, AgriTech, FoodTech, Blue Tech, אנרגיה, קיימות וחדשנות סביבתית בישראל.",
        },
      },
      {
        "@type": "Question",
        name: "איפה אפשר להאזין?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "הפודקאסט זמין ב-Spotify, Apple Podcasts, YouTube Music, Pocket Casts ו-Castbox.",
        },
      },
    ],
  };

  return (
    <>
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify(organizationSchema, null, 2)
            .replace(/</g, '\\u003c')
            .replace(/>/g, '\\u003e')
            .replace(/&/g, '\\u0026')
        }}
      />
      
      {/* WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema, null, 2)
            .replace(/</g, '\\u003c')
            .replace(/>/g, '\\u003e')
            .replace(/&/g, '\\u0026')
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema, null, 2)
            .replace(/</g, '\\u003c')
            .replace(/>/g, '\\u003e')
            .replace(/&/g, '\\u0026')
        }}
      />
    </>
  );
}
