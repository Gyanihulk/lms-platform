"use client"
import Slider from "react-slick";
import React, { Component } from "react";
import Image from "next/image";

// CAROUSEL DATA

interface DataType {
    profession: string;
    name: string;
    imgSrc: string;
}

const postData: DataType[] = [
    {
        profession: 'DGCA Certified Instructor',
        name: 'Capt. R. Sharma',
        imgSrc: '/images/wework/avatar4.svg',
    },
    {
        profession: 'Airline Pilot (A320)',
        name: 'Capt. Anjali Mehra',
        imgSrc: '/images/wework/avatar2.svg',
    },
    {
        profession: 'ATPL Faculty',
        name: 'Mr. Vikram Chauhan',
        imgSrc: '/images/wework/avatar3.svg',
    },
    {
        profession: 'Air Navigation Expert',
        name: 'Capt. Nidhi Singh',
        imgSrc: '/images/wework/avatar4.svg',
    },
    {
        profession: 'RTR (A) Trainer',
        name: 'Mr. Rajat Kapoor',
        imgSrc: '/images/wework/avatar5.svg',
    },
    {
        profession: 'Type Rating Instructor',
        name: 'Capt. Jatin Joshi',
        imgSrc: '/images/wework/avatar6.svg',
    },
]

// CAROUSEL COMPONENT

export default class MultipleItems extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            speed: 4000,
            autoplaySpeed: 2000,
            cssEase: "linear",
            responsive: [
                { breakpoint: 1200, settings: { slidesToShow: 3 } },
                { breakpoint: 800, settings: { slidesToShow: 2 } },
                { breakpoint: 450, settings: { slidesToShow: 1 } }
            ]
        };

        return (
            <div className="bg-wework py-32">
                <div className='mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8'>
                    <div className="text-center">
                        <h3 className="text-4xl sm:text-6xl font-bold text-black my-2">Meet Our Instructors & Mentors</h3>
                        <h3 className="text-4xl sm:text-6xl font-bold text-black opacity-50 lg:mr-48 my-2">Industry-trained. Airline-ready.</h3>
                        <h3 className="text-4xl sm:text-6xl font-bold text-black opacity-25 lg:-mr-32 my-2">Committed to your aviation journey.</h3>
                    </div>
                </div>

                <Slider {...settings}>
                    {postData.map((items, i) => (
                        <div key={i}>
                            <div className='bg-white m-3 py-14 my-10 text-center shadow-xl rounded-3xl'>
                                <div className='relative'>
                                    <Image src={items.imgSrc} alt={items.name} width={182} height={182} className="inline-block m-auto rounded-full" />
                                    <Image src={'/images/wework/linkedin.svg'} alt="LinkedIn Icon" width={120} height={120} className="absolute inline-block position-linkedin" />
                                </div>
                                <h4 className='text-4xl font-bold pt-14'>{items.name}</h4>
                                <h3 className='text-2xl font-normal pt-4 pb-2 opacity-50'>{items.profession}</h3>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        );
    }
}
