import Image from "next/image";

const Banner = () => {
    return (
        <div className='mx-auto max-w-7xl my-10 sm:py-10 px-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 items-center gap-10'>

                {/* COLUMN-1 */}
                <div className="mx-auto sm:mx-0">
                    <div className='py-3 text-center lg:text-start'>
                        <button className='text-blue bg-lightblue hover:shadow-xl text-sm md:text-lg font-bold px-6 py-1 rounded-3xl tracking-wider hover:text-white hover:bg-black'>
                            AVIATION TRAINING
                        </button>
                    </div>
                    <div className="py-3 text-center lg:text-start">
                        <h1 className='text-5xl lg:text-6xl font-bold text-darkpurple leading-tight'>
                            Empowering Future Pilots <br /> with Knowledge and Skill
                        </h1>
                    </div>
                    <div className='my-7 text-center lg:text-start'>
                        <button className='text-sm md:text-xl font-semibold hover:shadow-xl bg-blue text-white py-3 px-6 md:py-5 md:px-14 rounded-full hover:bg-hoblue'>
                            Explore Courses
                        </button>
                    </div>
                </div>

                {/* COLUMN-2 */}
                <div className='hidden lg:flex justify-center items-center'>
                    <div className="rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105 bg-white">
                        <Image
                            src="/images/banner/banner.png" // replace with your uploaded version if needed
                            alt="pilot-training-banner"
                            width={700}
                            height={642}
                            className="rounded-2xl"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Banner;
