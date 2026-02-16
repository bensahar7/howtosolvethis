# JSON-LD Schema Verification Checklist

## ✅ Pre-Deployment Verification (Completed)

### Build & Linting:
- [x] `npm run build` - ✅ Passed
- [x] TypeScript compilation - ✅ No errors
- [x] Linter checks - ✅ No errors
- [x] Git commit - ✅ Pushed to main

### Files Created/Modified:
- [x] `components/StructuredData.tsx` - Organization + WebSite schema
- [x] `components/PodcastSeriesSchema.tsx` - PodcastSeries schema
- [x] `components/EpisodeStructuredData.tsx` - Enhanced PodcastEpisode schema
- [x] `app/page.tsx` - Added PodcastSeriesSchema import
- [x] `public/logo.png` - Copied from Context folder

## 🔍 Manual Verification Steps

### Step 1: Verify Home Page Schema (Localhost)

1. Open: `http://localhost:3000`
2. View Page Source (Ctrl+U or Cmd+U)
3. Search for: `application/ld+json`
4. **Expected:** 3 schema blocks:

#### Schema 1: Organization
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://howtosolvethis.com/#organization",
  "name": "How To Solve This?",
  "alternateName": "איך פותרים את זה?",
  "logo": {
    "@type": "ImageObject",
    "url": "https://howtosolvethis.com/logo.png"
  }
}
```

#### Schema 2: WebSite
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://howtosolvethis.com/#website",
  "url": "https://howtosolvethis.com",
  "publisher": {
    "@id": "https://howtosolvethis.com/#organization"
  }
}
```

#### Schema 3: PodcastSeries
```json
{
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  "@id": "https://howtosolvethis.com/#podcast",
  "name": "איך פותרים את זה?",
  "description": "פודקאסט קליימט-טק ויזמות אקלים"
}
```

**✅ Verification:**
- [ ] All 3 schemas present
- [ ] No syntax errors (valid JSON)
- [ ] Hebrew characters display correctly
- [ ] All URLs use `https://`

---

### Step 2: Verify Episode Page Schema (Localhost)

1. Open: `http://localhost:3000/episodes/1`
2. View Page Source (Ctrl+U or Cmd+U)
3. Search for: `application/ld+json`
4. **Expected:** 3 schema blocks:

#### Schema 1: Organization (same as home page)
- [ ] Present

#### Schema 2: WebSite (same as home page)
- [ ] Present

#### Schema 3: PodcastEpisode
```json
{
  "@context": "https://schema.org",
  "@type": "PodcastEpisode",
  "@id": "https://howtosolvethis.com/episodes/1#episode",
  "name": "Episode 1 Title",
  "description": "Episode description...",
  "url": "https://howtosolvethis.com/episodes/1",
  "datePublished": "2024-XX-XX",
  "associatedMedia": {
    "@type": "AudioObject",
    "contentUrl": "https://...",
    "duration": "PT45M"
  },
  "partOfSeries": {
    "@id": "https://howtosolvethis.com/#podcast"
  },
  "creator": [
    {
      "@type": "Person",
      "name": "Guest Name",
      "url": "https://linkedin.com/..."
    }
  ]
}
```

**✅ Verification:**
- [ ] PodcastEpisode schema present
- [ ] Episode data is dynamic (not hardcoded)
- [ ] Guest names and LinkedIn URLs present
- [ ] Company mentions present (if applicable)
- [ ] `partOfSeries` links to `#podcast`

---

### Step 3: Verify Logo Accessibility

1. Open: `http://localhost:3000/logo.png`
2. **Expected:** Podcast logo image displays

**✅ Verification:**
- [ ] Logo loads successfully (200 OK)
- [ ] Image is visible
- [ ] File size is reasonable (< 500KB)

---

### Step 4: Test with Google Rich Results Tool

