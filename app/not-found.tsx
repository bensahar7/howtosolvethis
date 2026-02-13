import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        {/* Glass Card - Lost in Space */}
        <div className="glass-high-blur p-12 rounded-sm text-center">
          {/* 404 Number - HUD Style */}
          <div className="mb-8">
            <span className="text-8xl font-bold text-white tracking-tighter">
              404
            </span>
          </div>

          {/* HUD Line */}
          <div className="border-t border-white/10 mb-8" />

          {/* Message */}
          <h1 className="text-4xl font-bold text-white mb-4">
            אנחנו עובדים על זה
          </h1>
          <p className="body-text text-lg text-white/70 mb-8">
            הדף שחיפשת לא נמצא. אולי הוא עדיין בפיתוח, או שהכתובת שגויה.
          </p>

          {/* Technical Details */}
          <div className="flex justify-center gap-8 mb-8 pt-8 border-t border-white/10">
            <div>
              <div className="technical-text">Error Code</div>
              <div className="text-white font-mono mt-2">404</div>
            </div>
            <div className="hud-line-vertical" />
            <div>
              <div className="technical-text">Status</div>
              <div className="text-white font-mono mt-2">NOT_FOUND</div>
            </div>
          </div>

          {/* Back to Orbit Button */}
          <Link href="/" className="btn-glass inline-block px-8 py-3 text-lg">
            חזרה למסלול ← Back to Orbit
          </Link>

          {/* Additional Help */}
          <p className="technical-text mt-8 text-white/40">
            Need help? Contact us or explore our episodes
          </p>
        </div>
      </div>
    </main>
  );
}
