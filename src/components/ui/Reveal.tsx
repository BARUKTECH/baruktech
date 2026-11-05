"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  amount?: number;
};

/**
 * Reveals content once it enters the viewport.
 *
 * A scroll listener complements Motion's IntersectionObserver so that content
 * is never left invisible after a large jump (scrollbar drag, End/Home, anchor
 * navigation) that can skip past an element without a frame in view.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 28,
  amount = 0.25,
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = elementRef.current;
    if (!element || isVisible) return;

    const threshold = prefersReducedMotion ? 0 : amount;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const visible =
        Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
      const required = Math.min(
        Math.max(1, rect.height) * threshold,
        viewportHeight * 0.6,
      );

      if (visible >= required || rect.bottom <= 0) {
        setIsVisible(true);
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [amount, isVisible, prefersReducedMotion]);

  return (
    <motion.div
      ref={elementRef}
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{
        duration: 0.9,
        delay: isVisible ? delay : 0,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
