"use client";

import { useEffect, useMemo, useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { MdFlightTakeoff } from "react-icons/md";

type StatFromAPI = {
  icon?: string;            // e.g. "FaGraduationCap" | "MdFlightTakeoff"
  value: number;            // target number
  label: string;            // e.g. "Pilots Trained"
  suffix?: string | null;   // e.g. "+"
  textColor?: string;       // tailwind class, e.g. "text-white"
};

type StatsSectionProps = {
  stats?: StatFromAPI[];          // passed from API+fallback merge
  bgClassName?: string;           // optional background override
  durationMs?: number;            // optional animation duration (default 1500ms)
};

// Map icon names from API → actual React components
const iconRegistry: Record<string, (className?: string) => JSX.Element> = {
  FaGraduationCap: (cls = "") => <FaGraduationCap size={60} className={cls} />,
  MdFlightTakeoff: (cls = "") => <MdFlightTakeoff size={60} className={cls} />,
};

export default function StatsSection({
  stats = [
    // local fallback if nothing provided at all
    { icon: "FaGraduationCap", value: 15, label: "Years Experience", suffix: "+", textColor: "text-white" },
    { icon: "MdFlightTakeoff", value: 8000, label: "Pilots Trained", textColor: "text-white" },
    { icon: "FaGraduationCap", value: 8, label: "Courses Offered", suffix: "+", textColor: "text-white" },
  ],
  bgClassName = "bg-blue",
  durationMs = 1500,
}: StatsSectionProps) {
  // Freeze the final targets so animation doesn’t restart on rerenders
  const targets = useMemo(() => stats.map((s) => Math.max(0, Number(s.value) || 0)), [stats]);
  const [values, setValues] = useState<number[]>(() => targets.map(() => 0));

  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const tick = () => {
      const now = performance.now();
      const t = Math.min(1, (now - start) / durationMs); // 0 → 1
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);

      setValues(targets.map((target) => Math.round(target * eased)));

      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [targets, durationMs]);

  return (
    <div className="mx-2">
      <div className={`relative ${bgClassName} py-20 rounded-3xl overflow-hidden`}>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {stats.map((stat, i) => {
              const Icon = iconRegistry[stat.icon ?? ""] ?? iconRegistry.FaGraduationCap;
              const color = stat.textColor ?? "text-white";
              return (
                <div key={`${stat.label}-${i}`} className="relative px-6">
                  {i !== 0 && (
                    <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-20 border-l border-gray-300/40" />
                  )}
                  <div className="flex flex-col items-center">
                    {Icon(`${color} mb-6`)}
                    <p className={`text-4xl font-bold ${color}`}>
                      {values[i]}
                      {stat.suffix ?? ""}
                    </p>
                    <p className={`mt-2 text-xl font-medium ${color}`}>{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
