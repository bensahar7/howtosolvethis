# איך פותרים את זה? 🌍

**פודקאסט שמנגיש את הבעיות הגדולות של תקופתינו ומפגיש בין יזמים, חוקרים ומשקיעים בעולמות האקלים והסביבה**

🔗 Live at: https://howtosolvethis.com

---

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **RSS Parsing:** rss-parser
- **Deployment:** Vercel / Netlify ready
- **Analytics:** Google Analytics 4 (optional)

---

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd How_to_solve_this_website

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📊 Analytics & Monitoring

הפרויקט כולל מערכת מתקדמת למעקב אחר ביצועים והתנהגות משתמשים:

- **Vercel Analytics:** Real-time user monitoring
- **Vercel Speed Insights:** Core Web Vitals tracking
- **Google Analytics 4:** Custom events & conversions (אופציונלי)
- **Advanced Logger:** Structured logging with error tracking

📖 **מדריך מפורט:** [ANALYTICS.md](./ANALYTICS.md)

---

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Site URL (required for production)
NEXT_PUBLIC_SITE_URL=https://howtosolvethis.com

# Google Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Search Console Verification (optional)
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-verification-code
```

---

## 📁 Project Structure

```
How_to_solve_this_website/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles & design system
│   ├── not-found.tsx        # Custom 404 page
│   ├── sitemap.ts           # Dynamic sitemap
│   └── robots.ts            # SEO robots.txt
├── components/              # React components
│   ├── Header.tsx           # Fixed glassmorphic header
│   ├── EpisodeCard.tsx      # Episode card with Spotify player
│   ├── EpisodeGrid.tsx      # Asymmetric grid layout
│   ├── Newsletter.tsx       # Substack integration
│   ├── Footer.tsx           # Site footer
│   ├── ErrorBoundary.tsx    # Error handling
│   └── GoogleAnalytics.tsx  # GA4 integration
├── lib/                     # Utilities & logic
│   ├── rss-parser.ts        # RSS feed parsing
│   ├── metadata-reader.ts   # Local metadata extraction
│   ├── episode-matcher.ts   # RSS ↔ Local matching
│   ├── episode-mapping.ts   # Manual episode mapping
│   └── analytics.ts         # Analytics utilities
├── types/                   # TypeScript definitions
│   └── episode.ts           # Episode interfaces
├── Context/Episodes/        # Local metadata files
│   ├── ep1-bees/
│   ├── ep2-structurepal/
│   └── ...
├── public/                  # Static assets
│   ├── images/
│   │   └── earth-hero.png   # Background image
│   └── fonts/               # Local fonts (SF Hebrew)
├── .cursor/rules/           # Project configuration
│   ├── config.md.txt        # RSS feed URL & settings
│   ├── design-system.md.txt # Atmospheric design tokens
│   └── rules.md.txt         # Multi-skill workflow
└── middleware.ts            # Security headers & caching
```

---

## 🎨 Design System

### "Atmospheric Curiosity"

הפרויקט משתמש במערכת עיצוב ייחודית המבוססת על:

- **Glassmorphism:** רקעים שקופים עם blur גבוה
- **Image Filters:** תמונות בגווני אפור עם אפקטים קולנועיים
- **RTL Layout:** תמיכה מלאה בעברית
- **Typography:** SF Hebrew (local font)
- **No Shadows:** אסור להשתמש ב-box-shadow
- **Asymmetric Grids:** פריסות לא סימטריות

### Glass Tokens

```css
.glass {
  backdrop-filter: blur(60px);
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-high-blur {
  backdrop-filter: blur(80px);
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
```

---

## 📊 Data Flow

### RSS Feed → Local Metadata → Enriched Episodes

1. **RSS Parsing** (`lib/rss-parser.ts`):
   - Fetches from Spotify RSS feed
   - Extracts episode numbers, titles, descriptions, Spotify IDs
   - Handles multi-season episodes (Season 1: 1-10, Season 2: 11-14)

2. **Local Metadata** (`lib/metadata-reader.ts`):
   - Reads markdown files from `Context/Episodes/`
   - Extracts guests, sectors, keywords, problem/solution

3. **Episode Matching** (`lib/episode-matcher.ts`):
   - Uses manual mapping (`lib/episode-mapping.ts`)
   - Matches RSS episodes to local metadata by episode number
   - Shows "TBD" for missing data

4. **Display** (`components/EpisodeCard.tsx`):
   - Full HTML description from RSS (no truncation)
   - Hebrew labels: אורחים, תחום, תגיות
   - Embedded Spotify player

---

## 🔍 SEO Features

- ✅ **Metadata:** Comprehensive Open Graph & Twitter Cards
- ✅ **Sitemap:** Dynamic sitemap with episode pages
- ✅ **Robots.txt:** Proper crawling directives
- ✅ **Structured Data:** Schema.org PodcastSeries markup
- ✅ **Security Headers:** X-Frame-Options, CSP, etc.
- ✅ **Performance:** Image optimization, caching, compression

---

## 🎯 Performance Optimizations

- **Image Optimization:** Next.js Image with AVIF/WebP
- **Caching:** Static pages revalidate every 1 hour
- **Compression:** Gzip/Brotli enabled
- **Code Splitting:** Automatic by Next.js
- **Lazy Loading:** Images and Spotify iframes

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Set environment variables in Netlify dashboard
```

### Build Command
```bash
npm run build
```

### Output Directory
```
.next
```

---

## 📝 Content Management

### Adding New Episodes

1. **RSS Feed:** Episodes are automatically fetched from Spotify RSS
2. **Local Metadata:** Create a new folder in `Context/Episodes/`:

```
Context/Episodes/ep15-new-episode/
└── meta.md.txt
```

3. **Update Mapping:** Add to `lib/episode-mapping.ts`:

```typescript
export const EPISODE_MAPPING: { [rssEpisodeNumber: number]: string } = {
  // ...
  15: "ep15-new-episode",
};
```

---

## 🐛 Debugging

### Episode Matching Issues

Check console logs during build:

```bash
npm run build
```

Look for:
- `[MATCHER] ✓ Matched RSS #X`
- `[MATCH SUCCESS] Episode X`
- `[MATCHER] No manual mapping found for RSS episode number: X`

### RSS Feed Issues

Test RSS parsing:

```typescript
import { fetchRSSFeed } from "@/lib/rss-parser";
const episodes = await fetchRSSFeed();
console.log(episodes);
```

---

## 📄 License

MIT License - Ben Sahar © 2026

---

## 🙏 Credits

- **Design System:** Atmospheric Curiosity
- **RSS Feed:** Spotify for Podcasters
- **Newsletter:** Substack
- **Fonts:** SF Hebrew

---

## 📞 Contact

- **LinkedIn:** [Ben Sahar](https://www.linkedin.com/in/ben-sahar/)
- **Podcast:** [איך פותרים את זה?](https://open.spotify.com/show/6o05P4G000000000000000)

---

**Built with ❤️ for Climate Tech Innovation**
