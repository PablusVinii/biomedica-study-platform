export const appendixA = {
  title: "Apêndice A — Referências Canônicas da Engenharia Biomédica (visão integrada)",
  manuals: [
    {
      title: "BRONZINO, J. D. (ed.) The Biomedical Engineering Handbook. 4ª ed. (4 vols.). CRC Press, 2015.",
      volumes: [
        "Vol. 1: Biomedical Engineering Fundamentals",
        "Vol. 2: Medical Devices and Human Engineering",
        "Vol. 3: Biomedical Signals, Imaging, and Informatics",
        "Vol. 4: Molecular, Cellular, and Tissue Engineering"
      ]
    },
    { title: "ENDERLE, J.; BRONZINO, J. (eds.) Introduction to Biomedical Engineering. 3ª ed. Academic Press, 2012." },
    { title: "SALTZMAN, W. M. Biomedical Engineering: Bridging Medicine and Technology. 2ª ed. Cambridge University Press, 2015." },
    { title: "WEBSTER, J. G. Medical Instrumentation: Application and Design. 5ª ed. Wiley, 2020." },
    { title: "NORDIN, M.; FRANKEL, V. Biomecânica Básica do Sistema Musculoesquelético. 4ª ed. Guanabara Koogan, 2014." },
    { title: "BUSHBERG, J. The Essential Physics of Medical Imaging. 4ª ed. Wolters Kluwer, 2020." }
  ],
  societies: [
    { name: "SBEB — Sociedade Brasileira de Engenharia Biomédica", url: "https://www.sbeb.org.br" },
    { name: "IEEE EMBS — Engineering in Medicine and Biology Society", url: "https://www.embs.org" },
    { name: "IFMBE — International Federation for Medical and Biological Engineering", url: "https://ifmbe.org" },
    { name: "ACCE — American College of Clinical Engineering", url: "https://www.accenet.org" },
    { name: "HL7 International", url: "https://www.hl7.org" }
  ],
  journals: [
    "IEEE Transactions on Biomedical Engineering",
    "Medical & Biological Engineering & Computing",
    "Journal of Medical Engineering & Physics",
    "Annals of Biomedical Engineering",
    "Research on Biomedical Engineering (SBEB)",
    "Journal of the American Medical Informatics Association (JAMIA)",
    "IEEE Journal of Biomedical and Health Informatics"
  ]
};

