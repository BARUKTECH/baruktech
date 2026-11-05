import type { Project } from "@/content/projects";
import { BarukUnit } from "@/components/visual/BarukUnit";

const glowByTone: Record<Project["tone"], string> = {
  violet: "rgba(121,0,255,0.28)",
  blue: "rgba(8,123,255,0.26)",
  cyan: "rgba(0,207,255,0.2)",
};

const accentByTone: Record<Project["tone"], string> = {
  violet: "#B98CFF",
  blue: "#087BFF",
  cyan: "#00CFFF",
};

function SystemVisual() {
  return (
    <div className="absolute inset-0 grid grid-cols-6 gap-1.5 p-6 opacity-80">
      {Array.from({ length: 24 }, (_, index) => {
        const active = [4, 7, 10, 13, 16].includes(index);
        return (
          <span
            key={index}
            className={
              active
                ? "rounded-[2px] border border-violet/50 bg-violet/15"
                : "rounded-[2px] border border-white/[0.07]"
            }
          />
        );
      })}
    </div>
  );
}

function LearningVisual() {
  return (
    <svg
      viewBox="0 0 320 200"
      fill="none"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="learn-stroke" x1="40" y1="40" x2="280" y2="170">
          <stop offset="0" stopColor="#087BFF" stopOpacity="0.7" />
          <stop offset="1" stopColor="#7900FF" stopOpacity="0.25" />
        </linearGradient>
        <radialGradient id="learn-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#00CFFF" stopOpacity="0.5" />
          <stop offset="1" stopColor="#00CFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g opacity="0.65">
        <circle cx="160" cy="104" r="66" stroke="rgba(245,245,255,0.1)" />
        <circle cx="160" cy="104" r="46" stroke="url(#learn-stroke)" strokeDasharray="3 7" className="orbit-slow" />
        <circle cx="160" cy="104" r="26" stroke="rgba(245,245,255,0.14)" />
        <path d="M160 38V170M94 104H226" stroke="rgba(245,245,255,0.08)" />
      </g>
      <circle cx="160" cy="104" r="34" fill="url(#learn-glow)" />
      <circle cx="160" cy="58" r="4" fill="#00CFFF" />
      <circle cx="218" cy="126" r="3" fill="#B98CFF" />
      <circle cx="108" cy="140" r="3" fill="#087BFF" />
      <text
        x="160"
        y="109"
        textAnchor="middle"
        fill="#F5F5FF"
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontSize="16"
        opacity="0.9"
      >
        f(x)
      </text>
      <text
        x="34"
        y="34"
        fill="rgba(245,245,255,0.45)"
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontSize="8"
        letterSpacing="2"
      >
        MÓDULO / 02
      </text>
      <text
        x="236"
        y="182"
        fill="rgba(245,245,255,0.45)"
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontSize="8"
        letterSpacing="2"
      >
        {"{"} {"}"}
      </text>
    </svg>
  );
}

function UnitVisual({ idPrefix }: { idPrefix: string }) {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(0,207,255,0.18),transparent_62%)]" />
      <BarukUnit
        idPrefix={idPrefix}
        className="absolute left-1/2 top-1 h-[210%] w-auto -translate-x-1/2 opacity-95"
      />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0b0d13] to-transparent" />
    </div>
  );
}

export function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className="project-visual relative h-44 overflow-hidden border-b border-line bg-[linear-gradient(180deg,rgba(22,25,39,0.6),rgba(3,4,11,0.4))] transition-transform duration-700 group-hover:scale-[1.015]">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 24%, ${glowByTone[project.tone]}, transparent 68%)`,
        }}
      />
      <div aria-hidden="true" className="grid-backdrop-fine absolute inset-0 opacity-40" />

      {project.visual === "system" ? <SystemVisual /> : null}
      {project.visual === "learning" ? <LearningVisual /> : null}
      {project.visual === "unit" ? (
        <UnitVisual idPrefix={`project-${project.slug}`} />
      ) : null}

      <div className="absolute left-4 top-4 font-mono text-[8px] uppercase tracking-[0.24em] text-muted/80">
        {project.index} / {project.kind}
      </div>
      <div className="absolute bottom-4 right-4 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em] text-muted/80">
        <span
          className="h-1 w-1 rounded-full"
          style={{
            backgroundColor: accentByTone[project.tone],
            boxShadow: `0 0 8px ${accentByTone[project.tone]}`,
          }}
        />
        {project.status}
      </div>
    </div>
  );
}
