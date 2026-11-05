export const founderStory = {
  kicker: "Trajetória / em primeira pessoa",
  lead: "Da lousa ao laboratório.",
  intro:
    "A matemática veio primeiro. Depois vieram o código, o design e a vontade de construir ferramentas que explicam a si mesmas.",
  note: "Texto em revisão. Os campos entre colchetes aguardam informações reais — edite em src/content/founder.ts.",
  profile: [
    { label: "Base", value: "[cidade / país]" },
    { label: "Formação", value: "[curso / instituição]" },
    { label: "Foco", value: "Software, design e educação" },
    { label: "Agora", value: "Construindo a BARUKTECH" },
  ],
  chapters: [
    {
      index: "01",
      marker: "Sala de aula",
      title: "Ensinar matemática",
      body: "A sala de aula foi o primeiro lugar onde aprendi a decompor o abstrato. Explicar um teorema é parecido com projetar uma interface: se a pessoa precisa de um manual para entender, a estrutura ainda não está clara.",
    },
    {
      index: "02",
      marker: "Transição",
      title: "A virada para a tecnologia",
      body: "O interesse por software nasceu da mesma pergunta que a matemática já fazia: como transformar raciocínio em algo que funciona sem depender de quem o criou? A resposta virou código.",
    },
    {
      index: "03",
      marker: "Formação",
      title: "Estudos e método",
      body: "A formação continua em movimento. Estudo estrutura de software, design de interfaces e acessibilidade como partes do mesmo ofício. [Curso, instituição e período a preencher.]",
    },
    {
      index: "04",
      marker: "Prática",
      title: "Projetos como laboratório",
      body: "Cada projeto é uma hipótese: uma interface mais clara, um sistema mais rápido, uma explicação mais direta. [Descreva aqui os projetos que marcaram esta fase.]",
    },
    {
      index: "05",
      marker: "Camadas",
      title: "Evolução contínua",
      body: "O repertório cresce por camadas: engenharia para sustentar, design para comunicar, educação para compartilhar. Nenhuma das três avança sozinha.",
    },
    {
      index: "06",
      marker: "Próximo",
      title: "Objetivos futuros",
      body: "Publicar o primeiro experimento jogável, abrir o laboratório para colaborações e transformar conhecimento técnico em conteúdo acessível. [Ajuste os objetivos com o seu plano real.]",
    },
  ],
} as const;

export type FounderChapter = (typeof founderStory.chapters)[number];
