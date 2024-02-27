"use client";
import React, { useEffect, useRef, useState } from "react";
import "./parallax.scss";
import { motion, useScroll, useTransform } from "framer-motion";
interface ParallaxProps {
  type: "services" | "portfolio" | "video";
}

const Parallax: React.FC<ParallaxProps> = ({ type }) => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const[playing,setPlaying]=useState(false)
  const playVideo = async () => {
    if (videoRef.current) {
      try {
        console.log("play video run ");
        await videoRef.current.play();
        setPlaying(playing)
      } catch (err) {
        console.error("Auto-play with sound was prevented:", err);
        // Handle the failure to autoplay here, maybe mute the video and play or show a play button to the user
      }
    }
  };
  useEffect(() => {
    
  }, [playing]);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "500%"]);
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      className="parallax"
      ref={ref}
      style={{
        background:
          type === "services"
            ? "linear-gradient(180deg, #111132, #0c0c1d)"
            : "linear-gradient(180deg, #111132, #505064)",
      }}
    >
      <motion.h1 style={{ y: yText }}>
        {type === "video" ? "Who am I ?" : "What I have Done?"}
      </motion.h1>
     {/* <motion.div className="mountains"></motion.div> */}
  
      <motion.div className="planets" style={{ y: yBg }}>
        {type === "video" ? (
          <>
            {/* <video
              id="introvideo"
              autoPlay
              loop
              playsInline // This can help on mobile browsers
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              onClick={playVideo} // Attempt to play when metadata is loaded
              ref={videoRef}
            >
              <source src="/intro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video> */}

            
            <iframe src="https://www.youtube.com/embed/XVoqSTgBD0w" className="planets" allow="autoplay" ></iframe>
          </>
        ) : (
          
          <div
            style={{
              backgroundImage: `url(${
                type === "services" ? "/planets.png" : "/sun.png"
              })`,
              width: "100%",
              height: "100%",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        )}
      </motion.div>
      <motion.div style={{ x: yBg }} className="stars"></motion.div>
    </div>
  );
};

export default Parallax;
