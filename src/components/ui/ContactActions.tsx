"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";

type ContactActionsProps = {
  email: string;
  mailto: string;
};

type CopyState = "idle" | "copied" | "error";

export function ContactActions({ email, mailto }: ContactActionsProps) {
  const [state, setState] = useState<CopyState>("idle");
  const timerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const resetLater = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setState("idle"), 2200);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("error");
    }
    resetLater();
  };

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
      <a
        href={mailto}
        className="group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-violet to-blue px-6 text-sm font-medium text-white shadow-[0_12px_40px_-12px_rgba(121,0,255,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-12px_rgba(8,123,255,0.8)]"
      >
        Escrever um e-mail
        <ArrowUpRight
          size={15}
          strokeWidth={1.8}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>

      <button
        type="button"
        onClick={copyEmail}
        className="inline-flex h-12 items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06]"
      >
        {state === "copied" ? (
          <Check size={14} strokeWidth={1.8} aria-hidden="true" />
        ) : (
          <Copy size={14} strokeWidth={1.8} aria-hidden="true" />
        )}
        {state === "copied"
          ? "Endereço copiado"
          : state === "error"
            ? "Copie manualmente"
            : "Copiar endereço"}
        <span aria-live="polite" className="sr-only">
          {state === "copied"
            ? "Endereço de e-mail copiado."
            : state === "error"
              ? "Não foi possível copiar. Selecione o endereço exibido."
              : ""}
        </span>
      </button>
    </div>
  );
}
