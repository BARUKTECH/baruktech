"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  ArrowUp,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { ReactNode } from "react";
import { BarukEngine, WORLD, type Phase } from "./baruk01/engine";
import { drawFrame } from "./baruk01/renderer";
import { GameAudio } from "./baruk01/audio";

const BEST_KEY = "baruk01:best";
const SOUND_KEY = "baruk01:sound";

const readStoredBest = () => {
  if (typeof window === "undefined") return 0;
  try {
    const value = Number(window.localStorage.getItem(BEST_KEY) ?? "0");
    return Number.isFinite(value) && value > 0 ? value : 0;
  } catch {
    return 0;
  }
};

const readSoundPreference = () => {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(SOUND_KEY) !== "on";
  } catch {
    return true;
  }
};

const statusLabels: Record<Phase, string> = {
  idle: "Pronto",
  playing: "Em voo",
  paused: "Pausado",
  over: "Sinal perdido",
};

const statusTones: Record<Phase, string> = {
  idle: "border-white/10 text-muted",
  playing: "border-cyan/30 bg-cyan/[0.08] text-cyan",
  paused: "border-violet/30 bg-violet/10 text-violet-soft",
  over: "border-[#ff9db0]/30 bg-[#ff9db0]/10 text-[#ff9db0]",
};

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="rounded-[4px] border border-white/15 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[8px] leading-none text-ink/80">
      {children}
    </kbd>
  );
}

