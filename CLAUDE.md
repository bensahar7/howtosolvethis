# CLAUDE.md

## Project Overview

This repo is a **Next.js App Router** site for the Hebrew podcast "איך פותרים את זה?". All UI text is Hebrew, RTL. The codebase is English.

---

## Commands
```bash
npm run dev       # Start development server
npm run build     # Production build (also validates RSS parsing & static generation)
npm start         # Start production server
```

There are no tests. Use `npm run build` output to catch data-fetching and type errors.

**After every iteration of code changes, run `npm run dev` to verify the dev server starts cleanly with no errors.**

---

## Website Design Recreation Workflow

When the user provides a reference image (screenshot) and optionally some CSS classes or style notes:

1. **Generate** a single `index.html` file using Tailwind CSS (via CDN). Include all content inline — no external files unless requested.
2. **Screenshot** the rendered page. Use a Node.js Puppeteer script or `capture-website-cli` — do not rely on a bare `npx puppeteer` CLI call. If the page has distinct sections, capture those individually too.
3. **Compare** your screenshot against the reference image. Check for mismatches in:
   - Spacing and padding (measure in px)
   - Font sizes, weights, and line heights
   - Colors (exact hex values)
   - Alignment and positioning
   - Border radii, shadows, and effects
   - Responsive behavior
   - Image/icon sizing and placement
4. **Fix** every mismatch found. Edit the HTML/Tailwind code.
5. **Re-screenshot** and compare again.
6. **Repeat** steps 3–5 until the result is within ~2–3px of the reference everywhere.

Do NOT stop after one pass. Always do at least 2 comparison rounds. Only stop when the user says so or when no visible differences remain.

**Fonts:** Match the font family as closely as possible. Use Google Fonts CDN if needed. For this project, the primary font is SF Hebrew (`-apple-system, BlinkMacSystemFont, "Arial Hebrew"`); JetBrains Mono is used for technical metadata labels.

**Ambiguous references:** If the reference image is low-res or unclear, note the ambiguity and make the closest reasonable match — then flag what you assumed.

**Interactivity:** Recreate only visible states (e.g., default, hover if shown). Do not add modals, transitions, or interactions not visible in the reference unless asked.

### Recreation Rules

- Do not add features, sections, or content not present in the reference image
- Match the reference exactly — do not "improve" the design
- If the user provides CSS classes or style tokens, use them verbatim
- Keep code clean but don't over-abstract — inline Tailwind classes are fine
- When comparing screenshots, be specific (e.g., "heading is 32px but reference shows ~24px")

### Technical Defaults

- Tailwind CSS via CDN (`<script src="https://cdn.tailwindcss.com"></script>`)
- Placeholder images from `https://placehold.co/` when source images aren't provided
- Mobile-first responsive design
- Single `index.html` unless the user requests otherwise

---

## Architecture

### Data Flow (critical to understand)

Episodes come from two sources merged at build/request time:

1. **RSS feed** (`lib/rss-parser.ts`) — fetches `https://anchor.fm/s/f75630a4/podcast/rss`, cached 1 hour. Provides: title, description, pubDate, imageUrl, audioUrl, spotifyEpisodeId.
2. **Local metadata** (`Context/Episodes/{folderName}/meta.md.txt`) — provides: guests, sector, keywords, problem/solution, company info, researcher info. Cached 1 minute.
3. **Episode matcher** (`lib/episode-matcher.ts`) — joins the two via the manual mapping table in `lib/episode-mapping.ts`. The matcher also builds fallback episodes from local metadata alone when RSS is down.

**Main exported function:** `getEnrichedEpisodes()` from `lib/episode-matcher.ts` — returns `EnrichedEpisode[]`. Both `app/page.tsx` and `EpisodeGrid` call it; the `unstable_cache` wrapper means only one network request occurs.

### Episode Numbering Quirk

RSS season numbering ≠ absolute episode numbering. Season 2 episodes restart at `itunes:episode` 1. The parser adds 10 to Season 2 numbers to get absolute numbers (11–16). The manual `EPISODE_MAPPING` maps these to folder names.

**Adding a new episode:**
1. Create `Context/Episodes/ep{N}-{slug}/meta.md.txt`
2. Add `N: "ep{N}-{slug}"` to `EPISODE_MAPPING` in `lib/episode-mapping.ts`

### Page Structure

`app/page.tsx` renders sections in order:
Hero → Stats → FeaturedEpisodeSection → Episodes Grid (`#episodes`) → AboutSection (`#about`) → HostSection (`#host`) → PlatformLinksSection → SocialLinksSection → Newsletter → Footer → StickyListenBar (mobile-only)

Individual episode pages: `app/episodes/[id]/page.tsx` — `id` is the absolute episode number.

---

## Design System — "Atmospheric Curiosity"

**Core rule:** Depth through transparency and blur. **No `box-shadow` or `drop-shadow` anywhere** (only exception: `.glass-glow` in `globals.css`).

| Class | Purpose |
|---|---|
| `.glass` | Standard glassmorphic surface (60px blur, rgba(0,0,0,0.6)) |
| `.glass-high-blur` | Header/footer/sticky bar (80px blur) |
| `.glass-hover` | Scale + white glow on hover |
| `.btn-spotify` | Spotify-green glassmorphic button |
| `.technical-text` | JetBrains Mono, uppercase, 0.75rem — metadata labels |
| `.hero-title` | Display text with text-shadow |
| `.body-text` | Hebrew body copy with enhanced contrast |
| `.animate-mask-reveal` | Clip-path reveal animation for hero text |
| `.img-grayscale-default` | grayscale(80%) default, full color on hover |

**Layout:** Sharp corners (`border-radius: 0` globally; only `.rounded-sm` = 0.125rem allowed). RTL grid. 12-column Swiss grid via `grid-cols-12`.

**Background:** Fixed earth image (`/images/earth-hero.png`) + `bg-black/40` overlay, set in `app/layout.tsx`.

---

## Episode Metadata Format

`Context/Episodes/*/meta.md.txt` uses a markdown-like key-value format parsed by `lib/metadata-reader.ts` via regex. Supports single company (`companyName`, `companyLogo`) and multi-company (`companies: CompanyInfo[]`), plus researcher guests (`researcher: ResearcherInfo`). See `types/episode.ts` for the full `LocalMetadata` type.

---

## Key URLs

- Spotify show: `https://open.spotify.com/show/1ddFDGd1vH4UWIlfGjhS2Y`
- Apple Podcasts: `https://podcasts.apple.com/us/podcast/...id1750929970`
- Newsletter: `https://ben1580094.substack.com`
- Host LinkedIn: `https://www.linkedin.com/in/ben-sahar/`

---

## Caching & Revalidation

| Data | TTL |
|---|---|
| RSS feed | 3600s (1 hr) |
| Local metadata | 60s |
| Episode static pages | 3600s (`force-static`) |