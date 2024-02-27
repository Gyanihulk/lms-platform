"use client"
import { useRef } from "react";
import Contact from "./_components/contact/Contact";
import Hero from "./_components/hero/Hero";
import Parallax from "./_components/parallax/Parallax";
import Portfolio from "./_components/portfolio/Portfolio";
import Services from "./_components/services/Services";
import { ScrollProvider } from "@/context/ScrollContext";




export default function Home() {



  return (
    <ScrollProvider >


    <div id="homepage">
      {/* <Cursor /> */}
      <section id="Homepage">
        <Hero/>
      </section>
      <section id="Services">
        <Parallax type="video" />
      </section>
      <section>
        <Services />
      </section>
      <section id="Portfolio">
        <Parallax type="portfolio" />
      </section>

      <Portfolio />

   
      <section id="Contact">
        <Contact />
      </section>
    </div>
    </ScrollProvider>
  );
}
