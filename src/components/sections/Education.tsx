import {
  ArrowUpRight,
  GraduationCap,
  MessagesSquare,
  NotebookPen,
  Presentation,
} from "lucide-react";
import { education } from "@/content/services";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";

const icons = {
  graduation: GraduationCap,
  presentation: Presentation,
  notebook: NotebookPen,
  mentoring: MessagesSquare,
} as const;

export function Education() {
  return (
    <section
      id="educacao"
      className="relative scroll-mt-24 overflow-hidden border-b border-line py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[20%] top-0 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(8,123,255,0.08),transparent_66%)]"
      />

      <div className="container-page relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel index="07">Educação</SectionLabel>
              <SectionHeading className="mt-8">
                Ensinar é projetar{" "}
                <span className="text-gradient">compreensão.</span>
              </SectionHeading>
              <p className="mt-6 max-w-lg text-pretty text-sm leading-7 text-muted sm:text-base sm:leading-8">
                {education.body}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <ul className="mt-8 flex flex-wrap gap-2">
                {education.topics.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-full border border-white/[0.08] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-muted/80"
                  >
                    {topic}
                  </li>
                ))}
              </ul>

              <a
                href="#contato"
                className="group mt-8 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink transition-colors hover:text-violet-soft"
              >
                Levar isso para um grupo
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
              {education.formats.map((format, index) => {
                const Icon = icons[format.icon];
                return (
                  <Reveal
                    key={format.title}
                    delay={index * 0.06}
                    className="flex"
                  >
                    <article className="group flex flex-1 flex-col bg-bg p-6 transition-colors duration-500 hover:bg-surface/70">
                      <div className="flex items-center justify-between">
                        <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-muted transition-colors duration-500 group-hover:border-violet/40 group-hover:text-violet-soft">
                          <Icon size={17} strokeWidth={1.5} aria-hidden="true" />
                        </span>
                        <span className="font-mono text-[9px] tracking-[0.2em] text-muted/80">
                          0{index + 1}
                        </span>
                      </div>

                      <h3 className="mt-8 font-display text-xl font-medium tracking-[-0.025em] text-ink">
                        {format.title}
                      </h3>
                      <p className="mt-2.5 text-pretty text-[13px] leading-6 text-muted">
                        {format.description}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.15}>
              <p className="mt-5 font-mono text-[8px] uppercase leading-4 tracking-[0.16em] text-muted/80">
                Formatos presenciais ou remotos, definidos conforme o contexto
                do grupo.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
