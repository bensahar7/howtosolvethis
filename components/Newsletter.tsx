"use client";

import { useEffect, useRef } from "react";
import { trackCtaClick } from "@/lib/analytics";

export default function Newsletter() {
  const embedRef = useRef<HTMLDivElement>(null);

  // Signup happens inside a cross-origin Substack iframe, so its clicks are
  // invisible to both PostHog autocapture and any handler we attach. The
  // window blur that fires when focus enters the iframe is the only signal
  // available — treat it as intent to subscribe.
  useEffect(() => {
    const handleBlur = () => {
      if (document.activeElement === embedRef.current?.querySelector("iframe")) {
        trackCtaClick("newsletter_embed_engaged", "newsletter_section");
      }
    };

    window.addEventListener("blur", handleBlur);
    return () => window.removeEventListener("blur", handleBlur);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24">
      <div className="grid grid-cols-12 gap-6">
        {/* Asymmetric placement */}
        <div className="col-span-12 lg:col-span-8 lg:col-start-3">
          <div className="glass p-6 md:p-12 rounded-sm">
            {/* Section Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">
                הצטרפו לניוזלטר
              </h2>
              <p className="body-text text-lg text-white/80">
              </p>
            </div>

            {/* HUD Line Separator */}
            <div className="border-t border-white/10 mb-8" />

            {/* Substack iframe with dark theme filter */}
            <div ref={embedRef} className="max-w-md mx-auto">
              <iframe
                src="https://ben1580094.substack.com/embed"
                width="100%"
                height="150"
                style={{ 
                  border: 'none',
                  background: 'transparent',
                  filter: 'invert(0.9) hue-rotate(180deg)'
                }}
                frameBorder="0"
                scrolling="no"
              />
            </div>

            {/* Privacy Note */}
            <p className="technical-text text-center mt-6 text-white/40">
              אנו מכבדים את פרטיותכם · אפשר להסיר בכל רגע
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
