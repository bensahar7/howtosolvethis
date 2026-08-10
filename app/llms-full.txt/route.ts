import { NextResponse } from "next/server";
import { getEnrichedEpisodes } from "@/lib/episode-matcher";
import { episodePath } from "@/lib/episode-url";
import { BilingualTag } from "@/types/episode";
import { getAllPosts, blogPostPath, DEFAULT_AUTHOR } from "@/lib/blog";

export const revalidate = 3600;

function formatKeyword(k: string | BilingualTag): string {
  if (typeof k === "string") return k;
  return `${k.he} / ${k.en}`;
}

export async function GET() {
  const baseUrl = "https://howtosolvethis.com";
  const episodes = await getEnrichedEpisodes();
  const posts = await getAllPosts();

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
    lines.push(`**URL:** ${baseUrl}${episodePath(ep)}`);
    lines.push(
      `**Markdown:** ${baseUrl}${episodePath(ep)}/markdown`
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

  if (posts.length) {
    lines.push("# Blog");
    lines.push("");

    for (const post of posts) {
      lines.push(`## ${post.title}`);
      lines.push("");
      lines.push(`**URL:** ${baseUrl}${blogPostPath(post.slug)}`);
      lines.push(`**Markdown:** ${baseUrl}${blogPostPath(post.slug)}/markdown`);
      lines.push(`**Author:** ${post.author ?? DEFAULT_AUTHOR}`);
      lines.push(`**Published:** ${post.date}`);
      if (post.updated && post.updated !== post.date) {
        lines.push(`**Updated:** ${post.updated}`);
      }
      if (post.tags?.length) lines.push(`**Tags:** ${post.tags.join(", ")}`);
      lines.push("");
      lines.push(post.description);
      lines.push("");

      if (post.takeaways?.length) {
        lines.push("**Key Takeaways:**");
        post.takeaways.forEach((point) => lines.push(`- ${point}`));
        lines.push("");
      }

      // Full body: this file exists so an LLM can ingest the site in one fetch.
      lines.push(post.raw);
      lines.push("");
      lines.push("---");
      lines.push("");
    }
  }

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
