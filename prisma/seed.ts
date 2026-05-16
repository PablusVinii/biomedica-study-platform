import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('reitor123', 10);
  const studentPassword = await bcrypt.hash('aluno123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'reitor@biomedica.edu.br' },
    update: {},
    create: {
      email: 'reitor@biomedica.edu.br',
      name: 'Reitor Silva',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const student = await prisma.user.upsert({
    where: { email: 'aluno@biomedica.edu.br' },
    update: {},
    create: {
      email: 'aluno@biomedica.edu.br',
      name: 'Aluno João',
      password: studentPassword,
      role: 'STUDENT',
    },
  });

  console.log('Seeding completed!');
  console.log({ admin, student });

  // Grant access to all parts for ALL students for demonstration
  const allParts = await prisma.coursePart.findMany();
  const allStudents = await prisma.user.findMany({ where: { role: 'STUDENT' } });
  
  for (const studentUser of allStudents) {
    console.log(`Granting access for ${studentUser.email}...`);
    for (const part of allParts) {
      await prisma.courseAccess.upsert({
        where: {
          userId_partId: {
            userId: studentUser.id,
            partId: part.id,
          },
        },
        update: {},
        create: {
          userId: studentUser.id,
          partId: part.id,
        },
      });
    }
  }
  console.log(`Granted access to ${allParts.length} parts for ${allStudents.length} students.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
