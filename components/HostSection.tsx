import Link from "next/link";

export default function HostSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
      <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
        <div className="col-span-12 lg:col-span-5">
          <div className="glass p-6 md:p-10 rounded-sm">
            <div className="technical-text text-xs text-white/40 mb-4">
              המארח
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">בן סהר</h2>
            <p className="body-text text-base md:text-lg text-white/80 leading-relaxed">
              בכל פרק אנחנו צוללים לבעיה, שואלים את השאלות הנכונות, ומחברים בין מחקר לעשייה.
              אם אתם אוהבים פתרונות שמתחילים בשטח — אתם בבית.
            </p>
            <div className="mt-6 flex gap-3 flex-wrap">
              <Link
                href="https://www.linkedin.com/in/ben-sahar/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass glass-hover inline-flex items-center justify-center px-6 py-3 rounded-sm font-medium"
              >
                LinkedIn
              </Link>
              <Link
                href="https://x.com/bensahar"
                target="_blank"
                rel="noopener noreferrer"
                className="glass glass-hover inline-flex items-center justify-center px-6 py-3 rounded-sm font-medium"
              >
                X
              </Link>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <div className="glass p-6 md:p-10 rounded-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass p-4 rounded-sm">
                <div className="technical-text text-xs text-white/40 mb-2">הסגנון</div>
                <div className="text-white/90 font-medium">עריכתי, חד, ועקבי</div>
              </div>
              <div className="glass p-4 rounded-sm">
                <div className="technical-text text-xs text-white/40 mb-2">המטרה</div>
                <div className="text-white/90 font-medium">להביא פתרונות לפרונט</div>
              </div>
            </div>
            <div className="mt-6 technical-text text-white/40 text-xs">
              טיפ קטן: שמרו את הפרקים שאתם אוהבים — ונדבר בפרק הבא.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

