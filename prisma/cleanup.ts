import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Cleaning up old data...");
  try {
    // Delete in order to avoid FK issues
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "CourseAccess", "Progress", "BlockNote", "TopicNote" CASCADE;');
    console.log("Cleanup finished!");
  } catch (e) {
    console.log("Cleanup failed (maybe tables don't exist yet):", e.message);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
