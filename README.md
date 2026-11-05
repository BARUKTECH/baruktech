# BARUK TECH

Site institucional e portfólio vivo da BARUK TECH — tecnologia, educação e inovação em um único ecossistema digital.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev)
- [TypeScript 5](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Motion](https://motion.dev) para animações
- [Lucide](https://lucide.dev) para ícones
- [Playwright](https://playwright.dev) para QA visual e funcional local

## Requisitos

- Node.js 20.9 ou superior
- npm

## Como rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Scripts

```bash
npm run dev      # ambiente de desenvolvimento
npm run lint     # ESLint
npx tsc --noEmit # verificação de tipos
npm run build    # build de produção
npm run start    # servir o build de produção
```

## Estrutura

```text
src/
  app/         # layout, página principal e estilos globais
  components/  # seções, layout, UI, visuais SVG e jogo BARUK-01
  content/     # conteúdo e configuração central do site
  lib/         # utilitários, incluindo o link do WhatsApp
```

## WhatsApp

O número e a mensagem padrão ficam em `src/content/site.ts`, na chave `whatsapp`. O link é montado em `src/lib/whatsapp.ts` e reutilizado por todos os botões.

## QA

Os scripts de verificação local ficam em `.qa/`, que não é versionado. Eles cobrem responsividade, acessibilidade, links, movimento reduzido e o jogo BARUK-01.

## Deploy

O projeto é estático na rota principal e pode ser publicado na Vercel ou em qualquer ambiente compatível com Next.js.

```bash
npm run build
npm run start
```
