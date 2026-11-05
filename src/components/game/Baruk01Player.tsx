"use client";

import dynamic from "next/dynamic";

const Baruk01Game = dynamic(
  () => import("./Baruk01Game").then((module) => module.Baruk01Game),
  {
    ssr: false,
    loading: () => (
      <section
        aria-label="Carregando BARUK-01"
        className="relative mt-14 scroll-mt-24 overflow-hidden border border-white/10 bg-[#0a0c15] sm:mt-20"
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-4 py-4 sm:px-5">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-violet-soft">
              Experimento 01 · jogável
            </p>
            <p className="mt-1 font-display text-lg tracking-[-0.02em] text-ink sm:text-xl">
              BARUK-01 <span className="text-muted">/ Flight Challenge</span>
            </p>
          </div>
          <span className="status-dot h-1.5 w-1.5 rounded-full bg-violet-soft" />
        </div>
        <div className="relative grid h-[320px] place-items-center bg-[radial-gradient(circle_at_50%_45%,rgba(121,0,255,0.12),transparent_65%)] sm:h-[380px] lg:h-[480px]">
          <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-muted/80">
            Sincronizando unidade…
          </p>
        </div>
      </section>
    ),
  },
);

export function Baruk01Player() {
  return <Baruk01Game />;
}
