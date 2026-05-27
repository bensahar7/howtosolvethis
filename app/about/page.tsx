import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

            {/* Intro + Bio */}
            <div className="glass p-6 md:p-12 rounded-sm mb-6 md:mb-8">
              <p className="technical-text text-xs text-white/40 mb-4 tracking-widest">
                אודות המנחה
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                בן סהר
              </h1>
              <p className="technical-text text-xs text-white/50 mb-6">
                חוקר קליימט-טק &middot; יזם &middot; מנחה פודקאסט
              </p>
              <p
                data-tldr
                className="body-text text-base md:text-lg text-white/85 leading-relaxed mb-6"
              >
               אני מראיין פאונדרים, חוקרים ומשקיעים שפותרים את הבעיות הגדודולות של ימינו, מהסרת פחמן וגידול קפה בתלת מימד, ועד
               חלופות לבטון ואלטרנטיבות לסלמון.
              </p>
              <p className="body-text text-sm md:text-base text-white/70 leading-relaxed mb-4">
              הפודקאסט נולד מתוך סקרנות אמיתית. רציתי להבין איך סטארטאפים פותרים תא הבעיות הגדולות של תקופתנו מבפנים, ולשתף על זה בגובה העיניים.

              </p>
              <p className="body-text text-sm md:text-base text-white/70 leading-relaxed">
                עד היום ראיינתי מעל 15 יזמים וחוקרים מתחומי ה-AgriTech, FoodTech,
                Blue Tech, אנרגיה, חומרים ועוד. כל פרק בנוי סביב מבנה ברור:
                הבעיה, הפתרון, והטיפ ליזם — כדי שגם מי שלא מגיע מהתחום יוכל
                להבין ולהתחבר.
              </p>
            </div>

            {/* Mission */}
            <div className="glass p-6 md:p-12 rounded-sm mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                למה הקמתי את הפודקאסט
              </h2>
              <p className="body-text text-sm md:text-base text-white/80 leading-relaxed mb-4">
                תעשיית הקליימט-טק בישראל צומחת מהר, אבל רוב התוכן עליה נכתב
                באנגלית ומיועד למשקיעים. רציתי ליצור מקום שבו כל מי שמתעניין —
                סטודנטים, מהנדסים, יזמים בתחילת הדרך — יכול להבין מה קורה
                בתעשייה ומה הפתרונות שנבנים כאן.
              </p>
              <p className="body-text text-sm md:text-base text-white/80 leading-relaxed">
                המטרה היא להנגיש את המורכבות שמאחורי הסטארטאפים שפותרים את הבעיות
                הגדולות של תקופתינו, ולהפגיש בין יזמים, חוקרים ומשקיעים.
              </p>
            </div>

            {/* Expertise Areas */}
            <div className="glass p-6 md:p-12 rounded-sm mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                נושאי הפודקאסט
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white/90 mb-2">קליימט-טק וסביבה</h3>
                  <ul className="list-disc list-inside text-white/70 text-sm leading-relaxed space-y-1">
                    <li>הסרת פחמן (Carbon Removal)</li>
                    <li>אנרגיה מתחדשת</li>
                    <li>חומרים ירוקים ומחזור</li>
                    <li>Blue Tech ואקולוגיה ימית</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white/90 mb-2">יזמות וטכנולוגיה</h3>
                  <ul className="list-disc list-inside text-white/70 text-sm leading-relaxed space-y-1">
                    <li>AgriTech ו-FoodTech</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Podcast Numbers */}
            <div className="glass p-6 md:p-12 rounded-sm mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                הפודקאסט במספרים
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-white">16+</p>
                  <p className="technical-text text-xs text-white/50 mt-1">פרקים</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-white">15+</p>
                  <p className="technical-text text-xs text-white/50 mt-1">יזמים וחוקרים</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-white">6</p>
                  <p className="technical-text text-xs text-white/50 mt-1">פלטפורמות</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-white">8+</p>
                  <p className="technical-text text-xs text-white/50 mt-1">סקטורים</p>
                </div>
              </div>
            </div>

            {/* Contact / Guest CTA */}
            <div className="glass p-6 md:p-12 rounded-sm mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                רוצים להתארח? בואו נדבר
              </h2>
              <p className="body-text text-sm md:text-base text-white/80 leading-relaxed mb-6">
                אני מחפש יזמים, חוקרים ומשקיעים שפותרים בעיות סביבתיות אמיתיות
                ורוצים לשתף את הסיפור שלהם. אם יש לכם סטארטאפ או מחקר בתחום
                הקליימט-טק — אשמח לשמוע.
              </p>
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
