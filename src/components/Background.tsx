"use client";

import { useEffect, useRef, useCallback } from "react";

function AuroraBlob({ className, style }: { className: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={style}
    />
  );
}

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 217, 255, ${p.alpha})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[1]" />
  );
}

function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouse = useCallback((e: MouseEvent) => {
    if (glowRef.current) {
      glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [handleMouse]);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-[1] mix-blend-screen"
      style={{
        background: "radial-gradient(circle, rgba(0,217,255,0.06) 0%, transparent 70%)",
        transform: "translate(0, 0)",
        willChange: "transform",
      }}
    />
  );
}

export default function Background() {
  return (
    <>
      {/* Aurora blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <AuroraBlob
          className="w-[600px] h-[600px] -top-48 -left-48 animate-aurora"
          style={{
            background: "radial-gradient(circle, rgba(0,217,255,0.12) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <AuroraBlob
          className="w-[500px] h-[500px] -bottom-32 -right-32 animate-aurora-2"
          style={{
            background: "radial-gradient(circle, rgba(123,97,255,0.1) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <AuroraBlob
          className="w-[400px] h-[400px] top-1/3 right-1/4 animate-aurora-3"
          style={{
            background: "radial-gradient(circle, rgba(110,231,255,0.08) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <AuroraBlob
          className="w-[350px] h-[350px] bottom-1/4 left-1/4 animate-aurora"
          style={{
            background: "radial-gradient(circle, rgba(0,217,255,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,217,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,217,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Particles */}
      <Particles />

      {/* Cursor glow */}
      <CursorGlow />

      {/* Noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[2]"
        style={{
          opacity: 0.02,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
    </>
  );
}
