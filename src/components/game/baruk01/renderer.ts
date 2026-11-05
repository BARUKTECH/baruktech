import { BarukEngine, WORLD, type Gate } from "./engine";

export type RenderOptions = {
  reducedMotion: boolean;
};

const VIOLET = "#793cff";
const CYAN = "#66e0ff";

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const mod = (value: number, total: number) => {
  if (total <= 0) return 0;
  return ((value % total) + total) % total;
};

const hash = (value: number) => {
  const x = Math.sin(value * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const roundedPath = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  const safeRadius = Math.max(
    0,
    Math.min(radius, Math.abs(width) / 2, Math.abs(height) / 2),
  );
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, safeRadius);
};

export function drawFrame(
  ctx: CanvasRenderingContext2D,
  engine: BarukEngine,
  options: RenderOptions,
) {
  const { width, height } = engine;

  ctx.clearRect(0, 0, width, height);
  ctx.save();

  if (engine.shake > 0.001) {
    const magnitude = engine.shake * 9;
    ctx.translate(
      (Math.random() - 0.5) * magnitude,
      (Math.random() - 0.5) * magnitude,
    );
  }

  drawBackdrop(ctx, engine, options);
  drawGates(ctx, engine, options);
  drawParticles(ctx, engine);
  drawRobot(ctx, engine, options);

  ctx.restore();
  drawForeground(ctx, engine, options);
}

