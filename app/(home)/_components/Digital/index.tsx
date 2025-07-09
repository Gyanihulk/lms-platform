import Image from "next/image";

const Digital = () => {
    return (
        <div className="mx-2">
            <div className='mx-auto max-w-7xl px-4 pb-20 lg:px-8 bg-digital rounded-3xl bg-blue relative overflow-hidden'>
                <div className='grid grid-cols- lg:grid-cols-2'>

                    {/* COLUMN-1 */}
                    <div className="pt-24 lg:pl-24">
                        {/* <h3 className="text-lg font-normal text-white mb-5 tracking-widest text-center lg:text-start">
                            WHERE DREAMS TAKE FLIGHT!
                        </h3> */}
                        <h3 className="text-4xl sm:text-6xl font-bold text-white mb-8 leading-snug text-center lg:text-start">
                            At Altitude Aviation Academy, <br /> we build aviation success stories!
                        </h3>
                        <p className="text-white text-lg mb-6 text-center lg:text-start">
                            With 15 years of expertise and a team of experienced pilots leading the way,
                            we provide comprehensive ground classes, CPL flying training, type rating, and airline prep programs.
                            Our students dominate the skies with top-tier results, global flying opportunities,
                            and seamless support throughout their journey.
                        </p>
                        <p className="text-white text-lg mb-10 text-center lg:text-start">
                            With a <strong>90–95% pass rate</strong> in CPL Ground Classes and a <strong>100% selection rate</strong>
                            in the IndiGo Cadet Program, our track record speaks for itself. When you train with us,
                            you don’t just earn a license — <strong>you earn a career.</strong>
                        </p>
                        <div className="text-center lg:text-start">
                            <button className="text-xl font-semibold text-white bg-btnblue py-4 px-12 hover:bg-hoblue rounded-full">
                                Explore Our Programs
                            </button>
                        </div>
                    </div>

                    {/* COLUMN-2 */}
                    <div>
                        <div className="lg:absolute right-0">
                            <Image
                                src="/images/digital/new.png" // replace with pilot-themed illustration if needed
                                alt="pilot illustration"
                                width={600}
                                height={500}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Digital;
