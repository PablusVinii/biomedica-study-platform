"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  AlertCircle,
  Lightbulb,
  BookMarked,
  CheckCircle2,
  Clock,
  Zap,
  ArrowRight,
  Target,
} from "lucide-react";
import { LearningPath } from "@/lib/types";
import { cn } from "@/lib/utils";

interface LearningPathSectionProps {
  learningPath: LearningPath;
  topicTitle: string;
}

export function LearningPathSection({
  learningPath,
  topicTitle,
}: LearningPathSectionProps) {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    context: true,
    keyPoints: true,
    examples: false,
    mistakes: false,
    metadata: false,
  });

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Parse JSON strings from database
  const keyPoints = typeof learningPath.keyPoints === 'string'
    ? JSON.parse(learningPath.keyPoints)
    : learningPath.keyPoints || [];

  const commonMistakes = typeof learningPath.commonMistakes === 'string'
    ? JSON.parse(learningPath.commonMistakes)
    : learningPath.commonMistakes || [];

  const relatedTopicIds = typeof learningPath.relatedTopicIds === 'string'
    ? JSON.parse(learningPath.relatedTopicIds)
    : learningPath.relatedTopicIds || [];

  const prerequisites = typeof learningPath.prerequisites === 'string'
    ? JSON.parse(learningPath.prerequisites)
    : learningPath.prerequisites || [];

  const getDifficultyColor = (
    difficulty: string
  ): {
    bg: string;
    text: string;
    label: string;
  } => {
    switch (difficulty) {
      case "BEGINNER":
        return {
          bg: "bg-green-500/10",
          text: "text-green-600",
          label: "Iniciante",
        };
      case "INTERMEDIATE":
        return {
          bg: "bg-blue-500/10",
          text: "text-blue-600",
          label: "Intermediário",
        };
      case "ADVANCED":
        return {
          bg: "bg-purple-500/10",
          text: "text-purple-600",
          label: "Avançado",
        };
      default:
        return {
          bg: "bg-gray-500/10",
          text: "text-gray-600",
          label: "Indefinido",
        };
    }
  };

  const difficultyInfo = getDifficultyColor(learningPath.difficulty);

  return (
    <div className="space-y-3 border-t border-border/40 pt-4">
      {/* Header com metadata */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <span className="text-sm font-semibold text-card-foreground">
            Caminho de Aprendizagem
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              difficultyInfo.bg,
              difficultyInfo.text
            )}
          >
            {difficultyInfo.label}
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-muted/30 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {learningPath.estimatedTime}min
          </div>
        </div>
      </div>

      {/* ====== SEÇÃO 1: CONTEXTO ====== */}
      <CollapsibleSection
        title="Por Quê Aprender Isto?"
        isOpen={expandedSections.context}
        onToggle={() => toggleSection("context")}
        icon={<Target className="w-4 h-4" />}
        accentColor="from-blue-500/20 to-blue-500/5"
      >
        <div className="space-y-3 text-sm text-muted-foreground">
          {/* Context */}
          <div>
            <p className="font-semibold text-card-foreground mb-1">Contexto:</p>
            <p className="leading-relaxed italic">{learningPath.context}</p>
          </div>

          {/* Why Now */}
          <div className="pt-2 border-t border-border/30">
            <p className="font-semibold text-card-foreground mb-1">
              ⏰ Por Que Agora?
            </p>
            <p className="leading-relaxed text-amber-600/80 dark:text-amber-400/80">
              {learningPath.whyNow}
            </p>
          </div>

          {/* What Next */}
          <div className="pt-2 border-t border-border/30">
            <p className="font-semibold text-card-foreground mb-1 flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              O Que Vem Depois?
            </p>
            <p className="leading-relaxed text-green-600/80 dark:text-green-400/80">
              {learningPath.whatNext}
            </p>
          </div>

          {/* Related Topics */}
          {relatedTopicIds.length > 0 && (
            <div className="pt-2 border-t border-border/30">
              <p className="font-semibold text-card-foreground mb-2">
                📚 Tópicos Relacionados:
              </p>
              <div className="flex flex-wrap gap-2">
                {relatedTopicIds.map((id: string) => (
                  <span
                    key={id}
                    className="px-2 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary"
                  >
                    {id}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </CollapsibleSection>

      {/* ====== SEÇÃO 2: CONCEITOS-CHAVE ====== */}
      <CollapsibleSection
        title="Conceitos-Chave"
        isOpen={expandedSections.keyPoints}
        onToggle={() => toggleSection("keyPoints")}
        icon={<BookMarked className="w-4 h-4" />}
        accentColor="from-emerald-500/20 to-emerald-500/5"
      >
        <div className="space-y-2">
          {keyPoints.map((point: string, idx: number) => (
            <div
              key={idx}
              className="flex gap-3 text-sm text-muted-foreground group"
            >
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 group-hover:text-emerald-400 transition-colors" />
              </div>
              <p className="leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* ====== SEÇÃO 3: EXEMPLOS ====== */}
      <CollapsibleSection
        title="Exemplos Progressivos"
        isOpen={expandedSections.examples}
        onToggle={() => toggleSection("examples")}
        icon={<Zap className="w-4 h-4" />}
        accentColor="from-orange-500/20 to-orange-500/5"
      >
        <div className="space-y-4">
          {/* Exemplo Simples */}
          {learningPath.simpleExample && (
            <ExampleCard
              title="📌 Exemplo Simples"
              content={learningPath.simpleExample}
              level="BEGINNER"
            />
          )}

          {/* Exemplo Realístico */}
          {learningPath.realisticExample && (
            <ExampleCard
              title="🏥 Exemplo Realístico (Contexto Biomédico)"
              content={learningPath.realisticExample}
              level="INTERMEDIATE"
            />
          )}
        </div>
      </CollapsibleSection>

      {/* ====== SEÇÃO 4: ERROS COMUNS ====== */}
      <CollapsibleSection
        title="Erros Comuns a Evitar"
        isOpen={expandedSections.mistakes}
        onToggle={() => toggleSection("mistakes")}
        icon={<AlertCircle className="w-4 h-4" />}
        accentColor="from-red-500/20 to-red-500/5"
      >
        <div className="space-y-2">
          {commonMistakes.map((mistake: string, idx: number) => (
            <div key={idx} className="flex gap-3 text-sm text-muted-foreground">
              <div className="flex-shrink-0 mt-0.5 text-red-500 font-bold">
                ✗
              </div>
              <p className="leading-relaxed">{mistake}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* ====== SEÇÃO 5: METADADOS ====== */}
      <CollapsibleSection
        title="Metadados de Aprendizagem"
        isOpen={expandedSections.metadata}
        onToggle={() => toggleSection("metadata")}
        icon={<BookMarked className="w-4 h-4" />}
        accentColor="from-slate-500/20 to-slate-500/5"
      >
        <div className="grid grid-cols-2 gap-4 text-sm">
          {/* Pré-requisitos */}
          <div>
            <p className="font-semibold text-card-foreground mb-2">
              📋 Pré-Requisitos:
            </p>
            {prerequisites.length > 0 ? (
              <div className="flex flex-col gap-1">
                {prerequisites.map((prereq: string) => (
                  <span
                    key={prereq}
                    className="px-2 py-1 rounded text-xs bg-muted/50 text-muted-foreground"
                  >
                    {prereq}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground italic">Nenhum pré-requisito</p>
            )}
          </div>

          {/* Tempo estimado */}
          <div>
            <p className="font-semibold text-card-foreground mb-2">
              ⏱️ Tempo Estimado:
            </p>
            <p className="text-muted-foreground">
              {learningPath.estimatedTime} minutos
            </p>
          </div>

          {/* Dificuldade */}
          <div>
            <p className="font-semibold text-card-foreground mb-2">
              📊 Nível:
            </p>
            <div
              className={cn(
                "inline-block px-3 py-1 rounded-full text-xs font-medium",
                difficultyInfo.bg,
                difficultyInfo.text
              )}
            >
              {difficultyInfo.label}
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}

// ============================================================
// Subcomponentes auxiliares
// ============================================================

interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  accentColor?: string;
  children: React.ReactNode;
}

function CollapsibleSection({
  title,
  isOpen,
  onToggle,
  icon,
  accentColor = "from-blue-500/20 to-blue-500/5",
  children,
}: CollapsibleSectionProps) {
  return (
    <motion.div
      className={cn(
        "rounded-lg border border-border/40 overflow-hidden transition-colors",
        isOpen ? "bg-gradient-to-b " + accentColor : "bg-muted/20"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 hover:bg-muted/30 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="text-muted-foreground">{icon}</div>
          <span className="text-sm font-semibold text-card-foreground">
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border/40"
          >
            <div className="p-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface ExampleCardProps {
  title: string;
  content: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
}

function ExampleCard({ title, content, level }: ExampleCardProps) {
  const getLevelColor = (lvl: string) => {
    switch (lvl) {
      case "BEGINNER":
        return "border-green-300/50 bg-green-500/5";
      case "INTERMEDIATE":
        return "border-blue-300/50 bg-blue-500/5";
      case "ADVANCED":
        return "border-purple-300/50 bg-purple-500/5";
      default:
        return "border-gray-300/50 bg-gray-500/5";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-lg border p-3 text-xs leading-relaxed font-mono text-muted-foreground whitespace-pre-wrap overflow-x-auto",
        getLevelColor(level)
      )}
    >
      <p className="font-semibold text-card-foreground mb-2 font-sans">
        {title}
      </p>
      {content}
    </motion.div>
  );
}
