import { Marked } from "marked";
import { slugify } from "@/lib/episode-url";

/**
 * Markdown -> HTML for blog post bodies.
 *
 * Two deliberate behaviours:
 *
 * 1. Heading levels are *normalised*, not blindly shifted. The page owns the
 *    only <h1> (the post title), so body headings must start at <h2>. Authors
 *    are inconsistent about whether the top body heading is `#` or `##`, and
 *    both must produce the same correct outline.
 *
 *    So: find the shallowest heading in the document and map it to <h2>,
 *    shifting the rest by the same offset. `#`-authored and `##`-authored posts
 *    both yield h2 sections with h3 subsections, and no level is ever skipped.
 *    (A fixed +1 shift was the first cut, and it silently produced h1 -> h3 for
 *    every `##`-authored post — a skipped level Lighthouse flags.)
 *
 * 2. Headings get stable `id` slugs so they are linkable, and so AI crawlers
 *    that split documents on heading anchors get clean fragment URLs.
 *
 * Hebrew headings slugify to "" (slugify drops non-ASCII), so we fall back to a
 * positional id rather than emitting duplicate empty anchors.
 */

const MIN_HEADING_LEVEL = 2;
const MAX_HEADING_LEVEL = 6;

/**
 * Shallowest ATX heading level in the source, or null when there are none.
 * Fenced code blocks are stripped first so a `# comment` inside a shell snippet
 * is not mistaken for a heading.
 */
function shallowestHeadingLevel(markdown: string): number | null {
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, "");
  const matches = withoutCode.matchAll(/^\s{0,3}(#{1,6})\s+\S/gm);

  let min: number | null = null;
  for (const match of matches) {
    const level = match[1].length;
    if (min === null || level < min) min = level;
  }
  return min;
}

export function renderMarkdown(markdown: string): string {
  // A per-call instance keeps the heading counter isolated; a module-level
  // `marked` with a stateful extension would leak counts between posts.
  let headingIndex = 0;

  // Offset that lifts the shallowest heading to <h2>. Never negative: a body
  // that already starts at h2 or deeper is left where it is.
  const shallowest = shallowestHeadingLevel(markdown);
  const offset = shallowest === null ? 0 : Math.max(0, MIN_HEADING_LEVEL - shallowest);

  const marked = new Marked({
    gfm: true,
    breaks: false,
  });

  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const plain = text.replace(/<[^>]+>/g, "");
        const level = Math.min(
          Math.max(depth + offset, MIN_HEADING_LEVEL),
          MAX_HEADING_LEVEL
        );

        headingIndex += 1;
        const id = slugify(plain) || `section-${headingIndex}`;

        return `<h${level} id="${id}">${text}</h${level}>\n`;
      },
      // External links open in a new tab; internal ones navigate in place.
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const titleAttr = title ? ` title="${title}"` : "";
        const external = /^https?:\/\//i.test(href);
        const relAttr = external
          ? ' target="_blank" rel="noopener noreferrer"'
          : "";

        return `<a href="${href}"${titleAttr}${relAttr}>${text}</a>`;
      },
    },
  });

  return marked.parse(markdown, { async: false });
}
