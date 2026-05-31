"use client";

import { useRef, useCallback, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { skills, skillIcons } from "@/data/portfolio";
import AnimatedSection from "@/components/ui/AnimatedSection";

function Particles({ id }: { id: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let pts: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
    let animId: number;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const obs = new ResizeObserver(resize);
    obs.observe(canvas);

    for (let i = 0; i < 15; i++) {
      pts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.2 + 0.3,
        a: Math.random() * 0.3 + 0.1,
      });
    }

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,217,255,${p.a})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); obs.disconnect(); };
  }, [id]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

function SkillCard({ category, items, index }: { category: string; items: string[]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = x / rect.width - 0.5;
    const cy = y / rect.height - 0.5;
    cardRef.current.style.setProperty("--mx", `${x}px`);
    cardRef.current.style.setProperty("--my", `${y}px`);
    cardRef.current.style.transform = `perspective(1000px) rotateY(${cx * 12}deg) rotateX(${-cy * 12}deg) translateZ(10px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--mx", `50%`);
    cardRef.current.style.setProperty("--my", `50%`);
    cardRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <motion.div whileTap={{ scale: 0.96 }} className="relative">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="card p-6 group cursor-pointer animate-border-glow"
          style={{ transformStyle: "preserve-3d", transition: "transform 0.08s linear" }}
        >
          <Particles id={`skill-${category}`} />

          <div
            className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(0,217,255,0.18) 0%, rgba(123,97,255,0.1) 30%, transparent 60%)`,
            }}
          />

          <div
            className="absolute top-0 left-4 right-4 h-[2px] rounded-full"
            style={{
              background: `linear-gradient(90deg, ${index % 2 === 0 ? '#00D9FF' : '#7B61FF'}, transparent)`,
              opacity: 0.6,
            }}
          />

          <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ boxShadow: "0 0 50px rgba(0,217,255,0.15), 0 0 100px rgba(123,97,255,0.1)" }} />

          <div className="flex items-center gap-3 mb-5 relative z-10" style={{ transformStyle: "preserve-3d" }}>
            <span className="text-2xl animate-icon-bounce" style={{ transform: "translateZ(20px)", animationDelay: `${index * 0.15}s` }}>
              {skillIcons[category] || "⚡"}
            </span>
            <h3 className="text-base font-semibold text-slate-100" style={{ fontFamily: "var(--font-syne)", transform: "translateZ(15px)" }}>
              {category}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2 relative z-10" style={{ transform: "translateZ(10px)" }}>
            {items.map((skill) => (
              <motion.span
                key={skill}
                className="skill-pill"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(0,217,255,0.18)", borderColor: "rgba(0,217,255,0.5)" }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <AnimatedSection id="skills" className="py-28 sm:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="section-label">Skills</span>
          <h2 className="section-heading">
            <span className="gradient-text animate-heading-shimmer">Tech Arsenal</span>
          </h2>
          <p className="text-slate-500 text-sm mt-4 max-w-md mx-auto">Tools and technologies I work with daily</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(skills).map(([category, items], catIdx) => (
            <SkillCard key={category} category={category} items={items} index={catIdx} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
