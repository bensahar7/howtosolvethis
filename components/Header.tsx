import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-xl md:text-2xl font-bold text-white tracking-tight">
              איך פותרים את זה?
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
