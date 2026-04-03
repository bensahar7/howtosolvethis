import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
      <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
        <div className="col-span-12 lg:col-span-5">
          <div className="glass p-6 md:p-10 rounded-sm">
            <div className="technical-text text-xs text-white/40 mb-4">
              אודות
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              פודקאסט שמתרגם בעיות למציאות
            </h2>
            <p className="body-text text-base md:text-lg text-white/80 leading-relaxed">
              מדברים עם חוקרים ויזמים שפותרים את הבעיות הגדולות של ימינו - מבי-טק ועד פודטק.
              כל פרק הוא מסע קצר: מה הבעיה באמת, ואיך פתרונות אמיתיים נולדים בשטח.
            </p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <div className="relative overflow-hidden rounded-sm glass p-6 md:p-0">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/images/earth-hero.png"
                alt="איך פותרים את זה? - תמונת אווירה"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 70vw"
              />
            </div>
            <div className="p-6 md:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass p-4 rounded-sm">
                  <div className="technical-text text-xs text-white/40 mb-2">
                    למי זה מתאים
                  </div>
                  <div className="text-white/90 font-medium">
                    יזמים, חוקרים, ומי שאוהב פתרונות שמגיעים מהעולם האמיתי.
                  </div>
                </div>
                <div className="glass p-4 rounded-sm">
                  <div className="technical-text text-xs text-white/40 mb-2">
                    מה תקבלו
                  </div>
                  <div className="text-white/90 font-medium">
                    תובנות חדות, הקשר מקצועי, ותנועה קדימה לפרקים הבאים.
                  </div>
                </div>
              </div>
              <div className="mt-6 technical-text text-white/40 text-xs">
                עיצוב עריכתי, מובייל-פירסט, ו-RTL מלא.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

