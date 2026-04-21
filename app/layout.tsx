import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// SF Hebrew Local Font Configuration
// NOTE: Font files should be placed in public/fonts/ directory
// Expected files: SFHebrew-Light.woff2, SFHebrew-Regular.woff2, 
//                 SFHebrew-Medium.woff2, SFHebrew-Bold.woff2, SFHebrew-Heavy.woff2
// Using CSS @font-face instead to handle missing files gracefully

export const metadata: Metadata = {
  metadataBase: new URL("https://howtosolvethis.com"),
  title: {
    default: "איך פותרים את זה? | פודקאסט יזמות ופתרון בעיות",
    template: "%s | איך פותרים את זה?",
  },
  description:
    "פודקאסט על יזמות, פתרון בעיות ואקלים. מדברים עם חוקרים ויזמים שפותרים את הבעיות הגדולות של ימינו - מבי-טק ועד פודטק. הירשמו עכשיו.",
  keywords: [
    "פודקאסט",
    "יזמות",
    "פתרון בעיות",
    "Climate-Tech Israel",
    "Sustainability",
    "Startups",
    "קליימט-טק",
    "חדשנות",
    "ישראל",
    "סביבה",
    "טכנולוגיה",
    "ClimaTech",
    "Climate Tech",
    "משבר אקלים",
    "פתרונות ירוקים",
    "AgriTech",
    "FoodTech",
    "Blue Tech",
    "קיימות",
    "בן סהר",
    "ספוטיפיי",
    "פודקאסט ישראלי",
  ],
  authors: [{ name: "בן סהר", url: "https://www.linkedin.com/in/ben-sahar/" }],
  creator: "בן סהר",
  publisher: "איך פותרים את זה?",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://howtosolvethis.com",
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "https://howtosolvethis.com",
    siteName: "איך פותרים את זה?",
    title: "איך פותרים את זה? | פודקאסט יזמות ופתרון בעיות",
    description:
      "מדברים עם חוקרים ויזמים שפותרים את הבעיות הגדולות של ימינו. פודקאסט על יזמות, חדשנות ופתרונות סביבתיים בישראל.",
    images: [
      {
        url: "/images/earth-hero.png",
        width: 1200,
        height: 630,
        alt: "איך פותרים את זה? - פודקאסט יזמות ופתרון בעיות",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "איך פותרים את זה? | פודקאסט יזמות ופתרון בעיות",
    description: "מדברים עם חוקרים ויזמים שפותרים את הבעיות הגדולות של ימינו",
    images: ["/images/earth-hero.png"],
    creator: "@bensahar",
  },
};

import StructuredData from "@/components/StructuredData";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <StructuredData />
      </head>
      <body
        className="font-sans antialiased min-h-screen relative overflow-x-hidden"
        suppressHydrationWarning
      >
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
        
        {/* Fixed Earth Background */}
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/earth-hero.png')",
          }}
        />
        
        {/* 40% Black Overlay */}
        <div className="fixed inset-0 -z-10 bg-black/40" />

        {/* Scrollable Content */}
        <main className="relative z-0 pt-16 md:pt-20">{children}</main>
      </body>
    </html>
  );
}
