"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { trackNavClick, trackMenuToggle } from "@/lib/analytics";

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click + Escape for accessible dropdown behaviour
  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const menuItems = [
    { href: "/episodes", label: "פרקים" },
    { href: "/blog", label: "בלוג" },
    { href: "/about", label: "אודות" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center h-16 md:h-20">
          {/* Brand — right (RTL start) */}
          <Link
            href="/"
            onClick={() => trackNavClick("brand_home", "/")}
            className="flex items-center gap-3"
          >
            <span className="text-xl md:text-2xl font-bold text-white tracking-tight">
              איך פותרים את זה?
            </span>
          </Link>

          {/* Menu — left (RTL end) */}
          <nav className="ms-auto flex items-center gap-6">
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  // Compute outside the updater: StrictMode invokes updaters
                  // twice in dev, which would double-fire the event.
                  const next = !open;
                  trackMenuToggle(next);
                  setOpen(next);
                }}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label="תפריט"
                className="glass glass-hover flex items-center gap-2 px-4 py-2 rounded-sm text-sm md:text-base text-white/90 hover:text-white transition-colors"
              >
                <span>תפריט</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {open && (
                <div
                  role="menu"
                  className="glass-high-blur absolute top-full mt-2 end-0 min-w-[180px] rounded-sm border border-white/10 overflow-hidden py-1"
                >
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      onClick={() => {
                        trackNavClick(item.label, item.href);
                        setOpen(false);
                      }}
                      className="block px-5 py-3 text-sm md:text-base text-white/80 hover:text-white hover:bg-white/10 transition-colors text-left"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
