"use client";

import { LearningPath } from "@/lib/types";
import { LearningPathSection as LearningPathSectionComponent } from "./LearningPathSection";
import { ErrorBoundary } from "./ErrorBoundary";

interface SafeLearningPathProps {
  learningPath: any;
  topicTitle: string;
}

/**
 * Safe wrapper that prevents any invalid data from reaching LearningPathSection
 */
export function SafeLearningPath({ learningPath, topicTitle }: SafeLearningPathProps) {
  console.log("🟢 [SafeLearningPath] ENTRY - received data:", {
    exists: !!learningPath,
    type: typeof learningPath,
    keyPoints: {
      value: learningPath?.keyPoints,
      type: typeof learningPath?.keyPoints,
      isArray: Array.isArray(learningPath?.keyPoints),
    },
    relatedTopicIds: {
      value: learningPath?.relatedTopicIds,
      type: typeof learningPath?.relatedTopicIds,
      isArray: Array.isArray(learningPath?.relatedTopicIds),
    },
  });

  // AGGRESSIVE validation
  if (!learningPath) {
    console.warn("🟡 [SafeLearningPath] learningPath is null/undefined");
    return <div className="p-4 text-yellow-600">Dados não disponíveis (1)</div>;
  }

  try {
    const safeParseField = (fieldName: string, field: any): any[] => {
      console.log(`🔍 [SafeLearningPath] Parsing ${fieldName}:`, {
        value: field,
        type: typeof field,
        isArray: Array.isArray(field),
      });

      if (Array.isArray(field)) {
        console.log(`✅ [SafeLearningPath] ${fieldName} is already array`);
        return field;
      }

      if (typeof field === "string") {
        try {
          const parsed = JSON.parse(field);
          if (Array.isArray(parsed)) {
            console.log(`✅ [SafeLearningPath] ${fieldName} parsed from JSON string`);
            return parsed;
          }
          console.warn(
            `⚠️ [SafeLearningPath] ${fieldName} parsed but not array:`,
            parsed
          );
          return [];
        } catch (e) {
          console.error(`❌ [SafeLearningPath] Failed to parse ${fieldName}:`, e);
          return [];
        }
      }

      console.warn(`⚠️ [SafeLearningPath] ${fieldName} is not string/array:`, field);
      return [];
    };

    // Check and fix relatedTopicIds
    const relatedTopicIds = safeParseField("relatedTopicIds", learningPath.relatedTopicIds);

    // Check and fix keyPoints
    const keyPoints = safeParseField("keyPoints", learningPath.keyPoints);

    // Check and fix commonMistakes
    const commonMistakes = safeParseField("commonMistakes", learningPath.commonMistakes);

    // Check and fix prerequisites
    const prerequisites = safeParseField("prerequisites", learningPath.prerequisites);

    // Create a corrected learningPath object
    const correctedLearningPath: LearningPath = {
      id: learningPath.id || "",
      topicId: learningPath.topicId || "",
      context: learningPath.context || "",
      whyNow: learningPath.whyNow || "",
      whatNext: learningPath.whatNext || "",
      relatedTopicIds,
      keyPoints,
      commonMistakes,
      simpleExample: learningPath.simpleExample,
      realisticExample: learningPath.realisticExample,
      difficulty: learningPath.difficulty || "INTERMEDIATE",
      estimatedTime: learningPath.estimatedTime || 30,
      prerequisites,
    };

    console.log("✅ [SafeLearningPath] Corrected data ready:", {
      relatedTopicIds: {
        count: correctedLearningPath.relatedTopicIds.length,
        isArray: Array.isArray(correctedLearningPath.relatedTopicIds),
      },
      keyPoints: {
        count: correctedLearningPath.keyPoints.length,
        isArray: Array.isArray(correctedLearningPath.keyPoints),
      },
    });

    return (
      <ErrorBoundary
        fallback={(error, reset) => (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600">
            <p className="font-semibold">Erro ao renderizar Caminho de Aprendizagem</p>
            <p className="text-xs mt-1 font-mono break-words">{error.message}</p>
            <button
              onClick={reset}
              className="mt-3 px-3 py-1.5 rounded-lg bg-red-500/20 text-red-600 text-xs font-semibold hover:bg-red-500/30 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        )}
      >
        <LearningPathSectionComponent
          learningPath={correctedLearningPath}
          topicTitle={topicTitle}
        />
      </ErrorBoundary>
    );
  } catch (error) {
    console.error("❌ [SafeLearningPath] FATAL ERROR:", error);
    return (
      <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600">
        <p className="font-semibold">Erro ao processar Caminho de Aprendizagem</p>
        <p className="text-xs mt-1 font-mono break-words">
          {error instanceof Error ? error.message : String(error)}
        </p>
      </div>
    );
  }
}
