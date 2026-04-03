import Image from "next/image";
import SpotifyIcon from "./SpotifyIcon";
import { EnrichedEpisode } from "@/types/episode";
import { ApplePodcastsIcon } from "./PodcastIcons";

const APPLE_PODCASTS_URL =
  "https://podcasts.apple.com/us/podcast/%D7%90%D7%99%D7%9A-%D7%A4%D7%95%D7%AA%D7%A8%D7%99%D7%9D-%D7%90%D7%AA-%D7%96%D7%94/id1750929970";

export default function FeaturedEpisodeSection({ episode }: { episode: EnrichedEpisode }) {
  const spotifyUrl = episode.spotifyEpisodeId
    ? `https://open.spotify.com/episode/${episode.spotifyEpisodeId}`
    : `https://open.spotify.com/show/1ddFDGd1vH4UWIlfGjhS2Y`;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">
      <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
        <div className="col-span-12 lg:col-span-6">
          <div className="glass rounded-sm overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={episode.imageUrl}
                alt={`עטיפת הפרק: ${episode.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="p-6 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="glass px-3 py-1 rounded-sm">
                  <span className="technical-text">פרק {episode.episodeNumber}</span>
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
                {episode.title}
              </h2>
              {episode.description && (
                <p className="body-text text-base md:text-lg text-white/80 leading-relaxed line-clamp-3">
                  {episode.description.replace(/<[^>]*>/g, "").trim()}
                </p>
              )}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-spotify group w-full sm:w-auto flex items-center justify-center gap-3"
                  aria-label="האזנה בספוטיפיי"
                >
                  <SpotifyIcon className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110 flex-shrink-0" />
                  <span className="font-bold">האזנה בספוטיפיי</span>
                </a>
                <a
                  href={APPLE_PODCASTS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-4 rounded-sm glass-hover inline-flex items-center justify-center gap-3 w-full sm:w-auto"
                  aria-label="האזנה ב-Apple Podcasts"
                >
                  <ApplePodcastsIcon className="w-5 h-5 text-white/80" />
                  <span className="font-bold">Apple Podcasts</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <div className="glass p-6 md:p-10 rounded-sm">
            <div className="technical-text text-xs text-white/40 mb-4">מומלץ להתחיל ממנו</div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">האזינו. התקדמו. חזרו.</h3>
            <p className="body-text text-base md:text-lg text-white/80 leading-relaxed mb-6">
              פרקים בעריכה קצרה, חדה ומדויקת: הבעיה, הפתרון, והאנשים שמסיעים לזה לקרות.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass p-4 rounded-sm">
                <div className="technical-text text-xs text-white/40 mb-2">קריאה מהירה</div>
                <div className="text-white/90 font-medium">תמצית ברורה לכל פרק</div>
              </div>
              <div className="glass p-4 rounded-sm">
                <div className="technical-text text-xs text-white/40 mb-2">תנועה קדימה</div>
                <div className="text-white/90 font-medium">כפתורים גדולים להאזנה</div>
              </div>
              <div className="glass p-4 rounded-sm">
                <div className="technical-text text-xs text-white/40 mb-2">RTL מלא</div>
                <div className="text-white/90 font-medium">זרימה טבעית בעברית</div>
              </div>
              <div className="glass p-4 rounded-sm">
                <div className="technical-text text-xs text-white/40 mb-2">פרקים קלים לדפדוף</div>
                <div className="text-white/90 font-medium">בינג’ בזרימה אחת</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

