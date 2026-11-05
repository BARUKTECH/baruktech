import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { RobotStage } from "@/components/visual/RobotStage";
import { heroCopy } from "@/content/home";

const enter = (delay: number): CSSProperties => ({
  animationDelay: `${delay}ms`,
});

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-14 pt-28 sm:pt-32 lg:min-h-[clamp(680px,82svh,750px)] lg:pb-10 lg:pt-[6.5rem]"
    >
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="grid-backdrop absolute inset-0 opacity-60" />
        <div className="aurora -right-[16%] -top-[22%] h-[62vw] max-h-[900px] w-[62vw] max-w-[900px] bg-[radial-gradient(circle,rgba(121,0,255,0.26),transparent_64%)]" />
        <div className="aurora -left-[26%] top-[18%] h-[58vw] max-h-[760px] w-[58vw] max-w-[760px] bg-[radial-gradient(circle,rgba(8,123,255,0.18),transparent_66%)]" />
        <div className="absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,rgba(160,32,240,0.2),transparent_70%)]" />

        {/* diagonal energy lines + circuits */}
        <svg
          className="absolute inset-0 h-full w-full opacity-60"
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="hero-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#A020F0" stopOpacity="0" />
              <stop offset="0.5" stopColor="#7900FF" stopOpacity="0.5" />
              <stop offset="1" stopColor="#00CFFF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hero-circuit" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#087BFF" stopOpacity="0" />
              <stop offset="0.5" stopColor="#087BFF" stopOpacity="0.5" />
              <stop offset="1" stopColor="#087BFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          <g stroke="url(#hero-line)" strokeWidth="1">
            <path d="M-60 760 L430 -40" />
            <path d="M40 900 L560 -40" />
            <path d="M1080 940 L1620 -20" />
            <path d="M1200 940 L1740 -20" />
          </g>

          <path
            className="energy-line"
            d="M-60 760 L430 -40"
            stroke="#00CFFF"
            strokeOpacity="0.35"
          />

          <g stroke="url(#hero-circuit)" strokeWidth="1.2">
            <path d="M0 214 H180 L246 148 H360" />
            <path d="M1240 726 H1410 L1476 660 H1600" />
            <path d="M60 640 H210 L260 590" />
            <path d="M1330 260 H1480 L1530 210" />
          </g>
          <g fill="#00CFFF">
            <circle cx="360" cy="148" r="2.5" opacity="0.7" />
            <circle cx="1600" cy="660" r="2.5" opacity="0.6" />
            <circle cx="260" cy="590" r="2" opacity="0.5" />
            <circle cx="1530" cy="210" r="2" opacity="0.5" />
          </g>
        </svg>

        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent via-bg/60 to-bg" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="container-page relative z-10 grid flex-1 items-center gap-12 lg:grid-cols-12 lg:gap-8 xl:grid-cols-[minmax(0,1.02fr)_minmax(0,1.16fr)_minmax(0,0.68fr)] xl:gap-6">
        <div className="lg:col-span-7 xl:col-span-1">
          <div
            className="hero-rise flex flex-wrap items-center gap-3 font-mono text-[8px] uppercase tracking-[0.26em] text-muted"
            style={enter(0)}
          >
            <span className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_#00cfff]" />
              </span>
              {heroCopy.eyebrow}
            </span>
            <span aria-hidden="true" className="h-px w-8 bg-white/15" />
            <span className="text-muted/70">{heroCopy.system}</span>
          </div>

          <h1 className="mt-6">
            <span className="sr-only">
              BARUK TECH — Digital Ecosystem. {heroCopy.headline}{" "}
              {heroCopy.headlineAccent} {heroCopy.tagline}
            </span>

            <span
              aria-hidden="true"
              className="hero-rise block font-display text-[clamp(1.55rem,2.9vw,2.35rem)] font-bold leading-none tracking-[0.12em] text-ink"
              style={enter(70)}
            >
              {heroCopy.brand}
              <span className="text-gradient"> {heroCopy.brandAccent}</span>
            </span>

            <span
              aria-hidden="true"
              className="hero-rise mt-2.5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.5em] text-muted"
              style={enter(120)}
            >
              <span className="h-px w-10 bg-gradient-to-r from-violet to-transparent" />
              {heroCopy.subtitle}
            </span>

            <span
              aria-hidden="true"
              className="hero-rise mt-6 block text-balance font-display text-[clamp(2.55rem,4.6vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-ink"
              style={enter(190)}
            >
              {heroCopy.headline}{" "}
              <span className="relative inline-block">
                <span className="text-gradient">{heroCopy.headlineAccent}</span>
                <span
                  className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-violet/70 via-blue/60 to-transparent"
                  aria-hidden="true"
                />
              </span>
            </span>
          </h1>

          <p
            className="hero-rise mt-6 text-[0.98rem] font-semibold leading-7 text-ink/95 sm:text-lg"
            style={enter(280)}
          >
            {heroCopy.tagline}
          </p>

          <p
            className="hero-rise mt-2.5 max-w-[33rem] text-pretty text-sm leading-7 text-muted sm:text-[0.95rem]"
            style={enter(330)}
          >
            {heroCopy.description}
          </p>

          <ul
            className="hero-rise mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[8px] uppercase tracking-[0.22em] text-muted"
            style={enter(400)}
            aria-label="Áreas do ecossistema"
          >
            {heroCopy.categories.map((category, index) => (
              <li key={category} className="flex items-center gap-3">
                {index > 0 ? (
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-violet/70"
                  />
                ) : null}
                <span className="text-muted/90">{category}</span>
              </li>
            ))}
          </ul>

          <div
            className="hero-rise mt-8 flex flex-wrap items-center gap-3"
            style={enter(470)}
          >
            <a
              href={heroCopy.primaryCta.href}
              className="group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full bg-[linear-gradient(110deg,#a020f0_0%,#7900ff_46%,#087bff_100%)] px-6 text-sm font-semibold text-white shadow-[0_18px_50px_-16px_rgba(121,0,255,0.95)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_26px_rgba(121,0,255,0.5),0_24px_60px_-16px_rgba(8,123,255,0.9)]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.28),transparent)] transition-transform duration-700 group-hover:translate-x-full"
              />
              {heroCopy.primaryCta.label}
              <ArrowRight
                size={15}
                strokeWidth={1.9}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            <a
              href={heroCopy.secondaryCta.href}
              className="group inline-flex h-12 items-center gap-3 rounded-full border border-white/12 bg-white/[0.03] px-5 text-sm text-ink transition-colors duration-300 hover:border-violet/45 hover:bg-white/[0.06]"
            >
              {heroCopy.secondaryCta.label}
              <ArrowUpRight
                size={15}
                strokeWidth={1.8}
                aria-hidden="true"
                className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-soft"
              />
            </a>
          </div>
        </div>

        <div
          className="hero-fade relative lg:col-span-5 xl:col-span-1"
          style={enter(320)}
        >
          <p className="sr-only">
            Unidade robótica BARUK BX-01: busto humanóide com armadura branca e
            grafite, viseira ciano e núcleo de energia violeta. A unidade inclina
            levemente conforme o movimento do cursor, respira e pulsa em ciclo
            contínuo.
          </p>
          <RobotStage />
        </div>

        <aside
          className="hero-fade hidden xl:col-span-1 xl:flex xl:justify-end"
          style={enter(520)}
          aria-label="Panorama do ecossistema"
        >
          <div className="glass-panel w-full max-w-[19rem] rounded-[24px] p-5">
            <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-muted/80">
              Ecossistema / 2026
            </p>

            <p className="mt-5 font-display text-[3.4rem] font-semibold leading-none tracking-[-0.06em] text-gradient">
              05
            </p>
            <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.2em] text-muted">
              frentes integradas
            </p>

            <div className="mt-5 space-y-2.5 border-t border-white/10 pt-4">
              {heroCopy.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-baseline justify-between gap-3"
                >
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted/80">
                    {metric.label}
                  </span>
                  <span className="font-display text-sm font-semibold text-ink">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-5 border-t border-white/10 pt-4 text-[12px] leading-5 text-muted">
              {heroCopy.tagline}
            </p>

            <p className="mt-4 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-cyan">
              <span className="status-dot h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_#00cfff]" />
              Sistemas operacionais
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
