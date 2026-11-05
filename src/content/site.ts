export const siteConfig = {
  name: "BARUKTECH",
  descriptor: "Tecnologia · Educação · Inovação",
  description:
    "Um ecossistema de tecnologia, educação e inovação para aprender, criar, desenvolver e evoluir.",
  nav: [
    { label: "Início", href: "#top" },
    { label: "Serviços", href: "#servicos" },
    { label: "Diferenciais", href: "#diferenciais" },
    { label: "Ecossistema", href: "#ecossistema" },
    { label: "Contato", href: "#contato" },
  ],
  mobileNav: [
    { label: "Início", href: "#top" },
    { label: "Ecossistema", href: "#ecossistema" },
    { label: "Diferenciais", href: "#diferenciais" },
    { label: "Projetos", href: "#projetos" },
    { label: "Laboratório", href: "#laboratorio" },
    { label: "Trajetória", href: "#trajetoria" },
    { label: "Serviços", href: "#servicos" },
    { label: "Educação", href: "#educacao" },
    { label: "Contato", href: "#contato" },
  ],
  capabilities: [
    "Desenvolvimento web",
    "Design de interfaces",
    "Sistemas digitais",
    "Experiências interativas",
    "Performance",
    "Acessibilidade",
    "Educação tecnológica",
  ],
  /**
   * CONFIGURAÇÃO CENTRAL DO WHATSAPP.
   *
   * Preencha `number` com o número real no formato internacional e apenas
   * dígitos (ex.: "5511999999999"). Enquanto estiver vazio, o botão do
   * cabeçalho leva para a seção de contato em vez de abrir um link inválido.
   */
  whatsapp: {
    number: "5548988659794",
    message:
      "Olá! Vim pelo site da BARUKTECH e quero conversar sobre um projeto.",
  },
  manifesto: {
    lead: "Complexidade é fácil.",
    accent: "O difícil é fazer parecer simples.",
    body: "BARUKTECH é um laboratório digital onde engenharia, design e educação se encontram. Cada projeto é tratado como sistema: intenção, estrutura, movimento e detalhe. Nada é decorativo por acaso.",
    principles: [
      {
        index: "001",
        title: "Engenharia",
        description:
          "Arquitetura limpa, performance real e decisões que continuam sustentando o produto depois do lançamento.",
      },
      {
        index: "002",
        title: "Design",
        description:
          "Hierarquia, ritmo e movimento a serviço da clareza. A beleza aparece como consequência da função.",
      },
      {
        index: "003",
        title: "Educação",
        description:
          "Conhecimento técnico traduzido em experiências que explicam, ensinam e permanecem.",
      },
    ],
  },
  contact: {
    // PLACEHOLDER: troque pelo e-mail real antes de publicar.
    email: "contato@baruktech.com",
    emailIsPlaceholder: true,
    subject: "Projeto — BARUKTECH",
    body: [
      "Olá, BARUKTECH.",
      "",
      "Contexto:",
      "",
      "Objetivo:",
      "",
      "Prazo aproximado:",
      "",
      "Como cheguei até aqui:",
      "",
    ].join("\n"),
    lead: "Vamos construir o próximo sistema.",
    description:
      "Se você tem um problema bem definido, uma ideia em aberto ou quer levar educação técnica para um grupo, escreva. A conversa começa pelo contexto — não por um orçamento.",
    process: [
      {
        index: "01",
        title: "Contexto",
        description:
          "Entender o problema, as restrições e o que já existe antes de propor qualquer solução.",
      },
      {
        index: "02",
        title: "Direção",
        description:
          "Definir escopo, arquitetura e critérios de sucesso em algo que caiba no mundo real.",
      },
      {
        index: "03",
        title: "Construção",
        description:
          "Executar em camadas, com entregas verificáveis e documentação desde o primeiro commit.",
      },
    ],
  },
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
export type Principle = (typeof siteConfig.manifesto.principles)[number];
export type ContactProcess = (typeof siteConfig.contact.process)[number];
