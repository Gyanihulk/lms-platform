"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, PROJECT_CATEGORIES } from "@/constants";
import { ProjectCard } from "../sub/project-card";

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return PROJECTS;
    return PROJECTS.filter((project) =>
      (project.categories as readonly string[]).includes(activeFilter)
    );
  }, [activeFilter]);

  return (
    <section
      id="projects"
      data-autoscroll-delay="5000"
      className="flex flex-col items-center justify-center py-20"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-10"
      >
        My Projects
      </motion.h1>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-14 px-4">
        {PROJECT_CATEGORIES.map((category) => {
          const isActive = activeFilter === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              className={`text-xs sm:text-sm px-4 py-1.5 rounded-full border transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 border-transparent text-white shadow-[0_0_16px_rgba(34,211,238,0.35)]"
                  : "border-white/15 text-gray-400 hover:text-cyan-300 hover:border-cyan-400/40"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <motion.div
        layout
        className="h-full w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 px-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <ProjectCard
                images={project.images}
                title={project.title}
                description={project.description}
                link={project.link}
                index={index}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <p className="text-gray-400 text-sm mt-10">
          No projects in this category yet.
        </p>
      )}
    </section>
  );
};
