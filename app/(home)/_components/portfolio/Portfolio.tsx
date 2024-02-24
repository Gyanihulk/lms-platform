"use client"
import React, { forwardRef ,useRef} from 'react';
import "./portfolio.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useScroll1 } from '@/context/ScrollContext';

const items =[
  {
    "id": 1,
    "title": "Learning Management System",
    "img": "https://images.pexels.com/photos/18073372/pexels-photo-18073372.jpeg",
    "desc": "A Next.js-based platform emulating Udemy, enabling users to create and consume a wide array of educational content. Streamlined for efficient learning and teaching."
  },
  {
    "id": 2,
    "title": "AI Companions for Teaching/Assistance",
    "img": "https://images.pexels.com/photos/18023772/pexels-photo-18023772.jpeg",
    "desc": "Integrates AI with educational tools using Next.js, Replicate, and Firebase, enhancing teaching with virtual assistants. Aimed at improving learning experiences."
  },
  
  {
    "id": 3,
    "title": "Office 3d Simulation",
    "img": "https://images.pexels.com/photos/18023772/pexels-photo-18023772.jpeg",
    "desc": "An immersive 3D simulation game inspired by 'The Sims', built with Three.js and React Fiber. Offers dynamic gameplay, customizable characters, and interactive environments."
  },
  {
    "id": 4,
    "title": "News SaaS for Reporters",
    "img": "https://images.pexels.com/photos/18540208/pexels-photo-18540208.jpeg",
    "desc": "Next.js and Sanity.io powered SaaS, providing reporters a dynamic platform to publish and manage content. Features real-time updates and customizable layouts."
  },
  {
    "id": 5,
    "title": "Hotel Booking SaaS",
    "img": "https://images.pexels.com/photos/6894528/pexels-photo-6894528.jpeg",
    "desc": "A comprehensive SaaS solution for hotel management, streamlining operations from booking to billing. Designed for hospitality businesses seeking digital transformation."
  },
  {
    "id": 6,
    "title": "Nifty Algo trading",
    "img": "https://images.pexels.com/photos/6894528/pexels-photo-6894528.jpeg",
    "desc": "A trading platform simulation with real-time data, built with Express and WebSockets. Offers insights and tools for effective stock market analysis and Automatic Trading on the strategy."
  },
]


const Single = ({ item }:any) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  const projectRef = useRef(null);
  return (
    <section >
      <div className="container p-10">
        <div className="wrapper">
          <div className="imageContainer" ref={ref}>
            <img src={item.img} alt="" />
          </div>
          <motion.div className="textContainer" style={{y}}>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
            <button>See Demo</button>
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
    <div className="portfolio" ref={ref} >
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
