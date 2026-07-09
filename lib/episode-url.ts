import { EnrichedEpisode } from "@/types/episode";

/**
 * Canonical URL helpers for episode pages.
 *
 * Episode URLs use a number-prefixed slug: `/episodes/{number}-{company-slug}`
 * (e.g. `/episodes/17-senecio-robotics`). The leading number is the source of
 * truth — `parseInt(id, 10)` recovers it from any of these forms:
 *   "17"                      -> 17   (legacy, still resolves via 308 redirect)
 *   "17-senecio-robotics"     -> 17   (canonical)
 *   "17-anything-at-all"      -> 17   (stale slug, 308-redirected to canonical)
 *
 * Keeping the number means no slug lookup table is ever needed, and old indexed
 * numeric URLs keep resolving (they permanently redirect to the slugged form).
 */

/** Convert an arbitrary label to a lowercase ASCII slug. Non-ASCII (e.g. Hebrew) is dropped. */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // strip combining diacritics
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-") // anything non-alphanumeric (incl. Hebrew) -> hyphen
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * The company/topic slug segment for an episode, or "" when nothing usable exists.
 * Priority: single company name -> joined multi-company names -> folder-name remainder.
 */
export function episodeSlug(episode: EnrichedEpisode): string {
  const m = episode.metadata;

  const nameSource =
    m?.companyName ||
    (m?.companies?.length ? m.companies.map((c) => c.name).join(" ") : "");

  let slug = slugify(nameSource);

  // Fallback: strip the "epNN-" prefix off the folder name (already ASCII kebab).
  if (!slug && m?.folderName) {
    slug = slugify(m.folderName.replace(/^ep\d+-?/i, ""));
  }

  return slug;
}

/** Canonical route param, e.g. "17-senecio-robotics" (or "17" when no slug exists). */
export function episodeSlugId(episode: EnrichedEpisode): string {
  const slug = episodeSlug(episode);
  return slug ? `${episode.episodeNumber}-${slug}` : `${episode.episodeNumber}`;
}

/** Canonical site-relative path, e.g. "/episodes/17-senecio-robotics". */
export function episodePath(episode: EnrichedEpisode): string {
  return `/episodes/${episodeSlugId(episode)}`;
}
