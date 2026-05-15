"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function toggleUserCourseAccess(userId: string, partId: number, currentStatus: boolean) {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    throw new Error("Acesso negado");
  }

  if (currentStatus) {
    // Revoke access
    await prisma.courseAccess.deleteMany({
      where: { userId, partId }
    });
  } else {
    // Grant access
    await prisma.courseAccess.upsert({
      where: { userId_partId: { userId, partId } },
      update: {},
      create: { userId, partId }
    });
  }

  revalidatePath("/admin");
}

export async function createUser(data: { name: string; email: string; password?: string; initialAccesses: number[] }) {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    throw new Error("Acesso negado");
  }

  const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
  if (existingUser) {
    throw new Error("E-mail já cadastrado no sistema.");
  }

  const hashedPassword = await bcrypt.hash(data.password || "aluno123", 10);

  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: "STUDENT",
      courseAccess: {
        create: data.initialAccesses.map(partId => ({ partId }))
      }
    }
  });

  revalidatePath("/admin");
}
