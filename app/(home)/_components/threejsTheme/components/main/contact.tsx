"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail, Download } from "lucide-react";

import { SOCIALS } from "@/constants";

const FAQ = [
  {
    q: "What do I build?",
    a: "Backend systems and APIs — event-driven services with Kafka, caching layers with Redis, and CI/CD pipelines, currently at Hero MotoCorp. Outside of work, I ship full-stack products end-to-end, from database to deployment.",
  },
  {
    q: "What role am I looking for?",
    a: "Backend or full-stack engineering roles where I can own infrastructure and ship production systems — Node.js/TypeScript backends, cloud infra, and API design.",
  },
  {
    q: "What's my strongest technical area?",
    a: "Backend architecture and production reliability — caching strategy, async messaging with Kafka, CI/CD pipelines, and cloud infrastructure on AWS and GCP.",
  },
  {
    q: "What have I shipped on my own?",
    a: "8 independent projects end-to-end, outside my day job — including an AI-powered aviation exam platform with 30+ active students (Profly AI), a live iOS App Store app (Eclipse), and a two-sided AI tutoring marketplace (Adhian Gurus).",
  },
  {
    q: "What's my educational background?",
    a: "A B.Tech in Computer Science, followed by an MBA in Finance and HR, both from Gurukul Kangri, Haridwar.",
  },
  {
    q: "How can you reach me?",
    a: "Email is fastest — kumar.adamya2000@gmail.com. I'm also reachable at +91 7017368626, or on LinkedIn and GitHub below. My résumé is downloadable from this page too.",
  },
];

export const Contact = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="contact"
      data-autoscroll-delay="6000"
      className="relative flex flex-col items-center w-full py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-3"
      >
        <p className="uppercase tracking-[0.2em] text-xs text-cyan-400/80 mb-3">
          For recruiters &amp; hiring managers
        </p>
        <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          Quick Answers
        </h1>
      </motion.div>

      <div className="w-[92%] max-w-[720px] mt-8 space-y-3">
        {FAQ.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
              className="rounded-xl border border-white/10 bg-white/5 hover:border-cyan-400/30 transition-colors overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
              >
                <span className="text-gray-100 text-sm md:text-base font-medium">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-cyan-300" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-400 text-sm leading-relaxed px-5 pb-4">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="flex flex-wrap items-center justify-center gap-3 mt-10"
      >
        <a
          href="mailto:kumar.adamya2000@gmail.com"
          className="flex items-center gap-2 text-sm px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover:opacity-90 transition"
        >
          <Mail className="w-4 h-4" />
          Email me
        </a>
        <a
          href="/resume.pdf"
          download
          className="flex items-center gap-2 text-sm px-5 py-2.5 rounded-full border border-white/15 text-gray-200 hover:border-cyan-400/40 hover:text-cyan-300 transition"
        >
          <Download className="w-4 h-4" />
          Download resume
        </a>
        {SOCIALS.map(({ name, icon: Icon, link }) => (
          <a
            key={name}
            href={link}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2 text-sm px-5 py-2.5 rounded-full border border-white/15 text-gray-200 hover:border-cyan-400/40 hover:text-cyan-300 transition"
          >
            <Icon className="w-4 h-4" />
            {name}
          </a>
        ))}
      </motion.div>
    </section>
  );
};
