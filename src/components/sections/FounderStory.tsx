import { founderStory } from "@/content/founder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function FounderStory() {
  return (
    <section
      id="trajetoria"
      className="relative scroll-mt-24 border-b border-line py-24 sm:py-32 lg:py-40"
    >
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <SectionLabel index="05">Trajetória</SectionLabel>
                <SectionHeading className="mt-8">
                  Da lousa ao{" "}
                  <span className="text-gradient">laboratório.</span>
                </SectionHeading>
                <p className="mt-6 max-w-lg text-pretty text-sm leading-7 text-muted sm:text-base sm:leading-8">
                  {founderStory.intro}
                </p>
              </Reveal>

              <Reveal delay={0.12}>
                <dl className="mt-9 border border-line bg-surface/30">
                  {founderStory.profile.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-baseline justify-between gap-6 border-b border-line px-5 py-3.5 last:border-b-0"
                    >
                      <dt className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted/80">
                        {item.label}
                      </dt>
                      <dd className="text-right text-[13px] leading-5 text-ink">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-5 flex items-start gap-2.5 font-mono text-[8px] uppercase leading-4 tracking-[0.16em] text-violet-soft/80">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet"
                  />
                  {founderStory.note}
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ol className="relative border-l border-line">
              {founderStory.chapters.map((chapter, index) => (
                <li
                  key={chapter.index}
                  className="group relative pb-10 pl-8 last:pb-0 sm:pl-10"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[3.5px] top-2 h-1.5 w-1.5 rounded-full bg-violet shadow-[0_0_10px_#793cff] transition-transform duration-500 group-hover:scale-150"
                  />
                  <Reveal delay={Math.min(index * 0.04, 0.2)}>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="font-mono text-[9px] tracking-[0.2em] text-violet-soft">
                        {chapter.index}
                      </span>
                      <span className="h-px w-6 bg-white/15" />
                      <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted/80">
                        {chapter.marker}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-xl font-medium tracking-[-0.025em] text-ink sm:text-2xl">
                      {chapter.title}
                    </h3>
                    <p className="mt-2.5 max-w-2xl text-pretty text-sm leading-7 text-muted">
                      {chapter.body}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
