import { Part } from "./types";

export const curriculumData4: Part[] = [
  {
    id: 13,
    title: "7º Semestre — Subespecialidades",
    icon: "Microscope",
    blocks: [
      {
        id: 46,
        title: "Engenharia Cardiovascular",
        topics: [
          { id: "46-1", title: "Anatomia funcional, ciclo cardíaco e atividade elétrica" },
          { id: "46-2", title: "Mecanismos de controle da pressão arterial" },
          { id: "46-3", title: "Modelos matemáticos (Windkessel, elementos concentrados)" },
          { id: "46-4", title: "Medidas cardiovasculares (pressão, fluxo, volume) e instrumentação (cateteres)" },
          { id: "46-5", title: "Disfunções (insuficiência, arritmias) e tecnologias de diagnóstico" },
          { id: "46-6", title: "Modelos de apoio ao diagnóstico" }
        ],
        bibliography: [
          "BRONZINO, J. D. (cap. Cardiovascular Engineering). CRC Press.",
          "KLABUNDE, R. Cardiovascular Physiology Concepts. 3ª ed. Wolters Kluwer, 2021."
        ]
      },
      {
        id: 47,
        title: "Neuroengenharia",
        topics: [
          { id: "47-1", title: "Neuroanatomia funcional e Neurofisiologia" },
          { id: "47-2", title: "Imagens estruturais (RM, DTI) e funcionais (fMRI, PET, SPECT)" },
          { id: "47-3", title: "EEG (captura/análise) e MEG (magnetoencefalografia)" },
          { id: "47-4", title: "Estimulação (DBS, TMS, tDCS) e diagnóstico de epilepsia" },
          { id: "47-5", title: "Interface cérebro-máquina (BCI)" }
        ],
        bibliography: [
          "HE, B. (ed.) Neural Engineering. 3ª ed. Springer, 2020.",
          "KANDEL, E.; SCHWARTZ, J. Princípios de Neurociências. 5ª ed. AMGH, 2014."
        ]
      },
      {
        id: 48,
        title: "Biofotônica e Nanobiotecnologia",
        topics: [
          { id: "48-1", title: "Espectro eletromagnético e óptica geométrica/microscopia" },
          { id: "48-2", title: "Fluorescência (FLIM, FRET, FCS) e Lasers médicos" },
          { id: "48-3", title: "Microscopia avançada (Confocal, Raman, SERS, CARS)" },
          { id: "48-4", title: "Pinças ópticas, Nanopartículas, Quantum dots e Nanotubos" },
          { id: "48-5", title: "Biossensores nanoestruturados e Terapêutica (PDT, fotobiomodulação)" }
        ],
        bibliography: [
          "PRASAD, P. N. Introduction to Biophotonics. Wiley, 2003.",
          "VO-DINH, T. Biomedical Photonics Handbook. 2ª ed. CRC Press, 2014."
        ]
      }
    ]
  },
  {
    id: 14,
    title: "7º Semestre — Regulação e Qualidade",
    icon: "ShieldCheck",
    blocks: [
      {
        id: 49,
        title: "Regulamentação Sanitária de Dispositivos Médicos (Brasil)",
        topics: [
          { id: "49-1", title: "Estrutura da ANVISA, Classificação de risco (I-IV) e Vigilância Sanitária" },
          { id: "49-2", title: "Notificação vs Registro, Rotulagem e Instruções de uso (RDC 751/2022)" },
          { id: "49-3", title: "Software como Dispositivo Médico (SaMD - RDC 657/2022)" },
          { id: "49-4", title: "Requisitos essenciais (RDC 848/2024) e Boas Práticas de Fabricação (RDC 665/2022)" },
          { id: "49-5", title: "Ensaios clínicos (RDC 837/2023) e Tecnovigilância (Notivisa/Recall)" },
          { id: "49-6", title: "Infraestrutura (RDC 50/2002) e Blindagem radiológica (RDC 611/2022)" }
        ],
        bibliography: [
          "RDC ANVISA nº 751/2022 — Classificação, Registro e Rotulagem.",
          "RDC ANVISA nº 657/2022 — SaMD.",
          "RDC ANVISA nº 848/2024 — Requisitos de Segurança.",
          "RDC ANVISA nº 665/2022 — Boas Práticas de Fabricação.",
          "RDC ANVISA nº 837/2023 — Ensaios Clínicos.",
          "RDC ANVISA nº 50/2002 e RDC 611/2022."
        ],
        highlights: [
          "RDC 751/2022 — Classificação e Registro (Subst. RDC 185)",
          "RDC 657/2022 — Regularização de SaMD",
          "RDC 848/2024 — Requisitos de Segurança (Subst. RDC 546)",
          "RDC 665/2022 — Boas Práticas de Fabricação",
          "LGPD na gestão de dados de saúde (Lei 13.709/2018)"
        ]
      },
      {
        id: 50,
        title: "Normas Técnicas para Equipamentos Eletromédicos",
        topics: [
          { id: "50-1", title: "Série ABNT NBR IEC 60601-1 (Segurança básica e desempenho essencial)" },
          { id: "50-2", title: "Normas colaterais (EMC, Usabilidade, Alarmes, Eco-projeto, Home-care, Emergência)" },
          { id: "50-3", title: "Partes particulares 60601-2-xx (ECG, ventiladores, marcapassos, etc.)" },
          { id: "50-4", title: "Classificação (Classe I/II/III, Tipo B/BF/CF) e Tipos de aplicação" },
          { id: "50-5", title: "Testes de segurança elétrica (correntes de fuga, rigidez dielétrica)" }
        ],
        bibliography: [
          "ABNT NBR IEC 60601 (série completa).",
          "COSTA-FELIX, R. Equipamentos Eletromédicos (Série 60601). Brasport, 2017."
        ]
      },
      {
        id: 51,
        title: "Sistemas de Gestão da Qualidade e Risco",
        topics: [
          { id: "51-1", title: "ISO 13485 (SGQ para Dispositivos Médicos) e ISO 14971 (Gestão de Risco)" },
          { id: "51-2", title: "Usabilidade (IEC 62366-1) e Software de dispositivo médico (IEC 62304)" },
          { id: "51-3", title: "Investigação clínica (ISO 14155) e Sistemas gerais (ISO 9001)" },
          { id: "51-4", title: "BPF, BPD e Validação/Qualificação de processos (IQ, OQ, PQ)" }
        ],
        bibliography: [
          "ISO 13485:2016 — Quality Management Systems.",
          "ISO 14971:2019 — Risk Management.",
          "IEC 62304:2006 + Amd. 1:2015 — Software Life Cycle."
        ]
      },
      {
        id: 52,
        title: "Biossegurança e Controle de Infecções",
        topics: [
          { id: "52-1", title: "Biossegurança (classes de risco, EPI/EPC, higienização) e Prevenção de infecções" },
          { id: "52-2", title: "CME (Esterilização e Desinfecção) e Antibioticoprofilaxia" },
          { id: "52-3", title: "Resíduos (RSS - RDC 222/2018) e NR-32 (Segurança no Trabalho)" },
          { id: "52-4", title: "Proteção radiológica (CNEN NN 3.01)" }
        ],
        bibliography: [
          "BRASIL. NR-32 — Segurança e Saúde no Trabalho.",
          "ANVISA. Manual de Biossegurança e RDC nº 222/2018 (RSS).",
          "CNEN. Norma NN 3.01 — Proteção Radiológica."
        ]
      },
      {
        id: 53,
        title: "Bioética",
        topics: [
          { id: "53-1", title: "Princípios Bioéticos (Autonomia, Beneficência, Não-maleficência, Justiça)" },
          { id: "53-2", title: "Pesquisa com seres humanos (CNS 466/2012, 510/2016) e animais (CONCEA)" },
          { id: "53-3", title: "CEP/CONEP e Bioética em Genética/Células-tronco" },
          { id: "53-4", title: "Ética em IA e Privacidade (LGPD - Lei 13.709/2018)" }
        ],
        bibliography: [
          "BEAUCHAMP, T.; CHILDRESS, J. Princípios de Ética Biomédica. 4ª ed. Loyola, 2002.",
          "BRASIL. Resolução CNS nº 466/2012 e Lei nº 13.709/2018 (LGPD)."
        ]
      }
    ]
  },
  {
    id: 15,
    title: "8º Semestre — Gestão e Saúde Pública",
    icon: "BarChart3",
    blocks: [
      {
        id: 54,
        title: "Sistema Único de Saúde (SUS) e Sistema Suplementar",
        topics: [
          { id: "54-1", title: "Constituição Federal (Art. 196–200) e Leis 8.080/1990 e 8.142/1990" },
          { id: "54-2", title: "Princípios do SUS (Universalidade, Integralidade, Equidade) e Níveis de atenção" },
          { id: "54-3", title: "APS, Estratégia Saúde da Família (ESF) e Redes de Atenção à Saúde (RAS)" },
          { id: "54-4", title: "Sistema Suplementar (ANS) e Vigilâncias (Epidemiológica, Sanitária, Ambiental)" },
          { id: "54-5", title: "Saúde Digital: Conecte SUS e RNDS" }
        ],
        bibliography: [
          "PAIM, J. O que é o SUS. Editora Fiocruz, 2009.",
          "BRASIL. Lei nº 8.080/1990 e PNAB 2017."
        ]
      },
      {
        id: 55,
        title: "Epidemiologia e Saúde Coletiva",
        topics: [
          { id: "55-1", title: "Conceitos básicos e Indicadores (Incidência, Prevalência, Mortalidade, AVPP)" },
          { id: "55-2", title: "Tipos de estudos (Transversal, Caso-controle, Coorte, Ensaio clínico)" },
          { id: "55-3", title: "Vigilância epidemiológica e Sistemas (SIM, SINASC, SINAN, SIH, SIA)" }
        ],
        bibliography: [
          "ROUQUAYROL, M. Z. Epidemiologia & Saúde. 8ª ed. Medbook, 2018.",
          "BONITA, R. et al. Epidemiologia Básica. 2ª ed. Santos, 2010."
        ]
      },
      {
        id: 56,
        title: "Economia da Saúde e Avaliação de Tecnologias em Saúde (ATS)",
        topics: [
          { id: "56-1", title: "Mercado de saúde e Complexo Econômico-Industrial da Saúde (CEIS)" },
          { id: "56-2", title: "Análises econômicas (Custo-efetividade, Custo-utilidade, Custo-benefício)" },
          { id: "56-3", title: "ATS no Brasil (CONITEC, REBRATS) e HTA Internacional (NICE, CADTH)" }
        ],
        bibliography: [
          "DRUMMOND, M. et al. Methods for Economic Evaluation. 4ª ed. Oxford, 2015.",
          "CONITEC e REBRATS (fontes oficiais)."
        ]
      },
      {
        id: 57,
        title: "Administração e Gestão Hospitalar",
        topics: [
          { id: "57-1", title: "Conceitos de Administração e Estrutura Organizacional Hospitalar" },
          { id: "57-2", title: "Gestão (Pessoas, Financeira, Suprimentos) e Qualidade Total" },
          { id: "57-3", title: "Acreditação (ONA, JCI, NIAHO) e Gestão da Manutenção" },
          { id: "57-4", title: "Gestão de Projetos (PMBOK, Ágil) e Indicadores Hospitalares" }
        ],
        bibliography: [
          "BORBA, V.; LISBOA, T. Teoria Geral de Administração Hospitalar. Qualitymark, 2006.",
          "PROJECT MANAGEMENT INSTITUTE. PMBOK Guide. 7ª ed. PMI, 2021."
        ]
      },
      {
        id: 58,
        title: "Empreendedorismo em Engenharia Biomédica",
        topics: [
          { id: "58-1", title: "Gestão da Inovação e Modelos de Negócio (Canvas, Lean Startup)" },
          { id: "58-2", title: "Desenvolvimento (PUV, MVP, Prova de Conceito, Prototipagem)" },
          { id: "58-3", title: "Patentes, Propriedade Intelectual e Ciclo de Inovação em Saúde" },
          { id: "58-4", title: "Captação de recursos (FINEP, BNDES, VC) e CBL (Challenge-Based Learning)" }
        ],
        bibliography: [
          "OSTERWALDER, A.; PIGNEUR, Y. Business Model Generation. Wiley, 2010.",
          "RIES, E. The Lean Startup. Crown Business, 2011.",
          "DORNELAS, J. Empreendedorismo. 8ª ed. Empreende, 2021."
        ]
      }
    ]
  },
  {
    id: 16,
    title: "8º Semestre — Formação Profissional",
    icon: "GraduationCap",
    blocks: [
      {
        id: 59,
        title: "Metodologia Científica e Trabalho de Conclusão de Curso",
        topics: [
          { id: "59-1", title: "Tipos de pesquisa (Básica/Aplicada, Quali/Quanti), Método científico e Revisão de literatura" },
          { id: "59-2", title: "Bases de dados (PubMed, Scopus, WoS, IEEE, Scielo) e Normas ABNT" },
          { id: "59-3", title: "Elaboração de artigos, TCC, Iniciação científica e Ética em pesquisa" }
        ],
        bibliography: [
          "LAKATOS, E.; MARCONI, M. Fundamentos de Metodologia Científica. 9ª ed. Atlas, 2021.",
          "GIL, A. Como Elaborar Projetos de Pesquisa. 7ª ed. Atlas, 2022."
        ]
      },
      {
        id: 60,
        title: "Comunicação, Cidadania e Diversidade",
        topics: [
          { id: "60-1", title: "Produção textual e comunicação técnica" },
          { id: "60-2", title: "Libras (Língua Brasileira de Sinais) e Inclusão de pessoas surdas" },
          { id: "60-3", title: "Relações étnico-raciais (Leis 10.639/2003 e 11.645/2008) e Direitos humanos" },
          { id: "60-4", title: "Formação cidadã contemporânea e Diversidade" }
        ],
        bibliography: [
          "QUADROS, R. M. Educação de Surdos. Artmed, 1997.",
          "BRASIL. Lei nº 10.639/2003 e Lei nº 11.645/2008."
        ]
      },
      {
        id: 61,
        title: "Sustentabilidade e Meio Ambiente",
        topics: [
          { id: "61-1", title: "Ciências do ambiente e Sustentabilidade aplicada à engenharia" },
          { id: "61-2", title: "Gestão ambiental hospitalar, PGRSS (RDC 222/2018) e Eficiência energética" },
          { id: "61-3", title: "Pegada de carbono em saúde" }
        ],
        bibliography: [
          "BRAGA, B. et al. Introdução à Engenharia Ambiental. 2ª ed. Pearson, 2005.",
          "ANVISA. RDC nº 222/2018 — RSS."
        ]
      },
      {
        id: 62,
        title: "Estágio Supervisionado e Atividades Complementares",
        topics: [
          { id: "62-1", title: "Estágio (Hospitalar, Industrial, Pesquisa) e Atividades de Extensão" },
          { id: "62-2", title: "Atividades complementares (Palestras, Congressos, Monitoria, IC)" },
          { id: "62-3", title: "ENADE como componente curricular (Lei 10.861/2004 — SINAES) e Lei de Estágio (11.788/2008)" }
        ],
        bibliography: [
          "BRASIL. Lei nº 11.788/2008 — Lei de Estágio.",
          "BRASIL. Lei nº 10.861/2004 — SINAES/ENADE."
        ]
      }
    ]
  }
];
