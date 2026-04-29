import { NextResponse } from "next/server";
import { getEnrichedEpisodes } from "@/lib/episode-matcher";
import { BilingualTag } from "@/types/episode";

export const revalidate = 3600;

function formatKeyword(k: string | BilingualTag): string {
  if (typeof k === "string") return k;
  return `${k.he} / ${k.en}`;
}

export async function GET() {
  const baseUrl = "https://howtosolvethis.com";
  const episodes = await getEnrichedEpisodes();

  const lines: string[] = [
    "# איך פותרים את זה? — How To Solve This?",
    "",
    "> פודקאסט עברי על קליימט-טק וחדשנות ישראלית. מגיש: בן סהר.",
    "> Hebrew Climate Tech podcast. Host: Ben Sahar.",
    "",
    "---",
    "",
  ];

  for (const ep of episodes) {
    const m = ep.metadata;

    lines.push(`## Episode ${ep.episodeNumber}: ${ep.title}`);
    lines.push("");
    lines.push(`**URL:** ${baseUrl}/episodes/${ep.episodeNumber}`);
    lines.push(
      `**Markdown:** ${baseUrl}/episodes/${ep.episodeNumber}/markdown`
    );
    if (m?.sector) lines.push(`**Sector:** ${m.sector}`);
    if (m?.guests?.length) lines.push(`**Guests:** ${m.guests.join(", ")}`);
    if (ep.pubDate)
      lines.push(
        `**Published:** ${new Date(ep.pubDate).toISOString().split("T")[0]}`
      );
    lines.push("");

    if (m?.problem) {
      lines.push("**Problem:**");
      lines.push(m.problem);
      lines.push("");
    }

    if (m?.solution) {
      lines.push("**Solution:**");
      lines.push(m.solution);
      lines.push("");
    }

    if (m?.keywords?.length) {
      lines.push(`**Keywords:** ${m.keywords.map(formatKeyword).join(", ")}`);
      lines.push("");
    }

    lines.push("---");
    lines.push("");
  }

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
