import { NextResponse } from "next/server";
import { getEnrichedEpisodes } from "@/lib/episode-matcher";

export const revalidate = 3600;

export async function GET() {
  const baseUrl = "https://howtosolvethis.com";
  const episodes = await getEnrichedEpisodes();

  const lines: string[] = [
    "# איך פותרים את זה? — How To Solve This?",
    "",
    "> פודקאסט עברי על קליימט-טק וחדשנות ישראלית. בכל פרק, יזם שפתר בעיה סביבתית אמיתית.",
    "> A Hebrew podcast about Israeli Climate Tech startups. Each episode: one environmental problem, one startup, one solution.",
    "> Hosted by Ben Sahar.",
    "",
    "## Main",
    "",
    `- [Homepage](${baseUrl}): All episodes, about the show, and host info`,
    "",
    "## Episodes",
    "",
  ];

  for (const ep of episodes) {
    const num = ep.episodeNumber;
    const title = ep.title;
    const sector = ep.metadata?.sector ? `: ${ep.metadata.sector}` : "";
    lines.push(
      `- [Episode ${num}: ${title}](${baseUrl}/episodes/${num}/markdown)${sector}`
    );
  }

  lines.push("");
  lines.push("## Optional");
  lines.push("");
  lines.push(
    `- [Full content — all episodes](${baseUrl}/llms-full.txt): All episodes combined with problem/solution summaries`
  );
  lines.push(`- [Sitemap](${baseUrl}/sitemap.xml)`);

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
