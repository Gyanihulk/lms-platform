import "./videoContainer.scss";
import { motion } from "framer-motion";

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


const HeroWithVideo = () => {
  return (
    <div className="hero">
      <div className="wrapper">
      <motion.div
          className="videoContainer"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
         <motion.iframe
            src="https://www.youtube.com/embed/7BNkBoTd5mU"
            title="YouTube video player"
            className="video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></motion.iframe>
         
          
        </motion.div>

        <motion.div
          className="textContainer"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <div className="videoContainer">
          
        </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroWithVideo;
