# 🎓 Configuração: Camada 1 — Learning Path Inteligente

Este documento descreve como configurar e ativar o Learning Path Inteligente (Camada 1) na plataforma.

## ✅ O Que Foi Implementado

1. **Schema Prisma estendido** — Novo modelo `LearningPath`
2. **Tipos TypeScript** — Tipos completos para `LearningPath` e integração com `Topic`
3. **Dados Pedagógicos** — 9 tópicos com estrutura completa de Learning Path
4. **Componente React** — `LearningPathSection.tsx` com UI profissional
5. **Integração no BlockCard** — Abas "Conteúdo" vs "Caminho de Aprendizagem"
6. **Actions Atualizadas** — `getUserData()` agora retorna `learningPath`

---

## 📋 Próximos Passos (Deve Fazer)

### 1️⃣ **Executar Migração do Banco de Dados**

Se você tem acesso direto ao banco Supabase:

```bash
# Opção A: Via Prisma (recomendado)
npx prisma migrate dev --name add_learning_path

# Opção B: Via SQL direto no Supabase Console
# Copie o conteúdo de prisma/migrations/add_learning_path.sql
# E execute no Supabase SQL Editor (https://supabase.com/dashboard)
```

Se você está em um ambiente sem acesso ao banco (como agora):
- Vá para [Supabase Console](https://supabase.com/dashboard)
- Abra SQL Editor
- Copie e execute o SQL em `prisma/migrations/add_learning_path.sql`

### 2️⃣ **Popular a Tabela Learning Path**

Após a migração, execute o seed:

```bash
# Regenerar cliente Prisma
npx prisma generate

# Executar script de seed
npx ts-node prisma/seed-learning-path.ts
```

**Ou manualmente:**
- Vá para [Supabase Console](https://supabase.com/dashboard)
- SQL Editor
- Execute o seed script que criará os dados

### 3️⃣ **Verificar Implementação**

Após popular o banco:

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Ou com bun
bun run dev
```

1. Acesse http://localhost:3001
2. Login na plataforma
3. Navegue para um bloco (ex: "Cálculo Diferencial e Integral")
4. Clique em um tópico para abrir a modal
5. Você verá uma aba **"Caminho de Aprendizagem"** que mostra:
   - ✅ Por quê aprender isto
   - ✅ Conceitos-chave
   - ✅ Exemplos progressivos
   - ✅ Erros comuns
   - ✅ Metadados (pré-requisitos, tempo, dificuldade)

---

## 📚 Tópicos com Learning Path Implementados

Atualmente 9 tópicos têm estrutura pedagógica completa:

| Tópico ID | Título | Bloco | Dificuldade | Tempo |
|-----------|--------|-------|------------|-------|
| 1-1 | Limites e continuidade de funções | Bloco 1 | BEGINNER | 45min |
| 1-2 | Derivadas e aplicações | Bloco 2 | INTERMEDIATE | 60min |
| 1-3 | Teoremas Fundamentais | Bloco 3 | INTERMEDIATE | 40min |
| 1-4 | Integrais Definidas | Bloco 4 | INTERMEDIATE | 50min |
| 1-5 | Técnicas de Integração | Bloco 5 | ADVANCED | 70min |
| 1-10 | Otimização Multivariada | Bloco 10 | ADVANCED | 60min |
| 1-12 | Equações Diferenciais | Bloco 12 | ADVANCED | 80min |
| 1-13 | Transformada de Laplace | Bloco 13 | ADVANCED | 90min |

**Próximos blocos:** Você pode adicionar mais Learning Paths seguindo o padrão em `src/lib/learning-path-data.ts`

---

## 🔧 Estrutura de Dados

### Learning Path (no banco)
```sql
LearningPath {
  id: String (UUID)
  topicId: String (FK → CourseTopic)
  context: String
  whyNow: String
  whatNext: String
  relatedTopicIds: String (JSON array)
  keyPoints: String (JSON array)
  commonMistakes: String (JSON array)
  simpleExample: String (opcional)
  realisticExample: String (opcional)
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  estimatedTime: Integer (minutos)
  prerequisites: String (JSON array)
  createdAt, updatedAt: DateTime
}
```

### Integração com Topic
```typescript
interface Topic {
  id: string;
  title: string;
  content?: string;
  videoUrl?: string;
  learningPath?: LearningPath | null;  // ← Nova propriedade
}
```

---

## 🎨 Componentes Criados

### `LearningPathSection.tsx`
Componente principal que renderiza todo o Learning Path com:
- Seções colapsáveis (accordion)
- Contexto (Por quê, quando, próximos passos)
- Conceitos-chave
- Exemplos progressivos (simples + realístico)
- Erros comuns
- Metadados (pré-requisitos, tempo, dificuldade)
- Animações com Framer Motion
- Cores e ícones customizados

### Integração no BlockCard
- Nova aba "Caminho de Aprendizagem" na modal de tópico
- Apenas aparece se tópico tem `learningPath` (backward compatible)
- Transição suave entre abas

---

## 📝 Como Adicionar Learning Path a Novos Tópicos

1. **Edite** `src/lib/learning-path-data.ts`
2. **Adicione** nova entrada com estrutura:

```typescript
export const learningPathData: Record<string, Omit<LearningPath, "id" | "topicId">> = {
  // ... existing ...
  
  "2-5": {  // Seu novo tópico
    context: "Você aprende isto porque...",
    whyNow: "Porque agora você tem os pré-requisitos...",
    whatNext: "Depois você usará para...",
    relatedTopicIds: ["2-4", "3-1"],
    keyPoints: [
      "Ponto-chave 1",
      "Ponto-chave 2",
    ],
    commonMistakes: [
      "❌ Erro típico 1",
      "❌ Erro típico 2",
    ],
    simpleExample: `Exemplo simples...`,
    realisticExample: `Exemplo realístico com contexto biomédico...`,
    difficulty: "INTERMEDIATE",
    estimatedTime: 45,
    prerequisites: ["2-3", "2-4"],
  }
};
```

3. **Execute** o seed:
```bash
npx ts-node prisma/seed-learning-path.ts
```

---

## 🧪 Teste de Qualidade

Para verificar se está funcionando:

```bash
# 1. Verificar banco
select count(*) from "LearningPath";  # Deve retornar 9 ou mais

# 2. Verificar UI
# Na modal de tópico, clique em "Caminho de Aprendizagem"
# Deve aparecer contexto, conceitos-chave, etc

# 3. Verificar Log no console
# Deve haver mensagens de seed bem-sucedidas
```

---

## ⚠️ Troubleshooting

### "Caminho de Aprendizagem" não aparece como aba?
- ✅ Banco migrado?
- ✅ Seed executado?
- ✅ Página recarregada?
- ✅ Tópico tem `learningPath` (verifique no banco)?

### Erro ao executar seed?
```bash
# Regenere o cliente Prisma
npx prisma generate

# Tente novamente
npx ts-node prisma/seed-learning-path.ts
```

### "Can't reach database server"?
- Você está em um ambiente sem acesso ao Supabase
- Execute manualmente via Supabase Console (Dashboard → SQL Editor)

---

## 📊 Próximas Camadas (Futuro)

Após implementar Learning Path, as próximas camadas são:

- **Camada 2:** Micro-Quizzes + Spaced Repetition
- **Camada 3:** Exercícios de Código (5 níveis)
- **Camada 4:** Gemini Pedagógico (melhorar chatbot)
- **Camada 5:** Dashboard Metacognição
- **Camada 6:** Projeto Capstone
- **Camada 7:** Certificação com Badges

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique este documento
2. Verifique os logs do servidor (`npm run dev`)
3. Abra uma issue no GitHub com:
   - O erro exato
   - Passos para reproduzir
   - Seu ambiente (Node.js, npm, OS)

---

**Última atualização:** 18 de Maio de 2026
**Status:** ✅ Implementação Completa (Awaiting Database Setup)
