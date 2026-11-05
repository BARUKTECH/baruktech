"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { CornerMarks } from "@/components/ui/CornerMarks";
import { RobotFigure } from "@/components/visual/RobotFigure";
import { heroCopy } from "@/content/home";

type Particle = {
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  tone: number;
};

const particles: readonly Particle[] = Array.from({ length: 20 }, (_, index) => ({
  left: ((index * 37 + 11) % 88) + 6,
  top: ((index * 53 + 17) % 74) + 10,
  size: 1 + ((index * 7) % 3),
  duration: 7 + ((index * 5) % 7),
  delay: (index * 0.73) % 6,
  tone: index % 3,
}));

const tones = [
  "bg-cyan shadow-[0_0_10px_#00cfff]",
  "bg-violet-soft shadow-[0_0_10px_#a020f0]",
  "bg-blue-soft shadow-[0_0_10px_#087bff]",
];

export function RobotStage() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    let active = true;

    const apply = (x: number, y: number) => {
      stage.style.setProperty("--px", x.toFixed(4));
      stage.style.setProperty("--py", y.toFixed(4));
    };

    const onMove = (event: PointerEvent) => {
      if (!active) return;
      // Only real mouse movement drives the parallax; touch scrolls are ignored.
      if (event.pointerType && event.pointerType !== "mouse") return;
      apply(
        (event.clientX / window.innerWidth - 0.5) * 2,
        (event.clientY / window.innerHeight - 0.5) * 2,
      );
    };

    const onLeave = () => {
      apply(0, 0);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    observer.observe(stage);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="hero-stage relative mx-auto w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[560px] xl:max-w-[460px]"
    >
      <div className="relative aspect-[4/5] w-full">
        {/* atmospheric glows */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[38%] h-[78%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(121,0,255,0.22),rgba(8,123,255,0.1)_45%,transparent_70%)] blur-2xl"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-[8%] bottom-[4%] h-24 rounded-[50%] bg-[radial-gradient(ellipse,rgba(0,207,255,0.22),transparent_70%)] blur-xl"
        />

        {/* frame */}
        <div
          aria-hidden="true"
          className="absolute inset-x-[4%] inset-y-[6%] rounded-[2.2rem] border border-white/[0.07]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-[4%] inset-y-[6%] rounded-[2.2rem] bg-[linear-gradient(160deg,rgba(12,20,51,0.5),rgba(3,4,11,0)_55%)]"
        />
        <CornerMarks className="z-20 opacity-70" />

        {/* grid backdrop */}
        <div
          aria-hidden="true"
          className="grid-backdrop-fine absolute inset-x-[6%] inset-y-[8%] rounded-[2rem] opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,#000,transparent_75%)]"
        />

        {/* floating HUD chips */}
        <div className="layer-far absolute left-0 top-3 z-30 sm:left-1">
          <div className="glass-chip rounded-xl px-3 py-2">
            <p className="font-mono text-[7px] uppercase tracking-[0.24em] text-muted">
              {heroCopy.stage.unit}
            </p>
            <p className="mt-1 flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-ink">
              <span className="h-1 w-1 rounded-full bg-cyan shadow-[0_0_8px_#00cfff]" />
              {heroCopy.stage.codename}
            </p>
          </div>
        </div>

        <div className="layer-far absolute right-0 top-3 z-30 text-right sm:right-1">
          <div className="glass-chip rounded-xl px-3 py-2">
            <p className="font-mono text-[7px] uppercase tracking-[0.24em] text-muted">
              {heroCopy.stage.link}
            </p>
            <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-cyan">
              {heroCopy.stage.linkValue}
            </p>
          </div>
        </div>

        <div className="layer-near absolute bottom-3 left-0 z-30 sm:left-1">
          <div className="glass-chip rounded-xl px-3 py-2">
            <p className="font-mono text-[7px] uppercase tracking-[0.24em] text-muted">
              {heroCopy.stage.core}
            </p>
            <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-ink">
              {heroCopy.stage.coreValue}
            </p>
            <div className="mt-1.5 flex items-end gap-[3px]" aria-hidden="true">
              {[6, 10, 7, 12, 9, 5].map((height, index) => (
                <span
                  key={index}
                  className="w-[2px] rounded-full bg-gradient-to-t from-blue to-cyan"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="layer-near absolute bottom-3 right-0 z-30 text-right sm:right-1">
          <div className="glass-chip rounded-xl px-3 py-2">
            <p className="font-mono text-[7px] uppercase tracking-[0.24em] text-muted">
              {heroCopy.stage.signal}
            </p>
            <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-violet-soft">
              {heroCopy.stage.signalValue}
            </p>
          </div>
        </div>

        {/* robot */}
        <div className="layer-mid absolute inset-x-0 bottom-0 top-[6%] z-10">
          <div className="robot-tilt h-full w-full">
            <div className="hero-floating h-full w-full">
              <RobotFigure />
            </div>
          </div>
        </div>

        {/* particles */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
          {particles.map((particle, index) => (
            <span
              key={index}
              className={`hero-particle absolute rounded-full ${tones[particle.tone]}`}
              style={
                {
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  "--dur": `${particle.duration}s`,
                  "--delay": `${particle.delay}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        {/* bottom fade so the bust dissolves into the page */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-bg via-bg/60 to-transparent"
        />
      </div>

      <p className="mt-1 text-center font-mono text-[8px] uppercase tracking-[0.22em] text-muted/60">
        {heroCopy.stage.note}
      </p>
    </div>
  );
}
