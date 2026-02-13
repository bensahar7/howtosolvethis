import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// SF Hebrew Local Font Configuration
// NOTE: Font files should be placed in public/fonts/ directory
// Expected files: SFHebrew-Light.woff2, SFHebrew-Regular.woff2, 
//                 SFHebrew-Medium.woff2, SFHebrew-Bold.woff2, SFHebrew-Heavy.woff2
// Using CSS @font-face instead to handle missing files gracefully

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "איך פותרים את זה? | פודקאסט על קליימט-טק ישראלי",
    template: "%s | איך פותרים את זה?",
  },
  description:
    "הפודקאסט שמחבר בין יזמים, מדענים ומשקיעים לפתרונות טכנולוגיים למשבר האקלים. בעיות גדולות, בגובה העיניים.",
  keywords: [
    "פודקאסט",
    "קליימט-טק",
    "חדשנות",
    "ישראל",
    "סביבה",
    "טכנולוגיה",
    "יזמות",
    "ClimaTech",
    "Climate Tech",
    "משבר אקלים",
    "פתרונות ירוקים",
    "AgriTech",
    "FoodTech",
    "Blue Tech",
    "קיימות",
    "בן סהר",
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
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "/",
    siteName: "איך פותרים את זה?",
    title: "איך פותרים את זה? | פודקאסט על קליימט-טק ישראלי",
    description:
      "הפודקאסט שמחבר בין יזמים, מדענים ומשקיעים לפתרונות טכנולוגיים למשבר האקלים.",
    images: [
      {
        url: "/images/earth-hero.png",
        width: 1200,
        height: 630,
        alt: "איך פותרים את זה? - פודקאסט על קליימט-טק",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "איך פותרים את זה? | פודקאסט על קליימט-טק ישראלי",
    description: "הפודקאסט שמחבר בין יזמים, מדענים ומשקיעים לפתרונות טכנולוגיים למשבר האקלים",
    images: ["/images/earth-hero.png"],
    creator: "@bensahar",
  },
  verification: {
    google: "your-google-verification-code", // להחליף בקוד אמיתי
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
        <main className="relative z-0 pt-32">{children}</main>
      </body>
    </html>
  );
}