export function Baruk01Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const retryRef = useRef<HTMLButtonElement>(null);
  const engineRef = useRef<BarukEngine | null>(null);
  const audioRef = useRef<GameAudio | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(readStoredBest);
  const [isNewBest, setIsNewBest] = useState(false);
  const [muted, setMuted] = useState(readSoundPreference);
  const [announcement, setAnnouncement] = useState("");
  const prefersReducedMotion = useReducedMotion();

  const bestRef = useRef(best);
  const mutedRef = useRef(muted);
  const scoreRef = useRef(0);
  const phaseRef = useRef<Phase>("idle");
  const bestTimerRef = useRef<number | null>(null);
  const reduceRef = useRef(false);

  useEffect(() => {
    reduceRef.current = Boolean(prefersReducedMotion);
    if (engineRef.current) {
      engineRef.current.reducedMotion = Boolean(prefersReducedMotion);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const engine = new BarukEngine();
    engine.reducedMotion = reduceRef.current;
    engineRef.current = engine;

    const audio = new GameAudio();
    audio.enabled = !mutedRef.current;
    audioRef.current = audio;

    let worldWidth = 960;

    const applySize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      const scale = rect.height / WORLD.height;
      worldWidth = rect.width / scale;
      engine.resize(worldWidth);
      ctx.setTransform(scale * dpr, 0, 0, scale * dpr, 0, 0);
    };

    applySize();
    const resizeObserver = new ResizeObserver(applySize);
    resizeObserver.observe(canvas);

    let visible = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (!visible) engine.pause();
      },
      { threshold: 0.08 },
    );
    intersectionObserver.observe(section);

    const onVisibilityChange = () => {
      if (document.hidden) engine.pause();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest("button, a, input, select, textarea"),
      );
      if (isInteractive) return;

      if (
        event.code === "Space" ||
        event.code === "ArrowUp" ||
        event.code === "KeyW"
      ) {
        if (engine.phase !== "playing") return;
        event.preventDefault();
        audio.unlock();
        engine.flap();
        return;
      }

      if (event.code === "KeyP" || event.code === "Escape") {
        if (engine.phase === "playing") {
          event.preventDefault();
          engine.pause();
        } else if (engine.phase === "paused") {
          event.preventDefault();
          audio.unlock();
          engine.resume();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);

    let frame = 0;
    let last = performance.now();

    const loop = (now: number) => {
      frame = window.requestAnimationFrame(loop);
      const delta = Math.min((now - last) / 1000, 1 / 20);
      last = now;

      if (!visible || document.hidden) return;

      engine.update(delta);

      while (engine.events.length > 0) {
        const event = engine.events.shift();
        if (event === "flap") audio.play("flap");
        else if (event === "score") audio.play("score");
        else if (event === "hit") audio.play("hit");
      }

      if (engine.score !== scoreRef.current) {
        scoreRef.current = engine.score;
        setScore(engine.score);
        setAnnouncement(`Pontuação ${engine.score}.`);
      }

      if (engine.phase !== phaseRef.current) {
        const nextPhase = engine.phase;
        phaseRef.current = nextPhase;
        setPhase(nextPhase);

        if (nextPhase === "over") {
          const finalScore = engine.score;
          const previousBest = bestRef.current;

          if (finalScore > previousBest) {
            bestRef.current = finalScore;
            setBest(finalScore);
            setIsNewBest(true);
            setAnnouncement(
              `Fim de voo. ${finalScore} pontos. Novo recorde salvo neste navegador.`,
            );
            try {
              window.localStorage.setItem(BEST_KEY, String(finalScore));
            } catch {
              // Ignore unavailable storage.
            }
            if (bestTimerRef.current) {
              window.clearTimeout(bestTimerRef.current);
            }
            bestTimerRef.current = window.setTimeout(
              () => audio.play("best"),
              560,
            );
          } else {
            setIsNewBest(false);
            setAnnouncement(
              `Fim de voo. ${finalScore} pontos. Recorde ${previousBest}.`,
            );
          }
        }
      }

      drawFrame(ctx, engine, {
        reducedMotion: reduceRef.current,
      });
    };

    frame = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("keydown", onKeyDown);
      if (bestTimerRef.current) {
        window.clearTimeout(bestTimerRef.current);
        bestTimerRef.current = null;
      }
      audio.dispose();
      engineRef.current = null;
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (phase === "playing") {
      surfaceRef.current?.focus({ preventScroll: true });
    } else if (phase === "over") {
      retryRef.current?.focus({ preventScroll: true });
    }
  }, [phase]);

  const startRun = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;
    if (bestTimerRef.current) {
      window.clearTimeout(bestTimerRef.current);
      bestTimerRef.current = null;
    }
    audioRef.current?.unlock();
    engine.start();
    scoreRef.current = 0;
    phaseRef.current = "playing";
    setPhase("playing");
    setScore(0);
    setIsNewBest(false);
    setAnnouncement(
      "Voo iniciado. Use espaço, seta para cima ou toque para subir.",
    );
  }, []);

  const flap = useCallback(() => {
    audioRef.current?.unlock();
    engineRef.current?.flap();
  }, []);

  const pauseRun = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;
    engine.pause();
    phaseRef.current = "paused";
    setPhase("paused");
    setAnnouncement("Voo pausado.");
  }, []);

  const resumeRun = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;
    audioRef.current?.unlock();
    engine.resume();
    phaseRef.current = "playing";
    setPhase("playing");
    setAnnouncement("Voo retomado.");
  }, []);

  const resetRun = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;
    engine.resetToIdle();
    phaseRef.current = "idle";
    setPhase("idle");
    scoreRef.current = 0;
    setScore(0);
    setIsNewBest(false);
    setAnnouncement("");
  }, []);

  const toggleSound = useCallback(() => {
    const nextMuted = !mutedRef.current;
    mutedRef.current = nextMuted;
    setMuted(nextMuted);

    const audio = audioRef.current;
    if (audio) {
      audio.setEnabled(!nextMuted);
      if (!nextMuted) {
        audio.unlock();
        audio.play("score");
      }
    }

    try {
      window.localStorage.setItem(SOUND_KEY, nextMuted ? "off" : "on");
    } catch {
      // Ignore unavailable storage.
    }
  }, []);

  const handleSurfacePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (phaseRef.current !== "playing") return;
      event.preventDefault();
      flap();
    },
    [flap],
  );

  const handleSurfaceKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.target !== event.currentTarget) return;
      if (
        phaseRef.current === "idle" &&
        (event.code === "Space" || event.code === "Enter")
      ) {
        event.preventDefault();
        startRun();
      }
    },
    [startRun],
  );

  const primaryButton =
    "inline-flex h-10 items-center justify-center gap-2 rounded-full bg-ink px-5 font-mono text-[9px] uppercase tracking-[0.18em] text-bg transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-soft";
  const ghostButton =
    "inline-flex h-10 items-center justify-center rounded-full border border-white/15 px-5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted transition-colors hover:border-white/30 hover:text-ink";

  return (
    <section
      ref={sectionRef}
      id="baruk-01"
      aria-labelledby="baruk-01-title"
      className="relative mt-14 scroll-mt-24 overflow-hidden border border-white/10 bg-[#0a0c15] sm:mt-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet/60 to-transparent"
      />

      <div className="flex flex-col gap-3 border-b border-white/[0.07] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-violet-soft">
            Experimento 01 · jogável
          </p>
          <h3
            id="baruk-01-title"
            className="mt-1 font-display text-lg tracking-[-0.02em] text-ink sm:text-xl"
          >
            BARUK-01 <span className="text-muted">/ Flight Challenge</span>
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-4 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
            <p className="flex items-baseline gap-1.5">
              <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-muted/80">
                Pts
              </span>
              <span className="font-mono text-sm tabular-nums leading-none text-ink">
                {String(score).padStart(2, "0")}
              </span>
            </p>
            <span aria-hidden="true" className="h-3 w-px bg-white/10" />
            <p className="flex items-baseline gap-1.5">
              <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-muted/80">
                Rec
              </span>
              <span className="font-mono text-sm tabular-nums leading-none text-ink">
                {String(best).padStart(2, "0")}
              </span>
            </p>
          </div>

          <span
            data-game-status={phase}
            className={`rounded-full border px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.16em] ${statusTones[phase]}`}
          >
            {statusLabels[phase]}
          </span>

          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={!muted}
            aria-label={muted ? "Ativar som do jogo" : "Desativar som do jogo"}
            className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-muted transition-colors hover:border-white/25 hover:text-ink"
          >
            {muted ? (
              <VolumeX size={13} strokeWidth={1.7} aria-hidden="true" />
            ) : (
              <Volume2 size={13} strokeWidth={1.7} aria-hidden="true" />
            )}
          </button>

          {(phase === "playing" || phase === "paused") && (
            <button
              type="button"
              onClick={phase === "playing" ? pauseRun : resumeRun}
              aria-label={phase === "playing" ? "Pausar voo" : "Retomar voo"}
              className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-muted transition-colors hover:border-white/25 hover:text-ink"
            >
              {phase === "playing" ? (
                <Pause size={13} strokeWidth={1.7} aria-hidden="true" />
              ) : (
                <Play size={13} strokeWidth={1.7} aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>

      <div className="relative h-[320px] touch-none select-none bg-[#07080d] sm:h-[380px] lg:h-[480px]">
        <div
          ref={surfaceRef}
          role="group"
          tabIndex={0}
          aria-label="Área do jogo BARUK-01. Use espaço, seta para cima ou W para subir. P para pausar."
          onPointerDown={handleSurfacePointerDown}
          onKeyDown={handleSurfaceKeyDown}
          className="absolute inset-0 z-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-soft/70"
        >
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="block h-full w-full"
          />
        </div>

        {phase === "idle" && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[linear-gradient(180deg,rgba(7,8,13,0.42),rgba(7,8,13,0.88))] px-5 py-6 text-center">
            <div className="max-w-md">
              <p className="font-mono text-[8px] uppercase tracking-[0.26em] text-violet-soft">
                Unidade pronta · protocolo 01
              </p>
              <h4 className="mt-2 font-display text-[clamp(1.6rem,4vw,2.5rem)] leading-none tracking-[-0.035em] text-ink">
                Flight Challenge
              </h4>
              <p className="mx-auto mt-3 max-w-sm text-pretty text-xs leading-5 text-muted sm:text-sm sm:leading-6">
                Guie o BARUK-01 pelas comportas de energia. Um toque para subir,
                outro para corrigir. A velocidade aumenta a cada ponto.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[8px] uppercase tracking-[0.16em] text-muted/80">
                <span className="flex items-center gap-1.5">
                  <Kbd>Espaço</Kbd>
                  <Kbd>
                    <ArrowUp
                      size={8}
                      strokeWidth={2.4}
                      aria-hidden="true"
                      className="inline"
                    />
                  </Kbd>
                  <Kbd>W</Kbd>
                  subir
                </span>
                <span className="flex items-center gap-1.5">
                  <Kbd>P</Kbd> pausar
                </span>
                <span className="flex items-center gap-1.5 sm:hidden">
                  Toque subir
                </span>
              </div>
              <button
                type="button"
                onClick={startRun}
                className={`${primaryButton} group mt-5`}
              >
                <Play
                  size={12}
                  strokeWidth={2.2}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                />
                Iniciar voo
              </button>
              <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.16em] text-muted/70">
                {best > 0
                  ? `Recorde local · ${best}`
                  : "Recorde salvo apenas neste navegador"}
              </p>
            </div>
          </div>
        )}

        {phase === "paused" && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[rgba(7,8,13,0.82)] px-5 py-6 text-center backdrop-blur-[2px]">
            <div className="max-w-sm">
              <p className="font-mono text-[8px] uppercase tracking-[0.26em] text-violet-soft">
                Voo suspenso
              </p>
              <h4 className="mt-2 font-display text-3xl tracking-[-0.03em] text-ink">
                Pausado
              </h4>
              <p className="mx-auto mt-2 max-w-xs text-pretty text-xs leading-5 text-muted">
                O sinal está estável. Retome quando estiver pronto.
              </p>
              <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={resumeRun}
                  className={primaryButton}
                >
                  <Play size={12} strokeWidth={2.2} aria-hidden="true" />
                  Retomar voo
                </button>
                <button
                  type="button"
                  onClick={resetRun}
                  className={ghostButton}
                >
                  Encerrar sessão
                </button>
              </div>
            </div>
          </div>
        )}

        {phase === "over" && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[rgba(7,8,13,0.84)] px-5 py-5 text-center backdrop-blur-[2px]">
            <div className="w-full max-w-sm">
              <p className="font-mono text-[8px] uppercase tracking-[0.26em] text-[#ff9db0]">
                Transmissão encerrada
              </p>
              <h4 className="mt-2 font-display text-3xl tracking-[-0.03em] text-ink">
                Sinal perdido
              </h4>

              {isNewBest ? (
                <p className="mt-2 inline-block rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-cyan">
                  Novo recorde
                </p>
              ) : (
                <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.16em] text-muted/70">
                  Ajuste o ângulo e tente outra rota
                </p>
              )}

              <dl className="mx-auto mt-4 flex max-w-[15rem] items-center justify-center gap-8">
                <div>
                  <dt className="font-mono text-[7px] uppercase tracking-[0.2em] text-muted/80">
                    Pontos
                  </dt>
                  <dd className="mt-1 font-display text-3xl tabular-nums leading-none text-ink">
                    {score}
                  </dd>
                </div>
                <div aria-hidden="true" className="h-9 w-px bg-white/10" />
                <div>
                  <dt className="font-mono text-[7px] uppercase tracking-[0.2em] text-muted/80">
                    Recorde
                  </dt>
                  <dd className="mt-1 font-display text-3xl tabular-nums leading-none text-ink">
                    {best}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row">
                <button
                  ref={retryRef}
                  type="button"
                  onClick={startRun}
                  className={primaryButton}
                >
                  <RotateCcw size={12} strokeWidth={2.2} aria-hidden="true" />
                  Voar novamente
                </button>
                <button
                  type="button"
                  onClick={resetRun}
                  className={ghostButton}
                >
                  Ver unidade
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-white/[0.07] px-4 py-3 font-mono text-[8px] uppercase tracking-[0.16em] text-muted/80 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="flex items-center gap-1.5">
            <Kbd>Espaço</Kbd>
            <Kbd>↑</Kbd>
            <Kbd>W</Kbd>
            voar
          </span>
          <span className="flex items-center gap-1.5">
            <Kbd>P</Kbd>
            pausa
          </span>
          <span className="hidden sm:inline">Toque para voar</span>
          <span className="hidden text-violet-soft/80 md:inline">
            Dificuldade progressiva
          </span>
        </div>
        <span>
          Recorde local · {best > 0 ? `${best} pts` : "sem registro"}
        </span>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </section>
  );
}
