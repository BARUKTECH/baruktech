import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionLabelProps = {
  index: string;
  children: ReactNode;
  className?: string;
};

export function SectionLabel({
  index,
  children,
  className,
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-muted",
        className,
      )}
    >
      <span className="text-violet-soft">{index}</span>
      <span className="h-px w-7 bg-white/15" />
      <span>{children}</span>
    </div>
  );
}
