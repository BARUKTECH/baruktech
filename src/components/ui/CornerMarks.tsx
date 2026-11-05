import { cn } from "@/lib/utils";

export function CornerMarks({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      <span className="corner-mark left-0 top-0 border-l border-t" />
      <span className="corner-mark right-0 top-0 border-r border-t" />
      <span className="corner-mark bottom-0 left-0 border-b border-l" />
      <span className="corner-mark bottom-0 right-0 border-b border-r" />
    </div>
  );
}
