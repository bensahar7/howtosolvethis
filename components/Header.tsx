import Link from "next/link";
import SpotifyIcon from "./SpotifyIcon";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Right Side - Logo/Title (RTL) */}
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              איך פותרים את זה?
            </h1>
          </div>

          {/* Left Side - Navigation + CTA (RTL) */}
          <nav className="flex items-center gap-8">
            <Link
              href="#episodes"
              className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
            >
              פרקים
            </Link>
            <Link
              href="#about"
              className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
            >
              אודות
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
