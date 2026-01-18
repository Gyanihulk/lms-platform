"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  images: readonly string[];
  title: string;
  description: string;
  link: string;
};

export const ProjectCard = ({
  images,
  title,
  description,
  link,
}: ProjectCardProps) => {
  const slides = useMemo(() => {
    return images.length > 0 ? images : [];
  }, [images]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const activeSrc = slides[activeIndex] ?? "";

  return (
    <Link
      href={link}
      target="_blank"
      rel="noreferrer noopener"
      className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61]"
    >
      {activeSrc ? (
        <Image
          src={activeSrc}
          alt={title}
          width={1000}
          height={1000}
          className="w-full object-contain"
        />
      ) : (
        <div className="w-full aspect-[4/3] bg-black/30" />
      )}

      <div className="relative p-4">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <p className="mt-2 text-gray-300">{description}</p>
      </div>
    </Link>
  );
};
