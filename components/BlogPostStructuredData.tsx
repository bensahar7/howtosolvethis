import { BlogPost } from "@/types/blog";
import { blogPostPath, DEFAULT_AUTHOR } from "@/lib/blog";

const SITE_URL = "https://howtosolvethis.com";
const SITE_NAME = "איך פותרים את זה?";

interface BlogPostStructuredDataProps {
  post: BlogPost;
}

/**
 * BlogPosting + BreadcrumbList JSON-LD for a single article.
 *
 * `mainEntityOfPage` is what tells a parser which URL this markup describes,
 * which matters here because the same post is also reachable as raw markdown at
 * /blog/{slug}/markdown — the canonical HTML page is the entity.
 */
export default function BlogPostStructuredData({
  post,
}: BlogPostStructuredDataProps) {
  const url = `${SITE_URL}${blogPostPath(post.slug)}`;
  const image = post.coverImage
    ? `${SITE_URL}${post.coverImage}`
    : `${SITE_URL}/images/og-image.jpg`;

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Person",
      name: post.author ?? DEFAULT_AUTHOR,
      url: "https://www.linkedin.com/in/ben-sahar/",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    inLanguage: "he-IL",
    wordCount: post.raw.split(/\s+/).filter(Boolean).length,
    timeRequired: `PT${post.readingMinutes}M`,
    ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "דף הבית", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "בלוג", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
