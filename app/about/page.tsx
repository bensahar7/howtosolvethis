import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutContent from "@/components/AboutContent";
import { getAboutContent } from "@/lib/about-reader";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "אודות בן סהר | מנחה הפודקאסט 'איך פותרים את זה?'",
  description:
    "בן סהר — חוקר קליימט-טק, יזם ומנחה הפודקאסט העברי 'איך פותרים את זה?'. מראיין יזמים, חוקרים ומשקיעים שפותרים בעיות סביבתיות אמיתיות בישראל ובעולם.",
  alternates: {
    canonical: "https://howtosolvethis.com/about",
  },
  openGraph: {
    type: "profile",
    locale: "he_IL",
    url: "https://howtosolvethis.com/about",
    siteName: "איך פותרים את זה?",
    title: "אודות בן סהר | מנחה הפודקאסט 'איך פותרים את זה?'",
    description:
      "חוקר קליימט-טק, יזם ומנחה הפודקאסט העברי על יזמות סביבתית וחדשנות ישראלית.",
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
    "חוקר קליימט-טק, יזם ומנחה הפודקאסט 'איך פותרים את זה?' — הפודקאסט העברי המוביל על יזמות סביבתית, חדשנות ישראלית וטכנולוגיות אקלים. מראיין מייסדים, חוקרים ומשקיעים מהתעשייה.",
  knowsAbout: [
    "Climate Tech",
    "Sustainability",
    "AgriTech",
    "FoodTech",
    "Blue Tech",
    "Carbon Removal",
    "Renewable Energy",
    "Israeli Startups",
    "Environmental Innovation",
    "Podcast Production",
    "קליימט-טק",
    "יזמות סביבתית",
    "חדשנות ישראלית",
  ],
  sameAs: [
    "https://www.linkedin.com/in/ben-sahar/",
    "https://x.com/bensahar",
    "https://ben1580094.substack.com",
    "https://www.youtube.com/@HowToSolveThis",
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
      name: "מי זה בן סהר?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "בן סהר הוא חוקר קליימט-טק, יזם ומנחה הפודקאסט 'איך פותרים את זה?' — הפודקאסט העברי המוביל על יזמות סביבתית וחדשנות ישראלית. בן חוקר ומראיין יזמים, מדענים ומשקיעים שבונים פתרונות לבעיות סביבתיות אמיתיות.",
      },
    },
    {
      "@type": "Question",
      name: "במה עוסק הפודקאסט 'איך פותרים את זה?'",
      acceptedAnswer: {
        "@type": "Answer",
        text: "בכל פרק בן מארח יזם, חוקר או משקיע שמציגים בעיה סביבתית אמיתית ואת הפתרון שהם בנו. התחומים כוללים קליימט-טק, AgriTech, FoodTech, Blue Tech, אנרגיה מתחדשת, הסרת פחמן, מחזור ועוד. הפודקאסט מנגיש נושאים מורכבים בגובה העיניים.",
      },
    },
    {
      "@type": "Question",
      name: "מה הרקע המקצועי של בן סהר?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "בן סהר הוא יזם ומפתח עם רקע בטכנולוגיה ובסטארטאפים ישראליים. הוא חוקר את תחום הקליימט-טק לעומק, בונה מוצרים דיגיטליים, ומשלב בין יכולות טכנולוגיות ליצירת תוכן. הפודקאסט הוא תוצר של המחקר והקשרים שצבר בתעשיית הקליימט-טק הישראלית.",
      },
    },
    {
      "@type": "Question",
      name: "מה מייחד את הפודקאסט הזה מפודקאסטים אחרים על סביבה?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "הפודקאסט מתמקד בפתרונות, לא בבעיות. כל פרק בנוי סביב מבנה ברור: הבעיה, הפתרון, והטיפ ליזם. במקום לדבר על משבר האקלים באופן כללי, אנחנו נכנסים לעומק של הטכנולוגיה והביזנס מאחורי כל סטארטאפ. בנוסף, זה הפודקאסט העברי היחיד שמתמקד בקליימט-טק ישראלי.",
      },
    },
    {
      "@type": "Question",
      name: "איך יוצרים קשר עם בן סהר?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ניתן לפנות לבן דרך LinkedIn (linkedin.com/in/ben-sahar), דרך X/Twitter (@bensahar), או דרך הניוזלטר ב-Substack. בן פתוח לשיחות עם יזמים, חוקרים ומשקיעים בתחום הקליימט-טק.",
      },
    },
    {
      "@type": "Question",
      name: "איפה אפשר להאזין לפודקאסט?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "הפודקאסט 'איך פותרים את זה?' זמין בכל הפלטפורמות: Spotify, Apple Podcasts, YouTube Music, YouTube, Pocket Casts, Castbox ו-Snipd. כל הפרקים גם זמינים באתר howtosolvethis.com עם תמלולים מלאים.",
      },
    },
    {
      "@type": "Question",
      name: "האם אפשר להתארח בפודקאסט?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "כן. בן מחפש יזמים, חוקרים ומשקיעים שפותרים בעיות סביבתיות אמיתיות ורוצים לשתף את הסיפור שלהם. אם יש לך סטארטאפ או מחקר בתחום הקליימט-טק — פנה דרך LinkedIn או X.",
      },
    },
  ],
};

const escape = (obj: object) =>
  JSON.stringify(obj, null, 2)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

export default async function AboutPage() {
  const { eyebrow, title, body } = await getAboutContent();

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

            <AboutContent eyebrow={eyebrow} title={title} body={body} />
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
