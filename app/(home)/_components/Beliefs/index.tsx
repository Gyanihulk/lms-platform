interface BeliefsSectionData {
    missionTitle: string
    missionText: string
    missionPoints: string[]
    visionTitle: string
    visionText: string
    visionPoints: string[]
  }
  
  export default function Beliefs({
    missionTitle,
    missionText,
    missionPoints,
    visionTitle,
    visionText,
    visionPoints
  }: BeliefsSectionData) {

    return (
      <div className='mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8 rounded-3xl'>
        <div className='grid grid-cols-1 lg:grid-cols-2 my-16 mx-5 gap-5'>
  
          {/* MISSION SECTION */}
          <div className="bg-darkblue pt-12 px-10 sm:px-24 pb-52 md:pb-70 rounded-3xl">
            <h2 className="text-lg font-normal text-white tracking-widest mb-5 text-center sm:text-start">
              OUR MISSION
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold text-white leading-snug mb-5 text-center sm:text-start">
              {missionTitle}
            </h3>
            <h5 className="text-offwhite pt-2 mb-5 text-center sm:text-start">
              {missionText}
              {missionPoints?.length > 0 && (
                <ul className="list-disc pl-5 mt-4">
                  {missionPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}
            </h5>
            <div className="text-center sm:text-start">
              <button className="text-xl py-5 px-14 mt-5 font-semibold text-white rounded-full bg-blue border border-blue hover:bg-hoblue">
                Explore Courses
              </button>
            </div>
          </div>
  
          {/* VISION SECTION */}
          <div className="bg-lightgrey pt-12 px-10 sm:px-24 pb-52 md:pb-70 rounded-3xl">
            <h2 className="text-lg font-normal text-blue tracking-widest mb-5 text-center sm:text-start">
              OUR VISION
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold text-black leading-snug mb-5 text-center sm:text-start">
              {visionTitle}
            </h3>
            <h5 className="text-darkgray pt-2 mb-5 text-center sm:text-start">
              {visionText}
              {visionPoints?.length > 0 && (
                <ul className="list-disc pl-5 mt-4">
                  {visionPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}
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
  