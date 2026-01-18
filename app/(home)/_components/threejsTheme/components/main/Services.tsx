"use client";

export const Services = () => {
  return (
    <section
      id="about-me"
      data-autoscroll-delay="10000"
      className="flex flex-col relative items-center justify-center min-h-screen w-full h-full z-30 py-20"
    >
      <div className="absolute w-auto h-auto top-0 z-[5] pt-10">
        <div className="text-[40px] font-medium text-center text-gray-200">
          About Adamya Kumar
        </div>
        <div className="text-center text-gray-400 text-sm mt-2">
          Profile summary, skills, and experience
        </div>
      </div>

      <div className="relative z-[30] w-[92%] max-w-[1100px] px-4 mt-16">
        <div className="backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl p-6 md:p-8 shadow-lg space-y-6">
          <div className="space-y-2">
            <h2 className="text-gray-100 font-semibold text-2xl">
              Profile Summary
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Backend Engineer and Software Developer with strong expertise in
              web technologies, DevOps, and cloud infrastructure. Experienced
              in designing scalable systems, automating CI/CD pipelines, and
              leading cross-functional teams to deliver robust applications.
              Skilled in full-stack development, API design, and performance
              optimization with a focus on clean architecture and continuous
              improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition">
              <h3 className="text-gray-100 font-semibold text-lg mb-3">
                Skill Set
              </h3>
              <ul className="text-gray-300 text-sm leading-relaxed space-y-2">
                <li>
                  <span className="text-gray-100 font-medium">Languages:</span>{" "}
                  JavaScript, TypeScript, PHP, C#, Dart, Bash
                </li>
                <li>
                  <span className="text-gray-100 font-medium">Front-End:</span>{" "}
                  React, Next.js, React Native, Flutter, Redux Toolkit, Context
                  API, Bootstrap, Tailwind, Material Design, CSS3, HTML5
                </li>
                <li>
                  <span className="text-gray-100 font-medium">Back-End:</span>{" "}
                  Node.js, Express, Nest.js, Laravel, Kafka, GraphQL,
                  Microservices, Prisma, Socket.io
                </li>
                <li>
                  <span className="text-gray-100 font-medium">Databases:</span>{" "}
                  PostgreSQL, MySQL, MongoDB, Redis
                </li>
                <li>
                  <span className="text-gray-100 font-medium">
                    Cloud &amp; DevOps:
                  </span>{" "}
                  AWS (EC2, S3, Lambda, API Gateway, Load Balancers, Target
                  Groups, CloudWatch), Azure, Vercel, Docker, Jenkins, GitHub
                  Actions, CI/CD Pipelines, Infrastructure Management
                </li>
                <li>
                  <span className="text-gray-100 font-medium">
                    Game &amp; 3D:
                  </span>{" "}
                  Unity (C#), Blender, React Three Fiber, Three.js
                </li>
                <li>
                  <span className="text-gray-100 font-medium">
                    Additional:
                  </span>{" "}
                  Firebase, Nginx, Apache, Shell Scripting, Software Design
                  Patterns, Agile Development
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition">
              <h3 className="text-gray-100 font-semibold text-lg mb-3">
                Contact &amp; Personal Info
              </h3>
              <ul className="text-gray-300 text-sm leading-relaxed space-y-2">
                <li>
                  <span className="text-gray-100 font-medium">Email:</span>{" "}
                  kumar.adamya2000@gmail.com
                </li>
                <li>
                  <span className="text-gray-100 font-medium">Phone:</span>{" "}
                  +91 7017368626
                </li>
                <li>
                  <span className="text-gray-100 font-medium">
                    Citizenship:
                  </span>{" "}
                  Indian
                </li>
                <li>
                  <span className="text-gray-100 font-medium">Languages:</span>{" "}
                  English, Hindi
                </li>
                <li>
                  <span className="text-gray-100 font-medium">Hobbies:</span>{" "}
                  Horse Riding, Game Development, Reading Tech Blogs, Music
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition space-y-4">
            <h3 className="text-gray-100 font-semibold text-lg">Experience</h3>
            <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
              <div>
                <p className="text-gray-100 font-medium">
                  HERO MOTOCORP | Backend Engineer
                </p>
                <p className="text-gray-400 text-xs">
                  Gurugram | Nov 2024 - Present
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>
                    Built and customized a CMS in Strapi to centralize website
                    content management and improve editorial workflows.
                  </li>
                  <li>
                    Designed and maintained Jenkins pipelines to automate CI/CD
                    workflows, increasing release velocity and reliability.
                  </li>
                  <li>
                    Managed AWS infrastructure including Target Groups and API
                    Gateways for scalable and resilient services.
                  </li>
                  <li>
                    Implemented Kafka and Redis for inter-service communication,
                    reducing latency by 20%.
                  </li>
                  <li>
                    Created and maintained self-published npm packages to
                    reduce redundant code and improve development efficiency.
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-gray-100 font-medium">
                  APPFOSTER | Software Engineer II
                </p>
                <p className="text-gray-400 text-xs">
                  Noida, India | Apr 2022 - Nov 2024
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>
                    Engineered a Chrome automation integration for chats with
                    LinkedIn using ChatGPT, Node.js, Next.js, and Express,
                    improving user productivity by 35%.
                  </li>
                  <li>
                    Automated Microsoft subscription billing processes using
                    Azure APIs, Node.js, and Express, cutting manual efforts by
                    40% and improving onboarding efficiency by 20%.
                  </li>
                  <li>
                    Built and deployed a GraphQL + Next.js social media app
                    with 40% better real-time interaction.
                  </li>
                  <li>
                    Revamped a PHP-based marketplace, improving engagement by
                    20% and transactions by 15%.
                  </li>
                  <li>
                    Led a Laravel + Nuxt.js HR SaaS app, reducing HR process
                    time by 25%.
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-gray-100 font-medium">
                  CAPLINE SERVICES | Associate
                </p>
                <p className="text-gray-400 text-xs">
                  Noida, India | Aug 2021 - Apr 2022
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>
                    Streamlined insurance data collection via 10+ APIs,
                    improving accuracy by 30%.
                  </li>
                  <li>
                    Resolved SaaS issues in a cross-functional team, achieving
                    99.9% uptime and 15% fewer support tickets.
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-gray-100 font-medium">
                  ITDA | Training Desk Analyst
                </p>
                <p className="text-gray-400 text-xs">
                  Dehradun | Jan 2021 - May 2021
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>
                    Trained 20+ officials in E-Office systems, transitioning
                    1000+ legacy files to digital format.
                  </li>
                  <li>
                    Developed Python-based visualization tools, cutting file
                    processing time by 50% and paper use by 40%.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition space-y-3">
              <h3 className="text-gray-100 font-semibold text-lg">Education</h3>
              <div className="text-gray-300 text-sm leading-relaxed">
                <p className="text-gray-100 font-medium">
                  Masters in Business Administration (Finance + Human Resource)
                </p>
                <p className="text-gray-400 text-xs">
                  Gurukul Kangri, Haridwar | May 2019 - Apr 2021
                </p>
              </div>
              <div className="text-gray-300 text-sm leading-relaxed">
                <p className="text-gray-100 font-medium">
                  Bachelors of Technology (Computer Science)
                </p>
                <p className="text-gray-400 text-xs">
                  Gurukul Kangri | Jun 2015 - Apr 2019
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition space-y-3">
              <h3 className="text-gray-100 font-semibold text-lg">
                Recognitions
              </h3>
              <ul className="text-gray-300 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>Gold Medalist at Delhi Horse Show (2011, 2013)</li>
                <li>Recipient of Dada Saheb Phalke Film Award (2013)</li>
                <li>
                  Research on Home Automation published in International
                  Journal (Dec 2019)
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition">
            <h3 className="text-gray-100 font-semibold text-lg mb-3">
              Personal Learning Projects
            </h3>
            <ul className="text-gray-300 text-sm leading-relaxed list-disc pl-5 space-y-2">
              <li>
                Trading Algorithm: Nifty options system using Node.js and
                Zerodha API for real-time strategy execution.
              </li>
              <li>
                Adaptive LMS: SaaS-based LMS with RAG pipelines, vector search,
                personalization, and analytics.
              </li>
              <li>
                Electron.js LinkedIn Automation Suite: Cross-platform tool for
                comments, follow-ups, and connection management.
              </li>
              <li>
                Cow Donation Mobile App (iOS/Android): Flutter app with UPI
                payments, recurring donations, and reminders.
              </li>
              <li>
                Unity Game Development: GTA-style open-world and Tekken-style
                3D fighting games with multiplayer and physics.
              </li>
              <li>
                Multiplayer Game Development: Real-time 3D multiplayer game
                using Three.js, Socket.io, and React Three Fiber.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="absolute z-[20] bottom-[10px] px-[5px]">
        <div className="cursive text-[20px] font-medium text-center text-gray-300">
          Building scalable, optimized, and secure experiences.
        </div>
      </div>

      <div className="w-full flex items-start justify-center absolute">
        <video
          loop
          muted
          autoPlay
          playsInline
          preload="false"
          className="w-full h-auto"
        >
          <source src="/videos/encryption-bg.webm" type="video/webm" />
        </video>
      </div>
    </section>
  );
};
