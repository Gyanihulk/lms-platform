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
                        At Altitude Aviation Academy, our mission is to deliver world-class aviation training grounded in professionalism, precision, and passion. Led by seasoned airline pilots and industry experts, we aim to equip our students with:
                        <ul className="list-disc pl-5 mt-4">
                            <li>A deep understanding of aviation theory and practical skills</li>
                            <li>A strong commitment to safety and standard operating procedures</li>
                            <li>The confidence and competence to perform in high-pressure global aviation environments</li>
                        </ul>
                        <br />
                        We are dedicated to supporting each student&apos;s journey from the classroom to the cockpit, shaping not just pilots—but future leaders in aviation.
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
                        <span className="text-blue">To be India&apos;s leading</span> aviation training institute.
                    </h3>
                    <h5 className="text-darkgray pt-2 mb-5 text-center sm:text-start">
                        Our vision is to become a globally respected aviation training institution—a center of excellence that sets the benchmark in quality, discipline, and results.
                        <ul className="list-disc pl-5 mt-4">
                            <li>Be the first choice for aspiring pilots seeking quality and integrity</li>
                            <li>Consistently deliver high pass rates and industry-ready graduates</li>
                            <li>Build a network of airline-ready professionals who represent India&apos;s aviation excellence on the world stage</li>
                            <li>Innovate and adapt with changing aviation technologies and global standards</li>
                        </ul>
                        <br />
                        Through continuous improvement and dedication, we envision a future where Altitude-trained pilots fly the skies with pride, professionalism, and purpose.
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
