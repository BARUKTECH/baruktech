"use client";

import { useEffect, useRef } from "react";

type Vec3 = { x: number; y: number; z: number };

type Particle = Vec3 & {
  size: number;
  tone: number;
};

type Ring = {
  radius: number;
  tiltX: number;
  tiltY: number;
  color: string;
  speed: number;
  width: number;
};

const TAU = Math.PI * 2;
const FOV = 5.5;
const PARTICLE_COUNT = 380;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const STATIC_TIME = 0.9;

const rings: Ring[] = [
  {
    radius: 1.72,
    tiltX: 1.08,
    tiltY: 0.18,
    color: "121,60,255",
    speed: 0.18,
    width: 1,
  },
  {
    radius: 1.95,
    tiltX: 0.48,
    tiltY: 1.04,
    color: "39,120,255",
    speed: -0.14,
    width: 0.8,
  },
  {
    radius: 1.46,
    tiltX: 1.42,
    tiltY: -0.62,
    color: "102,224,255",
    speed: 0.24,
    width: 0.7,
  },
];

const particles: Particle[] = Array.from(
  { length: PARTICLE_COUNT },
  (_, index) => {
    const y = 1 - (index / (PARTICLE_COUNT - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = index * GOLDEN_ANGLE;

    return {
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
      size: 0.5 + (((index * 47) % 100) / 100) * 1.1,
      tone: ((index * 73) % 100) / 100,
    };
  },
);

function rotate(point: Vec3, ry: number, rx: number): Vec3 {
  const cosY = Math.cos(ry);
  const sinY = Math.sin(ry);
  const x1 = point.x * cosY - point.z * sinY;
  const z1 = point.x * sinY + point.z * cosY;

  const cosX = Math.cos(rx);
  const sinX = Math.sin(rx);
  const y1 = point.y * cosX - z1 * sinX;
  const z2 = point.y * sinX + z1 * cosX;

  return { x: x1, y: y1, z: z2 };
}

function project(point: Vec3, scale: number, cx: number, cy: number) {
  const perspective = FOV / (FOV + point.z);

  return {
    x: cx + point.x * scale * perspective,
    y: cy - point.y * scale * perspective,
    z: point.z,
  };
}

function ringPoint(angle: number, ring: Ring): Vec3 {
  const x0 = Math.cos(angle) * ring.radius;
  const z0 = Math.sin(angle) * ring.radius;

  const cosX = Math.cos(ring.tiltX);
  const sinX = Math.sin(ring.tiltX);
  const y1 = -z0 * sinX;
  const z1 = z0 * cosX;

  const cosY = Math.cos(ring.tiltY);
  const sinY = Math.sin(ring.tiltY);
  const x2 = x0 * cosY + z1 * sinY;
  const z2 = -x0 * sinY + z1 * cosY;

  return { x: x2, y: y1, z: z2 };
}

export function SignalCore() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let frame = 0;
    let inView = true;
    let pageVisible = !document.hidden;

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const draw = (time: number) => {
      if (!width || !height) return;

      const base = Math.min(width, height);
      const cx = width * 0.5;
      const cy = height * 0.48;
      const ry = time * 0.12 + pointer.x * 0.55;
      const rx = -0.18 + pointer.y * 0.38;
      const scale = base * 0.155;

      ctx.clearRect(0, 0, width, height);

      const ambient = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        base * 0.64,
      );
      ambient.addColorStop(0, "rgba(121,0,255,0.18)");
      ambient.addColorStop(0.46, "rgba(8,123,255,0.07)");
      ambient.addColorStop(1, "rgba(3,4,11,0)");
      ctx.fillStyle = ambient;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.06);
      ctx.setLineDash([2, 9]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(245,245,255,0.14)";
      ctx.beginPath();
      ctx.arc(0, 0, base * 0.36, 0, TAU);
      ctx.stroke();
      ctx.restore();

      for (const particle of particles) {
        const point = rotate(
          {
            x: particle.x * 1.55,
            y: particle.y * 1.55,
            z: particle.z * 1.55,
          },
          ry,
          rx,
        );
        const projected = project(point, scale, cx, cy);
        const depth = (point.z + 1.55) / 3.1;
        const alpha = 0.06 + depth * 0.7;
        const size = particle.size * (0.55 + depth * 1.1);

        if (particle.tone > 0.78) {
          ctx.fillStyle = `rgba(0,207,255,${alpha})`;
        } else if (particle.tone > 0.48) {
          ctx.fillStyle = `rgba(167,139,250,${alpha})`;
        } else if (particle.tone > 0.24) {
          ctx.fillStyle = `rgba(121,0,255,${alpha * 0.9})`;
        } else {
          ctx.fillStyle = `rgba(245,245,255,${alpha * 0.65})`;
        }

        ctx.beginPath();
        ctx.arc(projected.x, projected.y, size, 0, TAU);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "lighter";

      for (const ring of rings) {
        const steps = 96;
        const offset = time * ring.speed;

        for (let index = 0; index < steps; index += 1) {
          const a1 = (index / steps) * TAU + offset;
          const a2 = ((index + 1) / steps) * TAU + offset;
          const p1 = rotate(ringPoint(a1, ring), ry, rx);
          const p2 = rotate(ringPoint(a2, ring), ry, rx);
          const s1 = project(p1, scale, cx, cy);
          const s2 = project(p2, scale, cx, cy);
          const depth = ((p1.z + p2.z) / 2 + 2) / 4;
          const alpha = 0.035 + depth * 0.32;

          ctx.strokeStyle = `rgba(${ring.color},${alpha})`;
          ctx.lineWidth = ring.width;
          ctx.beginPath();
          ctx.moveTo(s1.x, s1.y);
          ctx.lineTo(s2.x, s2.y);
          ctx.stroke();
        }
      }

      rings.forEach((ring, index) => {
        const angle = time * ring.speed * 2.4 + index * 2.1;
        const point = rotate(ringPoint(angle, ring), ry, rx);
        const projected = project(point, scale, cx, cy);
        const depth = (point.z + 2) / 4;

        ctx.fillStyle = `rgba(0,207,255,${0.25 + depth * 0.65})`;
        ctx.shadowColor = "#66e0ff";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(
          projected.x,
          projected.y,
          1.6 + depth * 1.4,
          0,
          TAU,
        );
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = "source-over";

      const coreGlow = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        base * 0.3,
      );
      coreGlow.addColorStop(0, "rgba(245,245,255,0.5)");
      coreGlow.addColorStop(0.18, "rgba(0,207,255,0.22)");
      coreGlow.addColorStop(0.5, "rgba(121,0,255,0.12)");
      coreGlow.addColorStop(1, "rgba(3,4,11,0)");
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, base * 0.3, 0, TAU);
      ctx.fill();

      const visorWidth = base * 0.46;
      const visorHeight = base * 0.115;
      const visorRadius = visorHeight / 2;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.055 + pointer.x * 0.035);

      ctx.fillStyle = "rgba(3,4,11,0.92)";
      ctx.beginPath();
      ctx.roundRect(
        -visorWidth / 2,
        -visorHeight / 2,
        visorWidth,
        visorHeight,
        visorRadius,
      );
      ctx.fill();

      ctx.strokeStyle = "rgba(0,207,255,0.28)";
      ctx.lineWidth = 1;
      ctx.stroke();

      const line = ctx.createLinearGradient(
        -visorWidth / 2,
        0,
        visorWidth / 2,
        0,
      );
      line.addColorStop(0, "rgba(0,207,255,0)");
      line.addColorStop(0.5, "rgba(205,248,255,0.95)");
      line.addColorStop(1, "rgba(0,207,255,0)");

      ctx.strokeStyle = line;
      ctx.lineWidth = 1.3;
      ctx.shadowColor = "#66e0ff";
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.moveTo(-visorWidth * 0.31, 0);
      ctx.lineTo(visorWidth * 0.31, 0);
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(245,245,255,0.4)";
      ctx.fillRect(-visorWidth * 0.44, -0.5, 2, 1);
      ctx.fillRect(visorWidth * 0.44 - 2, -0.5, 2, 1);
      ctx.restore();
    };

    const loop = (now: number) => {
      frame = 0;
      if (!inView || !pageVisible) return;

      pointer.x += (pointer.targetX - pointer.x) * 0.045;
      pointer.y += (pointer.targetY - pointer.y) * 0.045;
      draw(now / 1000);
      frame = window.requestAnimationFrame(loop);
    };

    const sync = () => {
      const shouldRun = inView && pageVisible && !reduceMotion;

      if (shouldRun && !frame) {
        frame = window.requestAnimationFrame(loop);
      } else if (!shouldRun && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      draw(reduceMotion ? STATIC_TIME : performance.now() / 1000);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = root.getBoundingClientRect();
      pointer.targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onPointerLeave = () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
    };

    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      sync();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.01 },
    );
    intersectionObserver.observe(canvas);

    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);

    resize();

    if (!reduceMotion) {
      sync();
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="absolute inset-0">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
