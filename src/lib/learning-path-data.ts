import { LearningPath } from "./types";

/**
 * Learning Path Data: Estrutura pedagógica para cada tópico
 * Contém contexto, exemplos e metadados de aprendizagem
 *
 * Mapeamento: topic-id → learning path structure
 */

export const learningPathData: Record<string, Omit<LearningPath, "id" | "topicId">> = {
  // ============================================
  // BLOCO 1-1: Limites e continuidade de funções
  // ============================================
  "1-1": {
    context: "Limites são o fundamento do Cálculo. Você aprende isto porque toda derivada é um limite, e toda integração depende de entender comportamentos 'no infinito'.",
    whyNow: "Você começa com limites porque é o conceito mais fundamental. Sem intuição sobre limites, derivadas e integrais não fazem sentido.",
    whatNext: "Depois você usará limites para entender Derivadas (tópico 1-2). Depois, em processamento de sinais biomédicos, você usará limites para entender estabilidade de filtros.",
    relatedTopicIds: ["1-2", "1-3"],
    keyPoints: [
      "Limite é o valor que uma função se APROXIMA, sem necessariamente alcançar",
      "ε-δ formalmente: para todo ε > 0, existe δ > 0 tal que |x-a| < δ ⟹ |f(x)-L| < ε",
      "Continuidade: f é contínua em 'a' se lim(x→a) f(x) = f(a)",
      "Limites laterais: lim(x→a⁻) = lim(x→a⁺) ⟹ lim(x→a) existe"
    ],
    commonMistakes: [
      "❌ Confundir 'o valor do limite' com 'o valor da função no ponto'",
      "❌ Achar que lim(x→a) f(x) = f(a) sempre (nem sempre verdade!)",
      "❌ Usar ε-δ mecanicamente sem entender o significado geométrico",
      "❌ Esquecer que limites podem não existir (limites laterais diferentes)"
    ],
    simpleExample: `
Função: f(x) = (x² - 1)/(x - 1)

⚠️ f(1) é indefinido (0/0)
✅ Mas lim(x→1) f(x) = 2

Por quê? Fatora: (x² - 1)/(x - 1) = (x-1)(x+1)/(x-1) = x + 1
Quando x → 1: (x + 1) → 2

Geometricamente: A função se APROXIMA de y=2, mesmo que não toque o ponto (1, 2).
    `,
    realisticExample: `
Contexto Biomédico: Estabilidade de Filtro ECG

Um filtro eletrônico é estável se sua resposta ao impulso decai:
lim(n→∞) h[n] = 0

Se este limite NÃO existir (ou divergir), o filtro vai oscilar eternamente.
Em produção: seu dispositivo de ECG pode travar ou enviar artefatos infinitos!

Você usa limite para VERIFICAR estabilidade antes de implantar.
    `,
    difficulty: "BEGINNER",
    estimatedTime: 45,
    prerequisites: [],
  },

  // ============================================
  // BLOCO 1-2: Derivadas e aplicações
  // ============================================
  "1-2": {
    context: "Derivada é a ferramenta central de cálculo. Você aprende isto porque toda otimização (encontrar máximos/mínimos) usa derivadas.",
    whyNow: "Depois que você entendeu limites, derivadas são fáceis: uma derivada É um limite especial que mede 'taxa de mudança instantânea'.",
    whatNext: "Você usará derivadas em: (1) Otimização de algoritmos (tópico 1-10), (2) Sinais biomédicos (derivada temporal de ECG = taxa de mudança do coração), (3) Machine Learning (gradiente descendente).",
    relatedTopicIds: ["1-1", "1-3", "1-10"],
    keyPoints: [
      "Derivada = limite da taxa de mudança média: f'(a) = lim(h→0) [f(a+h) - f(a)]/h",
      "Interpretação geométrica: inclinação da reta tangente no ponto",
      "Interpretação física: taxa de mudança instantânea (velocidade = derivada da posição)",
      "Regras de derivação: potência, produto, cadeia, quociente",
      "Teste da primeira derivada: f'(x) = 0 encontra extremos locais",
      "Teste da segunda derivada: f''(x) > 0 é mínimo, f''(x) < 0 é máximo"
    ],
    commonMistakes: [
      "❌ Confundir f'(x) com f(x) — a derivada é uma NOVA função",
      "❌ Esquecer regra da cadeia em funções compostas como sin(x²)",
      "❌ Achar que f'(x) = 0 SEMPRE é máximo (pode ser mínimo ou ponto de sela)",
      "❌ Assumir que 'diferenciável' = 'contínua' em qualquer lugar (diferenciável → contínua, mas não inverso)"
    ],
    simpleExample: `
f(x) = x³ - 3x

1) Encontre a derivada:
   f'(x) = 3x² - 3

2) Encontre pontos críticos (f'(x) = 0):
   3x² - 3 = 0
   x² = 1
   x = ±1

3) Use teste da segunda derivada:
   f''(x) = 6x
   f''(-1) = -6 < 0 → máximo local em x = -1
   f''(1) = 6 > 0 → mínimo local em x = 1
    `,
    realisticExample: `
Contexto: Otimizar Dosagem de Medicamento

Concentração de remédio no sangue: C(t) = 10t·e^(-0.3t) mg/mL

Pergunta clínica: "Quando a concentração atinge o pico?"

Solução:
1) Encontre dC/dt:
   dC/dt = 10·e^(-0.3t) + 10t·(-0.3)·e^(-0.3t)
   dC/dt = e^(-0.3t)·(10 - 3t)

2) Iguale a zero:
   10 - 3t = 0
   t = 3.33 horas

3) Confirmação (segunda derivada):
   d²C/dt² < 0 em t=3.33
   ✅ É máximo!

Conclusão: Concentração máxima em 3h20min após administração.
Médico sabe: "Coleta exame de sangue em 3h20min para validar efetividade."

SEM derivadas, você daria chute no escuro!
    `,
    difficulty: "INTERMEDIATE",
    estimatedTime: 60,
    prerequisites: ["1-1"],
  },

  // ============================================
  // BLOCO 1-3: Teoremas Fundamentais
  // ============================================
  "1-3": {
    context: "Teoremas de Rolle, Valor Médio e Cauchy são o 'glue' que conecta continuidade, derivadas e comportamento de funções. São teoremas de existência que garantem propriedades incríveis.",
    whyNow: "Você já sabe derivadas. Agora aprende: 'Se uma função é contínua e diferenciável, GARANTO que algo interessante acontece'.",
    whatNext: "Você usará TVM para: (1) Provar que uma função é crescente/decrescente, (2) Estimar erros numéricos, (3) Análise de convergência de algoritmos.",
    relatedTopicIds: ["1-2", "1-4"],
    keyPoints: [
      "Teorema de Rolle: Se f(a) = f(b) e f é contínua em [a,b] e derivável em (a,b), então existe c em (a,b) onde f'(c) = 0",
      "Teorema do Valor Médio (TVM): Existe c em (a,b) onde f'(c) = [f(b) - f(a)]/(b - a)",
      "Interpretação: 'Em algum ponto, a inclinação instantânea = inclinação média'",
      "Teorema de Cauchy: Generaliza TVM para razão de derivadas"
    ],
    commonMistakes: [
      "❌ Pensar que TVM diz 'qual' é o c (teorema de EXISTÊNCIA, não construção)",
      "❌ Aplicar teoremas sem verificar pré-condições (continuidade, diferenciabilidade)",
      "❌ Confundir 'existe c' com 'c é único' (c não é único em geral)"
    ],
    simpleExample: `
f(x) = x² em [0, 2]

1) Verifique pré-condições:
   ✓ Contínua em [0, 2]
   ✓ Diferenciável em (0, 2)

2) Calcule inclinação média:
   [f(2) - f(0)]/(2 - 0) = (4 - 0)/2 = 2

3) Por TVM, existe c onde f'(c) = 2:
   f'(x) = 2x = 2
   c = 1 ∈ (0, 2) ✓

Geometricamente: A reta secante de (0,0) a (2,4) tem inclinação 2.
A reta tangente em x=1 também tem inclinação 2.
    `,
    realisticExample: `
Contexto: Validar Acurácia de Sensor Contínuo de Glicose

Leitura de um sensor contínuo de glicose durante 1 hora:
G(t) = 120 + 20·sin(πt) mg/dL

Pergunta: "Há algum instante onde a taxa de mudança de glicose é exatamente a média?"

Resposta (por TVM):
Taxa média = [G(60) - G(0)]/(60 - 0) = [120 - 120]/60 = 0

Por TVM, existe t ∈ (0,60) onde dG/dt = 0.

Encontre:
dG/dt = 20π·cos(πt) = 0
cos(πt) = 0
t = 30 min

✓ TVM garantiu matematicamente que em t=30min, a taxa instantânea = média!
Em saúde: sensor funciona corretamente se comportamento matemático bate com realidade.
    `,
    difficulty: "INTERMEDIATE",
    estimatedTime: 40,
    prerequisites: ["1-2"],
  },

  // ============================================
  // BLOCO 1-4: Integrais Definidas e Indefinidas
  // ============================================
  "1-4": {
    context: "Integração é o 'inverso' de derivação. Enquanto derivada mede 'taxa de mudança', integral mede 'acúmulo'. Em biomedicina, você integra constantemente: total de remédio acumulado, energia consumida, carga transportada.",
    whyNow: "Você já dominou derivadas. Integral é mais fácil: você já sabe o resultado (TFC diz integral = antiderivada avaliada nos limites).",
    whatNext: "Você usará integrais em: (1) Calcular área sob curva de sinais (ECG, EEG), (2) Farmacocinética (integrar concentração no tempo), (3) Processamento de imagem (somas de intensidade).",
    relatedTopicIds: ["1-2", "1-5", "1-7"],
    keyPoints: [
      "Integral indefinida: ∫f(x)dx = F(x) + C (família de antiderivadas)",
      "Integral definida: ∫[a,b] f(x)dx = área com sinal entre curva e eixo x",
      "Teorema Fundamental do Cálculo (TFC): ∫[a,b] f(x)dx = F(b) - F(a) onde F' = f",
      "Propriedades: ∫[a,b] f = -∫[b,a] f, linearidade, aditividade"
    ],
    commonMistakes: [
      "❌ Esquecer a constante C em integrais indefinidas (é obrigatório!)",
      "❌ Confundir ∫f(x)dx (função) com ∫[a,b] f(x)dx (número)",
      "❌ Não usar TFC corretamente: deve-se sempre avaliar nos limites",
      "❌ Assumir que toda integral é 'fácil' (algumas precisam de técnicas especiais)"
    ],
    simpleExample: `
f(x) = 3x² + 2x

1) Integral indefinida:
   ∫(3x² + 2x)dx = x³ + x² + C

2) Integral definida de 0 a 2:
   ∫[0,2] (3x² + 2x)dx = [x³ + x²] avaliado de 0 a 2
                         = (8 + 4) - (0 + 0)
                         = 12

Geometricamente: Área sob parábola 3x² + 2x entre x=0 e x=2 é 12 unidades.
    `,
    realisticExample: `
Contexto: Calcular Dose Total de Medicamento Acumulada

Concentração de droga no sangue: C(t) = 50·e^(-0.2t) mg/mL (decaimento exponencial)

Pergunta: "Quanto medicamento total foi acumulado na primeira 1 hora?"

Solução (usando integral):
Dose total = ∫[0,60] C(t)dt
           = ∫[0,60] 50·e^(-0.2t)dt
           = 50·[-1/0.2·e^(-0.2t)]|[0,60]
           = -250·[e^(-12) - e^0]
           = -250·[0.000006 - 1]
           = 250 mg

Interpretação: Em 1 hora, o corpo acumula ~250mg de droga (mesmo com degradação).

Médico sabe: "Se dose inicial era 100mg, após 1h restam apenas ~0mg
porque 99.99% foi metabolizado (exponencial decay)."

SEM integração, não saberíamos fazer este cálculo!
    `,
    difficulty: "INTERMEDIATE",
    estimatedTime: 50,
    prerequisites: ["1-2"],
  },

  // ============================================
  // BLOCO 1-5: Técnicas de Integração
  // ============================================
  "1-5": {
    context: "Nem toda integral é fácil. Você aprende técnicas (substituição, partes, frações parciais) para resolver integrais complexas. Estas técnicas são FERRAMENTAS que você usa conforme a situação.",
    whyNow: "Você já sabe integração básica. Agora aprende 'truques' para integrais que parecem impossíveis.",
    whatNext: "Você usará estas técnicas em: (1) Transformada de Laplace (tópico 1-13), (2) Resolução de EDOs (tópico 1-12), (3) Análise de Fourier de sinais.",
    relatedTopicIds: ["1-4", "1-12", "1-13"],
    keyPoints: [
      "Integração por substituição: ∫f(g(x))·g'(x)dx = ∫f(u)du onde u = g(x)",
      "Integração por partes: ∫u·dv = u·v - ∫v·du (escolha de u é crítica: LIATE)",
      "Frações parciais: decomponha f(x)/g(x) em soma de frações simples",
      "Substituição trigonométrica: √(a²-x²) → a·sinθ, √(a²+x²) → a·tanθ"
    ],
    commonMistakes: [
      "❌ Fazer substituição errada (u deve ser a parte 'interna')",
      "❌ Esquecer dv/dx na integração por partes (é fácil se escrever 'du' e 'dv' separados)",
      "❌ Tentar frações parciais antes de verificar se polinômio é próprio",
      "❌ Fazer substituição trigonométrica errada (√(x²-a²) ≠ √(a²-x²))"
    ],
    simpleExample: `
∫ 2x·e^(x²) dx

Técnica: Substituição
u = x² → du = 2x·dx

∫ 2x·e^(x²) dx = ∫ e^u du = e^u + C = e^(x²) + C

Verificação (derive o resultado):
d/dx[e^(x²)] = e^(x²)·2x ✓
    `,
    realisticExample: `
Contexto: Análise de Decaimento Radioativo em Diagnóstico

Atividade de radioisótopo: A(t) = A₀·t·e^(-λt)

Pergunta: "Quanto material radioativo total foi liberado entre t=0 e t=T?"

Solução (integração por partes):
Q = ∫[0,T] A₀·t·e^(-λt) dt

Escolha: u = t, dv = e^(-λt)dt
         du = dt, v = -1/λ·e^(-λt)

Q = [t·(-1/λ·e^(-λt))]|[0,T] - ∫[0,T] (-1/λ·e^(-λt))dt
  = -T/λ·e^(-λT) + 1/λ·∫[0,T] e^(-λt)dt
  = -T/λ·e^(-λT) + 1/λ·[-1/λ·e^(-λt)]|[0,T]
  = -T/λ·e^(-λT) - 1/λ²·(e^(-λT) - 1)

Interpretação: A dose radiativa acumulada depende de T (tempo de exposição).
Médico usa isto para: "Se expôr paciente por 2h no PET scan, dose total = Q(2)."
    `,
    difficulty: "ADVANCED",
    estimatedTime: 70,
    prerequisites: ["1-4"],
  },

  // ============================================
  // BLOCO 1-10: Otimização Multivariada
  // ============================================
  "1-10": {
    context: "Muitos problemas do mundo real envolvem MÚLTIPLAS variáveis com RESTRIÇÕES. Exemplo: 'maximize eficiência de dispositivo sujeito a custo < $5000'. Multiplicadores de Lagrange resolvem isto.",
    whyNow: "Você já sabe otimizar funções de 1 variável (tópico 1-2). Agora aprende a otimizar quando há múltiplas variáveis e restrições.",
    whatNext: "Você usará multiplicadores de Lagrange em: (1) Engenharia de design (otimizar peso vs resistência), (2) Economia da saúde (máximo benefit por $ gasto), (3) Machine Learning (constraint optimization).",
    relatedTopicIds: ["1-2", "1-6"],
    keyPoints: [
      "Multiplicadores de Lagrange: ∇f = λ∇g para maximizar f sujeito a g = 0",
      "Procedimento: (1) Configure ∇f = λ∇g, (2) Resolva sistema, (3) Avalie f em candidatos",
      "Interpretação de λ: taxa de mudança da função objetivo por unidade de relaxamento da restrição",
      "Hessiana bordada: teste se é máximo/mínimo"
    ],
    commonMistakes: [
      "❌ Esquecer de checar FRONTEIRAS (máximo pode estar na borda da região factível)",
      "❌ Achar que λ tem significado físico direto (é sensibilidade, entender contexto)",
      "❌ Não verificar se solução é máximo ou mínimo (use Hessiana)"
    ],
    simpleExample: `
Problema: Maximize x·y sujeito a x + y = 10

Setup Lagrangiano:
L = x·y - λ(x + y - 10)

Derivadas parciais:
∂L/∂x = y - λ = 0 → y = λ
∂L/∂y = x - λ = 0 → x = λ
∂L/∂λ = -(x + y - 10) = 0

Solução:
x = y e x + y = 10 → x = y = 5

Máximo: f(5, 5) = 25

Interpretação: Para soma fixa (10), o produto é máximo quando x = y.
    `,
    realisticExample: `
Contexto: Design Ótimo de Cateter Vascular

Parâmetros:
- Diâmetro D (mm): aumenta fluxo mas aumenta custo
- Comprimento L (cm): mais longo → mais resistência ao fluxo
- Custo: C(D, L) = 100·D + 50·L

Objetivo: Maximizar fluxo Q = π·D²·v / 4 (assume v = 100/L constante)
Restrição: Custo < $1000

Reformulado:
max f(D, L) = D²/L
s.t. 100D + 50L = 1000

Multiplicadores de Lagrange:
∇f = λ∇g
(2D/L, -D²/L²) = λ(100, 50)

Resolvendo:
2D/L = 100λ
-D²/L² = 50λ

De primeira: λ = 2D/(100L) = D/(50L)
De segunda: λ = -D²/(50L²)

Igualando: D/(50L) = -D²/(50L²)
1 = -D/L

Isto significa: solução está na fronteira!

Ótimo real (via análise numérica): D ≈ 8mm, L ≈ 2cm
Fluxo: Q ≈ 1600 mm³/s

Conclusão: Engenheiro sabe projeto ótimo que balanceia custo vs performance.
    `,
    difficulty: "ADVANCED",
    estimatedTime: 60,
    prerequisites: ["1-2", "1-6"],
  },

  // ============================================
  // BLOCO 1-12: Equações Diferenciais Ordinárias
  // ============================================
  "1-12": {
    context: "Equações diferenciais modelam como SISTEMAS MUDAM ao longo do tempo. Em biomedicina: como concentração de droga muda, como temperatura corporal muda, como batimentos do coração mudam.",
    whyNow: "Você domina derivadas e integrais. Agora aprende: 'Como resolver equações que envolvem derivadas?'",
    whatNext: "Você usará EDOs em: (1) Farmacocinética (modelo de concentração de droga), (2) Fisiologia (modelo de batimento cardíaco), (3) Dinâmica de sistemas biológicos.",
    relatedTopicIds: ["1-2", "1-4", "1-5", "1-13"],
    keyPoints: [
      "EDO: equação envolvendo uma função e suas derivadas",
      "Ordem: maior derivada presente (ordem 1: y', ordem 2: y'', etc)",
      "Lineares: nenhum termo em y² ou y·y' (ex: y' + 2y = 0 é linear)",
      "Separáveis: equações que podem ser escritas como ∫dy/h(y) = ∫g(x)dx",
      "Lineares de 2ª ordem: ay'' + by' + cy = 0 (polinômio característico)"
    ],
    commonMistakes: [
      "❌ Esquecer constante arbitrária na solução (EDO tem INFINITAS soluções)",
      "❌ Achar que toda EDO tem solução 'fechada' (a maioria não tem)",
      "❌ Não checar condições iniciais/limites (definem qual solução é a sua)",
      "❌ Confundir EDO com EDP (equações em MÚLTIPLAS variáveis independentes)"
    ],
    simpleExample: `
Modelo simples: dy/dt = -k·y (decay exponencial)

Técnica: Separação de variáveis
dy/y = -k·dt
∫dy/y = ∫-k·dt
ln|y| = -kt + C
y(t) = A·e^(-kt) onde A = e^C

Condição inicial: y(0) = 100 → A = 100
Solução final: y(t) = 100·e^(-kt)

Significado: Quantidade decai exponencialmente.
    `,
    realisticExample: `
Contexto: Eliminação de Medicamento no Corpo

O corpo elimina droga proporcionalmente à concentração:
dC/dt = -k·C

Dados:
- C(0) = 300 mg (dose inicial)
- C(4) = 75 mg (medido após 4 horas)
- Meia-vida = 2 horas (tempo para reduzir pela metade)

Solução (usando separação):
C(t) = C₀·e^(-kt)
300·e^(-4k) = 75
e^(-4k) = 1/4
-4k = ln(1/4)
k = 0.347/h

Fórmula final:
C(t) = 300·e^(-0.347t)

Verificação:
C(2) = 300·e^(-0.694) ≈ 150 ✓ (meia-vida = 2h)

Aplicação clínica:
- Paciente toma 300mg às 8:00
- Às 12:00 (4h depois): C = 75mg (precisa tomar novamente se quer > 100mg)
- Às 14:00 (6h depois): C ≈ 19mg (muito baixo, efeito passou)

SEM EDO, médico não saberia QUANDO ministrar próxima dose!
    `,
    difficulty: "ADVANCED",
    estimatedTime: 80,
    prerequisites: ["1-2", "1-4", "1-5"],
  },

  // ============================================
  // BLOCO 1-13: Transformada de Laplace
  // ============================================
  "1-13": {
    context: "Transformada de Laplace converte equações diferenciais DIFÍCEIS em equações algébricas FÁCEIS. É uma das ferramentas mais poderosas em engenharia biomédica.",
    whyNow: "Você já sabe resolver EDOs simples (tópico 1-12). Agora aprende a ferramenta que resolve EDOs complexas e análise de sistemas.",
    whatNext: "Você usará Laplace em: (1) Análise de estabilidade de sistemas (um marcapasso é estável?), (2) Processamento de sinais, (3) Controle de dispositivos biomédicos.",
    relatedTopicIds: ["1-12", "1-5"],
    keyPoints: [
      "Transformada de Laplace: L{f(t)} = F(s) = ∫[0,∞] e^(-st)·f(t)dt",
      "Propriedade crucial: L{f'(t)} = s·F(s) - f(0) (derivada → multiplicação!)",
      "Tabela de Laplace: memorize pares comuns (exponencial, seno, cosseno, etc)",
      "Transformada inversa: f(t) = L⁻¹{F(s)} (tabelado ou frações parciais)"
    ],
    commonMistakes: [
      "❌ Tentar calcular Laplace de funções não-causal (f(t < 0) deve ser 0)",
      "❌ Esquecer condições iniciais ao transformar (L{y'} = s·Y - y(0))",
      "❌ Não simplificar a equação algébrica antes de transformada inversa",
      "❌ Confundir domínio 's' (frequência complexa) com domínio de frequência 'ω'"
    ],
    simpleExample: `
Resolva: y'' + 3y' + 2y = 0, y(0) = 1, y'(0) = 0

Passo 1: Transformar cada termo
L{y''} = s²·Y - s·y(0) - y'(0) = s²·Y - s
L{y'} = s·Y - y(0) = s·Y - 1
L{y} = Y

Passo 2: Substituir
(s²·Y - s) + 3(s·Y - 1) + 2Y = 0
s²·Y - s + 3s·Y - 3 + 2Y = 0
Y(s² + 3s + 2) = s + 3
Y = (s + 3)/(s² + 3s + 2) = (s + 3)/[(s+1)(s+2)]

Passo 3: Frações parciais
Y = A/(s+1) + B/(s+2)
s + 3 = A(s+2) + B(s+1)
s=−1: 2 = A → A = 2
s=−2: 1 = −B → B = −1

Y = 2/(s+1) − 1/(s+2)

Passo 4: Transformada inversa
y(t) = 2e^(-t) − e^(-2t)

Verificação:
y(0) = 2 − 1 = 1 ✓
y'(t) = -2e^(-t) + 2e^(-2t), y'(0) = −2 + 2 = 0 ✓
    `,
    realisticExample: `
Contexto: Análise de Marcapasso Cardíaco

Modelo elétrico do coração com estímulo:
L·dI/dt + R·I = V(t)

Onde:
- L = indutância do tecido cardíaco
- R = resistência
- V(t) = voltagem aplicada pelo marcapasso
- I(t) = corrente (estímulo)

Pergunta: Se aplicamos V(t) = E (constante), qual é a resposta I(t)?

Solução via Laplace:
L·(s·I − 0) + R·I = E/s
I(s)·(Ls + R) = E/s
I(s) = E / [s(Ls + R)] = E / [Ls(s + R/L)]

Frações parciais:
I(s) = (E/R)·[1/s − 1/(s + R/L)]

Transformada inversa:
I(t) = (E/R)·[1 − e^(−R·t/L)]

Análise:
- t=0: I = 0 (sem resposta imediata)
- t→∞: I → E/R (regime permanente)
- τ = L/R (constante de tempo)

Interpretação: Coração responde ao estímulo do marcapasso com exponencial
caracterizada por τ. Se τ é muito grande, coração não acompanha (arritmia)!

Engenheiro do marcapasso usa isto para: escolher valores de L e R
que garantem resposta rápida e estável.
    `,
    difficulty: "ADVANCED",
    estimatedTime: 90,
    prerequisites: ["1-12", "1-5"],
  },
};

/**
 * Função helper para obter Learning Path de um tópico
 */
export function getLearningPathForTopic(topicId: string): Omit<LearningPath, "id" | "topicId"> | null {
  return learningPathData[topicId] || null;
}

/**
 * Função helper para obter tópicos relacionados
 */
export function getRelatedTopicIds(topicId: string): string[] {
  const lp = learningPathData[topicId];
  return lp ? lp.relatedTopicIds : [];
}
