# 📊 Analytics & Logging Documentation

## סקירה כללית

הפרויקט כולל מערכת מתקדמת למעקב אחר ביצועים, התנהגות משתמשים, ושגיאות.

---

## 🔍 מערכות Analytics

### 1. **Vercel Analytics** (Real User Monitoring)

מעקב אוטומטי אחר:
- ✅ Page views
- ✅ User sessions
- ✅ Geographic data
- ✅ Device types
- ✅ Referrers

**התקנה:**
```bash
npm install @vercel/analytics
```

**שימוש:**
```typescript
// app/layout.tsx
import { Analytics } from "@vercel/analytics/react";

<Analytics />
```

**Dashboard:**
[Vercel Analytics Dashboard](https://vercel.com/dashboard/analytics)

---

### 2. **Vercel Speed Insights** (Core Web Vitals)

מעקב אחר ביצועים:
- ✅ First Contentful Paint (FCP)
- ✅ Largest Contentful Paint (LCP)
- ✅ Cumulative Layout Shift (CLS)
- ✅ First Input Delay (FID)
- ✅ Time to First Byte (TTFB)

**התקנה:**
```bash
npm install @vercel/speed-insights
```

**שימוש:**
```typescript
// app/layout.tsx
import { SpeedInsights } from "@vercel/speed-insights/next";

<SpeedInsights />
```

---

### 3. **Google Analytics 4** (אופציונלי)

מעקב מפורט אחר:
- ✅ Custom events
- ✅ User demographics
- ✅ Conversion tracking
- ✅ E-commerce (if needed)

**הגדרה:**

1. צור GA4 property: [analytics.google.com](https://analytics.google.com/)
2. קבל Measurement ID (G-XXXXXXXXXX)
3. הוסף ל-`.env.local`:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
4. Deploy

**Events מותאמים אישית:**
```typescript
import { trackEvent } from "@/lib/logger";

// Track Spotify plays
trackEvent("spotify_player_open", {
  episodeNumber: 14,
  episodeTitle: "Polymertal",
});

// Track newsletter signups
trackEvent("newsletter_signup", {
  source: "substack_iframe",
});
```

---

## 📝 Logging System

### Logger API

**ייבוא:**
```typescript
import { logger, logInfo, logError, trackEvent } from "@/lib/logger";
```

### Log Levels

#### 1. **Debug** (Development only)
```typescript
logger.debug("Fetching RSS feed", { 
  url: RSS_FEED_URL 
});
```

#### 2. **Info**
```typescript
logger.info("Episode matched successfully", {
  episodeNumber: 14,
  title: "Polymertal",
});
```

#### 3. **Warning**
```typescript
logger.warn("No metadata found for episode", {
  episodeNumber: 15,
  title: "Unknown Episode",
});
```

#### 4. **Error**
```typescript
logger.error("Failed to fetch RSS feed", {
  error: error.message,
  stack: error.stack,
});
```

---

## 📊 Tracked Events

### Episode Interactions

#### 1. **Spotify Player Open**
```typescript
trackEvent("spotify_player_open", {
  episodeNumber: 14,
  episodeTitle: "Polymertal",
});
```

#### 2. **Spotify Link Click**
```typescript
trackEvent("spotify_link_click", {
  episodeNumber: 14,
  episodeTitle: "Polymertal",
});
```

#### 3. **Description Expand/Collapse**
```typescript
trackEvent("episode_description_toggle", {
  episodeNumber: 14,
  action: "expand", // or "collapse"
});
```

---

### Navigation Events

#### 1. **Page View**
```typescript
import { trackPageView } from "@/lib/logger";

trackPageView("/episodes");
```

#### 2. **Newsletter Signup**
```typescript
trackEvent("newsletter_signup", {
  source: "substack_iframe",
});
```

---

### Performance Tracking

#### 1. **RSS Feed Load Time**
```typescript
const startTime = performance.now();
await fetchRSSFeed();
const duration = performance.now() - startTime;

trackPerformance("rss_feed_load", duration, "ms");
```

#### 2. **Episode Matching Time**
```typescript
const startTime = performance.now();
const episodes = await getEnrichedEpisodes();
const duration = performance.now() - startTime;

trackPerformance("episode_matching", duration, "ms");
```

---

### Error Tracking

#### 1. **Track Errors with Context**
```typescript
import { trackError } from "@/lib/logger";

try {
  await fetchRSSFeed();
} catch (error) {
  trackError(error as Error, {
    component: "RSSParser",
    action: "fetchRSSFeed",
  });
}
```

#### 2. **Error Boundary Integration**
```typescript
// components/ErrorBoundary.tsx
componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  trackError(error, {
    component: "ErrorBoundary",
    errorInfo: errorInfo.componentStack,
  });
}
```

---

## 📈 Analytics Dashboard

### Vercel Analytics

**גישה:**
1. התחבר ל-[Vercel Dashboard](https://vercel.com/dashboard)
2. בחר את הפרויקט
3. לחץ על **Analytics**

**מדדים זמינים:**
- Page views (real-time)
- Unique visitors
- Top pages
- Top referrers
- Geographic distribution
- Device breakdown

---

### Google Analytics 4

**גישה:**
1. התחבר ל-[Google Analytics](https://analytics.google.com/)
2. בחר את ה-Property
3. נווט ל-**Reports**

**דוחות מומלצים:**
- **Real-time:** תנועה בזמן אמת
- **Engagement → Events:** כל ה-events המותאמים
- **Engagement → Pages and screens:** ביצועי דפים
- **User attributes → Demographics:** נתוני משתמשים

---

## 🔧 Custom Events Guide

### הוספת Event חדש

#### 1. הגדר את ה-Event ב-Logger
```typescript
// lib/logger.ts
export const trackCustomEvent = (eventName: string, properties?: Record<string, unknown>) => {
  logger.trackEvent(eventName, properties);
};
```

#### 2. השתמש ב-Component
```typescript
// components/YourComponent.tsx
import { trackEvent } from "@/lib/logger";

const handleAction = () => {
  trackEvent("custom_action", {
    userId: user.id,
    actionType: "click",
    target: "button_name",
  });
};
```

#### 3. בדוק ב-GA4
1. נווט ל-**Configure → Events**
2. חפש את ה-event שלך
3. צפה ב-real-time reporting

---

## 🎯 Best Practices

### 1. **Event Naming**
- השתמש ב-snake_case: `episode_play`, `newsletter_signup`
- היה תיאורי: `spotify_player_open` > `play`
- קבוצות לפי קטגוריה: `episode_*`, `navigation_*`

### 2. **Event Properties**
```typescript
// ✅ Good
trackEvent("episode_play", {
  episodeNumber: 14,
  episodeTitle: "Polymertal",
  source: "card_button",
  timestamp: new Date().toISOString(),
});

// ❌ Bad
trackEvent("play", { ep: 14 });
```

### 3. **Performance Tracking**
```typescript
// ✅ Good - Track meaningful operations
trackPerformance("rss_feed_load", duration);

// ❌ Bad - Don't track trivial operations
trackPerformance("button_click", 5);
```

### 4. **Error Context**
```typescript
// ✅ Good - Rich context
trackError(error, {
  component: "EpisodeCard",
  action: "loadSpotifyPlayer",
  episodeId: episode.id,
  userAgent: navigator.userAgent,
});

// ❌ Bad - No context
trackError(error);
```

---

## 🔒 Privacy & GDPR

### Cookie Consent

אם יש צורך ב-cookie consent (GDPR):

```typescript
// components/CookieConsent.tsx
"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShowBanner(false);
    // Initialize analytics here
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-high-blur p-6 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <p className="text-white/80">
          אנחנו משתמשים ב-cookies כדי לשפר את חווית המשתמש.
        </p>
        <button onClick={acceptCookies} className="btn-glass">
          אישור
        </button>
      </div>
    </div>
  );
}
```

---

## 📊 Monitoring Checklist

### Daily
- [ ] בדוק real-time traffic ב-Vercel Analytics
- [ ] סקור שגיאות ב-console logs

### Weekly
- [ ] נתח top episodes (most played)
- [ ] בדוק conversion rate (newsletter signups)
- [ ] סקור Core Web Vitals

### Monthly
- [ ] השווה ביצועים לחודש הקודם
- [ ] זהה דפוסי שימוש
- [ ] אופטימיזציה לפי insights

---

## 🚨 Troubleshooting

### Analytics לא עובד

#### 1. Vercel Analytics
```bash
# בדוק שהחבילה מותקנת
npm list @vercel/analytics

# וודא שה-component מיובא
grep -r "Analytics" app/layout.tsx
```

#### 2. Google Analytics
```javascript
// בדוק ב-browser console
console.log(window.gtag);

// אם undefined, בדוק:
// 1. NEXT_PUBLIC_GA_MEASUREMENT_ID מוגדר
// 2. GoogleAnalytics component מיובא
// 3. Script נטען (בדוק ב-Network tab)
```

### Events לא מופיעים ב-GA4

1. **Real-time Test:**
   - נווט ל-GA4 → Reports → Real-time
   - בצע action באתר
   - בדוק אם ה-event מופיע (עד 60 שניות delay)

2. **Debug Mode:**
   ```typescript
   // Enable GA4 debug mode
   window.gtag("config", GA_MEASUREMENT_ID, {
     debug_mode: true,
   });
   ```

3. **Browser Console:**
   ```javascript
   // Check if events are being sent
   window.dataLayer
   ```

---

## 📚 Resources

- [Vercel Analytics Docs](https://vercel.com/docs/analytics)
- [Google Analytics 4 Docs](https://support.google.com/analytics/answer/9304153)
- [Core Web Vitals](https://web.dev/vitals/)
- [Event Tracking Best Practices](https://developers.google.com/analytics/devguides/collection/ga4/events)

---

**Built with data-driven insights! 📊**
