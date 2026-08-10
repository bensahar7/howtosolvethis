import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import KeyTakeaways from "@/components/KeyTakeaways";
import BlogPostStructuredData from "@/components/BlogPostStructuredData";
import {
  blogPostPath,
  formatPostDate,
  getPostBySlug,
  getPostSlugs,
} from "@/lib/blog";

export const dynamic = "force-static";
export const revalidate = 3600;

const SITE_URL = "https://howtosolvethis.com";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "המאמר לא נמצא" };
  }

  const url = `${SITE_URL}${blogPostPath(post.slug)}`;
  // Posts without a cover fall back to the site OG card rather than shipping a
  // link preview with no image at all.
  const image = post.coverImage ?? "/images/og-image.jpg";

  return {
    title: post.title,
    description: post.description,
    ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
    authors: post.author ? [{ name: post.author }] : undefined,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "he_IL",
      url,
      siteName: "איך פותרים את זה?",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
      images: [{ url: image, alt: post.coverAlt ?? post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <BlogPostStructuredData post={post} />

      <Header />

      {/* No <main> here: app/layout.tsx already wraps every page in one, and
          nesting <main> is invalid HTML and confuses the a11y tree. */}
      <article className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <header className="mb-8 md:mb-10">
          <div className="technical-text flex flex-wrap items-center gap-3 text-white/50 mb-5">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} דקות קריאה</span>
            {post.author ? (
              <>
                <span aria-hidden="true">·</span>
                <span>{post.author}</span>
              </>
            ) : null}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="body-text text-base md:text-lg text-white/70 mt-5">
            {post.description}
          </p>
        </header>

        {post.coverImage ? (
          <div className="relative w-full aspect-[16/9] mb-8 md:mb-10 overflow-hidden rounded-sm">
            <Image
              src={post.coverImage}
              alt={post.coverAlt ?? ""}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        ) : null}

        {/* Summary block sits high on the page so retrieval pipelines pick it
            up as the article's answer passage. */}
        <KeyTakeaways takeaways={post.takeaways} />

        <div
          className="prose-rtl body-text"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <footer className="mt-12 md:mt-16 pt-8 border-t border-white/10">
          {post.tags?.length ? (
            <ul className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="technical-text px-3 py-1.5 rounded-sm border border-white/15 text-white/60"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          {post.updated && post.updated !== post.date ? (
            <p className="technical-text text-white/40 mb-6">
              עודכן לאחרונה:{" "}
              <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
            </p>
          ) : null}

          <Link
            href="/blog"
            className="glass glass-hover inline-flex items-center gap-2 px-5 py-3 rounded-sm text-sm md:text-base text-white/90 hover:text-white transition-colors"
          >
            <span aria-hidden="true">←</span>
            <span>חזרה לכל המאמרים</span>
          </Link>
        </footer>
      </article>

      <Footer />
    </>
  );
}
