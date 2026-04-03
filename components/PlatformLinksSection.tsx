import SpotifyIcon from "./SpotifyIcon";
import {
  ApplePodcastsIcon,
  YouTubeMusicIcon,
  PocketCastsIcon,
  SnipdIcon,
  CastboxIcon,
} from "./PodcastIcons";

const SPOTIFY_SHOW_URL = "https://open.spotify.com/show/1ddFDGd1vH4UWIlfGjhS2Y";
const APPLE_PODCASTS_URL =
  "https://podcasts.apple.com/us/podcast/%D7%90%D7%99%D7%9A-%D7%A4%D7%95%D7%AA%D7%A8%D7%99%D7%9D-%D7%90%D7%AA-%D7%96%D7%94/id1750929970";
const YOUTUBE_MUSIC_URL = "https://music.youtube.com/playlist?list=PLkPsVtA1_TZ_iuvlbCTHa4gmWl4vXdp89";
const POCKET_CASTS_URL =
  "https://pocketcasts.com/podcast/%D7%90%D7%99%D7%9A-%D7%A4%D7%95%D7%AA%D7%A8%D7%99%D7%9D-%D7%90%D7%AA-%D7%96%D7%94/1c570bc0-073c-013d-0d1e-0243b8a24f53";
const SNIPD_URL = "https://share.snipd.com/show/7a974146-82a7-43fb-b42e-b7b4a719201d";
const CASTBOX_URL = "https://castbox.fm/channel/id6193220?country=us";

export default function PlatformLinksSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white">איפה להאזין?</h2>
        <p className="body-text text-base md:text-lg text-white/70 mt-3">
          בחרו פלטפורמה, ולחצו. אנחנו כבר נדאג לשאר.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <a
          href={SPOTIFY_SHOW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="glass p-5 rounded-sm glass-hover flex items-center gap-4 justify-center md:justify-start"
          aria-label="ספוטיפיי"
        >
          <SpotifyIcon className="w-6 h-6" />
          <span className="font-bold">ספוטיפיי</span>
        </a>

        <a
          href={APPLE_PODCASTS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="glass p-5 rounded-sm glass-hover flex items-center gap-4 justify-center md:justify-start"
          aria-label="אפל פודקאסטס"
        >
          <ApplePodcastsIcon className="w-6 h-6 text-white/80" />
          <span className="font-bold">Apple Podcasts</span>
        </a>

        <a
          href={YOUTUBE_MUSIC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="glass p-5 rounded-sm glass-hover flex items-center gap-4 justify-center md:justify-start"
          aria-label="יוטיוב מיוזיק"
        >
          <YouTubeMusicIcon className="w-6 h-6 text-[#FF0000]" />
          <span className="font-bold">YouTube Music</span>
        </a>

        <a
          href={POCKET_CASTS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="glass p-5 rounded-sm glass-hover flex items-center gap-4 justify-center md:justify-start"
          aria-label="Pocket Casts"
        >
          <PocketCastsIcon className="w-6 h-6 text-[#F43E37]" />
          <span className="font-bold">Pocket Casts</span>
        </a>

        <a
          href={SNIPD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="glass p-5 rounded-sm glass-hover flex items-center gap-4 justify-center md:justify-start"
          aria-label="Snipd"
        >
          <SnipdIcon className="w-6 h-6" />
          <span className="font-bold">Snipd</span>
        </a>

        <a
          href={CASTBOX_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="glass p-5 rounded-sm glass-hover flex items-center gap-4 justify-center md:justify-start"
          aria-label="Castbox"
        >
          <CastboxIcon className="w-6 h-6 text-white/80" />
          <span className="font-bold">Castbox</span>
        </a>
      </div>
    </section>
  );
}