function drawBackdrop(
  ctx: CanvasRenderingContext2D,
  engine: BarukEngine,
  options: RenderOptions,
) {
  const { width, height, time, distance } = engine;
  const horizon = height - WORLD.ground;
  const motion = options.reducedMotion ? 0 : time;

  const base = ctx.createLinearGradient(0, 0, 0, height);
  base.addColorStop(0, "#07080d");
  base.addColorStop(0.45, "#0a0c16");
  base.addColorStop(0.8, "#0c0f1b");
  base.addColorStop(1, "#07080d");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  const auroraOne = ctx.createRadialGradient(
    width * 0.72 + Math.sin(motion * 0.24) * 22,
    height * 0.24,
    0,
    width * 0.72,
    height * 0.24,
    height * 0.7,
  );
  auroraOne.addColorStop(0, "rgba(121,0,255,0.16)");
  auroraOne.addColorStop(0.55, "rgba(121,0,255,0.05)");
  auroraOne.addColorStop(1, "rgba(121,0,255,0)");
  ctx.fillStyle = auroraOne;
  ctx.fillRect(0, 0, width, height);

  const auroraTwo = ctx.createRadialGradient(
    width * 0.22,
    horizon * 0.82 + Math.cos(motion * 0.2) * 18,
    0,
    width * 0.22,
    horizon * 0.82,
    height * 0.66,
  );
  auroraTwo.addColorStop(0, "rgba(8,123,255,0.12)");
  auroraTwo.addColorStop(1, "rgba(8,123,255,0)");
  ctx.fillStyle = auroraTwo;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  // Stars
  for (let index = 0; index < 52; index += 1) {
    const starX = mod(
      hash(index * 3.7) * width - distance * 0.05 * (0.35 + hash(index * 1.1)),
      width,
    );
    const starY = hash(index * 1.9) * horizon * 0.82;
    const twinkle = options.reducedMotion
      ? 0.7
      : 0.6 + Math.sin(time * 1.6 + index * 1.7) * 0.35;
    const alpha = (0.12 + hash(index * 2.7) * 0.38) * twinkle;
    const size = hash(index * 4.3) > 0.82 ? 1.6 : 0.9;
    ctx.fillStyle = `rgba(196, 212, 255, ${alpha.toFixed(3)})`;
    ctx.fillRect(starX, starY, size, size);
  }

  // Distant towers
  const towerSpacing = Math.max(110, width / 11);
  for (let index = 0; index < 20; index += 1) {
    const towerWidth = 34 + hash(index * 5.3) * 76;
    const towerHeight = 42 + hash(index * 7.1) * 168;
    const towerX =
      mod(
        index * towerSpacing - distance * 0.18 + hash(index * 2.3) * 160,
        width + 260,
      ) - 130;
    const towerY = horizon - towerHeight;

    const towerFill = ctx.createLinearGradient(
      towerX,
      towerY,
      towerX,
      horizon,
    );
    towerFill.addColorStop(0, "rgba(20, 24, 40, 0.95)");
    towerFill.addColorStop(1, "rgba(7, 8, 13, 0.95)");
    ctx.fillStyle = towerFill;
    ctx.fillRect(towerX, towerY, towerWidth, towerHeight);

    ctx.fillStyle = "rgba(167, 139, 250, 0.16)";
    ctx.fillRect(towerX, towerY, towerWidth, 1.5);

    if (hash(index * 9.7) > 0.45) {
      ctx.fillStyle = "rgba(102, 224, 255, 0.32)";
      ctx.fillRect(towerX + towerWidth * 0.28, towerY + 12, 2, 2);
      ctx.fillStyle = "rgba(167, 139, 250, 0.26)";
      ctx.fillRect(towerX + towerWidth * 0.62, towerY + 26, 2, 2);
    }
  }

  // Perspective grid
  ctx.save();
  ctx.strokeStyle = "rgba(245, 246, 250, 0.045)";
  ctx.lineWidth = 1;
  const columnSpacing = 86;
  const offset = mod(distance * 0.14, columnSpacing);
  for (let x = -columnSpacing + offset; x < width; x += columnSpacing) {
    ctx.beginPath();
    ctx.moveTo(x, horizon - 140);
    ctx.lineTo(x, horizon);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(245, 246, 250, 0.035)";
  for (let index = 1; index <= 3; index += 1) {
    const lineY = horizon - index * index * 16;
    ctx.beginPath();
    ctx.moveTo(0, lineY);
    ctx.lineTo(width, lineY);
    ctx.stroke();
  }
  ctx.restore();

  // Speed streaks
  if (
    !options.reducedMotion &&
    (engine.phase === "playing" || engine.phase === "over")
  ) {
    ctx.save();
    ctx.fillStyle = "rgba(167, 139, 250, 0.1)";
    for (let index = 0; index < 7; index += 1) {
      const streakX = mod(
        hash(index * 11.3) * width - distance * 1.4,
        width + 140,
      );
      const streakY = 40 + hash(index * 13.7) * (horizon - 100);
      const streakLength = 34 + hash(index * 6.1) * 96;
      ctx.fillRect(streakX, streakY, streakLength, 1);
    }
    ctx.restore();
  }

  // Ground
  const groundFill = ctx.createLinearGradient(0, horizon, 0, height);
  groundFill.addColorStop(0, "#0b0e18");
  groundFill.addColorStop(0.35, "#080a11");
  groundFill.addColorStop(1, "#040509");
  ctx.fillStyle = groundFill;
  ctx.fillRect(0, horizon, width, WORLD.ground);

  const groundLine = ctx.createLinearGradient(0, 0, width, 0);
  groundLine.addColorStop(0, "rgba(121, 60, 255, 0.55)");
  groundLine.addColorStop(0.45, "rgba(102, 224, 255, 0.55)");
  groundLine.addColorStop(1, "rgba(39, 120, 255, 0.5)");
  ctx.shadowColor = "rgba(102, 224, 255, 0.6)";
  ctx.shadowBlur = 10;
  ctx.fillStyle = groundLine;
  ctx.fillRect(0, horizon - 1, width, 1.6);
  ctx.shadowBlur = 0;

  ctx.fillStyle = "rgba(245, 246, 250, 0.07)";
  const dashOffset = mod(distance * 0.9, 110);
  for (let x = -110 + dashOffset; x < width + 110; x += 110) {
    ctx.fillRect(x, horizon + 9, 28, 1.4);
  }
}

function drawGates(
  ctx: CanvasRenderingContext2D,
  engine: BarukEngine,
  options: RenderOptions,
) {
  const horizon = engine.height - WORLD.ground;

  for (const gate of engine.gates) {
    const topHeight = gate.gapY - gate.gapHeight / 2;
    const bottomY = gate.gapY + gate.gapHeight / 2;
    const bottomHeight = horizon - bottomY;
    const nearRobot = Math.abs(gate.x - engine.robot.x) < 220;

    drawGateColumn(ctx, gate, 0, topHeight, "top", options);
    drawGateColumn(
      ctx,
      gate,
      bottomY,
      Math.max(0, bottomHeight),
      "bottom",
      options,
    );

    // Energy field inside the opening
    const field = ctx.createLinearGradient(0, topHeight, 0, bottomY);
    field.addColorStop(0, "rgba(102, 224, 255, 0.09)");
    field.addColorStop(0.5, "rgba(102, 224, 255, 0.01)");
    field.addColorStop(1, "rgba(121, 60, 255, 0.08)");
    ctx.fillStyle = field;
    ctx.fillRect(gate.x + 8, topHeight, gate.width - 16, bottomY - topHeight);

    drawCap(ctx, gate.x - 6, topHeight - 17, gate.width + 12, 17, "top", nearRobot);
    drawCap(ctx, gate.x - 6, bottomY, gate.width + 12, 17, "bottom", nearRobot);

    // Emitter node
    const nodeY = topHeight - 8.5;
    const nodeGlow = 0.6 + (options.reducedMotion ? 0 : Math.sin(engine.time * 3 + gate.id) * 0.25);
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    const node = ctx.createRadialGradient(
      gate.x + gate.width / 2,
      nodeY,
      0,
      gate.x + gate.width / 2,
      nodeY,
      16,
    );
    node.addColorStop(0, `rgba(102, 224, 255, ${0.5 * nodeGlow})`);
    node.addColorStop(1, "rgba(102, 224, 255, 0)");
    ctx.fillStyle = node;
    ctx.fillRect(gate.x + gate.width / 2 - 16, nodeY - 16, 32, 32);
    ctx.restore();
  }
}

function drawGateColumn(
  ctx: CanvasRenderingContext2D,
  gate: Gate,
  y: number,
  height: number,
  side: "top" | "bottom",
  options: RenderOptions,
) {
  if (height <= 0.5) return;
  const { x, width } = gate;

  const body = ctx.createLinearGradient(x, 0, x + width, 0);
  body.addColorStop(0, "#090b12");
  body.addColorStop(0.16, "#1b1f31");
  body.addColorStop(0.42, "#2b3049");
  body.addColorStop(0.62, "#232738");
  body.addColorStop(0.86, "#12151f");
  body.addColorStop(1, "#06070b");
  ctx.fillStyle = body;
  ctx.fillRect(x, y, width, height);

  ctx.strokeStyle = "rgba(245, 246, 250, 0.055)";
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, width - 1, height - 1);

  // Inner energy seam facing the play area
  const seamX = x + width - 8;
  const seam = ctx.createLinearGradient(0, y, 0, y + height);
  if (side === "top") {
    seam.addColorStop(0, "rgba(121, 60, 255, 0.24)");
    seam.addColorStop(0.7, "rgba(121, 60, 255, 0.5)");
    seam.addColorStop(1, "rgba(102, 224, 255, 0.85)");
  } else {
    seam.addColorStop(0, "rgba(102, 224, 255, 0.85)");
    seam.addColorStop(0.3, "rgba(121, 60, 255, 0.5)");
    seam.addColorStop(1, "rgba(121, 60, 255, 0.24)");
  }
  ctx.save();
  ctx.shadowColor = side === "top" ? VIOLET : CYAN;
  ctx.shadowBlur = 14;
  ctx.fillStyle = seam;
  ctx.fillRect(seamX, y + 4, 2, Math.max(0, height - 8));
  ctx.restore();

  // Panel details
  ctx.fillStyle = "rgba(245, 246, 250, 0.045)";
  const start = side === "top" ? y + height - 30 : y + 24;
  for (let lineY = start; lineY > y + 12 && lineY < y + height - 10; lineY -= 46) {
    ctx.fillRect(x + 14, lineY, width - 30, 1);
  }

  ctx.fillStyle = "rgba(167, 139, 250, 0.22)";
  for (let boltY = y + 18; boltY < y + height - 16; boltY += 52) {
    ctx.fillRect(x + 10, boltY, 2, 2);
    ctx.fillRect(x + width - 16, boltY + 10, 2, 2);
  }

  // Hazard ticks near the opening
  ctx.fillStyle = "rgba(102, 224, 255, 0.2)";
  const tickBase = side === "top" ? y + height - 40 : y + 24;
  for (let tick = 0; tick < 4; tick += 1) {
    ctx.fillRect(x + 18 + tick * 13, tickBase, 7, 2);
  }

  if (!options.reducedMotion) {
    const pulse = 0.35 + Math.sin((y + gate.id * 31) / 40 + gate.x / 70) * 0.2;
    ctx.fillStyle = `rgba(121, 60, 255, ${0.1 + pulse * 0.12})`;
    ctx.fillRect(x + width * 0.5 - 10, y + 6, 20, height - 12);
  }
}

