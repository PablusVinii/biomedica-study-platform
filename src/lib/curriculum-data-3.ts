import { Part } from "./types";

export const curriculumData3: Part[] = [
  {
    id: 9,
    title: "5º Semestre — Imagens Médicas",
    icon: "ScanLine",
    blocks: [
      {
        id: 34,
        title: "Equipamentos de Imagem",
        topics: [
          { id: "34-1", title: "Radiografia digital (RX) — tubo de raios-X, detectores CR/DR, geração de imagem" },
          { id: "34-2", title: "Mamografia (digital e tomossíntese)" },
          { id: "34-3", title: "Fluoroscopia e angiografia digital" },
          { id: "34-4", title: "Tomografia Computadorizada (TC) — gerações, reconstrução, multidetectores" },
          { id: "34-5", title: "Ressonância Magnética (RM) — magneto, gradientes, RF, sequências (T1, T2, FLAIR, DWI, fMRI)" },
          { id: "34-6", title: "Ultrassonografia — princípio piezoelétrico, modos (A, B, M, Doppler), transdutores" },
          { id: "34-7", title: "Medicina Nuclear — gama-câmara, SPECT, radiofármacos" },
          { id: "34-8", title: "PET (Positron Emission Tomography) e PET/CT, PET/RM" },
          { id: "34-9", title: "Endoscopia e microscopia óptica/eletrônica" },
          { id: "34-10", title: "Microscopia confocal, multifotônica, SHG, Raman, SERS, CARS" },
          { id: "34-11", title: "OCT (Tomografia de Coerência Óptica)" },
          { id: "34-12", title: "Pinças ópticas (manipulação celular)" },
          { id: "34-13", title: "PACS, DICOM, RIS" }
        ],
        bibliography: [
          "BUSHBERG, J. et al. The Essential Physics of Medical Imaging. 4ª ed. Wolters Kluwer, 2020.",
          "WEBB, A.; SMITH, N. Introduction to Medical Imaging. Cambridge, 2010.",
          "SUETENS, P. Fundamentals of Medical Imaging. 3ª ed. Cambridge, 2017."
        ]
      },
      {
        id: 35,
        title: "Física Médica e Radiações",
        topics: [
          { id: "35-1", title: "Espectro eletromagnético aplicado à medicina" },
          { id: "35-2", title: "Interação da radiação ionizante com a matéria (efeito fotoelétrico, Compton, formação de pares)" },
          { id: "35-3", title: "Interação da luz com tecidos biológicos" },
          { id: "35-4", title: "Dosimetria das radiações" },
          { id: "35-5", title: "Proteção radiológica (princípios ALARA, ICRP)" },
          { id: "35-6", title: "Radioterapia (teleterapia, braquiterapia, IMRT, VMAT)" },
          { id: "35-7", title: "Aceleradores lineares" },
          { id: "35-8", title: "Lasers em medicina (princípios e aplicações)" },
          { id: "35-9", title: "Fundamentos de microscopia óptica avançada" },
          { id: "35-10", title: "FLIM, FRET, FCS" },
          { id: "35-11", title: "Quantum dots" },
          { id: "35-12", title: "Nanopartículas e nanotubos de carbono em saúde" },
          { id: "35-13", title: "Biossensores nanoestruturados" }
        ],
        bibliography: [
          "KHAN, F. The Physics of Radiation Therapy. 5ª ed. Wolters Kluwer, 2014.",
          "ATTIX, F. H. Introduction to Radiological Physics and Radiation Dosimetry. Wiley, 2004.",
          "PRASAD, P. N. Introduction to Biophotonics. Wiley, 2003.",
          "BRASIL. RDC ANVISA nº 611, de 9 de março de 2022 — blindagem radiológica."
        ]
      }
    ]
  },
  {
    id: 10,
    title: "5º Semestre — Engenharia Clínica e Hospitalar",
    icon: "Building2",
    blocks: [
      {
        id: 36,
        title: "Engenharia Clínica",
        topics: [
          { id: "36-1", title: "Histórico, atribuições e papel do engenheiro clínico" },
          { id: "36-2", title: "Estrutura médico-hospitalar (visão sistêmica)" },
          { id: "36-3", title: "Gestão de tecnologia em saúde (HTM — Health Technology Management)" },
          { id: "36-4", title: "Ciclo de vida de equipamentos médico-hospitalares (EMH): Planejamento e priorização" },
          { id: "36-5", title: "Avaliação técnica e especificação" },
          { id: "36-6", title: "Aquisição e licitação" },
          { id: "36-7", title: "Recebimento e instalação" },
          { id: "36-8", title: "Treinamento de usuários" },
          { id: "36-9", title: "Manutenção preventiva e corretiva" },
          { id: "36-10", title: "Calibração" },
          { id: "36-11", title: "Desativação e descarte" },
          { id: "36-12", title: "Indicadores de gestão (MTBF, MTTR, disponibilidade)" },
          { id: "36-13", title: "Sistemas informatizados de gestão (CMMS)" },
          { id: "36-14", title: "Tecnovigilância (notificação à ANVISA — Notivisa)" },
          { id: "36-15", title: "Avaliação de Tecnologias em Saúde (ATS) — CONITEC, REBRATS" },
          { id: "36-16", title: "Engenharia clínica forense" }
        ],
        bibliography: [
          "DYRO, J. Clinical Engineering Handbook. 2ª ed. Academic Press, 2019.",
          "ANTUNES, E. V. Gestão da Tecnologia Biomédica. Saúde + Educação, 2002.",
          "ANVISA. Notivisa — Sistema Nacional de Notificações. https://www.gov.br/anvisa",
          "CONITEC — Comissão Nacional de Incorporação de Tecnologias no SUS. https://www.gov.br/conitec"
        ]
      },
      {
        id: 37,
        title: "Equipamentos Médico-Hospitalares (EMH)",
        topics: [
          { id: "37-1", title: "Equipamentos de Suporte à Vida (Ventiladores, Desfibriladores, Marca-passos, Bombas de Infusão, Hemodiálise, CEC, Incubadoras)" },
          { id: "37-2", title: "Equipamentos de Diagnóstico (ECG, EEG, EMG, Monitores, Oxímetros, Espirômetros, Audiômetros)" },
          { id: "37-3", title: "Equipamentos de Terapia (Bisturi elétrico, Fisioterapia, Litotriptores, Lasers cirúrgicos)" },
          { id: "37-4", title: "Equipamentos de Apoio (Autoclaves, Fluxo laminar, No-breaks, Gases medicinais)" }
        ],
        bibliography: [
          "WEBSTER, J. G. (ed.) Encyclopedia of Medical Devices and Instrumentation. 2ª ed. Wiley, 2006.",
          "IADANZA, E. (ed.) Clinical Engineering Handbook. 2ª ed. Academic Press, 2019."
        ]
      },
      {
        id: 38,
        title: "Instalações Elétricas e Infraestrutura Hospitalar",
        topics: [
          { id: "38-1", title: "Estabelecimentos Assistenciais de Saúde (EAS) — classificação" },
          { id: "38-2", title: "Normas para instalações elétricas hospitalares: ABNT NBR 13534, ABNT NBR 5410, ABNT NBR 7256" },
          { id: "38-3", title: "Sistema IT médico (transformador de isolação, DPS, supervisor)" },
          { id: "38-4", title: "Áreas de pacientes (grupo 0, 1, 2) e aterramento equipotencial" },
          { id: "38-5", title: "Alimentação elétrica de emergência (grupos 1 e 2)" },
          { id: "38-6", title: "Gases medicinais (oxigênio, ar comprimido, vácuo, óxido nitroso)" },
          { id: "38-7", title: "Sistemas HVAC hospitalar (pressões diferenciais, filtros HEPA)" },
          { id: "38-8", title: "Blindagem radiológica" },
          { id: "38-9", title: "Segurança elétrica em equipamentos (correntes de fuga, classes B, BF, CF)" }
        ],
        bibliography: [
          "ABNT. NBR 13534:2008 — Instalações elétricas de baixa tensão — Requisitos específicos para EAS.",
          "ABNT. NBR 5410:2004 — Instalações elétricas de baixa tensão.",
          "ABNT. NBR 7256 — Tratamento de ar em EAS.",
          "ANVISA. RDC nº 50/2002 — Regulamento técnico para planejamento, programação, elaboração e avaliação de projetos físicos de EAS."
        ]
      },
      {
        id: 39,
        title: "Metrologia em Saúde",
        topics: [
          { id: "39-1", title: "Conceitos básicos de metrologia (rastreabilidade, incerteza, calibração)" },
          { id: "39-2", title: "Sistema Internacional de Unidades (SI) e VIM" },
          { id: "39-3", title: "Sistemas metrológicos (internacional, nacional, INMETRO)" },
          { id: "39-4", title: "Avaliação e expressão da incerteza de medição (GUM)" },
          { id: "39-5", title: "Calibração de equipamentos médicos" },
          { id: "39-6", title: "Padronização e normalização" },
          { id: "39-7", title: "Aplicações em laboratórios clínicos, centros cirúrgicos, UTI" },
          { id: "39-8", title: "Confiabilidade metrológica" }
        ],
        bibliography: [
          "INMETRO. Vocabulário Internacional de Metrologia (VIM). 1ª ed. brasileira, 2012.",
          "ISO/IEC Guide 98-3:2008 — Uncertainty of measurement (GUM).",
          "ALBERTAZZI, A.; SOUSA, A. R. Fundamentos de Metrologia Científica e Industrial. 2ª ed. Manole, 2017."
        ]
      }
    ]
  },
  {
    id: 11,
    title: "6º Semestre — Biomateriais e Assistivas",
    icon: "Bone",
    blocks: [
      {
        id: 40,
        title: "Biomateriais",
        topics: [
          { id: "40-1", title: "Definição e classificação (naturais e sintéticos)" },
          { id: "40-2", title: "Metais biomédicos (titânio, aço inoxidável, ligas Co-Cr)" },
          { id: "40-3", title: "Polímeros biomédicos (PMMA, PE, PLA, PGA, silicone)" },
          { id: "40-4", title: "Cerâmicas (alumina, zircônia, hidroxiapatita) e compósitos" },
          { id: "40-5", title: "Biomateriais bioativos e biorreabsorvíveis" }
        ],
        bibliography: [
          "RATNAR, B. et al. Biomaterials Science: An Introduction to Materials in Medicine. 4ª ed. Academic Press, 2020.",
          "PARK, J.; LAKES, R. Biomaterials: An Introduction. 3ª ed. Springer, 2007.",
          "ISO 10993 (série) — Biological evaluation of medical devices."
        ]
      },
      {
        id: 41,
        title: "Biocompatibilidade",
        topics: [
          { id: "41-1", title: "Definições de biocompatibilidade e resposta tecidual a implantes" },
          { id: "41-2", title: "Reações imunológicas e toxicidade" },
          { id: "41-3", title: "Avaliação in vitro e in vivo (triagem clínica, testes em animais)" },
          { id: "41-4", title: "ISO 10993 — Avaliação biológica de dispositivos médicos" }
        ],
        bibliography: [
          "RATNAR, B. et al. Biomaterials Science: An Introduction to Materials in Medicine. 4ª ed. Academic Press, 2020.",
          "PARK, J.; LAKES, R. Biomaterials: An Introduction. 3ª ed. Springer, 2007.",
          "ISO 10993 (série) — Biological evaluation of medical devices."
        ]
      },
      {
        id: 42,
        title: "Engenharia de Tecidos",
        topics: [
          { id: "42-1", title: "Fundamentos de biologia celular e células-tronco" },
          { id: "42-2", title: "Cultivo celular 2D/3D e Scaffolds (estruturas de suporte)" },
          { id: "42-3", title: "Biorreatores, vascularização e angiogênese" },
          { id: "42-4", title: "Tecidos específicos (epiteliais, ósseos, cartilaginosos, vasculares, nervosos)" },
          { id: "42-5", title: "Bioprinting (impressão 3D de tecidos) e ensaios clínicos" }
        ],
        bibliography: [
          "LANZA, R.; LANGER, R.; VACANTI, J. Principles of Tissue Engineering. 5ª ed. Academic Press, 2020.",
          "SALTZMAN, W. M. Tissue Engineering: Engineering Principles for the Design of Replacement Organs and Tissues. Oxford, 2004."
        ]
      },
      {
        id: 43,
        title: "Próteses, Órteses e Tecnologias Assistivas",
        topics: [
          { id: "43-1", title: "Conceitos de engenharia de reabilitação e independência" },
          { id: "43-2", title: "Próteses de membros (superiores/inferiores) e mioelétricas/biônicas" },
          { id: "43-3", title: "Órteses ortopédicas e neurológicas" },
          { id: "43-4", title: "Implantes cocleares e próteses retinianas" },
          { id: "43-5", title: "Tecnologias assistivas (comunicação, mobilidade, BCI)" },
          { id: "43-6", title: "Robótica assistiva, exoesqueletos e realidade virtual/aumentada" },
          { id: "43-7", title: "Telerreabilitação, acessibilidade e Estatuto da Pessoa com Deficiência (Lei 13.146/2015)" }
        ],
        bibliography: [
          "BRONZINO, J. D. (cap. Rehabilitation Engineering). CRC Press.",
          "COOPER, R.; OHNABE, H.; HOBSON, D. (eds.) An Introduction to Rehabilitation Engineering. CRC Press, 2007.",
          "LEI nº 13.146/2015 — Estatuto da Pessoa com Deficiência."
        ]
      }
    ]
  },
  {
    id: 12,
    title: "6º Semestre — Biomecânica e Cinesiologia",
    icon: "Footprints",
    blocks: [
      {
        id: 44,
        title: "Biomecânica",
        topics: [
          { id: "44-1", title: "História, conceitos básicos e anatomia funcional" },
          { id: "44-2", title: "Cinemática e cinética aplicadas ao corpo humano (equilíbrio e estabilidade)" },
          { id: "44-3", title: "Mecânica dos corpos rígidos e sólidos (tração, compressão, flexão, torção)" },
          { id: "44-4", title: "Propriedades mecânicas dos tecidos (osso, cartilagem, ligamento, músculo)" },
          { id: "44-5", title: "Marcha fisiológica e patológica" },
          { id: "44-6", title: "Biomecânica do esporte e ocupacional" },
          { id: "44-7", title: "Análise do movimento e instrumentação (plataforma de força, EMG, captura de movimento)" }
        ],
        bibliography: [
          "HALL, S. J. Biomecânica Básica. 7ª ed. Guanabara Koogan, 2016.",
          "NORDIN, M.; FRANKEL, V. Biomecânica Básica do Sistema Musculoesquelético. 4ª ed. Guanabara Koogan, 2014.",
          "WINTER, D. A. Biomechanics and Motor Control of Human Movement. 4ª ed. Wiley, 2009."
        ]
      },
      {
        id: 45,
        title: "Cinesiologia",
        topics: [
          { id: "45-1", title: "Sistema esquelético e articular sob a ótica do movimento" },
          { id: "45-2", title: "Sistema muscular e produção de força" },
          { id: "45-3", title: "Análise cinesiológica regional (membros, tronco, postura e equilíbrio)" }
        ],
        bibliography: [
          "NEUMANN, D. A. Cinesiologia do Aparelho Musculoesquelético. 3ª ed. Elsevier, 2018."
        ]
      }
    ]
  }
];
