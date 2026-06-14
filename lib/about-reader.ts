import fs from "fs/promises";
import path from "path";
import { unstable_cache } from "next/cache";

const ABOUT_FILE = path.join(process.cwd(), "Context", "about.md");

export interface AboutContent {
  /** Small uppercase label above the title (frontmatter `eyebrow`). */
  eyebrow?: string;
  /** Page H1 (frontmatter `title`). */
  title?: string;
  /** Markdown body after the frontmatter block. */
  body: string;
}

function parseAbout(raw: string): AboutContent {
  let eyebrow: string | undefined;
  let title: string | undefined;
  let body = raw;

  // Optional YAML-ish frontmatter delimited by --- ... ---
  const fm = raw.match(/^﻿?---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);
  if (fm) {
    const block = fm[1];
    eyebrow = block.match(/^eyebrow:\s*(.+)$/m)?.[1]?.trim();
    title = block.match(/^title:\s*(.+)$/m)?.[1]?.trim();
    body = raw.slice(fm[0].length);
  }

  return { eyebrow, title, body: body.trim() };
}

async function readAbout(): Promise<AboutContent> {
  const raw = await fs.readFile(ABOUT_FILE, "utf-8");
  return parseAbout(raw);
}

/** Reads Context/about.md, cached for 60s (matches local-metadata TTL). */
export const getAboutContent = unstable_cache(readAbout, ["about-content"], {
  revalidate: 60,
});
