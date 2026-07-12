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

export const PROJECTS = [
  {
    title: "PROFLY AI - Adaptive Aviation Exam Platform",
    description:
    "Built an adaptive aviation exam-prep platform for pilot students with personalized learning paths, AI-powered mock tests and evaluations, a 500+ book aviation library, and live AI assistance to accelerate training outcomes.",
    images: [
      "/projects/profly/slideA.png",
      "/projects/profly/slideB.png",
      "/projects/profly/slideC.png",
    ],
    link: "https://proflyai.com/",
  },
  {
    title: "Altitude Aviation Academy LMS",
    description:
    "Aviation-focused LMS with an integrated CMS and Udemy-style course delivery, including structured modules, assessments, and progress tracking for pilot training.",
    images: ["/projects/aviation1.png", "/projects/lms.png", "/projects/lms.png"],
    link: "https://www.altitudeaviationacademy.in/",
  },
  {
    title: "Eclipse iOS Productivity App",
    description:
    "iPhone productivity app that makes distracting apps less rewarding with scheduled app limits, automatic grayscale, pause controls, and focus insights built around environment design instead of willpower.",
    images: ["/projects/eclipse/1.png", "/projects/eclipse/2.png"],
    link: "https://eclipsesystemsinc.com/",
  },
  {
    title: "Adhian Gurus AI Tutoring Platform",
    description:
    "AI-monitored tutoring platform for India with verified tutors across CBSE, ICSE, IB, and state boards, offering online classes, home tutors, hybrid learning, and demo sessions starting at Rs 99.",
    images: ["/projects/adhian/1.png", "/projects/adhian/2.png"],
    link: "https://adhiangurus.com/",
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
  },
  {
    title: "Unity Game Development",
    description:
    "GTA-style open-world and Tekken-style 3D fighting games with multiplayer systems, animations, and physics.",
    images: ["/projects/unity/1.png", "/projects/unity/2.png", "/projects/unity/3.png", "/projects/unity/4.png", "/projects/unity/5.png", "/projects/unity/6.png", "/projects/unity/7.png"],
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7283183592887799809/",
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
  },
  {
    title: "3D Home Architecture Collaboration",
    description:
    "Real-time collaboration platform built with React Three Fiber and WebSockets where users join as Sims-style avatars to plan home architecture, organize spaces, and work together inside a shared 3D environment.",
    images: ["/projects/3fiber.png"],
    link: "#",
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
    title: "About me",
    link: "/#about-me",
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
    title: "Workshop",
    link: "/workshop",
  },
] as const;

export const LINKS = {
  sourceCode: "https://github.com",
};
