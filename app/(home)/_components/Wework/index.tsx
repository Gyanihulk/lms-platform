"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

// react-slick must be client-only
const Slider = dynamic(() => import("react-slick"), { ssr: false });

export interface Mentor {
  id: string;
  name: string;
  profession: string;
  imgSrc?: string | null;
  linkedin?: string | null;
}

export interface WeWorkProps {
  title?: string;
  subtitle?: string;
  mentors: Mentor[];
}

const Wework: React.FC<WeWorkProps> = ({ title, subtitle, mentors = [] }) => {
  const items = mentors.map((m) => ({
    ...m,
    imgSrc:
      m.imgSrc && m.imgSrc.trim().length > 0
        ? m.imgSrc
        : `/images/wework/${m.id}.png`, // fallback to /public/images/wework/{id}.png
  }));

  const slidesToShow = Math.min(5, Math.max(1, items.length));

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: Math.min(3, items.length) } },
      { breakpoint: 800, settings: { slidesToShow: Math.min(2, items.length) } },
      { breakpoint: 450, settings: { slidesToShow: 1 } },
    ],
  } as const;

  return (
    <div className="bg-wework py-32">
      <div className="mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8">
        <div className="text-center">
          <h3 className="text-4xl sm:text-6xl font-bold text-black my-2">
            {title ?? "Meet Our Instructors & Mentors"}
          </h3>
          <h3 className="text-4xl sm:text-6xl font-bold text-black opacity-50 lg:mr-48 my-2">
            {subtitle ?? "Industry-trained. Airline-ready."}
          </h3>
          <h3 className="text-4xl sm:text-6xl font-bold text-black opacity-25 lg:-mr-32 my-2">
            Committed to your aviation journey.
          </h3>
        </div>
      </div>

      <Slider {...settings}>
        {items.map((m) => (
          <div key={m.id}>
            <div className="bg-white m-3 py-14 my-10 text-center shadow-xl rounded-3xl">
              <div className="relative">
                <Image
                  src={m.imgSrc!}
                  alt={m.name}
                  width={182}
                  height={182}
                  className="inline-block m-auto rounded-full object-cover"
                />
                {m.linkedin ? (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inline-block position-linkedin"
                    aria-label={`${m.name} on LinkedIn`}
                  >
                    <Image
                      src="/images/wework/linkedin.svg"
                      alt="LinkedIn Icon"
                      width={120}
                      height={120}
                    />
                  </a>
                ) : (
                  <Image
                    src="/images/wework/linkedin.svg"
                    alt="LinkedIn Icon"
                    width={120}
                    height={120}
                    className="absolute inline-block position-linkedin opacity-40"
                  />
                )}
              </div>

              <h4 className="text-4xl font-bold pt-14">{m.name}</h4>
              <h3 className="text-2xl font-normal pt-4 pb-2 opacity-50">
                {m.profession}
              </h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Wework;
