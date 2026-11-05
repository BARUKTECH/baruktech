import { siteConfig } from "@/content/site";
import { ContactActions } from "@/components/ui/ContactActions";
import { CornerMarks } from "@/components/ui/CornerMarks";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Contact() {
  const { contact } = siteConfig;
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(
    contact.subject,
  )}&body=${encodeURIComponent(contact.body)}`;

  return (
    <section
      id="contato"
      className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(121,0,255,0.12),transparent_66%)]"
      />

      <div className="container-page relative">
        <div className="relative overflow-hidden border border-white/10 bg-[linear-gradient(140deg,rgba(22,25,39,0.9),rgba(3,4,11,0.96))]">
          <div
            aria-hidden="true"
            className="grid-backdrop-fine absolute inset-0 opacity-30"
          />
          <CornerMarks />

          <div className="relative grid gap-12 p-6 sm:p-10 lg:grid-cols-12 lg:gap-10 lg:p-14">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionLabel index="09">Contato</SectionLabel>
                <SectionHeading className="mt-8 max-w-2xl">
                  Vamos construir o próximo{" "}
                  <span className="text-gradient">sistema.</span>
                </SectionHeading>
                <p className="mt-6 max-w-xl text-pretty text-sm leading-7 text-muted sm:text-base sm:leading-8">
                  {contact.description}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <ContactActions email={contact.email} mailto={mailto} />

                <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-line pt-6">
                  <a
                    href={mailto}
                    className="font-mono text-[10px] tracking-[0.12em] text-ink transition-colors hover:text-violet-soft"
                  >
                    {contact.email}
                  </a>
                  {contact.emailIsPlaceholder ? (
                    <span className="rounded-full border border-violet/30 bg-violet/10 px-2 py-0.5 font-mono text-[7px] uppercase tracking-[0.18em] text-violet-soft">
                      Endereço provisório
                    </span>
                  ) : null}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={0.16}>
                <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-muted/80">
                  Como funciona
                </p>

                <ol className="mt-6 border-l border-line">
                  {contact.process.map((step) => (
                    <li
                      key={step.index}
                      className="group relative pb-7 pl-6 last:pb-0"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute -left-[3px] top-1.5 h-1.5 w-1.5 rounded-full bg-violet shadow-[0_0_8px_#793cff] transition-transform duration-500 group-hover:scale-150"
                      />
                      <p className="font-mono text-[9px] tracking-[0.2em] text-violet-soft">
                        {step.index}
                      </p>
                      <h3 className="mt-1.5 font-display text-lg font-medium tracking-[-0.02em] text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-[13px] leading-6 text-muted">
                        {step.description}
                      </p>
                    </li>
                  ))}
                </ol>

                <p className="mt-8 border-t border-line pt-6 font-mono text-[8px] uppercase leading-5 tracking-[0.16em] text-muted/80">
                  Projetos · Colaborações · Formações
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
