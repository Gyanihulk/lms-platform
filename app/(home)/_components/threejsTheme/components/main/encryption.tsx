"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { slideInFromTop } from "@/lib/motion";

export const Encryption = () => {
  return (
    <div className="flex flex-row relative items-center justify-center min-h-screen w-full h-full -z-20">
  {/* Top Title */}
  <div className="absolute w-auto h-auto top-0 z-[5] pt-10">
        <motion.div
          variants={slideInFromTop}
          initial="hidden"
          animate="visible"
          className="text-[40px] font-medium text-center text-gray-200"
        >
          Live{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            &
          </span>{" "}
          Learn
        </motion.div>
        <div className="text-center text-gray-400 text-sm mt-2">
          Practice &amp; Master
        </div>
      </div>

      <div className="flex flex-col items-center justify-center translate-y-[-50px] absolute z-[20] w-auto h-auto">
        <div className="flex flex-col items-center group cursor-pointer w-auto h-auto">
          <Image
            src="/lock-top.png"
            alt="Lock top"
            width={50}
            height={50}
            className="translate-y-5 transition-all duration-200 group-hover:translate-y-11"
          />
          <Image
            src="/lock-main.png"
            alt="Lock main"
            width={70}
            height={70}
            className="z-10"
          />
               <div className="Welcome-box px-[15px] py-[4px] z-[20] border my-[16px] border-[#7042F88B] opacity-[0.9]">
          <h1 className="Welcome-text text-[62px]">
            विद्या धनम् सर्वधन प्रधानम्
          </h1>
        </div>
        </div>
      </div>

      <div className="w-full flex items-start justify-center absolute">
        <video
          loop
          muted
          autoPlay
          playsInline
          preload="false"
          className="w-full h-auto"
        >
          <source src="/videos/encryption-bg.webm" type="video/webm" />
        </video>
      </div>
      
    </div>
  );
};
