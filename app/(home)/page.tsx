

import { getCourses } from "@/actions/getCourses";
import { CoursesList } from "@/components/courseList";
import { Hero } from "./_components/threejsTheme/components/main/hero";
import { Projects } from "./_components/threejsTheme/components/main/projects";
import { Services } from "./_components/threejsTheme/components/main/Services";
import { EncryptionSkills } from "./_components/threejsTheme/components/main/encryption-skills";
import { StarsCanvas } from "./_components/threejsTheme/components/main/star-background";
import { AutoScroll } from "./_components/AutoScroll";

const Home = async () => {
  const courses = await getCourses({
    userId: "",
  });

  return (
    <>
      <StarsCanvas />
      {/* <AutoScroll /> */}
      <main className="h-full w-full">
        <div className="flex flex-col gap-20">
          <Hero />
          <EncryptionSkills />
          {/* <Services /> */}
          <Projects />
          <CoursesList items={courses} />
          <Services />
        </div>
      </main>
    </>
  );
};

export default Home;
