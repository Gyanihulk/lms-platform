

import Contact from "./_components/contact/Contact";
import Hero from "./_components/hero/Hero";
import Parallax from "./_components/parallax/Parallax";
import Portfolio from "./_components/portfolio/Portfolio";
import Services from "./_components/services/Services";
import { ScrollProvider } from "@/context/ScrollContext";
import { getCourses } from "@/actions/getCourses";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { Categories } from "../(dashboard)/dashboard/(routes)/search/_components/categories";
import { CoursesList } from "@/components/courseList";
const Home = async () =>  {
  const { userId } = auth();

  // if (!userId) {
  //   return redirect("/dashboard");
  // }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
// console.log(categories)
  const courses = await getCourses({
    userId:userId|| "",
  });
  return (
    <ScrollProvider>
      <div id="homepage">
        {/* <Cursor /> */}
        <section id="Homepage">
          <Hero />
        </section>
        <div className="p-6 space-y-4">
        <CoursesList items={courses} />
      </div>
        <section id="Services">
          <Parallax type="services" />
        </section>
        <section>
          <Services />
        </section>
        <section id="Portfolio">
          <Parallax type="portfolio" />
        </section>

        <Portfolio />

        <section id="Contact">
          <Contact />
        </section>
      </div>
    </ScrollProvider>
  );
}

export default Home;