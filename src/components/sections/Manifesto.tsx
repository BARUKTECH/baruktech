import { siteConfig } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

export function Manifesto() {
  const { manifesto } = siteConfig;

  return (
    <section
      id="manifesto"
      className="relative scroll-mt-24 border-b border-line py-24 sm:py-32 lg:py-40"
    >
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <SectionLabel index="02">Manifesto</SectionLabel>
            <p className="mt-6 max-w-[16rem] font-mono text-[9px] uppercase leading-5 tracking-[0.18em] text-muted/80">
              Engenharia, design e educação tratados como um único sistema.
            </p>
            <div className="mt-10 hidden items-center gap-3 lg:flex">
              <span className="h-px flex-1 bg-line" />
              <span className="font-mono text-[8px] tracking-[0.2em] text-muted/80">
                A/B
              </span>
            </div>
          </div>

          <div className="lg:col-span-9">
            <Reveal>
              <h2 className="max-w-[58rem] text-balance font-display text-[clamp(2.1rem,4.5vw,4.4rem)] font-medium leading-[1.03] tracking-[-0.045em] text-ink">
                {manifesto.lead}{" "}
                <span className="text-muted">{manifesto.accent}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-8 max-w-2xl text-pretty text-sm leading-7 text-muted sm:text-base sm:leading-8">
                {manifesto.body}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-12 flex items-center gap-4 font-mono text-[8px] uppercase tracking-[0.24em] text-muted/80">
                <span className="h-px w-12 bg-violet/60" />
                Princípios operacionais
              </div>
            </Reveal>
          </div>
        </div>

        <div
          id="principios"
          className="mt-20 grid scroll-mt-24 border-t border-line sm:mt-24 lg:grid-cols-3"
        >
          {manifesto.principles.map((principle, index) => (
            <Reveal
              key={principle.index}
              delay={index * 0.08}
              className={cn(
                "group relative border-b border-line py-8 lg:border-b-0 lg:py-10",
                index > 0 && "lg:border-l lg:pl-8",
                index < 2 && "lg:pr-8",
              )}
            >
              <article>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-[0.22em] text-violet-soft">
                    {principle.index}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full border border-white/15 transition-colors duration-500 group-hover:border-violet group-hover:bg-violet/40" />
                </div>

                <h3 className="mt-10 font-display text-2xl font-medium tracking-[-0.03em] text-ink">
                  {principle.title}
                </h3>
                <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
                  {principle.description}
                </p>

                <div className="mt-8 h-px w-0 bg-gradient-to-r from-violet to-blue transition-all duration-700 group-hover:w-full" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
