"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Counter from "@/components/ui/Counter";
import { FiAward, FiBriefcase, FiFolder } from "react-icons/fi";
import { HiCodeBracket, HiCpuChip, HiLightBulb, HiRectangleGroup } from "react-icons/hi2";

const stats = [
  { value: "9.2", label: "CGPA", icon: FiAward, suffix: "" },
  { value: "2", label: "Internships", icon: FiBriefcase, suffix: "+" },
  { value: "5", label: "Projects", icon: FiFolder, suffix: "+" },
];

const interests = [
  { icon: HiCpuChip, title: "Artificial Intelligence", gradient: "from-cyan-500 to-blue-500" },
  { icon: HiCodeBracket, title: "Full Stack Development", gradient: "from-violet-500 to-purple-500" },
  { icon: HiLightBulb, title: "Problem Solving", gradient: "from-amber-400 to-orange-500" },
  { icon: HiRectangleGroup, title: "Software Engineering", gradient: "from-emerald-400 to-teal-500" },
];

function HoverCard({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty("--mx", `${x}px`);
    ref.current.style.setProperty("--my", `${y}px`);
    const cx = x / rect.width - 0.5;
    const cy = y / rect.height - 0.5;
    ref.current.style.transform = `perspective(1000px) rotateY(${cx * 10}deg) rotateX(${-cy * 10}deg) translateZ(8px)`;
  }, []);

  const handleLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.setProperty("--mx", `50%`);
    ref.current.style.setProperty("--my", `50%`);
    ref.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={`card p-5 text-center group cursor-pointer animate-border-glow ${className || ""}`}
        style={{ transformStyle: "preserve-3d", transition: "transform 0.08s linear" }}
      >
        <div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `radial-gradient(350px circle at var(--mx, 50%) var(--my, 50%), rgba(0,217,255,0.18) 0%, rgba(123,97,255,0.08) 30%, transparent 60%)` }}
        />
        <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: "0 0 40px rgba(0,217,255,0.15), 0 0 80px rgba(123,97,255,0.08)" }} />
        {children}
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <AnimatedSection id="about" className="py-28 sm:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="section-label">About</span>
          <h2 className="section-heading">
            <span className="gradient-text animate-heading-shimmer">Beyond the Code</span>
          </h2>
          <p className="text-slate-500 text-sm mt-4 max-w-md mx-auto">A glimpse into who I am and what drives me</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-400 leading-relaxed text-base sm:text-lg mb-8"
            >
              {personalInfo.bio}
            </motion.p>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <HoverCard key={stat.label} delay={i * 0.1}>
                  <stat.icon className="text-cyan-400 mx-auto mb-2 animate-icon-bounce" size={20} style={{ animationDelay: `${i * 0.3}s` }} />
                  <div className="text-2xl sm:text-3xl font-bold gradient-text-cyan">
                    <Counter value={stat.value} />
                    {stat.suffix}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 mt-1">{stat.label}</div>
                </HoverCard>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {interests.map((interest, i) => (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty("--mx", `${x}px`);
                    e.currentTarget.style.setProperty("--my", `${y}px`);
                    const cx = x / rect.width - 0.5;
                    const cy = y / rect.height - 0.5;
                    e.currentTarget.style.transform = `perspective(1000px) rotateY(${cx * 10}deg) rotateX(${-cy * 10}deg) translateZ(8px)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.setProperty("--mx", `50%`);
                    e.currentTarget.style.setProperty("--my", `50%`);
                    e.currentTarget.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)";
                  }}
                  className="card p-5 group cursor-pointer animate-border-glow !text-left"
                  style={{ transformStyle: "preserve-3d", transition: "transform 0.08s linear" }}
                >
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `radial-gradient(350px circle at var(--mx, 50%) var(--my, 50%), rgba(0,217,255,0.18) 0%, rgba(123,97,255,0.08) 30%, transparent 60%)` }}
                  />
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${interest.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <interest.icon className="text-white animate-icon-bounce" size={18} style={{ animationDelay: `${i * 0.2}s` }} />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-200">{interest.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
