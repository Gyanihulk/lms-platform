// app/(home)/_components/Banner/index.tsx
import Image from "next/image";
import Link from "next/link";

export type BannerProps = {
    title: string;
    subtitle?: string;
    imageSrc: string;
    buttonText?: string;
    ctaLink?: string | null;
    theme?: "light" | "dark" | string;
};

export default function Banner({
    title,
    subtitle,
    imageSrc,
    buttonText = "Explore Courses",
    ctaLink = "/courses",
    theme = "light",
}: BannerProps) {
    const isDark = theme === "dark";

    return (
        <div className="mx-auto max-w-7xl my-10 sm:py-10 px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
                {/* COLUMN-1 */}
                <div className="mx-auto sm:mx-0">
                    <div className="py-3 text-center lg:text-start">
                        <span className="text-blue bg-lightblue hover:shadow-xl text-sm md:text-lg font-bold px-6 py-1 rounded-3xl tracking-wider">
                            AVIATION TRAINING
                        </span>
                    </div>

                    <div className="py-3 text-center lg:text-start">
                        <h1
                            className={`text-5xl lg:text-6xl font-bold leading-tight ${isDark ? "text-white" : "text-darkpurple"
                                }`}
                        >
                            {title}
                            {subtitle ? (
                                <>
                                    <br />
                                    <span >
                                        {subtitle}
                                    </span>
                                </>
                            ) : null}
                        </h1>
                    </div>

                    {buttonText ? (
                        <div className="my-7 text-center lg:text-start">
                            <Link href={ctaLink ?? "#"}>
                                <span className="inline-block text-sm md:text-xl font-semibold hover:shadow-xl bg-blue text-white py-3 px-6 md:py-5 md:px-14 rounded-full hover:bg-hoblue">
                                    {buttonText}
                                </span>
                            </Link>
                        </div>
                    ) : null}
                </div>

                {/* COLUMN-2 */}
                <div className="invisible lg:visible justify-center items-center">
                <div className="rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105 bg-white">
                   <Image
                            src={imageSrc}
                            alt="pilot-training-banner"
                            width={700}
                            height={642}
                            className="rounded-2xl"
                            priority
                        />
  </div>
                </div>
            </div>
        </div>
    );
}
