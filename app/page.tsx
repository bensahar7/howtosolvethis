import Header from "@/components/Header";
import SpotifyIcon from "@/components/SpotifyIcon";
import EpisodeGrid from "@/components/EpisodeGrid";
import Newsletter from "@/components/Newsletter";
import LinkedInBadge from "@/components/LinkedInBadge";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import ScrollToEpisodesButton from "@/components/ScrollToEpisodesButton";
import PodcastSeriesSchema from "@/components/PodcastSeriesSchema";
import InfiniteLogoScroll from "@/components/InfiniteLogoScroll";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <>
      {/* PodcastSeries Schema for Home Page */}
      <PodcastSeriesSchema />
      
      <Header />

      {/* Hero Section - Redesigned with Clear Hierarchy */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12 md:pb-16 pt-24 md:pt-32">
        <div className="grid grid-cols-12 gap-6">
          {/* Centered Hero Content */}
          <div className="col-span-12 lg:col-span-10 lg:col-start-2">
            
            {/* H1: Main Title - Bold, High Contrast */}
            <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold text-center leading-tight mb-6 md:mb-8 animate-mask-reveal">
              בעיות גדולות,
              <br />
              בגובה העיניים
            </h1>
            
            {/* H2: Sub-headline - Clear, Readable */}
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-white/90 text-center leading-relaxed mb-12 md:mb-16 max-w-4xl mx-auto">
              מדברים עם חוקרים ויזמים שפותרים את הבעיות הגדולות של ימינו
            </h2>
          </div>
        </div>
      </section>

      {/* Infinite Logo Scroll - Authority & Social Proof */}
      <InfiniteLogoScroll />

      {/* Stats Card - Modern Design with Icons */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-10 lg:col-start-2">
            <div className="glass p-8 md:p-12 rounded-sm text-right">
              
              {/* Stats Grid with Icons */}
              <div className="grid grid-cols-3 gap-6 md:gap-12 mb-10">
                
                {/* Episodes Stat */}
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <svg className="w-10 h-10 md:w-12 md:h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <AnimatedCounter value={16} prefix="+" className="text-4xl md:text-5xl font-bold text-white mb-2 block" />
                  <div className="technical-text text-white/60 text-xs md:text-sm">פרקים</div>
                </div>

                {/* Seasons Stat */}
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <svg className="w-10 h-10 md:w-12 md:h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <AnimatedCounter value={2} className="text-4xl md:text-5xl font-bold text-white mb-2 block" />
                  <div className="technical-text text-white/60 text-xs md:text-sm">עונות</div>
                </div>

                {/* Companies Stat */}
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <svg className="w-10 h-10 md:w-12 md:h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <AnimatedCounter value={16} prefix="+" className="text-4xl md:text-5xl font-bold text-white mb-2 block" />
                  <div className="technical-text text-white/60 text-xs md:text-sm">חברות</div>
                </div>
              </div>

              {/* CTA Buttons - Right-aligned for RTL */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                {/* Primary CTA: Spotify (Glassmorphism) */}
                <a
                  href="https://open.spotify.com/show/1ddFDGd1vH4UWIlfGjhS2Y"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-spotify group w-full sm:w-auto"
                  aria-label="האזן בספוטיפיי - פודקאסט איך פותרים את זה"
                >
                  <SpotifyIcon className="w-7 h-7 md:w-8 md:h-8 transition-transform group-hover:scale-110 flex-shrink-0" />
                  <span className="text-lg md:text-xl font-bold">קדימה</span>
                </a>
                
                {/* Secondary CTA: Scroll to Episodes */}
                <ScrollToEpisodesButton />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes Grid Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24" id="episodes">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight text-center md:text-right">
            פרקים אחרונים
          </h2>
          <p className="body-text text-base md:text-lg text-white/70 text-center md:text-right">
            חקרו את הפתרונות החדשניים ביותר לבעיות הגדולות של ימינו
          </p>
        </div>

        {/* Suspense with Loading Skeleton & Error Boundary */}
        <ErrorBoundary>
          <Suspense fallback={<EpisodeGridSkeleton />}>
            <EpisodeGrid />
          </Suspense>
        </ErrorBoundary>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* LinkedIn Badge */}
      <LinkedInBadge />

      {/* Footer */}
      <Footer />
    </>
  );
}

// Loading Skeleton for Episode Grid
function EpisodeGridSkeleton() {
  return (
    <div className="grid grid-cols-12 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="col-span-12 md:col-span-6 lg:col-span-4"
        >
          <div className="glass rounded-sm overflow-hidden skeleton-glass">
            <div className="aspect-video bg-white/5" />
            <div className="p-6 space-y-3">
              <div className="h-4 bg-white/5 rounded w-1/3" />
              <div className="h-6 bg-white/5 rounded w-full" />
              <div className="h-4 bg-white/5 rounded w-2/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
