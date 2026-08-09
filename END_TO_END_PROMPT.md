# End-to-End Build Prompt — "איך פותרים את זה?" Podcast Website

> A single, self-contained prompt to recreate this website from scratch. Hand this to a capable coding agent and it should be able to rebuild the site faithfully — architecture, design system, data model, and content pipeline included.

---

## 1. What you are building

Build a **production Next.js (App Router) marketing/content website** for a Hebrew-language podcast called **"איך פותרים את זה?"** ("How To Solve This?"), hosted by **Ben Sahar (בן סהר)**.

The show interviews founders, scientists, and investors solving the big environmental/industrial problems of our time — Israeli **Climate-Tech**: AgriTech, FoodTech, Blue Tech, energy, materials, carbon removal, and more. Each episode = one real-world problem, one startup/researcher, one solution.

**Tone & positioning:** curiosity-driven, "בגובה העיניים" (eye-level / accessible), business-perspective. NOT preachy or activist. The tagline is **"בעיות גדולות, בגובה העיניים"** ("Big problems, at eye level").

**Everything the user sees is Hebrew and RTL.** All code, identifiers, and comments are English.

**Live domain:** `https://howtosolvethis.com`

---

## 2. Tech stack (use these exact choices)

- **Next.js 16** (App Router, React Server Components, TypeScript, `strict`)
- **React 19**
- **Tailwind CSS v4** (via `@import "tailwindcss"` in `globals.css` + `@tailwindcss/postcss`) — NOT the CDN, NOT a `tailwind.config` content-scan model; v4 CSS-first
- **framer-motion** (only where motion genuinely helps; most animation is CSS)
- **rss-parser** for the podcast feed
- **@vercel/analytics** + **@vercel/speed-insights** + a custom **Google Analytics (GA4)** component
- **playwright** (dev dependency, for screenshotting during design work)
- Deployed on **Vercel**

`package.json` scripts: `dev`, `build`, `start`, `lint` (standard Next). There are **no unit tests** — correctness is validated by `npm run build` (it exercises RSS parsing + static generation) and by running `npm run dev` and checking for a clean start.

---

## 3. Design system — "Atmospheric Curiosity"

This is the soul of the site. Follow it precisely.

**Core rule: depth comes from transparency + blur, NEVER from shadows.**
- **No `box-shadow` / `drop-shadow` anywhere**, with the single exception of a subtle white/green glow on `:hover`/`:active` of interactive glass elements.
- **Sharp corners globally:** a global `* { border-radius: 0 }` reset. The ONLY allowed rounding is `.rounded-sm` (`0.125rem`, applied with `!important`) and occasional pill shapes (`rounded-full`) for small tags/back-buttons.

**Background (set once in `app/layout.tsx`):**
- A `fixed inset-0` div with `background-image: url('/images/earth-hero.png')`, `bg-cover bg-center`, `bg-black` fallback (prevents grey flash), at `-z-20`.
- A `fixed inset-0 bg-black/40` overlay at `-z-10`.
- Scrollable content sits in `<main class="relative z-0 pt-16 md:pt-20">` (padding clears the fixed header).
- `<link rel="preload" as="image" href="/images/earth-hero.png">` in `<head>`; `body { background-color: #000 }` so first paint is black, not grey.

**Glassmorphism tokens (in `globals.css`):**

