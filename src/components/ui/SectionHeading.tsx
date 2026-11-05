import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  children: ReactNode;
  accent?: ReactNode;
  className?: string;
};

export function SectionHeading({
  children,
  accent,
  className,
}: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "text-balance font-display text-[clamp(2rem,4.2vw,3.7rem)] font-medium leading-[1.04] tracking-[-0.045em] text-ink",
        className,
      )}
    >
      {children}
      {accent ? <span className="text-muted"> {accent}</span> : null}
    </h2>
  );
}
