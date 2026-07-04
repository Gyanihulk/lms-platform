

import {
  BACKEND_SKILL,
  FRONTEND_SKILL,
  FULLSTACK_SKILL,
  OTHER_SKILL,
  SKILL_DATA,
} from "@/constants";
import { SkillText } from "../sub/skill-text";
import { SkillDataProvider } from "../sub/skill-data-provider";

type SkillsProps = {
  showBackground?: boolean;
};

export const Skills = ({ showBackground = true }: SkillsProps) => {
  const allSkills = [
    ...SKILL_DATA,
    ...FRONTEND_SKILL,
    ...BACKEND_SKILL,
    ...FULLSTACK_SKILL,
    ...OTHER_SKILL,
  ];
  const seenSkills = new Set<string>();
  const uniqueSkills = allSkills.filter((skill) => {
    if (seenSkills.has(skill.skill_name)) {
      return false;
    }
    seenSkills.add(skill.skill_name);
    return true;
  });

  const total = uniqueSkills.length;
  const rowCount = Math.ceil((Math.sqrt(8 * total + 1) - 1) / 2);
  const rowSizes = Array.from({ length: rowCount }, (_, index) => rowCount - index);
  const rows = [];
  let cursor = 0;
  for (const size of rowSizes) {
    if (cursor >= total) {
      break;
    }
    rows.push(uniqueSkills.slice(cursor, cursor + size));
    cursor += size;
  }

  let animationIndex = 0;

  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-20 px-2"
    >
      <SkillText />

      <div className="flex flex-col items-center gap-5 mt-4">
        {rows.map((row, rowIndex) => (
          <div
            key={`skill-row-${rowIndex}`}
            className="flex flex-row justify-center flex-wrap gap-3 md:gap-5 items-center"
          >
            {row.map((skill) => {
              const currentIndex = animationIndex;
              animationIndex += 1;
              return (
                <SkillDataProvider
                  key={skill.skill_name}
                  src={skill.image}
                  name={skill.skill_name}
                  width={skill.width}
                  height={skill.height}
                  index={currentIndex}
                />
              );
            })}
          </div>
        ))}
      </div>

      {showBackground && (
        <div className="w-full h-full absolute">
          <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
            <video
              className="w-full h-auto"
              preload="false"
              playsInline
              loop
              muted
              autoPlay
            >
              <source src="/videos/skills-bg.webm" type="video/webm" />
            </video>
          </div>
        </div>
      )}
    </section>
  );
};
