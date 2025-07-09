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
    title="Your Flight Plan to the Skies Starts Here!"
    subtitle="Our Pilot Training Programs"
    programs={[
      {
        icon: <Image src="/images/programs/1.png" width={150} height={150} alt="cpl-ground" />,
        title: "CPL Ground Classes (Online/Offline)",
        description: "Ace your exams with our high-success CPL theory training. 90–95% of our students clear it on the first attempt!",
      },
      {
        icon: <Image src="/images/programs/2.png" width={150} height={150} alt="cpl-flying" />,
        title: "CPL Flying Training",
        description: "Earn your wings with global flying school tie-ups. Choose from India, the USA, Canada, South Africa, or Europe.",
      },
      {
        icon: <Image src="/images/programs/3.png" width={150} height={150} alt="indigo-cadet" />,
        title: "IndiGo Cadet Pilot Program",
        description: "With a 100% IndiGo Cadet selection rate, get the best mentorship and training to secure your future.",
      },
      {
        icon: <Image src="/images/programs/4.png" width={150} height={150} alt="airindia-cadet" />,
        title: "Air India Cadet Pilot Program",
        description: "Be a part of the Air India airline’s legacy with our proven 100% Air India Cadet selection rate, expert mentorship, and world-class training.",
      },
      {
        icon: <Image src="/images/programs/5.png" width={150} height={150} alt="type-rating" />,
        title: "Type Rating (Airbus A320 & Boeing B737)",
        description: "Fly big jet aircrafts with hands-on simulator training on the most in-demand aircraft.",
      },
      {
        icon: <Image src="/images/programs/6.png" width={150} height={150} alt="prepost-type" />,
        title: "Pre/Post Type Rating Classes",
        description: "Bridge the gap with essential training before and after Type Rating.",
      },
      {
        icon: <Image src="/images/programs/7.png" width={150} height={150} alt="atpl" />,
        title: "ATPL (Airline Transport Pilot License)",
        description: "Take your aviation career to the next level with our expert-led ATPL training.",
      },
      {
        icon: <Image src="/images/programs/8.png" width={150} height={150} alt="conversion" />,
        title: "Conversion Flying",
        description: "Already a pilot abroad? Get your license converted hassle-free and fly in India.",
      },
      {
        icon: <Image src="/images/programs/9.png" width={150} height={150} alt="airline-prep" />,
        title: "Airline Prep",
        description: "Mock interviews, psychometric tests, personalized coaching, and technical prep to land your airline job.",
      },
      {
        icon: <Image src="/images/programs/10.png" width={150} height={150} alt="graduation" />,
        title: "Graduation & Post-Graduation (Distant Mode)",
        description: "Balance pilot training with a college degree for a future beyond aviation.",
      },
    ]}
    
    images={["/images/programs/main1.png", "/images/programs/main2.png"]}
/>


      <StatsSection/>
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
