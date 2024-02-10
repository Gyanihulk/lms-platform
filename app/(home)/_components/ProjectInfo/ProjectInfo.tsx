"use client"
import { useRef } from "react";
import "./ProjectInfo.scss";
import { motion, useInView } from "framer-motion";

const variants = {
  initial: {
    x: -500,
    y: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};

const ProjectInfo = () => {
  const ref = useRef();

  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <motion.div
      className="services"
      variants={variants}
      initial="initial"
      // animate="animate"
      // whileInView="animate"
      ref={ref}
      animate={"animate"}
    >
      <motion.div className="textContainer" variants={variants}>
       
  
      </motion.div>
      <motion.div className="titleContainer" variants={variants}>
        <div className="title">
          <img src="/room.png" alt="" />
          <h1>
            <motion.b whileHover={{ color: "orange" }}>Live</motion.b> Learn
          </h1>
        </div>
        <div className="title">
          <h1>
            <motion.b whileHover={{ color: "orange" }}>Practice</motion.b>{" "}
            Master.
          </h1>
          <button>Demo</button>
        </div>
      </motion.div>
      <motion.div className="listContainer" variants={variants}>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>Tools/Languages</h2>
          <p>
            Proficient in a wide range of programming languages and development
            tools including Javscript, TypeScript and more, to
            build scalable and optimized applications.
            
            </p>
            <p>
            MERN stack, 
            Graph QL, Next JS, Redux, Context API ,Sanity, Firebase, 
            GSAP, Sass, Stripe, React Native ,Three Fiber
          </p>
          
          
        </motion.div>

      </motion.div>
    </motion.div>
  );
};

export default ProjectInfo;
