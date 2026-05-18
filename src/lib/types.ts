// Difficulty levels for topics
export type DifficultyLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

// Learning Path: estrutura pedagógica para cada tópico
export interface LearningPath {
  id: string;
  topicId: string;

  // Contexto: Por quê, quando e próximos passos
  context: string;           // "Você aprende isto porque..."
  whyNow: string;            // Por que neste momento?
  whatNext: string;          // "Depois usaremos para..."
  relatedTopicIds: string[]; // Tópicos relacionados

  // Conceitos e erros comuns
  keyPoints: string[];       // Pontos-chave principais
  commonMistakes: string[];  // Erros típicos a evitar

  // Exemplos progressivos
  simpleExample?: string;     // Exemplo simples
  realisticExample?: string;  // Exemplo realístico (contexto biomédico)

  // Metadados pedagógicos
  difficulty: DifficultyLevel;
  estimatedTime: number;     // em minutos
  prerequisites: string[];   // IDs de tópicos pré-requisitos

  createdAt?: Date;
  updatedAt?: Date;
}

// Topic com integração de Learning Path
export interface Topic {
  id: string;
  title: string;
  content?: string | null;
  notebookLmUrl?: string | null;
  videoUrl?: string | null;
  learningPath?: LearningPath | null;
}

export interface Block {
  id: number;
  title: string;
  content?: string | null;
  topics: Topic[];
  bibliography?: string | string[] | null;
  highlights?: string | string[] | null;
  notebookLmUrl?: string | null;
}

export interface Part {
  id: number;
  title: string;
  icon: string;
  courseId?: number;
  course?: {
    id: number;
    title: string;
    description: string | null;
  };
  blocks: Block[];
}
