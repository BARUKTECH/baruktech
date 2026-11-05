"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-gradient-to-r from-violet via-blue to-cyan"
      style={{ scaleX: reduceMotion ? scrollYProgress : scaleX }}
    />
  );
}
