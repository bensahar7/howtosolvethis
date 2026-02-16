# JSON-LD Schema Verification Guide

## Quick Verification Checklist

### ✅ Step 1: View Page Source
Open your browser and check the following pages:

#### Home Page: https://howtosolvethis.com
Look for **3 schema blocks** in the `<head>`:
1. **Organization Schema** - Contains `"@type": "Organization"`
2. **WebSite Schema** - Contains `"@type": "WebSite"`
3. **PodcastSeries Schema** - Contains `"@type": "PodcastSeries"`

#### Episode Page: https://howtosolvethis.com/episodes/1
Look for **4 schema blocks**:
1. **Organization Schema** (from layout)
2. **WebSite Schema** (from layout)
3. **PodcastEpisode Schema** - Contains `"@type": "PodcastEpisode"`
   - Check for `episodeNumber`, `name`, `datePublished`
   - Check for `creator` array with guest names
   - Check for `mentions` array with company names
   - Check for `transcript` object (first 5000 chars)

### ✅ Step 2: Google Rich Results Test
1. Go to: https://search.google.com/test/rich-results
2. Enter URL: `https://howtosolvethis.com`
3. Click "Test URL"
4. **Expected Results:**
   - ✅ Valid Organization
   - ✅ Valid WebSite
   - ✅ Valid PodcastSeries

5. Test an episode: `https://howtosolvethis.com/episodes/1`
6. **Expected Results:**
   - ✅ Valid PodcastEpisode
   - ✅ Linked to PodcastSeries
   - ✅ Audio object detected

### ✅ Step 3: Schema.org Validator
1. Go to: https://validator.schema.org/
2. Paste the full HTML source of your homepage
3. Click "Validate"
4. **Expected Results:**
   - ✅ No errors
   - ✅ All schemas properly linked via `@id`

### ✅ Step 4: Google Search Console
1. Go to: https://search.google.com/search-console
2. Navigate to "Enhancements" → "Podcast"
3. **Expected Results:**
   - ✅ Podcast series detected
   - ✅ Episodes indexed
   - ✅ No errors or warnings

### ✅ Step 5: Browser DevTools Check
1. Open any page on your site
2. Press F12 (DevTools)
3. Go to "Console" tab
4. Paste this code:

```javascript
// Extract all JSON-LD schemas
const schemas = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
  .map(script => JSON.parse(script.textContent));

console.log('Found schemas:', schemas.length);
schemas.forEach((schema, i) => {
  console.log(`Schema ${i + 1}:`, schema['@type'] || schema['@graph']?.map(s => s['@type']));
});
```

5. **Expected Output:**
   - Home Page: 3 schemas (Organization, WebSite, PodcastSeries)
   - Episode Page: 4 schemas (Organization, WebSite, PodcastEpisode, and possibly others)

## Visual Verification in Search Results

### What to Look For:
After Google indexes your site (can take 1-2 weeks), search for:

**Query:** `site:howtosolvethis.com`

**Expected Rich Results:**
- 🎙️ Podcast carousel with episode cards
- 📅 Publication dates visible
- 🖼️ Episode images displayed
- ▶️ Play button integration (if supported)

**Query:** `"איך פותרים את זה?" podcast`

**Expected Knowledge Panel:**
- Organization logo
- Links to social profiles (LinkedIn, Spotify)
- Description of the podcast
- Episode list

## Common Issues & Fixes

### Issue: Schemas not appearing
**Fix:** Clear cache and rebuild:
```bash
npm run build
npm start
```

### Issue: "Invalid @id reference"
**Fix:** Ensure all `@id` values match exactly:
- Organization: `https://howtosolvethis.com/#organization`
- WebSite: `https://howtosolvethis.com/#website`
- PodcastSeries: `https://howtosolvethis.com/#podcast`
- PodcastEpisode: `https://howtosolvethis.com/episodes/[id]#episode`

### Issue: Missing transcript data
**Fix:** Ensure `transcript.txt` files exist in episode folders:
```
Context/Episodes/ep1-bees/transcript.txt
Context/Episodes/ep2-structurepal/transcript.txt
...
```

### Issue: Guest LinkedIn not showing
**Fix:** Check `meta.md.txt` files have correct format:
```
**Guest LinkedIn:** https://www.linkedin.com/in/username/
```

## Monitoring & Analytics

### Key Metrics to Track:
1. **Impressions** - How often your podcast appears in search
2. **Click-Through Rate (CTR)** - % of people who click from search
3. **Rich Result Impressions** - How often rich results appear
4. **Episode Discovery** - Which episodes get the most clicks

### Tools:
- Google Search Console (free)
- Ahrefs / SEMrush (paid, for competitive analysis)
- Podcast Analytics (Spotify, Apple Podcasts)

## Next Steps

### Week 1: Initial Indexing
- Submit sitemap to Google Search Console
- Request indexing for homepage and top 3 episodes
- Monitor for crawl errors

### Week 2-4: Optimization
- Check which episodes rank for target keywords
- Update episode descriptions based on search queries
- Add more keywords to meta.md.txt files

### Month 2+: Growth
- Track organic traffic from search
- Optimize underperforming episodes
- Create content around trending topics

---

**Need Help?**
- [Google Search Central](https://developers.google.com/search/docs)
- [Schema.org Documentation](https://schema.org/Podcast)
- [JSON-LD Playground](https://json-ld.org/playground/)

**Status:** ✅ Implementation Complete  
**Last Updated:** February 16, 2026
