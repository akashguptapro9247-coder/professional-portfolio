"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 40,
  });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
    />
  );
}
