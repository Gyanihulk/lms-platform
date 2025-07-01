const Beliefs = () => {
    return (
        <div className='mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8 rounded-3xl'>
            <div className='grid grid-cols-1 lg:grid-cols-2 my-16 mx-5 gap-5'>

                {/* MISSION SECTION */}
                <div className="bg-darkblue pt-12 px-10 sm:px-24 pb-52 md:pb-70 rounded-3xl">
                    <h2 className="text-lg font-normal text-white tracking-widest mb-5 text-center sm:text-start">OUR MISSION</h2>
                    <h3 className="text-4xl sm:text-5xl font-bold text-white leading-snug mb-5 text-center sm:text-start">
                        Training world-class pilots with professionalism and purpose.
                    </h3>
                    <h5 className="text-offwhite pt-2 mb-5 text-center sm:text-start">
                        At Altitude Aviation Academy, our mission is to provide high-quality aviation education that emphasizes strong theoretical knowledge, real-world skills, and adherence to global aviation standards.
                    </h5>
                    <div className="text-center sm:text-start">
                        <button className="text-xl py-5 px-14 mt-5 font-semibold text-white rounded-full bg-blue border border-blue hover:bg-hoblue">
                            Explore Courses
                        </button>
                    </div>
                </div>

                {/* VISION SECTION */}
                <div className="bg-lightgrey pt-12 px-10 sm:px-24 pb-52 md:pb-70 rounded-3xl">
                    <h2 className="text-lg font-normal text-blue tracking-widest mb-5 text-center sm:text-start">OUR VISION</h2>
                    <h3 className="text-4xl sm:text-5xl font-bold text-black leading-snug mb-5 text-center sm:text-start">
                        <span className="text-blue">To be India’s leading</span> aviation training institute.
                    </h3>
                    <h5 className="text-darkgray pt-2 mb-5 text-center sm:text-start">
                        We aspire to produce airline-ready professionals, uphold the highest training standards, and represent India on the global aviation stage through our disciplined and innovative learning environment.
                    </h5>
                    <div className="text-center sm:text-start">
                        <button className="text-xl py-5 px-14 mt-5 font-semibold text-white rounded-full bg-blue border border-blue hover:bg-hoblue">
                            Join Us
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Beliefs;