export const appendixB = {
  title: "Apêndice B — Mapeamento entre os blocos da apostila e as grades curriculares de origem",
  mapping: [
    { block: "Cálculo/EDO", ufpe: "MA026, MA027, MA128, MA129", ufu: "Cálculo I–III, Métodos Matemáticos", uninter: "Pré-Cálculo, Cálculo a uma e várias variáveis" },
    { block: "Álgebra/GA", ufpe: "MA036, MA046", ufu: "Geometria Analítica, Álgebra Linear", uninter: "Geometria Analítica, Álgebra Linear" },
    { block: "Variáveis Complexas/Transformadas", ufpe: "MA326", ufu: "Sinais e Sistemas", uninter: "Transformadas: Tempo Contínuo e Discreto" },
    { block: "Métodos Numéricos", ufpe: "IF215", ufu: "—", uninter: "Métodos Numéricos Aplicados" },
    { block: "Estatística", ufpe: "ET101", ufu: "Estatística", uninter: "Estatística Aplicada à Eng. Biomédica" },
    { block: "Física", ufpe: "FI006/007/108/109, FI021/122", ufu: "Física Básica I–IV + experimentais", uninter: "Física: Mecânica/Eletricidade/Termo/Óptica" },
    { block: "Química/Materiais", ufpe: "QF001, QF002, BIO0011", ufu: "C&T dos Materiais em Eng. Biomédica", uninter: "Química Geral, Biomateriais" },
    { block: "Anatomia/Fisiologia/Bioquímica", ufpe: "AN203, FF242, BQ309", ufu: "Anatomia, Fisiologia, Bioquímica", uninter: "Anatomia Humana, Fisiologia, Biologia Molecular e Celular" },
    { block: "Biofísica", ufpe: "BR245", ufu: "Biofísica", uninter: "Biofísica e Eletrotermofototerapia" },
    { block: "Circuitos/Eletrônica", ufpe: "EL215, ES238, ES239", ufu: "Circuitos I, Eletrônica Analógica I/II", uninter: "Circuitos Elétricos I/II, Eletrônica Analógica/Digital" },
    { block: "Sinais/Sistemas", ufpe: "MA327, ES265, ES235", ufu: "Sinais e Sistemas, PDS", uninter: "Sinais e Sistemas, PDS, Processamento de Imagens" },
    { block: "Controle", ufpe: "ES256", ufu: "Sistemas de Controle Realimentado", uninter: "Sistemas de Controle e Automação" },
    { block: "Embarcados", ufpe: "BIO0007", ufu: "Sistemas Embarcados I, Sistemas Digitais", uninter: "Microprocessadores, Sistemas Embarcados, Projeto Sist. Microprocessados" },
    { block: "Imagens Médicas", ufpe: "BIO0004, ES445, ES438", ufu: "Imagens Médicas I/II", uninter: "Processamento de Imagens, Radiação Física Médica" },
    { block: "Instrumentação", ufpe: "IN429, IN430, IN431, EN229", ufu: "Instrumentação Biomédica I/II", uninter: "Instrumentação e Transdução de Sinais, Tecnologias de Equipamentos Médicos" },
    { block: "Engenharia Clínica", ufpe: "IN433, IN779", ufu: "Engenharia Clínica I/II, Eng. Hospitalar", uninter: "Engenharia Clínica e Hospitalar" },
    { block: "Biomateriais/Tecidos", ufpe: "IN585, BIO0008, BIO0003", ufu: "—", uninter: "Biomateriais, Biotecnologia e Bioinformática" },
    { block: "Biomecânica/Reabilitação", ufpe: "BIO0002, BIO0005, BIO0010", ufu: "Biomecânica, Eng. Reabilitação", uninter: "Cinesiologia e Biomecânica, Engenharia de Reabilitação" },
    { block: "Cardiovascular/Neurologia", ufpe: "ES439, ES445", ufu: "—", uninter: "—" },
    { block: "IA/Computação", ufpe: "IF165, ES443", ufu: "Programação Procedimental/Script", uninter: "Lógica de Programação, Linguagem de Programação, IA Aplicada, Desenv. Web/Mobile, Banco de Dados, Redes" },
    { block: "Informática em Saúde", ufpe: "IN780", ufu: "Telemedicina", uninter: "— (lacuna a complementar com formação extra em HL7 FHIR/RNDS)" },
    { block: "Regulação/Qualidade", ufpe: "IN566, BIO0009, ME437, INT0045", ufu: "Metrologia, Gestão da Qualidade", uninter: "Biossegurança e Qualidade, Gestão da Qualidade, Metrologia" },
    { block: "Gestão/Saúde Pública", ufpe: "INT0029, BIO0006, BIO0012", ufu: "Administração, Ciências Econômicas, ATS", uninter: "Administração/Economia/Gestão Hospitalar, Política Nacional de Saúde, Gestão de Projetos" },
    { block: "Estágio/TCC", ufpe: "IN435, IN436, ES444", ufu: "Estágio Obrigatório, TCC", uninter: "Estágio Supervisionado, TCC" }
  ]
};

export const appendixC = {
  title: "Apêndice C — Observação sobre lacuna em Informática em Saúde",
  content: `Das três grades analisadas, apenas a UFPE oferece uma disciplina dedicada (IN780 — Informática em Saúde). A grade da UNINTER cobre amplamente programação, web/mobile, IA, banco de dados e redes — bases técnicas excelentes —, mas não trata explicitamente de:
•	HL7 FHIR (R4) — padrão obrigatório da RNDS
•	Padrões de terminologia clínica (SNOMED CT, LOINC, CID-11)
•	DICOM e PACS
•	openEHR
•	OMOP CDM
•	Arquiteturas de sistemas de prontuário eletrônico (EHR)
•	LGPD aplicada a dados de saúde sensíveis

Recomenda-se formação complementar nesses tópicos via cursos do AVASUS (https://avasus.ufrn.br), Fiocruz Saúde Digital, HL7 Brasil, especificações públicas da RNDS (https://rnds-guia.saude.gov.br) e materiais oficiais da Health Level Seven International (https://hl7.org/fhir/R4/), além de bibliografia como SHORTLIFFE & CIMINO, Biomedical Informatics (5ª ed., Springer, 2021).`
};