| Class | Spec |
|---|---|
| `.glass` | `background: rgba(0,0,0,0.72)`, `backdrop-filter: blur(24px)` (→ `60px` at `md`+), `1px` border `rgba(255,255,255,0.1)`. Standard surface. |
| `.glass-high-blur` | `rgba(0,0,0,0.7)`, blur `32px` (→ `80px` at `md`+), border `rgba(255,255,255,0.15)`. Header/footer/menus/newsletter. |
| `.glass-hover` | `transition: all 400ms cubic-bezier(.4,0,.2,1)`. On `@media (hover:hover)` hover: `scale(1.05)` + `box-shadow: 0 0 20px rgba(255,255,255,0.15)` (the allowed glow). `:active` → `scale(0.97)`. |
| `.btn-glass` | translucent white glass button, `rounded-sm`, scale-on-hover glow. |
| `.btn-spotify` | Spotify green: bg `rgba(29,185,84,0.15)`, text `#1DB954`, border `rgba(29,185,84,0.3)`, `min-height:56px`; hover brightens to `#1ed760` + green glow. |
| `.technical-text` | JetBrains Mono (fallback Consolas/Monaco/monospace), `0.75rem`, `letter-spacing:0.1em`, `uppercase`, `rgba(255,255,255,0.6)`. Used for ALL metadata labels ("פרק", "אורחים", "תאריך", "KEYWORDS", "EP 12", sector names). |
| `.hero-title` | `font-weight:700`, `letter-spacing:-0.05em`, `line-height:1.1`, white, with `text-shadow` (this + `.body-text` are the only text-shadows). |
| `.body-text` | `line-height:1.625`, `rgba(255,255,255,0.95)`, subtle text-shadow; includes styles for nested `p/a/strong/em/br` (used to render RSS description HTML). |
| `.img-grayscale-default` | `filter: grayscale(80%) brightness(0.75) contrast(1.25)`; on hover → full color. Cinematic default for imagery. |
| `.hud-line-vertical` / `.hud-line-horizontal` | `0.5px` reference lines in `rgba(255,255,255,0.1)` — thin "HUD" dividers between metadata columns. |
| `.animate-mask-reveal` | `clip-path: inset(0 100% 0 0)` → `inset(0)` over `0.8s` — hero text reveal. |
| `.skeleton-glass` | `rgba(255,255,255,0.05)` + `pulse-glass` opacity animation for loading skeletons. |

**Layout:** RTL. **12-column Swiss grid** via Tailwind `grid-cols-12`; content typically spans `lg:col-span-10 lg:col-start-2` (or `col-span-9`) for asymmetric centering. Page sections use `max-w-7xl mx-auto px-4 md:px-6`. Mobile-first responsive throughout, generous vertical rhythm (`py-16 md:py-24`).

**Typography:** Primary font is **SF Hebrew** with system fallback stack `-apple-system, BlinkMacSystemFont, "Segoe UI", "Arial Hebrew", system-ui, sans-serif`. (`@font-face` for local SFHebrew woff2 files is scaffolded but commented out — files go in `public/fonts/`, load gracefully if absent.) JetBrains Mono for `.technical-text` metadata.

