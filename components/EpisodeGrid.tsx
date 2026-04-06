import { getEnrichedEpisodes } from "@/lib/episode-matcher";
import EpisodeCard from "./EpisodeCard";

export default async function EpisodeGrid() {
  const episodes = await getEnrichedEpisodes();

  if (episodes.length === 0) {
    return (
      <div className="glass p-12 rounded-sm text-center">
        <p className="body-text text-white/70">
          אין פרקים זמינים כרגע. אנא נסה שוב מאוחר יותר.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {episodes.map((episode, index) => (
        <div key={episode.guid} className="flex relative hover:z-10">
          <EpisodeCard episode={episode} index={index} />
        </div>
      ))}
    </div>
  );
}
