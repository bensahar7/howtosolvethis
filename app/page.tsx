import Header from "@/components/Header";
import SpotifyIcon from "@/components/SpotifyIcon";
import EpisodeGrid from "@/components/EpisodeGrid";
import Newsletter from "@/components/Newsletter";
import LinkedInBadge from "@/components/LinkedInBadge";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import ScrollToEpisodesButton from "@/components/ScrollToEpisodesButton";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Hero Section - Asymmetric but CENTERED Container */}
      <section className="max-w-7xl mx-auto px-6 pb-16 pt-32">
          <div className="grid grid-cols-12 gap-6">
            {/* Large Display Title - Typography as Art */}
            {/* Asymmetric placement WITHIN the centered container */}
            <div className="col-span-12 lg:col-span-9 lg:col-start-2">
              <h1 className="hero-title text-6xl md:text-7xl lg:text-8xl animate-mask-reveal mb-4">
                בעיות גדולות,
                <br />
                בגובה העיניים
              </h1>
              <p className="body-text text-xl md:text-2xl leading-relaxed mt-6 text-white/70">

              </p>
            </div>
          </div>
        </section>

        {/* Stats Card - Positioned Higher, Asymmetric */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-12 gap-6">
            {/* Asymmetric: starts at column 3, spans 8 columns */}
            <div className="col-span-12 lg:col-span-8 lg:col-start-3">
              <div className="glass p-12 rounded-sm">
                <p className="body-text text-lg leading-relaxed mb-8">

                </p>

                {/* HUD Technical Details */}
                <div className="flex flex-wrap gap-6 md:gap-8 pt-8 border-t border-white/10">
                  <div className="flex-1 min-w-[100px]">
                    <div className="technical-text">COMPANIES</div>
                    <div className="text-3xl font-bold text-white mt-2">+15</div>
                  </div>
                  <div className="hud-line-vertical hidden md:block" />
                  <div className="flex-1 min-w-[100px]">
                    <div className="technical-text">SEASONS</div>
                    <div className="text-3xl font-bold text-white mt-2">2</div>
                  </div>
                  <div className="hud-line-vertical hidden md:block" />
                  <div className="flex-1 min-w-[100px]">
                    <div className="technical-text">EPISODES</div>
                    <div className="text-3xl font-bold text-white mt-2">+15</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-4 mt-10">
                  <a
                    href="https://open.spotify.com/show/1ddFDGd1vH4UWIlfGjhS2Y"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glass p-4 flex items-center justify-center"
                    aria-label="Spotify"
                  >
                    <SpotifyIcon className="w-8 h-8" />
                  </a>
                  <ScrollToEpisodesButton />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Episodes Grid Section */}
        <section className="max-w-7xl mx-auto px-6 py-24" id="episodes">
          <div className="mb-12">
            <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
              פרקים אחרונים
            </h2>
            <p className="body-text text-lg text-white/70">
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
