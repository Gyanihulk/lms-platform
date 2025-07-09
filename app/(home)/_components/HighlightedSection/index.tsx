'use client';

import Image from "next/image";

interface HighlightSectionProps {
    title: string;
    description: string[];
    buttonText?: string;
    imageSrc: string;
    backgroundClass?: string;
    reverse?: boolean;
    imageWidth?: number;
    imageHeight?: number;
}


const HighlightSection = ({
    title,
    description,
    buttonText,
    imageSrc,
    backgroundClass = "bg-blue bg-digital",
    reverse = false,
    imageWidth,
    imageHeight
}: HighlightSectionProps) => {
    return (
        <div className="mx-2">
            <div className={`mx-auto max-w-7xl px- pb-20 lg:px-8 rounded-3xl relative overflow-hidden ${backgroundClass}`}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 ${reverse ? "lg:flex-row-reverse" : ""}`}>
                    
                    {/* TEXT COLUMN */}
                    <div className={`pr-5 pt-24 ${reverse ? "lg:pr-6" : "lg:pl-6"}`}>
                        <h3 className="text-4xl sm:text-6xl font-bold text-white mb-8 leading-snug text-center lg:text-start">
                            {title}
                        </h3>
                        {description.map((para, i) => (
                            <p key={i} className="text-white text-lg mb-6 text-center lg:text-start" dangerouslySetInnerHTML={{ __html: para }} />
                        ))}
                        {buttonText && (
                            <div className="text-center lg:text-start">
                                <button className="text-xl font-semibold text-white bg-btnblue py-4 px-12 hover:bg-hoblue rounded-full">
                                    {buttonText}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* IMAGE COLUMN */}
                    <div className="relative">
                        <div className="lg:absolute right-0">
                            <Image
                                src={imageSrc}
                                alt="highlight image"
                                width={imageWidth ?? 600}
                                height={imageHeight ?? 500}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HighlightSection;
