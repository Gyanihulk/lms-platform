import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from '@heroicons/react/20/solid'

interface datatype {
    heading: string;
    imgSrc: string;
    paragraph: string;
    link: string;
}

const Aboutdata: datatype[] = [
    {
        heading: "Who We Are.",
        imgSrc: "/images/aboutus/imgOne.svg",
        paragraph:
            "Altitude Aviation Academy is a premier pilot training institute in India, offering DGCA-approved CPL, ATPL, and cadet programs led by seasoned airline captains. We ensure deep theoretical grounding and operational excellence.",
        link: 'Learn more'
    },
    {
        heading: "What We Offer.",
        imgSrc: "/images/aboutus/imgTwo.svg",
        paragraph:
            "From ground school to airline readiness, our programs include CPL, ATPL, Type Rating (A320 & B737), IndiGo & Air India Cadet Programs, and Airline Preparation—all tailored to launch professional aviation careers.",
        link: 'Learn more'
    },
    {
        heading: "Why Choose Us.",
        imgSrc: "/images/aboutus/imgThree.svg",
        paragraph:
            "With personalized mentoring, high pass rates, and real-world airline insights, we go beyond textbooks. Our students train under current airline pilots and become part of a disciplined, result-driven ecosystem.",
        link: 'Learn more'
    },
]
// const Aboutdata: datatype[] = [
//     {
//       heading: "CPL Ground Classes (Online/Offline)",
//       imgSrc: "/images/aboutus/imgOne.svg",
//       paragraph:
//         "Ace your DGCA exams with our proven 90–95% first-attempt success rate. Choose flexible online or offline modes and get mentored by experienced airline instructors.",
//       link: "Learn more",
//     },
//     {
//       heading: "CPL Flying Training",
//       imgSrc: "/images/aboutus/imgOne.svg",
//       paragraph:
//         "Fly globally with our partner schools across India, USA, Canada, South Africa, and Europe. We handle documentation and provide end-to-end support.",
//       link: "Learn more",
//     },
//     {
//       heading: "IndiGo Cadet Pilot Program",
//       imgSrc: "/images/aboutus/imgOne.svg",
//       paragraph:
//         "Achieve a 100% selection rate like our past students. Get tailored training, mentorship from airline pilots, and full exam/interview prep support.",
//       link: "Learn more",
//     },
//     {
//       heading: "Air India Cadet Pilot Program",
//       imgSrc: "/images/aboutus/imgOne.svg",
//       paragraph:
//         "Step into India's national carrier with our expertly structured Air India Cadet program. Includes mock prep, SOP guidance, and expert mentoring.",
//       link: "Learn more",
//     },
//     {
//       heading: "Type Rating (A320 & B737)",
//       imgSrc: "/images/aboutus/imgOne.svg",
//       paragraph:
//         "Train on full-motion simulators for Airbus A320 or Boeing 737. Gain practical knowledge, procedural discipline, and airline-grade proficiency.",
//       link: "Learn more",
//     },
//     {
//       heading: "Pre/Post Type Rating Classes",
//       imgSrc: "/images/aboutus/imgOne.svg",
//       paragraph:
//         "Get industry-aligned pre-type and post-type rating training to reinforce aircraft systems knowledge, SOPs, and cockpit resource management.",
//       link: "Learn more",
//     },
//     {
//       heading: "ATPL Ground Classes",
//       imgSrc: "/images/aboutus/imgOne.svg",
//       paragraph:
//         "Advance your pilot career with comprehensive ATPL theory classes. Ideal for CPL holders aiming to become future captains.",
//       link: "Learn more",
//     },
//     {
//       heading: "Conversion Flying",
//       imgSrc: "/images/aboutus/imgOne.svg",
//       paragraph:
//         "Already a pilot abroad? Convert your foreign license to DGCA standards seamlessly with our dedicated conversion training and paperwork support.",
//       link: "Learn more",
//     },
//     {
//       heading: "Airline Preparation",
//       imgSrc: "/images/aboutus/imgOne.svg",
//       paragraph:
//         "Prepare for airline selection with mock interviews, psychometric tests, and technical Q&A rounds tailored to IndiGo, Air India & other carriers.",
//       link: "Learn more",
//     },
//     {
//       heading: "Graduation & Post-Graduation (Distance Mode)",
//       imgSrc: "/images/aboutus/imgOne.svg",
//       paragraph:
//         "Balance your academic goals with pilot training. We offer UGC-approved graduation and post-graduation options in distance education mode.",
//       link: "Learn more",
//     },
//   ];
  

const Aboutus = () => {
    return (

        <div id="aboutus-section">
            <div className='mx-auto max-w-7xl px-4 py-24 my-32 lg:px-10 bg-lightgrey rounded-3xl relative'>
                <Image src="/images/aboutus/dots.svg" width={100} height={100} alt="dots-image" className="absolute bottom-1 -left-20" />
                <h3 className='text-center text-blue text-lg tracking-widest'>ABOUT US</h3>
                <h4 className='text-center text-4xl lg:text-65xl font-bold'>Know more about us.</h4>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-16 gap-x-16 lg:gap-x-32'>
                    {Aboutdata.map((item, i) => (
                        <div key={i} className='hover:bg-navyblue bg-white rounded-3xl mt-16 pt-10 pl-8 pb-10 pr-6 shadow-xl group'>
                            <h4 className='text-4xl font-semibold  text-black mb-5 group-hover:text-white'>{item.heading}</h4>
                            <Image src={item.imgSrc} alt={item.imgSrc} width={100} height={100} className="mb-5" />
                            <h4 className='text-lg font-normal text-black group-hover:text-offwhite mb-5'>{item.paragraph}</h4>
                            <Link href="#" className='text-lg font-semibold group-hover:text-white text-blue hover-underline'>
                                {item.link}
                                <ChevronRightIcon width={20} height={20} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Aboutus;