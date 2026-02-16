# JSON-LD Schema Implementation Guide

## Overview
This document describes the comprehensive Schema.org structured data implementation for the "איך פותרים את זה?" (How To Solve This?) podcast website.

## Schema Architecture

### 1. Global Schemas (All Pages)
**Location:** `components/StructuredData.tsx` → Injected in `app/layout.tsx`

#### Organization Schema
Defines the podcast/company entity with:
- **Name:** "How To Solve This?" / "איך פותרים את זה?"
- **URL:** https://howtosolvethis.com
- **Logo:** https://howtosolvethis.com/logo.png (512x512)
- **Founder:** בן סהר (Ben Sahar)
- **Social Links (sameAs):**
  - LinkedIn: https://www.linkedin.com/in/ben-sahar/
  - Spotify: https://open.spotify.com/show/4VKarRdsnGJxd4VDXXfVKH
  - Apple Podcasts: https://podcasts.apple.com/...
  - YouTube: https://www.youtube.com/@HowToSolveThis

**Benefits:**
- Establishes brand identity in Google Knowledge Graph
- Enables rich results for organization searches
- Links all social profiles to the main entity

#### WebSite Schema
Defines the website structure with:
- **URL:** https://howtosolvethis.com
- **Name:** "איך פותרים את זה?"
- **Description:** "פודקאסט קליימט-טק ויזמות אקלים"
- **SearchAction:** Enables Google sitelinks search box
- **Publisher Reference:** Links to Organization schema via @id

**Benefits:**
- Enables Google sitelinks search box in search results
- Improves site navigation in search results
- Establishes site hierarchy

---

### 2. Home Page Schema
**Location:** `components/PodcastSeriesSchema.tsx` → Injected in `app/page.tsx`

#### PodcastSeries Schema
Defines the podcast series with:
- **Name:** "איך פותרים את זה?" / "How To Solve This?"
- **Description:** "פודקאסט קליימט-טק ויזמות אקלים"
- **URL:** https://howtosolvethis.com
- **Image:** Hero image (1200x630)
- **Author/Creator:** בן סהר
- **Genre:** Technology, Climate, Innovation, Entrepreneurship, etc.
- **Keywords:** קליימט-טק, יזמות, אקלים, חדשנות...
- **RSS Feed:** https://anchor.fm/s/f8c5a9a8/podcast/rss
- **ListenAction:** Direct links to Spotify and Apple Podcasts

**Benefits:**
- Enables podcast-specific rich results in Google Search
- Provides direct "Listen" buttons in search results
- Improves discoverability on podcast platforms
- Supports voice search optimization

---

### 3. Episode Pages Schema
**Location:** `components/EpisodeStructuredData.tsx` → Injected in `app/episodes/[id]/page.tsx`

#### PodcastEpisode Schema (Dynamic)
Generates episode-specific structured data with:
- **Name:** Episode title (from RSS feed)
- **Description:** Episode problem/description (from metadata)
- **URL:** https://howtosolvethis.com/episodes/{id}
- **Date Published:** Episode publication date
- **Image:** Episode artwork (1400x1400)
- **Audio:** Direct audio file URL with duration
- **Part of Series:** Reference to PodcastSeries via @id
- **Episode Number:** Sequential episode number
- **Creator:** Guest names (from metadata)
- **About:** Sector/topic (e.g., "Climate Tech", "AgriTech")
- **Keywords:** Bilingual tags (Hebrew/English)
- **Mentions:** Company name and website (if applicable)
- **Transcript:** First 5000 characters (for voice search)
- **Interaction Statistics:** Listen count placeholder

**Benefits:**
- Episode-specific rich results in search
- Voice search optimization via transcript
- Direct audio playback in search results
- Company/guest attribution for SEO
- Improved discoverability by topic/sector

---

## Technical Implementation

### Schema Injection Points

```typescript
// 1. Global (app/layout.tsx)
<head>
  <StructuredData /> {/* Organization + WebSite */}
</head>

// 2. Home Page (app/page.tsx)
<>
  <PodcastSeriesSchema /> {/* PodcastSeries */}
  <Header />
  {/* ... rest of page */}
</>

// 3. Episode Pages (app/episodes/[id]/page.tsx)
<>
  <EpisodeStructuredData episode={episode} /> {/* PodcastEpisode */}
  {/* ... rest of page */}
</>
```

