"use client"
import Slider from "react-slick";
import React, { Component } from "react";
import { StarIcon } from '@heroicons/react/24/solid';
import Image from "next/image";

// CAROUSEL DATA

interface DataType {
    profession: string;
    comment: string;
    imgSrc: string;
    name: string;
}

const postData: DataType[] = [
    {
      name: "Capt. Aditi Verma",
      profession: 'First Officer, IndiGo Airlines',
      comment: 'Altitude Aviation Academy gave me the confidence and training I needed to clear the IndiGo Cadet Program. The mentoring from airline pilots made all the difference.',
      imgSrc: '/images/testimonial/user1.svg',
    },
    {
      name: "Siddharth Mehra",
      profession: 'ATPL Student',
      comment: 'The ground classes were top-notch! The instructors ensured we not only understood the concepts but also excelled in the DGCA exams. Highly recommended!',
      imgSrc: '/images/testimonial/user2.svg',
    },
    {
      name: "Capt. Nisha Singh",
      profession: 'Cadet Pilot, Air India',
      comment: 'Thanks to Altitude’s expert guidance, I was selected into the Air India Cadet Program. Their pre-type rating support and mock interviews were spot-on.',
      imgSrc: '/images/testimonial/user3.svg',
    },
    {
      name: "Kunal Sharma",
      profession: 'CPL Graduate (South Africa Batch)',
      comment: 'I completed my CPL flying in South Africa through Altitude. Their global tie-up made the entire visa, documentation, and training process smooth and stress-free.',
      imgSrc: '/images/testimonial/user4.svg',
    },
    {
      name: "Divya Raj",
      profession: 'Conversion Pilot',
      comment: 'After training abroad, Altitude helped me with license conversion, DGCA subjects, and all paperwork. The support was consistent throughout.',
      imgSrc: '/images/testimonial/user5.svg',
    },
    {
      name: "Rohit Bhardwaj",
      profession: 'Airline Prep Student',
      comment: 'The Airline Preparation program was outstanding. I aced my interview with a leading Indian airline thanks to Altitude’s coaching and mock sessions.',
      imgSrc: '/images/testimonial/user6.svg',
    }
  ];
  

// CAROUSEL SETTINGS


export default class MultipleItems extends Component {

    render() {
        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: 3,
            // centerMode: true,
            slidesToScroll: 2,
            arrows: false,
            autoplay: false,
            speed: 500,
            autoplaySpeed: 2000,
            cssEase: "linear",
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 450,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                }
            ]
        };


        return (
            <div className="bg-testimonial pt-40 pb-32 lg:py-32" id="testimonial-section">
                <div className='mx-auto max-w-7xl sm:py-4 lg:px-8 '>

                    <div className="text-center">
                        <h3 className="text-4xl sm:text-6xl font-bold text-black my-3">See what others are saying.</h3>
                        <h3 className="text-4xl sm:text-6xl font-bold text-black text-opacity-50 lg:mr-48 my-4">See what others are saying.</h3>
                        <h3 className="text-4xl sm:text-6xl font-bold text-black text-opacity-25 lg:-mr-32 my-4">See what others are saying.</h3>
                    </div>


                    <Slider {...settings}>
                        {postData.map((items, i) => (
                            <div key={i} className="relative">
                                <div className='bg-white test-sha m-3 p-10 my-20 rounded-3xl'>
                                    <Image src={items.imgSrc} alt={items.imgSrc} width={71} height={71} className="inline-block m-auto absolute test-pos" />
                                    <h4 className='text-base font-medium text-testColor my-4'>{items.comment}</h4>
                                    <hr style={{ color: "lightgrey" }} />
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className='text-base font-medium pt-4 pb-2'>{items.name}</h3>
                                            <h3 className='text-xs font-medium  pb-2 opacity-50'>{items.profession}</h3>
                                        </div>
                                        <div className="flex">
                                            <StarIcon width={20} className="star" />
                                            <StarIcon width={20} className="star" />
                                            <StarIcon width={20} className="star" />
                                            <StarIcon width={20} className="star" />
                                            <StarIcon width={20} className="star" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

        );
    }
}
