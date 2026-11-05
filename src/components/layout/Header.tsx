"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => setOpen(false);
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [open]);

  const openMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    setOpen(true);
    dialog.showModal();
    closeButtonRef.current?.focus();
  };

  const closeMenu = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <header
        data-scrolled={scrolled}
        className="group/header fixed inset-x-0 top-0 z-50 h-[var(--header-h)] border-b border-[#0f1629]/60 bg-[#0f1629]/55 backdrop-blur-md transition-[height,background-color,border-color,backdrop-filter] duration-500 data-[scrolled=true]:h-[4.25rem] data-[scrolled=true]:border-line data-[scrolled=true]:bg-[#0f1629]/95 data-[scrolled=true]:backdrop-blur-2xl"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet/40 to-transparent opacity-0 transition-opacity duration-500 group-data-[scrolled=true]/header:opacity-100"
        />

        <div className="container-page flex h-full items-center justify-between gap-5">
          <Logo />

          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-7 lg:flex"
          >
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative font-mono text-[9px] uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-ink"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-violet via-blue to-cyan transition-all duration-300 group-hover:w-full"
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <WhatsAppButton className="hidden sm:inline-flex" />
            <WhatsAppButton variant="icon" className="sm:hidden" />

            <button
              type="button"
              onClick={openMenu}
              aria-label="Abrir menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-ink transition-colors duration-300 hover:border-violet/40 hover:bg-white/[0.05] lg:hidden"
            >
              <Menu size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-labelledby="mobile-menu-title"
        className="mobile-dialog lg:hidden"
      >
        <div className="flex h-dvh flex-col bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(121,0,255,0.16),transparent_70%)]">
          <div className="container-page flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-line">
            <Logo onClick={closeMenu} />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeMenu}
              aria-label="Fechar menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-ink transition-colors hover:border-violet/40 hover:bg-white/[0.05]"
            >
              <X size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <div className="container-page flex flex-1 flex-col justify-between overflow-y-auto py-7">
            <nav aria-label="Navegação mobile">
              <p
                id="mobile-menu-title"
                className="font-mono text-[9px] uppercase tracking-[0.24em] text-muted"
              >
                Navegação / 2026
              </p>

              <ul className="mt-5">
                {siteConfig.mobileNav.map((item, index) => (
                  <li key={item.href} className="border-b border-white/[0.06]">
                    <a
                      href={item.href}
                      onClick={closeMenu}
                      className="mobile-menu-link flex items-baseline gap-4 py-3 font-display text-[clamp(1.9rem,8.5vw,2.7rem)] font-medium leading-none tracking-[-0.045em] text-muted"
                    >
                      <span className="font-mono text-[9px] tracking-[0.2em] text-muted/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="pt-8">
              <WhatsAppButton className="w-full justify-center" onClick={closeMenu} />

              <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-6">
                <p className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em] text-muted">
                  <span className="status-dot h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_#00cfff]" />
                  Ecossistema online
                </p>
                <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted/70">
                  BARUK TECH © 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
