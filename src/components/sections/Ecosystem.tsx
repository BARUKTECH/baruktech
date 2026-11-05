import {
  ArrowUpRight,
  BrainCircuit,
  Building2,
  Code2,
  GraduationCap,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import {
  ecosystem,
  ecosystemNote,
  type EcosystemIcon,
} from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";

const icons: Record<EcosystemIcon, LucideIcon> = {
  code: Code2,
  graduation: GraduationCap,
  brain: BrainCircuit,
  store: ShoppingBag,
  building: Building2,
};

const tones = {
  violet: {
    card: "bg-[linear-gradient(158deg,rgba(52,10,96,0.9)_0%,rgba(13,10,42,0.94)_52%,rgba(1,7,25,0.98)_100%)]",
    tile: "border-violet/40 bg-[linear-gradient(150deg,rgba(160,32,240,0.35),rgba(8,123,255,0.12))] text-[#d3aaff]",
    glow: "bg-violet/30",
    line: "from-violet/0 via-violet to-blue/0",
  },
  blue: {
    card: "bg-[linear-gradient(158deg,rgba(8,42,96,0.9)_0%,rgba(8,20,52,0.94)_52%,rgba(1,7,25,0.98)_100%)]",
    tile: "border-blue/40 bg-[linear-gradient(150deg,rgba(8,123,255,0.34),rgba(0,207,255,0.12))] text-blue-soft",
    glow: "bg-blue/30",
    line: "from-blue/0 via-blue to-cyan/0",
  },
  cyan: {
    card: "bg-[linear-gradient(158deg,rgba(6,56,86,0.9)_0%,rgba(6,24,48,0.94)_52%,rgba(1,7,25,0.98)_100%)]",
    tile: "border-cyan/40 bg-[linear-gradient(150deg,rgba(0,207,255,0.3),rgba(8,123,255,0.12))] text-cyan",
    glow: "bg-cyan/25",
    line: "from-cyan/0 via-cyan to-violet/0",
  },
} as const;

export function Ecosystem() {
  return (
    <section
      id="ecossistema"
      className="relative scroll-mt-24 overflow-hidden border-b border-line py-20 sm:py-24 lg:py-28"
    >
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="grid-backdrop absolute inset-0 opacity-40" />
        <div className="aurora -right-[16%] top-0 h-[40rem] w-[40rem] bg-[radial-gradient(circle,rgba(121,0,255,0.16),transparent_66%)]" />
        <div className="aurora -left-[18%] bottom-0 h-[34rem] w-[34rem] bg-[radial-gradient(circle,rgba(8,123,255,0.14),transparent_66%)]" />
      </div>

      <div className="container-page relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Reveal className="lg:col-span-7">
            <SectionLabel index="01">Ecossistema</SectionLabel>
            <SectionHeading className="mt-7">
              Nosso <span className="text-gradient">Ecossistema</span>
            </SectionHeading>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="text-pretty text-sm leading-7 text-muted sm:text-base sm:leading-8">
              Uma plataforma completa para aprender, desenvolver e crescer.
            </p>
          </Reveal>
        </div>

        <div className="eco-grid mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 xl:grid-cols-5">
          {ecosystem.map((item, index) => {
            const Icon = icons[item.icon];
            const tone = tones[item.tone];
            return (
              <Reveal
                key={item.id}
                delay={index * 0.06}
                className="flex"
              >
                <a
                  href={item.href}
                  aria-label={`${item.name} ${item.accent} — ${item.action}`}
                  className={`eco-card group relative flex w-full flex-col overflow-hidden rounded-[22px] border border-white/10 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/60 ${tone.card}`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${tone.line} opacity-80`}
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-60 transition-opacity duration-500 group-hover:opacity-100 ${tone.glow}`}
                  />

                  <div className="relative flex items-start justify-between gap-3">
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-2xl border ${tone.tile} transition-transform duration-500 group-hover:scale-105`}
                    >
                      <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[8px] tracking-[0.24em] text-white/35">
                      {item.index}
                    </span>
                  </div>

                  <div className="relative mt-5 flex items-start justify-between gap-2">
                    <h3 className="font-display text-[1.06rem] font-semibold leading-tight tracking-[-0.03em] text-ink">
                      {item.name}{" "}
                      <span className="text-gradient">{item.accent}</span>
                    </h3>
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.8}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-white/35 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-soft"
                    />
                  </div>

                  <p className="relative mt-2.5 text-[12.5px] leading-5 text-muted">
                    {item.description}
                  </p>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.08}>
          <p className="mt-8 max-w-3xl font-mono text-[8px] uppercase leading-5 tracking-[0.16em] text-muted/70">
            {ecosystemNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