**Motion:** CSS-driven, restrained. Reveal animations, hover scale, an infinite RTL logo marquee. Respect `prefers-reduced-motion` (slow the marquee 4×, don't kill it). Only recreate visible states — no gratuitous modals/transitions.

**Accessibility:** visible `:focus-visible` outlines (`2px rgba(255,255,255,0.5)`), `min-h-[48px]` tap targets, `aria-*` on interactive controls, `scroll-behavior: smooth`, `overflow-x: hidden` on `html,body`.

---

## 4. Architecture & data flow (critical — understand before coding)

Episodes are assembled at request/build time by **merging two sources**:

1. **RSS feed** (`lib/rss-parser.ts`) — fetches `https://anchor.fm/s/f75630a4/podcast/rss`, cached **1 hour** (`unstable_cache` + `fetch({ next: { revalidate: 3600 }})`). Yields: `title`, `description` (HTML), `pubDate`, `imageUrl`, `audioUrl`, `guid`, `duration`, `episodeNumber`, `spotifyEpisodeId`.

2. **Local metadata** (`Context/Episodes/{folder}/meta.md.txt`) — read from disk via `lib/metadata-reader.ts`, cached **60s**. Yields the rich editorial data: guests, sector, keywords, problem, solution, companies, researcher, entrepreneur tip, SEO keywords.

3. **Matcher** (`lib/episode-matcher.ts`) — `getEnrichedEpisodes()` is the single exported entry point returning `EnrichedEpisode[]` (RSS episode + `metadata`). It:
   - Runs RSS fetch and metadata read **in parallel** (`Promise.all`).
   - Joins each RSS episode to metadata **first by matching `episodeNumber`** (parsed from the local file's `# Episode N` header), **then falls back** to the manual `EPISODE_MAPPING` folder table (`lib/episode-mapping.ts`).
   - **Fallback resilience:** if RSS returns 0 episodes (feed down) OR throws, it builds episodes from local metadata alone (`buildFallbackEpisodes`) so pages never 404 — intermittent 404s cause Google de-indexing, which this explicitly guards against.
   - Sorts newest-first by `episodeNumber`.
   - Wrapped in `unstable_cache(..., { revalidate: 60 })` so `app/page.tsx`, `EpisodeGrid`, sitemap, and the llms routes all share ONE network fetch.
   - `getEpisodeWithTranscript(n)` additionally lazy-loads that one episode's transcript (`lib/transcript-reader.ts`) for the detail page.

**Episode numbering quirk (must replicate):** RSS `itunes:episode` restarts per season. Season 1 = episodes 1–10. Season 2 restarts at 1; the parser maps season-2 numbers to absolute numbers with a heuristic: `episodeInSeason >= 10 ? episodeInSeason : 10 + episodeInSeason` (so S2E1→11 … but an already-absolute S2E15 stays 15). Hebrew ("פרק N") and English ("Episode N"/"ep N") title regexes are fallbacks; reverse-index is last resort.

**Caching summary:**

| Data | TTL |
|---|---|
| RSS feed | 3600s |
| Local metadata | 60s |
| `getEnrichedEpisodes` | 60s |
| Episode detail pages | `force-static`, `revalidate = 3600` |
| llms.txt / llms-full.txt / markdown routes | 3600s |

---

## 5. Data model (`types/episode.ts`)

```ts
interface RSSEpisode { title; description; pubDate; imageUrl; audioUrl; guid; duration?; episodeNumber?; spotifyEpisodeId?; }
interface BilingualTag { en: string; he: string; }
interface CompanyInfo { name; logo; website?; guestName; guestLinkedIn?; guestTitle?; focus?; sector?; }
interface ResearcherInfo { name; linkedIn?; title?; affiliation?; googleScholar?; website?; }
interface LocalMetadata {
  episodeNumber; title; guests: string[]; sector; keywords: (string|BilingualTag)[];
  problem; solution; keyPoints?; entrepreneurInsight?; folderName?; transcript?;
  entrepreneurTip?;            // "טיפ ליזם" callout
  seoKeywords?: string[];
  researcher?: ResearcherInfo; // academic/expert guest
  companies?: CompanyInfo[];   // multi-company comparative episodes
  // legacy single-company: guestLinkedIn?, companyWebsite?, companyName?, companyLogo?
}
interface EnrichedEpisode extends RSSEpisode { metadata: LocalMetadata | null; }
```

The site supports THREE episode shapes, chosen at render time:
- **Legacy single company** (`companyName`/`companyLogo`),
- **Multi-company comparative** (`companies[]` — e.g. the bees episode compares ToBee vs BeeHero),
- **Researcher-led** (`researcher` — academic guest, with Google Scholar/affiliation).

---

## 6. Episode metadata file format (`Context/Episodes/{folder}/meta.md.txt`)

A markdown-like key/value doc parsed by regex in `lib/metadata-reader.ts`. Supports both a `**Bold:**` label style and a `yaml: value` style. Key patterns:

- Title from the first `# Episode N: Title` H1 (the `Episode N:` prefix is stripped).
- `**Guests:**`, `**Guest LinkedIn:**` (comma-separated), `**Keywords:**` (comma-separated; each can be `he/en`), `**Sectors:**`/`**Topic:**`.
- `## The Problem ...` and `## The Solution ...` section bodies (markdown asterisks stripped, capped at 500 chars).
- Researcher block: `**Researcher:**`, `**Researcher LinkedIn/Google Scholar/Website/Affiliation/Title:**`.
- Multi-company block, looped `while` there's a next index: `**Company Name {i}:**`, `**Company {i} Logo:**` (filename in `public/logos/`), `**Company {i} Website/Guest/Guest Title/Guest LinkedIn/Focus/Sector:**`.
- `## Entrepreneur Insight` → `entrepreneurTip`.
- `## Growth Hierarchy Fields` → `SEO Keywords`.

Each episode folder also holds a `transcript.md` and a company `logo.*` image. Company logos are also copied to `public/logos/` for the homepage marquee.

**Adding an episode = two steps:** (1) create `Context/Episodes/ep{N}-{slug}/meta.md.txt` (+ transcript + logo); (2) add `N: "ep{N}-{slug}"` to `EPISODE_MAPPING` (only needed if the local file's `# Episode N` header doesn't already match the RSS number). Unpublished drafts must NOT be in the mapping (keeps them out of routes/sitemap).

---

## 7. Routes & pages

```
app/
  layout.tsx              # RTL <html>, metadata, fixed earth bg, GA/Vercel analytics, StructuredData
  page.tsx                # Home
  globals.css             # design system
  not-found.tsx           # 404
  robots.ts               # robots (allow all, point to sitemap)
  sitemap.ts              # derived from getEnrichedEpisodes() — never lists a 404
  about/page.tsx          # About the host (content from Context/about.md via lib/about-reader)
  episodes/page.tsx       # Full episode index (all episodes, newest→oldest)
  episodes/[id]/page.tsx  # Episode detail (id = absolute episode number), force-static
  episodes/[id]/markdown/route.ts   # Machine-readable markdown of an episode (AEO)
  llms.txt/route.ts       # llms.txt index (title, links, episode list)
  llms-full.txt/route.ts  # full-content dump for LLMs
  icon.png
middleware.ts
```

**Home page (`app/page.tsx`) section order:**
Header → Hero (`.hero-title` h1 "בעיות גדולות, / בגובה העיניים" with mask-reveal + h2 sub-headline) → **Stats card** (glass, 3 columns with SVG icons + `AnimatedCounter`: `+16 פרקים`, `2 עונות`, `+16 חברות`) → **Episodes grid** (`#episodes`, `<Suspense>` with a skeleton that mirrors the real card layout, wrapped in `ErrorBoundary`) → HostSection (`#host`) → PlatformLinksSection → Footer (carries the crawlable internal nav). (An InfiniteLogoScroll marquee of company logos and a Newsletter/Substack CTA also exist as components.)

**Episode detail page (`app/episodes/[id]/page.tsx`)** — `generateStaticParams` from `getEnrichedEpisodes()`, rich `generateMetadata` (SEO title `פרק N: title | guests`, description from `problem` ≤155 chars, OG/Twitter cards, canonical + `text/markdown` alternate). Body order inside a centered glass column:
Back-to-episodes pill → Hero glass (EP badge + sector badge, h1 title, published date, **TL;DR block** `data-tldr` with intro/הבעיה/הפתרון first-sentences for AI extraction, square episode image, Read-More description) → Guests / ResearcherSection / MultiCompanySection / legacy CompanySection (whichever applies) → **הבעיה** (`data-problem`) → **הפתרון** (`data-solution`) → **טיפ ליזם** entrepreneur-tip callout (blue/purple gradient border) → נקודות מפתח → Spotify embed player (`open.spotify.com/embed/episode/{id}`) → other-platform icon grid → ShareButtons → KEYWORDS (bilingual tags + SEO tags) → TranscriptAccordion (closed by default) → RelatedEpisodes → Footer.

---

## 8. Components (`components/`)

Reproduce these (Server Components unless they need state/effects, which are `"use client"`):

- **Header** (client) — fixed, `backdrop-blur bg-black/30`, brand on RTL-start, a glass "תפריט" dropdown (client state, closes on outside-click/Escape) linking to `/episodes` and `/about`.
- **Footer** — glass-high-blur; static, crawlable internal links to every episode + about (so Google reaches all pages via `<a>` links).
- **EpisodeGrid** (server) — calls `getEnrichedEpisodes()`, renders `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6` of `EpisodeCard`s.
- **EpisodeCard** (client) — glass card, `aspect-video` cover image (grayscale→color, blur placeholder, `priority` for first 3), "פרק N" HUD badge, sector line, title (hover→`blue-300`), 3-line-clamped description with client-measured Read-More toggle, HUD footer (אורחים | תאריך with `.hud-line-vertical`), up to 3 bilingual keyword pills. Wrapped in a `<Link>` to `/episodes/{n}` and fires `trackEpisodeCardClick` analytics.
- **AllEpisodeCard** — variant used on `/episodes`.
- **AnimatedCounter** (client) — counts up to a value, optional `prefix`.
- **FeaturedEpisodeSection**, **HostSection** (`#host`, host bio + LinkedInBadge), **PlatformLinksSection** (Spotify/Apple/YouTube Music/YouTube/Pocket Casts/Castbox), **SocialLinksSection**, **Newsletter** (Substack), **InfiniteLogoScroll** (CSS marquee, `.logo-scroll-track` 35s linear, mask-fade edges, pause-on-hover, triple-set of logos translating `-33.333%`).
- **CompanySection**, **MultiCompanySection**, **CompanyCard**, **ResearcherSection**, **GuestInfo**, **LinkedInBadge** — guest/company presentation blocks.
- **BilingualTag** — renders `he / EN` pill; **ReadMoreDescription**, **TranscriptAccordion** (native `<details>` with chevron rotate), **RelatedEpisodes**, **ShareButtons** (Web Share API + copy link), **ScrollToEpisodesButton**, **ErrorBoundary**.
- **Icons:** `SpotifyIcon`, `PodcastIcons` (Apple/YouTube/YouTube Music/Pocket Casts/Castbox/Snipd/Google Podcasts), inline SVGs.
- **SEO/JSON-LD (all inject `<script type="application/ld+json">`):** `StructuredData` (Organization/WebSite in layout), `PodcastSeriesSchema` + `HomeFaqSchema` (home), `EpisodeStructuredData` (PodcastEpisode per detail page).
- **GoogleAnalytics** (client) — GA4 via `next/script`; `lib/analytics.ts` holds event helpers (`trackEpisodeCardClick`, etc.); `lib/logger.ts` is a tiny logger.

---

## 9. SEO / AEO (Answer-Engine Optimization) — a first-class concern

This site is heavily optimized both for Google and for LLM/AI answer engines. Reproduce:

- **Per-page metadata** via Next `Metadata`: Hebrew titles with `%s | איך פותרים את זה?` template, `metadataBase`, canonical URLs, keywords, robots (`index/follow`, `max-image-preview:large`), OpenGraph (`he_IL`, 1200×630 earth image) + Twitter `summary_large_image`.
- **JSON-LD** for Organization, WebSite, PodcastSeries, PodcastEpisode, and a home FAQ.
- **`sitemap.ts`** derived from the SAME `getEnrichedEpisodes()` source the routes use — so it can never list a URL that 404s nor omit a real page.
- **`robots.ts`** allowing all + sitemap pointer.
- **AEO surfaces:** `/llms.txt` (structured index: intro blurb HE+EN, Main links, per-episode links to `/episodes/{n}/markdown`, optional full-content + sitemap links), `/llms-full.txt` (all episodes with problem/solution), and per-episode `/episodes/{id}/markdown` (clean markdown alternate, advertised via the page's `alternates.types["text/markdown"]`).
- **On-page AI-extraction hooks:** `data-tldr`, `data-problem`, `data-solution` attributes and a self-contained TL;DR paragraph on every episode page.

---

## 10. Content to seed (episodes)

Real episodes, newest first. Each is a real Israeli climate-tech company/topic. Folder → topic:

| # | Folder | Topic / Company |
|---|---|---|
| 1 | `ep1-bees` | Bee crisis / pollination (ToBee, BeeHero — multi-company) |
| 2 | `ep2- Salicrop` | Resilient/stress-tolerant seeds (Salicrop) |
| 3 | `ep3-daikawood` | Wood-waste recycling (Daikawood) |
| 4 | `ep4-structurepal` | Reducing concrete use (StructurePal) |
| 5 | `ep5-wildfires-firewave` | Wildfire prevention (Firewave) |
| 6 | `ep6-textile-recycling-textre` | Textile recycling (Textre) |
| 7 | `ep7-carbon-rewind` | Carbon removal/sequestration (Rewind) |
| 8 | `ep8-satellite-astrea` | Satellite/space data (Asterra) |
| 9 | `ep9-agritech-greeneye` | Precision spraying (GreenEye) |
| 10 | `ep10-waste-to-energy-boson` | Waste-to-energy (Boson Energy) |
| 11 | `ep11-blue-tech-econcrete` | Marine-friendly concrete (ECOncrete) |
| 12 | `ep12-foodtech-brevel` | Microalgae protein (Brevel) |
| 13 | `ep13-foodtech-oshi` | Cultivated salmon alternative (Oshi) |
| 14 | `ep14-materials-polymertal` | Metal alternative (Polymertal) |
| 15 | `ep15-foodtech-coffeesai` | Lab-grown/cell-based coffee (CoffeeSai) |
| 16 | `ep16-maji` | Water-purification monitoring (Maji — RSS-only, no local meta) |
| 17 | `ep17-senecio` | Biological mosquito control / Sterile Insect Technique (Senecio Robotics) |

(`ep19-coral-reefs-vcorals` exists as an UNPUBLISHED draft — not in RSS, not in the mapping, not routed.)

Populate each `meta.md.txt` using the format in §6 (see `ep1-bees` for the multi-company template and a researcher block). The **About page** content lives in `Context/about.md` (front-matter `eyebrow`/`title` + Hebrew body; curiosity-driven bio, "16 פרקים / 15+ יזמים / 8+ סקטורים", CTA to guest on the show, LinkedIn/X/Substack links).

---

## 11. Key external URLs / config

- Spotify show: `https://open.spotify.com/show/1ddFDGd1vH4UWIlfGjhS2Y`
- Apple Podcasts: `…/id1750929970`
- YouTube: `https://www.youtube.com/@howtosolvethis`
- Newsletter (Substack): `https://ben1580094.substack.com`
- Host LinkedIn: `https://www.linkedin.com/in/ben-sahar/`; X: `https://x.com/bensahar`
- RSS: `https://anchor.fm/s/f75630a4/podcast/rss`

---

## 12. Build / verify workflow

1. After each change, run `npm run dev` and confirm the dev server starts **with no errors**.
2. Run `npm run build` to validate RSS parsing, types, and static generation of all episode pages.
3. When recreating a visual from a reference screenshot: generate the page, **screenshot it with Puppeteer/Playwright (not a bare npx call)**, compare against the reference for spacing/font/color/alignment/radius/shadow mismatches (measure in px), fix, re-screenshot — **at least 2 comparison rounds**, iterate to within ~2–3px everywhere. Do not add features not in the reference; match, don't "improve."

---

## 13. Non-negotiables checklist

- [ ] RTL Hebrew UI, English code.
- [ ] No shadows except hover/active glass glow. Sharp corners (global `border-radius:0`, only `.rounded-sm`).
- [ ] Fixed earth background + 40% black overlay, black fallback (no grey flash).
- [ ] Glassmorphism (`.glass` family) is the ONLY surface treatment.
- [ ] `.technical-text` (JetBrains Mono, uppercase) for every metadata label.
- [ ] Two-source episode merge with folder-mapping + `episodeNumber` matching, and local-metadata fallback so pages never 404.
- [ ] Shared `unstable_cache`'d `getEnrichedEpisodes()` — one RSS fetch feeds all consumers.
- [ ] Season-2 `+10` episode-number heuristic.
- [ ] Full SEO + AEO surface: metadata, JSON-LD, sitemap-from-real-data, robots, llms.txt/llms-full.txt/per-episode markdown, `data-tldr/problem/solution` hooks.
- [ ] Three episode shapes: single-company, multi-company, researcher-led.
- [ ] Mobile-first responsive, accessible focus states, `prefers-reduced-motion` respected.
