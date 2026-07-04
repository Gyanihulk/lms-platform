import Link from "next/link";
import { Calendar, Clock, MapPin, Users, Wifi, BookOpen, Briefcase, Star } from "lucide-react";

const sessions = [
  {
    number: "01",
    title: "Navigating the 2026 Tech Landscape & Resume Strategy",
    duration: "60 mins",
    description:
      "A live, honest view of what the current job market actually demands — both from a corporate MNC lens and a freelance client lens. Covers real resume mistakes, how to stand out in AI-era hiring, and which skills actually get interviews.",
    outcomes: [
      "Actionable resume checklist you can apply immediately",
      "Clarity on which skills (cloud, AI, full-stack) are worth your time",
      "Corporate vs. freelance path decoded for fresh graduates",
    ],
  },
  {
    number: "02",
    title: "Industry Apprenticeship Launch & Live Project Briefing",
    duration: "60 mins",
    description:
      "Adamya reveals the real-world freelance project he is currently working on — the tech stack, day-to-day responsibilities, and what working on it actually looks like. Opens structured applications for students who want to be selected as apprentices.",
    outcomes: [
      "Work on a live, paying project — not a dummy assignment",
      "Build a real portfolio piece to show in interviews",
      "Direct mentorship from someone bridging corporate & freelance worlds",
    ],
  },
];

const highlights = [
  { icon: Users, label: "Open to all years", sub: "1st year to final year" },
  { icon: Wifi, label: "Online first", sub: "Offline if registrations are strong" },
  { icon: BookOpen, label: "Zero cost", sub: "Completely free for students" },
  { icon: Briefcase, label: "Real project", sub: "Not a classroom exercise" },
];

export default function WorkshopPage() {
  return (
    <div className="min-h-screen bg-[#030014] text-white pt-24 pb-20 px-4">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-purple-900/40 border border-purple-500/30 rounded-full px-4 py-1.5 text-sm text-purple-300 mb-6">
          <Star className="w-4 h-4" />
          Free Online Workshop Series • July 2026
        </div>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6 leading-tight">
          Job Guidance &amp;<br />Industry Apprenticeship
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          A 2-part live workshop series by <span className="text-purple-400 font-semibold">Adamya Kumar</span> — Senior Engineer at Hero MotoCorp &amp; Freelance Consultant — bridging the gap between campus and industry.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/workshop/register"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-all hover:scale-105 shadow-lg shadow-purple-500/30"
          >
            Register Now — It's Free
          </Link>
          <a
            href="#sessions"
            className="border border-purple-500/40 hover:border-purple-400 text-gray-300 hover:text-white font-semibold px-8 py-3 rounded-full transition-all"
          >
            See What's Covered
          </a>
        </div>
      </div>

      {/* Highlights */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
        {highlights.map(({ icon: Icon, label, sub }) => (
          <div
            key={label}
            className="bg-[#0a0a1a] border border-purple-800/30 rounded-2xl p-4 text-center"
          >
            <Icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-white font-semibold text-sm">{label}</p>
            <p className="text-gray-400 text-xs mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Sessions */}
      <div id="sessions" className="max-w-4xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          What&apos;s Covered
        </h2>
        <div className="space-y-8">
          {sessions.map((session) => (
            <div
              key={session.number}
              className="bg-[#0a0a1a] border border-purple-800/30 rounded-2xl p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl font-black text-purple-800 leading-none">
                  {session.number}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-white">{session.title}</h3>
                    <span className="flex items-center gap-1 text-xs bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full">
                      <Clock className="w-3 h-3" /> {session.duration}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">{session.description}</p>
                  <ul className="space-y-2">
                    {session.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-purple-400 mt-0.5">✓</span>
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Format Note */}
      <div className="max-w-4xl mx-auto mb-20">
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-700/30 rounded-2xl p-6 md:p-8">
          <div className="flex items-start gap-3 mb-4">
            <MapPin className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
            <h3 className="text-lg font-bold text-white">Online First — Offline if Interest is Strong</h3>
          </div>
          <p className="text-gray-300 mb-4">
            Sessions are planned <span className="text-white font-medium">online by default</span> via Google Meet so every student can join regardless of location. However, if registrations are strong, we are open to shifting to an <span className="text-white font-medium">in-person session on campus</span>.
          </p>
          <p className="text-gray-400 text-sm">
            The registration form asks for your preference — your vote helps us decide. Either way, you&apos;ll be notified with the final details before the event.
          </p>
        </div>
      </div>

      {/* About Adamya */}
      <div className="max-w-4xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">About the Mentor</h2>
        <div className="bg-[#0a0a1a] border border-purple-800/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-black text-white shrink-0">
            AK
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Adamya Kumar</h3>
            <p className="text-purple-400 text-sm mb-3">Senior Engineer · Hero MotoCorp &amp; Freelance Consultant · BTECH CSE 2019</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              With experience spanning both a large corporate MNC and independent freelance projects, Adamya bridges the gap between what universities teach and what the industry actually needs. He is offering this workshop to give back to his alma mater and find a few motivated students to work on a live project under his direct mentorship.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
        <p className="text-gray-400 mb-8">
          Registration takes 2 minutes. Seats are limited — the best students will be selected for the apprenticeship project.
        </p>
        <Link
          href="/workshop/register"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-purple-500/30 text-lg"
        >
          Register for Free
        </Link>
        <p className="text-gray-500 text-sm mt-4">
          Questions? Reach out at{" "}
          <a href="mailto:kumar.adamya2000@gmail.com" className="text-purple-400 hover:underline">
            kumar.adamya2000@gmail.com
          </a>{" "}
          or{" "}
          <a href="tel:+917017368626" className="text-purple-400 hover:underline">
            +91-7017368626
          </a>
        </p>
      </div>
    </div>
  );
}
