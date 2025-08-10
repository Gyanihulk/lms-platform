// lib/fallbacks.ts
import { DedicatedProps } from "@/app/(home)/_components/Dedicated";
import { FAQProps } from "@/app/(home)/_components/FAQ";
import { TestimonialsProps } from "@/app/(home)/_components/Testimonials";
import {
    BannerSectionData,
    HighlightSectionData,
    ProgramsGridSectionData,
    StatsSectionData,
    DedicatedSectionData,
    TestimonialSectionData,
    BeliefsSectionData,
    WeWorkSectionData,
    FAQSectionData,
  } from "@/types/page";
  
  export const getBannerFallback = (data?: Partial<BannerSectionData>): BannerSectionData => ({
    id: data?.id ?? "",
    title: data?.title ?? "Default Banner Title",
    subtitle: data?.subtitle ?? "Default Banner Subtitle",
    imageSrc: data?.imageSrc ?? "/images/default-banner.png",
    buttonText: data?.buttonText ?? "Learn More",
    ctaLink: data?.ctaLink ?? "/",
    theme: data?.theme ?? "light",
  });
  
  export const getHighlightFallback = (data?: Partial<HighlightSectionData>): HighlightSectionData => ({
    id: data?.id ?? "",
    title: data?.title ?? "Default Highlight Title",
    description: data?.description ?? ["Default highlight description"],
    imageSrc: data?.imageSrc ?? "/images/default-highlight.png",
    reverse: data?.reverse ?? false,
    buttonText: data?.buttonText ?? "Read More",
    ctaLink: data?.ctaLink ?? null,
    backgroundClass: data?.backgroundClass ?? "",
    imageWidth: data?.imageWidth ?? 500,
    imageHeight: data?.imageHeight ?? 400,
  });
  
  export const getProgramsFallback = (data?: Partial<ProgramsGridSectionData>): ProgramsGridSectionData => ({
    id: data?.id ?? "",
    title: data?.title ?? "Default Programs Title",
    subtitle: data?.subtitle ?? "Default Programs Subtitle",
    images: data?.images ?? [],
    programs: data?.programs ?? [],
  });
  
  export const getStatsFallback = (data?: Partial<StatsSectionData>): StatsSectionData => ({
    id: data?.id ?? "",
    stats: data?.stats ?? [],
  });
  
  export const getDedicatedFallback = (d?: Partial<DedicatedProps>): DedicatedProps => ({
    title: d?.title ?? "Why Choose Us?",
    subtitle: d?.subtitle ?? "Your Success, Our Commitment!",
    points: d?.points ?? [
      "Over 15 years of expertise",
      "Learn from the industry veterans",
      "ISO-certified pilot training institute",
      "Comprehensive curriculum from ab-initio to airline training",
      "Global flying training options",
      "State-of-the-art facilities",
      "90–95% pass rate in DGCA examination papers",
      "95% pass rate in the last IndiGo written exam",
      "100% selection rate for airline cadets",
      "No extra fees for reattempts",
    ],
    imageSrc: d?.imageSrc ?? "/images/dedicated/new.png",
    commaSrc: d?.commaSrc ?? "/images/dedicated/comma.svg",
    spiralSrc: d?.spiralSrc ?? "/images/dedicated/spiral.svg",
    button1Text: d?.button1Text ?? "Explore More",
    button1Link: d?.button1Link ?? "/explore",
    button2Text: d?.button2Text ?? "Download Brochure",
    button2Link: d?.button2Link ?? "/brochure.pdf",
  });
  