1. Wait for Vercel deployment (~2 minutes)
2. Open: [Google Rich Results Test](https://search.google.com/test/rich-results)
3. Test URLs:
   - `https://howtosolvethis.com`
   - `https://howtosolvethis.com/episodes/1`

**✅ Expected Results:**

#### Home Page:
- [ ] "Valid" status
- [ ] PodcastSeries detected
- [ ] Organization detected
- [ ] WebSite detected
- [ ] No critical errors

#### Episode Page:
- [ ] "Valid" status
- [ ] PodcastEpisode detected
- [ ] Links to PodcastSeries
- [ ] Audio object present
- [ ] No critical errors

**⚠️ Acceptable Warnings:**
- "Missing aggregateRating" - Not applicable
- "Missing image for Person" - Optional field

---

### Step 5: Validate with Schema.org Validator

1. Open: [Schema.org Validator](https://validator.schema.org/)
2. Test URLs:
   - `https://howtosolvethis.com`
   - `https://howtosolvethis.com/episodes/1`

**✅ Expected Results:**
- [ ] No syntax errors
- [ ] All @id references resolve
- [ ] Hebrew characters display correctly
- [ ] All required fields present

---

## 🚀 Post-Deployment Verification (Production)

### Step 6: Verify on Live Site

1. Open: `https://howtosolvethis.com`
2. View Page Source
3. **Verify:**
   - [ ] All schemas present
   - [ ] URLs use production domain (not localhost)
   - [ ] Logo URL resolves: `https://howtosolvethis.com/logo.png`

### Step 7: Submit to Google Search Console

1. Log in to [Google Search Console](https://search.google.com/search-console)
2. Select property: `howtosolvethis.com`
3. Go to: Sitemaps
4. Submit: `https://howtosolvethis.com/sitemap.xml`
5. Go to: URL Inspection
6. Request indexing for:
   - `https://howtosolvethis.com`
   - `https://howtosolvethis.com/episodes/1`
   - `https://howtosolvethis.com/episodes/2`

**✅ Verification:**
- [ ] Sitemap submitted successfully
- [ ] Indexing requested for key pages
- [ ] No errors in "Enhancements" section

---

## 📊 Monitoring (Ongoing)

### Week 1:
- [ ] Check Google Search Console for indexing status
- [ ] Monitor "Enhancements" → "Podcast" section
- [ ] Verify no structured data errors

### Week 2-4:
- [ ] Check for rich results in Google Search
- [ ] Search: `site:howtosolvethis.com podcast`
- [ ] Monitor impressions for podcast-related queries

### Month 1-3:
- [ ] Track organic traffic from podcast queries
- [ ] Monitor Knowledge Panel appearance
- [ ] Check for episode carousel in search results

---

## 🐛 Troubleshooting

### Issue: Schema not detected by Google

**Solutions:**
1. Check for syntax errors in JSON-LD
2. Verify all URLs use `https://`
3. Ensure no `noindex` meta tags
4. Wait 7-14 days for indexing

### Issue: Hebrew characters display incorrectly

**Solutions:**
1. Verify UTF-8 encoding in source
2. Check `<meta charset="utf-8">` in head
3. Validate with Schema.org validator

### Issue: Logo not loading

**Solutions:**
1. Check file exists: `public/logo.png`
2. Verify URL: `https://howtosolvethis.com/logo.png`
3. Check file permissions
4. Clear browser cache

---

## 📝 Notes

### Schema Relationships:
```
Organization (#organization)
    ↓
WebSite (#website) ← publisher
    ↓
PodcastSeries (#podcast) ← publisher
    ↓
PodcastEpisode (#episode) ← partOfSeries
```

### Key URLs:
- **Home:** `https://howtosolvethis.com`
- **Episode:** `https://howtosolvethis.com/episodes/[id]`
- **Logo:** `https://howtosolvethis.com/logo.png`
- **Sitemap:** `https://howtosolvethis.com/sitemap.xml`

### Testing Tools:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- [Google Search Console](https://search.google.com/search-console)

---

**Created:** February 16, 2026
**Last Updated:** February 16, 2026
**Status:** Ready for Verification
