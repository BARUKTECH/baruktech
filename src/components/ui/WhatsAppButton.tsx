import { cn } from "@/lib/utils";
import {
  whatsappHref,
  whatsappIsConfigured,
} from "@/lib/whatsapp";

type WhatsAppButtonProps = {
  variant?: "full" | "icon";
  className?: string;
  onClick?: () => void;
};

function WhatsAppGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 448 512"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

const surface =
  "relative isolate overflow-hidden border border-emerald-200/25 bg-[linear-gradient(135deg,#056b4e_0%,#079b70_48%,#12b981_100%)] text-white shadow-[0_10px_34px_-14px_rgba(7,155,112,0.9)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-emerald-100/50 hover:shadow-[0_0_26px_rgba(7,155,112,0.65),0_18px_44px_-14px_rgba(7,155,112,1)] focus-visible:-translate-y-0.5";

export function WhatsAppButton({
  variant = "full",
  className,
  onClick,
}: WhatsAppButtonProps) {
  const label = whatsappIsConfigured
    ? "Falar no WhatsApp"
    : "WhatsApp em configuração — ir para contato";

  const shared = {
    href: whatsappHref,
    onClick,
    "aria-label": label,
    title: whatsappIsConfigured
      ? "Abrir conversa no WhatsApp"
      : "O número do WhatsApp ainda não foi configurado. O botão leva ao contato.",
    ...(whatsappIsConfigured
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {}),
  } as const;

  if (variant === "icon") {
    return (
      <a
        {...shared}
        className={cn(
          surface,
          "group grid h-11 w-11 place-items-center rounded-full",
          className,
        )}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.45),transparent)] transition-transform duration-700 group-hover:translate-x-full"
        />
        <WhatsAppGlyph size={17} />
      </a>
    );
  }

  return (
    <a
      {...shared}
      className={cn(
        surface,
        "group inline-flex h-11 items-center gap-2.5 rounded-full pl-4 pr-4.5 text-[12.5px] font-semibold tracking-[0.01em]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.35),transparent)] transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15 ring-1 ring-inset ring-white/20">
        <WhatsAppGlyph size={14} />
      </span>
      WhatsApp
    </a>
  );
}
