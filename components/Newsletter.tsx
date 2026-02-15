"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/logger";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Substack subscription endpoint
      const response = await fetch("https://ben1580094.substack.com/api/v1/free", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          first_url: window.location.href,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        trackEvent("newsletter_signup", {
          source: "custom_form",
          email_domain: email.split("@")[1],
        });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Newsletter signup error:", error);
      setStatus("error");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid grid-cols-12 gap-6">
        {/* Asymmetric placement */}
        <div className="col-span-12 lg:col-span-8 lg:col-start-3">
          <div className="glass p-12 rounded-sm">
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
            <div className="max-w-md mx-auto">
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
              We respect your privacy · Unsubscribe anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
