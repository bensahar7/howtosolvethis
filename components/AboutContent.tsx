import React from "react";
import AnimatedCounter from "@/components/AnimatedCounter";

// A stats list item: bold value + dash + label, e.g. `**16+** — פרקים`.
const STAT_ITEM = /^\*\*(.+?)\*\*\s*[—–-]\s*(.+)$/;

interface AboutContentProps {
  eyebrow?: string;
  title?: string;
  /** Markdown body from Context/about.md. */
  body: string;
}

interface Section {
  heading: string | null;
  content: string;
}

// Split the body into glass-card sections at each `## ` heading.
// Content before the first `##` is the intro section (heading === null).
function splitSections(body: string): Section[] {
  const sections: Section[] = [];
  let heading: string | null = null;
  let lines: string[] = [];

  const flush = () => {
    sections.push({ heading, content: lines.join("\n").trim() });
  };

  for (const line of body.split(/\r?\n/)) {
    const h2 = line.match(/^##\s+(.*)$/);
    if (h2) {
      flush();
      heading = h2[1].trim();
      lines = [];
    } else {
      lines.push(line);
    }
  }
  flush();

  return sections;
}

// Inline rendering for **bold** and [label](url).
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const regex = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));

    if (match[1] !== undefined) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${i}`} className="text-white font-bold">
          {match[1]}
        </strong>
      );
    } else {
      const label = match[2];
      const url = match[3];
      const external = /^https?:\/\//.test(url);
      nodes.push(
        <a
          key={`${keyPrefix}-a-${i}`}
          href={url}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="text-white underline decoration-white/30 hover:decoration-white transition-colors"
        >
          {label}
        </a>
      );
    }

    last = regex.lastIndex;
    i++;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

// Render the block-level markdown (h3, lists, paragraphs) inside a section.
function renderBlocks(
  content: string,
  keyPrefix: string,
  paragraphClass: string
): React.ReactNode[] {
  const blocks = content
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  return blocks.map((block, bi) => {
    const key = `${keyPrefix}-blk-${bi}`;

    const h3 = block.match(/^###\s+(.*)$/);
    if (h3) {
      return (
        <h3 key={key} className="text-sm font-bold text-white/90 mb-2">
          {renderInline(h3[1].trim(), key)}
        </h3>
      );
    }

    const lines = block.split(/\r?\n/);
    if (lines.every((l) => /^[-*]\s+/.test(l.trim()))) {
      const items = lines.map((l) => l.replace(/^[-*]\s+/, "").trim());

      // A list where every item is `**value** — label` renders as a
      // homepage-style stats grid (big animated number + technical label).
      const stats = items.map((item) => item.match(STAT_ITEM));
      if (stats.every(Boolean)) {
        return (
          <div
            key={key}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center"
          >
            {stats.map((m, si) => {
              const value = m![1].trim();
              const label = m![2].trim();
              const num = value.match(/^(\d+)(.*)$/);
              return (
                <div key={`${key}-stat-${si}`}>
                  {num ? (
                    <AnimatedCounter
                      value={parseInt(num[1], 10)}
                      suffix={num[2]}
                      className="text-2xl md:text-5xl font-bold text-white mb-1 md:mb-2 block"
                    />
                  ) : (
                    <span className="text-2xl md:text-5xl font-bold text-white mb-1 md:mb-2 block">
                      {value}
                    </span>
                  )}
                  <div className="technical-text text-white/60 text-[9px] md:text-sm">
                    {label}
                  </div>
                </div>
              );
            })}
          </div>
        );
      }

      return (
        <ul
          key={key}
          className="list-disc list-inside text-white/70 text-sm leading-relaxed space-y-1 mb-4"
        >
          {items.map((item, li) => (
            <li key={`${key}-li-${li}`}>{renderInline(item, `${key}-${li}`)}</li>
          ))}
        </ul>
      );
    }

    return (
      <p key={key} className={paragraphClass}>
        {renderInline(lines.join(" "), key)}
      </p>
    );
  });
}

export default function AboutContent({ eyebrow, title, body }: AboutContentProps) {
  const sections = splitSections(body);
  const [intro, ...rest] = sections;

  const introParagraph =
    "body-text text-base md:text-lg text-white/85 leading-relaxed mb-4";
  const bodyParagraph =
    "body-text text-sm md:text-base text-white/80 leading-relaxed mb-4";

  return (
    <>
      {/* Intro card */}
      <div className="glass p-6 md:p-12 rounded-sm mb-6 md:mb-8">
        {eyebrow && (
          <p className="technical-text text-xs text-white/40 mb-4 tracking-widest">
            {eyebrow}
          </p>
        )}
        {title && (
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {title}
          </h1>
        )}
        {intro && renderBlocks(intro.content, "intro", introParagraph)}
      </div>

      {/* One glass card per `##` section */}
      {rest.map((section, si) => (
        <div
          key={`sec-${si}`}
          className="glass p-6 md:p-12 rounded-sm mb-6 md:mb-8"
        >
          {section.heading && (
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
              {section.heading}
            </h2>
          )}
          {renderBlocks(section.content, `sec-${si}`, bodyParagraph)}
        </div>
      ))}
    </>
  );
}
