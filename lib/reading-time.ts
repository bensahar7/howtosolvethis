/**
 * Read-time estimation for Hebrew and mixed Hebrew/English prose.
 *
 * 200 wpm is the conventional figure for silent reading of non-technical text
 * and holds up well enough for Hebrew, which packs more meaning per word than
 * English but reads slower per character. The number is a UI affordance, not a
 * measurement — being off by 30 seconds on a 6-minute post costs nothing.
 */
const WORDS_PER_MINUTE = 200;

/** Strip markdown syntax so read time counts prose, not punctuation. */
function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ") // fenced code blocks
    .replace(/`[^`]*`/g, " ") // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> label
    .replace(/^\s{0,3}#{1,6}\s+/gm, "") // heading markers
    .replace(/^\s{0,3}>\s?/gm, "") // blockquote markers
    .replace(/^\s*[-*+]\s+/gm, "") // list bullets
    .replace(/[*_~]/g, "") // emphasis
    .replace(/<[^>]+>/g, " "); // raw HTML
}

/** Estimated read time in whole minutes, never less than 1. */
export function readingMinutes(markdown: string): number {
  const words = stripMarkdown(markdown)
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