function drawCap(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  side: "top" | "bottom",
  nearRobot: boolean,
) {
  roundedPath(ctx, x, y, width, height, 4);
  const fill = ctx.createLinearGradient(0, y, 0, y + height);
  fill.addColorStop(0, "#303650");
  fill.addColorStop(0.55, "#1a1e2d");
  fill.addColorStop(1, "#0c0e16");
  ctx.fillStyle = fill;
  ctx.fill();

  ctx.strokeStyle = nearRobot
    ? "rgba(167, 139, 250, 0.55)"
    : "rgba(167, 139, 250, 0.25)";
  ctx.lineWidth = 1;
  ctx.stroke();

  const edgeY = side === "top" ? y + height - 1.6 : y + 0.8;
  const edge = ctx.createLinearGradient(x, 0, x + width, 0);
  edge.addColorStop(0, "rgba(121, 60, 255, 0.25)");
  edge.addColorStop(0.5, "rgba(102, 224, 255, 0.95)");
  edge.addColorStop(1, "rgba(121, 60, 255, 0.3)");
  ctx.save();
  ctx.shadowColor = nearRobot ? CYAN : "rgba(102, 224, 255, 0.6)";
  ctx.shadowBlur = nearRobot ? 16 : 9;
  ctx.fillStyle = edge;
  ctx.fillRect(x + 4, edgeY, width - 8, 1.8);
  ctx.restore();

  ctx.fillStyle = "rgba(245, 246, 250, 0.35)";
  ctx.fillRect(x + width / 2 - 6, side === "top" ? y + height - 6 : y + 5, 12, 1);
}

