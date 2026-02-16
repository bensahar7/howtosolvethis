# JSON-LD Schema Implementation Guide

## Overview
This document describes the comprehensive JSON-LD structured data implementation for **How To Solve This?** podcast website. The implementation follows Schema.org standards and best practices for podcast SEO.

## Architecture

### 1. Global Schemas (Root Layout)
**File:** `components/StructuredData.tsx`  
**Injected in:** `app/layout.tsx` (in `<head>`)

#### Organization Schema
Defines the podcast organization/brand:
```json
{
  "@type": "Organization",
  "@id": "https://howtosolvethis.com/#organization",
  "name": "How To Solve This?",
  "alternateName": "איך פותרים את זה?",
  "logo": "https://howtosolvethis.com/logo.png",
  "sameAs": [
    "LinkedIn URL",
    "Spotify URL",
    "Apple Podcasts URL",
    "YouTube URL"
  ]
}
```

#### WebSite Schema
Defines the website and enables rich search results:
```json
{
  "@type": "WebSite",
  "@id": "https://howtosolvethis.com/#website",
  "url": "https://howtosolvethis.com",
  "name": "How To Solve This?",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://howtosolvethis.com/?s={search_term_string}"
  }
}
```

### 2. PodcastSeries Schema (Home Page)
**File:** `components/PodcastSeriesSchema.tsx`  
**Injected in:** `app/page.tsx`

Defines the podcast series with:
- Name and description
- Author/creator information
- Genre and keywords
- RSS feed URL
- Listen actions (Spotify, Apple Podcasts)

```json
{
  "@type": "PodcastSeries",
  "@id": "https://howtosolvethis.com/#podcast",
  "name": "איך פותרים את זה?",
  "description": "פודקאסט קליימט-טק ויזמות אקלים",
  "webFeed": "RSS_FEED_URL",
  "potentialAction": {
    "@type": "ListenAction",
    "target": [...]
  }
}
```

### 3. Dynamic PodcastEpisode Schema (Episode Pages)
**File:** `components/EpisodeStructuredData.tsx`  
**Injected in:** `app/episodes/[id]/page.tsx`

Dynamically generates schema for each episode with:
- Episode number, name, description
- Publication date
- Audio file URL and duration
- Guest/creator information with LinkedIn profiles
- Company mentions
- Keywords and topics
- Transcript (first 5000 chars for voice search)

```json
{
  "@type": "PodcastEpisode",
  "@id": "https://howtosolvethis.com/episodes/1#episode",
  "episodeNumber": 1,
  "name": "Episode Title",
  "datePublished": "2024-01-01",
  "audio": {
    "@type": "AudioObject",
    "contentUrl": "AUDIO_URL",
    "duration": "PT45M"
  },
  "creator": [...],
  "mentions": [...],
  "transcript": {...}
}
```

## Helper Utilities
**File:** `lib/schema-helpers.ts`

### Functions:
- `cleanSchemaObject()` - Removes undefined/null values recursively
- `stringifySchema()` - Safely stringifies schema for injection
- `createPersonSchema()` - Generates Person schema objects
- `createOrganizationSchema()` - Generates Organization schema objects
- `createImageSchema()` - Generates ImageObject schema objects
- `formatKeywords()` - Formats bilingual keywords for schema

## SEO Benefits

### 1. Rich Search Results
- Podcast carousel in Google Search
- Episode snippets with play buttons
- Rich cards with images and metadata

### 2. Voice Search Optimization
- Transcript inclusion enables voice assistant discovery
- Natural language queries can find relevant episodes

### 3. Podcast App Discovery
- Apple Podcasts, Spotify, Google Podcasts can index episodes
- Direct deep-linking to episodes from search results

### 4. Knowledge Graph Integration
- Organization schema enables Google Knowledge Panel
- Links social profiles and brand assets

### 5. Enhanced Click-Through Rates
- Rich snippets with ratings, dates, and images
- Breadcrumb navigation in search results

## Schema Validation

### Tools to Verify:
1. **Google Rich Results Test**  
   https://search.google.com/test/rich-results
   
2. **Schema.org Validator**  
   https://validator.schema.org/
   
3. **Google Search Console**  
   Check "Enhancements" → "Podcast" section

### How to Test:
```bash
# 1. Build the site
npm run build

# 2. Start production server
npm start

# 3. View page source at:
# - https://howtosolvethis.com (Organization + WebSite + PodcastSeries)
# - https://howtosolvethis.com/episodes/1 (PodcastEpisode)

# 4. Look for <script type="application/ld+json"> tags
```

## Schema Relationships

```
Organization (#organization)
    ↓ publisher
WebSite (#website)
    ↓ publisher
PodcastSeries (#podcast)
    ↓ partOfSeries
PodcastEpisode (#episode)
```

All schemas are linked via `@id` references, creating a cohesive knowledge graph.

## Maintenance

### Adding New Episodes:
No action needed! Episode schemas are generated dynamically from:
- RSS feed data (`lib/rss-parser.ts`)
- Local metadata (`lib/metadata-reader.ts`)
- Episode mapping (`lib/episode-mapping.ts`)

### Updating Organization Info:
Edit `components/StructuredData.tsx`:
- Update `sameAs` array with new social profiles
- Update logo URL if changed

### Updating Podcast Series:
Edit `components/PodcastSeriesSchema.tsx`:
- Update description if podcast focus changes
- Update `webFeed` URL if RSS feed moves
- Update `potentialAction` targets for new platforms

## Code Quality Standards

✅ **Clean Code:**
- Helper functions in `lib/schema-helpers.ts`
- No duplicate schemas
- Undefined values automatically removed

✅ **Type Safety:**
- TypeScript interfaces for all props
- Proper typing for EnrichedEpisode

✅ **Performance:**
- Schemas rendered server-side
- No client-side JavaScript overhead
- Cached with static generation

✅ **Maintainability:**
- Single source of truth for URLs
- Reusable schema generators
- Clear documentation

## Future Enhancements

### Potential Additions:
1. **Review Schema** - Add listener ratings/reviews
2. **FAQPage Schema** - For episode Q&A sections
3. **VideoObject Schema** - If adding video versions
4. **BreadcrumbList Schema** - For navigation paths
5. **Event Schema** - For live podcast recordings

### Analytics Integration:
- Track rich result impressions in Google Search Console
- Monitor click-through rates from podcast carousels
- A/B test episode descriptions for SEO

## References

- [Schema.org Podcast Documentation](https://schema.org/Podcast)
- [Google Podcast Guidelines](https://developers.google.com/search/docs/appearance/structured-data/podcast)
- [JSON-LD Best Practices](https://json-ld.org/spec/latest/json-ld-best-practices/)

---

**Implementation Date:** February 2026  
**Last Updated:** February 16, 2026  
**Status:** ✅ Production Ready
