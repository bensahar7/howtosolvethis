import Link from "next/link";
import SpotifyIcon from "./SpotifyIcon";
import { ApplePodcastsIcon, YouTubeMusicIcon, PocketCastsIcon, SnipdIcon } from "./PodcastIcons";

export default function Footer() {
  return (
    <footer className="glass-high-blur border-t border-white/10 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-12 gap-8">
          {/* Brand Section */}
          <div className="col-span-12 lg:col-span-4">
            <h3 className="text-2xl font-bold text-white mb-3">
              איך פותרים את זה?
            </h3>
            <p className="body-text text-sm text-white/70 leading-relaxed">
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-span-12 lg:col-span-4">
            <h4 className="technical-text mb-4">Navigation</h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="#episodes"
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                פרקים
              </Link>
              <Link
                href="#about"
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                אודות
              </Link>
              <Link
                href="#newsletter"
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                ניוזלטר
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          <div className="col-span-12 lg:col-span-4">
            <h4 className="technical-text mb-4">Connect</h4>
            <div className="flex gap-4 flex-wrap">
              {/* Spotify */}
              <a
                href="https://open.spotify.com/show/1ddFDGd1vH4UWIlfGjhS2Y"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-3 rounded-sm glass-hover"
                aria-label="Spotify"
              >
                <SpotifyIcon className="w-5 h-5" />
              </a>

              {/* Apple Podcasts */}
              <a
                href="https://podcasts.apple.com/us/podcast/%D7%90%D7%99%D7%9A-%D7%A4%D7%95%D7%AA%D7%A8%D7%99%D7%9D-%D7%90%D7%AA-%D7%96%D7%94/id1750929970"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-3 rounded-sm glass-hover"
                aria-label="Apple Podcasts"
              >
                <ApplePodcastsIcon className="w-5 h-5 text-white/80" />
              </a>

              {/* YouTube Music */}
              <a
                href="https://music.youtube.com/playlist?list=PLkPsVtA1_TZ_iuvlbCTHa4gmWl4vXdp89"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-3 rounded-sm glass-hover"
                aria-label="YouTube Music"
              >
                <YouTubeMusicIcon className="w-5 h-5 text-[#FF0000]" />
              </a>

              {/* Pocket Casts */}
              <a
                href="https://pocketcasts.com/podcast/%D7%90%D7%99%D7%9A-%D7%A4%D7%95%D7%AA%D7%A8%D7%99%D7%9D-%D7%90%D7%AA-%D7%96%D7%94/1c570bc0-073c-013d-0d1e-0243b8a24f53"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-3 rounded-sm glass-hover"
                aria-label="Pocket Casts"
              >
                <PocketCastsIcon className="w-5 h-5 text-[#F43E37]" />
              </a>

              {/* Snipd */}
              <a
                href="https://share.snipd.com/show/7a974146-82a7-43fb-b42e-b7b4a719201d"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-3 rounded-sm glass-hover"
                aria-label="Snipd"
              >
                <SnipdIcon className="w-5 h-5" />
              </a>

              {/* Podcast LinkedIn Page */}
              <a
                href="https://www.linkedin.com/company/%D7%90%D7%99%D7%9A-%D7%A4%D7%95%D7%AA%D7%A8%D7%99%D7%9D-%D7%90%D7%AA-%D7%96%D7%94"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-3 rounded-sm glass-hover"
                aria-label="LinkedIn - Podcast Page"
              >
                <svg
                  className="w-5 h-5"
                  fill="#0A66C2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="technical-text text-white/40">
            © {new Date().getFullYear()} איך פותרים את זה? · All rights reserved
          </p>
          <p className="technical-text text-white/40">
            Built with Next.js · Designed with Atmospheric Curiosity
          </p>
        </div>
      </div>
    </footer>
  );
}
