import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import BlogIndexStructuredData from "@/components/BlogIndexStructuredData";
import { getAllPostSummaries } from "@/lib/blog";

export const revalidate = 3600;

const SITE_URL = "https://howtosolvethis.com";

const INDEX_DESCRIPTION =
  "מאמרים על הנושאים שאנחנו מדברים עליהם בפודקאסט";

export const metadata: Metadata = {
  title: "בלוג",
  description: INDEX_DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/blog`,
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: `${SITE_URL}/blog`,
    siteName: "איך פותרים את זה?",
    title: "בלוג | איך פותרים את זה?",
    description: INDEX_DESCRIPTION,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "איך פותרים את זה? - בלוג",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "בלוג | איך פותרים את זה?",
    description: INDEX_DESCRIPTION,
    images: ["/images/og-image.jpg"],
    creator: "@bensahar",
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPostSummaries();

  return (
    <>
      <BlogIndexStructuredData posts={posts} />

      <Header />

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="mb-10 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight text-center md:text-start">
            בלוג
          </h1>
          <p className="body-text text-base md:text-lg text-white/70 text-center md:text-start max-w-2xl">
            {INDEX_DESCRIPTION}
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="glass p-12 rounded-sm text-center">
            <p className="body-text text-white/70">
              עדיין אין מאמרים בבלוג. בקרוב.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
