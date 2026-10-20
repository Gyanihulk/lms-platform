"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, type MouseEvent } from "react";
import { Rocket, Zap, Sparkles, Download, Mail } from "lucide-react";

const TECH_MARQUEE = [
  "node.png",
  "express.png",
  "kafka.png",
  "AWS.png",
  "docker.png",
  "mongodb.png",
  "postgresql.png",
  "Redis.png",
  "next.png",
  "graphql.png",
  "Jenkins.png",
  "ts.png",
];

type SpotlightProps = {
  className?: string;
  children: React.ReactNode;
};

const SpotlightTile = ({ className = "", children }: SpotlightProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md transition-colors duration-300 hover:border-cyan-400/30 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(280px circle at ${pos.x}% ${pos.y}%, rgba(34,211,238,0.14), transparent 70%)`,
        }}
      />
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
};

export const Highlights = () => {
  return (
    <section
      id="highlights"
      data-autoscroll-delay="6000"
      className="relative flex flex-col items-center w-full py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <p className="uppercase tracking-[0.2em] text-xs text-cyan-400/80 mb-3">
          The short version
        </p>
        <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          Why work with me
        </h1>
      </motion.div>

      <div className="w-[92%] max-w-[1100px] grid grid-cols-1 md:grid-cols-4 md:grid-rows-[repeat(3,minmax(0,auto))] gap-4">
        {/* Big intro tile */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="md:col-span-2 md:row-span-2"
        >
          <SpotlightTile className="h-full p-6 md:p-7 flex flex-col justify-between min-h-[220px]">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10">
                <Sparkles className="w-4 h-4 text-cyan-300" />
              </div>
              <span className="text-xs uppercase tracking-widest text-gray-400">
                What I do
              </span>
            </div>
            <p className="text-gray-100 text-xl md:text-2xl font-medium leading-snug">
              I take backend systems from{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                idea to production
              </span>{" "}
              — and keep them running once real users show up.
            </p>
            <p className="text-gray-400 text-sm mt-4 leading-relaxed">
              Corporate experience at Hero MotoCorp shipping infrastructure at
              scale, plus eight independent projects shipped end-to-end on my
              own. I care as much about uptime and clean architecture as I do
              about shipping fast.
            </p>
          </SpotlightTile>
        </motion.div>

        {/* Years experience */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <SpotlightTile className="h-full p-5 flex flex-col justify-between min-h-[105px]">
            <Rocket className="w-4 h-4 text-cyan-300" />
            <div>
              <p className="text-3xl font-semibold text-gray-100">5+</p>
              <p className="text-gray-400 text-xs mt-1">
                Years building production systems
              </p>
            </div>
          </SpotlightTile>
        </motion.div>

        {/* Live products */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        >
          <SpotlightTile className="h-full p-5 flex flex-col justify-between min-h-[105px]">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <div>
              <p className="text-3xl font-semibold text-gray-100">8</p>
              <p className="text-gray-400 text-xs mt-1">
                Independent projects shipped, from live products to demos
              </p>
            </div>
          </SpotlightTile>
        </motion.div>

        {/* Production impact */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <SpotlightTile className="h-full p-5 flex flex-col justify-between min-h-[105px]">
            <Zap className="w-4 h-4 text-cyan-300" />
            <div>
              <p className="text-3xl font-semibold text-gray-100">20%</p>
              <p className="text-gray-400 text-xs mt-1">
                API latency cut via a Redis caching layer in production
              </p>
            </div>
          </SpotlightTile>
        </motion.div>

        {/* CTA tile */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
        >
          <SpotlightTile className="h-full p-5 flex flex-col justify-between min-h-[105px]">
            <span className="text-gray-100 text-sm font-medium">
              Open to new opportunities
            </span>
            <div className="flex flex-col gap-2 mt-3">
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-1.5 text-xs text-cyan-300 hover:text-cyan-200 transition"
              >
                <Download className="w-3.5 h-3.5" />
                Download resume
              </a>
              <a
                href="mailto:kumar.adamya2000@gmail.com"
                className="flex items-center gap-1.5 text-xs text-cyan-300 hover:text-cyan-200 transition"
              >
                <Mail className="w-3.5 h-3.5" />
                Say hello
              </a>
            </div>
          </SpotlightTile>
        </motion.div>

        {/* Tech marquee strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="md:col-span-4"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md py-5">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/60 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/60 to-transparent z-10" />
            <motion.div
              className="flex items-center gap-14 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 22, ease: "linear", repeat: Infinity }}
            >
              {[...TECH_MARQUEE, ...TECH_MARQUEE].map((icon, i) => (
                <div
                  key={`${icon}-${i}`}
                  className="flex items-center justify-center opacity-70 hover:opacity-100 transition"
                >
                  <Image
                    src={`/skills/${icon}`}
                    alt={icon.split(".")[0]}
                    width={40}
                    height={40}
                    className="object-contain h-9 w-9"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
