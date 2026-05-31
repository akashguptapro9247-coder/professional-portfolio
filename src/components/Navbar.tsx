"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { personalInfo, navLinks } from "@/data/portfolio";
import { FiGithub, FiDownload, FiMenu, FiX } from "react-icons/fi";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = navLinks
        .filter((l) => l.href.startsWith("/#"))
        .map((l) => l.href.slice(2));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return activeSection === href.slice(2);
    return false;
  };

  const isHomeHash = (href: string) => href.startsWith("/#");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-0"
          : "py-2"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
          scrolled
            ? "mx-4 sm:mx-6 lg:mx-8 mt-4 rounded-2xl bg-[rgba(5,8,22,0.7)] backdrop-blur-2xl border border-[rgba(255,255,255,0.06)] shadow-xl shadow-black/20"
            : "mx-0 bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between h-16 lg:h-18 px-0 sm:px-2">
          <div className="w-10" />

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`relative px-3 py-2 text-sm transition-colors rounded-lg ${
                  isActive(link.href)
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-cyan-400 transition-colors duration-300"
            >
              <FiGithub size={18} />
            </a>
            <MagneticButton
              href={personalInfo.resume}
              download="Akash_Gupta_Resume.pdf"
              variant="secondary"
              className="text-xs px-4 py-2"
            >
              <FiDownload size={13} />
              Resume
            </MagneticButton>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-slate-300 hover:text-white transition-colors"
            aria-label="Open menu"
          >
            <FiMenu size={22} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="absolute top-0 right-0 h-full w-72 max-w-[85vw] bg-[#050816] border-l border-white/5 p-6"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="text-lg font-bold gradient-text" style={{ fontFamily: "var(--font-syne)" }}>✦</span>
                <button
                  onClick={() => setOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <FiX size={22} />
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 text-base text-slate-300 hover:text-white hover:bg-white/[0.03] rounded-xl transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-4">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-cyan-400 transition-colors"
                >
                  <FiGithub size={19} />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-cyan-400 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="19" height="19">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-slate-500 hover:text-cyan-400 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="19" height="19">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
