"use client";

import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import { personalInfo } from "@/data/portfolio";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-white/[0.05] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} {personalInfo.name}</p>
            <p className="text-xs text-slate-600 mt-1">Crafted with Next.js · TypeScript · Tailwind CSS · Framer Motion</p>
          </div>
          <div className="flex items-center gap-3">
            {[
              { icon: FiGithub, href: personalInfo.github, label: "GitHub" },
              { icon: FiLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
              { icon: FiMail, href: `mailto:${personalInfo.email}`, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-white/[0.08] text-slate-600 hover:text-cyan-400 hover:border-cyan-400/20 hover:bg-cyan-400/5 flex items-center justify-center transition-all duration-300" aria-label={label}>
                <Icon size={14} />
              </a>
            ))}
            <button onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/10 flex items-center justify-center transition-all duration-300 ml-2" aria-label="Back to top">
              <FiArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
