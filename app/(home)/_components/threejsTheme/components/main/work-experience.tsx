"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

type ExperienceEntry = {
  company: string;
  role: string;
  location: string;
  dates: string;
  yearLabel: string;
  current?: boolean;
  bullets: string[];
  tags: string[];
};

const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Hero MotoCorp",
    role: "Backend Engineer",
    location: "Gurugram",
    dates: "Nov 2024 - Present",
    yearLabel: "2024 — Now",
    current: true,
    bullets: [
      "Designed and maintained backend APIs behind API Gateway and load balancers, managing AWS infrastructure including Target Groups and implementing zero-downtime deployment patterns.",
      "Introduced Kafka-based asynchronous workflows to prevent cascading failures during peak traffic, and diagnosed and resolved event-consumer failures by adding validation and safe message handling.",
      "Built a Redis-backed caching layer that reduced API latency by roughly 20%, and set up CloudWatch metrics, Grafana dashboards, structured logging, and alerting to reduce incident resolution time.",
      "Designed and maintained Jenkins CI/CD pipelines, built and customized a CMS in Strapi, and published reusable internal npm packages to reduce redundant code across services.",
      "Currently leading a cloud infrastructure migration to GCP, and writing Python-based AWS Lambdas for various backend automation tasks.",
    ],
    tags: ["Node.js", "Python", "Kafka", "Redis", "AWS", "GCP", "Jenkins", "Strapi", "CloudWatch", "Grafana"],
  },
  {
    company: "Appfoster",
    role: "Software Engineer II",
    location: "Noida, India",
    dates: "Apr 2022 - Nov 2024",
    yearLabel: "2022 — 2024",
    bullets: [
      "Designed end-to-end user workflows — messaging, session/slot scheduling, and automated follow-ups — improving user productivity by 35%.",
      "Engineered a Chrome automation integration for LinkedIn chat using ChatGPT, Node.js, Next.js, and Express; automated Microsoft subscription billing via Azure APIs with retries and async workers, cutting manual effort by 40%.",
      "Built and deployed a GraphQL + Next.js social app with 40% better real-time interaction, and revamped a PHP-based marketplace backend, increasing engagement by 20% and transactions by 15%.",
      "Led a Laravel + Nuxt.js HR SaaS app with role-based workflows, reducing HR process time by 25%.",
    ],
    tags: ["Node.js", "Next.js", "GraphQL", "Laravel", "Nuxt.js", "Azure", "ChatGPT API"],
  },
  {
    company: "Capline Services",
    role: "Associate",
    location: "Noida, India",
    dates: "Aug 2021 - Apr 2022",
    yearLabel: "2021 — 2022",
    bullets: [
      "Streamlined insurance data collection across 10+ external provider APIs, improving accuracy by 30% through normalization and validation.",
      "Resolved recurring SaaS production issues in a cross-functional team, achieving 99.9% uptime and 15% fewer support tickets.",
    ],
    tags: ["REST APIs", "SaaS", "Cross-functional"],
  },
  {
    company: "ITDA",
    role: "Training Desk Analyst",
    location: "Dehradun",
    dates: "Jan 2021 - May 2021",
    yearLabel: "2021",
    bullets: [
      "Trained 20+ officials in E-Office systems, transitioning 1000+ legacy files to digital format.",
      "Developed Python-based visualization tools, cutting file processing time by 50% and paper use by 40%.",
    ],
    tags: ["Python", "E-Office", "Automation"],
  },
];

export const WorkExperience = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="experience"
      data-autoscroll-delay="6000"
      className="relative flex flex-col items-center w-full py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-14"
      >
        <p className="uppercase tracking-[0.2em] text-xs text-cyan-400/80 mb-3">
          Where I&apos;ve worked
        </p>
        <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          Work Experience
        </h1>
      </motion.div>

      <div className="w-[92%] max-w-[760px] relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/70 via-purple-400/30 to-transparent" />

        <div className="space-y-9">
          {EXPERIENCE.map((entry, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={entry.company}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                className="relative pl-8"
              >
                <span
                  className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 ${
                    entry.current
                      ? "border-cyan-400 bg-cyan-400/30 shadow-[0_0_14px_rgba(34,211,238,0.65)]"
                      : "border-white/30 bg-[#0a0a12]"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left group"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    {entry.current && (
                      <span className="text-[10px] uppercase tracking-wider text-cyan-300 border border-cyan-400/40 rounded-full px-2 py-0.5">
                        Now
                      </span>
                    )}
                    <span className="text-gray-500 text-xs font-mono">
                      {entry.yearLabel}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="text-gray-100 font-semibold text-lg group-hover:text-cyan-300 transition-colors">
                        {entry.company}
                      </span>
                      <span className="text-gray-400 text-sm"> · {entry.role}</span>
                      <span className="text-gray-500 text-xs block sm:inline sm:ml-2">
                        {entry.location}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-cyan-300" : ""
                      }`}
                    />
                  </div>
                </button>

                <div className="flex flex-wrap gap-2 mt-3">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full border border-white/10 bg-black/30 text-cyan-300/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-3 space-y-1.5 text-gray-300 text-sm leading-relaxed list-disc pl-5">
                        {entry.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
