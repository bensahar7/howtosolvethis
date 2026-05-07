/**
 * Homepage-only FAQPage schema. Episode pages emit their own FAQPage,
 * and Google rejects pages with multiple FAQPage entities.
 */

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

export default function HomeFaqSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema, null, 2)
          .replace(/</g, "\\u003c")
          .replace(/>/g, "\\u003e")
          .replace(/&/g, "\\u0026"),
      }}
    />
  );
}
