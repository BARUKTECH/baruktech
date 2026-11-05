import { ArrowDown } from "lucide-react";
import { labExperiment } from "@/content/lab";
import { Baruk01Player } from "@/components/game/Baruk01Player";
import { LabConsole } from "@/components/visual/LabConsole";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Lab() {
  return (
    <section
      id="laboratorio"
      className="relative scroll-mt-24 overflow-hidden border-b border-line bg-surface/20 py-24 sm:py-32 lg:py-40"
    >
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="grid-backdrop absolute inset-0 opacity-40" />
        <div className="absolute -left-[18%] top-1/3 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(121,0,255,0.1),transparent_66%)]" />
        <div className="absolute -right-[12%] bottom-0 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(8,123,255,0.1),transparent_66%)]" />
      </div>

      <div className="container-page relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionLabel index="04">Laboratório</SectionLabel>
              <SectionHeading className="mt-8">
                Primeiro experimento:{" "}
                <span className="text-gradient">BARUK-01.</span>
              </SectionHeading>
              <p className="mt-6 max-w-xl text-pretty text-sm leading-7 text-muted sm:text-base sm:leading-8">
                {labExperiment.summary}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-7 sm:grid-cols-3">
                {labExperiment.specs.map((spec) => (
                  <div key={spec.label}>
                    <dt className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted/80">
                      {spec.label}
                    </dt>
                    <dd className="mt-1.5 text-[13px] leading-5 text-ink">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.18}>
              <ul className="mt-8 grid gap-3 border-t border-line pt-7 sm:grid-cols-2">
                {labExperiment.systems.map((system) => (
                  <li
                    key={system}
                    className="flex items-start gap-3 text-[13px] leading-5 text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet shadow-[0_0_8px_#793cff]"
                    />
                    {system}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                <span className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-violet-soft">
                  {labExperiment.status}
                </span>
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted/80">
                  {labExperiment.stage}
                </span>
                <a
                  href="#baruk-01"
                  className="group inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.18em] text-violet-soft transition-colors hover:text-ink"
                >
                  Jogar {labExperiment.code}
                  <span className="grid h-6 w-6 place-items-center rounded-full border border-white/15 transition-colors group-hover:border-white/30">
                    <ArrowDown
                      size={11}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-6 lg:pl-6">
            <LabConsole />
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <Baruk01Player />
        </Reveal>
      </div>
    </section>
  );
}
