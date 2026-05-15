import { PrismaClient } from "@prisma/client";
import { allCurriculumData } from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting curriculum migration...");

  // Cleanup existing to avoid duplicates (using CASCADE for FK safety)
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "CourseAccess", "Progress", "TopicNote", "BlockNote", "CourseTopic", "CourseBlock", "CoursePart" CASCADE;');

  for (const part of allCurriculumData) {
    console.log(`Migrating Part ${part.id}: ${part.title}`);

    const createdPart = await prisma.coursePart.upsert({
      where: { id: part.id },
      update: { title: part.title, order: part.id, icon: part.icon },
      create: { 
        id: part.id,
        title: part.title, 
        order: part.id,
        icon: part.icon
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
            videoUrl: topic.notebookLmUrl // Migration placeholder if any
          }
        });
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
