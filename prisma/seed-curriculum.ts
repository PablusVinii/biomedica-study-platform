import { PrismaClient } from "@prisma/client";
import { allCurriculumData } from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting curriculum migration...");

  // Cleanup existing to avoid duplicates (using CASCADE for FK safety)
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "CourseAccess", "Progress", "TopicNote", "BlockNote", "CourseTopic", "CourseBlock", "CoursePart" CASCADE;');

  const { allCurriculumDataMap } = require("../src/lib/data");

  for (const [courseIdStr, data] of Object.entries(allCurriculumDataMap)) {
    const courseId = parseInt(courseIdStr);
    console.log(`Migrating Course ${courseId}...`);

    for (const part of data as any[]) {
      console.log(`Migrating Part ${part.id}: ${part.title} for Course ${courseId}`);

      const createdPart = await prisma.coursePart.upsert({
        where: { id: part.id },
        update: { title: part.title, order: part.id, icon: part.icon, courseId: courseId },
        create: { 
          id: part.id,
          title: part.title, 
          order: part.id,
          icon: part.icon,
          courseId: courseId
        },
      });

      for (let bIndex = 0; bIndex < part.blocks.length; bIndex++) {
        const block = part.blocks[bIndex];
        
        const createdBlock = await prisma.courseBlock.create({
          data: {
            title: block.title,
            content: block.content,
            partId: createdPart.id,
            order: bIndex,
            highlights: JSON.stringify(block.highlights || []),
            bibliography: JSON.stringify(block.bibliography || []),
          }
        });

        for (let tIndex = 0; tIndex < block.topics.length; tIndex++) {
          const topic = block.topics[tIndex];
          
          await prisma.courseTopic.create({
            data: {
              id: topic.id,
              title: topic.title,
              content: topic.content,
              blockId: createdBlock.id,
              order: tIndex,
              videoUrl: topic.notebookLmUrl
            }
          });
        }
      }
    }
  }

  console.log("Migration finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
