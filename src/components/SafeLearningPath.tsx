"use client";

import { LearningPath } from "@/lib/types";
import { LearningPathSection as LearningPathSectionComponent } from "./LearningPathSection";

interface SafeLearningPathProps {
  learningPath: any;
  topicTitle: string;
}

/**
 * Safe wrapper that prevents any invalid data from reaching LearningPathSection
 */
export function SafeLearningPath({ learningPath, topicTitle }: SafeLearningPathProps) {
  console.log("SafeLearningPath received:", {
    learningPath: learningPath ? "exists" : "null",
    keyPoints: learningPath?.keyPoints,
    relatedTopicIds: learningPath?.relatedTopicIds,
  });

  // AGGRESSIVE validation
  if (!learningPath) {
    console.warn("❌ learningPath is null/undefined");
    return <div className="p-4 text-yellow-600">Dados não disponíveis (1)</div>;
  }

  // Check and fix relatedTopicIds
  let relatedTopicIds = learningPath.relatedTopicIds;
  if (typeof relatedTopicIds === "string") {
    try {
      relatedTopicIds = JSON.parse(relatedTopicIds);
    } catch (e) {
      console.error("Failed to parse relatedTopicIds:", e);
      relatedTopicIds = [];
    }
  }
  if (!Array.isArray(relatedTopicIds)) {
    console.warn("⚠️ relatedTopicIds is not array:", relatedTopicIds);
    relatedTopicIds = [];
  }

  // Check and fix keyPoints
  let keyPoints = learningPath.keyPoints;
  if (typeof keyPoints === "string") {
    try {
      keyPoints = JSON.parse(keyPoints);
    } catch (e) {
      console.error("Failed to parse keyPoints:", e);
      keyPoints = [];
    }
  }
  if (!Array.isArray(keyPoints)) {
    console.warn("⚠️ keyPoints is not array:", keyPoints);
    keyPoints = [];
  }

  // Check and fix commonMistakes
  let commonMistakes = learningPath.commonMistakes;
  if (typeof commonMistakes === "string") {
    try {
      commonMistakes = JSON.parse(commonMistakes);
    } catch (e) {
      console.error("Failed to parse commonMistakes:", e);
      commonMistakes = [];
    }
  }
  if (!Array.isArray(commonMistakes)) {
    console.warn("⚠️ commonMistakes is not array:", commonMistakes);
    commonMistakes = [];
  }

  // Check and fix prerequisites
  let prerequisites = learningPath.prerequisites;
  if (typeof prerequisites === "string") {
    try {
      prerequisites = JSON.parse(prerequisites);
    } catch (e) {
      console.error("Failed to parse prerequisites:", e);
      prerequisites = [];
    }
  }
  if (!Array.isArray(prerequisites)) {
    console.warn("⚠️ prerequisites is not array:", prerequisites);
    prerequisites = [];
  }

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

  console.log("✅ SafeLearningPath corrected:", correctedLearningPath);

  return (
    <LearningPathSectionComponent
      learningPath={correctedLearningPath}
      topicTitle={topicTitle}
    />
  );
}
