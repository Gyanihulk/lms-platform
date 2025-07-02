import Image from "next/image";

const Team = () => {
    return (
        <div className='mx-auto max-w-7xl sm:py-4 lg:px-8 my-32'>
            <h2 className="text-4xl sm:text-6xl font-bold text-center">
                Meet the Experts Behind <br /> Your Aviation Success
            </h2>
            <h3 className="text-2xl font-medium text-center pt-10 opacity-60">
                Our team of airline pilots, DGCA-certified instructors, and aviation mentors are here <br />
                to guide you from student pilot to professional aviator.
            </h3>
            <div className='grid grid-cols-1 my-16'>
                <Image 
                    src="/images/team/team1.png" 
                    alt="Altitude Aviation Academy team" 
                    height={684} 
                    width={1296} 
                    className="rounded-2xl shadow-xl"
                />
            </div>
        </div>
    )
}

export default Team;
