import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export const WorkshopBanner = () => {
  return (
    <section className="w-full px-4 py-10 flex justify-center">
      <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-purple-500/30 bg-gradient-to-r from-purple-900/40 via-[#0a0a1a] to-blue-900/30 backdrop-blur-md px-6 py-8 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-purple-900/20">
        {/* Glow */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Left */}
        <div className="relative flex items-start gap-4">
          <div className="bg-purple-600/20 border border-purple-500/30 rounded-xl p-2.5 shrink-0">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold bg-purple-600 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                Now Open
              </span>
              <span className="text-xs text-gray-400">Free · July 2026</span>
            </div>
            <h3 className="text-white font-bold text-lg md:text-xl leading-tight">
              Job Guidance &amp; Industry Apprenticeship Workshop
            </h3>
            <p className="text-gray-400 text-sm mt-1 max-w-lg">
              2-part live session on cracking the 2026 tech market, resume strategy, and a real-world apprenticeship opportunity for motivated students.
            </p>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/workshop"
          className="relative shrink-0 flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-full transition-all hover:scale-105 shadow-md shadow-purple-500/30 whitespace-nowrap"
        >
          Register Free
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
