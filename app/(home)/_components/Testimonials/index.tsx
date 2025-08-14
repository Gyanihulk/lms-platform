'use client'

import React from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/24/solid'

// =============================
// Types
// =============================
export type TestimonialItem = {
  name: string
  profession: string
  comment: string
  imgSrc: string
  rating: number
}

export type TestimonialsProps = {
  title?: string
  echoTitle1?: string
  echoTitle2?: string
  bgClassName?: string
  slidesToShow?: 1 | 2 | 3
  autoplay?: boolean
  autoplaySpeed?: number
  speed?: number
  items?: TestimonialItem[]
  testimonials?: TestimonialItem[]
}

// =============================
// Component
// =============================
export default function Testimonials({
  title = 'See what others are saying.',
  echoTitle1 = 'See what others are saying.',
  echoTitle2 = 'See what others are saying.',
  bgClassName = 'bg-testimonial',
  slidesToShow = 3,
  autoplay = false,
  autoplaySpeed = 2000,
  speed = 500,
  items = [],
  testimonials, //
}: TestimonialsProps) {
    const finalItems = items ?? testimonials ?? [];
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow,
    slidesToScroll: slidesToShow === 3 ? 2 : 1,
    arrows: false,
    autoplay,
    speed,
    autoplaySpeed,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: Math.min(3, slidesToShow), slidesToScroll: 1 },
      },
      {
        breakpoint: 800,
        settings: { slidesToShow: Math.min(2, slidesToShow), slidesToScroll: 1 },
      },
      {
        breakpoint: 450,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  } as const

  return (
    <section className={`${bgClassName} pt-40 pb-32 lg:py-32`} id="testimonial-section">
      <div className="mx-auto max-w-7xl sm:py-4 lg:px-8">
        {/* Headings */}
        <div className="text-center">
          <h3 className="text-4xl sm:text-6xl font-bold text-black my-3">{title}</h3>
          <h3 className="text-4xl sm:text-6xl font-bold text-black/50 lg:mr-48 my-4">{echoTitle1}</h3>
          <h3 className="text-4xl sm:text-6xl font-bold text-black/25 lg:-mr-32 my-4">{echoTitle2}</h3>
        </div>

        {/* @ts-ignore – old module */}
        <Slider {...settings}>
          {finalItems.map((t, i) => (
            <div key={i} className="relative">
              <div className="bg-white shadow-sm m-3 p-10 my-20 rounded-3xl relative">
                <Image
                  src={t.imgSrc}
                  alt={`${t.name} avatar`}
                  width={71}
                  height={71}
                  className="inline-block m-auto absolute -top-9 left-1/2 -translate-x-1/2 rounded-full border border-gray-200"
                />
                <h4 className="text-base font-medium text-gray-700 my-4">{t.comment}</h4>
                <hr className="border-gray-200" />
                <div className="flex justify-between items-center pt-4">
                  <div>
                    <h3 className="text-base font-medium">{t.name}</h3>
                    <h3 className="text-xs font-medium opacity-50">{t.profession}</h3>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <StarIcon
                        key={index}
                        width={20}
                        className={index < t.rating ? 'star' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}
