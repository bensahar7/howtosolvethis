import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { unstable_cache } from "next/cache";
import { renderMarkdown } from "@/lib/markdown";
import { readingMinutes } from "@/lib/reading-time";
import {
  BlogFrontmatter,
  BlogPost,
  BlogPostError,
  BlogPostSummary,
} from "@/types/blog";

/**
 * Blog post loader.
 *
 * Source of truth is `content/blog/*.md`. Every blog surface on the site — the
 * index, the article pages, sitemap.xml, feed.xml, llms.txt, llms-full.txt —
 * reads through this module, so a new file appears everywhere at once and no
 * hand-maintained index can fall out of sync. (The sitemap had exactly that
 * drift problem with episodes once; see app/sitemap.ts.)
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/** Site author, used when a post omits an explicit byline. */
export const DEFAULT_AUTHOR = "בן סהר";

/** Drafts are readable locally but never ship. */
const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

/**
 * Filename -> URL slug. A leading `YYYY-MM-` or `YYYY-MM-DD-` is an authoring
 * convenience for keeping the folder sorted and is stripped from the URL.
 */
function fileNameToSlug(fileName: string): string {
  return fileName
    .replace(/\.md$/i, "")
    .replace(/^\d{4}-\d{2}(-\d{2})?-/, "");
}

function asStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const items = value.map((v) => String(v).trim()).filter(Boolean);
  return items.length ? items : undefined;
}

/** Validate untyped YAML into BlogFrontmatter, or throw with a usable message. */
function parseFrontmatter(
  data: Record<string, unknown>,
  fileName: string
): BlogFrontmatter {
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const description =
    typeof data.description === "string" ? data.description.trim() : "";
  const rawDate = data.date;

  if (!title) throw new BlogPostError(fileName, "missing required `title`");
  if (!description)
    throw new BlogPostError(fileName, "missing required `description`");
  if (!rawDate) throw new BlogPostError(fileName, "missing required `date`");

  // gray-matter parses unquoted YAML dates into Date objects; quoted ones stay
  // strings. Normalise both to YYYY-MM-DD so downstream formatting is uniform.
  const toIsoDay = (value: unknown, field: string): string => {
    const d = value instanceof Date ? value : new Date(String(value));
    if (Number.isNaN(d.getTime())) {
      throw new BlogPostError(
        fileName,
        `\`${field}\` is not a valid date (got "${String(value)}", expected YYYY-MM-DD)`
      );
    }
    return d.toISOString().split("T")[0];
  };

  const coverImage =
    typeof data.coverImage === "string" && data.coverImage.trim()
      ? data.coverImage.trim()
      : undefined;
  const coverAlt =
    typeof data.coverAlt === "string" && data.coverAlt.trim()
      ? data.coverAlt.trim()
      : undefined;

  // A cover without alt text is an accessibility and SEO defect, and it is far
  // cheaper to catch at build time than in an audit six months from now.
  if (coverImage && !coverAlt) {
    throw new BlogPostError(
      fileName,
      "`coverImage` is set but `coverAlt` is missing — cover images require alt text"
    );
  }

  return {
    title,
    description,
    date: toIsoDay(rawDate, "date"),
    updated: data.updated ? toIsoDay(data.updated, "updated") : undefined,
    tags: asStringArray(data.tags),
    coverImage,
    coverAlt,
    author:
      typeof data.author === "string" && data.author.trim()
        ? data.author.trim()
        : DEFAULT_AUTHOR,
    takeaways: asStringArray(data.takeaways),
    draft: data.draft === true,
  };
}

async function readPostFile(fileName: string): Promise<BlogPost> {
  const raw = await fs.readFile(path.join(BLOG_DIR, fileName), "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = parseFrontmatter(data as Record<string, unknown>, fileName);
  const body = content.trim();

  if (!body) throw new BlogPostError(fileName, "body is empty");

  return {
    ...frontmatter,
    slug: fileNameToSlug(fileName),
    html: renderMarkdown(body),
    raw: body,
    readingMinutes: readingMinutes(body),
  };
}

async function getAllPostsUncached(): Promise<BlogPost[]> {
  let fileNames: string[];

  try {
    fileNames = (await fs.readdir(BLOG_DIR)).filter((f) => /\.md$/i.test(f));
  } catch {
    // No content/blog directory yet — an empty blog is a valid state, not an
    // error. The index renders its empty state and the sitemap adds nothing.
    return [];
  }

  const posts = await Promise.all(fileNames.map(readPostFile));

  return posts
    .filter((post) => SHOW_DRAFTS || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * All posts, newest first. Cached for 60s to match the local-metadata TTL —
 * content lives on disk, so the cost is a directory read, not a network call.
 */
export const getAllPosts = unstable_cache(getAllPostsUncached, ["blog-posts"], {
  revalidate: 60,
});

/** Index-card projection: same posts, without the rendered/raw bodies. */
export async function getAllPostSummaries(): Promise<BlogPostSummary[]> {
  const posts = await getAllPosts();
  return posts.map(({ html: _html, raw: _raw, ...summary }) => summary);
}

/** A single post, or null when the slug does not resolve. */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

/** Slugs for generateStaticParams. */
export async function getPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((post) => post.slug);
}

/** Site-relative canonical path for a post. */
export function blogPostPath(slug: string): string {
  return `/blog/${slug}`;
}

/** Hebrew long-form date, e.g. "10 באוגוסט 2026". */
export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
