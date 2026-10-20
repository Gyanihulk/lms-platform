"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Newspaper, Trophy } from "lucide-react";

const EDUCATION = [
  {
    degree: "Masters in Business Administration",
    detail: "Finance + Human Resource",
    place: "Gurukul Kangri, Haridwar",
    dates: "May 2019 - Apr 2021",
  },
  {
    degree: "Bachelors of Technology",
    detail: "Computer Science",
    place: "Gurukul Kangri",
    dates: "Jun 2015 - Apr 2019",
  },
];

const RECOGNITIONS = [
  {
    icon: Trophy,
    text: "Gold Medalist at Delhi Horse Show (2011, 2013)",
  },
  {
    icon: Award,
    text: "Recipient of Dada Saheb Phalke Film Award (2013)",
  },
  {
    icon: Newspaper,
    text: "Research on Home Automation published in International Journal (Dec 2019)",
  },
];

export const Services = () => {
  return (
    <section
      id="about-me"
      data-autoscroll-delay="10000"
      className="flex flex-col relative items-center justify-center w-full h-full z-30 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-12 relative z-[5]"
      >
        <p className="uppercase tracking-[0.2em] text-xs text-cyan-400/80 mb-3">
          A little more about me
        </p>
        <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          About Me
        </h1>
      </motion.div>

      <div className="relative z-[30] w-[92%] max-w-[900px] px-4 space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-gray-300 text-sm md:text-base leading-relaxed text-center max-w-[680px] mx-auto"
        >
          Backend Engineer with 5+ years across manufacturing infrastructure,
          HR SaaS, and marketplace platforms — currently building backend
          systems at Hero MotoCorp. I care about clean architecture,
          observability, and systems that hold up once real production
          traffic shows up.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-xl border border-white/10 bg-white/5 p-5 hover:border-cyan-400/30 hover:bg-white/[0.07] transition"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10">
                <GraduationCap className="w-4 h-4 text-cyan-300" />
              </div>
              <h3 className="text-gray-100 font-semibold text-lg">
                Education
              </h3>
            </div>
            <div className="space-y-4 border-l border-white/10 pl-4">
              {EDUCATION.map((edu) => (
                <div key={edu.degree} className="relative">
                  <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400" />
                  <p className="text-gray-100 font-medium text-sm">
                    {edu.degree}
                  </p>
                  <p className="text-gray-400 text-xs">{edu.detail}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {edu.place} &middot; {edu.dates}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="rounded-xl border border-white/10 bg-white/5 p-5 hover:border-cyan-400/30 hover:bg-white/[0.07] transition"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10">
                <Award className="w-4 h-4 text-cyan-300" />
              </div>
              <h3 className="text-gray-100 font-semibold text-lg">
                Recognitions
              </h3>
            </div>
            <div className="space-y-3">
              {RECOGNITIONS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-start gap-3">
                    <Icon className="w-4 h-4 text-cyan-400/80 mt-0.5 shrink-0" />
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
