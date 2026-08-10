import { NextResponse } from "next/server";
import { getPostBySlug, blogPostPath, DEFAULT_AUTHOR } from "@/lib/blog";

export const revalidate = 3600;

const SITE_URL = "https://howtosolvethis.com";

/**
 * Raw-markdown twin of a blog post, mirroring /episodes/[id]/markdown.
 *
 * llms.txt links here rather than to the HTML page so a crawler gets clean
 * prose with no layout chrome, navigation, or client JS to strip.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return new NextResponse("Post not found", { status: 404 });
  }

  const lines: string[] = [
    `# ${post.title}`,
    "",
    `**Published:** ${post.date}`,
  ];

  if (post.updated && post.updated !== post.date) {
    lines.push(`**Updated:** ${post.updated}`);
  }

  lines.push(`**Author:** ${post.author ?? DEFAULT_AUTHOR}`);
  lines.push(`**Read time:** ${post.readingMinutes} min`);
  lines.push(`**URL:** ${SITE_URL}${blogPostPath(post.slug)}`);

  if (post.tags?.length) {
    lines.push(`**Tags:** ${post.tags.join(", ")}`);
  }

  lines.push("");
  lines.push(`> ${post.description}`);
  lines.push("");

  if (post.takeaways?.length) {
    lines.push("## Key Takeaways");
    lines.push("");
    post.takeaways.forEach((point) => lines.push(`- ${point}`));
    lines.push("");
  }

  lines.push("---");
  lines.push("");
  lines.push(post.raw);

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
