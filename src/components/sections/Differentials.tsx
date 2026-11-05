import {
  Code2,
  GraduationCap,
  Handshake,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { differentials, type DifferentialIcon } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";

const icons: Record<DifferentialIcon, LucideIcon> = {
  sparkles: Sparkles,
  graduation: GraduationCap,
  code: Code2,
  handshake: Handshake,
};

export function Differentials() {
  return (
    <section
      id="diferenciais"
      className="relative scroll-mt-24 border-b border-line py-14 sm:py-16"
    >
      <h2 className="sr-only">Diferenciais da BARUK TECH</h2>

      <div className="container-page">
        <div className="grid gap-px overflow-hidden rounded-[24px] border border-[rgba(80,110,255,0.28)] bg-[rgba(80,110,255,0.22)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_30px_80px_-50px_rgba(0,0,0,1)] sm:grid-cols-2 lg:grid-cols-4">
          {differentials.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <Reveal key={item.title} delay={index * 0.07} className="flex">
                <article className="diff-item group relative flex-1 overflow-hidden bg-[#071329]/95 px-6 py-7 sm:px-7 sm:py-8">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-violet via-blue to-cyan transition-transform duration-700 group-hover:scale-x-100"
                  />

                  <div className="flex items-start justify-between gap-4">
                    <span className="relative grid h-12 w-12 place-items-center rounded-[14px] border border-[rgba(80,110,255,0.32)] bg-[linear-gradient(150deg,rgba(121,0,255,0.24),rgba(8,123,255,0.08))] text-violet-soft transition-colors duration-500 group-hover:border-violet/50 group-hover:text-cyan">
                      <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-[14px] opacity-0 shadow-[0_0_26px_-2px_rgba(121,0,255,0.85)] transition-opacity duration-500 group-hover:opacity-100"
                      />
                    </span>
                    <span className="font-mono text-[8px] tracking-[0.22em] text-white/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-semibold tracking-[-0.03em] text-ink">
                    {item.title}
                    <span className="ml-2 font-mono text-[8px] font-normal uppercase tracking-[0.16em] text-violet-soft/90">
                      {item.accent}
                    </span>
                  </h3>
                  <p className="mt-2.5 max-w-[16rem] text-[12.5px] leading-6 text-muted">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
