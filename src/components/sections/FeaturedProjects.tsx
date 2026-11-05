import { ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/content/projects";
import { ProjectVisual } from "@/components/visual/ProjectVisual";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

export function FeaturedProjects() {
  return (
    <section
      id="projetos"
      className="relative scroll-mt-24 border-b border-line py-24 sm:py-32 lg:py-40"
    >
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Reveal className="lg:col-span-7">
            <SectionLabel index="03">Projetos</SectionLabel>
            <SectionHeading className="mt-8">
              Trabalho autoral em{" "}
              <span className="text-gradient">três estados.</span>
            </SectionHeading>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="text-pretty text-sm leading-7 text-muted sm:text-base sm:leading-8">
              Do conceito ao protótipo jogável. Cada projeto é um sistema em
              teste — e os estudos conceituais são identificados como tal, sem
              vitrine inventada.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={index * 0.08}
              className={cn(
                "flex",
                index === featuredProjects.length - 1 &&
                  "sm:col-span-2 lg:col-span-1",
              )}
            >
              <article className="group relative flex flex-1 flex-col overflow-hidden bg-bg transition-colors duration-500 hover:bg-surface/50">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-gradient-to-r from-violet via-blue to-cyan transition-transform duration-700 group-hover:scale-x-100"
                />
                <ProjectVisual project={project} />

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl font-medium tracking-[-0.03em] text-ink">
                      {project.name}
                    </h3>
                    <span className="font-mono text-[9px] tracking-[0.18em] text-muted/80">
                      {project.year}
                    </span>
                  </div>
                  <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.22em] text-violet-soft">
                    {project.kind}
                  </p>

                  <p className="mt-5 text-pretty text-sm leading-6 text-muted">
                    {project.summary}
                  </p>
                  <p className="mt-3 text-pretty text-[13px] leading-6 text-muted/80">
                    {project.description}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-muted/80"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <div className="flex items-center justify-between gap-4 border-t border-line pt-5">
                      <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.18em] text-muted/80">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "h-1 w-1 rounded-full",
                            project.status === "Em desenvolvimento"
                              ? "status-dot bg-cyan shadow-[0_0_8px_#66e0ff]"
                              : "bg-violet-soft",
                          )}
                        />
                        {project.status}
                      </span>

                      {project.href ? (
                        <a
                          href={project.href}
                          className="group/link inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-ink transition-colors hover:text-violet-soft"
                        >
                          Abrir laboratório
                          <ArrowUpRight
                            size={12}
                            strokeWidth={1.8}
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                          />
                        </a>
                      ) : (
                        <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted/80">
                          Estudo conceitual
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl font-mono text-[9px] uppercase leading-5 tracking-[0.16em] text-muted/80">
            Estudos conceituais não representam clientes, prêmios ou resultados
            externos. O laboratório publica o que consegue sustentar.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