export function getTestimonialFallback(): TestimonialsProps {
  return {
    title: 'See what others are saying.',
    echoTitle1: 'See what others are saying.',
    echoTitle2: 'See what others are saying.',
    bgClassName: 'bg-testimonial',
    slidesToShow: 3,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 500,
    items: [
      {
        name: 'Capt. Aditi Verma',
        profession: 'First Officer, IndiGo Airlines',
        comment:
          'Altitude Aviation Academy gave me the confidence and training I needed to clear the IndiGo Cadet Program. The mentoring from airline pilots made all the difference.',
        imgSrc: '/images/testimonial/user1.png',
        rating: 5,
      },
      {
        name: 'Siddharth Mehra',
        profession: 'ATPL Student',
        comment:
          'The ground classes were top-notch! The instructors ensured we not only understood the concepts but also excelled in the DGCA exams. Highly recommended!',
        imgSrc: '/images/testimonial/user2.png',
        rating: 4,
      },
      {
        name: 'Capt. Nisha Singh',
        profession: 'Cadet Pilot, Air India',
        comment:
          'Thanks to Altitude’s expert guidance, I was selected into the Air India Cadet Program. Their pre-type rating support and mock interviews were spot-on.',
        imgSrc: '/images/testimonial/user3.png',
        rating: 4,
      },
      {
        name: 'Kunal Sharma',
        profession: 'CPL Graduate (South Africa Batch)',
        comment:
          'I completed my CPL flying in South Africa through Altitude. Their global tie-up made the entire visa, documentation, and training process smooth and stress-free.',
        imgSrc: '/images/testimonial/user4.png',
        rating: 5,
      },
      {
        name: 'Anjali Sharma',
        profession: 'Conversion Pilot',
        comment:
          'After training abroad, Altitude helped me with license conversion, DGCA subjects, and all paperwork. The support was consistent throughout.',
        imgSrc: '/images/testimonial/user5.png',
        rating: 5,
      },
      {
        name: 'Rohit Bhardwaj',
        profession: 'Airline Prep Student',
        comment:
          'The Airline Preparation program was outstanding. I aced my interview with a leading Indian airline thanks to Altitude’s coaching and mock sessions.',
        imgSrc: '/images/testimonial/user6.png',
        rating: 3,
      },
    ],
  }
}

  
  
  export const getBeliefsFallback = (data?: Partial<BeliefsSectionData>): BeliefsSectionData => ({
    id: data?.id ?? "",
    missionTitle: data?.missionTitle ?? "Default Mission Title",
    missionText: data?.missionText ?? "",
    missionPoints: data?.missionPoints ?? [],
    visionTitle: data?.visionTitle ?? "Default Vision Title",
    visionText: data?.visionText ?? "",
    visionPoints: data?.visionPoints ?? [],
  });
  
  export const getWeWorkFallback = (
    data?: Partial<WeWorkSectionData>
  ): WeWorkSectionData => ({
    id: data?.id ?? "",
    title: data?.title ?? "Our Team",
    subtitle: data?.subtitle ?? "Meet the experts",
    mentors: (data?.mentors ?? [
      {
          profession: 'DGCA Certified Instructor',
          name: 'Capt. R. Sharma',
          imgSrc: '/images/wework/avatar4.svg',
      },
      {
          profession: 'Airline Pilot (A320)',
          name: 'Capt. Anjali Mehra',
          imgSrc: '/images/wework/avatar2.svg',
      },
      {
          profession: 'ATPL Faculty',
          name: 'Mr. Vikram Chauhan',
          imgSrc: '/images/wework/avatar3.svg',
      },
      {
          profession: 'Air Navigation Expert',
          name: 'Capt. Nidhi Singh',
          imgSrc: '/images/wework/avatar4.svg',
      },
      {
          profession: 'RTR (A) Trainer',
          name: 'Mr. Rajat Kapoor',
          imgSrc: '/images/wework/avatar5.svg',
      },
      {
          profession: 'Type Rating Instructor',
          name: 'Capt. Jatin Joshi',
          imgSrc: '/images/wework/avatar6.svg',
      },
  ]).map((m) => ({
      ...m,
      imgSrc:
        m.imgSrc && m.imgSrc.trim().length > 0
          ? m.imgSrc
          : `/images/wework/${m.id}.png`,
    })),
  });
// =============================
// Fallback for componentMap
// =============================
export function getFAQFallback(): FAQProps {
  return {
    title: 'Frequently Asked\nQuestions',
    subtitle: 'Answers to common questions about our training programs.',
    bgClassName: 'bg-faqblue',
    items: [
      {
        question: 'What is the eligibility for joining CPL Ground Classes?',
        answer:
          'You must have completed 10+2 with Physics and Math. We also guide you through the DGCA documentation process if needed.',
      },
      {
        question: 'Do you offer online classes for pilot training?',
        answer:
          'Yes, we offer both online and offline CPL Ground Classes so you can choose the mode of learning that best suits you.',
      },
      {
        question: 'Can I complete my flying training outside India?',
        answer:
          'Yes, we have global tie-ups with flying schools in South Africa, Canada, USA, and Europe. We also help with visa and documentation.',
      },
      {
        question: 'What is the selection rate for cadet programs?',
        answer:
          'We have a strong track record across IndiGo and Air India cadet selections, supported by focused prep and mock assessments.',
      },
      {
        question: 'Do you provide assistance with license conversion?',
        answer:
          'Yes, we offer dedicated conversion support for pilots trained abroad, including DGCA subjects and documentation.',
      },
    ],
  }
}
