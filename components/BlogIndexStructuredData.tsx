import { BlogPostSummary } from "@/types/blog";
import { blogPostPath, DEFAULT_AUTHOR } from "@/lib/blog";

const SITE_URL = "https://howtosolvethis.com";
const SITE_NAME = "איך פותרים את זה?";

interface BlogIndexStructuredDataProps {
  posts: BlogPostSummary[];
}

/**
 * Blog + ItemList JSON-LD for the index page.
 *
 * `Blog` describes the collection itself; `ItemList` gives crawlers an ordered,
 * explicit list of post URLs rather than making them infer one from the DOM.
 */
export default function BlogIndexStructuredData({
  posts,
}: BlogIndexStructuredDataProps) {
  const blog = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog`,
    url: `${SITE_URL}/blog`,
    name: `הבלוג של ${SITE_NAME}`,
    description:
      "מאמרים על קליימט-טק, יזמות סביבתית וחדשנות ישראלית — מאחורי הקלעים של הפודקאסט.",
    inLanguage: "he-IL",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      author: {
        "@type": "Person",
        name: post.author ?? DEFAULT_AUTHOR,
      },
      url: `${SITE_URL}${blogPostPath(post.slug)}`,
      ...(post.coverImage ? { image: `${SITE_URL}${post.coverImage}` } : {}),
    })),
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: posts.length,
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: post.title,
      url: `${SITE_URL}${blogPostPath(post.slug)}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blog) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
    </>
  );
}
