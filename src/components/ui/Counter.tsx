"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Props {
  value: string;
  className?: string;
}

export default function Counter({ value, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const num = parseFloat(value);
    if (isNaN(num)) { setDisplay(value); return; }

    const hasDecimal = value.includes(".");
    const duration = 1500;
    const start = performance.now();

    const update = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = num * eased;
      setDisplay(hasDecimal ? current.toFixed(1) : Math.round(current).toString());
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [isInView, value]);

  return <span ref={ref} className={className}>{display}</span>;
}
