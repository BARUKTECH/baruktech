export type Phase = "idle" | "playing" | "paused" | "over";

export type GameEvent = "flap" | "score" | "hit";

export type Gate = {
  id: number;
  x: number;
  width: number;
  baseGapY: number;
  gapY: number;
  gapHeight: number;
  minGapY: number;
  maxGapY: number;
  driftAmplitude: number;
  driftSpeed: number;
  driftPhase: number;
  scored: boolean;
};

export type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  gravity: number;
  drag: number;
};

export const WORLD = {
  height: 600,
  ground: 44,
  robotRadius: 26,
  ceiling: 16,
} as const;

const GRAVITY = 1740;
const FLAP_VELOCITY = -560;
const MAX_FALL_SPEED = 980;
const GATE_WIDTH = 78;
const GAP_START = 252;
const GAP_MIN = 170;
const GATE_MARGIN_TOP = 66;
const GATE_MARGIN_BOTTOM = 34;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const randomBetween = (min: number, max: number) =>
  min + Math.random() * (max - min);

type Circle = { x: number; y: number; radius: number };

const circleHitsRect = (
  circle: Circle,
  x: number,
  y: number,
  width: number,
  height: number,
) => {
  if (height <= 0 || width <= 0) return false;
  const nearestX = clamp(circle.x, x, x + width);
  const nearestY = clamp(circle.y, y, y + height);
  const dx = circle.x - nearestX;
  const dy = circle.y - nearestY;
  return dx * dx + dy * dy <= circle.radius * circle.radius;
};

export class BarukEngine {
  phase: Phase = "idle";
  width = 960;
  height = WORLD.height;
  time = 0;
  distance = 0;
  score = 0;
  gates: Gate[] = [];
  particles: Particle[] = [];
  events: GameEvent[] = [];
  flash = 0;
  shake = 0;
  reducedMotion = false;
  robot = {
    x: 240,
    y: WORLD.height * 0.44,
    vy: 0,
    rotation: 0,
    wing: 0,
  };

  private nextGateId = 1;

  resize(width: number) {
    this.width = Math.max(320, width);
    this.robot.x = clamp(this.width * 0.26, 132, 300);
    if (this.phase === "idle") {
      this.robot.y = this.height * 0.44;
    }
  }

  resetToIdle() {
    this.phase = "idle";
    this.score = 0;
    this.gates = [];
    this.particles = [];
    this.events = [];
    this.flash = 0;
    this.shake = 0;
    this.robot.y = this.height * 0.44;
    this.robot.vy = 0;
    this.robot.rotation = 0;
    this.robot.wing = 0;
  }

  start() {
    this.phase = "playing";
    this.score = 0;
    this.gates = [];
    this.particles = [];
    this.events = [];
    this.flash = 0;
    this.shake = 0;
    this.robot.y = this.height * 0.44;
    this.robot.vy = 0;
    this.robot.rotation = 0;
    this.robot.wing = 0;
    this.spawnGate(this.width + 80);
    this.flap();
  }

  flap() {
    if (this.phase !== "playing") return;
    this.robot.vy = FLAP_VELOCITY;
    this.robot.wing = 1;
    this.events.push("flap");

    for (let index = 0; index < 4; index += 1) {
      this.particles.push({
        x: this.robot.x - 26,
        y: this.robot.y + randomBetween(-6, 10),
        vx: randomBetween(-150, -60),
        vy: randomBetween(-40, 60),
        life: randomBetween(0.22, 0.45),
        maxLife: 0.45,
        size: randomBetween(1.5, 3.2),
        color: index % 2 === 0 ? "#66e0ff" : "#a78bfa",
        gravity: 0,
        drag: 0.9,
      });
    }
  }

  pause() {
    if (this.phase === "playing") this.phase = "paused";
  }

  resume() {
    if (this.phase === "paused") this.phase = "playing";
  }

  get speed() {
    const ramp = Math.min(this.score * 0.0075, 0.1);
    return this.width * (0.3 + ramp);
  }

  get gapHeight() {
    return Math.max(GAP_MIN, GAP_START - this.score * 4.6);
  }

  get gateSpacing() {
    return clamp(this.width * 0.44, 300, 760);
  }

