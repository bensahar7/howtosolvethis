"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
}

// The RAG backend lives in a separate deployment. Set NEXT_PUBLIC_CHAT_API_URL
// to it (e.g. https://ragpodcastchatbot.vercel.app) — otherwise the fetch
// resolves to this site's own /api/chat, which does not exist here.
const API_BASE = process.env.NEXT_PUBLIC_CHAT_API_URL ?? "";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const question = input.trim();
    if (!question || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.answer, sources: data.sources },
        ]);
      } else {
        // 400/429 carry a user-facing Hebrew reason (too long, daily cap).
        const reason =
          res.status === 429 || res.status === 400
            ? data.error
            : "שגיאה: לא הצלחתי לעבד את השאלה.";
        setMessages((prev) => [...prev, { role: "assistant", content: reason }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "שגיאה: בעיית תקשורת עם השרת." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      dir="rtl"
      className="fixed bottom-4 left-4 z-[60] flex flex-col items-start gap-3 md:bottom-6 md:left-6"
    >
      {open && (
        <div
          role="dialog"
          aria-label="שאלו על הפודקאסט"
          className="glass-high-blur rounded-sm flex flex-col w-[calc(100vw-2rem)] max-w-[380px] h-[min(70vh,520px)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10">
            <span className="technical-text">שאלו על הפודקאסט</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="סגירת הצ׳אט"
              className="text-white/60 hover:text-white transition-colors text-lg leading-none"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.length === 0 && (
              <p className="body-text text-sm text-white/50 text-center mt-8 leading-relaxed">
                שאלו שאלה על אחד מפרקי הפודקאסט — למשל: &quot;מה הבעיה עם
                דבורים?&quot;
              </p>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] ${
                  msg.role === "user" ? "self-end" : "self-start"
                }`}
              >
                <div
                  className={`rounded-sm px-3.5 py-2.5 text-sm whitespace-pre-wrap leading-relaxed border ${
                    msg.role === "user"
                      ? "bg-white/15 border-white/20 text-white"
                      : "bg-black/40 border-white/10 text-white/90"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.sources && msg.sources.length > 0 && (
                  <div className="technical-text mt-1.5 normal-case">
                    מקורות: {msg.sources.join(" | ")}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="self-start rounded-sm px-3.5 py-2.5 text-sm bg-black/40 border border-white/10 text-white/50">
                מחפש תשובה...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 p-3 border-t border-white/10"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="שאלו שאלה..."
              disabled={loading}
              maxLength={400}
              dir="rtl"
              className="flex-1 min-w-0 rounded-sm bg-white/5 border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/40 transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-sm border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/10"
            >
              שלח
            </button>
          </form>
        </div>
      )}

      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={open ? "סגירת הצ׳אט" : "שאלו על הפודקאסט"}
        className="glass glass-hover rounded-sm flex items-center gap-2 px-4 py-3 text-white"
      >
        <span aria-hidden="true">💬</span>
        <span className="technical-text">שאלו על הפודקאסט</span>
      </button>
    </div>
  );
}