"use client";

import { useEffect } from "react";

export const AutoScroll = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const sectionIds = [
      "hero",
      "encryption-skills",
      "about-me",
      "projects",
    ];
    const getSections = () =>
      sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

    let idleTimer: number | null = null;
    let autoScrollTimer: number | null = null;
    let hasUserScrolled = false;

    const clearTimers = () => {
      if (idleTimer) {
        window.clearTimeout(idleTimer);
        idleTimer = null;
      }
      if (autoScrollTimer) {
        window.clearTimeout(autoScrollTimer);
        autoScrollTimer = null;
      }
    };

    const getActiveSection = (sections: HTMLElement[]) => {
      const centerY = window.innerHeight / 2;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= centerY && rect.bottom >= centerY) {
          return section;
        }
      }
      return sections[0] ?? null;
    };

    const scheduleAutoScroll = () => {
      const sections = getSections();
      if (sections.length === 0) {
        return;
      }
      const activeSection = getActiveSection(sections);
      if (!activeSection) {
        return;
      }
      const activeIndex = sections.indexOf(activeSection);
      if (activeIndex < 0 || activeIndex === sections.length - 1) {
        return;
      }
      const delay = Number(activeSection.dataset.autoscrollDelay ?? "0") || 0;
      autoScrollTimer = window.setTimeout(() => {
        const nextSection = sections[activeIndex + 1];
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
      }, delay);
    };

    const handleScroll = () => {
      hasUserScrolled = true;
      clearTimers();
      idleTimer = window.setTimeout(() => {
        if (!hasUserScrolled) {
          return;
        }
        scheduleAutoScroll();
      }, 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    if (!window.location.hash && window.scrollY === 0) {
      idleTimer = window.setTimeout(() => {
        scheduleAutoScroll();
      }, 200);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimers();
    };
  }, []);

  return null;
};
