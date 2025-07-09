import Image from "next/image";
import { ReactNode } from "react";

interface ProgramItem {
    icon: ReactNode;
    title: string;
    description: string;
}

interface ProgramsGridSectionProps {
    title: string;
    subtitle?: string;
    programs: ProgramItem[];
    images?: string[]; // Optional array of image paths
}

const ProgramsGridSection = ({
    title,
    subtitle,
    programs,
    images = [],
}: ProgramsGridSectionProps) => {
    const half = Math.ceil(programs.length / 2);
    const leftItems = programs.slice(0, half);
    const rightItems = programs.slice(half);

    return (
        <div className="relative">
            {/* Spiral BG */}
            <Image
                src="/images/dedicated/spiral.svg"
                height={272}
                width={686}
                alt="spiral"
                className="absolute left-0 hidden lg:block -z-10"
            />

            <div className="mx-auto max-w-7xl px-4 sm:py-20 lg:px-8">
                <h2 className="text-4xl lg:text-6xl font-bold text-center">{title}</h2>
                {subtitle && (
                    <p className="text-2xl text-lightblack font-medium text-center mt-4">
                        {subtitle}
                    </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
                    {/* LEFT Program List */}
                    <div className="space-y-10">
                        {leftItems.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4">
                                <div>
                                    <h4 className="text-xl font-bold">{item.title}</h4>
                                    <p className="text-gray-700">{item.description}</p>
                                </div>
                                <div className="text-btnblue text-4xl">{item.icon}</div>
                            </div>
                        ))}
                    </div>

                    {/* Center Image */}
                    <div className="hidden md:block">
                        {images.length > 0 && (
                            <div className="flex flex-col gap-6 items-center">
                                {images.map((img, i) => (
                                    <Image
                                        key={i}
                                        src={img}
                                        alt="program-image"
                                        width={350}
                                        height={300}
                                        className="rounded-3xl shadow-lg"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT Program List */}
                    <div className="space-y-10">
                        {rightItems.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4">
                                <div className="text-btnblue text-4xl">{item.icon}</div>
                                <div>
                                    <h4 className="text-xl font-bold">{item.title}</h4>
                                    <p className="text-gray-700">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgramsGridSection;
