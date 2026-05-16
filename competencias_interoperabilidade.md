# Mapa de Competências — Especialista em Interoperabilidade em Saúde

**O profissional indispensável ao mercado brasileiro de saúde digital.**

Este documento define o **conjunto mínimo de competências** que separa "alguém que sabe FHIR" de "o profissional que healthtechs, hospitais e o governo precisam contratar agora". Cada camada tem critério de domínio verificável e fonte real para estudo.

A premissa é simples: **interoperabilidade em saúde é um problema de 4 níveis** segundo a framework europeia adotada também pelo Brasil — técnico, semântico, organizacional e legal. Especialistas medíocres dominam só o nível técnico. Especialistas indispensáveis dominam os 4.

> **Princípio orientador:** o mercado não paga pela tecnologia, paga pelo *outcome*. Quem domina apenas FHIR é commodity em 24 meses. Quem entende o ecossistema clínico, regulatório, de negócio e tecnológico **inteiro** continua escasso por uma década.

---

## Camada 1 — Fundamentos Técnicos de Software

**Por que é indispensável:** sem isto, você é "analista de processos que conhece FHIR". O mercado paga por engenheiro de software com domínio do padrão, não o contrário. Recrutadores filtram CVs por essas habilidades antes mesmo de avaliar FHIR.

### Competências essenciais

