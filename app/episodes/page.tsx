import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AllEpisodeCard from "@/components/AllEpisodeCard";
import { getEnrichedEpisodes } from "@/lib/episode-matcher";

// Static, indexable hub page — strengthens internal linking to every episode.
export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "כל הפרקים | איך פותרים את זה?",
  description:
    "כל פרקי הפודקאסט 'איך פותרים את זה?' במקום אחד — שיחות עם חוקרים ויזמים שפותרים את הבעיות הגדולות של ימינו, מקליימט-טק ועד פודטק.",
  alternates: {
    canonical: "https://howtosolvethis.com/episodes",
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "https://howtosolvethis.com/episodes",
    siteName: "איך פותרים את זה?",
    title: "כל הפרקים | איך פותרים את זה?",
    description:
      "כל פרקי הפודקאסט 'איך פותרים את זה?' במקום אחד — שיחות עם חוקרים ויזמים שפותרים את הבעיות הגדולות של ימינו.",
  },
};

const BASE = "https://howtosolvethis.com";

const stripHtml = (text?: string | null): string =>
  (text ?? "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

export default async function AllEpisodesPage() {
  // Already sorted newest → oldest by episode-matcher.
  const episodes = await getEnrichedEpisodes();

  // CollectionPage wrapping a typed ItemList — each entry is a full PodcastEpisode
  // so AI/answer engines can extract self-contained episode facts (title, date,
  // sector, image) directly from this hub without crawling each page.
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE}/episodes#collection`,
    url: `${BASE}/episodes`,
    name: "כל הפרקים — איך פותרים את זה?",
    description:
      "אינדקס מלא של פרקי הפודקאסט 'איך פותרים את זה?' — שיחות עם חוקרים ויזמים שפותרים בעיות סביבתיות, מקליימט-טק ועד פודטק.",
    inLanguage: "he-IL",
    isPartOf: { "@type": "PodcastSeries", "@id": `${BASE}/#podcast`, name: "איך פותרים את זה?" },
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: episodes.length,
      itemListElement: episodes.map((ep, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "PodcastEpisode",
          "@id": `${BASE}/episodes/${ep.episodeNumber}#episode`,
          url: `${BASE}/episodes/${ep.episodeNumber}`,
          name: ep.title,
          episodeNumber: ep.episodeNumber,
          datePublished: ep.pubDate,
          inLanguage: "he-IL",
          image: ep.imageUrl,
          description: stripHtml(ep.metadata?.problem || ep.description).slice(0, 300),
          ...(ep.metadata?.sector ? { about: { "@type": "Thing", name: ep.metadata.sector } } : {}),
          partOfSeries: { "@type": "PodcastSeries", "@id": `${BASE}/#podcast`, name: "איך פותרים את זה?" },
        },
      })),
    },
  };

  // BreadcrumbList — consistent trail (Home → All Episodes) for SERP + AI grounding.
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "איך פותרים את זה?", item: BASE },
      { "@type": "ListItem", position: 2, name: "כל הפרקים", item: `${BASE}/episodes` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        {/* Page heading */}
        <div className="mb-10 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight text-center md:text-right">
            כל הפרקים
          </h1>
          <p className="body-text text-base md:text-lg text-white/70 text-center md:text-right">
            כל השיחות עם החוקרים והיזמים שפותרים את הבעיות הגדולות של ימינו.
          </p>
        </div>

        {episodes.length === 0 ? (
          <div className="glass p-12 rounded-sm text-center">
            <p className="body-text text-white/70">
              אין פרקים זמינים כרגע. אנא נסה שוב מאוחר יותר.
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            {episodes.map((episode, index) => (
              <AllEpisodeCard key={episode.guid} episode={episode} index={index} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
