import Banner from './_components/Banner/index';
import Aboutus from './_components/Aboutus/index';
import Dedicated from './_components/Dedicated/index';
import Digital from './_components/Digital/index';
import Beliefs from './_components/Beliefs/index';
import Wework from './_components/Wework/index';
import Ourteam from './_components/Ourteam/index';
import Featured from './_components/Featured/index';
import Manage from './_components/Manage/index';
import FAQ from './_components/FAQ/index';
import Testimonials from './_components/Testimonials/index';
import Articles from './_components/Articles/index';
import Joinus from './_components/Joinus/index';
import Insta from './_components/Insta/index';
import StatsSection from './_components/Stats';
import HighlightSection from './_components/HighlightedSection';
import {
  FaPlaneDeparture,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaRegPaperPlane,
  FaExchangeAlt,
  FaSchool,
} from "react-icons/fa";
import ProgramsGridSection from './_components/ProgramsGridSection';
import Image from "next/image";
import programsGrid from './_components/ProgramsGridSection/programGrid.json'

export default function Home() {
  return (
    <main>
      <Banner />
      {/* <Digital /> */}
      <HighlightSection
        title="At Altitude Aviation Academy, we build aviation success stories!"
        description={[
          "With 15 years of expertise and a team of experienced pilots leading the way, we provide comprehensive ground classes, CPL flying training, type rating, and airline prep programs. Our students dominate the skies with top-tier results, global flying opportunities, and seamless support throughout their journey.",
          "With a <strong>90–95% pass rate</strong> in CPL Ground Classes and a <strong>100% selection rate</strong> in the IndiGo Cadet Program, our track record speaks for itself. When you train with us, you don’t just earn a license — <strong>you earn a career.</strong>"
        ]}
        buttonText="Explore Our Programs"
        imageSrc="/images/digital/new.png"
      />
      <ProgramsGridSection
        title={programsGrid.sectionTitle}
        subtitle={programsGrid.subtitle}
        images={programsGrid.images}
        programs={programsGrid.programs.map((item) => ({
          title: item.title,
          description: item.description,
          icon: (
            <Image
              src={item.iconPath}
              alt={item.iconAlt}
              width={150}
              height={150}
            />
          )
        }))}
      />


      <StatsSection />
      <Dedicated />
      <HighlightSection
        title="Our Global Tie-Ups — Your Gateway to the World!"
        description={[
          "Topflyer collaborates with top flight schools globally, offering students the flexibility to complete their flying hours amidst world-class facilities and full-flight simulators.",
          "Choose the best fit for your training needs, and we’ll handle the visa, medicals, and documentation—no headaches, just flying!",
          "<strong>Training Locations:</strong> India, USA, Canada, South Africa, Europe"
        ]}
        buttonText="Training Programmes"
        imageSrc="/images/digital/global1.png"
        imageWidth={800}
        imageHeight={800}
        reverse
      />

      <Testimonials />
      <Beliefs />
      <Wework />
      {/* <Ourteam /> */}
      {/* <Featured /> */}
      {/* <Manage /> */}
      <FAQ />
      {/* <Articles /> */}
      <Joinus />
      {/* <Aboutus /> */}
      {/* <Insta /> */}
    </main>
  )
}
