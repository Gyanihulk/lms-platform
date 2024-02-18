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
const sliderVariants = {
  initial: { x: 0 },
  animate: {
    x: "0%",
    transition: {
      repeat: Infinity,
      repeatType: "loop" as const, 
      duration: 2,
    },
  },
};



const Hero = () => {
  const router = useRouter();
  const { scrollToProject } = useScroll1();
  return (
    <div className="hero">
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
        variants={sliderVariants}
        initial="initial"
        animate="animate"
      >
        Writer Content Creator Influencer
      </motion.div>
      <div className="imageContainer1">

</div>
      <div className="imageContainer">
        <motion.img src="/hero.png" alt="" />
      </div>
    </div>
  );
};

export default Hero;
