

"use client"
// import Contact from "./_components/contact/Contact";
// import Hero from "./_components/hero/Hero";
import Parallax from "./_components/parallax/Parallax";
import Portfolio from "./_components/portfolio/Portfolio";
// import Services from "./_components/services/Services";
import { ScrollProvider } from "@/context/ScrollContext";
import { getCourses } from "@/actions/getCourses";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { Categories } from "../(dashboard)/dashboard/(routes)/search/_components/categories";
import { CoursesList } from "@/components/courseList";
import { Hero } from "./_components/threejsTheme/components/main/hero";
import { Skills } from "./_components/threejsTheme/components/main/skills";
import dynamic from "next/dynamic";
import { Encryption } from "./_components/threejsTheme/components/main/encryption";
import { Projects } from "./_components/threejsTheme/components/main/projects";
import { Services } from "./_components/threejsTheme/components/main/Services";

const StarsCanvas = dynamic(
  () =>
    import("./_components/threejsTheme/components/main/star-background").then(
      (m) => m.StarsCanvas
    ),
  { ssr: false }
);
const Home =  () => {



  return (<>

    <StarsCanvas />
   
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        {/* <Services /> */}
        <Encryption />
        <Services/>
      <Projects />
      </div>
    </main>
  </>
  );
}

export default Home;

