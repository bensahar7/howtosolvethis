import { NextResponse } from "next/server";
import { getAllPosts, blogPostPath, DEFAULT_AUTHOR } from "@/lib/blog";

export const revalidate = 3600;

const SITE_URL = "https://howtosolvethis.com";
const FEED_TITLE = "הבלוג של איך פותרים את זה?";
const FEED_DESCRIPTION =
  "מאמרים על קליימט-טק, יזמות סביבתית וחדשנות ישראלית.";

/** Escape the five XML predefined entities for use in element text. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * RSS 2.0 feed for the blog.
 *
 * Note this is the *outbound* blog feed and is unrelated to the podcast's
 * Anchor feed that lib/rss-parser.ts consumes — opposite direction, no overlap.
 */
export async function GET() {
  const posts = await getAllPosts();

  const lastBuildDate = posts[0]
    ? new Date(`${posts[0].date}T00:00:00Z`).toUTCString()
    : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}${blogPostPath(post.slug)}`;
      const pubDate = new Date(`${post.date}T00:00:00Z`).toUTCString();
      const categories = (post.tags ?? [])
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join("\n");

      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <description>${escapeXml(post.description)}</description>`,
        `      <dc:creator>${escapeXml(post.author ?? DEFAULT_AUTHOR)}</dc:creator>`,
        categories,
        // Full body as HTML so aggregators and LLM scrapers get the whole post
        // from the feed alone, without a second fetch per item.
        `      <content:encoded><![CDATA[${post.html}]]></content:encoded>`,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>he-IL</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