  update(dt: number) {
    this.time += dt;
    this.shake = Math.max(0, this.shake - dt * 2.4);
    this.flash = Math.max(0, this.flash - dt * 1.8);
    this.updateParticles(dt);

    if (this.phase === "idle") {
      this.distance += dt * 34;
      const bob = this.reducedMotion ? 3 : 9;
      this.robot.y = this.height * 0.44 + Math.sin(this.time * 2.1) * bob;
      this.robot.rotation = Math.sin(this.time * 1.5) * 0.05;
      return;
    }

    if (this.phase === "paused") return;

    if (this.phase === "over") {
      this.distance += dt * 24;
      this.robot.vy = Math.min(
        this.robot.vy + GRAVITY * 0.75 * dt,
        MAX_FALL_SPEED,
      );
      this.robot.y += this.robot.vy * dt;
      this.robot.rotation = Math.min(this.robot.rotation + dt * 2.4, 1.5);
      return;
    }

    const speed = this.speed;
    this.distance += speed * dt;
    this.robot.vy = Math.min(
      this.robot.vy + GRAVITY * dt,
      MAX_FALL_SPEED,
    );
    this.robot.y += this.robot.vy * dt;
    this.robot.rotation = clamp(this.robot.vy / 900, -0.5, 0.95);
    this.robot.wing = Math.max(0, this.robot.wing - dt * 3.2);

    const ceilingLimit = WORLD.ceiling + WORLD.robotRadius;
    if (this.robot.y < ceilingLimit) {
      this.robot.y = ceilingLimit;
      if (this.robot.vy < 0) this.robot.vy = 0;
    }

    const lastGate = this.gates[this.gates.length - 1];
    if (!lastGate || lastGate.x <= this.width + 80 - this.gateSpacing) {
      this.spawnGate(this.width + 80);
    }

    const hitCircle: Circle = {
      x: this.robot.x,
      y: this.robot.y - 2,
      radius: WORLD.robotRadius,
    };

    for (const gate of this.gates) {
      gate.x -= speed * dt;

      if (gate.driftAmplitude > 0) {
        gate.gapY = clamp(
          gate.baseGapY +
            Math.sin(this.time * gate.driftSpeed + gate.driftPhase) *
              gate.driftAmplitude,
          gate.minGapY,
          gate.maxGapY,
        );
      }

      if (!gate.scored && gate.x + gate.width < hitCircle.x - hitCircle.radius) {
        gate.scored = true;
        this.score += 1;
        this.events.push("score");
        this.spawnScoreSparks(gate);
      }

      const topHeight = gate.gapY - gate.gapHeight / 2;
      const bottomY = gate.gapY + gate.gapHeight / 2;

      if (
        circleHitsRect(hitCircle, gate.x, 0, gate.width, topHeight) ||
        circleHitsRect(
          hitCircle,
          gate.x,
          bottomY,
          gate.width,
          this.height - WORLD.ground - bottomY,
        )
      ) {
        this.impact();
        return;
      }
    }

    this.gates = this.gates.filter(
      (gate) => gate.x + gate.width > -60,
    );

    if (this.robot.y + WORLD.robotRadius > this.height - WORLD.ground) {
      this.robot.y = this.height - WORLD.ground - WORLD.robotRadius;
      this.impact();
    }
  }

  private spawnGate(x: number) {
    const gapHeight = this.gapHeight;
    const minGapY = GATE_MARGIN_TOP + gapHeight / 2;
    const maxGapY =
      this.height - WORLD.ground - GATE_MARGIN_BOTTOM - gapHeight / 2;

    const drifting = this.score >= 7 && Math.random() < 0.42;
    const driftAmplitude = drifting ? randomBetween(18, 44) : 0;
    const driftSpeed = drifting ? randomBetween(0.8, 1.5) : 0;
    const driftPhase = Math.random() * Math.PI * 2;
    const baseGapY = randomBetween(
      minGapY + driftAmplitude,
      maxGapY - driftAmplitude,
    );

    this.gates.push({
      id: this.nextGateId,
      x,
      width: GATE_WIDTH,
      baseGapY,
      gapY: baseGapY,
      gapHeight,
      minGapY,
      maxGapY,
      driftAmplitude,
      driftSpeed,
      driftPhase,
      scored: false,
    });
    this.nextGateId += 1;
  }

  private spawnScoreSparks(gate: Gate) {
    for (let index = 0; index < 9; index += 1) {
      const angle = randomBetween(-Math.PI * 0.9, Math.PI * 0.9);
      const speed = randomBetween(40, 170);
      this.particles.push({
        x: gate.x + gate.width,
        y: gate.gapY + randomBetween(-10, 10),
        vx: Math.cos(angle) * speed - 40,
        vy: Math.sin(angle) * speed,
        life: randomBetween(0.35, 0.7),
        maxLife: 0.7,
        size: randomBetween(1.2, 2.8),
        color: index % 3 === 0 ? "#f5f5ff" : index % 2 === 0 ? "#66e0ff" : "#a78bfa",
        gravity: 90,
        drag: 0.96,
      });
    }
  }

  private impact() {
    this.phase = "over";
    this.events.push("hit");
    this.flash = 0.9;
    this.shake = 0.75;
    this.robot.vy = Math.min(this.robot.vy, -140);
    this.robot.wing = 0;

    for (let index = 0; index < 26; index += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = randomBetween(60, 320);
      this.particles.push({
        x: this.robot.x,
        y: this.robot.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: randomBetween(0.4, 0.95),
        maxLife: 0.95,
        size: randomBetween(1.5, 4),
        color:
          index % 4 === 0
            ? "#66e0ff"
            : index % 3 === 0
              ? "#f5f5ff"
              : "#793cff",
        gravity: 320,
        drag: 0.98,
      });
    }
  }

  private updateParticles(dt: number) {
    if (this.particles.length === 0) return;
    for (const particle of this.particles) {
      particle.life -= dt;
      particle.vx *= Math.pow(particle.drag, dt * 60);
      particle.vy = particle.vy * Math.pow(particle.drag, dt * 60) + particle.gravity * dt;
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
    }
    this.particles = this.particles.filter((particle) => particle.life > 0);
  }
}
