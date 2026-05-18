import { PrismaClient } from "@prisma/client";
import { learningPathData } from "../src/lib/learning-path-data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Learning Path data...");

  for (const [topicId, lpData] of Object.entries(learningPathData)) {
    try {
      // Verificar se tópico existe
      const topic = await prisma.courseTopic.findUnique({
        where: { id: topicId },
      });

      if (!topic) {
        console.log(`⚠️  Tópico ${topicId} não encontrado. Pulando...`);
        continue;
      }

      // Verificar se Learning Path já existe
      const existingLP = await prisma.learningPath.findUnique({
        where: { topicId },
      });

      if (existingLP) {
        console.log(`✓ Learning Path para ${topicId} já existe. Atualizando...`);
        await prisma.learningPath.update({
          where: { topicId },
          data: {
            context: lpData.context,
            whyNow: lpData.whyNow,
            whatNext: lpData.whatNext,
            relatedTopicIds: JSON.stringify(lpData.relatedTopicIds),
            keyPoints: JSON.stringify(lpData.keyPoints),
            commonMistakes: JSON.stringify(lpData.commonMistakes),
            simpleExample: lpData.simpleExample,
            realisticExample: lpData.realisticExample,
            difficulty: lpData.difficulty,
            estimatedTime: lpData.estimatedTime,
            prerequisites: JSON.stringify(lpData.prerequisites),
          },
        });
      } else {
        console.log(`✓ Criando Learning Path para ${topicId}...`);
        await prisma.learningPath.create({
          data: {
            topicId,
            context: lpData.context,
            whyNow: lpData.whyNow,
            whatNext: lpData.whatNext,
            relatedTopicIds: JSON.stringify(lpData.relatedTopicIds),
            keyPoints: JSON.stringify(lpData.keyPoints),
            commonMistakes: JSON.stringify(lpData.commonMistakes),
            simpleExample: lpData.simpleExample,
            realisticExample: lpData.realisticExample,
            difficulty: lpData.difficulty,
            estimatedTime: lpData.estimatedTime,
            prerequisites: JSON.stringify(lpData.prerequisites),
          },
        });
      }
    } catch (error) {
      console.error(`❌ Erro ao seed Learning Path ${topicId}:`, error);
    }
  }

  console.log("✅ Learning Path seed completed!");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
