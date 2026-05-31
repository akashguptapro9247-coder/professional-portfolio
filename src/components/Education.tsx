"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { education } from "@/data/portfolio";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { FiMapPin } from "react-icons/fi";

function EduCard({ children, current, index }: { children: React.ReactNode; current: boolean; index: number }) {
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
    ref.current.style.transform = `perspective(1000px) rotateY(${cx * 6}deg) rotateX(${-cy * 6}deg) translateZ(6px)`;
  }, []);

  const handleLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.setProperty("--mx", `50%`);
    ref.current.style.setProperty("--my", `50%`);
    ref.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={`card p-6 group cursor-pointer ${current ? "card-accent border-cyan-500/20" : ""} animate-border-glow`}
        style={{ transformStyle: "preserve-3d", transition: "transform 0.08s linear" }}
      >
        <div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(0,217,255,0.15) 0%, rgba(123,97,255,0.08) 30%, transparent 60%)`,
          }}
        />
        <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: "0 0 40px rgba(0,217,255,0.1)" }} />
        <motion.div whileTap={{ scale: 0.98 }}>
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Education() {
  return (
    <AnimatedSection id="education" className="py-28 sm:py-36">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="section-label">Education</span>
          <h2 className="section-heading">
            <span className="gradient-text animate-heading-shimmer">Academic Foundation</span>
          </h2>
          <p className="text-slate-500 text-sm mt-4 max-w-md mx-auto">My learning journey in computer science</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/40 via-violet-500/40 to-transparent" />

          {education.map((edu, i) => (
            <div key={edu.degree} className="relative flex gap-6 mb-8 last:mb-0">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 200, damping: 15 }}
                className={`relative shrink-0 w-4 h-4 rounded-full border-[3px] z-10 mt-1.5 ${
                  edu.current
                    ? "bg-cyan-400 border-cyan-400 shadow-[0_0_12px_rgba(0,217,255,0.4)]"
                    : "bg-[#050816] border-slate-600"
                }`} />

              <div className="flex-1">
                <EduCard current={edu.current} index={i}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3 relative z-10" style={{ transformStyle: "preserve-3d" }}>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-slate-100" style={{ fontFamily: "var(--font-syne)", transform: "translateZ(12px)" }}>{edu.degree}</h3>
                        {edu.current && (
                          <motion.span
                            className="flex items-center gap-1.5 text-[11px] text-green-400 bg-green-500/10 border border-green-500/15 rounded-full px-2.5 py-0.5"
                            whileHover={{ scale: 1.08 }}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-lg shadow-green-400/50 animate-pulse" />
                            Current
                          </motion.span>
                        )}
                      </div>
                      <p className="text-sm text-cyan-400/80 mt-1">{edu.institution}</p>
                    </div>
                    <span className="text-xs text-slate-500 bg-white/[0.04] rounded-full px-3 py-1 shrink-0">{edu.period}</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm relative z-10">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <FiMapPin size={13} className="text-slate-600" />
                      {edu.location}
                    </span>
                    {edu.cgpa && <span className="text-sm font-bold gradient-text-cyan">CGPA: {edu.cgpa}</span>}
                  </div>
                </EduCard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
