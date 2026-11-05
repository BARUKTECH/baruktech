import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const title = "BARUK TECH — Tecnologia, Educação e Inovação";
const description =
  "Um ecossistema de tecnologia, educação e inovação para aprender, criar, desenvolver e evoluir. Software, inteligência artificial, formação e soluções digitais.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s — BARUK TECH",
  },
  description,
  applicationName: "BARUK TECH",
  authors: [{ name: "BARUK TECH" }],
  creator: "BARUK TECH",
  keywords: [
    "BARUK TECH",
    "BARUKTECH",
    "desenvolvimento web",
    "design de interfaces",
    "inteligência artificial",
    "automação",
    "tecnologia",
    "educação",
    "inovação",
  ],
  category: "technology",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "BARUK TECH",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#010719",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-dvh bg-bg font-sans text-ink">
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "[data-reveal]{opacity:1!important;transform:none!important}",
          }}
        />
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
