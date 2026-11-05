import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/content/site";
import { LocalTime } from "@/components/ui/LocalTime";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const primaryNav = siteConfig.mobileNav.slice(0, 5);
const secondaryNav = siteConfig.mobileNav.slice(5);

export function Footer() {
  return (
    <footer
      id="status"
      className="relative scroll-mt-24 overflow-hidden border-t border-line bg-surface/20 pt-20 sm:pt-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(121,0,255,0.14),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(8,123,255,0.1),transparent_65%)]"
      />

      <div className="container-page relative">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-violet-soft">
              Fase 05 / Redesign
            </p>
            <p className="mt-4 max-w-md font-display text-2xl leading-[1.15] tracking-[-0.025em] text-ink sm:text-3xl">
              Um ecossistema em movimento.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <WhatsAppButton />
            <a
              href="#top"
              className="group inline-flex w-fit items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink"
            >
              Voltar ao topo
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 transition-colors group-hover:border-violet/40 group-hover:bg-white/[0.05]">
                <ArrowUp size={14} strokeWidth={1.5} aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-8 sm:mt-20 sm:pt-10">
          <p
            aria-hidden="true"
            className="bg-gradient-to-b from-ink to-ink/15 bg-clip-text font-display text-[clamp(3rem,12.4vw,11rem)] font-medium leading-[0.8] tracking-[-0.07em] text-transparent"
          >
            BARUKTECH
            <span className="text-gradient">.</span>
          </p>
        </div>

        <div className="mt-14 grid gap-10 border-t border-line py-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="max-w-sm text-sm leading-6 text-muted">
              Tecnologia, educação e inovação no mesmo lugar. Um ecossistema
              construído em camadas, com o laboratório aberto para o próximo
              experimento.
            </p>
            <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.2em] text-muted/80">
              {siteConfig.descriptor}
            </p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="mt-4 inline-flex font-mono text-[10px] tracking-[0.12em] text-muted transition-colors hover:text-ink"
            >
              {siteConfig.contact.email}
            </a>
          </div>

          <nav aria-label="Navegação do rodapé">
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-muted/80">
              Navegação
            </p>
            <ul className="mt-4 space-y-2.5">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Explorar o site">
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-muted/80">
              Explorar
            </p>
            <ul className="mt-4 space-y-2.5">
              {secondaryNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-muted/80">
              Sistema
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted">
              <span className="status-dot h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_#00cfff]" />
              Operacional
            </p>
            <p className="mt-2.5 text-sm text-muted">
              Hora local <LocalTime />
            </p>
            <p className="mt-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted/80">
              Build 0.5 / redesign
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-7 font-mono text-[8px] uppercase tracking-[0.18em] text-muted/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 BARUK TECH</p>
          <p>Projetado e construído do zero.</p>
          <p>Ecossistema vivo / v0.5</p>
        </div>
      </div>
    </footer>
  );
}
