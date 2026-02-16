# JSON-LD Schema Architecture

## Visual Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         GLOBAL LAYOUT (All Pages)                    │
│                        app/layout.tsx <head>                         │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  components/StructuredData.tsx                               │   │
│  │                                                               │   │
│  │  ┌─────────────────────┐    ┌─────────────────────┐        │   │
│  │  │  Organization        │    │  WebSite            │        │   │
│  │  │  @id: #organization  │◄───┤  @id: #website      │        │   │
│  │  │                      │    │  publisher: ────────┼────┐   │   │
│  │  │  - Name              │    │  - URL              │    │   │   │
│  │  │  - Logo              │    │  - Search Action    │    │   │   │
│  │  │  - Social Links      │    │  - Language         │    │   │   │
│  │  └─────────────────────┘    └─────────────────────┘    │   │   │
│  │                                                          │   │   │
│  └──────────────────────────────────────────────────────────┼───┘   │
└───────────────────────────────────────────────────────────┼─────────┘
                                                             │
                                                             │
┌────────────────────────────────────────────────────────────┼─────────┐
│                       HOME PAGE (/)                        │         │
│                      app/page.tsx                          │         │
│                                                            │         │
│  ┌────────────────────────────────────────────────────────┼────┐    │
│  │  components/PodcastSeriesSchema.tsx                    │    │    │
│  │                                                         │    │    │
│  │  ┌──────────────────────────────────────────────┐     │    │    │
│  │  │  PodcastSeries                                │     │    │    │
│  │  │  @id: #podcast                                │     │    │    │
│  │  │                                               │     │    │    │
│  │  │  - Name: "איך פותרים את זה?"                 │     │    │    │
│  │  │  - Description: "פודקאסט קליימט-טק..."      │     │    │    │
│  │  │  - Author: בן סהר                             │     │    │    │
│  │  │  - Genre: [Climate, Tech, Innovation]        │     │    │    │
│  │  │  - RSS Feed                                   │     │    │    │
│  │  │  - Listen Actions (Spotify, Apple)           │     │    │    │
│  │  │  - Publisher: ──────────────────────────────────────┘    │    │
│  │  └──────────────────────────────────────────────┘          │    │
│  └─────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ partOfSeries
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   EPISODE PAGES (/episodes/[id])                     │
│                   app/episodes/[id]/page.tsx                         │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  components/EpisodeStructuredData.tsx                        │   │
│  │                                                               │   │
│  │  ┌─────────────────────────────────────────────────────┐    │   │
│  │  │  PodcastEpisode                                      │    │   │
│  │  │  @id: /episodes/1#episode                            │    │   │
│  │  │                                                       │    │   │
│  │  │  ┌─────────────────────────────────────────────┐    │    │   │
│  │  │  │  Core Data                                   │    │    │   │
│  │  │  │  - episodeNumber: 1                          │    │    │   │
│  │  │  │  - name: "Episode Title"                     │    │    │   │
│  │  │  │  - description: "..."                        │    │    │   │
│  │  │  │  - datePublished: "2024-01-01"               │    │    │   │
│  │  │  │  - url: /episodes/1                          │    │    │   │
│  │  │  └─────────────────────────────────────────────┘    │    │   │
│  │  │                                                       │    │   │
│  │  │  ┌─────────────────────────────────────────────┐    │    │   │
│  │  │  │  Media                                       │    │    │   │
│  │  │  │  - image: { url, width, height }             │    │    │   │
│  │  │  │  - audio: { contentUrl, duration }           │    │    │   │
│  │  │  └─────────────────────────────────────────────┘    │    │   │
│  │  │                                                       │    │   │
│  │  │  ┌─────────────────────────────────────────────┐    │    │   │
│  │  │  │  Relationships                               │    │    │   │
│  │  │  │  - partOfSeries: ──► #podcast                │    │    │   │
│  │  │  │  - publisher: ──────► #organization          │    │    │   │
│  │  │  └─────────────────────────────────────────────┘    │    │   │
│  │  │                                                       │    │   │
│  │  │  ┌─────────────────────────────────────────────┐    │    │   │
│  │  │  │  People (Dynamic)                            │    │    │   │
│  │  │  │  - creator: [                                │    │    │   │
│  │  │  │      {                                       │    │    │   │
│  │  │  │        @type: "Person",                      │    │    │   │
│  │  │  │        name: "Guest Name",                   │    │    │   │
│  │  │  │        sameAs: "LinkedIn URL",               │    │    │   │
│  │  │  │        worksFor: {                           │    │    │   │
│  │  │  │          @type: "Organization",              │    │    │   │
│  │  │  │          name: "Company",                    │    │    │   │
│  │  │  │          url: "Website"                      │    │    │   │
│  │  │  │        }                                     │    │    │   │
│  │  │  │      }                                       │    │    │   │
│  │  │  │    ]                                         │    │    │   │
│  │  │  └─────────────────────────────────────────────┘    │    │   │
│  │  │                                                       │    │   │
│  │  │  ┌─────────────────────────────────────────────┐    │    │   │
│  │  │  │  Content                                     │    │    │   │
│  │  │  │  - keywords: "בי-טק, Bee-Tech, האבקה..."   │    │    │   │
│  │  │  │  - about: { sector }                         │    │    │   │
│  │  │  │  - transcript: {                             │    │    │   │
│  │  │  │      text: "First 5000 chars...",            │    │    │   │
│  │  │  │      encodingFormat: "text/plain",           │    │    │   │
│  │  │  │      inLanguage: "he"                        │    │    │   │
│  │  │  │    }                                         │    │    │   │
│  │  │  └─────────────────────────────────────────────┘    │    │   │
│  │  │                                                       │    │   │
│  │  │  ┌─────────────────────────────────────────────┐    │    │   │
│  │  │  │  Mentions (Companies Featured)               │    │    │   │
│  │  │  │  - mentions: [                               │    │    │   │
│  │  │  │      {                                       │    │    │   │
│  │  │  │        @type: "Organization",                │    │    │   │
│  │  │  │        name: "ToBee",                        │    │    │   │
│  │  │  │        url: "https://..."                    │    │    │   │
│  │  │  │      },                                      │    │    │   │
│  │  │  │      { ... BeeHero ... }                     │    │    │   │
│  │  │  │    ]                                         │    │    │   │
│  │  │  └─────────────────────────────────────────────┘    │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

