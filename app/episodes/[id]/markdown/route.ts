import { NextResponse } from "next/server";
import { getEpisodeWithTranscript } from "@/lib/episode-matcher";
import { BilingualTag } from "@/types/episode";

export const revalidate = 3600;

function formatKeyword(k: string | BilingualTag): string {
  if (typeof k === "string") return k;
  return `${k.he} / ${k.en}`;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const episodeNumber = parseInt(id, 10);

  if (isNaN(episodeNumber)) {
    return new NextResponse("Invalid episode number", { status: 400 });
  }

  const episode = await getEpisodeWithTranscript(episodeNumber);

  if (!episode) {
    return new NextResponse("Episode not found", { status: 404 });
  }

  const m = episode.metadata;
  const lines: string[] = [];

  lines.push(`# Episode ${episodeNumber}: ${episode.title}`);
  lines.push("");

  if (m?.sector) lines.push(`**Sector:** ${m.sector}`);
  if (m?.guests?.length) lines.push(`**Guests:** ${m.guests.join(", ")}`);
  if (episode.pubDate)
    lines.push(
      `**Published:** ${new Date(episode.pubDate).toISOString().split("T")[0]}`
    );
  lines.push(
    `**Listen:** https://howtosolvethis.com/episodes/${episodeNumber}`
  );
  lines.push("");

  if (episode.description) {
    const cleanDesc = episode.description.replace(/<[^>]*>/g, "").trim();
    if (cleanDesc) {
      lines.push("## About");
      lines.push("");
      lines.push(cleanDesc);
      lines.push("");
    }
  }

  if (m?.problem) {
    lines.push("## The Problem");
    lines.push("");
    lines.push(m.problem);
    lines.push("");
  }

  if (m?.solution) {
    lines.push("## The Solution");
    lines.push("");
    lines.push(m.solution);
    lines.push("");
  }

  if (m?.entrepreneurTip) {
    lines.push("## Entrepreneur Insight");
    lines.push("");
    lines.push(m.entrepreneurTip);
    lines.push("");
  }

  if (m?.keyPoints?.length) {
    lines.push("## Key Points");
    lines.push("");
    m.keyPoints.forEach((p) => lines.push(`- ${p}`));
    lines.push("");
  }

  if (m?.companies?.length) {
    lines.push("## Featured Companies");
    lines.push("");
    m.companies.forEach((c) => {
      lines.push(`### ${c.name}`);
      if (c.guestName)
        lines.push(
          `**Guest:** ${c.guestName}${c.guestTitle ? ` — ${c.guestTitle}` : ""}`
        );
      if (c.website) lines.push(`**Website:** ${c.website}`);
      if (c.focus) lines.push(`**Focus:** ${c.focus}`);
      lines.push("");
    });
  } else if (m?.companyName) {
    lines.push("## Company");
    lines.push("");
    lines.push(`**${m.companyName}**`);
    if (m.companyWebsite) lines.push(`Website: ${m.companyWebsite}`);
    lines.push("");
  }

  if (m?.keywords?.length) {
    lines.push(`**Keywords:** ${m.keywords.map(formatKeyword).join(", ")}`);
    lines.push("");
  }

  if (m?.transcript) {
    lines.push("## Full Transcript");
    lines.push("");
    lines.push(m.transcript);
    lines.push("");
  }

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
