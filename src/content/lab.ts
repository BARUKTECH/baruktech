export const labExperiment = {
  code: "BARUK-01",
  name: "Flight Challenge",
  stage: "Fase 04 / jogável",
  status: "Protótipo jogável",
  summary:
    "Um robô de armadura grafite, detalhes em violeta e azul e um visor feito para ler o campo. O primeiro desafio do laboratório já voa: Canvas 2D, física própria e dificuldade que cresce a cada comporta — sem engine pesada, sem atalhos.",
  specs: [
    { label: "Unidade", value: "BARUK-01" },
    { label: "Classe", value: "Experimental" },
    { label: "Controles", value: "Teclado + toque" },
    { label: "Recorde", value: "Salvo localmente" },
    { label: "Áudio", value: "Opcional" },
    { label: "Motor", value: "Canvas 2D" },
  ],
  systems: [
    "Física própria, sem engine externa",
    "Dificuldade progressiva por sessão",
    "Recorde persistido no navegador",
    "Interface responsiva e acessível",
  ],
  hud: [
    { label: "Visor", value: "Sincronizado" },
    { label: "Armadura", value: "Grafite / liga V-01" },
    { label: "Sinal", value: "Estável" },
  ],
} as const;

export type LabSpec = (typeof labExperiment.specs)[number];
