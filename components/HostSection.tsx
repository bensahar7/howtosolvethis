import Link from "next/link";

export default function HostSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24" id="host">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-6 lg:col-start-4">
          <div className="glass p-8 md:p-12 rounded-sm text-center">
            {/* Label */}
            <div className="technical-text text-xs text-white/40 mb-6 tracking-widest">
              המנחה
            </div>

            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white border border-white/30"
                style={{ background: "rgba(0,0,0,0.55)" }}
              >
                B
              </div>
            </div>

            {/* Name */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">בן סהר</h2>

            {/* Bio */}
            <p className="body-text text-base md:text-lg text-white/75 leading-relaxed max-w-lg mx-auto mb-8">
              חוקר, מראיין ומנחה — מביא בכל פרק את האנשים שפותרים את הבעיות הגדולות של ימינו בגובה העיניים
            </p>

            {/* Social Links */}
            <div className="flex gap-3 flex-wrap justify-center">
              <Link
                href="https://ben1580094.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass glass-hover inline-flex items-center justify-center px-6 py-3 rounded-sm font-medium text-white"
              >
                Substack
              </Link>
              <Link
                href="https://x.com/bensahar"
                target="_blank"
                rel="noopener noreferrer"
                className="glass glass-hover inline-flex items-center justify-center px-6 py-3 rounded-sm font-medium text-white"
              >
                X
              </Link>
              <Link
                href="https://www.linkedin.com/in/ben-sahar/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass glass-hover inline-flex items-center justify-center px-6 py-3 rounded-sm font-medium text-white"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
