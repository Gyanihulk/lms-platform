"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Encryption } from "./encryption";
import { Skills } from "./skills";

export const EncryptionSkills = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px 0px -20% 0px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isActive || showSkills || hasStartedRef.current) {
      return;
    }
    hasStartedRef.current = true;
    const timer = setTimeout(() => setShowSkills(true), 1000);
    return () => clearTimeout(timer);
  }, [isActive, showSkills]);

  return (
    <section
      id="encryption-skills"
      ref={sectionRef}
      data-autoscroll-delay="5000"
      className="relative min-h-screen w-full overflow-hidden"
    >
      <div className="absolute inset-0">
        <video
          loop
          muted
          autoPlay
          playsInline
          preload="false"
          className="w-full h-auto"
        >
          <source src="/videos/encryption-bg.webm" type="video/webm" />
        </video>
      </div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {showSkills ? (
            <motion.div
              key="skills"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Skills showBackground={false} />
            </motion.div>
          ) : (
            <motion.div
              key="encryption"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Encryption showBackground={true} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
