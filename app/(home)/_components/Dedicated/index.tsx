import Image from "next/image";

const Dedicated = () => {
    return (
        <div className="relative">
            <Image
                src="/images/dedicated/spiral.svg"
                height={272}
                width={686}
                alt="spiral-design"
                className="absolute left-0 hidden lg:block -z-10"
            />

            <div className="mx-auto max-w-7xl px-4 sm:py-20 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 my-16 gap-12">

                    {/* COLUMN-1 */}
                    <div className="rounded-3xl">
                        <Image
                            src="/images/dedicated/new.png"
                            alt="aviation-instructor"
                            width={500}
                            height={650}
                            className="mx-auto md:mx-0 rounded-3xl"
                        />
                    </div>

                    {/* COLUMN-2 */}
                    <div className="relative">
                        <Image
                            src="/images/dedicated/comma.svg"
                            alt="comma-image"
                            width={200}
                            height={106}
                            className="absolute comma-pos hidden lg:block"
                        />
                        <h2 className="text-4xl lg:text-6xl pt-4 font-bold sm:leading-tight mt-5 text-center lg:text-start">
                            Why Choose Us?
                        </h2>
                        <p className="font-medium text-lightblack text-2xl mt-4 text-center lg:text-start">
                            Your Success, Our Commitment!
                        </p>

                        <ul className="list-disc text-2xl text-lightblack font-medium mt-6 space-y-3 pl-5 lg:pl-8 text-start">
                            <li>Over 15 years of expertise</li>
                            <li>Learn from the industry veterans</li>
                            <li>ISO-certified pilot training institute</li>
                            <li>Comprehensive curriculum from ab-initio to airline training</li>
                            <li>Global flying training options</li>
                            <li>State-of-the-art facilities</li>
                            <li>90–95% pass rate in DGCA examination papers</li>
                            <li>95% pass rate in the last IndiGo written exam</li>
                            <li>100% selection rate for airline cadets</li>
                            <li>No extra fees for reattempts</li>
                        </ul>

                        <div className="flex flex-col sm:flex-row gap-6 mt-10 text-center lg:text-start">
                            <button className="text-xl font-semibold text-white bg-btnblue py-4 px-10 rounded-full hover:bg-hoblue">
                                Explore More
                            </button>
                            <button className="text-xl font-semibold text-btnblue border border-btnblue py-4 px-10 rounded-full hover:bg-btnblue hover:text-white">
                                Download Brochure
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dedicated;
