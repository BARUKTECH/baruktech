import { ArrowUpRight } from "lucide-react";
import { services, serviceNote } from "@/content/services";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Services() {
  return (
    <section
      id="servicos"
      className="relative scroll-mt-24 border-b border-line bg-surface/20 py-24 sm:py-32 lg:py-40"
    >
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Reveal className="lg:col-span-7">
            <SectionLabel index="06">Serviços</SectionLabel>
            <SectionHeading className="mt-8">
              Do problema ao{" "}
              <span className="text-gradient">sistema.</span>
            </SectionHeading>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="text-pretty text-sm leading-7 text-muted sm:text-base sm:leading-8">
              Serviços desenhados para diferentes estágios de maturidade — sem
              pacotes genéricos e sem promessas que o código não sustenta.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 border-t border-line lg:mt-16">
          {services.map((service, index) => (
            <Reveal key={service.index} delay={Math.min(index * 0.05, 0.2)}>
              <article className="group relative grid gap-5 border-b border-line px-4 py-8 transition-colors duration-500 hover:bg-white/[0.02] sm:px-6 lg:grid-cols-12 lg:items-start lg:gap-8 lg:py-9">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-gradient-to-b from-violet to-blue transition-transform duration-500 group-hover:scale-y-100"
                />

                <div className="flex items-baseline gap-4 lg:col-span-2">
                  <span className="font-mono text-[9px] tracking-[0.2em] text-violet-soft">
                    {service.index}
                  </span>
                  <span className="h-px w-6 bg-white/10 lg:hidden" />
                </div>

                <h3 className="font-display text-xl font-medium tracking-[-0.025em] text-ink lg:col-span-4 sm:text-2xl">
                  {service.title}
                </h3>

                <p className="max-w-md text-pretty text-sm leading-6 text-muted lg:col-span-3">
                  {service.description}
                </p>

                <ul className="flex flex-wrap items-start gap-2 lg:col-span-3 lg:justify-end">
                  {service.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-muted/80"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[9px] uppercase leading-5 tracking-[0.16em] text-muted/80">
              {serviceNote}
            </p>
            <a
              href="#contato"
              className="group inline-flex w-fit items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink transition-colors hover:text-violet-soft"
            >
              Falar sobre um projeto
              <ArrowUpRight
                size={13}
                strokeWidth={1.8}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
