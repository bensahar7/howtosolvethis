# 🚀 Deployment Guide - איך פותרים את זה?

מדריך מקיף לפריסת האתר ל-Production.

---

## 📋 Pre-Deployment Checklist

### ✅ 1. Environment Variables

צור קובץ `.env.local` (או הגדר במערכת הפריסה):

```env
# Required
NEXT_PUBLIC_SITE_URL=https://howtosolvethis.com

# Optional (but recommended)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-verification-code
```

### ✅ 2. Build Test

```bash
npm run build
npm start
```

בדוק ש:
- ✅ Build עובר בהצלחה
- ✅ כל הפרקים מופיעים
- ✅ התאמת metadata תקינה
- ✅ Spotify player עובד
- ✅ Newsletter iframe מוצג כראוי

### ✅ 3. Performance Check

```bash
npm run build
```

וודא:
- ✅ Bundle size סביר (< 500KB)
- ✅ אין warnings קריטיים
- ✅ TypeScript עובר ללא שגיאות

---

## 🌐 Vercel Deployment (Recommended)

### Why Vercel?
- ✅ Built by Next.js creators
- ✅ Zero-config deployment
- ✅ Automatic HTTPS
- ✅ Edge network (CDN)
- ✅ Preview deployments for PRs

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Login

```bash
vercel login
```

### Step 3: Deploy

```bash
# First deployment (will ask questions)
vercel

# Production deployment
vercel --prod
```

### Step 4: Configure Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - `NEXT_PUBLIC_SITE_URL` → `https://your-domain.com`
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` → `G-XXXXXXXXXX` (optional)

### Step 5: Custom Domain

1. Go to **Settings** → **Domains**
2. Add your domain (e.g., `howtosolvethis.com`)
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic)

### Step 6: Redeploy

```bash
vercel --prod
```

---

## 🎯 Netlify Deployment

### Step 1: Install Netlify CLI

```bash
npm i -g netlify-cli
```

### Step 2: Login

```bash
netlify login
```

### Step 3: Initialize

```bash
netlify init
```

Select:
- **Build command:** `npm run build`
- **Publish directory:** `.next`

### Step 4: Configure Build Settings

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NEXT_PUBLIC_SITE_URL = "https://howtosolvethis.com"
```

### Step 5: Deploy

```bash
netlify deploy --prod
```

### Step 6: Environment Variables

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Add your variables

---

## 🐳 Docker Deployment (Advanced)

### Dockerfile

```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

### Build & Run

```bash
docker build -t howtosolvethis .
docker run -p 3000:3000 -e NEXT_PUBLIC_SITE_URL=https://howtosolvethis.com howtosolvethis
```

---

## 🔒 Security Checklist

### ✅ Headers (Already configured in `middleware.ts`)

- ✅ `X-Frame-Options: DENY`
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `Referrer-Policy: strict-origin-when-cross-origin`
- ✅ `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### ✅ HTTPS

- ✅ Force HTTPS redirect (handled by Vercel/Netlify)
- ✅ HSTS header (add in production)

### ✅ API Keys

- ✅ Never commit `.env.local`
- ✅ Use environment variables for sensitive data
- ✅ Rotate keys regularly

---

## 📊 Monitoring & Analytics

### Google Analytics 4

1. Create GA4 property: [analytics.google.com](https://analytics.google.com/)
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to environment variables:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
4. Deploy

### Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `https://howtosolvethis.com`
3. Verify ownership:
   - Add verification code to `.env`:
     ```env
     NEXT_PUBLIC_GOOGLE_VERIFICATION=your-code
     ```
   - Or upload verification file to `public/`
4. Submit sitemap: `https://howtosolvethis.com/sitemap.xml`

### Vercel Analytics (Optional)

```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 🔄 CI/CD Setup

### GitHub Actions (Example)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_SITE_URL: ${{ secrets.SITE_URL }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Images Not Loading

- ✅ Check `next.config.ts` → `images.remotePatterns`
- ✅ Verify image URLs in RSS feed
- ✅ Check network tab in browser DevTools

### RSS Feed Issues

- ✅ Test RSS URL manually: `https://anchor.fm/s/f8c5a9a8/podcast/rss`
- ✅ Check CORS headers
- ✅ Verify `lib/rss-parser.ts` error handling

### Episode Matching Wrong

- ✅ Check `lib/episode-mapping.ts`
- ✅ Verify episode numbers in RSS feed
- ✅ Check console logs during build

---

## 📈 Performance Optimization

### Lighthouse Score Goals

- ✅ Performance: > 90
- ✅ Accessibility: > 95
- ✅ Best Practices: > 95
- ✅ SEO: 100

### Tips

1. **Images:**
   - Use Next.js Image component
   - Serve AVIF/WebP formats
   - Add `priority` to above-the-fold images

2. **Fonts:**
   - Use local fonts (SF Hebrew)
   - Preload critical fonts
   - Use `font-display: swap`

3. **Caching:**
   - Static pages: 1 hour revalidation
   - Images: 1 year cache
   - RSS feed: 1 hour cache

4. **Code Splitting:**
   - Use dynamic imports for heavy components
   - Lazy load Spotify iframe

---

## 🎉 Post-Deployment

### ✅ Final Checks

1. **Functionality:**
   - ✅ All pages load
   - ✅ Spotify player works
   - ✅ Newsletter form submits
   - ✅ Mobile responsive

2. **SEO:**
   - ✅ Sitemap accessible: `/sitemap.xml`
   - ✅ Robots.txt accessible: `/robots.txt`
   - ✅ Open Graph preview works (test on [metatags.io](https://metatags.io/))

3. **Analytics:**
   - ✅ GA4 tracking active
   - ✅ Search Console verified
   - ✅ Events firing correctly

4. **Performance:**
   - ✅ Run Lighthouse audit
   - ✅ Test on slow 3G
   - ✅ Check Core Web Vitals

---

## 📞 Support

אם נתקלת בבעיות:

1. Check build logs
2. Review error messages
3. Test locally with `npm run build && npm start`
4. Check [Next.js Docs](https://nextjs.org/docs)
5. Contact: [Ben Sahar](https://www.linkedin.com/in/ben-sahar/)

---

**בהצלחה! 🚀**
