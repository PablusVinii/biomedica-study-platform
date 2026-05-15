import { Part } from "./types";

export const curriculumData2: Part[] = [
  {
    id: 5,
    title: "3º Semestre — Engenharia Elétrica e Eletrônica",
    icon: "Cpu",
    blocks: [
      {
        id: 18,
        title: "Circuitos Elétricos",
        topics: [
          { id: "18-1", title: "Elementos de circuito (R, L, C, fontes)" },
          { id: "18-2", title: "Leis de Kirchhoff" },
          { id: "18-3", title: "Análise nodal e de malhas" },
          { id: "18-4", title: "Teoremas de Thévenin, Norton, superposição" },
          { id: "18-5", title: "Circuitos de 1ª e 2ª ordem (resposta natural e forçada)" },
          { id: "18-6", title: "Regime senoidal permanente" },
          { id: "18-7", title: "Indutância mútua e transformadores" },
          { id: "18-8", title: "Potência em CA (ativa, reativa, aparente)" },
          { id: "18-9", title: "Circuitos trifásicos" },
          { id: "18-10", title: "Análise no domínio da frequência (fasores)" }
        ],
        bibliography: [
          "NILSSON, J.; RIEDEL, S. Circuitos Elétricos. 10ª ed. Pearson, 2015.",
          "IRWIN, J. D.; NELMS, R. M. Análise Básica de Circuitos para Engenharia. 10ª ed. LTC, 2013."
        ]
      },
      {
        id: 19,
        title: "Eletrônica Analógica",
        topics: [
          { id: "19-1", title: "Semicondutores e diodos" },
          { id: "19-2", title: "Retificadores e fontes de alimentação" },
          { id: "19-3", title: "Transistor bipolar (BJT) e MOSFET" },
          { id: "19-4", title: "Polarização e modelos de pequenos sinais" },
          { id: "19-5", title: "Amplificadores (configurações EC, CC, BC)" },
          { id: "19-6", title: "Amplificadores operacionais (op-amp)" },
          { id: "19-7", title: "Realimentação negativa" },
          { id: "19-8", title: "Filtros ativos" },
          { id: "19-9", title: "Osciladores" },
          { id: "19-10", title: "Moduladores e demoduladores" },
          { id: "19-11", title: "Transistores especiais (JFET, BJT em alta frequência)" }
        ],
        bibliography: [
          "BOYLESTAD, R.; NASHELSKY, L. Dispositivos Eletrônicos e Teoria de Circuitos. 11ª ed. Pearson, 2013.",
          "SEDRA, A.; SMITH, K. Microeletrônica. 7ª ed. Pearson, 2014."
        ]
      },
      {
        id: 20,
        title: "Eletrônica Digital",
        topics: [
          { id: "20-1", title: "Sistemas de numeração e códigos" },
          { id: "20-2", title: "Álgebra booleana e mapas de Karnaugh" },
          { id: "20-3", title: "Portas lógicas" },
          { id: "20-4", title: "Circuitos combinacionais (somadores, multiplexadores, decodificadores)" },
          { id: "20-5", title: "Circuitos sequenciais (flip-flops, registradores, contadores)" },
          { id: "20-6", title: "Máquinas de estado finito" },
          { id: "20-7", title: "Memórias (RAM, ROM, Flash)" },
          { id: "20-8", title: "Famílias lógicas (TTL, CMOS)" },
          { id: "20-9", title: "VHDL/Verilog (introdução)" }
        ],
        bibliography: [
          "TOCCI, R.; WIDMER, N. Sistemas Digitais: Princípios e Aplicações. 12ª ed. Pearson, 2018.",
          "MANO, M.; CILETTI, M. Elementos de Projeto Digital. 5ª ed. Pearson, 2013."
        ]
      },
      {
        id: 21,
        title: "Sistemas Embarcados e Microcontroladores",
        topics: [
          { id: "21-1", title: "Arquitetura de microcontroladores (von Neumann, Harvard)" },
          { id: "21-2", title: "Famílias (AVR, PIC, ARM Cortex-M, ESP32)" },
          { id: "21-3", title: "Periféricos (GPIO, timers, ADC, DAC, PWM)" },
          { id: "21-4", title: "Comunicação serial (UART, SPI, I²C, CAN)" },
          { id: "21-5", title: "Interrupções e DMA" },
          { id: "21-6", title: "Programação em C para embarcados" },
          { id: "21-7", title: "RTOS (sistemas operacionais de tempo real)" },
          { id: "21-8", title: "Projeto de circuitos de tempo real" },
          { id: "21-9", title: "Aplicações biomédicas (aquisição de biopotenciais, dispositivos vestíveis)" }
        ],
        bibliography: [
          "VAHID, F.; GIVARGIS, T. Sistemas Embarcados. 1ª ed. Bookman, 2008.",
          "YIU, J. The Definitive Guide to ARM Cortex-M3 and Cortex-M4 Processors. 3ª ed. Newnes, 2014."
        ]
      },
      {
        id: 22,
        title: "Sinais e Sistemas",
        topics: [
          { id: "22-1", title: "Sinais contínuos e discretos" },
          { id: "22-2", title: "Classificação (periódicos, energia, potência, causais)" },
          { id: "22-3", title: "Sistemas LTI (lineares e invariantes no tempo)" },
          { id: "22-4", title: "Convolução" },
          { id: "22-5", title: "Resposta ao impulso e função de transferência" },
          { id: "22-6", title: "Análise de Fourier (série, transformada contínua e DTFT)" },
          { id: "22-7", title: "Transformada de Laplace e Z" },
          { id: "22-8", title: "Amostragem e teorema de Nyquist" },
          { id: "22-9", title: "Modulação (AM, FM, PWM)" }
        ],
        bibliography: [
          "OPPENHEIM, A.; WILLSKY, A. Sinais e Sistemas. 2ª ed. Pearson, 2010.",
          "LATHI, B. P. Sinais e Sistemas Lineares. 2ª ed. Bookman, 2007."
        ]
      },
      {
        id: 23,
        title: "Sistemas de Controle",
        topics: [
          { id: "23-1", title: "Modelagem matemática de sistemas (mecânicos, elétricos, biológicos)" },
          { id: "23-2", title: "Função de transferência e diagrama de blocos" },
          { id: "23-3", title: "Resposta no tempo (transitória e permanente)" },
          { id: "23-4", title: "Estabilidade (Routh-Hurwitz)" },
          { id: "23-5", title: "Lugar das raízes" },
          { id: "23-6", title: "Resposta em frequência (Bode, Nyquist)" },
          { id: "23-7", title: "Controladores PID" },
          { id: "23-8", title: "Compensadores (lead, lag, lead-lag)" },
          { id: "23-9", title: "Controle digital" },
          { id: "23-10", title: "Espaço de estados" }
        ],
        bibliography: [
          "OGATA, K. Engenharia de Controle Moderno. 5ª ed. Pearson, 2011.",
          "NISE, N. Engenharia de Sistemas de Controle. 7ª ed. LTC, 2017."
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Processamento de Sinais e Imagens Biomédicos",
    icon: "Activity",
    blocks: [
      {
        id: 24,
        title: "Processamento Digital de Sinais (PDS)",
        topics: [
          { id: "24-1", title: "Sinais e sistemas em tempo discreto" },
          { id: "24-2", title: "Transformada Z e DFT/FFT" },
          { id: "24-3", title: "Análise espectral" },
          { id: "24-4", title: "Filtros digitais FIR e IIR (projeto e implementação)" },
          { id: "24-5", title: "Filtros adaptativos (LMS, RLS)" },
          { id: "24-6", title: "Algoritmos rápidos para PDS" },
          { id: "24-7", title: "PDS aplicado a biopotenciais (ECG, EEG, EMG)" },
          { id: "24-8", title: "Análise tempo-frequência (wavelets, STFT)" }
        ],
        bibliography: [
          "OPPENHEIM, A.; SCHAFER, R. Processamento em Tempo Discreto de Sinais. 3ª ed. Pearson, 2012.",
          "RANGAYYAN, R. M. Biomedical Signal Analysis. 2ª ed. Wiley-IEEE, 2015."
        ]
      },
      {
        id: 25,
        title: "Processamento Digital de Imagens",
        topics: [
          { id: "25-1", title: "Fundamentos: pixel, vizinhança, conectividade" },
          { id: "25-2", title: "Histogramas e equalização" },
          { id: "25-3", title: "Filtragem espacial (média, mediana, gaussiana, Sobel)" },
          { id: "25-4", title: "Filtragem no domínio da frequência" },
          { id: "25-5", title: "Detecção de bordas (Canny, Prewitt, Laplaciano)" },
          { id: "25-6", title: "Segmentação (limiarização, crescimento de regiões, watershed)" },
          { id: "25-7", title: "Morfologia matemática" },
          { id: "25-8", title: "Compressão e codificação de imagens" },
          { id: "25-9", title: "Reconstrução tomográfica (retroprojeção filtrada)" },
          { id: "25-10", title: "Aplicações em imagens médicas" }
        ],
        bibliography: [
          "GONZALEZ, R.; WOODS, R. Processamento Digital de Imagens. 4ª ed. Pearson, 2018.",
          "PEDRINI, H.; SCHWARTZ, W. Análise de Imagens Digitais. Thomson Learning, 2008.",
          "RANGAYYAN, R. M. Biomedical Image Analysis. CRC Press, 2005."
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Computação Aplicada à Saúde",
    icon: "Monitor",
    blocks: [
      {
        id: 26,
        title: "Programação e Estruturas de Dados",
        topics: [
          { id: "26-1", title: "Lógica de programação e algoritmos" },
          { id: "26-2", title: "Pseudocódigo e fluxogramas" },
          { id: "26-3", title: "Programação procedimental (C)" },
          { id: "26-4", title: "Programação orientada a objetos (Java, Python, C++)" },
          { id: "26-5", title: "Programação funcional (princípios)" },
          { id: "26-6", title: "Programação script (Python, JavaScript)" },
          { id: "26-7", title: "Estruturas de dados (listas, pilhas, filas, árvores, grafos, hash)" },
          { id: "26-8", title: "Análise de algoritmos (complexidade, Big-O)" },
          { id: "26-9", title: "Métodos de ordenação e pesquisa" },
          { id: "26-10", title: "Recursão e programação dinâmica" }
        ],
        bibliography: [
          "CORMEN, T. et al. Algoritmos: Teoria e Prática. 3ª ed. Elsevier, 2012.",
          "DEITEL, P.; DEITEL, H. Python: Como Programar. Pearson, 2021.",
          "ASCENCIO, A.; CAMPOS, E. Fundamentos da Programação de Computadores. 3ª ed. Pearson, 2012."
        ]
      },
      {
        id: 27,
        title: "Banco de Dados",
        topics: [
          { id: "27-1", title: "Modelo entidade-relacionamento (ER)" },
          { id: "27-2", title: "Modelo relacional e normalização" },
          { id: "27-3", title: "SQL (DDL, DML, DCL)" },
          { id: "27-4", title: "Bancos NoSQL (MongoDB, Redis)" },
          { id: "27-5", title: "Transações e propriedades ACID" },
          { id: "27-6", title: "Bancos de dados em saúde (OMOP CDM, i2b2)" },
          { id: "27-7", title: "Data warehousing e ETL" }
        ],
        bibliography: [
          "ELMASRI, R.; NAVATHE, S. Sistemas de Banco de Dados. 7ª ed. Pearson, 2018.",
          "OHDSI. The Book of OHDSI. https://ohdsi.github.io/TheBookOfOhdsi/"
        ]
      },
      {
        id: 28,
        title: "Redes de Computadores",
        topics: [
          { id: "28-1", title: "Modelos OSI e TCP/IP" },
          { id: "28-2", title: "Protocolos (HTTP, HTTPS, TCP, UDP, IP)" },
          { id: "28-3", title: "Roteamento e comutação" },
          { id: "28-4", title: "Redes sem fio (Wi-Fi, Bluetooth, Zigbee, LoRa)" },
          { id: "28-5", title: "Segurança de redes (TLS, VPN)" },
          { id: "28-6", title: "IoT em saúde (IoMT — Internet of Medical Things)" },
          { id: "28-7", title: "APIs REST" }
        ],
        bibliography: [
          "KUROSE, J.; ROSS, K. Redes de Computadores e a Internet. 8ª ed. Pearson, 2021.",
          "TANENBAUM, A.; WETHERALL, D. Redes de Computadores. 5ª ed. Pearson, 2011."
        ]
      },
      {
        id: 29,
        title: "Desenvolvimento Web e Mobile para Saúde",
        topics: [
          { id: "29-1", title: "HTML5, CSS3, JavaScript" },
          { id: "29-2", title: "Frameworks frontend (React, Vue, Angular)" },
          { id: "29-3", title: "Backend (Node.js, Python/Flask/Django, Java/Spring)" },
          { id: "29-4", title: "Desenvolvimento mobile (React Native, Flutter)" },
          { id: "29-5", title: "Progressive Web Apps (PWA)" },
          { id: "29-6", title: "Usabilidade e acessibilidade (WCAG)" },
          { id: "29-7", title: "Telemedicina e telessaúde" }
        ],
        bibliography: [
          "DUCKETT, J. HTML & CSS: Design and Build Websites. Wiley, 2011.",
          "BANKS, A.; PORCELLO, E. Learning React. 2ª ed. O'Reilly, 2020."
        ]
      },
      {
        id: 30,
        title: "Inteligência Artificial Aplicada à Engenharia Biomédica",
        topics: [
          { id: "30-1", title: "Representação do conhecimento e métodos de inferência" },
          { id: "30-2", title: "Sistemas especialistas" },
          { id: "30-3", title: "Raciocínio baseado em casos" },
          { id: "30-4", title: "Redes neurais artificiais (perceptron, MLP, CNN, RNN, Transformers)" },
          { id: "30-5", title: "Aprendizado de máquina (supervisionado, não supervisionado, por reforço)" },
          { id: "30-6", title: "Algoritmos genéticos" },
          { id: "30-7", title: "Lógica fuzzy" },
          { id: "30-8", title: "Deep learning para imagens médicas (U-Net, ResNet)" },
          { id: "30-9", title: "IA generativa e LLMs em saúde" },
          { id: "30-10", title: "Validação clínica de modelos de IA" }
        ],
        bibliography: [
          "RUSSELL, S.; NORVIG, P. Inteligência Artificial. 4ª ed. GEN/LTC, 2022.",
          "GOODFELLOW, I.; BENGIO, Y.; COURVILLE, A. Deep Learning. MIT Press, 2016. https://www.deeplearningbook.org",
          "TOPOL, E. Deep Medicine. Basic Books, 2019."
        ]
      },
      {
        id: 31,
        title: "Informática em Saúde e Interoperabilidade",
        topics: [
          { id: "31-1", title: "Conceitos de informática médica" },
          { id: "31-2", title: "Registro Eletrônico do Paciente (RES/EHR)" },
          { id: "31-3", title: "Sistemas de informação hospitalar (HIS), laboratorial (LIS), radiológico (RIS/PACS)" },
          { id: "31-4", title: "Padrões de terminologia: SNOMED CT, LOINC, CID-10/CID-11, RxNorm, CIAP-2" },
          { id: "31-5", title: "Padrões de interoperabilidade: HL7 v2.x, HL7 CDA, HL7 FHIR (R4), DICOM, IHE profiles" },
          { id: "31-6", title: "Rede Nacional de Dados em Saúde (RNDS — Portaria GM/MS nº 1.434/2020)" },
          { id: "31-7", title: "Conecte SUS" },
          { id: "31-8", title: "Modelos de informação clínica (openEHR)" },
          { id: "31-9", title: "OMOP CDM (Common Data Model) — pesquisa observacional" },
          { id: "31-10", title: "Telemedicina e teleassistência" },
          { id: "31-11", title: "Biologia computacional e bioinformática" },
          { id: "31-12", title: "LGPD (Lei nº 13.709/2018) aplicada a dados de saúde" }
        ],
        bibliography: [
          "SHORTLIFFE, E.; CIMINO, J. Biomedical Informatics. 5ª ed. Springer, 2021.",
          "HL7 FHIR R4 Specification. https://hl7.org/fhir/R4/",
          "BRASIL. Portaria GM/MS nº 1.434, de 28 de maio de 2020 — institui a RNDS.",
          "BRASIL. Lei nº 13.709/2018 — Lei Geral de Proteção de Dados (LGPD).",
          "DATASUS. Manual de Integração — RNDS Barramento. https://rnds-guia.saude.gov.br",
          "BRASIL. Portaria GM/MS nº 5.663/2024 — regras de transição para RNDS (Registro de Imunobiológico)."
        ],
        highlights: [
          "HL7 FHIR (R4) — padrão internacional de interoperabilidade",
          "RNDS — Rede Nacional de Dados em Saúde",
          "Portaria GM/MS nº 1.434/2020",
          "LGPD aplicável à saúde (Lei 13.709/2018)",
          "Plataformas recomendadas: AVASUS, HL7 Brasil"
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Instrumentação Biomédica",
    icon: "Stethoscope",
    blocks: [
      {
        id: 32,
        title: "Princípios de Instrumentação Biomédica",
        topics: [
          { id: "32-1", title: "Características metrológicas de instrumentos (sensibilidade, exatidão, precisão, linearidade)" },
          { id: "32-2", title: "Generalização do sistema de instrumentação (sensor, condicionamento, conversão, processamento)" },
          { id: "32-3", title: "Sensores e transdutores biomédicos: Eletrodos (Ag/AgCl, secos, têxteis)" },
          { id: "32-4", title: "Sensores de pressão (piezoelétricos, capacitivos, piezoresistivos)" },
          { id: "32-5", title: "Sensores ópticos (fotodiodos, PPG)" },
          { id: "32-6", title: "Sensores de temperatura (termopares, termistores, RTD)" },
          { id: "32-7", title: "Sensores de força e deformação (strain gauges)" },
          { id: "32-8", title: "Acelerômetros e giroscópios (MEMS)" },
          { id: "32-9", title: "Sensores químicos e biossensores" },
          { id: "32-10", title: "Amplificadores de instrumentação e isolação galvânica" },
          { id: "32-11", title: "Filtragem analógica (notch 60 Hz, passa-banda)" },
          { id: "32-12", title: "Aquisição de dados (DAQ): amostragem, quantização, ADC" }
        ],
        bibliography: [
          "WEBSTER, J. G. Medical Instrumentation: Application and Design. 5ª ed. Wiley, 2020.",
          "CARR, J. J.; BROWN, J. M. Introduction to Biomedical Equipment Technology. 4ª ed. Pearson, 2001.",
          "NEUMAN, M. R. (cap. em BRONZINO)."
        ]
      },
      {
        id: 33,
        title: "Sinais Biomédicos",
        topics: [
          { id: "33-1", title: "Eletrocardiograma (ECG) — derivações, morfologia, arritmias" },
          { id: "33-2", title: "Eletroencefalograma (EEG) — ritmos cerebrais, BCI" },
          { id: "33-3", title: "Eletromiograma (EMG) — superfície e agulha" },
          { id: "33-4", title: "Eletro-oculograma (EOG) e Eletrorretinograma (ERG)" },
          { id: "33-5", title: "Pressão arterial (invasiva e não invasiva)" },
          { id: "33-6", title: "Pressão intracraniana" },
          { id: "33-7", title: "Pressão intra-ocular" },
          { id: "33-8", title: "Oximetria de pulso (SpO₂)" },
          { id: "33-9", title: "Capnografia (CO₂ expirado)" },
          { id: "33-10", title: "Espirometria e mecânica respiratória" },
          { id: "33-11", title: "Temperatura corporal" },
          { id: "33-12", title: "Fonocardiografia" },
          { id: "33-13", title: "Ergoespirometria" }
        ],
        bibliography: [
          "RANGAYYAN, R. M. Biomedical Signal Analysis. 2ª ed. Wiley-IEEE, 2015.",
          "BRONZINO, J. D. (ed.) The Biomedical Engineering Handbook: Medical Devices and Systems. 3ª ed. CRC Press, 2006."
        ]
      }
    ]
  }
];
