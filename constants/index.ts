import { RxGithubLogo, RxLinkedinLogo } from "react-icons/rx";

export const SKILL_DATA = [
  {
    skill_name: "AWS",
    image: "AWS.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Azure DevOps",
    image: "Azure Devops.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Docker",
    image: "docker.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Kafka",
    image: "kafka.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Cloudflare",
    image: "Cloudflare.png",
    width: 70,
    height: 70,
  },
] as const;

export const SOCIALS = [
  {
    name: "GitHub",
    icon: RxGithubLogo,
    link: "https://github.com/Gyanihulk/",
  },
  {
    name: "LinkedIn",
    icon: RxLinkedinLogo,
    link: "https://www.linkedin.com/in/adamya-kumar-5947751ba/",
  },
] as const;

export const FRONTEND_SKILL = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Redux",
    image: "redux.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js",
    image: "next.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Material UI",
    image: "mui.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React Query",
    image: "reactquery.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Framer Motion",
    image: "framer.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Stripe",
    image: "stripe.png",
    width: 80,
    height: 80,
  },
] as const;

export const BACKEND_SKILL = [
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Express.js",
    image: "express.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "GraphQL",
    image: "graphql.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Prisma",
    image: "prisma.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
  {
    skill_name: "PostgreSQL",
    image: "postgresql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "MySQL",
    image: "mysql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Firebase",
    image: "firebase.png",
    width: 55,
    height: 55,
  },
] as const;

export const FULLSTACK_SKILL = [
  {
    skill_name: "React Native",
    image: "reactnative.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Flutter",
    image: "Flutter.png",
    width: 70,
    height: 70,
  },
] as const;

export const OTHER_SKILL = [
  {
    skill_name: "PHP",
    image: "new-php-logo.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "C#",
    image: "C# (CSharp).png",
    width: 70,
    height: 70,
  },
] as const;

export const PROJECT_CATEGORIES = [
  "All",
  "AI",
  "SaaS",
  "Mobile",
  "3D / Game",
  "Automation",
] as const;

