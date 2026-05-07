import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "אודות | בן סהר ו'איך פותרים את זה?'",
  description:
    "אודות בן סהר, מנחה הפודקאסט 'איך פותרים את זה?' — פודקאסט עברי על קליימט-טק, חדשנות ישראלית ויזמות סביבתית.",
  alternates: {
    canonical: "https://howtosolvethis.com/about",
  },
  openGraph: {
    type: "profile",
    locale: "he_IL",
    url: "https://howtosolvethis.com/about",
    siteName: "איך פותרים את זה?",
    title: "אודות | בן סהר ו'איך פותרים את זה?'",
    description:
      "מנחה הפודקאסט 'איך פותרים את זה?', פודקאסט עברי על קליימט-טק וחדשנות ישראלית.",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://howtosolvethis.com/about#person",
  name: "בן סהר",
  alternateName: "Ben Sahar",
  url: "https://howtosolvethis.com/about",
  jobTitle: "Podcast Host & Climate Tech Researcher",
  description:
    "חוקר, מראיין ומנחה הפודקאסט 'איך פותרים את זה?' — פודקאסט עברי על קליימט-טק וחדשנות ישראלית.",
  knowsAbout: [
    "Climate Tech",
    "Sustainability",
    "AgriTech",
    "FoodTech",
    "Blue Tech",
    "Israeli Startups",
    "Environmental Innovation",
    "קליימט-טק",
    "יזמות סביבתית",
  ],
  sameAs: [
    "https://www.linkedin.com/in/ben-sahar/",
    "https://x.com/bensahar",
    "https://ben1580094.substack.com",
  ],
  worksFor: {
    "@id": "https://howtosolvethis.com/#organization",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "מי בן סהר?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "בן סהר הוא מנחה ויוצר הפודקאסט 'איך פותרים את זה?', פודקאסט עברי המתמקד בקליימט-טק, יזמות סביבתית וחדשנות ישראלית.",
      },
    },
    {
      "@type": "Question",
      name: "במה הפודקאסט עוסק?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "בכל פרק יזם, חוקר או משקיע מציגים בעיה סביבתית אמיתית והפתרון שהם בנו — מ-AgriTech ו-FoodTech ועד אנרגיה ו-Blue Tech.",
      },
    },
    {
      "@type": "Question",
      name: "איך יוצרים קשר?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ניתן לפנות לבן דרך LinkedIn או X (Twitter) — הקישורים מופיעים בעמוד זה.",
      },
    },
  ],
};

const escape = (obj: object) =>
  JSON.stringify(obj, null, 2)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escape(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escape(faqSchema) }}
      />

      <Header />

      <article className="relative z-0">
        <div className="grid grid-cols-12 gap-4 md:gap-6 max-w-7xl mx-auto px-4 md:px-6 pt-4 md:pt-8 pb-8 md:pb-24">
          <div className="col-span-12 lg:col-span-9 lg:col-start-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6 md:mb-8 glass px-4 py-2 rounded-full"
            >
              חזרה לעמוד הבית
            </Link>

            <div className="glass p-6 md:p-12 rounded-sm mb-6 md:mb-8">
              <p className="technical-text text-xs text-white/40 mb-4 tracking-widest">
                אודות
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                בן סהר
              </h1>
              <p
                data-tldr
                className="body-text text-base md:text-lg text-white/85 leading-relaxed mb-6"
              >
                בן סהר הוא יוצר ומנחה הפודקאסט "איך פותרים את זה?" — פודקאסט
                עברי על קליימט-טק, יזמות סביבתית וחדשנות ישראלית. בכל פרק
                מתארח יזם, חוקר או משקיע שמציגים בעיה סביבתית אמיתית ואת הפתרון
                שהם בונים, מ-AgriTech ו-FoodTech ועד אנרגיה ו-Blue Tech.
              </p>
              <p className="body-text text-sm md:text-base text-white/70 leading-relaxed">
                המטרה: להנגיש את המורכבות שמאחורי הסטארטאפים שפותרים את הבעיות
                הגדולות של תקופתינו, ולהפגיש בין יזמים, חוקרים ומשקיעים בתעשייה
                הצומחת בישראל.
              </p>
            </div>

            <div className="glass p-6 md:p-12 rounded-sm mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                תחומי עיסוק
              </h2>
              <ul className="list-disc list-inside text-white/80 text-sm md:text-base leading-relaxed space-y-2">
                <li>קליימט-טק וחדשנות סביבתית</li>
                <li>AgriTech, FoodTech, Blue Tech</li>
                <li>אנרגיה מתחדשת וקיימות</li>
                <li>יזמות וסטארטאפים ישראליים</li>
              </ul>
            </div>

            <div className="glass p-6 md:p-12 rounded-sm mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                קישורים
              </h2>
              <div className="flex gap-3 flex-wrap">
                <a
                  href="https://www.linkedin.com/in/ben-sahar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glass-hover inline-flex items-center justify-center px-6 py-3 rounded-sm font-medium text-white"
                >
                  LinkedIn
                </a>
                <a
                  href="https://x.com/bensahar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glass-hover inline-flex items-center justify-center px-6 py-3 rounded-sm font-medium text-white"
                >
                  X
                </a>
                <a
                  href="https://ben1580094.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glass-hover inline-flex items-center justify-center px-6 py-3 rounded-sm font-medium text-white"
                >
                  Substack
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
