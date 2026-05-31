"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { experience } from "@/data/portfolio";
import AnimatedSection from "@/components/ui/AnimatedSection";

function ExpCard({ children, index }: { children: React.ReactNode; index: number }) {
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
        className="card p-6 card-accent group cursor-pointer animate-border-glow"
        style={{ transformStyle: "preserve-3d", transition: "transform 0.08s linear" }}
      >
        <div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(0,217,255,0.15) 0%, rgba(123,97,255,0.08) 30%, transparent 60%)`,
          }}
        />
        <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: "0 0 40px rgba(0,217,255,0.12)" }} />
        <motion.div whileTap={{ scale: 0.98 }}>
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <AnimatedSection id="experience" className="py-28 sm:py-36">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="section-label">Experience</span>
          <h2 className="section-heading">
            <span className="gradient-text animate-heading-shimmer">Professional Journey</span>
          </h2>
          <p className="text-slate-500 text-sm mt-4 max-w-md mx-auto">Where I&apos;ve grown and contributed</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[19px] sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-violet-500/50 to-cyan-500/50 sm:-translate-x-px" />

          {experience.map((exp, i) => (
            <div key={`${exp.company}-${exp.role}`}
              className={`relative flex flex-col sm:flex-row gap-6 sm:gap-12 mb-12 last:mb-0 ${i % 2 === 0 ? "" : "sm:flex-row-reverse"}`}>

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 200, damping: 15 }}
                className="absolute left-[11px] sm:left-1/2 top-1 w-4 h-4 rounded-full bg-[#050816] border-[3px] border-cyan-400 z-10 sm:-translate-x-1/2 shadow-[0_0_16px_rgba(0,217,255,0.4)]"
              />

              <div className={`relative ml-12 sm:ml-0 sm:w-[calc(50%-2rem)] ${i % 2 === 0 ? "sm:text-right" : ""}`}>
                <ExpCard index={i}>
                  <div className={`flex flex-col gap-1 mb-3 relative z-10 ${i % 2 === 0 ? "sm:items-end" : ""}`}
                    style={{ transformStyle: "preserve-3d" }}>
                    <div className="flex items-center gap-2 flex-wrap" style={{ transform: "translateZ(12px)" }}>
                      <h3 className="text-lg font-semibold text-slate-100" style={{ fontFamily: "var(--font-syne)" }}>{exp.role}</h3>
                      {exp.current && (
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
                    <p className="text-sm text-cyan-400" style={{ transform: "translateZ(8px)" }}>{exp.company} · {exp.type}</p>
                  </div>
                  <span className="inline-block text-xs text-slate-500 bg-white/[0.04] rounded-full px-3 py-1 mb-4 relative z-10">{exp.period}</span>
                  <ul className={`space-y-2 relative z-10 ${i % 2 === 0 ? "sm:text-right" : ""}`}>
                    {exp.points.map((point, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: i % 2 === 0 ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + j * 0.1 + 0.3 }}
                        className="text-sm text-slate-400 leading-relaxed flex gap-2"
                        style={{ transform: `translateZ(${6 - j}px)` }}
                      >
                        <span className="text-cyan-400 mt-1 shrink-0">◆</span>
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </ExpCard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
