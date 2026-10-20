"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

type ProjectCardProps = {
  images: readonly string[];
  title: string;
  description: string;
  link: string;
  index?: number;
};

const isVideoSrc = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

export const ProjectCard = ({
  images,
  title,
  description,
  link,
  index = 0,
}: ProjectCardProps) => {
  const slides = useMemo(() => {
    return images.length > 0 ? images : [];
  }, [images]);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSrc = slides[activeIndex] ?? "";
  const activeIsVideo = isVideoSrc(activeSrc);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }
    const delay = activeIsVideo ? 7000 : 2500;
    const timeout = setTimeout(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, delay);
    return () => clearTimeout(timeout);
  }, [slides.length, activeIndex, activeIsVideo]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.12, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] transition-colors duration-300 hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-500/10"
    >
      <Link
        href={link}
        target="_blank"
        rel="noreferrer noopener"
        className="block"
      >
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/30">
          <AnimatePresence mode="wait">
            {activeSrc ? (
              <motion.div
                key={activeSrc}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {activeIsVideo ? (
                  <video
                    src={activeSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={activeSrc}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <div className="relative p-4">
          <h1 className="text-2xl font-semibold text-white transition-colors duration-300 group-hover:text-cyan-300">
            {title}
          </h1>
          <p className="mt-2 text-gray-300">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
};
