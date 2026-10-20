"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const STARTER_QUESTIONS = [
  "What does Adamya do at Hero MotoCorp?",
  "What's his strongest technical area?",
  "What projects has he shipped on his own?",
];

const INITIAL_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I'm here to answer questions about Adamya — his experience, skills, and projects. What would you like to know?",
};

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) {
        const errorText = await res.text().catch(() => "");
        throw new Error(errorText || `Request failed (${res.status})`);
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      const detail = err instanceof Error ? err.message : "";
      console.error("[ChatWidget]", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: detail
            ? `Something went wrong: ${detail}`
            : "Something went wrong on my end — try again, or email Adamya directly at kumar.adamya2000@gmail.com.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-3 w-[90vw] max-w-[360px] h-[480px] rounded-2xl border border-white/10 bg-[#0a0a12]/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500/30 to-cyan-500/30 border border-white/10">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                </div>
                <div>
                  <p className="text-gray-100 text-sm font-medium">
                    Know Adamya better
                  </p>
                  <p className="text-gray-500 text-[10px]">
                    AI chat — answers questions about him only
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-200 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                        : "bg-white/5 border border-white/10 text-gray-200"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-400">
                    Thinking…
                  </div>
                </div>
              )}

              {messages.length === 1 && (
                <div className="flex flex-col gap-2 pt-2">
                  {STARTER_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => sendMessage(q)}
                      className="text-left text-xs px-3 py-2 rounded-lg border border-white/10 text-gray-300 hover:border-cyan-400/40 hover:text-cyan-300 transition"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 px-3 py-3 border-t border-white/10"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about his experience, skills…"
                maxLength={500}
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-3 py-2 text-xs text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-cyan-400/40"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white disabled:opacity-40 transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-end gap-3">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              type="button"
              onClick={() => setIsOpen(true)}
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="hidden sm:flex items-center gap-2 rounded-full border border-cyan-400/30 bg-[#0a0a12]/95 backdrop-blur-md px-4 py-2.5 text-xs text-gray-200 shadow-lg hover:border-cyan-400/60 hover:text-cyan-300 transition"
            >
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              />
              Know Adamya better — AI chat
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={
            !isOpen
              ? { boxShadow: [
                  "0 0 16px rgba(34,211,238,0.35)",
                  "0 0 28px rgba(168,85,247,0.55)",
                  "0 0 16px rgba(34,211,238,0.35)",
                ] }
              : {}
          }
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => setIsOpen((v) => !v)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white flex items-center justify-center shrink-0"
        >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-5 h-5" />
        )}
        </motion.button>
      </div>
    </div>
  );
};
