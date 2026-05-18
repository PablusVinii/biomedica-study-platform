-- CreateTable LearningPath
CREATE TABLE "LearningPath" (
    "id" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "whyNow" TEXT NOT NULL,
    "whatNext" TEXT NOT NULL,
    "relatedTopicIds" TEXT NOT NULL,
    "keyPoints" TEXT NOT NULL,
    "commonMistakes" TEXT NOT NULL,
    "simpleExample" TEXT,
    "realisticExample" TEXT,
    "difficulty" TEXT NOT NULL DEFAULT 'INTERMEDIATE',
    "estimatedTime" INTEGER NOT NULL DEFAULT 30,
    "prerequisites" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LearningPath_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LearningPath_topicId_key" ON "LearningPath"("topicId");

-- AddForeignKey
ALTER TABLE "LearningPath" ADD CONSTRAINT "LearningPath_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "CourseTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
