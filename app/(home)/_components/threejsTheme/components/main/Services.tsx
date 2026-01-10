"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { slideInFromTop } from "@/lib/motion";

export const Services = () => {
  return (
    <div       className="
    flex flex-row relative items-center justify-center
    min-h-screen w-full h-full
    -translate-y-[200px]
    z-30
  ">


      <div className="flex flex-col items-center justify-center translate-y-[-50px] absolute z-[20] w-auto h-auto">
        <div className="flex flex-col items-center group cursor-pointer w-auto h-auto">

               <div className="Welcome-box px-[15px] py-[4px] z-[20] border my-[16px] border-[#7042F88B] opacity-[0.9]">

        </div>
        </div>
      </div>

      {/* Your Info Panel (keeps layout, adds content) */}
      <div className="absolute z-[30] top-[140px] w-[92%] max-w-[1100px] px-4">
        <div className="backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="text-gray-200 text-base md:text-lg leading-relaxed">
              I focus on building scalable and optimized applications.
            </p>

            {/* Optional small image like your old room.png */}
            <motion.img
              src="/room.png"
              alt="room"
              className="w-[120px] md:w-[160px] h-auto opacity-90"
              whileHover={{ scale: 1.03 }}
            />
          </div>

          <div className="my-6 h-px w-full bg-white/10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Box 1 */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition">
              <h2 className="text-gray-100 font-semibold text-lg mb-2">
                Tools / Languages
              </h2>
              <ul className="text-gray-300 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>
                  Proficient in a wide range of programming languages and tools
                  including JavaScript, TypeScript, PHP &amp; Java.
                </li>
                <li>
                  MERN stack, Next.js, GraphQL, Redux, Context API, Sanity,
                  Firebase, GSAP, Sass, Stripe, React Native, Three Fiber.
                </li>
              </ul>
            </div>

            {/* Box 2 */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition">
              <h2 className="text-gray-100 font-semibold text-lg mb-2">
                Cloud &amp; Databases
              </h2>
              <ul className="text-gray-300 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>Experienced with cloud services such as AWS and Azure.</li>
                <li>
                  DevOps with Linux/Ubuntu Server, DNS, Apache Server, Docker,
                  Netlify, Vercel.
                </li>
                <li>
                  Database management using MongoDB, Postgres, and MySQL.
                </li>
              </ul>
            </div>

            {/* Box 3 */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition">
              <h2 className="text-gray-100 font-semibold text-lg mb-2">
                Additional Information
              </h2>
              <ul className="text-gray-300 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>National Gold Medalist - Delhi Horse Show 2011, 2013</li>
                <li>Dada Saheb Phalke Award 2013 in Filmmaking</li>
                <li>
                  Enthusiastic in Figma, Adobe Photoshop, After Effects, Blender,
                  Unity, Unreal Engine, Illustrator and CorelDraw.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div className="absolute z-[20] bottom-[10px] px-[5px]">
        <div className="cursive text-[20px] font-medium text-center text-gray-300">
          Building scalable, optimized &amp; secure experiences.
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
