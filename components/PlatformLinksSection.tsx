import SpotifyIcon from "./SpotifyIcon";
import {
  ApplePodcastsIcon,
  YouTubeMusicIcon,
  PocketCastsIcon,
  SnipdIcon,
} from "./PodcastIcons";

const SPOTIFY_SHOW_URL = "https://open.spotify.com/show/1ddFDGd1vH4UWIlfGjhS2Y";
const APPLE_PODCASTS_URL =
  "https://podcasts.apple.com/us/podcast/%D7%90%D7%99%D7%9A-%D7%A4%D7%95%D7%AA%D7%A8%D7%99%D7%9D-%D7%90%D7%AA-%D7%96%D7%94/id1750929970";
const YOUTUBE_MUSIC_URL =
  "https://music.youtube.com/playlist?list=PLkPsVtA1_TZ_iuvlbCTHa4gmWl4vXdp89";
const POCKET_CASTS_URL =
  "https://pocketcasts.com/podcast/%D7%90%D7%99%D7%9A-%D7%A4%D7%95%D7%AA%D7%A8%D7%99%D7%9D-%D7%90%D7%AA-%D7%96%D7%94/1c570bc0-073c-013d-0d1e-0243b8a24f53";
const SNIPD_URL =
  "https://share.snipd.com/show/7a974146-82a7-43fb-b42e-b7b4a719201d";

const platforms = [
  {
    name: "Spotify",
    url: SPOTIFY_SHOW_URL,
    icon: (cls: string) => <SpotifyIcon className={cls} />,
    label: "ספוטיפיי",
  },
  {
    name: "Apple Podcasts",
    url: APPLE_PODCASTS_URL,
    icon: (cls: string) => <ApplePodcastsIcon className={cls} />,
    label: "Apple Podcasts",
  },
  {
    name: "YouTube Music",
    url: YOUTUBE_MUSIC_URL,
    icon: (cls: string) => <YouTubeMusicIcon className={cls} />,
    label: "YouTube Music",
  },
  {
    name: "Pocket Casts",
    url: POCKET_CASTS_URL,
    icon: (cls: string) => <PocketCastsIcon className={cls} />,
    label: "Pocket Casts",
  },
  {
    name: "Snipd",
    url: SNIPD_URL,
    icon: (cls: string) => <SnipdIcon className={cls} />,
    label: "Snipd",
  },
];

export default function PlatformLinksSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          האזינו בכל מקום
        </h2>
        <p className="body-text text-base text-white/60">
          הפודקאסט זמין בכל הפלטפורמות המובילות
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {platforms.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={p.label}
            className="glass glass-hover group flex items-center justify-center p-6 rounded-sm w-20 h-20 transition-all duration-300 hover:border-white/30 border border-white/10"
          >
            <div className="transition-transform duration-300 group-hover:scale-110 text-white">
              {p.icon("w-8 h-8")}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
