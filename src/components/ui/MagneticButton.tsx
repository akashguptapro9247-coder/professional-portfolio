"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  download?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  download,
  target,
  rel,
  type = "button",
}: Props) {
  const btnRef = useRef<HTMLDivElement>(null);

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btnRef.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!btnRef.current) return;
    btnRef.current.style.transform = "translate(0px, 0px)";
  }, []);

  const baseClass = variant === "primary" ? "btn-primary" : "btn-secondary";

  const Tag = href ? "a" : "button";

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="inline-block"
    >
      <div
        ref={btnRef}
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        style={{ transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <Tag
          href={href}
          onClick={onClick}
          download={download}
          target={target}
          rel={rel}
          type={Tag === "button" ? type : undefined}
          className={`${baseClass} ${className}`}
        >
          {children}
        </Tag>
      </div>
    </motion.div>
  );
}
