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
          <div className="glass-high-blur p-12 rounded-sm">
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

            {/* Newsletter Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex gap-2 items-stretch">
                {/* Email Input */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Type your email..."
                  required
                  disabled={status === "loading" || status === "success"}
                  className="flex-1 px-4 py-3 bg-black/40 border border-white/20 rounded-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors disabled:opacity-50"
                  dir="ltr"
                />

                {/* Subscribe Button */}
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="px-8 py-3 bg-[#FF6719] hover:bg-[#FF7829] text-white font-medium rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {status === "loading" ? "..." : status === "success" ? "✓" : "Subscribe"}
                </button>
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <p className="text-center mt-4 text-green-400 text-sm">
                  תודה! נשלח לך אימייל לאישור ההרשמה
                </p>
              )}
              {status === "error" && (
                <p className="text-center mt-4 text-red-400 text-sm">
                  משהו השתבש. אנא נסו שוב
                </p>
              )}
            </form>

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
