"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { achievements } from "@/data/portfolio";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { FiAward } from "react-icons/fi";

const colorMap: Record<string, { ring: string; text: string; bg: string }> = {
  red: { ring: "border-red-500/30", text: "text-red-400", bg: "bg-red-500/10" },
  green: { ring: "border-green-500/30", text: "text-green-400", bg: "bg-green-500/10" },
  blue: { ring: "border-blue-500/30", text: "text-blue-400", bg: "bg-blue-500/10" },
  amber: { ring: "border-amber-500/30", text: "text-amber-400", bg: "bg-amber-500/10" },
};

function AchCard({ children, className }: { children: React.ReactNode; className?: string }) {
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
    ref.current.style.transform = `perspective(1000px) rotateY(${cx * 8}deg) rotateX(${-cy * 8}deg) translateZ(8px)`;
  }, []);

  const handleLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.setProperty("--mx", `50%`);
    ref.current.style.setProperty("--my", `50%`);
    ref.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={`card p-5 flex items-start gap-4 group cursor-pointer animate-border-glow ${className || ""}`}
        style={{ transformStyle: "preserve-3d", transition: "transform 0.08s linear" }}
      >
        <div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at var(--mx, 50%) var(--my, 50%), rgba(0,217,255,0.18) 0%, rgba(123,97,255,0.08) 30%, transparent 60%)`,
          }}
        />
        <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: "0 0 40px rgba(0,217,255,0.12)" }} />
        <motion.div whileTap={{ scale: 0.96 }} className="flex items-start gap-4 w-full">
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <AnimatedSection id="achievements" className="py-28 sm:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="section-label">Achievements</span>
          <h2 className="section-heading">
            <span className="gradient-text animate-heading-shimmer">Certifications</span>
          </h2>
          <p className="text-slate-500 text-sm mt-4 max-w-md mx-auto">Industry credentials and virtual experience programs</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((achievement, i) => {
            const colors = colorMap[achievement.color] || colorMap.blue;
            return (
              <AchCard key={achievement.title}>
                <div className={`w-10 h-10 rounded-lg ${colors.bg} ${colors.text} flex items-center justify-center shrink-0 border ${colors.ring} relative z-10`}
                  style={{ transform: "translateZ(15px)" }}>
                  <FiAward size={18} />
                </div>
                <div className="relative z-10" style={{ transformStyle: "preserve-3d" }}>
                  <h3 className="text-sm font-semibold text-slate-200 mb-1" style={{ transform: "translateZ(10px)" }}>{achievement.title}</h3>
                  <span className={`text-xs font-medium ${colors.text}`} style={{ transform: "translateZ(5px)" }}>{achievement.org}</span>
                </div>
              </AchCard>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
