/**
 * Blog post schema.
 *
 * Posts are plain markdown files in `content/blog/*.md` with YAML frontmatter.
 * There is no CMS: git is the publishing workflow. Adding a file and pushing it
 * is what "publish" means, and every derived surface (index page, sitemap,
 * RSS feed, llms.txt) reads from the same loader so none of them can drift.
 */

/** Frontmatter exactly as authored at the top of a `.md` file. */
export interface BlogFrontmatter {
  /** Post title. Rendered as the page's single <h1>. Required. */
  title: string;
  /** Meta description + card excerpt. Keep under ~155 chars for SERP display. Required. */
  description: string;
  /** Publication date, `YYYY-MM-DD`. Required. */
  date: string;
  /** Last substantive edit, `YYYY-MM-DD`. Falls back to `date` when absent. */
  updated?: string;
  /** Free-form topic tags, shown on the post and emitted as article:tag. */
  tags?: string[];
  /** Site-relative cover image path, e.g. "/images/blog/foo.jpg". */
  coverImage?: string;
  /**
   * Alt text for `coverImage`. Required whenever a cover is set — enforced by
   * the parser rather than the type system, since frontmatter is parsed at
   * runtime from untyped YAML.
   */
  coverAlt?: string;
  /** Byline. Defaults to the site author. */
  author?: string;
  /**
   * Key takeaways rendered directly beneath the H1.
   *
   * This is the highest-leverage block for AI citation: a short, self-contained,
   * list-shaped answer near the top of the document is the passage LLMs quote
   * most reliably, because it survives chunking intact.
   */
  takeaways?: string[];
  /** Hidden in production, visible in dev so drafts can be previewed locally. */
  draft?: boolean;
}

/** A fully loaded post: frontmatter + derived fields + rendered body. */
export interface BlogPost extends BlogFrontmatter {
  /** URL segment, derived from the filename with any `YYYY-MM-` prefix stripped. */
  slug: string;
  /** Rendered HTML body. */
  html: string;
  /** Raw markdown body (frontmatter removed) — served to LLMs verbatim. */
  raw: string;
  /** Estimated read time in whole minutes, floor 1. */
  readingMinutes: number;
}

/**
 * Index-card projection. The blog index renders many of these, and shipping
 * full `html`/`raw` bodies for every post into a list payload is pure waste.
 */
export type BlogPostSummary = Omit<BlogPost, "html" | "raw">;

/** Thrown when a post file is malformed. Fails the build loudly by design. */
export class BlogPostError extends Error {
  constructor(file: string, reason: string) {
    super(`Invalid blog post "${file}": ${reason}`);
    this.name = "BlogPostError";
  }
}
