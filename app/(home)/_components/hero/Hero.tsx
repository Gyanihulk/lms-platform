"use client"
import {  useScroll1 } from "@/context/ScrollContext";
import "./hero.scss";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useContext, useRef } from "react";

const textVariants = {
  initial: {
    x: -500,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
  scrollButton: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};

const imageVariant = {
  initial: {
    x: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  }
};
const scrollVariants = {
  animate: {
    x: [0, -4150], 
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 50, // Adjust duration for speed control
        ease: "linear",
      },
    },
  },
};

const Hero = () => {
  const router = useRouter();
  const { scrollToProject } = useScroll1();
  return (
    <div className="hero px-10 ">
      <div className="wrapper">
        <motion.div
          className="textContainer"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h2 variants={textVariants}>Gyani Hulk</motion.h2>
          <motion.h1 variants={textVariants}>
            Full Stack Developer
          </motion.h1>
          <motion.div variants={textVariants} className="buttons">
            <motion.button variants={textVariants} onClick={()=>router.push("dashboard/search")}>
              Courses
            </motion.button>
            <motion.button onClick={scrollToProject} variants={textVariants}>Projects</motion.button>
          </motion.div>
          <motion.img
            variants={textVariants}
            animate="scrollButton"
            src="/scroll.png"
            alt=""
          />
        </motion.div>
      </div>
      <motion.div
        className="slidingTextContainer"
        variants={scrollVariants}
        initial="initial"
        animate="animate"
      >
        Content Creator | Athlete | Mentor
      </motion.div>
      
      <div className="imageContainer">
        <motion.img   variants={imageVariant}
        initial="initial"
        animate="animate" src="/hero.png" alt="" />
      </div>
    </div>
  );
};

export default Hero;
