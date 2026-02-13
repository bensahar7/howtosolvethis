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
    <div className="grid grid-cols-12 gap-6">
      {episodes.map((episode, index) => {
        // Asymmetric grid placement - different column spans
        // Create visual interest by varying card positions
        const isFirst = index === 0;
        const isEven = index % 2 === 0;
        
        // Featured episode (first) gets larger placement
        const colSpan = isFirst 
          ? "col-span-12 lg:col-span-8 lg:col-start-3" 
          : isEven 
            ? "col-span-12 md:col-span-6 lg:col-span-5"
            : "col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-7";

        return (
          <div key={episode.guid} className={`${colSpan} flex`}>
            <EpisodeCard episode={episode} index={index} />
          </div>
        );
      })}
    </div>
  );
}
