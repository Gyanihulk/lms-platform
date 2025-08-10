// types for a HighlightSection's props
export type HighlightData = {
  title: string
  description: string[]
  buttonText: string
  imageSrc: string
  imageWidth?: number
  imageHeight?: number
  reverse?: boolean
}

// typed fallback object
export const fallbackHighlights: {
  first: HighlightData
  second: HighlightData
} = {
  first: {
    title: "At Altitude Aviation Academy, we build aviation success stories!",
    description: [
      "With 15 years of expertise and a team of experienced pilots leading the way, we provide comprehensive ground classes, CPL flying training, type rating, and airline prep programs. Our students dominate the skies with top-tier results, global flying opportunities, and seamless support throughout their journey.",
      "With a <strong>90–95% pass rate</strong> in CPL Ground Classes and a <strong>100% selection rate</strong> in the IndiGo Cadet Program, our track record speaks for itself. When you train with us, you don’t just earn a license — <strong>you earn a career.</strong>"
    ],
    buttonText: "Explore Our Programs",
    imageSrc: "/images/digital/new.png",
    reverse: false
  },
  second: {
    title: "Our Global Tie-Ups — Your Gateway to the World!",
    description: [
      "Topflyer collaborates with top flight schools globally, offering students the flexibility to complete their flying hours amidst world-class facilities and full-flight simulators.",
      "Choose the best fit for your training needs, and we’ll handle the visa, medicals, and documentation—no headaches, just flying!",
      "<strong>Training Locations:</strong> India, USA, Canada, South Africa, Europe"
    ],
    buttonText: "Training Programmes",
    imageSrc: "/images/digital/global1.png",
    imageWidth: 800,
    imageHeight: 800,
    reverse: true
  }
}
