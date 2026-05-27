/**
 * Homepage-only FAQPage schema. Episode pages emit their own FAQPage,
 * and Google rejects pages with multiple FAQPage entities.
 */

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    // 3 שאלות ייחודיות — מה מייחד את הפודקאסט
    {
      "@type": "Question",
      name: "מה זה הפודקאסט 'איך פותרים את זה?'",
      acceptedAnswer: {
        "@type": "Answer",
        text: "פודקאסט עברי על קליימט-טק וחדשנות ישראלית. בכל פרק יזם, חוקר או משקיע מציגים בעיה סביבתית אמיתית ואת הפתרון שהם בנו. הפודקאסט מנגיש נושאים מורכבים בגובה העיניים — מהסרת פחמן ועד גידול קפה בתלת מימד.",
      },
    },
    {
      "@type": "Question",
      name: "מי מנחה את הפודקאסט?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "בן סהר — חוקר קליימט-טק, יזם ומפתח. בן חוקר ומראיין יזמים, מדענים ומשקיעים שבונים פתרונות לבעיות סביבתיות. הוא משלב רקע טכנולוגי עם סקרנות עיתונאית כדי להנגיש את התעשייה לקהל הרחב.",
      },
    },
    {
      "@type": "Question",
      name: "מה מייחד את הפודקאסט הזה מפודקאסטים אחרים על סביבה?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "הפודקאסט מתמקד בפתרונות, לא בבעיות. כל פרק בנוי סביב מבנה ברור: הבעיה, הפתרון, והטיפ ליזם. זה הפודקאסט העברי היחיד שמתמקד בקליימט-טק ישראלי, עם תמלולים מלאים באתר ו-Schema markup לנגישות מקסימלית.",
      },
    },
    // 3 שאלות נישתיות — מה מאזינים שואלים
    {
      "@type": "Question",
      name: "באילו תחומים הפודקאסט עוסק?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "קליימט-טק, AgriTech, FoodTech, Blue Tech, אנרגיה מתחדשת, הסרת פחמן, חומרים ירוקים, מחזור, אקולוגיה ימית, לוויינים סביבתיים ועוד. הפודקאסט מכסה את כל הספקטרום של חדשנות סביבתית בישראל.",
      },
    },
    {
      "@type": "Question",
      name: "איפה אפשר להאזין לפודקאסט?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "הפודקאסט זמין ב-Spotify, Apple Podcasts, YouTube Music, YouTube, Pocket Casts, Castbox ו-Snipd. כל הפרקים גם זמינים באתר howtosolvethis.com עם תמלולים מלאים בעברית.",
      },
    },
    {
      "@type": "Question",
      name: "כל כמה זמן יוצא פרק חדש?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "פרקים חדשים יוצאים באופן סדיר. כל פרק דורש מחקר מעמיק על הנושא, ראיון עם האורח, עריכה ותמלול — כך שאיכות התוכן קודמת לתדירות.",
      },
    },
    // 3 שאלות חיפוש — מבוססות search intent
    {
      "@type": "Question",
      name: "מה זה קליימט-טק (Climate Tech)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "קליימט-טק הוא תחום טכנולוגי שמפתח פתרונות למשבר האקלים. התחום כולל אנרגיה מתחדשת, הסרת פחמן, חקלאות חכמה, חלופות למזון, חומרים ירוקים ועוד. ישראל היא שחקנית מרכזית בתחום עם מאות סטארטאפים. הפודקאסט 'איך פותרים את זה?' מכסה את התעשייה לעומק.",
      },
    },
    {
      "@type": "Question",
      name: "אילו סטארטאפים ישראליים בתחום הקליימט-טק מופיעים בפודקאסט?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "הפודקאסט ארח יזמים מחברות כמו Coffeesai (גידול קפה בתלת מימד), Polymertal (אלטרנטיבה למתכת), ועוד סטארטאפים בתחומי הסרת פחמן, מחזור טקסטיל, מניעת שריפות, חלבון מאצות, ניטור לוויני ועוד. רשימה מלאה בעמוד הפרקים.",
      },
    },
    {
      "@type": "Question",
      name: "האם אפשר להתארח בפודקאסט?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "כן. בן סהר מחפש יזמים, חוקרים ומשקיעים שפותרים בעיות סביבתיות אמיתיות. אם יש לך סטארטאפ או מחקר בתחום הקליימט-טק — ניתן לפנות דרך LinkedIn (linkedin.com/in/ben-sahar) או X (@bensahar).",
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