## Data Flow

```
┌──────────────────┐
│  RSS Feed        │
│  (Anchor.fm)     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐      ┌──────────────────┐
│  lib/            │      │  Context/        │
│  rss-parser.ts   │◄─────┤  Episodes/       │
│                  │      │  */meta.md.txt   │
└────────┬─────────┘      └──────────────────┘
         │
         ▼
┌──────────────────┐
│  lib/            │
│  episode-        │
│  matcher.ts      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  EnrichedEpisode │
│  (Type)          │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐      ┌──────────────────┐
│  components/     │◄─────┤  lib/            │
│  Episode         │      │  schema-         │
│  StructuredData  │      │  helpers.ts      │
└────────┬─────────┘      └──────────────────┘
         │
         ▼
┌──────────────────┐
│  <script         │
│   type=          │
│   "application/  │
│   ld+json">      │
└──────────────────┘
```

## Schema Linking Strategy

### @id References
All schemas use `@id` to create a knowledge graph:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://howtosolvethis.com/#organization"
    },
    {
      "@type": "WebSite",
      "@id": "https://howtosolvethis.com/#website",
      "publisher": {
        "@id": "https://howtosolvethis.com/#organization"
      }
    },
    {
      "@type": "PodcastSeries",
      "@id": "https://howtosolvethis.com/#podcast",
      "publisher": {
        "@id": "https://howtosolvethis.com/#organization"
      }
    },
    {
      "@type": "PodcastEpisode",
      "@id": "https://howtosolvethis.com/episodes/1#episode",
      "partOfSeries": {
        "@id": "https://howtosolvethis.com/#podcast"
      },
      "publisher": {
        "@id": "https://howtosolvethis.com/#organization"
      }
    }
  ]
}
```

## Component Hierarchy

```
app/layout.tsx
├── <head>
│   └── <StructuredData />
│       ├── Organization Schema
│       └── WebSite Schema
└── <body>
    └── {children}

app/page.tsx
├── <PodcastSeriesSchema />
│   └── PodcastSeries Schema
└── <EpisodeGrid />

app/episodes/[id]/page.tsx
├── <EpisodeStructuredData episode={...} />
│   └── PodcastEpisode Schema (Dynamic)
└── Episode Content
```

## Helper Functions Usage

```typescript
// lib/schema-helpers.ts

// Clean undefined values
const schema = cleanSchemaObject({
  name: "Test",
  url: undefined,  // Will be removed
  image: null      // Will be removed
});
// Result: { name: "Test" }

// Create image object
const image = createImageSchema(
  "https://howtosolvethis.com/logo.png",
  512,
  512
);
// Result: { "@type": "ImageObject", "url": "...", "width": 512, "height": 512 }

// Format keywords
const keywords = formatKeywords([
  "Climate Tech",
  { he: "בי-טק", en: "Bee-Tech" }
]);
// Result: "Climate Tech, בי-טק, Bee-Tech"

// Stringify for injection
const html = stringifySchema(schema);
// Result: Clean JSON string without undefined values
```

## Multi-Company Episode Example

For episodes with multiple companies (e.g., Episode 1: Bees):

```json
{
  "@type": "PodcastEpisode",
  "creator": [
    {
      "@type": "Person",
      "name": "ד\"ר נורית אליאש",
      "sameAs": "https://www.linkedin.com/in/..."
    },
    {
      "@type": "Person",
      "name": "אבנר עינב",
      "worksFor": {
        "@type": "Organization",
        "name": "ToBee",
        "url": "https://tobee.ai"
      },
      "sameAs": "https://www.linkedin.com/in/..."
    },
    {
      "@type": "Person",
      "name": "עידו שוקי",
      "worksFor": {
        "@type": "Organization",
        "name": "BeeHero",
        "url": "https://beehero.io"
      },
      "sameAs": "https://www.linkedin.com/in/..."
    }
  ],
  "mentions": [
    {
      "@type": "Organization",
      "name": "ToBee",
      "url": "https://tobee.ai"
    },
    {
      "@type": "Organization",
      "name": "BeeHero",
      "url": "https://beehero.io"
    }
  ]
}
```

## Performance Considerations

### Server-Side Rendering
✅ All schemas generated at build time  
✅ Zero client-side JavaScript overhead  
✅ Cached with static generation  

### Bundle Size
✅ Helper functions: ~2KB  
✅ Schema components: ~3KB each  
✅ Total overhead: <10KB  

### Caching Strategy
```typescript
// Episode data cached for 1 hour
export const revalidate = 3600;

// Static generation at build time
export const dynamic = 'force-static';
```

---

**Architecture designed for:**
- Maximum SEO visibility
- Minimal performance impact
- Easy maintenance
- Scalable for future episodes

**Status:** ✅ Production Ready
