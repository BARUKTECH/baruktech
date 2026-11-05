import { siteConfig } from "@/content/site";

/**
 * Link central do WhatsApp.
 *
 * Enquanto `siteConfig.whatsapp.number` estiver vazio, o destino cai na seção
 * de contato — nunca em um `wa.me` inválido.
 */
export const whatsappDigits = siteConfig.whatsapp.number.replace(/\D/g, "");

export const whatsappIsConfigured = whatsappDigits.length >= 8;

export const whatsappHref = whatsappIsConfigured
  ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
      siteConfig.whatsapp.message,
    )}`
  : "#contato";
