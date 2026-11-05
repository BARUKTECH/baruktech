export const services = [
  {
    index: "01",
    title: "Sites e produtos digitais",
    description:
      "Landing pages, portfólios e aplicações web com foco em clareza, velocidade e manutenção.",
    tags: ["Next.js", "React", "Conteúdo"],
  },
  {
    index: "02",
    title: "Interfaces e design systems",
    description:
      "Sistemas visuais consistentes, componentes reutilizáveis e documentação que sobrevive ao projeto.",
    tags: ["UI", "Tokens", "Componentes"],
  },
  {
    index: "03",
    title: "Sistemas e automação",
    description:
      "Fluxos internos, integrações e ferramentas que eliminam trabalho repetido.",
    tags: ["APIs", "Automação", "Dados"],
  },
  {
    index: "04",
    title: "Performance e acessibilidade",
    description:
      "Auditoria e correção de experiência real: carregamento, semântica, contraste e navegação por teclado.",
    tags: ["Core Web Vitals", "WCAG", "Auditoria"],
  },
  {
    index: "05",
    title: "Educação e mentoria",
    description:
      "Aulas, workshops e acompanhamento técnico para equipes e pessoas em transição de carreira.",
    tags: ["Aulas", "Workshops", "Mentoria"],
  },
] as const;

export const serviceNote =
  "Escopo e investimento definidos após uma conversa de contexto.";

export type Service = (typeof services)[number];

export const education = {
  lead: "Ensinar é projetar compreensão.",
  body: "A educação não é uma seção separada do trabalho — é parte do método. Todo projeto deveria deixar uma explicação melhor do que a que encontrou.",
  formats: [
    {
      icon: "graduation",
      title: "Aulas e trilhas",
      description:
        "Matemática, lógica e fundamentos de programação em sequências que fazem sentido.",
    },
    {
      icon: "presentation",
      title: "Workshops",
      description:
        "Encontros práticos para equipes que precisam alinhar repertório técnico.",
    },
    {
      icon: "notebook",
      title: "Conteúdo técnico",
      description:
        "Artigos, notas e materiais de apoio escritos para durar.",
    },
    {
      icon: "mentoring",
      title: "Mentoria",
      description:
        "Acompanhamento individual para transições de carreira e projetos autorais.",
    },
  ],
  topics: [
    "Matemática aplicada",
    "Lógica e algoritmos",
    "Fundamentos de web",
    "Design de interfaces",
    "Acessibilidade",
    "Carreira em tecnologia",
  ],
} as const;

export type EducationFormat = (typeof education.formats)[number];
