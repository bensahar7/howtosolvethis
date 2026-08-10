import Image from "next/image";
import Link from "next/link";
import { BlogPostSummary } from "@/types/blog";
import { blogPostPath, formatPostDate } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPostSummary;
  /** Grid position. The first row is above the fold, so those covers load eagerly. */
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const href = blogPostPath(post.slug);

  return (
    <article className="glass glass-hover rounded-sm overflow-hidden flex flex-col h-full transition-transform">
      <Link href={href} className="flex flex-col h-full">
        {post.coverImage ? (
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.coverAlt ?? ""}
              fill
              // 1 col mobile / 2 col tablet / 3 col desktop, capped by the 7xl
              // container. Without this every card would request a full-width
              // source on desktop and download ~3x the pixels it displays.
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
              loading={index < 3 ? "eager" : "lazy"}
              className="object-cover img-grayscale-default"
            />
          </div>
        ) : null}

        <div className="flex flex-col flex-1 p-6 md:p-7">
          {/* Metadata line. <time> carries the machine-readable date; the
              visible text is the Hebrew long form. */}
          <div className="technical-text flex items-center gap-3 text-white/50 mb-3">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} דקות קריאה</span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight text-start">
            {post.title}
          </h2>

          <p className="body-text text-sm md:text-base text-white/70 text-start line-clamp-3 flex-1">
            {post.description}
          </p>

          {post.tags?.length ? (
            <ul className="flex flex-wrap gap-2 mt-5">
              {post.tags.slice(0, 3).map((tag) => (
                <li
                  key={tag}
                  className="technical-text px-2.5 py-1 rounded-sm border border-white/15 text-white/60"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