export const PROJECTS = [
  {
    title: "PROFLY AI - Adaptive Aviation Exam Platform",
    description:
    "In production for over a year with 30+ active students. Built a full RAG pipeline (Node.js, Python/FastAPI, MongoDB, Pinecone, OpenAI GPT-4) with a custom PDF parser, subtopic-scoped retrieval, and a source-bound system prompt so answers stay grounded in real aviation material instead of hallucinating — plus a custom eval harness to iterate on prompt quality.",
    images: [
      "/projects/profly/slideA.png",
      "/projects/profly/slideB.png",
      "/projects/profly/slideC.png",
    ],
    link: "https://proflyai.com/",
    categories: ["AI", "SaaS"],
  },

  {
    title: "Eclipse iOS Productivity App",
    description:
    "Live on the App Store with real subscription pricing. A native iOS app (Swift, Node.js/TypeScript backend, MongoDB, AWS) built on Apple's Screen Time framework for scheduled grayscale and app limits — plus a custom reliability system that detects whether scheduled automations are actually firing on time, not just whether the feature exists, and a Python scraper for gathering supporting data.",
    images: ["/projects/eclipse/1.png", "/projects/eclipse/2.png"],
    link: "https://eclipsesystemsinc.com/",
    categories: ["Mobile", "SaaS"],
  },
  {
    title: "Adhian Gurus AI Tutoring Platform",
    description:
    "Live two-sided marketplace connecting verified tutors with students across CBSE, ICSE, IB, and state boards. Built on Node.js/Express, MongoDB, and a Next.js frontend with GPT-4-powered AI session summaries so parents get topic coverage and homework notes after every class — plus a founding-tutor program with 0% commission for year one.",
    images: ["/projects/adhian/1.png", "/projects/adhian/2.png"],
    link: "https://adhiangurus.com/",
    categories: ["AI", "SaaS"],
  },

  {
    title: "Cow Donation Mobile App",
    description:
    "Flutter mobile app with UPI payments, recurring donations, and reminder notifications.",
    images: [
      "/projects/dhenu/slideA.png",
      "/projects/dhenu/slideB.png",
      "/projects/dhenu/slideC.png",
    ],
    link: "https://www.dhenudharmafoundation.org/",
    categories: ["Mobile"],
  },
  {
    title: "Unity Game Development",
    description:
    "GTA-style open-world and Tekken-style 3D fighting games with multiplayer systems, animations, and physics.",
    images: ["/projects/unity/1.png", "/projects/unity/2.png", "/projects/unity/3.png", "/projects/unity/4.png", "/projects/unity/5.png", "/projects/unity/6.png", "/projects/unity/7.png"],
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7283183592887799809/",
    categories: ["3D / Game"],
  },
  {
    title: "Multiplayer Game Development",
    description:
    "Real-time 3D multiplayer game built with Three.js, Socket.io, and React Three Fiber for interactive online play.",
    images: [
      "/projects/gamer3f/slideA.png",
      "/projects/gamer3f/slideB.png",
      "/projects/gamer3f/slideC.png",
    ],
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7233898679965728768/",
    categories: ["3D / Game"],
  },
  {
    title: "Three.js Car Stunt Experience",
    description:
    "Interactive Three.js car experience where users can drive freely through the environment, explore the scene, and perform jumps and stunt-style moves in real time.",
    images: [
      "/projects/car/1.png",
      "/projects/car/2.png",
      "/projects/car/3.png",
    ],
    link: "https://adamyaportfolio.netlify.app/",
    categories: ["3D / Game"],
  },
  {
    title: "3D Home Architecture Collaboration",
    description:
    "Real-time collaboration platform built with React Three Fiber and WebSockets where users join as Sims-style avatars to plan home architecture, organize spaces, and work together inside a shared 3D environment.",
    images: ["/projects/3fiber.png"],
    link: "#",
    categories: ["3D / Game"],
  },
  {
    title: "Altitude Aviation Academy LMS",
    description:
    "Aviation-focused LMS with an integrated CMS and Udemy-style course delivery, including structured modules, assessments, and progress tracking for pilot training.",
    images: ["/projects/aviation1.png","/projects/altitute/2.png","/projects/altitute/3.png"],
    link: "https://www.altitudeaviationacademy.in/",
    categories: ["SaaS"],
  },
  {
    title: "Aircamp — Pilot Aptitude & Hand-Eye Coordination Test",
    description:
    "Full-stack coordination/motor-skills assessment platform for aviation academy candidates, run on real joystick and rudder pedal hardware. FastAPI + Postgres backend with a Firebase-authenticated candidate station app and an admin app (React/Vite) for roster import, level/package assignment, scoring, PDF reports, and an audit-logged dashboard.",
    images: [
      "/projects/aircamp/joystick-rudder.mp4",
      "/projects/aircamp/candidate-test.mp4",
      "/projects/aircamp/dashboard.mp4",
    ],
    link: "#",
    categories: ["SaaS", "Automation", "3D / Game"],
  },
  {
    title: "Sanaraa — Oncology Nutrition Support",
    description:
    "Platform connecting cancer patients with a dedicated oncology nutritionist. A clinical intake generates a free WYBODY summary from the patient's cancer type, treatment phase, and blood markers, then drives a personalised, kitchen-realistic nutrition plan alongside caregiver and community support.",
    images: ["/projects/sanaraa/1.jpg", "/projects/sanaraa/2.jpg"],
    link: "https://sanaraa.com/",
    categories: ["SaaS"],
  },
  {
    title: "Trading Algorithm: Nifty Options System",
    description:
      "Automated trading system using Node.js and the Zerodha API for real-time Nifty options analysis and strategy execution.",
    images: [
      "/projects/trade/slideA.png",
      "/projects/trade/slideB.png",
      "/projects/trade/slideA.png",
    ],
    link: "/courses/79434cf6-e39c-4257-a908-8b578bcbfb27",
    categories: ["Automation"],
  },
] as const;

export const FOOTER_DATA = [
  {
    title: "Profiles",
    data: [
      {
        name: "Portfolio",
        icon: null,
        link: "#",
      },
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com/Gyanihulk",
      },
      {
        name: "LinkedIn",
        icon: RxLinkedinLogo,
        link: "https://www.linkedin.com/in/adamya-kumar-5947751ba/",
      },
    ],
  },
  {
    title: "Contact",
    data: [
      {
        name: "Email",
        icon: null,
        link: "mailto:kumar.adamya2000@gmail.com",
      },
      {
        name: "Phone",
        icon: null,
        link: "tel:+917017368626",
      },
    ],
  },
  {
    title: "About",
    data: [
      {
        name: "About me",
        icon: null,
        link: "#about-me",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "Experience",
    link: "/#experience",
  },
  {
    title: "Skills",
    link: "/#skills",
  },
  {
    title: "Projects",
    link: "/#projects",
  },
  {
    title: "About me",
    link: "/#about-me",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
  // "Workshop" removed from the nav on purpose. The /workshop route still works
  // and can be linked directly from wherever it's being promoted — it just
  // isn't advertised on the surface recruiters and interviewers land on.
] as const;

export const LINKS = {
  sourceCode: "https://github.com",
};
