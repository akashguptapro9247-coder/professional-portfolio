"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";

function ProjectCard({ project, index, featured }: { project: typeof projects[0]; index: number; featured: boolean }) {
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
    cardRef.current.style.transform = `perspective(1000px) rotateY(${cx * 8}deg) rotateX(${-cy * 8}deg) translateZ(10px)`;
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
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <motion.div whileTap={{ scale: 0.96 }} className="relative">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`card p-6 sm:p-8 group cursor-pointer ${featured ? "card-accent" : ""} animate-border-glow`}
          style={{ transformStyle: "preserve-3d", transition: "transform 0.08s linear" }}
        >
          <div
            className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(0,217,255,0.2) 0%, rgba(123,97,255,0.12) 30%, transparent 60%)`,
            }}
          />

          <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ boxShadow: "0 0 60px rgba(0,217,255,0.15), 0 0 120px rgba(123,97,255,0.08)" }} />

          <div className="relative z-10" style={{ transformStyle: "preserve-3d" }}>
            {project.badge && (
              <motion.span
                className="inline-flex items-center gap-1.5 text-[11px] text-green-400 bg-green-500/10 border border-green-500/15 rounded-full px-3 py-1 mb-4"
                whileHover={{ scale: 1.05 }}
                style={{ transform: "translateZ(20px)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-lg shadow-green-400/50 animate-pulse" />
                {project.badge}
              </motion.span>
            )}

            <h3 className={`font-bold text-slate-100 mb-1 ${featured ? "text-xl" : "text-lg"}`}
              style={{ fontFamily: "var(--font-syne)", transform: "translateZ(15px)" }}>
              {project.name}
            </h3>
            <p className="text-sm text-cyan-400/80 mb-3" style={{ transform: "translateZ(10px)" }}>{project.subtitle}</p>
            <p className="text-sm text-slate-400 leading-relaxed mb-5" style={{ transform: "translateZ(8px)" }}>{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-5" style={{ transform: "translateZ(8px)" }}>
              {project.stack.map((tech) => (
                <motion.span
                  key={tech}
                  className="tech-pill"
                  whileHover={{ scale: 1.1, background: "rgba(123,97,255,0.2)", borderColor: "rgba(123,97,255,0.4)" }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            <div className="flex gap-5" style={{ transform: "translateZ(10px)" }}>
              <motion.a
                href={project.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGithub size={15} />
                <span>Source</span>
              </motion.a>
              <motion.a
                href={project.live} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Live Demo</span>
                <FiArrowUpRight size={15} />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <AnimatedSection id="projects" className="py-28 sm:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="section-label">Projects</span>
          <h2 className="section-heading">
            <span className="gradient-text animate-heading-shimmer">Featured Work</span>
          </h2>
          <p className="text-slate-500 text-sm mt-4 max-w-md mx-auto">Real-world applications I&apos;ve built from scratch</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {featured.map((project, i) => (<ProjectCard key={project.name} project={project} index={i} featured />))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {others.map((project, i) => (<ProjectCard key={project.name} project={project} index={i + 2} featured={false} />))}
        </div>
      </div>
    </AnimatedSection>
  );
}