function drawParticles(
  ctx: CanvasRenderingContext2D,
  engine: BarukEngine,
) {
  if (engine.particles.length === 0) return;

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (const particle of engine.particles) {
    const alpha = clamp01(particle.life / particle.maxLife);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(
      particle.x,
      particle.y,
      Math.max(0.4, particle.size * alpha),
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }
  ctx.restore();
}

function drawRobot(
  ctx: CanvasRenderingContext2D,
  engine: BarukEngine,
  options: RenderOptions,
) {
  const { x, y, rotation, wing } = engine.robot;
  const { time, phase } = engine;
  const playing = phase === "playing";
  const flicker = options.reducedMotion
    ? 0.55
    : 0.55 + Math.sin(time * 34) * 0.22;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  // Thruster glow
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  const glow = ctx.createRadialGradient(-24, 5, 0, -24, 5, 40);
  glow.addColorStop(0, `rgba(102, 224, 255, ${0.34 * flicker})`);
  glow.addColorStop(0.5, "rgba(121, 60, 255, 0.14)");
  glow.addColorStop(1, "rgba(121, 60, 255, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(-74, -35, 90, 80);

  const flameLength = (playing ? 20 : 10) + flicker * 15;
  const flame = ctx.createLinearGradient(-22, 0, -22 - flameLength, 0);
  flame.addColorStop(0, "rgba(102, 224, 255, 0.95)");
  flame.addColorStop(0.45, "rgba(121, 60, 255, 0.55)");
  flame.addColorStop(1, "rgba(121, 60, 255, 0)");
  ctx.fillStyle = flame;
  ctx.beginPath();
  ctx.moveTo(-19, -6);
  ctx.lineTo(-22 - flameLength, 0);
  ctx.lineTo(-19, 9);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Rear wing
  ctx.save();
  ctx.translate(-7, 2);
  ctx.rotate(-0.12 - wing * 0.42);
  const wingGradient = ctx.createLinearGradient(-32, -12, 2, 12);
  wingGradient.addColorStop(0, "#303650");
  wingGradient.addColorStop(0.55, "#171b28");
  wingGradient.addColorStop(1, "#0b0d15");
  ctx.beginPath();
  ctx.moveTo(0, -12);
  ctx.quadraticCurveTo(-24, -18 - wing * 6, -32, -3);
  ctx.quadraticCurveTo(-27, 9, -7, 10);
  ctx.closePath();
  ctx.fillStyle = wingGradient;
  ctx.fill();
  ctx.strokeStyle = "rgba(167, 139, 250, 0.4)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();

  // Legs
  const legGradient = ctx.createLinearGradient(0, 16, 0, 34);
  legGradient.addColorStop(0, "#2a2f45");
  legGradient.addColorStop(1, "#0d0f18");
  ctx.fillStyle = legGradient;
  roundedPath(ctx, -10, 20, 13, 11, 4);
  ctx.fill();
  roundedPath(ctx, 5, 18, 13, 13, 4);
  ctx.fill();
  ctx.strokeStyle = "rgba(167, 139, 250, 0.22)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Body
  const body = ctx.createLinearGradient(-18, -18, 18, 24);
  body.addColorStop(0, "#3a4160");
  body.addColorStop(0.32, "#232838");
  body.addColorStop(0.72, "#151823");
  body.addColorStop(1, "#0a0c14");
  roundedPath(ctx, -18, -18, 35, 40, 15);
  ctx.fillStyle = body;
  ctx.fill();
  ctx.strokeStyle = "rgba(167, 139, 250, 0.32)";
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Shoulder plate
  ctx.fillStyle = "rgba(245, 246, 250, 0.06)";
  roundedPath(ctx, -14, -13, 19, 7, 3.5);
  ctx.fill();

  // Vent lines
  ctx.fillStyle = "rgba(245, 246, 250, 0.14)";
  for (let index = 0; index < 3; index += 1) {
    ctx.fillRect(6, 8 + index * 4, 10 - index * 2, 1.2);
  }

  // Core reactor
  const corePulse = options.reducedMotion
    ? 0.8
    : 0.72 + Math.sin(time * 3.4) * 0.18;
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  const coreGlow = ctx.createRadialGradient(8, 1, 0, 8, 1, 17);
  coreGlow.addColorStop(0, `rgba(167, 139, 250, ${0.55 * corePulse})`);
  coreGlow.addColorStop(0.5, "rgba(121, 60, 255, 0.22)");
  coreGlow.addColorStop(1, "rgba(121, 60, 255, 0)");
  ctx.fillStyle = coreGlow;
  ctx.fillRect(-9, -16, 34, 34);
  ctx.restore();

  const core = ctx.createLinearGradient(3, -4, 13, 6);
  core.addColorStop(0, "#d9ccff");
  core.addColorStop(0.4, "#a78bfa");
  core.addColorStop(1, "#793cff");
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(8, 1, 5.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(245, 246, 250, 0.5)";
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // Neck
  ctx.fillStyle = "#10131d";
  ctx.fillRect(-1, -12, 12, 10);
  ctx.fillStyle = "rgba(167, 139, 250, 0.28)";
  ctx.fillRect(-1, -10, 12, 1);

  // Helmet
  const helmet = ctx.createRadialGradient(-1, -28, 2, 3, -22, 22);
  helmet.addColorStop(0, "#414968");
  helmet.addColorStop(0.55, "#242a3d");
  helmet.addColorStop(1, "#0d0f18");
  ctx.beginPath();
  ctx.arc(4, -22, 17, 0, Math.PI * 2);
  ctx.fillStyle = helmet;
  ctx.fill();
  ctx.strokeStyle = "rgba(167, 139, 250, 0.34)";
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Helmet lower jaw
  ctx.fillStyle = "rgba(8, 9, 13, 0.55)";
  roundedPath(ctx, -5, -14, 20, 7, 3);
  ctx.fill();

  // Ear pod
  ctx.beginPath();
  ctx.arc(-10, -21, 5.4, 0, Math.PI * 2);
  ctx.fillStyle = "#161a26";
  ctx.fill();
  ctx.strokeStyle = "rgba(121, 60, 255, 0.6)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = "rgba(102, 224, 255, 0.7)";
  ctx.fillRect(-11, -22, 2, 2);

  // Visor
  ctx.save();
  ctx.shadowColor = "rgba(102, 224, 255, 0.75)";
  ctx.shadowBlur = options.reducedMotion ? 6 : 13;
  const visor = ctx.createLinearGradient(-4, -28, 17, -17);
  visor.addColorStop(0, "#9df2ff");
  visor.addColorStop(0.42, "#66e0ff");
  visor.addColorStop(0.72, "#2778ff");
  visor.addColorStop(1, "#793cff");
  ctx.fillStyle = visor;
  roundedPath(ctx, -5, -28.5, 22, 11.5, 5.6);
  ctx.fill();
  ctx.restore();

  // Visor reflections
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  roundedPath(ctx, -2.5, -26.6, 13, 1.5, 0.75);
  ctx.fill();
  ctx.fillStyle = "rgba(8, 9, 13, 0.45)";
  ctx.fillRect(12.5, -24.5, 2.5, 2.5);

  if (!options.reducedMotion) {
    // Moving visor scan line
    ctx.save();
    roundedPath(ctx, -5, -28.5, 22, 11.5, 5.6);
    ctx.clip();
    const scanY = -28.5 + mod(time * 16, 11.5);
    ctx.fillStyle = "rgba(255, 255, 255, 0.16)";
    ctx.fillRect(-5, scanY, 22, 1);
    ctx.restore();
  }

  // Helmet crest
  const crest = ctx.createLinearGradient(-10, -44, 12, -30);
  crest.addColorStop(0, "#3a4160");
  crest.addColorStop(1, "#12151f");
  ctx.beginPath();
  ctx.moveTo(-10, -35);
  ctx.lineTo(3, -45);
  ctx.lineTo(13, -38);
  ctx.lineTo(9, -31);
  ctx.closePath();
  ctx.fillStyle = crest;
  ctx.fill();
  ctx.strokeStyle = "rgba(167, 139, 250, 0.55)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Antenna
  ctx.strokeStyle = "rgba(167, 139, 250, 0.55)";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-7, -37);
  ctx.lineTo(-14, -51);
  ctx.stroke();
  const antennaPulse = options.reducedMotion
    ? 1
    : 0.55 + Math.sin(time * 4.5) * 0.45;
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.fillStyle = `rgba(102, 224, 255, ${0.55 + antennaPulse * 0.35})`;
  ctx.beginPath();
  ctx.arc(-14, -51, 2.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Front arm
  ctx.save();
  ctx.translate(4, 2);
  ctx.rotate(-0.16 + wing * 0.55);
  const arm = ctx.createLinearGradient(0, -5, 0, 8);
  arm.addColorStop(0, "#333a56");
  arm.addColorStop(1, "#10131d");
  ctx.fillStyle = arm;
  roundedPath(ctx, 0, -5, 21, 10, 5);
  ctx.fill();
  ctx.strokeStyle = "rgba(167, 139, 250, 0.26)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = "#1b2030";
  ctx.beginPath();
  ctx.arc(21, 0, 4.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(102, 224, 255, 0.4)";
  ctx.lineWidth = 0.9;
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}

function drawForeground(
  ctx: CanvasRenderingContext2D,
  engine: BarukEngine,
  options: RenderOptions,
) {
  const { width, height, flash } = engine;

  // Vignette
  const vignette = ctx.createRadialGradient(
    width / 2,
    height * 0.48,
    height * 0.18,
    width / 2,
    height * 0.52,
    Math.max(width, height) * 0.78,
  );
  vignette.addColorStop(0, "rgba(4, 5, 9, 0)");
  vignette.addColorStop(0.72, "rgba(4, 5, 9, 0.18)");
  vignette.addColorStop(1, "rgba(4, 5, 9, 0.62)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);

  // Scanlines
  ctx.fillStyle = "rgba(0, 0, 0, 0.09)";
  for (let lineY = 0; lineY < height; lineY += 6) {
    ctx.fillRect(0, lineY, width, 1);
  }

  // Top edge glow
  const topGlow = ctx.createLinearGradient(0, 0, width, 0);
  topGlow.addColorStop(0, "rgba(121, 60, 255, 0.28)");
  topGlow.addColorStop(0.5, "rgba(39, 120, 255, 0.18)");
  topGlow.addColorStop(1, "rgba(121, 60, 255, 0.24)");
  ctx.fillStyle = topGlow;
  ctx.fillRect(0, 0, width, 1.4);

  if (flash > 0.001) {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = `rgba(167, 139, 250, ${clamp01(flash) * 0.3})`;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  if (options.reducedMotion) {
    ctx.fillStyle = "rgba(8, 9, 13, 0.12)";
    ctx.fillRect(0, 0, width, height);
  }
}
