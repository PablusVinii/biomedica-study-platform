import { Part } from "./types";

export const interoperabilityCurriculumData: Part[] = [
  {
    id: 101,
    title: "Camada 1 — Fundamentos Técnicos de Software",
    icon: "Code",
    blocks: [
      {
        id: 101,
        title: "Fundamentos de Engenharia de Software para Saúde",
        content: `**Critério de domínio verificável:** Você consegue projetar do zero, codar, testar, deployar e operar um servidor FHIR customizado com autenticação OAuth2, persistência em PostgreSQL, métricas exportadas para Prometheus, deploy em container, e CI rodando testes a cada commit. Tudo isso documentado e versionado em GitHub público.`,
        topics: [
          { id: "101-1", title: "Programação aplicada (Python, Java, C# ou JS/TS)" },
          { id: "101-2", title: "Arquitetura de software e princípios SOLID" },
          { id: "101-3", title: "APIs RESTful e OpenAPI/Swagger" },
          { id: "101-4", title: "Bancos de dados SQL (PostgreSQL avançado) e NoSQL" },
          { id: "101-5", title: "Containerização (Docker/Kubernetes) e DevOps" },
          { id: "101-6", title: "Controle de versão (Git profissional)" },
          { id: "101-7", title: "Testes automatizados (Unit, Integration, E2E)" },
          { id: "101-8", title: "Observabilidade (Logging, Métricas, Tracing)" }
        ],
        bibliography: [
          "KLEPPMANN, Martin. Designing Data-Intensive Applications. O'Reilly, 2017.",
          "MARTIN, Robert C. Clean Code e Clean Architecture.",
          "THOMAS, David; HUNT, Andrew. The Pragmatic Programmer.",
          "Documentação oficial PostgreSQL, Docker, GitHub Actions."
        ]
      }
    ]
  },
  {
    id: 102,
    title: "Camada 2 — Padrões e Protocolos de Saúde",
    icon: "Network",
    blocks: [
      {
        id: 102,
        title: "HL7 FHIR, V2 e Outros Padrões Críticos",
        content: `**Critério de domínio verificável:** Você consegue receber uma mensagem HL7 V2 ADT^A01 do "Tasy", convertê-la em Bundle FHIR conforme o BR-Core, validar contra o servidor de homologação RNDS, e responder os erros 422 com correção fundamentada na spec, em menos de 4 horas.`,
        topics: [
          { id: "102-1", title: "HL7 FHIR R4/R5: Estrutura, Recursos e DataTypes" },
          { id: "102-2", title: "FHIR Search, Profiling (Extensions, Slicing)" },
          { id: "102-3", title: "Terminology Services e Bulk Data Access" },
          { id: "102-4", title: "HL7 V2.x: Estrutura de mensagens e mapeamento V2→FHIR" },
          { id: "102-5", title: "HL7 CDA (Clinical Document Architecture)" },
          { id: "102-6", title: "DICOM e DICOM Web para imagens médicas" },
          { id: "102-7", title: "IHE Profiles (XDS, PIX, PDQ, ATNA)" },
          { id: "102-8", title: "openEHR e integração com FHIR" }
        ],
        bibliography: [
          "BENSON, Tim; GRIEVE, Grahame. Principles of Health Interoperability. 4ª ed. Springer, 2021.",
          "Spec FHIR R4 oficial: hl7.org/fhir/R4.",
          "IHE Technical Frameworks: profiles.ihe.net.",
          "DICOM Standard: dicomstandard.org."
        ]
      }
    ]
  },
  {
    id: 103,
    title: "Camada 3 — Terminologias Clínicas",
    icon: "Languages",
    blocks: [
      {
        id: 103,
        title: "Interoperabilidade Semântica e Vocabulários",
        content: `**Critério de domínio verificável:** Dado um resultado de laboratório bruto, você identifica o código LOINC correto, representa em FHIR Observation com UCUM, mapeia para OMOP CDM e gera ConceptMap formal.`,
        topics: [
          { id: "103-1", title: "SNOMED CT: Estrutura, Hierarquias e Subset Brasileiro" },
          { id: "103-2", title: "LOINC: Eixos, Laboratório e Mapeamento para TUSS" },
          { id: "103-3", title: "CID-10 e CID-11: Transição e Uso em Morbidade" },
          { id: "103-4", title: "CIAP-2 (ICPC-2) para Atenção Primária" },
          { id: "103-5", title: "TUSS (ANS) e SIGTAP (SUS): Faturamento e Procedimentos" },
          { id: "103-6", title: "RxNorm, DEF e Medicamentos (ATC/CMED)" },
          { id: "103-7", title: "Unidades de Medida (UCUM) e Vocabulários Administrativos" }
        ],
        bibliography: [
          "SNOMED International eLearning Platform.",
          "LOINC University (Regenstrief).",
          "Athena (OHDSI) Vocabulary Browser.",
          "BR-Core ValueSets no Simplifier."
        ]
      }
    ]
  },
  {
    id: 104,
    title: "Camada 4 — Segurança, Privacidade e Identidade",
    icon: "ShieldCheck",
    blocks: [
      {
        id: 104,
        title: "Segurança e Conformidade LGPD em Saúde",
        content: `**Critério de domínio verificável:** Você desenha a arquitetura de segurança de uma healthtech com gov.br, RNDS (mTLS), SMART on FHIR e consentimento granular auditável, implementando um PoC funcional.`,
        topics: [
          { id: "104-1", title: "OAuth 2.0, OpenID Connect e PKCE" },
          { id: "104-2", title: "SMART on FHIR: App Launch e Scopes" },
          { id: "104-3", title: "mTLS e Certificação Digital (ICP-Brasil)" },
          { id: "104-4", title: "Criptografia aplicada (TLS, Repouso, KMS, HSM)" },
          { id: "104-5", title: "LGPD aplicada: Bases legais e Dados Sensíveis" },
          { id: "104-6", title: "Resoluções CFM 1.821/2007 e 2.314/2022" },
          { id: "104-7", title: "De-identificação e Anonimização (K-anonymity, ARX)" }
        ],
        bibliography: [
          "RICHER, Justin; SANSO, Antonio. OAuth 2 in Action. Manning, 2017.",
          "SMART App Launch Framework: hl7.org/fhir/smart-app-launch.",
          "Lei nº 13.709/2018 (LGPD).",
          "ISO/IEC 27001:2022 e 27799:2016."
        ]
      }
    ]
  },
  {
    id: 105,
    title: "Camada 5 — Conhecimento Clínico e SUS",
    icon: "Stethoscope",
    blocks: [
      {
        id: 105,
        title: "Ecossistema de Saúde Brasileiro e Processos Clínicos",
        content: `**Critério de domínio verificável:** Você mapeia o fluxo de cuidado de uma linha (ex.: hipertensão na APS) com um médico e desenha diagramas de sequência usando BR-Core com semântica correta.`,
        topics: [
          { id: "105-1", title: "Anatomia e Fisiopatologia funcional para TI" },
          { id: "105-2", title: "Processos Clínicos: Anamnese, Prescrição e SOAP" },
          { id: "105-3", title: "SUS: Princípios, Níveis de Atenção e ESD28" },
          { id: "105-4", title: "Sistemas de Informação SUS (SISAB, SIM, SIH, e-SUS)" },
          { id: "105-5", title: "Saúde Suplementar: ANS, Operadoras e Padrão TISS" },
          { id: "105-6", title: "Epidemiologia e Economia da Saúde" },
          { id: "105-7", title: "Fluxos Críticos: Jornada do Paciente, Lab, Imagem e Cirúrgico" }
        ],
        bibliography: [
          "GUSSO; LOPES. Tratado de Medicina de Família e Comunidade.",
          "PAIM, Jairnilson. O que é o SUS. Fiocruz.",
          "Cursos AVASUS (Saúde Digital).",
          "Estratégia de Saúde Digital 2020-2028 (ESD28)."
        ]
      }
    ]
  },
  {
    id: 106,
    title: "Camada 6 — Dados, IA e Pesquisa Clínica",
    icon: "Database",
    blocks: [
      {
        id: 106,
        title: "Ciência de Dados em Saúde e OMOP CDM",
        content: `**Critério de domínio verificável:** Você transforma 10k Bundles FHIR para OMOP CDM, roda DataQualityDashboard e gera um modelo preditivo de progressão de doença reprodutível.`,
        topics: [
          { id: "106-1", title: "Engenharia de Dados: Pipelines ETL/ELT e Data Lakes" },
          { id: "106-2", title: "OMOP CDM (OHDSI): Schema, Vocabulários e ATLAS" },
          { id: "106-3", title: "Qualidade de Dados: Framework de Kahn e DQD" },
          { id: "106-4", title: "Machine Learning em Saúde: Feature Engineering Longitudinal" },
          { id: "106-5", title: "NLP Clínico e LLMs Aplicados (Med-PaLM, Clinical-T5)" },
          { id: "106-6", title: "Real-World Evidence (RWE) e Inferência Causal" },
          { id: "106-7", title: "Avaliação e Reporting Guidelines (TRIPOD-AI, STARD-AI)" }
        ],
        bibliography: [
          "The Book of OHDSI: ohdsi.github.io/TheBookOfOhdsi.",
          "HERNÁN; ROBINS. Causal Inference: What If.",
          "TOPOL, Eric. Deep Medicine. Basic Books, 2019.",
          "TRIPOD-AI statement (Collins et al. BMJ 2024)."
        ]
      }
    ]
  },
  {
    id: 107,
    title: "Camada 7 — Regulação e Engenharia Clínica",
    icon: "Scale",
    blocks: [
      {
        id: 107,
        title: "Assuntos Regulatórios (ANVISA) e Qualidade",
        content: `**Critério de domínio verificável:** Dado um SaMD hipotético, você classifica o risco, lista obrigações ANVISA, monta plano ISO 14971 e ciclo de vida IEC 62304.`,
        topics: [
          { id: "107-1", title: "Regulamentação ANVISA: RDC 751, 657, 848 e 665" },
          { id: "107-2", title: "Normas de Qualidade: ISO 13485 e ISO 14971" },
          { id: "107-3", title: "Ciclo de Vida de Software Médico: IEC 62304 e Usabilidade" },
          { id: "107-4", title: "Série IEC 60601 para Equipamentos Eletromédicos" },
          { id: "107-5", title: "IMDRF Framework para SaMD e GMLP" },
          { id: "107-6", title: "Acreditação Hospitalar (ONA, JCI, HIMSS EMRAM)" },
          { id: "107-7", title: "Segurança do Paciente e Tecnovigilância" }
        ],
        bibliography: [
          "Portal ANVISA: RDCs originais.",
          "COSTA-FELIX. Equipamentos Eletromédicos. Brasport.",
          "IMDRF working group documents.",
          "HIMSS EMRAM model documentation."
        ]
      }
    ]
  },
  {
    id: 108,
    title: "Camada 8 — Habilidades de Negócio e Liderança",
    icon: "Users",
    blocks: [
      {
        id: 108,
        title: "Liderança, Consultoria e Estratégia em Healthtech",
        content: `**Critério de domínio verificável:** Você fecha um contrato comercial com CTO de healthtech após 60 min de reunião, propondo arquitetura, custo e cronograma.`,
        topics: [
          { id: "108-1", title: "Comunicação Técnica: ADRs, Design Docs e Runbooks" },
          { id: "108-2", title: "Discovery e Requisitos: User Story Mapping em Saúde" },
          { id: "108-3", title: "Gestão de Projetos Ágeis e Gestão de Riscos" },
          { id: "108-4", title: "Vendas Técnicas e Precificação por Valor" },
          { id: "108-5", title: "Liderança, Mentoria e Code Review" },
          { id: "108-6", title: "Estratégia: Lean Startup e Métricas (CAC, LTV)" },
          { id: "108-7", title: "Inglês Técnico e Networking Estratégico" }
        ],
        bibliography: [
          "PATTERSON et al. Crucial Conversations.",
          "FITZPATRICK, Rob. The Mom Test.",
          "VOSS, Chris. Never Split the Difference.",
          "KNAFLIC. Storytelling with Data."
        ]
      }
    ]
  }
];
