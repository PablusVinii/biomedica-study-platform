import { Part } from "./types";

export const curriculumData: Part[] = [
  {
    id: 1,
    title: "1º Semestre — Fundamentos Matemáticos",
    icon: "Calculator",
    blocks: [
      {
        id: 1,
        title: "Cálculo Diferencial e Integral",
        content: `**Apostila Completa de Cálculo Diferencial e Integral**\n\n**Linguagem simples, do começo ao avançado**\n\nEsta apostila cobre os 14 grandes temas do Cálculo exigidos na formação de Engenharia Biomédica. A ideia é construir a intuição primeiro, formalizar depois, e mostrar exemplos resolvidos passo a passo.`,
        topics: [
          { 
            id: "1-1", 
            title: "Limites e continuidade de funções",
            content: `### CAPÍTULO 1 — Limites e Continuidade\n\n#### 1.1 A ideia intuitiva de limite\nImagine que você está dirigindo em direção a uma cidade. À medida que você se aproxima, a placa "Goiana — 2 km" vira "1 km", depois "500 m", depois "10 m". Você nunca *toca* a placa "Goiana — 0 km" pelo retrovisor, mas seu valor de distância **tende a zero**.\n\nEsse é o espírito do limite: estudar para onde uma função vai, sem necessariamente chegar lá.\n\n**Notação:**\n$$\\lim_{x \\to a} f(x) = L$$\nLê-se: "o limite de $f(x)$ quando $x$ tende a $a$ é $L$."\n\n#### 1.2 Definição formal (ε-δ)\n$\\lim_{x \\to a} f(x) = L$ se, para todo $\\varepsilon > 0$, existe $\\delta > 0$ tal que sempre que $0 < |x - a| < \\delta$, então $|f(x) - L| < \\varepsilon$.\n\n#### 1.7 Continuidade\nUma função $f$ é **contínua em $a$** se $f(a)$ existe, o limite existe e ambos são iguais.`
          },
          { 
            id: "1-2", 
            title: "Derivadas e aplicações (otimização, taxas relacionadas)",
            content: `### CAPÍTULO 2 — Derivadas e Aplicações\n\n#### 2.1 A ideia: inclinação instantânea\nVelocidade **instantânea** em $t$: faça $\\Delta t \\to 0$.\n$$v(t) = \\lim_{\\Delta t \\to 0} \\frac{s(t + \\Delta t) - s(t)}{\\Delta t}$$\n\n#### 2.3 Regras de derivação\n| Função | Derivada |\n|---|---|\n| $x^n$ | $nx^{n-1}$ |\n| $\\sin x$ | $\\cos x$ |\n| $e^x$ | $e^x$ |\n\n#### 2.5 Aplicação — Otimização\nPara achar máximos/mínimos, resolva $f'(x) = 0$ e use o teste da segunda derivada.`
          },
          { 
            id: "1-3", 
            title: "Teoremas de Rolle, Valor Médio e Valor Médio Generalizado",
            content: `### CAPÍTULO 3 — Teoremas Fundamentais\n\n#### 3.2 Teorema do Valor Médio (TVM)\nExiste $c \\in (a,b)$ com:\n$$f'(c) = \\frac{f(b) - f(a)}{b - a}$$\n\n#### 3.3 Teorema de Cauchy\n$$\\frac{f'(c)}{g'(c)} = \\frac{f(b) - f(a)}{g(b) - g(a)}$$`
          },
          { 
            id: "1-4", 
            title: "Integrais definidas e indefinidas",
            content: `### CAPÍTULO 4 — Integrais\n\n#### 4.3 Teorema Fundamental do Cálculo (TFC)\n$$\\int_a^b f(x)\\,dx = F(b) - F(a)$$\nonde $F$ é a antiderivada de $f$.`
          },
          { 
            id: "1-5", 
            title: "Técnicas de integração (substituição, partes, frações parciais, trigonométrica)",
            content: `### CAPÍTULO 5 — Técnicas de Integração\n\n#### 5.2 Integração por partes\n$$\\int u\\,dv = uv - \\int v\\,du$$\n\n#### 5.4 Substituição trigonométrica\nPara $\\sqrt{a^2 - x^2}$, use $x = a\\sin\\theta$.`
          },
          { 
            id: "1-6", 
            title: "Diferenciabilidade em duas e múltiplas variáveis",
            content: `### CAPÍTULO 6 — Várias Variáveis\n\n#### 6.3 Derivadas parciais\n$$\\frac{\\partial f}{\\partial x} = f_x$$\n\n#### 6.6 Gradiente\n$\\nabla f = (f_x, f_y)$ — vetor de máximo crescimento.`
          },
          { 
            id: "1-7", 
            title: "Integrais duplas, triplas, de linha e de superfície",
            content: `### CAPÍTULO 7 — Integrais Múltiplas e Vetoriais\n\n#### 7.1 Integrais duplas\n$$\\iint_R f(x,y)\\,dA$$\n\n#### 7.5 Integrais de linha\n$\\int_C \\vec{F}\\cdot d\\vec{r}$ — representa o Trabalho.`
          },
          { 
            id: "1-8", 
            title: "Séries numéricas e séries de potências",
            content: `### CAPÍTULO 8 — Séries\n\n#### 8.3 Séries famosas\n- Geométrica: $\\sum ar^n = a/(1-r)$ se $|r| < 1$.\n- Harmônica: $\\sum 1/n$ (diverge).`
          },
          { 
            id: "1-9", 
            title: "Fórmula de Taylor e MacLaurin",
            content: `### CAPÍTULO 9 — Séries de Taylor\n\n$$f(x) = \\sum_{n=0}^\\infty \\frac{f^{(n)}(a)}{n!}(x-a)^n$$\n\n$e^x = 1 + x + \\frac{x^2}{2!} + \\cdots$`
          },
          { 
            id: "1-10", 
            title: "Máximos e mínimos em várias variáveis (multiplicadores de Lagrange)",
            content: `### CAPÍTULO 10 — Otimização Multivariada\n\n#### 10.4 Multiplicadores de Lagrange\n$\\nabla f = \\lambda \\nabla g$`
          },
          { 
            id: "1-11", 
            title: "Teoremas de Green, Gauss e Stokes",
            content: `### CAPÍTULO 11 — Teoremas Vetoriais\n\n#### 11.4 Teorema de Gauss\n$$\\iint_{\\partial V} \\vec{F}\\cdot d\\vec{S} = \\iiint_V (\\nabla \\cdot \\vec{F})\\,dV$$`
          },
          { 
            id: "1-12", 
            title: "Equações diferenciais ordinárias de 1ª e 2ª ordem",
            content: `### CAPÍTULO 12 — EDOs\n\n#### 12.2 Separáveis\n$$\\int \\frac{dy}{h(y)} = \\int g(x)\\,dx$$\n\n#### 12.3 Lineares de 2ª ordem\n$ay'' + by' + cy = 0$`
          },
          { 
            id: "1-13", 
            title: "Transformada de Laplace",
            content: `### CAPÍTULO 13 — Laplace\n\n$$\\mathcal{L}\\{f(t)\\} = F(s) = \\int_0^\\infty e^{-st} f(t)\\,dt$$`
          },
          { 
            id: "1-14", 
            title: "Séries de Fourier e equações diferenciais parciais",
            content: `### CAPÍTULO 14 — Fourier e EDPs\n\n#### 14.1 Séries de Fourier\n$f(x) = \\frac{a_0}{2} + \\sum [a_n \\cos(nx) + b_n \\sin(nx)]$\n\n#### 14.5 EDP do Calor\n$u_t = \\alpha u_{xx}$`
          }
        ],
        bibliography: [
          "STEWART, James. Cálculo (Vols. 1 e 2). 8ª ed. Cengage Learning, 2017.",
          "GUIDORIZZI, Hamilton L. Um Curso de Cálculo (Vols. 1–4). 6ª ed. LTC, 2018.",
          "BOYCE, W.; DIPRIMA, R. Equações Diferenciais Elementares e Problemas de Valores de Contorno. 11ª ed. LTC, 2020."
        ]
      },
      {
        id: 2,
        title: "Geometria Analítica e Álgebra Linear",
        topics: [
          { id: "2-1", title: "Sistemas de coordenadas no plano e no espaço" },
          { id: "2-2", title: "Vetores: produto escalar, vetorial, misto" },
          { id: "2-3", title: "Retas, planos, cônicas e quádricas" },
          { id: "2-4", title: "Mudança de coordenadas (rotação e translação)" },
          { id: "2-5", title: "Matrizes e sistemas lineares" },
          { id: "2-6", title: "Espaços vetoriais, subespaços, bases, dimensão" },
          { id: "2-7", title: "Transformações lineares e operadores" },
          { id: "2-8", title: "Autovalores, autovetores, diagonalização" },
          { id: "2-9", title: "Operadores simétricos e ortogonais" },
          { id: "2-10", title: "Aplicações a sistemas de equações diferenciais" }
        ],
        bibliography: [
          "BOLDRINI, J. L. Álgebra Linear. 3ª ed. Harbra, 1986.",
          "ANTON, Howard; RORRES, Chris. Álgebra Linear com Aplicações. 10ª ed. Bookman, 2012.",
          "STEINBRUCH, A.; WINTERLE, P. Geometria Analítica. 2ª ed. Pearson, 1987."
        ]
      },
      {
        id: 3,
        title: "Variáveis Complexas e Transformadas",
        topics: [
          { id: "3-1", title: "Funções analíticas" },
          { id: "3-2", title: "Funções elementares no plano complexo" },
          { id: "3-3", title: "Transformação conforme" },
          { id: "3-4", title: "Integração no plano complexo" },
          { id: "3-5", title: "Séries de potência e de Laurent" },
          { id: "3-6", title: "Resíduos" },
          { id: "3-7", title: "Transformada de Laplace" },
          { id: "3-8", title: "Transformada de Fourier" },
          { id: "3-9", title: "Transformada Z" }
        ],
        bibliography: [
          "CHURCHILL, R. V.; BROWN, J. W. Variáveis Complexas e Aplicações. 9ª ed. McGraw-Hill, 2015.",
          "LATHI, B. P. Sinais e Sistemas Lineares. 2ª ed. Bookman, 2007."
        ]
      },
      {
        id: 4,
        title: "Métodos Numéricos",
        topics: [
          { id: "4-1", title: "Aritmética de máquina e propagação de erros" },
          { id: "4-2", title: "Zeros de funções (bisseção, Newton, ponto fixo)" },
          { id: "4-3", title: "Sistemas de equações lineares (Gauss, LU, iterativos)" },
          { id: "4-4", title: "Ajustamento e regressão" },
          { id: "4-5", title: "Interpolação polinomial (Lagrange, Newton, splines)" },
          { id: "4-6", title: "Integração numérica (Simpson, quadratura Gaussiana)" },
          { id: "4-7", title: "Solução numérica de EDOs (Euler, Runge-Kutta)" }
        ],
        bibliography: [
          "BURDEN, R.; FAIRES, J. Análise Numérica. 10ª ed. Cengage Learning, 2016.",
          "RUGGIERO, M.; LOPES, V. Cálculo Numérico: Aspectos Teóricos e Computacionais. 2ª ed. Pearson, 1996."
        ]
      },
      {
        id: 5,
        title: "Probabilidade e Estatística",
        topics: [
          { id: "5-1", title: "Conceitos e definições de probabilidade" },
          { id: "5-2", title: "Probabilidade condicional e independência" },
          { id: "5-3", title: "Variáveis aleatórias discretas e contínuas" },
          { id: "5-4", title: "Distribuições (Bernoulli, Binomial, Poisson, Normal, Exponencial, Qui-quadrado, t-Student, F)" },
          { id: "5-5", title: "Estatística inferencial" },
          { id: "5-6", title: "Propriedades de estimadores e métodos de estimação" },
          { id: "5-7", title: "Intervalos de confiança" },
          { id: "5-8", title: "Testes de hipóteses" },
          { id: "5-9", title: "Estatística descritiva" },
          { id: "5-10", title: "Correlação e regressão linear/múltipla" },
          { id: "5-11", title: "Médias móveis e séries temporais" },
          { id: "5-12", title: "ANOVA" },
          { id: "5-13", title: "Testes não paramétricos (relevantes em saúde)" }
        ],
        bibliography: [
          "MONTGOMERY, D.; RUNGER, G. Estatística Aplicada e Probabilidade para Engenheiros. 7ª ed. LTC, 2021.",
          "BUSSAB, W.; MORETTIN, P. Estatística Básica. 9ª ed. Saraiva, 2017.",
          "ROSNER, B. Fundamentals of Biostatistics. 8ª ed. Cengage, 2015."
        ]
      }
    ]
  },
  {
    id: 2,
    title: "1º Semestre — Fundamentos Físicos",
    icon: "Atom",
    blocks: [
      {
        id: 6,
        title: "Mecânica Clássica",
        topics: [
          { id: "6-1", title: "Cinemática (1D, 2D, 3D)" },
          { id: "6-2", title: "Vetores aplicados à mecânica" },
          { id: "6-3", title: "Dinâmica da partícula e leis de Newton" },
          { id: "6-4", title: "Trabalho, energia, conservação de energia" },
          { id: "6-5", title: "Momentum linear e angular, colisões" },
          { id: "6-6", title: "Cinemática e dinâmica da rotação" },
          { id: "6-7", title: "Dinâmica dos corpos rígidos" },
          { id: "6-8", title: "Oscilações harmônicas" },
          { id: "6-9", title: "Ondas mecânicas" }
        ],
        bibliography: [
          "HALLIDAY, D.; RESNICK, R.; WALKER, J. Fundamentos de Física (Vols. 1 e 2). 12ª ed. LTC, 2023.",
          "NUSSENZVEIG, H. M. Curso de Física Básica (Vols. 1 e 2). 5ª ed. Blucher, 2014."
        ]
      },
      {
        id: 7,
        title: "Termodinâmica e Fluidos",
        topics: [
          { id: "7-1", title: "Temperatura, calor e expansão térmica" },
          { id: "7-2", title: "Teoria cinética dos gases" },
          { id: "7-3", title: "Leis da termodinâmica" },
          { id: "7-4", title: "Entropia e energia livre" },
          { id: "7-5", title: "Hidrostática e hidrodinâmica" },
          { id: "7-6", title: "Equação de Bernoulli" },
          { id: "7-7", title: "Viscosidade e escoamento (importante para hemodinâmica)" }
        ],
        bibliography: [
          "HALLIDAY/RESNICK/WALKER, Vol. 2.",
          "FOX, R.; PRITCHARD, P.; McDONALD, A. Introdução à Mecânica dos Fluidos. 9ª ed. LTC, 2018."
        ]
      },
      {
        id: 8,
        title: "Eletromagnetismo",
        topics: [
          { id: "8-1", title: "Campo elétrico e potencial elétrico" },
          { id: "8-2", title: "Capacitores e dielétricos" },
          { id: "8-3", title: "Circuitos elétricos (Kirchhoff, RC, RL, RLC)" },
          { id: "8-4", title: "Campo magnético" },
          { id: "8-5", title: "Lei de Ampère" },
          { id: "8-6", title: "Indução eletromagnética" },
          { id: "8-7", title: "Magnetismo em meios materiais" },
          { id: "8-8", title: "Circuitos de corrente alternada" },
          { id: "8-9", title: "Equações de Maxwell" },
          { id: "8-10", title: "Ondas eletromagnéticas" },
          { id: "8-11", title: "Compatibilidade eletromagnética (EMC)" }
        ],
        bibliography: [
          "HALLIDAY/RESNICK/WALKER, Vol. 3.",
          "GRIFFITHS, D. J. Introduction to Electrodynamics. 4ª ed. Cambridge, 2017."
        ]
      },
      {
        id: 9,
        title: "Óptica e Física Moderna",
        topics: [
          { id: "9-1", title: "Óptica geométrica (reflexão, refração, lentes)" },
          { id: "9-2", title: "Óptica física (interferência, difração, polarização)" },
          { id: "9-3", title: "Espectro eletromagnético" },
          { id: "9-4", title: "Teoria da relatividade restrita" },
          { id: "9-5", title: "Quantização e dualidade onda-partícula" },
          { id: "9-6", title: "Estrutura atômica e modelo de Bohr" },
          { id: "9-7", title: "Introdução à mecânica quântica" },
          { id: "9-8", title: "Física nuclear e radiação ionizante" }
        ],
        bibliography: [
          "TIPLER, P.; MOSCA, G. Física para Cientistas e Engenheiros (Vol. 3). 6ª ed. LTC, 2014.",
          "EISBERG, R.; RESNICK, R. Física Quântica. Campus, 1979."
        ]
      }
    ]
  },
  {
    id: 3,
    title: "2º Semestre — Fundamentos Químicos",
    icon: "FlaskConical",
    blocks: [
      {
        id: 10,
        title: "Química Geral e Orgânica",
        topics: [
          { id: "10-1", title: "Teoria atômica e tabela periódica" },
          { id: "10-2", title: "Ligações químicas (covalente, iônica, metálica, intermoleculares)" },
          { id: "10-3", title: "Estequiometria" },
          { id: "10-4", title: "Termoquímica e termodinâmica química" },
          { id: "10-5", title: "Cinética química e catálise" },
          { id: "10-6", title: "Equilíbrio químico e solubilidade" },
          { id: "10-7", title: "Ácidos, bases e pH" },
          { id: "10-8", title: "Eletroquímica" },
          { id: "10-9", title: "Estrutura molecular e mecânica quântica aplicada" },
          { id: "10-10", title: "Introdução à química orgânica (grupos funcionais)" },
          { id: "10-11", title: "Química nuclear" }
        ],
        bibliography: [
          "ATKINS, P.; JONES, L. Princípios de Química. 7ª ed. Bookman, 2018.",
          "BROWN, T.; LEMAY, H. E. Química: A Ciência Central. 13ª ed. Pearson, 2016."
        ]
      },
      {
        id: 11,
        title: "Ciência dos Materiais para Bioengenharia",
        topics: [
          { id: "11-1", title: "Classificação dos materiais (metais, polímeros, cerâmicas, compósitos)" },
          { id: "11-2", title: "Estrutura cristalina e amorfa" },
          { id: "11-3", title: "Diagramas de fase" },
          { id: "11-4", title: "Propriedades mecânicas (tração, fadiga, fluência)" },
          { id: "11-5", title: "Propriedades elétricas, ópticas e térmicas" },
          { id: "11-6", title: "Degradação de materiais em meio biológico" },
          { id: "11-7", title: "Processamento de materiais para bioengenharia" }
        ],
        bibliography: [
          "CALLISTER, W. Ciência e Engenharia de Materiais: uma Introdução. 10ª ed. LTC, 2020.",
          "ASKELAND, D.; WRIGHT, W. Ciência e Engenharia dos Materiais. 4ª ed. Cengage, 2019."
        ]
      }
    ]
  },
  {
    id: 4,
    title: "2º Semestre — Ciências da Vida Aplicadas",
    icon: "HeartPulse",
    blocks: [
      {
        id: 12,
        title: "Anatomia Humana",
        topics: [
          { id: "12-1", title: "Termos anatômicos e planos de referência" },
          { id: "12-2", title: "Sistema esquelético e articular" },
          { id: "12-3", title: "Sistema muscular" },
          { id: "12-4", title: "Sistema nervoso central e periférico" },
          { id: "12-5", title: "Sistema cardiovascular" },
          { id: "12-6", title: "Sistema respiratório" },
          { id: "12-7", title: "Sistema digestório" },
          { id: "12-8", title: "Sistema urinário" },
          { id: "12-9", title: "Sistema endócrino" },
          { id: "12-10", title: "Sistema reprodutor" },
          { id: "12-11", title: "Sistema tegumentar" },
          { id: "12-12", title: "Órgãos dos sentidos" }
        ],
        bibliography: [
          "TORTORA, G.; DERRICKSON, B. Princípios de Anatomia e Fisiologia. 14ª ed. Guanabara Koogan, 2016.",
          "MOORE, K.; DALLEY, A.; AGUR, A. Anatomia Orientada para a Clínica. 8ª ed. Guanabara Koogan, 2018.",
          "NETTER, F. Atlas de Anatomia Humana. 7ª ed. Elsevier, 2019."
        ]
      },
      {
        id: 13,
        title: "Fisiologia Humana",
        topics: [
          { id: "13-1", title: "Homeostase e mecanismos de controle" },
          { id: "13-2", title: "Fisiologia celular (transporte, potenciais de membrana)" },
          { id: "13-3", title: "Fisiologia muscular (contração, junção neuromuscular)" },
          { id: "13-4", title: "Fisiologia neural (potencial de ação, sinapse)" },
          { id: "13-5", title: "Fisiologia cardiovascular (ciclo cardíaco, ECG, pressão arterial)" },
          { id: "13-6", title: "Fisiologia respiratória (mecânica ventilatória, trocas gasosas)" },
          { id: "13-7", title: "Fisiologia renal" },
          { id: "13-8", title: "Fisiologia endócrina" },
          { id: "13-9", title: "Fisiologia digestória" },
          { id: "13-10", title: "Fisiologia do sistema imune" },
          { id: "13-11", title: "Fisiologia sensorial" }
        ],
        bibliography: [
          "GUYTON, A.; HALL, J. Tratado de Fisiologia Médica. 14ª ed. Elsevier, 2021.",
          "BERNE, R.; LEVY, M. Fisiologia. 7ª ed. Elsevier, 2018."
        ]
      },
      {
        id: 14,
        title: "Bioquímica",
        topics: [
          { id: "14-1", title: "Estrutura e função de aminoácidos e proteínas" },
          { id: "14-2", title: "Enzimas e cinética enzimática" },
          { id: "14-3", title: "Carboidratos e metabolismo glicolítico" },
          { id: "14-4", title: "Lipídios e metabolismo lipídico" },
          { id: "14-5", title: "Ácidos nucleicos (DNA, RNA)" },
          { id: "14-6", title: "Replicação, transcrição, tradução" },
          { id: "14-7", title: "Metabolismo energético (ciclo de Krebs, cadeia respiratória)" },
          { id: "14-8", title: "Integração metabólica" },
          { id: "14-9", title: "Bioquímica clínica (marcadores diagnósticos)" }
        ],
        bibliography: [
          "NELSON, D.; COX, M. Princípios de Bioquímica de Lehninger. 7ª ed. Artmed, 2018.",
          "BERG, J.; TYMOCZKO, J.; STRYER, L. Bioquímica. 8ª ed. Guanabara Koogan, 2017."
        ]
      },
      {
        id: 15,
        title: "Biologia Molecular e Celular",
        topics: [
          { id: "15-1", title: "Estrutura e organização celular" },
          { id: "15-2", title: "Membrana plasmática e transporte" },
          { id: "15-3", title: "Citoesqueleto" },
          { id: "15-4", title: "Núcleo e organização do genoma" },
          { id: "15-5", title: "Ciclo celular e divisão (mitose, meiose)" },
          { id: "15-6", title: "Expressão gênica e regulação" },
          { id: "15-7", title: "Comunicação celular e sinalização" },
          { id: "15-8", title: "Diferenciação celular" },
          { id: "15-9", title: "Apoptose e necrose" },
          { id: "15-10", title: "Células-tronco (embrionárias, adultas, iPSC)" },
          { id: "15-11", title: "Sistema imune (inato e adaptativo)" },
          { id: "15-12", title: "Anticorpos monoclonais e policlonais" }
        ],
        bibliography: [
          "ALBERTS, B. et al. Biologia Molecular da Célula. 6ª ed. Artmed, 2017.",
          "LODISH, H. et al. Biologia Celular e Molecular. 7ª ed. Artmed, 2014."
        ]
      },
      {
        id: 16,
        title: "Biofísica",
        topics: [
          { id: "16-1", title: "Bioeletricidade (potenciais de repouso e ação)" },
          { id: "16-2", title: "Modelo de Hodgkin-Huxley" },
          { id: "16-3", title: "Biofísica da contração muscular" },
          { id: "16-4", title: "Biofísica da circulação (lei de Poiseuille, complacência vascular)" },
          { id: "16-5", title: "Biofísica respiratória (lei de Laplace, surfactante)" },
          { id: "16-6", title: "Biofísica sensorial (visão, audição)" },
          { id: "16-7", title: "Bioacústica" },
          { id: "16-8", title: "Bioeletromagnetismo" },
          { id: "16-9", title: "Interação radiação–matéria biológica" },
          { id: "16-10", title: "Eletro-termo-fototerapia (princípios)" }
        ],
        bibliography: [
          "DURÁN, J. E. R. Biofísica: Conceitos e Aplicações. 2ª ed. Pearson, 2011.",
          "HOBBIE, R.; ROTH, B. Intermediate Physics for Medicine and Biology. 5ª ed. Springer, 2015."
        ]
      },
      {
        id: 17,
        title: "Fisiopatologia",
        topics: [
          { id: "17-1", title: "Conceitos gerais de doença, etiologia, patogenia" },
          { id: "17-2", title: "Inflamação aguda e crônica" },
          { id: "17-3", title: "Distúrbios hemodinâmicos (trombose, embolia, choque)" },
          { id: "17-4", title: "Neoplasias" },
          { id: "17-5", title: "Doenças cardiovasculares (aterosclerose, IAM, IC)" },
          { id: "17-6", title: "Doenças respiratórias (DPOC, asma, fibrose)" },
          { id: "17-7", title: "Doenças endócrinas e metabólicas (diabetes, dislipidemias)" },
          { id: "17-8", title: "Doenças neurológicas (AVC, Parkinson, Alzheimer)" },
          { id: "17-9", title: "Insuficiência renal" }
        ],
        bibliography: [
          "ROBBINS & COTRAN. Patologia: Bases Patológicas das Doenças. 10ª ed. Elsevier, 2021.",
          "PORTH, C. Fisiopatologia. 9ª ed. Guanabara Koogan, 2015."
        ]
      }
    ]
  }
];
