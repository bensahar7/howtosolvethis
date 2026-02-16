# JSON-LD Schema Implementation

## Overview
This document describes the comprehensive JSON-LD structured data implementation for howtosolvethis.com, designed to maximize SEO visibility and rich search results.

## Schema Types Implemented

### 1. Organization Schema (Global)
**Location:** `components/StructuredData.tsx`
**Scope:** All pages (injected in `app/layout.tsx`)

```json
{
  "@type": "Organization",
  "@id": "https://howtosolvethis.com/#organization",
  "name": "How To Solve This?",
  "alternateName": "איך פותרים את זה?",
  "url": "https://howtosolvethis.com",
  "logo": "https://howtosolvethis.com/logo.png",
  "sameAs": [
    "https://www.linkedin.com/in/ben-sahar/",
    "https://open.spotify.com/show/...",
    "https://podcasts.apple.com/..."
  ]
}
```

**Benefits:**
- Establishes brand identity in Google Knowledge Graph
- Links social profiles for entity recognition
- Enables rich snippets in search results

### 2. WebSite Schema (Global)
**Location:** `components/StructuredData.tsx`
**Scope:** All pages (injected in `app/layout.tsx`)

```json
{
  "@type": "WebSite",
  "@id": "https://howtosolvethis.com/#website",
  "url": "https://howtosolvethis.com",
  "name": "How To Solve This?",
  "publisher": {
    "@id": "https://howtosolvethis.com/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://howtosolvethis.com/?s={search_term_string}"
  }
}
```

**Benefits:**
- Enables Google Sitelinks Search Box
- Improves site structure understanding
- Links to Organization schema via @id reference

### 3. PodcastSeries Schema (Home Page)
**Location:** `components/PodcastSeriesSchema.tsx`
**Scope:** Home page only (`app/page.tsx`)

```json
{
  "@type": "PodcastSeries",
  "@id": "https://howtosolvethis.com/#podcast",
  "name": "איך פותרים את זה?",
  "description": "פודקאסט קליימט-טק ויזמות אקלים",
  "url": "https://howtosolvethis.com",
  "author": {
    "@type": "Person",
    "name": "בן סהר"
  },
  "publisher": {
    "@id": "https://howtosolvethis.com/#organization"
  },
  "genre": ["Technology", "Climate", "Innovation"],
  "webFeed": "https://anchor.fm/s/f8c5a9a8/podcast/rss"
}
```

**Benefits:**
- Qualifies for Google Podcasts rich results
- Shows podcast player in search results
- Displays episode list in Knowledge Panel

### 4. PodcastEpisode Schema (Dynamic - Episode Pages)
**Location:** `components/EpisodeStructuredData.tsx`
**Scope:** Individual episode pages (`app/episodes/[id]/page.tsx`)

```json
{
  "@type": "PodcastEpisode",
  "@id": "https://howtosolvethis.com/episodes/{id}#episode",
  "name": "{episode.title}",
  "description": "{episode.description}",
  "url": "https://howtosolvethis.com/episodes/{id}",
  "datePublished": "{episode.pubDate}",
  "associatedMedia": {
    "@type": "AudioObject",
    "contentUrl": "{episode.audioUrl}",
    "duration": "{episode.duration}"
  },
  "partOfSeries": {
    "@id": "https://howtosolvethis.com/#podcast"
  },
  "creator": [
    {
      "@type": "Person",
      "name": "{guest.name}",
      "url": "{guest.linkedIn}"
    }
  ],
  "mentions": [
    {
      "@type": "Organization",
      "name": "{company.name}",
      "url": "{company.website}"
    }
  ]
}
```

**Dynamic Features:**
- Pulls data from RSS feed + local metadata
- Includes guest LinkedIn profiles
- Mentions companies featured in episode
- Links to parent PodcastSeries via @id
- Includes researcher info when available

**Benefits:**
- Individual episode rich results
- Voice search optimization
- Episode player in search results
- Guest/company entity linking

## Schema Relationships

```
Organization (#organization)
    ↓
WebSite (#website) ← publisher
    ↓
PodcastSeries (#podcast) ← publisher
    ↓
PodcastEpisode (#episode) ← partOfSeries
```

All schemas are linked via `@id` references, creating a semantic graph that search engines can traverse.

## SEO Impact

### Expected Rich Results:
1. **Sitelinks Search Box** - Direct search from Google SERP
2. **Podcast Player** - Inline audio player in search results
3. **Episode Carousel** - Scrollable episode list
4. **Knowledge Panel** - Brand info with social links
5. **Breadcrumbs** - Enhanced navigation in search results

### Voice Search Optimization:
- Episode transcripts (first 5000 chars) included in schema
- Natural language descriptions
- Hebrew language support (`inLanguage: "he"`)

### Entity Recognition:
- Guests linked via LinkedIn URLs
- Companies mentioned with websites
- Researcher profiles with Google Scholar links

## Testing & Validation

### Google Rich Results Test:
```bash
https://search.google.com/test/rich-results?url=https://howtosolvethis.com
https://search.google.com/test/rich-results?url=https://howtosolvethis.com/episodes/1
```

### Schema.org Validator:
```bash
https://validator.schema.org/#url=https://howtosolvethis.com
```

### Expected Warnings (Safe to Ignore):
- "Missing required field 'aggregateRating'" - Not applicable for podcasts
- "Missing 'image' for Person" - Optional field

## Maintenance

### Adding New Episodes:
No action required - schema is generated dynamically from:
- RSS feed data
- Local metadata files (`meta.md.txt`)

### Updating Organization Info:
Edit `components/StructuredData.tsx`:
- Update `sameAs` array for new social profiles
- Update logo URL if changed
- Update Spotify show URL

### Updating Podcast Description:
Edit `components/PodcastSeriesSchema.tsx`:
- Update `description` field
- Update `genre` array if needed

## Technical Notes

### No Duplicate Schemas:
- Each schema type appears only once per page
- Episode pages do NOT include PodcastSeries schema (only PodcastEpisode)
- Home page includes both Organization + WebSite + PodcastSeries

### Clean JSON Output:
- All undefined fields are removed via `JSON.parse(JSON.stringify())`
- No trailing commas or syntax errors
- Proper escaping of Hebrew characters

### Performance:
- Schemas are generated server-side (SSG)
- No runtime overhead
- Cached with 1-hour revalidation

## Monitoring

### Google Search Console:
Monitor "Enhancements" section for:
- Podcast episode errors
- Rich result eligibility
- Structured data warnings

### Expected Indexing Timeline:
- New episodes: 1-3 days
- Rich results: 7-14 days
- Knowledge Panel: 2-4 weeks

## Resources

- [Google Podcast Guidelines](https://developers.google.com/search/docs/appearance/structured-data/podcast)
- [Schema.org Podcast](https://schema.org/Podcast)
- [Schema.org PodcastEpisode](https://schema.org/PodcastEpisode)
- [JSON-LD Best Practices](https://json-ld.org/spec/latest/json-ld/)

---

**Implementation Date:** February 16, 2026
**Last Updated:** February 16, 2026
**Status:** ✅ Production Ready
