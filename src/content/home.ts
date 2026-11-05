/**
 * Conteúdo da página inicial.
 *
 * Tudo que aparece na home fica aqui para ser editado sem tocar em componentes.
 * Nenhum dado pessoal, cliente ou resultado externo é inventado neste arquivo.
 */

export const heroCopy = {
  eyebrow: "Sistema online",
  system: "Ecossistema digital / 2026",
  brand: "BARUK",
  brandAccent: "TECH",
  subtitle: "Digital Ecosystem",
  headline: "Ideias que se transformam em",
  headlineAccent: "soluções.",
  tagline: "Construindo um futuro digital juntos.",
  description:
    "Um ecossistema de tecnologia, educação e inovação para aprender, criar, desenvolver e evoluir.",
  categories: ["Tecnologia", "Educação", "Inovação"],
  primaryCta: { label: "Conheça nosso ecossistema", href: "#ecossistema" },
  secondaryCta: { label: "Fale conosco", href: "#contato" },
  metrics: [
    { value: "05", label: "frentes" },
    { value: "01", label: "laboratório aberto" },
    { value: "2026", label: "em construção" },
  ],
  stage: {
    unit: "BX-01",
    codename: "Baruk Unit",
    link: "Link neural",
    linkValue: "Ativo",
    core: "Núcleo",
    coreValue: "Estável",
    signal: "Sinal",
    signalValue: "98.4%",
    note: "Arraste o cursor para inclinar a unidade",
  },
} as const;

export type DifferentialIcon =
  | "sparkles"
  | "graduation"
  | "code"
  | "handshake";

export const differentials: readonly {
  icon: DifferentialIcon;
  title: string;
  accent: string;
  description: string;
}[] = [
  {
    icon: "sparkles",
    title: "Inovação",
    accent: "em primeiro lugar",
    description:
      "Investigação aplicada para dar forma ao que ainda não existe.",
  },
  {
    icon: "graduation",
    title: "Educação",
    accent: "sem limites",
    description:
      "Conhecimento técnico aberto para quem quer aprender construindo.",
  },
  {
    icon: "code",
    title: "Desenvolvimento",
    accent: "com propósito",
    description:
      "Código que continua sustentando o produto depois do lançamento.",
  },
  {
    icon: "handshake",
    title: "Parceria",
    accent: "em cada projeto",
    description:
      "Contexto, decisão e entrega construídos lado a lado.",
  },
];

export type EcosystemIcon =
  | "code"
  | "graduation"
  | "brain"
  | "store"
  | "building";

export const ecosystem: readonly {
  id: string;
  index: string;
  name: string;
  accent: string;
  icon: EcosystemIcon;
  description: string;
  tags: readonly string[];
  href: string;
  action: string;
  tone: "violet" | "blue" | "cyan";
}[] = [
  {
    id: "dev",
    index: "01",
    name: "BARUKTECH",
    accent: "Dev",
    icon: "code",
    description: "Sites, aplicativos e sistemas sob medida.",
    tags: ["Web", "Apps", "Sistemas"],
    href: "#servicos",
    action: "Ver serviços",
    tone: "violet",
  },
  {
    id: "academy",
    index: "02",
    name: "BARUKTECH",
    accent: "Academy",
    icon: "graduation",
    description: "Cursos, simulados e formação profissional.",
    tags: ["Cursos", "Simulados", "Formação"],
    href: "#educacao",
    action: "Ver formação",
    tone: "blue",
  },
  {
    id: "ai",
    index: "03",
    name: "BARUKTECH",
    accent: "AI",
    icon: "brain",
    description: "Inteligência artificial e automação.",
    tags: ["IA", "Automação", "Dados"],
    href: "#laboratorio",
    action: "Ver experimento",
    tone: "violet",
  },
  {
    id: "store",
    index: "04",
    name: "BARUKTECH",
    accent: "Store",
    icon: "store",
    description: "Produtos digitais e soluções prontas.",
    tags: ["Templates", "Componentes", "Kits"],
    href: "#projetos",
    action: "Ver projetos",
    tone: "cyan",
  },
  {
    id: "business",
    index: "05",
    name: "BARUKTECH",
    accent: "Business",
    icon: "building",
    description: "Automação e soluções para empresas.",
    tags: ["Processos", "Integrações", "Consultoria"],
    href: "#contato",
    action: "Falar sobre automação",
    tone: "violet",
  },
];

export const ecosystemNote =
  "O mapa mostra as frentes do ecossistema. Módulos sem página própria levam à seção correspondente do site — nenhuma rota é simulada.";

export const closingCopy = {
  eyebrow: "O próximo capítulo",
  title: "Mais que tecnologia.",
  titleAccent: "Uma jornada de evolução.",
  description:
    "Cada linha de código, aula e experimento faz parte do mesmo movimento: transformar conhecimento em ferramentas que continuam evoluindo.",
  pillars: [
    {
      index: "01",
      title: "Excelência em cada detalhe.",
      description: "Do primeiro rascunho ao último ajuste de performance.",
    },
    {
      index: "02",
      title: "Conhecimento para todos.",
      description: "Tecnologia explicada de um jeito que se pode reconstruir.",
    },
    {
      index: "03",
      title: "Inovação sem limites.",
      description: "Espaço para testar, errar em ambiente seguro e publicar.",
    },
  ],
  cta: { label: "Faça parte da BARUK TECH", href: "#contato" },
} as const;