- **Programação aplicada em pelo menos uma linguagem moderna** (Python, Java, C# ou JavaScript/TypeScript). Domínio real, não tutorial. Saber estruturar código, escrever testes, fazer code review, debugar produção.
- **Arquitetura de software:** padrões (MVC, hexagonal, eventos), princípios SOLID, separação de responsabilidades, design para evolução.
- **APIs RESTful:** verbos HTTP, status codes, idempotência, paginação, versionamento, OpenAPI/Swagger. Capacidade de projetar uma API do zero e justificar cada decisão.
- **Bancos de dados:** SQL nível avançado (joins complexos, CTEs, window functions, planos de execução, índices), PostgreSQL específicamente (é o BD de fato do ecossistema FHIR/OMOP). NoSQL básico (MongoDB, Redis) para casos de cache e busca.
- **Containerização e DevOps:** Docker, docker-compose, noções de Kubernetes, CI/CD (GitHub Actions, GitLab CI), deploy em nuvem (AWS, GCP ou Azure).
- **Controle de versão:** Git em nível profissional (branches, rebase, merge conflicts, PRs, code review).
- **Testes automatizados:** unit, integration, e2e. TDD/BDD. Cobertura significativa, não simbólica.
- **Observabilidade:** logging estruturado, métricas (Prometheus), tracing (OpenTelemetry), alertas. Sem isso, sistema de saúde em produção é roleta-russa.

### Critério de domínio verificável

> Você consegue projetar do zero, codar, testar, deployar e operar um servidor FHIR customizado com autenticação OAuth2, persistência em PostgreSQL, métricas exportadas para Prometheus, deploy em container, e CI rodando testes a cada commit. Tudo isso documentado e versionado em GitHub público.

### Fontes para estudo

- *Designing Data-Intensive Applications* — Martin Kleppmann (O'Reilly, 2017). Bíblia de arquitetura moderna.
- *Clean Code* e *Clean Architecture* — Robert C. Martin.
- *The Pragmatic Programmer* — David Thomas, Andrew Hunt (20th anniversary edition).
- *Fluent Python* — Luciano Ramalho, ou equivalente na linguagem de escolha.
- Documentação oficial PostgreSQL, Docker, GitHub Actions.
- Cursos: roadmap.sh/backend, fundamentals da CNCF (Cloud Native Computing Foundation).

---

## Camada 2 — Padrões e Protocolos de Saúde

**Por que é indispensável:** este é o "ferro" do ofício. Mas atenção: profissional indispensável domina **a família inteira** de padrões, não apenas FHIR. A realidade brasileira é que hospitais convivem com V2, CDA, FHIR, X12 e proprietários ao mesmo tempo. Quem só sabe FHIR não consegue resolver o problema real.

### Competências essenciais

**HL7 FHIR (R4 e introdução a R5/R6):**
- Recursos completos: estrutura, campos, cardinalidades, invariantes.
- DataTypes complexos (Identifier, CodeableConcept, Reference, Quantity, Period, Money, Address, HumanName).
- Bundles: transaction, batch, document, message, history, searchset.
- Search: parâmetros comuns, modifiers, chaining, _include, _revinclude, _has, _filter, composite.
- Profiling: StructureDefinition, slicing, must-support, cardinality refinement.
- Extensions e ExtensionDefinition.
- ValueSet, CodeSystem, ConceptMap, NamingSystem.
- Terminology services: $expand, $lookup, $validate-code, $translate, $subsumes.
- Operations e custom operations.
- Versioning (resource version, conformance version), conditional reads/writes.
- Subscription (R4 e R5/Topic-based), persistent vs WebSocket.
- Bulk Data Access (Flat FHIR / async API).
- Provenance, AuditEvent e cadeia de custódia.

**HL7 V2.x:**
- Estrutura de mensagens (MSH, segmentos, campos, componentes, subcomponentes).
- Mensagens críticas: ADT (admissão/alta/transferência), ORM (pedidos), ORU (resultados), SIU (agendamento), DFT (financeiro), MDM (documentos).
- Acknowledgment patterns (ACK, NACK).
- Mapeamento V2→FHIR (projeto oficial HL7 v2-to-fhir).

**HL7 CDA (Clinical Document Architecture):**
- R2 fundamentals.
- Estrutura de documentos: header, body (structured/unstructured).
- Templates IHE: CCD, C-CDA.
- Migração CDA → FHIR Document.

**DICOM:**
- Estrutura do objeto DICOM (PixelData, metadados, UID, SOPClass).
- Serviços DICOM (C-STORE, C-FIND, C-MOVE, WADO/WADO-RS).
- DICOM Web (QIDO, WADO-RS, STOW-RS).
- Integração DICOM ↔ FHIR via ImagingStudy.

**IHE Profiles:**
- IHE ITI (Technical Framework): XDS, PIX, PDQ, ATNA, CT, BPPC, MHD.
- IHE PCC, IHE QED, IHE PCD (Patient Care Devices).
- IHE Connectathons como prova de conformidade.

**openEHR (introdução):**
- Modelo dual (RM + arquétipos).
- AQL (Archetype Query Language).
- Quando usar openEHR vs FHIR (e como integrar os dois).

**X12 (saúde nos EUA, relevante se atender clientes US ou operadoras):**
- 837 (claims), 835 (remittance), 270/271 (eligibility).

### Critério de domínio verificável

> Você consegue receber uma mensagem HL7 V2 ADT^A01 do "Tasy" de um hospital, convertê-la em Bundle FHIR conforme o BR-Core (com Patient + Encounter + Practitioner + Organization + extensões brasileiras), validar contra o servidor de homologação RNDS, e responder os erros 422 que aparecerem com correção fundamentada na spec, tudo isso em menos de 4 horas de trabalho.

### Fontes para estudo

- **Spec FHIR R4 oficial:** [hl7.org/fhir/R4](https://hl7.org/fhir/R4) — leia inteira ao longo da carreira.
- **FHIR Bootcamp HL7:** material oficial, exercícios guiados.
- **HL7 V2.5 / V2.6 / V2.9** specs oficiais da HL7 International.
- *Principles of Health Interoperability: FHIR, HL7 and SNOMED CT* — Tim Benson, Grahame Grieve (Springer, 4ª ed., 2021). **Livro de cabeceira.**
- IHE Technical Frameworks (gratuitos): [profiles.ihe.net](https://profiles.ihe.net).
- DICOM Standard: [dicomstandard.org](https://dicomstandard.org).
- openEHR Foundation: [openehr.org](https://openehr.org).
- Cursos HL7 Brasil (Fundamentos + Intermediário) — 11ª edição Fundamentos começa em 18/05/2026; 1ª edição Intermediário em 16/03/2026.
- **HL7 FHIR Foundational Implementer Exam** (certificação internacional reconhecida) — agendar e prestar.

---

## Camada 3 — Terminologias Clínicas

**Por que é indispensável:** sem terminologia, dois sistemas que "trocam FHIR" continuam falando línguas diferentes. Este é o nível de **interoperabilidade semântica**, e é a habilidade mais escassa do mercado brasileiro. Profissional comum sabe que SNOMED existe; especialista sabe quando e como usá-lo em vez de CID, e por quê.

### Competências essenciais

**SNOMED CT:**
- Estrutura: concepts, descriptions, relationships, refsets.
- Hierarquias (clinical finding, procedure, body structure, substance, organism etc.).
- Expressões pós-coordenadas.
- Brasil aderiu em 2020 — está disponível como tradução.
- Subset brasileiro e nacionais.
- Operações: $closure, hierarchical search.

**LOINC:**
- Estrutura: 6 axes (component, property, time, system, scale, method).
- LOINC Parts.
- Foco em laboratório (resultados, painéis), mas também sinais vitais, documentos clínicos.
- Mapeamento LOINC → exames brasileiros (TUSS, parâmetros locais) — **gap real do mercado**.
- LOINC-FHIR integration patterns.

**CID-10 e CID-11:**
- Estrutura hierárquica.
- Status atual no Brasil (CID-10 ainda obrigatório em vários sistemas; CID-11 em transição).
- Conversão CID-10 ↔ CID-11.
- Uso em mortalidade (SIM) e morbidade.

**CIAP-2 (ICPC-2):**
- Terminologia da Atenção Primária à Saúde.
- Usada no e-SUS APS / PEC.
- Estrutura: capítulos por sistema corporal + componentes (sintomas, processos, diagnósticos).

**TUSS:**
- Terminologia Unificada da Saúde Suplementar (ANS).
- Procedimentos, OPME (órteses, próteses, materiais especiais), diárias e taxas, gases medicinais, medicamentos.
- Conversão TUSS ↔ SIGTAP (procedimentos SUS).
- Crítica para integração com operadoras.

**SIGTAP:**
- Sistema de Gerenciamento da Tabela de Procedimentos do SUS.
- Códigos AIH, BPA, APAC.

**RxNorm e medicamentos:**
- RxNorm (US) para fármacos.
- DEF brasileiro, CMED (Câmara de Regulação do Mercado de Medicamentos).
- ATC (Anatomical Therapeutic Chemical) — classificação WHO.
- Uso em prescrição eletrônica.

**Outras relevantes:**
- UCUM (unidades de medida).
- HL7 Terminology (administrativo).
- ISO 3166 (países), BCP 47 (idiomas).
- CBO (Classificação Brasileira de Ocupações) para profissionais de saúde.
- CNES/CBO para vínculo profissional-estabelecimento.

### Critério de domínio verificável

> Dado o resultado bruto "Glicose em jejum 110 mg/dL, método hexoquinase" emitido pelo LIS de um laboratório, você consegue: (1) identificar o código LOINC correto (não inventar — encontrar via Athena/LOINC.org); (2) representá-lo em FHIR Observation com units UCUM corretas; (3) explicar por que LOINC é melhor que TUSS para este caso e quando o oposto é verdadeiro; (4) mapear para measurement_concept_id em OMOP CDM; (5) gerar ConceptMap formal entre o código interno do laboratório e o LOINC. Tudo documentado.

### Fontes para estudo

- **SNOMED International eLearning Platform:** [elearning.ihtsdotools.org](https://elearning.ihtsdotools.org). Cursos oficiais gratuitos.
- **LOINC University:** material gratuito de Regenstrief.
- **Athena (OHDSI):** [athena.ohdsi.org](https://athena.ohdsi.org). Browser unificado de vocabulários.
- *Principles of Health Interoperability* (Benson & Grieve) — Parte II inteira sobre terminologias.
- *SNOMED CT Starter Guide* — SNOMED International (gratuito).
- DATASUS — documentação SIGTAP, SIM, SINASC.
- ANS — documentação TUSS, padrão TISS.
- BR-Core ValueSets no Simplifier.

---

## Camada 4 — Segurança, Privacidade e Identidade

**Por que é indispensável:** dados de saúde são a categoria mais sensível na LGPD. Vazamento custa multa, processo, e fim de carreira. Profissional indispensável **não delega** segurança para "o pessoal de segurança" — domina o suficiente para arquitetar e auditar.

### Competências essenciais

**OAuth 2.0 e OpenID Connect:**
- Fluxos: authorization code, client credentials, device code, refresh token.
- PKCE (obrigatório em fluxos públicos modernos).
- JWT (estrutura, assinatura, claims, validação).
- JWS e JWE.

**SMART on FHIR:**
- App launch (EHR launch, standalone launch).
- Scopes (patient/, user/, system/, .read, .write, .*).
- Launch context (patient, encounter).
- Backend services (system-level access).
- SMART Health Cards e Health Links (atestados verificáveis).

**Autenticação e autorização avançadas:**
- mTLS (mutual TLS) — obrigatório na RNDS.
- ABAC (Attribute-Based Access Control).
- Consent (FHIR Consent resource e fluxos de consentimento granular).
- Break-the-glass procedures.

**Criptografia aplicada:**
- TLS 1.2/1.3 com cifras seguras.
- Criptografia em repouso (campo, banco, disco).
- KMS (Key Management Service).
- Assinatura digital (ICP-Brasil para contextos governamentais; A1/A3).
- HSM (Hardware Security Module) básico.

**LGPD aplicada a dados de saúde:**
- Bases legais para tratamento (consentimento, tutela da saúde, política pública).
- Dados sensíveis (Art. 5 II e Art. 11).
- Direitos do titular: acesso, retificação, eliminação, portabilidade.
- DPO (Data Protection Officer) e governança.
- Resolução CFM 1.821/2007 (prontuário eletrônico).
- Resolução CFM 2.314/2022 (telemedicina).

**ISO/IEC 27001 e 27799:**
- 27001: sistema de gestão de segurança da informação.
- 27799: segurança da informação aplicada à saúde.

**HIPAA (se atender mercado US):**
- Privacy Rule, Security Rule.
- BAA (Business Associate Agreement).
- De-identification (Safe Harbor, Expert Determination).

**De-identificação e anonimização:**
- Técnicas: pseudonimização, k-anonymity, l-diversity, t-closeness.
- Differential privacy (introdução).
- Ferramentas: ARX, Microsoft Presidio.

### Critério de domínio verificável

> Você consegue desenhar do zero a arquitetura de segurança de uma healthtech que precisa: (a) autenticar com gov.br BR-Aut nível ouro, (b) acessar RNDS via mTLS com certificado A1 ICP-Brasil, (c) servir um SMART app interno com OAuth2 + PKCE + scopes granulares, (d) cumprir LGPD com consentimento granular auditável, (e) anonimizar dados para pesquisa secundária. Desenha o diagrama, justifica cada decisão técnica e regulatória, e implementa um PoC funcional.

### Fontes para estudo

- **OAuth 2.0 RFC 6749** + **OAuth 2.1 draft** + RFCs relacionados (7523, 7591, 9068).
- **OpenID Connect Core spec.**
- **SMART App Launch Framework** — [hl7.org/fhir/smart-app-launch](https://hl7.org/fhir/smart-app-launch).
- *OAuth 2 in Action* — Justin Richer, Antonio Sanso (Manning, 2017).
- **Lei nº 13.709/2018 (LGPD)** — texto integral + regulamentações.
- ANPD (Autoridade Nacional de Proteção de Dados) — guias.
- **Resolução CFM 1.821/2007** e **CFM 2.314/2022**.
- ISO/IEC 27001:2022 e 27799:2016.
- *Privacy and Security in Healthcare* — Sharona Hoffman (Routledge).
- Especificação técnica de autenticação RNDS no Simplifier.

---

## Camada 5 — Conhecimento Clínico, do SUS e do Negócio em Saúde

**Por que é indispensável e mais negligenciada:** este é o que diferencia o engenheiro de fato indispensável do "mais um dev FHIR". Você não precisa virar médico. Mas precisa entender o que está modelando. Quando um cardiologista te explica "esse paciente é um pós-IAM com FE reduzida em uso de IECA, ARN e antagonista MR", você precisa saber o que vira Condition, o que vira MedicationStatement, e por que esses dados juntos importam para gestão populacional de risco.

### Competências essenciais

**Anatomia, fisiologia e fisiopatologia (nível funcional):**
- Sistemas: cardiovascular, respiratório, neurológico, endócrino, renal, digestório, imunológico, hematológico, musculoesquelético.
- Doenças prevalentes em saúde pública brasileira (HAS, DM2, asma/DPOC, depressão, TB, sífilis, dengue, HIV, neoplasias mais comuns).
- Linhas de cuidado (ex.: gestante, criança, hipertensão, diabetes, saúde mental).

**Processos clínicos reais:**
- Anamnese, exame físico, hipótese diagnóstica, plano terapêutico.
- Prescrição médica (forma, posologia, via, duração).
- Solicitação de exames e interpretação básica de resultados.
- Encaminhamento e contrarreferência.
- SOAP notes (Subjective, Objective, Assessment, Plan) — modelo de registro mais comum.

**Sistema Único de Saúde (SUS):**
- Constituição Federal (Art. 196-200).
- Lei nº 8.080/1990 e Lei nº 8.142/1990.
- Princípios: universalidade, integralidade, equidade.
- Níveis de atenção: primária (UBS/USF), secundária (especializada), terciária (hospitalar).
- Estratégia Saúde da Família (ESF).
- Redes de Atenção à Saúde (RAS).
- Sistemas de informação: SISAB, SIM, SINASC, SINAN, SIH, SIA, e-SUS APS/PEC, SIGTAP.
- Política Nacional de Atenção Básica (PNAB).
- Estratégia de Saúde Digital 2020-2028 (ESD28).

**Sistema de Saúde Suplementar:**
- ANS (Agência Nacional de Saúde Suplementar).
- Operadoras: medicina de grupo, cooperativa médica, autogestão, seguradora.
- Rol de procedimentos.
- TISS (Troca de Informações em Saúde Suplementar) — padrão obrigatório.
- TUSS, CBHPM, ANS-DRGs.

**Epidemiologia e Saúde Coletiva:**
- Conceitos: incidência, prevalência, taxa de mortalidade, AVPP, DALY, QALY.
- Tipos de estudo (transversal, caso-controle, coorte, ensaio clínico).
- Vigilância em saúde.
- Indicadores básicos de saúde do país.

**Economia da saúde e modelos de negócio:**
- Cadeia de valor da saúde brasileira.
- Players: hospitais, clínicas, laboratórios, operadoras, indústria farmacêutica, fornecedores de tecnologia, distribuidores.
- Modelos de remuneração: fee-for-service, capitation, bundled payments, value-based care.
- Avaliação de Tecnologias em Saúde (ATS) — CONITEC, REBRATS.
- HTA internacional: NICE, CADTH, IQWiG.

**Fluxos críticos que você vai modelar:**
- Jornada do paciente (do agendamento ao desfecho).
- Fluxo laboratorial (pedido → coleta → processamento → laudo → entrega).
- Fluxo de imagem (modalidade → PACS → laudo → entrega).
- Fluxo de prescrição (prescrição → dispensação farmacêutica → administração → reconciliação).
- Fluxo de internação (admissão → evolução diária → procedimentos → alta → reinternação).
- Fluxo cirúrgico (centro cirúrgico, anestesia, recuperação).
- Vigilância epidemiológica (notificação compulsória).

### Critério de domínio verificável

> Você consegue sentar com um médico ou enfermeiro por 2 horas, mapear o fluxo de cuidado de uma linha (ex.: hipertensão na APS), identificar os 7-10 pontos de geração de dado clínico relevante, e desenhar isso como diagrama de sequência usando recursos FHIR brasileiros (BR-Core) com semântica correta. O médico no fim da reunião diz "é exatamente assim que acontece".

### Fontes para estudo

- *Tratado de Medicina de Família e Comunidade* — Gusso, Lopes (Artmed, 2ª ed.).
- *Princípios de Anatomia e Fisiologia* — Tortora, Derrickson (14ª ed.).
- *Robbins Patologia Básica* — Kumar, Abbas, Aster.
- *Fundamentals of Biostatistics* — Bernard Rosner.
- *O que é o SUS* — Jairnilson Paim (Editora Fiocruz, livre).
- *Saúde Coletiva: Teoria e Prática* — Paim, Almeida-Filho.
- Cursos AVASUS: [avasus.ufrn.br](https://avasus.ufrn.br) — várias centenas de cursos gratuitos.
- Cursos da Fiocruz Saúde Digital.
- Documentação ANS, SUS Digital, e-SUS APS.
- Acompanhamento ativo de literatura: *NEJM Catalyst*, *Health Affairs*, *Cadernos de Saúde Pública*, *Revista de Saúde Pública*.

---

## Camada 6 — Dados, IA e Pesquisa Clínica

**Por que é indispensável:** interoperabilidade não é fim — é meio. O fim é uso secundário dos dados: gestão populacional, IA clínica, pesquisa, real-world evidence. Quem só sabe FHIR vira encanador. Quem sabe FHIR + dado + IA vira arquiteto de plataforma.

### Competências essenciais

**Engenharia de dados em saúde:**
- ETL/ELT pipelines (Apache Airflow, Dagster, Prefect).
- Modelagem dimensional (star schema, snowflake).
- Data warehouses (BigQuery, Redshift, Snowflake) e data lakes.
- Streaming (Kafka, Pub/Sub) para subscriptions FHIR.
- Lakehouse (Delta Lake, Iceberg).

**OMOP CDM (OHDSI):**
- Schema completo v5.4 ou superior.
- Vocabulários OMOP (Athena).
- ETL FHIR → OMOP.
- ATLAS para análise.
- Achilles, DataQualityDashboard.
- Cohort building e characterization.
- Self-Controlled Case Series, Comparative Effectiveness.

**Análise de qualidade de dados:**
- Frameworks: Kahn et al. (conformance, completeness, plausibility).
- DQD (DataQualityDashboard OHDSI).
- Métricas de qualidade FHIR.

**Modelagem para machine learning em saúde:**
- Feature engineering a partir de dados longitudinais clínicos.
- Lidar com dados faltantes (clinically informative missingness).
- Tratamento de séries temporais irregulares.
- Privacy-preserving ML (federated learning para hospitais).

**Frameworks e bibliotecas relevantes:**
- Python científico: pandas, NumPy, scikit-learn, PyTorch, TensorFlow.
- NLP clínico: scispaCy, MedSpaCy, Med-PaLM, Clinical-T5.
- LLMs aplicados a notas clínicas (com cuidado regulatório).
- Bibliotecas FHIR: fhir.resources (Python), HAPI FHIR (Java), firely-net-sdk (C#).

**Real-World Evidence (RWE):**
- Desenho de estudos observacionais.
- Confounders e adjuste (propensity score matching, IPTW).
- Causal inference (Hernán & Robins).
- Reproducible research (R Markdown, Quarto, Jupyter).

**Avaliação clínica de modelos:**
- Métricas: AUC-ROC, AUC-PRC, calibração, decision curve analysis.
- Externalização (validação em outro local).
- Generalização e fairness.
- Reporting guidelines: TRIPOD-AI, CONSORT-AI, STARD-AI, SPIRIT-AI.

### Critério de domínio verificável

> Você recebe um Bundle FHIR com 10.000 pacientes brasileiros, transforma para OMOP CDM aplicando vocabulários corretos, roda DataQualityDashboard, identifica e corrige 3 problemas de qualidade, constrói uma cohort de "pacientes com diabetes tipo 2 sem retinopatia em uso de metformina", e gera um modelo preditivo simples de progressão para retinopatia em 12 meses — tudo reprodutível em um único repositório.

### Fontes para estudo

- *The Book of OHDSI* — [ohdsi.github.io/TheBookOfOhdsi](https://ohdsi.github.io/TheBookOfOhdsi) (gratuito).
- *Designing Clinical Research* — Hulley, Cummings (Wolters Kluwer).
- *Causal Inference: What If* — Hernán, Robins (gratuito em [miguelhernan.org](https://www.hsph.harvard.edu/miguel-hernan/causal-inference-book/)).
- *Deep Medicine* — Eric Topol (Basic Books, 2019).
- Cursos OHDSI: [academy.ohdsi.org](https://academy.ohdsi.org).
- Papers seminais: Rajkomar et al. *Nature Digital Medicine* 2018; Beam & Kohane *JAMA* 2018.
- TRIPOD-AI statement (Collins et al. *BMJ* 2024).
- Cursos Coursera/edX em Health Data Science (Johns Hopkins, Harvard, Stanford).

---

## Camada 7 — Regulação, Qualidade e Engenharia Clínica

**Por que é indispensável:** o profissional médio sabe codar. O bom sabe codar e implementar. O indispensável sabe codar, implementar **e fazer passar pela ANVISA, pelo CFM, pela CFM, pelo MS, e pela auditoria do hospital**. Cada cliente sério vai te perguntar sobre isso.

### Competências essenciais

**Regulamentação ANVISA de dispositivos médicos e SaMD:**
- **RDC 751/2022** — classificação de risco de dispositivos médicos.
- **RDC 657/2022** — Software como Dispositivo Médico (SaMD).
- **RDC 848/2024** — requisitos essenciais de segurança e desempenho.
- **RDC 665/2022** — Boas Práticas de Fabricação (BPF).
- **RDC 837/2023** — ensaios clínicos com dispositivos médicos.
- **RDC 50/2002** — projetos físicos de EAS.
- Tecnovigilância e Notivisa.

**Normas internacionais aplicáveis:**
- **ISO 13485** — sistema de gestão da qualidade para dispositivos médicos.
- **ISO 14971** — gerenciamento de risco aplicado a dispositivos médicos.
- **IEC 62304** — software de dispositivo médico (ciclo de vida).
- **IEC 62366-1** — engenharia de usabilidade.
- **ISO 14155** — boas práticas clínicas em investigação com dispositivos médicos.
- **ISO 27001 + ISO 27799** — segurança da informação em saúde.

**Série IEC 60601 (equipamentos eletromédicos):**
- 60601-1 (geral), -1-2 (EMC), -1-6 (usabilidade), -1-8 (alarmes).
- Aplica quando você integra com equipamento físico (monitor, ventilador, infusora).

**IMDRF (International Medical Device Regulators Forum):**
- Framework SaMD (categorização por contexto + significado da informação).
- Princípios de Good Machine Learning Practice (GMLP).

**Resoluções do CFM e regulamentação profissional:**
- CFM 1.821/2007 (prontuário eletrônico, certificação SBIS).
- CFM 2.314/2022 (telemedicina).
- COFEN, CFF, CFO (regulação dos demais conselhos profissionais).

**Acreditação hospitalar:**
- ONA (Organização Nacional de Acreditação) — níveis 1, 2, 3.
- Joint Commission International (JCI).
- HIMSS EMRAM e DIAM.
- NIAHO/DNV.

**Segurança do paciente e gestão de risco clínico:**
- Núcleo de Segurança do Paciente (NSP) — obrigatório pela RDC 36/2013.
- Eventos adversos relacionados à tecnologia.
- IEC 80001 (gerenciamento de risco em redes de TI hospitalar).

### Critério de domínio verificável

> Dado um produto de saúde digital hipotético (ex.: app que recomenda dosagem de insulina baseado em sinais vitais via wearable), você consegue: (1) classificá-lo segundo IMDRF e RDC 657/2022; (2) determinar a classe de risco RDC 751/2022; (3) listar todas as obrigações para regularização ANVISA; (4) montar plano de gerenciamento de risco ISO 14971; (5) definir ciclo de vida de software IEC 62304 para a classe identificada; (6) projetar plano de pós-mercado e tecnovigilância. Tudo documentado e defensável em audiência regulatória.

### Fontes para estudo

- Portal ANVISA: [gov.br/anvisa](https://www.gov.br/anvisa) — leia as RDCs originais.
- *Equipamentos Eletromédicos: requisitos da série de normas ABNT NBR IEC 60601* — Costa-Felix (Brasport, 2017).
- ISO 13485, 14971, 62304, 62366 — comprar (não há versão gratuita oficial).
- IMDRF working group documents (gratuitos): [imdrf.org](https://imdrf.org).
- FDA discussion papers sobre AI/ML SaMD (gratuitos).
- ONA — Manual Brasileiro de Acreditação.
- HIMSS EMRAM model — documentação pública.
- CONITEC — Diretrizes Metodológicas para ATS.

---

## Camada 8 — Habilidades de Negócio, Comunicação e Liderança

**Por que é indispensável:** é o teto da carreira. Sem isto você é executor caro. Com isto você é arquiteto, consultor, fundador.

### Competências essenciais

**Comunicação técnica:**
- Documentação clara (READMEs, ADRs, design docs, runbooks).
- Apresentações executivas (1 slide = 1 ideia, dados, decisão recomendada).
- Comunicação assíncrona profissional (DM, e-mail técnico, code review).
- Tradução técnico-clínico (explicar arquitetura para médico) e clínico-técnico (explicar fluxo clínico para dev).

**Discovery e levantamento de requisitos:**
- Entrevistas estruturadas com stakeholders (médicos, enfermeiros, gestores).
- Mapeamento de processos (BPMN, jornada do paciente).
- Identificação de stakeholders e poder/influência.
- User story mapping aplicado à saúde.

**Gestão de projetos:**
- Métodos ágeis (Scrum, Kanban) adaptados à saúde.
- PMBOK fundamentals.
- Gestão de riscos do projeto (diferente de risco clínico).
- Gestão de fornecedores e contratos.

**Vendas técnicas e consultoria:**
- Discovery comercial: identificar dor, urgência, orçamento.
- Proposta técnico-comercial.
- Precificação por valor entregue.
- Negociação de escopo.
- Gestão de cliente (account management).

**Liderança e mentoria:**
- Code review como ferramenta de ensino.
- Mentoria de júnior.
- Construção e gestão de time pequeno (3-7 pessoas).
- Comunicação assertiva em conflitos.

**Empreendedorismo e estratégia:**
- Business Model Canvas e Lean Startup.
- Validação de hipóteses com clientes reais.
- Métricas: CAC, LTV, churn, NPS.
- Fundraising básico (se aplicável).

**Inglês técnico:**
- Leitura fluente da spec FHIR (que é em inglês).
- Conversação em reuniões internacionais (Connectathons).
- Escrita: comentários em fóruns HL7, contribuições a IGs internacionais.

**Networking estratégico:**
- Presença ativa no LinkedIn com conteúdo técnico real.
- Participação em comunidades (HL7 Brasil, SBIS, OHDSI, IHE).
- Apresentações em eventos (CBIS, HIMSS, HIS São Paulo, Saúde Digital Week).
- Contribuições públicas a projetos open source.

### Critério de domínio verificável

> Você consegue receber uma reunião comercial com CTO de healthtech Série A, em 60 minutos: (a) entender o problema técnico-clínico-regulatório dele, (b) propor uma arquitetura inicial, (c) estimar esforço e custo, (d) fechar próximos passos com cronograma e proposta de contrato. Sai da reunião com 2 deliverables enviados em 48h e uma proposta formalizada em 5 dias úteis.

### Fontes para estudo

- *Crucial Conversations* — Patterson et al.
- *Never Split the Difference* — Chris Voss.
- *The Mom Test* — Rob Fitzpatrick (livro curto, essencial para descoberta de clientes).
- *Storytelling with Data* — Cole Nussbaumer Knaflic.
- *The Phoenix Project* + *The Unicorn Project* — Gene Kim (cultura DevOps narrativa).
- *Lean Startup* — Eric Ries.
- *Business Model Generation* — Osterwalder, Pigneur.
- Inglês técnico: leitura ativa de Grahame Grieve, Lloyd McKenzie, John Halamka, Eric Topol.
- Cambridge Advanced English ou equivalente para conversação.

---

## Matriz consolidada de competências

| Camada | Peso para vaga sênior | Tempo médio para domínio | Onde a maioria falha |
|---|---|---|---|
| 1. Fundamentos técnicos | Alto (pré-requisito) | 2-4 anos | Não — quem busca FHIR já tem |
| 2. Padrões de saúde | Crítico | 1-2 anos para FHIR sólido + 1 ano para o resto | Sabem FHIR, ignoram V2, CDA, IHE |
| 3. Terminologias | Crítico | 6-18 meses para uso real | Sabem que existem, não sabem usar na prática |
| 4. Segurança e LGPD | Crítico | 1-2 anos | Tratam como "depois resolvo" |
| 5. Conhecimento clínico/SUS | Alto diferencial | Carreira inteira (suficiente em 1-2 anos) | Profissionais TI nunca aprendem; clínicos nunca codam |
| 6. Dados, IA, pesquisa | Alto diferencial | 2-3 anos | Pulam direto pra ML sem entender dado clínico |
| 7. Regulação e qualidade | Crítico para PJ/consultoria | 1-2 anos | Maioria nunca leu uma RDC |
| 8. Negócio, comunicação | Teto da carreira | Carreira inteira | Devs evitam, clínicos evitam, ninguém investe |

---

## O perfil indispensável em 1 parágrafo

Um especialista em interoperabilidade em saúde indispensável ao mercado brasileiro é alguém que **escreve código limpo e seguro em pelo menos uma linguagem moderna**, **domina FHIR R4 a ponto de explicar perfis BR-Core de cabeça**, **sabe converter HL7 V2 e CDA para FHIR sem precisar consultar tabela**, **escolhe a terminologia certa para cada caso (LOINC, SNOMED, CID, TUSS)**, **arquiteta segurança que atende LGPD, RNDS e CFM simultaneamente**, **entende o que acontece dentro de uma UBS, de um laboratório e de um hospital sem precisar perguntar**, **transforma dados clínicos em insights via OMOP e ML**, **defende suas decisões diante de auditor ANVISA**, **negocia escopo com CTO de healthtech e prazo com secretário municipal de saúde**, e **comunica tudo isso em português claro, inglês funcional, e código documentado**. Esse profissional, hoje, é tão raro no Brasil que **vagas pagam R$ 8.500 só de bolsa Fiotec no DATASUS**, e healthtechs sérias pagam R$ 25-40k/mês em regime PJ para consultoria parcial.

---

## Ordem realista de aquisição

Você não vira esse profissional em 6 meses — vira em 24 a 36 meses. A ordem que minimiza dor e maximiza valor:

**Meses 1-6** (já no teu plano): Camadas 1 e 2 (consolidar) + início da 3 (terminologias) + 4 (SMART on FHIR + LGPD básica).

**Meses 7-12**: Camada 5 (clínico/SUS — leitura ativa + AVASUS) + completar Camada 3 + aprofundar 4. Primeiro contrato PJ.

**Meses 13-18**: Camada 6 (OMOP, dados, IA) + Camada 7 (regulação) básica. Já como PJ ativo, aprendendo com problema real.

**Meses 19-24**: Camada 7 profunda (uma RDC por mês) + Camada 8 (negócio, comunicação). Cargo de arquiteto ou consultor sênior.

**Meses 25-36**: aprofundamento em uma vertical específica (laboratório, oncologia, atenção primária, APS, imagem) + Camada 8 em nível de liderança. Cargo de Lead, Head, ou fundador de healthtech.

---

## Checklist de autoavaliação

Marque honestamente onde você está hoje. Refaça a cada 3 meses.

```
CAMADA 1 — Fundamentos técnicos
[ ] Codifica em produção há > 2 anos
[ ] Domina Git, Docker, testes, CI/CD
[ ] Já projetou e operou API REST em produção
[ ] PostgreSQL nível avançado

CAMADA 2 — Padrões de saúde
[ ] FHIR R4 — leio spec sem dificuldade
[ ] Implementei pelo menos 5 fluxos completos contra HAPI ou RNDS
[ ] Sei perfilizar (FSH ou StructureDefinition direto)
[ ] Sei mapear V2 → FHIR
[ ] Conheço CDA e quando usá-lo
[ ] Sei o básico de DICOM e IHE

CAMADA 3 — Terminologias
[ ] Uso SNOMED CT em produção
[ ] Uso LOINC em produção
[ ] Sei diferença prática CID-10 / CIAP-2 / TUSS / SIGTAP
[ ] Já fiz ConceptMap real

CAMADA 4 — Segurança e LGPD
[ ] Implementei OAuth2 com SMART em produção
[ ] Sei configurar mTLS
[ ] Li LGPD inteira e sei aplicá-la a saúde
[ ] Sei o que é DPO, RIPD, base legal

CAMADA 5 — Clínico/SUS
[ ] Sei explicar a jornada do paciente em pelo menos 3 linhas de cuidado
[ ] Conheço SISAB, SIM, SINASC, e-SUS APS
[ ] Já conversei tecnicamente com 5+ médicos sobre fluxo
[ ] Sei diferença operacional SUS x Saúde Suplementar

CAMADA 6 — Dados e IA
[ ] OMOP CDM rodando localmente
[ ] Já fiz ETL FHIR → OMOP
[ ] Construí modelo ML usando dado clínico real
[ ] Conheço TRIPOD-AI

CAMADA 7 — Regulação
[ ] Li RDC 751, 657, 848 inteiras
[ ] Sei classificar um SaMD
[ ] Conheço ISO 13485, 14971, 62304
[ ] Sei o que é Tecnovigilância e Notivisa

CAMADA 8 — Negócio e comunicação
[ ] Fechei pelo menos 1 contrato comercial sozinho
[ ] Apresentei em pelo menos 1 evento técnico
[ ] Mentoro pelo menos 1 pessoa
[ ] Mantenho conteúdo público técnico semanal
[ ] Inglês técnico funcional em call internacional
```

Quem marca 70% dos itens é sênior. Quem marca 90% é referência nacional. Hoje no Brasil, **menos de 200 profissionais marcam 90%**. Esse é o tamanho real da concorrência no topo.

---

*Documento elaborado em maio de 2026, com base em vagas reais do mercado brasileiro (DATASUS/Fiotec, Leega, HL7 Brasil) e em literatura técnica internacional (Benson & Grieve, OHDSI, HL7 International).*
