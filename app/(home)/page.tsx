import { Hero } from "./_components/threejsTheme/components/main/hero";
import { Projects } from "./_components/threejsTheme/components/main/projects";
import { Services } from "./_components/threejsTheme/components/main/Services";
import { WorkExperience } from "./_components/threejsTheme/components/main/work-experience";
import { Highlights } from "./_components/threejsTheme/components/main/highlights";
import { EncryptionSkills } from "./_components/threejsTheme/components/main/encryption-skills";
import { SkillsGrid } from "./_components/threejsTheme/components/main/skills-grid";
import { Contact } from "./_components/threejsTheme/components/main/contact";
import { StarsCanvas } from "./_components/threejsTheme/components/main/star-background";

// This page is the hiring surface. It answers one question: can this person do
// the job. Anything that reads as selling — the course catalogue, the workshop
// banner — now lives on its own route (/dashboard/search, /workshop) instead of
// on the page a recruiter lands on. Nothing was deleted; the routes still work
// and can still be linked directly from wherever they're being promoted.
//
// Dropping CoursesList also drops a getCourses() database round-trip from the
// critical path of the most-visited page on the site.

const Home = () => {
  return (
    <>
      <StarsCanvas />
      <main className="h-full w-full">
        <div className="flex flex-col gap-20">
          <Hero />
          <Highlights />
          <WorkExperience />
          <EncryptionSkills />
          <SkillsGrid />
          <Projects />
          <Services />
          <Contact />
        </div>
      </main>
    </>
  );
};

export default Home;
