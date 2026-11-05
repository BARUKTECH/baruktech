"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { BarukUnit } from "@/components/visual/BarukUnit";
import { CornerMarks } from "@/components/ui/CornerMarks";
import { labExperiment } from "@/content/lab";

export function LabConsole() {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [7, -7]),
    { stiffness: 120, damping: 22, mass: 0.6 },
  );
  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-9, 9]),
    { stiffness: 120, damping: 22, mass: 0.6 },
  );

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const onPointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      ref={frameRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative [perspective:1400px]"
    >
      <div
        aria-hidden="true"
        className="absolute -inset-6 bg-[radial-gradient(circle,rgba(121,0,255,0.16),transparent_66%)] blur-2xl"
      />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="signal-panel scanlines relative overflow-hidden border border-white/10"
      >
        <CornerMarks className="z-30" />

        <div className="flex items-start justify-between gap-4 p-5 font-mono text-[8px] uppercase tracking-[0.22em] text-muted">
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-cyan shadow-[0_0_10px_#66e0ff]" />
            Lab / 01
          </span>
          <span className="flex items-center gap-2">
            <span className="status-dot h-1 w-1 rounded-full bg-violet-soft" />
            Unidade ativa
          </span>
        </div>

        <div className="relative mx-auto flex h-[clamp(300px,38vh,400px)] w-full max-w-[420px] items-end justify-center">
          <div
            aria-hidden="true"
            className="absolute inset-x-8 bottom-8 h-24 rounded-[50%] bg-[radial-gradient(ellipse,rgba(121,0,255,0.2),transparent_70%)] blur-xl"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-6 h-40 w-40 rounded-full border border-white/[0.06]"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-6 h-56 w-56 rounded-full border border-dashed border-white/[0.05] orbit-slow"
          />
          <BarukUnit
            idPrefix="lab-unit"
            className="relative h-[112%] w-auto translate-y-3 drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)]"
          />
        </div>

        <div className="relative border-t border-white/[0.06] p-5">
          <div className="grid grid-cols-3 gap-4">
            {labExperiment.hud.map((item) => (
              <div key={item.label}>
                <p className="font-mono text-[7px] uppercase tracking-[0.2em] text-muted/80">
                  {item.label}
                </p>
                <p className="mt-1.5 text-[10px] leading-4 text-ink">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/[0.06] pt-4">
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted/80">
              {labExperiment.code} · Flight Challenge
            </span>
            <span className="rounded-full border border-violet/30 bg-violet/10 px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.18em] text-violet-soft">
              {labExperiment.status}
            </span>
          </div>
        </div>
      </motion.div>

      <p className="mt-4 text-center font-mono text-[8px] uppercase tracking-[0.2em] text-muted/80">
        Mova o cursor sobre a unidade
      </p>
    </div>
  );
}
