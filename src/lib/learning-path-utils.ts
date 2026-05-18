import { LearningPath } from "./types";

/**
 * Safely parse and validate LearningPath data from database
 * Ensures all JSON string fields are converted to arrays
 */
export function normalizeLearningPath(lp: any): LearningPath | null {
  if (!lp) return null;

  try {
    const parseJsonField = (field: any): any => {
      if (Array.isArray(field)) return field;
      if (typeof field === "string") {
        try {
          const parsed = JSON.parse(field);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      }
      return [];
    };

    return {
      id: lp.id || "",
      topicId: lp.topicId || "",
      context: lp.context || "",
      whyNow: lp.whyNow || "",
      whatNext: lp.whatNext || "",
      relatedTopicIds: parseJsonField(lp.relatedTopicIds),
      keyPoints: parseJsonField(lp.keyPoints),
      commonMistakes: parseJsonField(lp.commonMistakes),
      simpleExample: lp.simpleExample || undefined,
      realisticExample: lp.realisticExample || undefined,
      difficulty: (lp.difficulty || "INTERMEDIATE") as "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
      estimatedTime: lp.estimatedTime || 30,
      prerequisites: parseJsonField(lp.prerequisites),
      createdAt: lp.createdAt ? new Date(lp.createdAt) : undefined,
      updatedAt: lp.updatedAt ? new Date(lp.updatedAt) : undefined,
    };
  } catch (error) {
    console.error("Error normalizing learning path:", error, lp);
    return null;
  }
}
