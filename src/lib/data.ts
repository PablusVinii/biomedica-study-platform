import { curriculumData } from "./curriculum-data-1";
import { curriculumData2 } from "./curriculum-data-2";
import { curriculumData3 } from "./curriculum-data-3";
import { curriculumData4 } from "./curriculum-data-4";
import { Part } from "./types";

export const allCurriculumData: Part[] = [
  ...curriculumData,
  ...curriculumData2,
  ...curriculumData3,
  ...curriculumData4,
];

export const formationGapAlerts = [
  {
    title: "Interoperabilidade em Saúde Digital",
    description: "A maioria dos currículos acadêmicos de Engenharia Biomédica não cobre adequadamente os padrões modernos de interoperabilidade (HL7 FHIR, RNDS). Busque treinamento complementar.",
    recommendations: [
      "Curso HL7 FHIR Fundamentals — HL7 Brasil",
      "Plataforma AVASUS — Módulos de Saúde Digital",
      "Capacitação RNDS — DATASUS/MS",
      "Cursos de LGPD aplicada à Saúde"
    ],
    severity: "warning" as const,
  },
  {
    title: "Regulamentação ANVISA Atualizada",
    description: "As resoluções RDC 751/2022 e RDC 848/2024 trouxeram mudanças significativas na regulamentação de dispositivos médicos. Mantenha-se atualizado.",
    recommendations: [
      "Portal ANVISA — Dispositivos Médicos",
      "Curso de Boas Práticas de Fabricação (BPF)",
      "Webinars ABIMO sobre regulamentação",
      "ISO 13485:2016 — Atualização de requisitos"
    ],
    severity: "critical" as const,
  },
  {
    title: "Inteligência Artificial e Dados em Saúde",
    description: "IA aplicada à saúde evolui rapidamente. Complemente sua formação com cursos práticos em ML/DL para dados clínicos.",
    recommendations: [
      "Coursera — AI for Medicine (Andrew Ng)",
      "Fast.ai — Practical Deep Learning",
      "Kaggle — Medical Imaging Competitions"
    ],
    severity: "info" as const,
  }
];

export type { Part, Block, Topic } from "./types";
