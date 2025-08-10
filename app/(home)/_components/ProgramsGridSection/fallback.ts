// types/programsGrid.ts
export type ProgramItem = {
  title: string
  description: string
  iconPath: string
  iconAlt: string
}

export type ProgramsGridData = {
  sectionTitle: string
  subtitle: string
  images: string[]
  programs: ProgramItem[]
}


export const programsGrid: ProgramsGridData ={
    "sectionTitle": "Your Flight Plan to the Skies Starts Here!",
    "subtitle": "Our Pilot Training Programs",
    "images": [
      "/images/programs/main1.png",
      "/images/programs/main2.png",
      "/images/programs/main3.png"
    ],
    "programs": [
      {
        "title": "CPL Ground Classes (Online/Offline)",
        "description": "Ace your DGCA exams with:\n• Personalised doubt-clearing sessions\n• Updated DGCA question banks\n• Top-rated instructors & real exam strategies",
        "iconPath": "/images/programs/1.png",
        "iconAlt": "cpl-ground"
      },
      {
        "title": "CPL Flying Training",
        "description": "Fly globally with:\n• World-class airspaces & modern fleets\n• Globally accepted training standards\n• Visa, medicals & paperwork handled for you",
        "iconPath": "/images/programs/2.png",
        "iconAlt": "cpl-flying"
      },    {
        "title": "Airline Prep",
        "description": "Get airline-ready with:\n• Mock interviews & psychometrics\n• Personalized coaching\n• Technical & HR round prep",
        "iconPath": "/images/programs/9.png",
        "iconAlt": "airline-prep"
      },
      {
        "title": "IndiGo Cadet Pilot Program",
        "description": "Launch your IndiGo career with:\n• 100% selection rate success\n• Tailored prep from written tests to interviews\n• Exclusive cadet grooming & support",
        "iconPath": "/images/programs/3.png",
        "iconAlt": "indigo-cadet"
      },
      {
        "title": "Air India Cadet Pilot Program",
        "description": "Join India’s flag carrier with:\n• Training to Air India’s exact standards\n• Guidance even after selection\n• Full support till your first flight",
        "iconPath": "/images/programs/4.png",
        "iconAlt": "airindia-cadet"
      },
      {
        "title": "Type Rating (Airbus A320 & Boeing B737)",
        "description": "Boost your airline prospects with:\n• Top-rated Type Rating certifications\n• Real-world simulator practice\n• Flexible slots & easy payment plans",
        "iconPath": "/images/programs/5.png",
        "iconAlt": "type-rating"
      },
      {
        "title": "Pre/Post Type Rating Classes",
        "description": "Bridge the gap with:\n• Focused pre-Type Rating prep\n• Essential post-Type Rating support\n• Smooth transition to line flying",
        "iconPath": "/images/programs/6.png",
        "iconAlt": "prepost-type"
      },
      {
        "title": "ATPL (Airline Transport Pilot License)",
        "description": "Take your career higher with:\n• Expert-led ATPL ground classes\n• Complete exam preparation\n• Guidance to become a Captain",
        "iconPath": "/images/programs/7.png",
        "iconAlt": "atpl"
      },
      {
        "title": "Conversion Flying",
        "description": "Fly in India with ease:\n• Smooth foreign license conversion\n• DGCA paperwork handled\n• Fast-track approvals",
        "iconPath": "/images/programs/8.png",
        "iconAlt": "conversion"
      },
  
      {
        "title": "Graduation & Post-Graduation (Distance Mode)",
        "description": "Secure your future with:\n• Recognized degree alongside flying\n• Flexible distant learning\n• Career options beyond aviation",
        "iconPath": "/images/programs/10.png",
        "iconAlt": "graduation"
      }
    ]
  }
  