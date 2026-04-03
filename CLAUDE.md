# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Production build (also validates RSS parsing & static generation)
npm start         # Start production server
```

There are no tests. Use `npm run build` output to catch data-fetching and type errors.

---

## Architecture

This is a **Next.js App Router** site for the Hebrew podcast "איך פותרים את זה?". All UI text is Hebrew, RTL. The codebase is English.

### Data Flow (critical to understand)

Episodes come from two sources that are merged at build/request time:

1. **RSS feed** (`lib/rss-parser.ts`) — fetches `https://anchor.fm/s/f75630a4/podcast/rss`, cached 1 hour. Provides: title, description, pubDate, imageUrl, audioUrl, spotifyEpisodeId.

2. **Local metadata** (`Context/Episodes/{folderName}/meta.md.txt`) — provides: guests, sector, keywords, problem/solution, company info, researcher info. Cached 1 minute.

3. **Episode matcher** (`lib/episode-matcher.ts`) — joins the two via the manual mapping table in `lib/episode-mapping.ts`. RSS episode numbers do not match folder names, so the mapping is required. The matcher also builds fallback episodes from local metadata alone when RSS is down (needed so Google indexing doesn't 404).

**Main exported function:** `getEnrichedEpisodes()` from `lib/episode-matcher.ts` — returns `EnrichedEpisode[]` (RSS + local metadata merged). Both `app/page.tsx` and `EpisodeGrid` call it; the `unstable_cache` wrapper means only one network request occurs.

### Episode Numbering Quirk

RSS season numbering ≠ absolute episode numbering. Season 2 episodes in RSS start at `itunes:episode` 1 again. The parser adds 10 to Season 2 episode numbers to get absolute numbers (11–16). The manual `EPISODE_MAPPING` maps these absolute numbers to folder names.

**Adding a new episode:**
1. Create `Context/Episodes/ep{N}-{slug}/meta.md.txt`
2. Add `N: "ep{N}-{slug}"` to `EPISODE_MAPPING` in `lib/episode-mapping.ts`

### Page Structure

`app/page.tsx` is `async` and renders sections in this order:
Hero → Stats → FeaturedEpisodeSection (latest episode) → Episodes Grid (#episodes) → AboutSection (#about) → HostSection (#host) → PlatformLinksSection → SocialLinksSection → Newsletter → Footer → StickyListenBar (mobile-only)

Individual episode pages live at `app/episodes/[id]/page.tsx` — `id` is the absolute episode number.

---

## Design System — "Atmospheric Curiosity"

**Core rule:** Depth through transparency and blur. **No `box-shadow` or `drop-shadow` anywhere** (only exception: `.glass-glow` in the CSS).

Key CSS classes defined in `app/globals.css`:
- `.glass` — standard glassmorphic surface (60px blur, rgba(0,0,0,0.6))
- `.glass-high-blur` — header/footer/sticky bar (80px blur)
- `.glass-hover` — scale + white glow on hover
- `.btn-spotify` — Spotify-green glassmorphic button
- `.technical-text` — JetBrains Mono, uppercase, 0.75rem, for metadata labels
- `.hero-title` — display text with text-shadow
- `.body-text` — Hebrew body copy with enhanced contrast
- `.animate-mask-reveal` — clip-path reveal animation for hero text
- `.img-grayscale-default` — grayscale(80%) default, full color on hover

**Layout:** Sharp corners (`border-radius: 0` globally enforced; only `.rounded-sm` = 0.125rem allowed). RTL grid. 12-column Swiss grid via Tailwind `grid-cols-12`.

**Background:** Fixed earth image (`/images/earth-hero.png`) + `bg-black/40` overlay, set in `app/layout.tsx`.

**Typography:** SF Hebrew (system font stack: `-apple-system, BlinkMacSystemFont, "Arial Hebrew"`). JetBrains Mono for technical metadata.

---

## Episode Metadata Format

`Context/Episodes/*/meta.md.txt` files use a markdown-like key-value format parsed by `lib/metadata-reader.ts` via regex. The `LocalMetadata` type in `types/episode.ts` defines all fields. Supports:
- Single company (`companyName`, `companyLogo`, legacy fields)
- Multi-company (`companies: CompanyInfo[]`)
- Researcher guests (`researcher: ResearcherInfo`)

---

## Key URLs (hardcoded in components)

- Spotify show: `https://open.spotify.com/show/1ddFDGd1vH4UWIlfGjhS2Y`
- Apple Podcasts: `https://podcasts.apple.com/us/podcast/...id1750929970`
- Newsletter: `https://ben1580094.substack.com`
- Host LinkedIn: `https://www.linkedin.com/in/ben-sahar/`

---

## Caching & Revalidation

| Data | Cache TTL |
|------|-----------|
| RSS feed | 3600s (1 hr) |
| Local metadata | 60s |
| Episode static pages | 3600s (`force-static`) |