### Schema Relationships (via @id)

```
Organization (@id: #organization)
    ↓
WebSite (publisher: #organization)
    ↓
PodcastSeries (@id: #podcast)
    ↓
PodcastEpisode (partOfSeries: #podcast)
```

This creates a hierarchical relationship that Google understands and uses for rich results.

---

## SEO Benefits

### 1. Rich Results Eligibility
- ✅ Podcast carousel in search results
- ✅ Episode cards with play buttons
- ✅ Organization knowledge panel
- ✅ Sitelinks search box
- ✅ Breadcrumb navigation

### 2. Voice Search Optimization
- ✅ Transcript snippets for Siri/Google Assistant
- ✅ Episode summaries for voice queries
- ✅ Direct playback via voice commands

### 3. Discoverability
- ✅ Topic-based search (Climate Tech, AgriTech, etc.)
- ✅ Guest-based search (find episodes by guest name)
- ✅ Company-based search (find episodes mentioning companies)
- ✅ Bilingual keyword optimization (Hebrew + English)

### 4. Social Sharing
- ✅ Rich previews on LinkedIn/WhatsApp
- ✅ Proper attribution to creator/organization
- ✅ Direct links to listening platforms

---

## Validation & Testing

### Google Tools
1. **Rich Results Test:** https://search.google.com/test/rich-results
   - Test URL: https://howtosolvethis.com
   - Test URL: https://howtosolvethis.com/episodes/1

2. **Schema Markup Validator:** https://validator.schema.org/
   - Paste the page source or URL

3. **Google Search Console:**
   - Monitor "Enhancements" → "Podcast" section
   - Check for errors/warnings

### Expected Results
- ✅ No errors or warnings
- ✅ All schemas recognized as valid
- ✅ Podcast episodes indexed correctly
- ✅ Rich results appear in search (may take 1-2 weeks)

---

## Maintenance

### Adding New Episodes
No action required! Episode schemas are generated dynamically from:
- RSS feed data (title, description, audio URL, date)
- Local metadata files (guests, sector, keywords, transcript)

### Updating Organization Info
Edit `components/StructuredData.tsx`:
- Update social links in `sameAs` array
- Update logo URL if changed
- Update founder/contact information

### Updating Podcast Description
Edit `components/PodcastSeriesSchema.tsx`:
- Update `description` field
- Update `keywords` field
- Update `genre` array

---

## Best Practices

### ✅ DO
- Keep schemas up to date with actual content
- Use canonical URLs (https://howtosolvethis.com)
- Include all available metadata (guests, companies, sectors)
- Test schemas after major updates
- Monitor Google Search Console for errors

### ❌ DON'T
- Don't duplicate schemas (each type once per page)
- Don't use placeholder/fake data
- Don't include broken URLs
- Don't forget to update dates when republishing
- Don't remove @id references (breaks relationships)

---

## Future Enhancements

### Potential Additions
1. **Review Schema:** Add listener reviews/ratings
2. **FAQ Schema:** Add common questions per episode
3. **Video Schema:** If adding video content
4. **Event Schema:** If hosting live events/webinars
5. **Course Schema:** If creating educational content

### Analytics Integration
- Track "Listen" action clicks from search results
- Monitor rich result impressions in Search Console
- A/B test episode descriptions for CTR optimization

---

## Support & Resources

### Official Documentation
- Schema.org Podcast: https://schema.org/Podcast
- Google Podcast Guidelines: https://developers.google.com/search/docs/appearance/structured-data/podcast
- JSON-LD Syntax: https://json-ld.org/

### Internal Files
- `components/StructuredData.tsx` - Global schemas
- `components/PodcastSeriesSchema.tsx` - Series schema
- `components/EpisodeStructuredData.tsx` - Episode schema
- `types/episode.ts` - TypeScript types for metadata

---

## Changelog

### 2026-02-16 - Initial Implementation
- ✅ Organization Schema (global)
- ✅ WebSite Schema (global)
- ✅ PodcastSeries Schema (home page)
- ✅ PodcastEpisode Schema (episode pages, dynamic)
- ✅ Full @id relationship hierarchy
- ✅ Transcript integration for voice search
- ✅ Company/guest attribution
- ✅ Bilingual keyword support

---

**Status:** ✅ Production Ready
**Last Updated:** February 16, 2026
**Maintained By:** Ben Sahar
