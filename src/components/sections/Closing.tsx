import { ArrowRight } from "lucide-react";
import { closingCopy } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Closing() {
  return (
    <section
      id="jornada"
      className="relative scroll-mt-24 overflow-hidden border-b border-line py-20 sm:py-24 lg:py-28"
    >
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="grid-backdrop absolute inset-0 opacity-40" />
        <div className="aurora left-1/2 top-1/2 h-[40rem] w-[62rem] max-w-[110vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(121,0,255,0.2),rgba(8,123,255,0.1)_46%,transparent_70%)]" />
      </div>

      <div className="container-page relative">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-[rgba(80,110,255,0.28)] bg-[linear-gradient(135deg,rgba(14,10,44,0.92)_0%,rgba(5,14,38,0.94)_52%,rgba(1,7,25,0.98)_100%)] px-6 py-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_50px_120px_-60px_rgba(0,0,0,1)] sm:px-9 sm:py-12 lg:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(121,0,255,0.28),transparent_66%)] blur-2xl"
            />
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 top-1/2 h-[34rem] w-[34rem] max-w-[120vw] -translate-y-1/2 opacity-50"
              viewBox="0 0 800 800"
              fill="none"
            >
              <circle
                cx="400"
                cy="400"
                r="290"
                stroke="#7900ff"
                strokeOpacity="0.26"
                strokeDasharray="2 14"
              />
              <circle
                cx="400"
                cy="400"
                r="356"
                stroke="#087bff"
                strokeOpacity="0.2"
                strokeDasharray="1 18"
              />
              <circle cx="400" cy="110" r="3" fill="#00cfff" />
              <circle cx="690" cy="400" r="2.5" fill="#a020f0" />
            </svg>

            <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="lg:col-span-6">
                <SectionLabel index="08">{closingCopy.eyebrow}</SectionLabel>

                <h2 className="mt-6 text-balance font-display text-[clamp(2.1rem,4vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-ink">
                  {closingCopy.title}
                  <span className="mt-1.5 block text-gradient">
                    {closingCopy.titleAccent}
                  </span>
                </h2>

                <p className="mt-5 max-w-xl text-pretty text-sm leading-7 text-muted sm:text-[0.95rem]">
                  {closingCopy.description}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={closingCopy.cta.href}
                    className="group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full bg-[linear-gradient(110deg,#a020f0_0%,#7900ff_46%,#087bff_100%)] px-6 text-sm font-semibold text-white shadow-[0_18px_60px_-18px_rgba(121,0,255,1)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_26px_rgba(121,0,255,0.5),0_26px_70px_-18px_rgba(8,123,255,0.95)]"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.3),transparent)] transition-transform duration-700 group-hover:translate-x-full"
                    />
                    {closingCopy.cta.label}
                    <ArrowRight
                      size={16}
                      strokeWidth={1.9}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>

                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted/60">
                    Resposta em até 2 dias úteis
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6">
                <Reveal delay={0.1}>
                  <ul className="divide-y divide-white/10 border-y border-white/10">
                    {closingCopy.pillars.map((pillar) => (
                      <li
                        key={pillar.index}
                        className="diff-item group flex items-start gap-5 px-1 py-5"
                      >
                        <span className="mt-0.5 font-mono text-[9px] tracking-[0.22em] text-violet-soft">
                          {pillar.index}
                        </span>
                        <div className="flex-1">
                          <h3 className="font-display text-lg font-semibold tracking-[-0.025em] text-ink sm:text-xl">
                            {pillar.title}
                          </h3>
                          <p className="mt-1.5 text-[12.5px] leading-6 text-muted">
                            {pillar.description}
                          </p>
                        </div>
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full border border-white/20 transition-colors duration-500 group-hover:border-cyan group-hover:bg-cyan/60 group-hover:shadow-[0_0_10px_#00cfff]"
                        />
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
