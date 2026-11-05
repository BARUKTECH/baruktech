export type ProjectStatus = "Conceito" | "Em desenvolvimento";

export type Project = {
  slug: string;
  index: string;
  name: string;
  kind: string;
  year: string;
  status: ProjectStatus;
  summary: string;
  description: string;
  tags: readonly string[];
  tone: "violet" | "blue" | "cyan";
  visual: "system" | "learning" | "unit";
  href?: string;
};

/**
 * Projetos autorais. Nada aqui representa um cliente, prêmio ou resultado
 * externo. Estudos conceituais são identificados como "Conceito".
 */
export const featuredProjects: readonly Project[] = [
  {
    slug: "nucleo",
    index: "01",
    name: "Núcleo",
    kind: "Sistema de design",
    year: "2026",
    status: "Conceito",
    summary:
      "Uma base visual e técnica para produtos que precisam parecer simples por dentro e por fora.",
    description:
      "Tokens, componentes e regras de composição desenhados para reduzir decisões repetidas e manter consistência em escala.",
    tags: ["Design system", "Tokens", "Acessibilidade"],
    tone: "violet",
    visual: "system",
  },
  {
    slug: "sinapse",
    index: "02",
    name: "Sinapse",
    kind: "Produto educacional",
    year: "2026",
    status: "Conceito",
    summary:
      "Uma ponte entre matemática e código, feita para quem aprende construindo.",
    description:
      "Trilhas curtas, exercícios visuais e feedback imediato para transformar conceitos abstratos em ferramentas concretas.",
    tags: ["Educação", "Interface", "Conteúdo"],
    tone: "blue",
    visual: "learning",
  },
  {
    slug: "baruk-01",
    index: "03",
    name: "BARUK-01",
    kind: "Experimento jogável",
    year: "2026",
    status: "Em desenvolvimento",
    summary:
      "O primeiro personagem do laboratório e o primeiro jogo publicado aqui.",
    description:
      "Um desafio de voo em Canvas 2D, com controles de teclado e toque, dificuldade progressiva e recorde salvo localmente.",
    tags: ["Canvas 2D", "Web Audio", "Jogo"],
    tone: "cyan",
    visual: "unit",
    href: "#laboratorio",
  },
];
