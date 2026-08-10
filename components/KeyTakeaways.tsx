interface KeyTakeawaysProps {
  takeaways?: string[];
}

/**
 * "Key takeaways" block, rendered directly beneath the article H1.
 *
 * This exists for AI answer engines. Retrieval pipelines chunk documents and
 * rank passages independently, so a short, self-contained, list-shaped summary
 * near the top of the page is the passage most likely to be retrieved and
 * quoted intact — a conclusion buried in paragraph nine rarely survives.
 *
 * Renders nothing when a post omits `takeaways`, so it never shows an empty box.
 */
export default function KeyTakeaways({ takeaways }: KeyTakeawaysProps) {
  if (!takeaways?.length) return null;

  return (
    <aside
      aria-labelledby="key-takeaways-heading"
      className="glass rounded-sm border border-white/10 p-6 md:p-7 my-8 md:my-10"
    >
      <h2
        id="key-takeaways-heading"
        className="technical-text text-white/60 mb-4"
      >
        עיקרי הדברים
      </h2>
      <ul className="flex flex-col gap-3">
        {takeaways.map((point) => (
          <li
            key={point}
            className="body-text text-sm md:text-base text-white/85 flex gap-3"
          >
            <span aria-hidden="true" className="text-white/40 shrink-0">
              —
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
