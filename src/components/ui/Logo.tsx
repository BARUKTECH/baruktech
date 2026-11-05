import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  onClick?: () => void;
};

export function Logo({ className, onClick }: LogoProps) {
  return (
    <Link
      href="/#top"
      onClick={onClick}
      aria-label="BARUK TECH — início"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center text-violet-soft transition-colors duration-300 group-hover:text-cyan">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
          className="h-full w-full"
        >
          <path
            d="M7 27V5.5h9.9c4.8 0 7.7 2.2 7.7 6 0 2.7-1.5 4.6-4 5.4 3.2.7 5.1 3 5.1 6 0 4.1-3.1 6.9-8.5 6.9H7Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M7 16.7h9.4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <circle cx="27.2" cy="5.4" r="1.5" fill="#00CFFF" />
        </svg>
      </span>
      <span className="flex items-baseline gap-[0.33rem]">
        <span className="font-display text-[0.94rem] font-semibold tracking-[0.16em] text-ink">
          BARUK
        </span>
        <span className="font-mono text-[0.56rem] tracking-[0.32em] text-muted transition-colors duration-300 group-hover:text-violet-soft">
          TECH
        </span>
      </span>
    </Link>
  );
}
