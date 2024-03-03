"use client";
import React, { forwardRef, useRef } from "react";
import "./portfolio.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useScroll1 } from "@/context/ScrollContext";
import Link from "next/link";

const items = [
  {
    id: 5,
    title: "Hotel Booking SaaS",
    img: "/projects/hotel.png",
    demo:"https://chardhamstays.com/",
    desc: "A comprehensive SaaS solution for hotel management, streamlining operations from booking to billing. Designed for hospitality businesses seeking digital transformation.",
  },
  {
    id: 4,
    title: "News SaaS for Reporters",
    img: "/projects/news.png",
    demo:"https://bhagwasanatantimes.com/",
    desc: "Next.js and Sanity.io powered SaaS, providing reporters a dynamic platform to publish and manage content. Features real-time updates and customizable layouts.",
  },
  {
    id: 1,
    title: "Learning Management System",
    demo:"/dashboard/search",
    img: "/projects/lms.png",
    desc: "A Next.js-based platform emulating Udemy, enabling users to create and consume a wide array of educational content. Streamlined for efficient learning and teaching.",
  },
  {
    id: 2,
    title: "Three Fiber PortFolio",
    img: "/projects/3d.png",
    demo:"https://ubiquitous-palmier-e3a771.netlify.app/",
    desc: "Integrates AI with educational tools using Next.js, Replicate, and Firebase, enhancing teaching with virtual assistants. Aimed at improving learning experiences.",
  },
  // {
  //   id: 6,
  //   title: "Nifty Algo trading",
  //   img: "https://images.pexels.com/photos/6894528/pexels-photo-6894528.jpeg",
  //   demo:"/courses/79434cf6-e39c-4257-a908-8b578bcbfb27/chapters/16f57195-4d16-4005-917c-c6c5c6693dad",
  //   desc: "A trading platform simulation with real-time data, built with Express and WebSockets. Offers insights and tools for effective stock market analysis and Automatic Trading on the strategy.",
  // },
  // {
  //   id: 2,
  //   title: "AI Companions for Teaching/Assistance",
  //   img: "https://images.pexels.com/photos/18023772/pexels-photo-18023772.jpeg",
  //   desc: "Integrates AI with educational tools using Next.js, Replicate, and Firebase, enhancing teaching with virtual assistants. Aimed at improving learning experiences.",
  // },

  {
    id: 3,
    title: "Office 3d Simulation",
    img: "/projects/3fiber.png",
    demo:"https://www.linkedin.com/posts/adamya-kumar-5947751ba_quickwins-gamedev-passionproject-activity-7129718092099702784-QxH0?utm_source=share&utm_medium=member_desktop",
    desc: "An immersive 3D simulation game inspired by 'The Sims', built with Three.js and React Fiber. Offers dynamic gameplay, customizable characters, and interactive environments.",
  },

 
];

const Single = ({ item }: any) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  const projectRef = useRef(null);
  return (
    <section>
      <div className="container p-10">
        <div className="wrapper">
          <div className="imageContainer" ref={ref}>
            <img src={item.img} alt="" />
          </div>
          <motion.div className="textContainer" style={{ y }}>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
            
            <button><Link
              href={item?.demo?item.demo:"/"}
           
            >
             
              See Demo
            </Link></button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { projectRef } = useScroll1();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="portfolio" ref={ref}>
      <div className="progress" ref={projectRef}>
        <h1>Featured Works</h1>
        <motion.div style={{ scaleX }} className="progressBar"></motion.div>
      </div>
      {items.map((item) => (
        <Single item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Portfolio;
