"use client";

import { motion } from "framer-motion";

type Level = 0 | 1 | 2 | 3;

const YEARS = ["2021", "2022", "2023", "2024", "2025", "2026"];

const LEVEL_LABEL: Record<Level, string> = {
  0: "Not used",
  1: "Learning",
  2: "Production",
  3: "Shipped at scale",
};

const LEVEL_CLASS: Record<Level, string> = {
  0: "bg-white/5 border border-white/10",
  1: "bg-purple-500/30 border border-purple-400/40",
  2: "bg-cyan-500/50 border border-cyan-400/50",
  3: "bg-gradient-to-br from-purple-400 to-cyan-400 border border-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.5)]",
};

type SkillRow = {
  name: string;
  levels: Level[];
};

type SkillGroup = {
  group: string;
  rows: SkillRow[];
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    group: "Languages",
    rows: [
      { name: "TypeScript", levels: [1, 1, 2, 2, 3, 3] },
      { name: "JavaScript", levels: [1, 2, 2, 2, 2, 2] },
      { name: "PHP", levels: [1, 2, 3, 3, 0, 0] },
      { name: "Python", levels: [3, 0, 0, 0, 3, 3] },
      { name: "Swift", levels: [0, 0, 0, 1, 2, 2] },
      { name: "C# (Unity)", levels: [0, 0, 1, 1, 1, 1] },
    ],
  },
  {
    group: "Backend & Data",
    rows: [
      { name: "Node.js", levels: [1, 2, 2, 2, 3, 3] },
      { name: "Express.js", levels: [1, 2, 2, 2, 3, 3] },
      { name: "Nest.js", levels: [0, 0, 1, 2, 2, 2] },
      { name: "Laravel / Nuxt.js", levels: [0, 2, 2, 1, 0, 0] },
      { name: "GraphQL", levels: [0, 2, 2, 2, 1, 1] },
      { name: "Microservices", levels: [0, 1, 1, 2, 3, 3] },
      { name: "SQL (Postgres / MySQL)", levels: [1, 2, 2, 2, 2, 2] },
      { name: "MongoDB", levels: [1, 1, 1, 3, 3, 3] },
      { name: "Prisma", levels: [0, 0, 0, 1, 2, 2] },
      { name: "Redis", levels: [0, 0, 0, 1, 3, 3] },
      { name: "Socket.io", levels: [0, 1, 2, 2, 2, 2] },
    ],
  },
  {
    group: "Cloud & Infra",
    rows: [
      { name: "AWS", levels: [1, 1, 1, 2, 3, 3] },
      { name: "GCP", levels: [0, 0, 0, 0, 1, 2] },
      { name: "Azure", levels: [0, 2, 2, 1, 0, 0] },
      { name: "Kafka", levels: [0, 0, 0, 1, 3, 3] },
      { name: "Docker", levels: [0, 1, 2, 2, 3, 3] },
      { name: "Nginx", levels: [0, 1, 1, 2, 3, 3] },
      { name: "CI/CD (Jenkins / GH Actions)", levels: [0, 1, 1, 2, 3, 3] },
    ],
  },
  {
    group: "Frontend & Mobile",
    rows: [
      { name: "React / Next.js", levels: [1, 2, 2, 2, 2, 2] },
      { name: "React Native / Flutter", levels: [0, 0, 1, 1, 2, 2] },
    ],
  },
];

export const SkillsGrid = () => {
  return (
    <section
      id="skills"
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
          Surface area
        </p>
        <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          Skills, by Year
        </h1>
      </motion.div>

      <p className="text-gray-400 text-sm text-center max-w-[560px] mb-10 px-4">
        Not a logo wall — this is what I actually used each year, and how
        deep, based on my real project and work history.
      </p>

      <div className="w-[92%] max-w-[820px] overflow-x-auto pb-2">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-[minmax(170px,1fr)_repeat(6,34px)] gap-x-2 mb-3">
            <div />
            {YEARS.map((y) => (
              <span
                key={y}
                className="text-[10px] text-gray-500 text-center font-mono"
              >
                {y}
              </span>
            ))}
          </div>

          <div className="space-y-5">
            {SKILL_GROUPS.map((group, gi) => (
              <div key={group.group}>
                <p className="text-[10px] uppercase tracking-[0.15em] text-purple-300/70 mb-2">
                  {group.group}
                </p>
                <div className="space-y-3">
                  {group.rows.map((row, i) => (
                    <motion.div
                      key={row.name}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.4,
                        delay: gi * 0.05 + i * 0.03,
                        ease: "easeOut",
                      }}
                      className="grid grid-cols-[minmax(170px,1fr)_repeat(6,34px)] gap-x-2 items-center"
                    >
                      <span className="text-gray-300 text-xs sm:text-sm pr-2 truncate">
                        {row.name}
                      </span>
                      {row.levels.map((level, j) => (
                        <span
                          key={`${row.name}-${YEARS[j]}`}
                          title={`${row.name} · ${YEARS[j]} · ${LEVEL_LABEL[level]}`}
                          className={`w-5 h-5 rounded mx-auto ${LEVEL_CLASS[level]}`}
                        />
                      ))}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-10 px-4">
        {([0, 1, 2, 3] as Level[]).map((lvl) => (
          <div key={lvl} className="flex items-center gap-2">
            <span className={`w-3.5 h-3.5 rounded ${LEVEL_CLASS[lvl]}`} />
            <span className="text-gray-400 text-xs">{LEVEL_LABEL[lvl]}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
