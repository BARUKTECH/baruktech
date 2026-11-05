import { siteConfig } from "@/content/site";

export function CapabilitiesMarquee() {
  const items = siteConfig.capabilities;

  const group = () => (
    <div className="marquee-group">
      {items.map((item) => (
        <span
          key={item}
          className="flex items-center whitespace-nowrap px-5 py-5 font-mono text-[9px] uppercase tracking-[0.24em] text-muted/80 sm:px-7"
        >
          {item}
          <span aria-hidden="true" className="ml-5 text-violet/70 sm:ml-7">
            +
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <section
      aria-label="Áreas de atuação"
      className="relative border-y border-line bg-surface/30"
    >
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {group()}
          {group()}
        </div>
      </div>
      <span className="sr-only">{items.join(", ")}.</span>
    </section>
  );
}
