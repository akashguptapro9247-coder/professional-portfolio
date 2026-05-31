"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import MagneticButton from "@/components/ui/MagneticButton";
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiArrowRight, FiDownload } from "react-icons/fi";

function FloatingOrb({ delay = 0, size = 6, x = 0, y = 0 }: { delay?: number; size?: number; x?: number; y?: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-cyan-400/30"
      style={{ width: size, height: size, left: `${50 + x}%`, top: `${50 + y}%` }}
      animate={{ y: [0, -15, 0], x: [0, 8, 0], opacity: [0.2, 0.6, 0.2] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function TypeWriter({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && display === current) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && display === "") {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
    } else {
      timeout = setTimeout(
        () => setDisplay(deleting ? current.slice(0, display.length - 1) : current.slice(0, display.length + 1)),
        deleting ? 30 : 60
      );
    }
    return () => clearTimeout(timeout);
  }, [display, deleting, index, texts]);

  return (
    <span className="inline-flex items-center">
      <span className="gradient-text-cyan">{display}</span>
      <span className="ml-0.5 w-[3px] h-7 bg-cyan-400 animate-pulse rounded-full" />
    </span>
  );
}

export default function Hero() {
  const orbRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!orbRef.current) return;
    const rect = orbRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setMousePos({ x: (e.clientX - cx) * 0.04, y: (e.clientY - cy) * 0.04 });
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden" onMouseMove={handleMouseMove}>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT */}
          <div className="order-2 lg:order-1">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/15 rounded-full px-4 py-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                <span className="gradient-text">{personalInfo.name}</span>
              </h1>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="mb-6">
              <div className="relative inline-flex items-center gap-3">
                <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/80" style={{ fontFamily: "var(--font-syne)" }}>
                  <TypeWriter texts={personalInfo.roles} />
                </span>
              </div>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl mb-6">
              {personalInfo.bio}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 mb-8">
              <div className="flex items-center gap-2 text-sm text-slate-400 bg-white/[0.04] border border-white/[0.08] rounded-full px-4 py-1.5">
                <FiMapPin className="text-cyan-400 shrink-0" size={14} />
                <span>{personalInfo.location}</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-3 mb-10">
              <MagneticButton href="#projects" variant="primary">
                View Projects <FiArrowRight size={15} />
              </MagneticButton>
              <MagneticButton href="/resume" variant="secondary">
                <FiDownload size={15} /> Resume
              </MagneticButton>
              <MagneticButton href="#contact" variant="secondary">
                Contact
              </MagneticButton>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-5">
              <span className="text-xs text-slate-600 tracking-widest uppercase">Connect</span>
              <div className="h-px w-8 bg-white/10" />
              <div className="flex items-center gap-3">
                {[
                  { icon: FiGithub, href: personalInfo.github, label: "GitHub" },
                  { icon: FiLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
                  { icon: FiMail, href: `mailto:${personalInfo.email}`, label: "Email" },
                ].map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-white/[0.1] text-slate-500 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-all duration-300"
                    aria-label={label}>
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT - Glass Profile Orb */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 flex items-center justify-center">
            <div ref={orbRef} className="relative"
              style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)`, transition: "transform 0.1s ease-out" }}>

              <div className="absolute inset-0 -m-12 rounded-full animate-pulse-glow pointer-events-none">
                <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, rgba(0,217,255,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />
              </div>
              <div className="absolute inset-0 -m-20 rounded-full animate-float-slow pointer-events-none">
                <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, rgba(123,97,255,0.06) 0%, transparent 70%)", filter: "blur(80px)" }} />
              </div>

              {[
                { delay: 0, size: 5, x: -35, y: -35 },
                { delay: 0.5, size: 4, x: 35, y: -30 },
                { delay: 1, size: 6, x: -30, y: 35 },
                { delay: 1.5, size: 3, x: 32, y: 32 },
                { delay: 2, size: 4, x: 0, y: -40 },
                { delay: 2.5, size: 5, x: 40, y: 0 },
                { delay: 3, size: 3, x: -40, y: 5 },
              ].map((p, i) => (<FloatingOrb key={i} {...p} />))}

              <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[360px] lg:h-[360px]">
                <div className="absolute inset-0 rounded-full animate-shimmer"
                  style={{
                    background: "conic-gradient(from 0deg, transparent, rgba(0,217,255,0.15), rgba(123,97,255,0.15), transparent)",
                    padding: "2px",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }} />
                <div className="w-full h-full rounded-full overflow-hidden relative bg-[rgba(5,8,22,0.4)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] shadow-2xl shadow-cyan-500/10">
                  <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle at 30% 30%, rgba(0,217,255,0.08) 0%, transparent 60%)" }} />
                  <div className="relative w-full h-full">
                    <Image src="/profile.jpeg" alt="Akash Gupta" width={360} height={360} priority
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/360x360/050816/00D9FF?text=AG"; }}
                      className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 rounded-full pointer-events-none" style={{ background: "linear-gradient(to top, rgba(5,8,22,0.6) 0%, transparent 100%)" }} />
                </div>
                <div className="absolute top-[8%] left-[12%] w-[35%] h-[25%] rounded-full pointer-events-none opacity-30"
                  style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.15) 0%, transparent 70%)", filter: "blur(8px)" }} />
              </div>

              <motion.div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-3"
                animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                <span className="tag-gradient bg-[rgba(0,217,255,0.1)] border border-cyan-400/20 text-cyan-300 shadow-lg shadow-cyan-500/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Full Stack
                </span>
              </motion.div>

              <motion.div className="absolute -bottom-2 left-0 sm:left-2"
                animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}>
                <span className="tag-gradient bg-[rgba(123,97,255,0.1)] border border-violet-400/20 text-violet-300 shadow-lg shadow-violet-500/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  AI Engineer
                </span>
              </motion.div>

              <motion.div className="absolute top-1/4 -left-4 sm:-left-5"
                animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}>
                <span className="tag-gradient bg-[rgba(255,255,255,0.05)] border border-white/10 text-white/70">
                  9.2 CGPA
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
